import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * Instant ZIP storage: Cloudflare R2 (R2_*) or any S3-compatible API (S3_*),
 * e.g. Supabase Storage S3 protocol — usually no card required.
 */

function s3CompatibleConfigured(): boolean {
  return Boolean(
    process.env.S3_ENDPOINT &&
      process.env.S3_ACCESS_KEY_ID &&
      process.env.S3_SECRET_ACCESS_KEY &&
      process.env.S3_BUCKET,
  );
}

function r2Configured(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_BUCKET,
  );
}

function storageConfigured(): boolean {
  return s3CompatibleConfigured() || r2Configured();
}

function client(): S3Client | null {
  if (s3CompatibleConfigured()) {
    return new S3Client({
      region: process.env.S3_REGION || "auto",
      endpoint: process.env.S3_ENDPOINT!,
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
    });
  }

  if (!r2Configured()) return null;

  return new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });
}

function bucketName(): string | undefined {
  if (s3CompatibleConfigured()) return process.env.S3_BUCKET;
  if (r2Configured()) return process.env.R2_BUCKET;
  return undefined;
}

/** Object key for an Instant ZIP in the private bucket. */
export function instantZipKey(slug: string): string {
  return `instant/${slug}.zip`;
}

/**
 * Short-lived signed GET URL for Instant download.
 * Returns null if storage env is missing (caller should WhatsApp fallback).
 */
export async function signedInstantDownloadUrl(
  slug: string,
  expiresInSeconds = 3600,
): Promise<string | null> {
  const s3 = client();
  const bucket = bucketName();
  if (!s3 || !bucket) return null;

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: instantZipKey(slug),
    ResponseContentDisposition: `attachment; filename="${slug}.zip"`,
  });

  return getSignedUrl(s3, command, { expiresIn: expiresInSeconds });
}

export function isR2Configured(): boolean {
  return storageConfigured();
}

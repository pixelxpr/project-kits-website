# Email SPF (Seobility / deliverability)

Audits flag missing SPF when `finalyearkit.com` has no TXT record authorizing mail senders.

## What to add (DNS)

In your domain DNS (Cloudflare / registrar), create a **TXT** record on the root `@`:

- If you send mail only via Google Workspace / Gmail:
  `v=spf1 include:_spf.google.com ~all`
- If you use another provider (Zoho, Microsoft 365, etc.), use their SPF include instead.
- If you **don’t send email from this domain**, a deny-all SPF is still better than none:
  `v=spf1 -all`

This is DNS-only — no website code change. After publishing, re-check with [MX Toolbox SPF](https://mxtoolbox.com/spf.aspx).

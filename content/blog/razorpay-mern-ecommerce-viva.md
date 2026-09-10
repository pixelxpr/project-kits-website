---
title: "Razorpay MERN ecommerce viva — payment verification and order flow"
excerpt: "HMAC-SHA256 signature verification, test mode keys, order state after payment, and admin catalogue management for ecommerce final year vivas."
category: "Viva Prep"
readTime: "10 min read"
date: "2026-07-05"
---

Payment integration is high risk in vivas — either you explain HMAC or you fail. Razorpay sends order_id, payment_id, signature to client; server verifies before marking paid. Never update order status on client callback alone.

![Cover](/blog/razorpay-mern-ecommerce-viva.png)

## Checkout flow

Server creates Razorpay order with amount in paise. Client opens Razorpay modal. On success, client POSTs ids + signature to verify endpoint.

## HMAC verification

expected = HMAC_SHA256(order_id + '|' + payment_id, secret). Compare with signature constant-time. Only then set order paid.

## Test mode

Razorpay test keys and test UPI/card numbers. Demo without real money.

## Admin features

Product CRUD on Cloudinary images. Order status updates: placed → shipped → delivered.

### Extended payment Q&A

**Q: Double payment?** A: Idempotent order creation; verify endpoint checks existing paid status.

**Q: Webhook vs client callback?** A: Production uses webhooks; demo may use client callback with server verify — state production improvement.

**Q: Refunds?** A: Out of scope or future work via Razorpay refund API — be explicit.

### Redux role

Cart state in Redux Toolkit; persisted to localStorage optional. Explain why cart not in MongoDB until checkout — session vs persisted order.

### Cloudinary flow

Multer temp upload → Cloudinary SDK → store URL in product document. No binary in MongoDB — saves size and backup pain.

### Admin demo path

Login admin → add product with image → logout → customer purchase → admin mark shipped. Shows full lifecycle.

### Security headers and HTTPS

Mention deployment would enforce HTTPS for JWT and payment — deployment chapter future work.



## Payment flow step by step

Client creates order on server with amount in paise. Server creates Razorpay order_id. Client opens checkout with key_id. On success, client sends payment_id and signature to server. Server verifies HMAC with key_secret before marking order paid.

### Never trust client amount

Price computed server-side from product database. Client sends product_id and quantity only.

### Webhook vs client callback

Explain both: client callback for immediate UX, webhook for reliability if user closes browser. At minimum implement signature verification on server.

### Test mode

Razorpay test keys in .env.example. Demo with test card numbers from Razorpay docs — never live keys in submission.

### Order states

pending → paid → shipped → delivered. Failed payment stays pending or cancelled with inventory restored.

### Security questions

**Q: Where store secret?** A: Environment variable, not git. **Q: CSRF?** A: JWT + same-site cookies or CORS config explained.

### Inventory rollback

If payment fails after stock decrement, transaction rolls back available quantity — walk through code path.

### Viva demo script

Add to cart → checkout → Razorpay modal → success → order history shows paid status.

### Refund flow

Manual admin refund flag vs Razorpay refund API — state which you implemented. Partial refunds hard — OK to defer.

### Product search

Text index on MongoDB product name — explain if search bar uses regex or Atlas search.

## Cart and checkout architecture

Cart stored in MongoDB linked to userId or session guest cart merged on login. Checkout creates Order document with line items snapshot — price at purchase time frozen even if product price changes later.

### Signature verification explained

Razorpay sends payment_id, order_id, signature. Server computes HMAC-SHA256 of order_id|payment_id with secret, compares to signature. Timing-safe compare prevents side channels — mention if using crypto.timingSafeEqual.

### Admin product management

Separate admin route — create product with image URL, stock count. Stock decrement in same transaction as order confirm — atomicity story for viva.

### Failed payment UX

User sees retry button; order stays pending; cart optionally restored. Demo failed test card once — proves handling.

### Order history and invoices

User views past orders with status badge — simple table component. PDF invoice generation optional stretch documented in future work section.

Compare COD vs online payment scope — if only Razorpay, state COD out of scope to prevent examiner asking for cash flow you did not build.

## Ecommerce scope discipline

Feature creep kills timelines: wishlist, reviews, coupons, recommendations — each sounds small, together they consume weeks. Ship catalog, cart, checkout, order history, admin product CRUD first. Document deferred features in report future work with one-sentence architecture note each — shows planning without broken half-buttons in demo. Razorpay integration alone is sufficient complexity for external examiner if signature verification story is crisp and test payment demo succeeds reliably on presentation laptop.

### Quick reference before viva

Re-read your abstract, test the demo path once on presentation hardware, and sleep. Prepared beats perfect.

## Related reading

See also [AI vs MERN](/blog/ai-vs-mern-final-year-project).

## Project kits

- **[MERN E-Commerce](/projects/mern-ecommerce)** — Razorpay + Redux cart.
- **[Library Management System](/projects/library-management-system)** — MERN without payments for comparison.

**Takeaway:** Draw Razorpay verify flow on board; never trust client-side payment success alone. Ecommerce kit includes test keys setup guide.

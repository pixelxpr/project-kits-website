---
title: "Hotel booking system architecture — availability, pricing, and custom routes"
seoTitle: "Hotel Booking Architecture for Final Year"
excerpt: "Why booking breaks out of generic CRUD: server-side total calculation, room occupancy sync, and three-role access for guests and front desk."
category: "Architecture"
readTime: "14 min read"
date: "2026-06-05"
author: "Rajan"
---

Hotel booking looks like CRUD until dates and money enter the story. `total = nights × rate` must be computed on the server. Room occupancy must flip with check-in, checkout, and cancel. Overlapping stays on the same room must be rejected before insert. That is why booking uses custom route handlers on top of a shared MERN auth/RBAC platform — a deliberate teaching choice, not an accident of poor generic CRUD.

![Cover](/blog/hotel-booking-system-architecture.png)

## Opening pitch (40 seconds)

Our Hotel Booking System lets guests browse rooms and request stays while front-desk and admin roles manage inventory and bookings. Availability is validated server-side against date ranges. Pricing loads the room rate from the database and multiplies by nights; the client never supplies the payable total as authority. Booking status transitions drive room occupied/available flags. Auth, roles, and audit patterns reuse the same platform ideas as library and restaurant kits; domain logic lives in booking-specific controllers.

## Three roles — keep the matrix tight

**Guest:** search/browse, create booking for self, view own bookings, cancel when policy allows (typically confirmed, not checked-in).  
**Front-desk:** manage guests and all bookings, check-in/checkout, override operational issues.  
**Admin:** full access, room/rate configuration, audit log, hard deletes where enabled.

UI menus differ by role; Express middleware enforces the real boundaries. If asked about receptionist vs front-desk naming, use whatever your report printed — consistency beats synonyms mid-viva.

## Why generic CRUD is not enough here

A generic schema form can create a “booking” document, but it will not correctly: compute nights across time zones, reject overlaps, synchronize room status, or ignore tampered prices. Custom handlers encode invariants. Contrast with [Library Management System](/projects/library-management-system), where many entities stay schema-driven and loans carry lighter date logic. Saying “we broke out of CRUD on purpose” is a high-value architecture sentence.

## Availability and date overlap

Treat stay as half-open interval `[checkIn, checkOut)` so checkout day can accept a new check-in. Pseudocode worth memorizing:

```
conflicts = bookings where
  same roomId AND status in confirmed/checked-in AND
  NOT (existing.checkOut <= new.checkIn OR existing.checkIn >= new.checkOut)
reject if conflicts not empty
```

Whiteboard example: existing 25–28, request 27–30 → conflict; request 28–30 → allowed if exclusive checkout. Put this test in Chapter 6 with expected HTTP 409.

### Occupancy sync

On confirm/check-in: room → occupied (or per-date calendar model if you built one). On checkout/cancel: restore available when no other active stay exists. If your model is “room status flag” rather than a full calendar, state that simplification and its limitation (less flexible for multiple future reservations). Future work: inventory calendar by date.

### Race conditions

Two guests book the last room simultaneously. Answer options that sound real: atomic `findOneAndUpdate` with precondition; Mongo transactions if you used them; optimistic version field. You do not need a distributed lock paper — you need one concrete strategy matching code.

## Server-side pricing — classic security viva

Client sends `roomId`, `checkIn`, `checkOut` (and guest identity from token). Server loads `ratePerNight`, computes `nights`, sets `total`. Discard any client `total` or `rate` fields. Demo optional: show that editing the request in DevTools cannot force ₹1 stays. This is the same trust-boundary lesson as restaurant menu totals — cross-link mentally to [Restaurant Management System](/projects/restaurant-management-system).

### Inclusive nights math

Nights = difference in calendar dates, not hours, unless you intentionally sell hourly rooms (usually out of scope). Use `date-fns` or `dayjs` to avoid JavaScript timezone off-by-one bugs on IST machines vs UTC servers. Mention one bug you prevented — panels love concrete war stories.

## Booking state machine

Example statuses: `pending` → `confirmed` → `checked_in` → `checked_out`, plus `cancelled`. Rules: guest cancel only before check-in per policy; checked-in requires front-desk checkout; cancelled and checked_out are terminal. Diagram in Chapter 4. Invalid jumps return 400.

### Cancellation policy as domain logic

Free cancel until 24 hours before check-in — implement with date math and a test case. Even a simple fixed policy beats “cancel anytime” with no rules. Document no-shows as future work if unimplemented.

## ER and sequence talking points

Entities: User, Guest profile (if separate), Room, Booking, optional Payment. Relationships: Booking references Room and Guest/User. Sequence: search availability → select room → POST booking → validate overlap → compute total → save → respond → optional email.

### Payment scope honesty

If Razorpay is out of scope, say “pay at desk / pending payment” and complete the operational story. For online payment architecture comparisons, point to [MERN ecommerce](/projects/mern-ecommerce) rather than half-integrating payments the night before viva.

## Platform reuse — modular monolith

Shared: auth, RBAC, notifications, audit, admin shell. Different: `booking.controller` invariants. This is how FinalYearKit MERN domains stay teachable without five unrelated codebases. Compare verbally with restaurant order lifecycle and library loans — same spine, different ligaments.

## Admin value beyond forms

Occupancy rate by month via aggregation: match confirmed/checked-out bookings, group by month, compute room-nights. Seed three months of data so charts are non-empty. Panels looking for an “analysis component” often accept this single aggregate as enough insight.

### Seasonal pricing optional

Weekend multiplier or season table — only if implemented. Otherwise future work with a clear boundary. Do not show a rate field you never read in the total function.

## Testing scenarios checklist

- Overlap rejected  
- Adjacent dates allowed under half-open rule  
- Tampered total ignored  
- Cancel frees room when policy says so  
- Guest cannot modify someone else’s booking  
- Invalid range (checkout ≤ checkin) rejected  
- Front-desk check-in path updates status  

## Frontend notes

Date range picker, room cards with one image placeholder (gallery optional), “My bookings” list, admin occupancy chart. Accessibility: keyboard-able date inputs beat fancy unbroken custom widgets that fail on projector browsers.

## Extended Q&A

**Q: Why not Excel booking sheet?** A: Concurrent access, role separation, audit, validation.  
**Q: Multi-room hotels?** A: Room documents with types; filter by type/capacity.  
**Q: GST?** A: Optional tax line server-side; state if included.  
**Q: Time zones?** A: Store dates as date-only strings or UTC midnight strategy — explain yours.  
**Q: Difference from library?** A: Date-interval inventory vs copy counts — see [library RBAC viva](/blog/mern-library-rbac-viva).

## Live demo script (four to five minutes)

1. Admin/front-desk: show rooms and rates.  
2. Guest: search a range → book available room → show server total.  
3. Attempt overlapping booking on same room → error.  
4. Cancel or checkout path → room available again.  
5. Admin chart or booking list for the day.

## Report chapter mapping

Chapter 1: manual booking pain, double booking risk. Chapter 3: role use cases, payment scope. Chapter 4: ER, overlap algorithm, state machine, sequence. Chapter 5: custom controller highlights, pricing function. Chapter 6: overlap and pricing tests. Chapter 7: no channel manager, limited payments, simplified occupancy.

## Room types, inventory, and search filters

Model `RoomType` (Deluxe, Standard) with base rate and amenities, and individual `Room` numbers if you support assigning a concrete room at check-in. Guest search may filter by capacity, type, and date availability. For viva, keep three types and a handful of rooms so filters visibly change results. Placeholder images are enough; do not spend your last week on a photo CDN.

### Hold vs confirm

Some designs temporarily hold a room for 10 minutes during checkout forms. If you did not build holds, say bookings are confirmed immediately after validation. Do not describe holds you cannot show. Immediate confirm is acceptable academic scope when overlap checks run in the same request.

### Housekeeping status (stretch)

`clean` / `dirty` / `inspected` separate from occupied/available is realistic hotel ops. Only include if implemented; otherwise future work. Mixing housekeeping into occupancy without UI support creates viva traps.

## Money, GST, and invoices

If you add GST, compute on the server from taxable base and store `tax`, `subtotal`, `grandTotal` on the booking. Printable invoice page (HTML/PDF) is a strong results-chapter screenshot. Currency: INR for Indian colleges unless your problem statement says otherwise. Rounding: document whether you round to paisa with standard half-up rules.

### Refunds on cancel

Policy snippet: full refund marker if cancelled ≥24h before check-in; otherwise partial — even if payment is manual, storing `refundStatus` shows domain completeness. Avoid claiming automated bank refunds without a payment provider.

## Notifications and audit

Email or in-app notification on confirm/cancel is optional. Audit: who changed a booking status and when. Admin filters on audit by entity type `Booking`. This mirrors the library kit’s accountability story and reinforces platform reuse — cite [Library Management System](/projects/library-management-system) when explaining shared middleware patterns.

## Frontend date pitfalls checklist

- Disallow checkout ≤ checkin in UI **and** API  
- Disable past check-in dates for guests (front-desk may override)  
- Show nights and estimated total as UX preview, labeled “estimate; final total calculated on server”  
- Serialize dates as `YYYY-MM-DD` to avoid timezone shifts  

Saying the estimate disclaimer aloud during demo preempts “client calculates money” accusations.

## Load and concurrency demo without chaos

You cannot stage two real users easily. Instead: explain the atomic update; show code path; run two overlapping requests with a script or Postman if allowed; or narrate the race with the whiteboard. Panels accept reasoned concurrency answers when code matches.

## Architecture decision records (short)

Write three ADRs in the report appendix: (1) custom booking controller vs generic CRUD, (2) room status flag vs date inventory calendar, (3) payments deferred. One paragraph each. External examiners who skim appendices often reward this.

## Cross-domain viva table

| Question | Hotel answer |
| --- | --- |
| Trust boundary | Server rates × nights |
| Hard algorithm | Interval overlap |
| Shared platform | Auth/RBAC/audit with library & restaurant |
| Sibling kit | [Restaurant Management System](/projects/restaurant-management-system) for order state machines |

## Front-desk shift narrative

Guest arrives without online booking: front-desk searches availability for tonight, creates booking, assigns room, marks checked-in, optionally prints a simple HTML registration card. Guest booked online: front-desk finds booking by name/id, verifies ID offline (manual), checks in. Your software should support both. If walk-in is missing, say guests must have accounts — and accept that as a limitation rather than inventing a UI under pressure.

### No-show handling

Nightly job or morning button marks confirmed bookings past check-in time as `no_show` and frees inventory. If unimplemented, describe as future work with the state enum reserved. Panels from hospitality backgrounds ask this surprisingly often.

## Capacity and amenities filters

Search by minimum guests, AC flag, Wi-Fi, breakfast included — store amenities as string array. Do not overbuild; three filters suffice. Show that unavailable rooms for the selected dates disappear from results rather than failing at submit time only. Early feedback is better UX and fewer angry cancel demos.

### Admin rate updates

Changing Deluxe rate should affect future bookings only; existing confirmed bookings keep stored `rateSnapshot` and `total`. Mirror the restaurant line-item snapshot idea. If you mutate historical totals when rates change, fix that before viva — it is an integrity bug panels can spot.

## Observability for demos

Log booking create with roomId and dates (no PII beyond what you need). When overlap fails, return a clear message: “Room 204 unavailable for these dates.” Cryptic 500s during viva feel like incomplete projects even when logic is correct.

## Connecting chapters to spoken answers

Overlap algorithm → Chapter 4. Pricing function → Chapter 5. Tampered total test → Chapter 6. Payment out of scope → Chapter 1 and 7. Practice answering with chapter numbers if your college allows report consultation — it signals organization.

Rehearse the overlap whiteboard with a classmate playing examiner: they pick random date pairs until you stop hesitating. Speed here matters because booking vivas often open with “how do you stop double booking?” before you even show the UI. Keep one sticky note with your half-open interval rule (`[checkIn, checkOut)`) on the laptop bezel during practice, then remove it for the real panel so you are not dependent on crib notes.

## Common mistakes

Trusting client price. Exclusive vs inclusive checkout confusion on stage. Demo with all rooms already occupied and no seed reset. Calling everything “AI hotel” without ML. Skipping 403 demo between guest and admin. Claiming OTA (MakeMyTrip-scale) parity. Using floating UI “promo badges” in slides that do not exist in the app. Forgetting to reset seed after a cancel demo so the next run fails overlap unexpectedly.

## Pre-viva checklist

- [ ] Seeded rooms with clear rates  
- [ ] Overlap demo prepared with known dates  
- [ ] Server total visible in UI/response  
- [ ] Role logins verified  
- [ ] State transitions match diagram  
- [ ] Aggregation chart has data  
- [ ] Atlas/network plan for venue  
- [ ] Backup screenshots of overlap error  

## Related reading

See also [library RBAC viva](/blog/mern-library-rbac-viva) and [restaurant management guide](/blog/restaurant-management-system-guide).

## Project kits

- **[Hotel Booking System](/projects/hotel-booking-system)** — custom booking routes, ER/sequence diagrams, and occupancy-focused domain logic.  
- **[Restaurant Management System](/projects/restaurant-management-system)** — parallel MERN domain kit with order state machines and server-side totals.

**Takeaway:** Treat booking as custom domain logic on a shared MERN platform — emphasize overlap validation, server-side totals, and occupancy sync in every answer. The Hotel kit’s diagrams exist so you can walk the panel through invariants instead of apologizing for “just CRUD,” and so your Chapter 4 figures match the live demo path.

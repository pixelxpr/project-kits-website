---
title: "Hotel booking system architecture — availability, pricing, and custom routes"
excerpt: "Why booking breaks out of generic CRUD: server-side total calculation, room occupancy sync, and three-role access for guests and front desk."
category: "Architecture"
readTime: "9 min read"
date: "2026-06-05"
---

Hotel booking looks like CRUD until dates and money enter. Total = nights × rate must compute server-side. Room status must flip occupied on check-in and available on checkout. This entity uses custom route handlers — a deliberate teaching choice.

![Cover](/blog/hotel-booking-system-architecture.png)

## Three roles

Guest: browse, book own stays, cancel confirmed. Front-desk: manage all bookings and guests. Admin: full access plus audit log and hard deletes.

## Availability logic

Before confirm: check room free for date range. On confirm: mark occupied; on checkout/cancel: mark available. Race conditions: mention optimistic locking or transaction if asked.

## Server-side pricing

Client sends dates and roomId only; server loads rate and computes total. Never trust client-submitted price — classic security viva question.

## Platform reuse

Auth, RBAC, notifications shared with library and restaurant kits. Domain logic differs in booking.controller — modular monolith pattern.

### Date overlap logic

Explain inclusive vs exclusive checkout dates. Show test case: existing booking 25-28, new request 27-30 should conflict. Server validates before insert.

### Guest cancel rules

Only confirmed bookings cancellable; checked-in bookings need front-desk checkout — state rules in booking model enum.

### ER diagram talking points

Entities: Guest, Room, Booking, User. Relationships: Booking links Guest and Room; User accounts for staff/guest login separate from guest profile if modeled.

### Sequence diagram for booking

Guest selects room → front-desk POST booking → server checks availability → computes total → saves → updates room status. Walk through messages verbally.

### Comparison to library kit

Same auth/RBAC platform; booking controller replaces loan controller custom logic. Modular monolith — one codebase, domain-specific services.



## Core modules

Room inventory, booking calendar, guest profiles, payment status (optional), admin dashboard for occupancy rates. Keep payment out of scope if time tight — examiners accept cash-at-desk assumption documented in Chapter 1.

### Concurrency problem

Two guests booking last available room — use optimistic locking or atomic decrement on available count. Examiners love this question; have answer ready.

### Date overlap validation

Check-in/check-out ranges must not overlap existing confirmed bookings for same room. SQL query or MongoDB aggregation — show pseudocode in design chapter.

### Role separation

Guest searches and books. Admin manages rooms, rates, and booking approval if manual workflow. Receptionist role optional stretch.

### Diagram set

ER: Room, Booking, User, Payment. Sequence: search availability → hold room → confirm → send email optional.

### Tech stack defense

MERN standard. React date picker for range selection. Express validates dates server-side — never trust client-only validation.

### Testing scenarios

Double booking attempt, cancel booking frees inventory, invalid date range rejected.

### Cancellation policy

Free cancel 24h before check-in — business rule in code with date math test case. Shows domain logic beyond CRUD.

### Seasonal pricing optional

Weekend rate multiplier — document if implemented or as future enhancement with clear scope boundary.

## Availability search algorithm

Given check-in date A and check-out date B, room is available if no confirmed booking overlaps [A, B). Pseudocode in report:

```
for each room:
  conflicts = bookings where room_id match and status confirmed
    and not (checkout <= A or checkin >= B)
  available if conflicts empty
```

Walk examiner through overlap logic on whiteboard — high-scoring moment.

### Admin vs guest flows

Guest: search, book, view my bookings, cancel if policy allows. Admin: add room types, set base price, view occupancy calendar, confirm or reject if manual approval workflow.

### Payment scope statement

If payment not implemented, say "booking confirmed pending payment at front desk" — complete business story without Razorpay complexity. If comparing to ecommerce, cite [MERN ecommerce](/projects/mern-ecommerce) for payment architecture difference.

### Frontend date handling

Use date library — date-fns or dayjs — to avoid timezone off-by-one on check-in. Explain bug you prevented in one sentence during viva.

Photo gallery for rooms optional — single placeholder image per room type sufficient for academic demo scope.

## Reporting for admin value

Occupancy rate chart by month turns CRUD project into management insight — one aggregated query in MongoDB pipeline demonstrates skills beyond insert forms. Explain aggregation stages: match confirmed bookings, group by month, count room-nights. You do not need real hotel data; seeded bookings across three months suffice for demo chart. This single feature often satisfies examiners looking for "analysis component" in otherwise transactional systems.

### Quick reference before viva

Re-read your abstract, test the demo path once on presentation hardware, and sleep. Prepared beats perfect.

### Final checklist

Print report binding copy night before. Carry charger and HDMI adapter. Arrive fifteen minutes early to test projector resolution. Confirm sample login credentials work. These logistics seem minor until they fail publicly — students lose marks from environment issues unrelated to understanding.

## Related reading

See also [library RBAC viva](/blog/mern-library-rbac-viva).

## Project kits

- **[Hotel Booking System](/projects/hotel-booking-system)** — custom booking routes documented.
- **[Restaurant Management System](/projects/restaurant-management-system)** — similar order lifecycle pattern.

**Takeaway:** Booking is custom logic on shared MERN platform — emphasize server-side totals and occupancy sync. Hotel kit includes ER diagram and sequence diagram for booking flow.

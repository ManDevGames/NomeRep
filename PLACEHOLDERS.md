# Placeholders to replace before launch

Everything below is still placeholder content. Most business values live in one file,
[src/config/site.ts](src/config/site.ts); changing them there updates every page.

## 1. Business details: `src/config/site.ts`

| What | Key (line) | Now | Notes |
|---|---|---|---|
| Live domain | `siteUrl` | `https://[your-domain].com` | Used for the sitemap, robots.txt, canonical links, social previews and JSON-LD. Lighthouse SEO goes from 83 to 100 once this is set. |
| WhatsApp number | `contact.whatsappNumber` | `919311088577` | **The old site's number, kept so the button works.** Replace with Shalinee's number (country code + digits). |
| Email | `contact.email` | `[hello@your-domain.com]` | Shown on About → Contact and in the legal pages. |
| Instagram | `social.instagram` | `https://instagram.com/[handle]` | |
| YouTube | `social.youtube` | `https://youtube.com/@[channel]` | |
| People helped | `stats.clientsHelped` | `1000+` | Hero trust strip, /coaching. |
| Years of experience | `stats.yearsExperience` | `7+` | /coaching. |
| Program lengths | `programOptions` | 1, 3 and 8 weeks | Name and one-line focus for each; no prices are shown. |
| Workshop price | `prices.workshop` | `₹[499]` | Homepage offer card, /workshop. |
| Workshop date (countdown) | `workshop.dateISO` | empty | e.g. `2026-11-15T19:00:00+05:30`. Empty hides the countdown. |
| Workshop date (text) | `workshop.dateLabel` | `[Date · Time IST]` | English and Hindi. |
| Workshop payment link | `workshop.paymentUrl` | empty | Razorpay / Instamojo. Empty = "Reserve my seat" opens WhatsApp instead. |
| Lead webhook | `leadWebhookUrl` | empty | **Until set, quiz and clarity-call leads are not saved anywhere.** Any JSON POST endpoint works; see [src/lib/leads.ts](src/lib/leads.ts). |
| GA4 ID | `analytics.ga4Id` (79) | empty | Loads only after the visitor accepts cookies. The consent banner appears once an ID is set. |
| Meta Pixel ID | `analytics.metaPixelId` | empty | Same as GA4. |
| Testimonials | `testimonials` + `showTestimonials` | 3 entries marked SAMPLE, flag `false` | Replace with real stories (written permission; initials are fine), then set the flag to `true`. This also shows the two client-video slots on /stories. |

## 2. Photos: `<PhotoPlaceholder>`

Pass `src` (and `alt`, e.g. "Shalinee Sen, Relationship Coach") on the same component. The placeholder box is replaced automatically, keeping the aspect ratio.

| File:line | Photo |
|---|---|
| [src/components/home/Hero.tsx:58](src/components/home/Hero.tsx#L58) | Hero portrait, warm smile, 4:5 (keep `priority`) |
| [src/components/home/MeetShalineeSection.tsx:13](src/components/home/MeetShalineeSection.tsx#L13) | Candid working portrait, 1:1 |
| [src/pages/Coaching.tsx:125](src/pages/Coaching.tsx#L125) | On a video session, laptop, 4:5 |
| [src/pages/Coaching.tsx:230](src/pages/Coaching.tsx#L230) | Portrait, 1:1 |
| [src/pages/About.tsx:102](src/pages/About.tsx#L102) | Main portrait, 4:5 |
| [src/pages/About.tsx:119](src/pages/About.tsx#L119) | Germany / lab days, 3:2 |
| [src/pages/ClarityCall.tsx:68](src/pages/ClarityCall.tsx#L68) | Friendly close-up, 1:1 |
| [src/pages/Quiz.tsx:178](src/pages/Quiz.tsx#L178) | Small circular avatar |
| [src/pages/Workshop.tsx:93](src/pages/Workshop.tsx#L93) | Hosting a live online workshop, 4:5 |
| [src/pages/Workshop.tsx:128](src/pages/Workshop.tsx#L128) | Small circular portrait |

The social-share image [public/og-image.png](public/og-image.png) (1200×630) is text-only. A version with Shalinee's photo in the pink panel would work better.

## 3. Videos: `<VideoPlaceholder>`

Pass `youtubeUrl` (any YouTube link) or `videoSrc` (an mp4 file).

| File:line | Video |
|---|---|
| [src/components/home/MeetShalineeSection.tsx:43](src/components/home/MeetShalineeSection.tsx#L43) | 60-sec intro |
| [src/pages/About.tsx:165](src/pages/About.tsx#L165) | Her story, 2 min |
| [src/pages/Stories.tsx:35-36](src/pages/Stories.tsx#L35) | 2 client video testimonials (shown only when `showTestimonials` is true) |

## 4. Text marked TODO

| File:line | What |
|---|---|
| [src/components/home/MeetShalineeSection.tsx:20](src/components/home/MeetShalineeSection.tsx#L20) | Short intro story, in Shalinee's words |
| [src/pages/About.tsx:10](src/pages/About.tsx#L10) | Three-part story, including the `[A personal moment…]` placeholder |
| [src/pages/About.tsx:41](src/pages/About.tsx#L41) | Credentials: `[Degree, University]`, `[DNA research role…]`, `[certifications]` |
| [src/pages/Coaching.tsx:236](src/pages/Coaching.tsx#L236) | "Why Shalinee" bullets, including `[certifications]` |
| [src/pages/Coaching.tsx:91](src/pages/Coaching.tsx#L91) | Program refund answer |
| [src/pages/Workshop.tsx:29](src/pages/Workshop.tsx#L29), [:37](src/pages/Workshop.tsx#L37), [:45](src/pages/Workshop.tsx#L45) | Workshop recording, language and refund answers |

All copy has English and Hindi versions side by side (`en:` / `hi:`); update both.

## 5. Legal: review with a professional

| File | Open items |
|---|---|
| [src/pages/Privacy.tsx](src/pages/Privacy.tsx) | `[service provider]`, `[retention period]` |
| [src/pages/Terms.tsx](src/pages/Terms.tsx) | `[payment provider]`, refund policy |
| [src/pages/Disclaimer.tsx](src/pages/Disclaimer.tsx) | Verify Tele-MANAS 14416 and Women Helpline 181, then delete the "[Verify…]" note |
| [src/components/brand/LegalPage.tsx](src/components/brand/LegalPage.tsx) | "Last updated: [date]" |

## 6. Before going live

- Trademark search for "Heart Rewiring Method™".
- Decide whether to keep "Most chosen" on the program card ([src/components/home/OffersSection.tsx](src/components/home/OffersSection.tsx)). It is a social-proof claim, so keep it only if it is true.
- The clarity-call form ends by opening WhatsApp with the visitor's name, number and email prefilled. Check it reaches the right number (`contact.whatsappNumber`).

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
| Workshop price | `prices.workshopINR` | `499` (INR) | Homepage offer card, /workshop. Visitors can view it in any currency from the header selector. |
| Workshop date (countdown) | `workshop.dateISO` | empty | e.g. `2026-11-15T19:00:00+05:30`. Empty hides the countdown. |
| Workshop date (text) | `workshop.dateLabel` | `[Date · Time IST]` | English and Hindi. |
| Workshop payment link | `workshop.paymentUrl` | empty | Razorpay / Instamojo. Empty = "Reserve my seat" opens WhatsApp instead. |
| Lead webhook | `leadWebhookUrl` | empty | **Until set, quiz and clarity-call leads are not saved anywhere.** Any JSON POST endpoint works; see [src/lib/leads.ts](src/lib/leads.ts). |
| GA4 ID | `analytics.ga4Id` (79) | empty | Loads only after the visitor accepts cookies. The consent banner appears once an ID is set. |
| Meta Pixel ID | `analytics.metaPixelId` | empty | Same as GA4. |
| Testimonials | `testimonials` + `showTestimonials` | 3 entries marked SAMPLE, flag `false` | Replace with real stories (written permission; initials are fine), then set the flag to `true`. This also shows the two client-video slots on /stories. |

## 2. Photos: Google Drive + Google Sheet

Photos are managed from a Google Sheet, so you can change them at any time without touching code or redeploying.

**One-time setup**

1. In Google Drive, create a folder (e.g. "Website photos"). Share it as **Anyone with the link → Viewer**. Every photo you put in it is then visible to the site.
2. Create a Google Sheet: **File → Import → Upload** [photos-template.csv](photos-template.csv) (choose "Replace spreadsheet"). The first row must stay `key, link, alt`. The `where it shows` column is only a note for you.
3. Share the sheet as **Anyone with the link → Viewer**, copy its browser URL and paste it into `photoSheetUrl` in [src/config/site.ts](src/config/site.ts). Deploy once.

**Adding or changing a photo**

1. Upload the photo to the Drive folder. Right-click it → **Share → Copy link**.
2. Paste that link into the `link` cell of the right row in the sheet. Optionally edit `alt` (the description for screen readers and Google).
3. Done. Visitors see the new photo on their next page load (it can take a minute or two for Google to update).

Clear a `link` cell to bring back the placeholder box. If a link is broken or the file isn't shared, the site shows the placeholder instead of a broken image. Any direct image URL (not only Drive) also works in the `link` column.

| `key` in the sheet | Where it shows | Shape |
|---|---|---|
| `home-hero` | [Home, top](src/components/home/Hero.tsx#L57) | Portrait 4:5 |
| `home-meet` | [Home, Meet Shalinee](src/components/home/MeetShalineeSection.tsx#L13) | Square 1:1 |
| `coaching-session` | [Coaching, top](src/pages/Coaching.tsx#L131) | Portrait 4:5 |
| `coaching-portrait` | [Coaching, Why Shalinee](src/pages/Coaching.tsx#L245) | Square 1:1 |
| `about-main` | [About, top](src/pages/About.tsx#L94) | Portrait 4:5 |
| `about-lab` | [About, Germany / lab days](src/pages/About.tsx#L111) | Landscape 3:2 |
| `clarity-call` | [Clarity Call](src/pages/ClarityCall.tsx#L48) | Square 1:1 |
| `quiz-avatar` | [Quiz, small round photo](src/pages/Quiz.tsx#L178) | Square, shown as a circle |
| `workshop-hosting` | [Workshop, top](src/pages/Workshop.tsx#L95) | Portrait 4:5 |
| `workshop-portrait` | [Workshop, host section](src/pages/Workshop.tsx#L130) | Square, shown as a circle |

Photos are cropped to the shape above, so upload roughly that shape with the face near the centre. Keep files under about 2 MB (the site requests a 1600 px wide version).

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

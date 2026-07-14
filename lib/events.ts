// Central source of truth for events shown on the homepage and their
// optional registration pages.
//
// An event is "clickable" (links to /events/<slug>) ONLY when it has a form.
// To give an event a shareable registration page, set `hasForm: true` and a
// unique `slug`. The page lives at /events/<slug> (e.g. wedist.net/events/digifort-training).
//
// Events without a form are shown as plain, non-clickable informational cards.

export type EventFormFieldName = "name" | "email" | "company" | "position" | "phone"

export type EventFormField = {
  name: EventFormFieldName
  label: string
  type: "text" | "email" | "tel"
  placeholder: string
  required: boolean
  autoComplete?: string
}

export type EventItem = {
  id: number
  title: string
  date: string
  time: string
  location: string
  // Short blurb shown on the homepage card.
  description: string
  // Present only for events with a shareable registration page/form.
  slug?: string
  hasForm?: boolean
  // Longer body for the event detail page. Markdown is supported
  // (paragraphs, **bold**, "- " bullets, "## " headings).
  longDescription?: string
  // Optional heading shown above the registration form.
  formTitle?: string
  formSubtitle?: string
}

// The registration form fields. Name, Email, Phone and Company are mandatory;
// Position is optional. These are shared by every event registration form.
export const EVENT_FORM_FIELDS: EventFormField[] = [
  { name: "name", label: "Full Name", type: "text", placeholder: "Jane Doe", required: true, autoComplete: "name" },
  { name: "email", label: "Email Address", type: "email", placeholder: "jane@company.com", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+974 0000 0000", required: true, autoComplete: "tel" },
  { name: "company", label: "Company", type: "text", placeholder: "Your organization", required: true, autoComplete: "organization" },
  { name: "position", label: "Position / Role", type: "text", placeholder: "e.g. Security Consultant (optional)", required: false, autoComplete: "organization-title" },
]

// Google Apps Script Web App endpoint that writes submissions to the
// connected Google Spreadsheet.
export const EVENT_FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzvwYhkh9QGmopL2Ymg96iIgjUPiSMX9FXZG83Xl7iKx5-woymSzCVauusnwxi9lOYNwQ/exec"

export const events: EventItem[] = [
  {
    id: 0,
    title: "WeDist 5th Anniversary Celebration",
    date: "August 9, 2026",
    time: "all day",
    location: "WeDist",
    description:
      "Join us as we celebrate WeDist's 5th Anniversary, marking five years of innovation, partnerships, and growth with our valued customers, partners, and team.",
  },
  {
    id: 1,
    slug: "digifort-training",
    hasForm: true,
    title: "Digifort Certified Online Training Program",
    date: "Will be announced soon",
    time: "5PM - 7PM (GMT+3)",
    location: "Online",
    description:
      "An exclusive Digifort Certified Online Training Program",
    formTitle: "Register Your Interest",
    formSubtitle:
      "Limited seats available. Register below and we'll share the training schedule and further details soon.",
    longDescription: `As part of our 5-Year Anniversary celebrations, WeDist QFZ is pleased to announce an exclusive **Digifort Certified Online Training Program** for security professionals, system integrators, consultants, and technology specialists.

This program provides an opportunity to enhance your expertise in enterprise Video Management Systems and earn a valuable certification that can contribute to your professional growth and career development within the security technology industry.

## Key Benefits

- Gain in-depth knowledge of Digifort Video Management Software
- Understand enterprise VMS architecture, configuration, and deployment concepts
- Develop skills to design and support advanced security solutions
- Earn a professional certification to strengthen your technical profile
- Expand your expertise in a globally recognized video management platform

## Limited Seats Available

As part of WeDist QFZ's 5-year milestone, this exclusive online training opportunity is being offered to support and empower the security community with advanced technical knowledge and professional development.

Interested professionals are invited to register their interest. Training schedule and further details will be announced soon.

Become part of this exclusive learning opportunity and take the next step in your security technology career.`,
  },
]

// Only events with both a slug and a form are eligible for a detail page.
export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug && e.hasForm)
}

export function getFormEventSlugs(): string[] {
  return events.filter((e) => e.hasForm && e.slug).map((e) => e.slug as string)
}

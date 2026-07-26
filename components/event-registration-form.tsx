"use client"

import { useState } from "react"
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react"
import {
  EVENT_FORM_FIELDS,
  EVENT_FORM_ENDPOINT,
  type EventFormFieldName,
} from "@/lib/events"

type Props = {
  eventSlug: string
  eventTitle: string
}

type Status = "idle" | "submitting" | "success" | "error"

const REQUIRED_FIELDS = EVENT_FORM_FIELDS.filter((f) => f.required).map(
  (f) => f.name
)

export function EventRegistrationForm({
  eventSlug,
  eventTitle,
}: Props) {
  const [values, setValues] = useState<Record<EventFormFieldName, string>>({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
  })

  // Country code (stored WITHOUT '+')
  const [countryCode, setCountryCode] = useState("974")

  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const setField = (
    name: EventFormFieldName,
    value: string
  ) => setValues((prev) => ({ ...prev, [name]: value }))

  const validate = () => {
    for (const field of EVENT_FORM_FIELDS) {
      if (field.required && !values[field.name].trim()) {
        return `${field.label} is required.`
      }
    }

    const email = values.email.trim()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address."
    }

    if (!countryCode.trim()) {
      return "Country code is required."
    }

    if (!values.phone.trim()) {
      return "Phone Number is required."
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (status === "submitting") return

    const validationError = validate()

    if (validationError) {
      setStatus("error")
      setErrorMsg(validationError)
      return
    }

    setStatus("submitting")
    setErrorMsg("")

    try {
      // Final phone number WITHOUT '+'
      const fullPhone = `${countryCode}${values.phone}`

      const body = new URLSearchParams({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: fullPhone,
        company: values.company.trim(),
        position: values.position.trim(),
        event: eventTitle,
        eventSlug,
        submittedAt: new Date().toISOString(),
      })

      await fetch(EVENT_FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      })

      setStatus("success")

      setValues({
        name: "",
        email: "",
        phone: "",
        company: "",
        position: "",
      })

      // Reset default country code
      setCountryCode("974")
    } catch (err) {
      console.error("[v0] Event registration failed", err)

      setStatus("error")
      setErrorMsg(
        "Something went wrong while submitting. Please try again."
      )
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#f5b800]/30 bg-[#12121a] p-8 md:p-10 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#f5b800]/30 bg-[#f5b800]/10">
          <CheckCircle2 className="h-8 w-8 text-[#f5b800]" />
        </div>

        <h3 className="text-2xl font-semibold text-[#f0f0f5]">
          Registration Received
        </h3>

        <p className="mt-3 leading-relaxed text-[#888899]">
          Thank you for registering your interest in{" "}
          <span className="text-[#f0f0f5]">{eventTitle}</span>.
          Our team will reach out with the schedule and further
          details soon.
        </p>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#2a2a36] px-5 py-2.5 text-sm font-medium text-[#cfd0da] transition-colors hover:border-[#f5b800]/50 hover:text-[#f5b800]"
        >
          Register another person
        </button>
      </div>
    )
  }
    return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-[#2a2a36] bg-[#12121a] p-6 md:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {EVENT_FORM_FIELDS.map((field) => {
          // Custom Phone Field
          if (field.name === "phone") {
            return (
              <div key={field.name} className="sm:col-span-2">
                <label
                  htmlFor="field-phone"
                  className="mb-2 block text-sm font-medium text-[#cfd0da]"
                >
                  {field.label}
                  {field.required && (
                    <span className="ml-1 text-[#f5b800]">*</span>
                  )}
                </label>

                <div className="flex gap-3">
                  {/* Country Code */}
                  <div className="w-28">
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="tel-country-code"
                      placeholder="974"
                      value={countryCode}
                      onChange={(e) =>
                        setCountryCode(
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      className="w-full rounded-lg border border-[#2a2a36] bg-[#0a0a0f] px-4 py-3 text-center text-[#f0f0f5] placeholder:text-[#5a5a66] outline-none transition-colors focus:border-[#f5b800] focus:ring-1 focus:ring-[#f5b800]/40"
                    />
                  </div>

                  {/* Phone Number */}
                  <input
                    id="field-phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    required
                    aria-required
                    placeholder="55551234"
                    value={values.phone}
                    onChange={(e) =>
                      setField(
                        "phone",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    className="flex-1 rounded-lg border border-[#2a2a36] bg-[#0a0a0f] px-4 py-3 text-[#f0f0f5] placeholder:text-[#5a5a66] outline-none transition-colors focus:border-[#f5b800] focus:ring-1 focus:ring-[#f5b800]/40"
                  />
                </div>

                <p className="mt-2 text-xs text-[#5a5a66]">
                  Enter country code without the{" "}
                  <span className="font-medium text-[#cfd0da]">+</span>{" "}
                  sign.
                </p>
              </div>
            )
          }

          // Position spans full width
          const isFullWidth = field.name === "position"|| field.name === "company" || field.name === "email"|| field.name === "name"

          return (
            <div
              key={field.name}
              className={isFullWidth ? "sm:col-span-2" : undefined}
            >
              <label
                htmlFor={`field-${field.name}`}
                className="mb-2 block text-sm font-medium text-[#cfd0da]"
              >
                {field.label}
                {field.required && (
                  <span className="ml-1 text-[#f5b800]">*</span>
                )}
              </label>

              <input
                id={`field-${field.name}`}
                name={field.name}
                type={field.type}
                inputMode={
                  field.type === "email"
                    ? "email"
                    : "text"
                }
                autoComplete={field.autoComplete}
                required={field.required}
                aria-required={field.required}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={(e) =>
                  setField(field.name, e.target.value)
                }
                className="w-full rounded-lg border border-[#2a2a36] bg-[#0a0a0f] px-4 py-3 text-[#f0f0f5] placeholder:text-[#5a5a66] outline-none transition-colors focus:border-[#f5b800] focus:ring-1 focus:ring-[#f5b800]/40"
              />
            </div>
          )
        })}
      </div>

      {status === "error" && errorMsg && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <p className="mt-5 text-xs text-[#5a5a66]">
        Fields marked <span className="text-[#f5b800]">*</span> are
        required.
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#f5b800] px-6 py-3.5 text-base font-semibold text-[#0a0a0f] transition-all hover:bg-[#ffca28] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Submit Registration
          </>
        )}
      </button>
    </form>
  )
}
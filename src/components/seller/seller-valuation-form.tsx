"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { FieldLabel, Input, Select, Textarea } from "@/components/ui/field";
import { neighborhoods } from "@/lib/data/neighborhoods";
import { site } from "@/lib/site";

const timelines = [
  { value: "as-soon-as-possible", label: "As soon as possible" },
  { value: "one-to-three-months", label: "Within 1–3 months" },
  { value: "three-to-six-months", label: "Within 3–6 months" },
  { value: "six-to-twelve-months", label: "Within 6–12 months" },
  { value: "researching", label: "Just researching value" },
] as const;

const elsewhere = "Elsewhere in Arizona";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Seller valuation request. Composes the address, community and timeline into
 * the enquiry body so the existing `/api/contact` endpoint needs no changes.
 */
export function SellerValuationForm() {
  const [community, setCommunity] = useState<string>(neighborhoods[0].name);
  const [timeline, setTimeline] = useState<string>(timelines[0].value);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setNotice("");

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();
    const notes = String(formData.get("notes") ?? "").trim();
    const timelineLabel =
      timelines.find((t) => t.value === timeline)?.label ?? timeline;

    if (address.length < 5) {
      setErrors({ address: "Please enter the property address or street." });
      setNotice("Please review the highlighted fields.");
      setStatus("error");
      return;
    }

    const body = {
      firstName,
      lastName,
      email,
      phone,
      interest: "selling",
      property: address,
      message: [
        `Property: ${address}`,
        `Community: ${community}`,
        `Timeline: ${timelineLabel}`,
        notes ? `Notes: ${notes}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await response.json()) as {
        ok: boolean;
        errors?: Record<string, string>;
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setNotice(data.error ?? "Please review the highlighted fields.");
        setStatus("error");
        return;
      }

      setNotice(data.message ?? "Thank you — your request has been received.");
      setStatus("success");
    } catch {
      setNotice(
        `We could not reach the server. Please call ${site.phone} and we will pick up.`,
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line bg-ivory px-8 py-16 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center bg-bronze text-white">
          <Check className="h-6 w-6" strokeWidth={1.6} />
        </span>
        <h3 className="mt-8 font-display text-3xl text-charcoal">
          Request received.
        </h3>
        <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-charcoal/60">
          {notice}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal underline decoration-bronze decoration-1 underline-offset-8 transition-colors duration-500 hover:text-bronze"
        >
          Request another valuation
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-9">
      <div className="grid gap-9 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="firstName">First Name</FieldLabel>
          <Input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            required
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            className="mt-4"
          />
          {errors.firstName ? (
            <p id="firstName-error" className="mt-2 text-xs text-terracotta">
              {errors.firstName}
            </p>
          ) : null}
        </div>

        <div>
          <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
          <Input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            required
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            className="mt-4"
          />
          {errors.lastName ? (
            <p id="lastName-error" className="mt-2 text-xs text-terracotta">
              {errors.lastName}
            </p>
          ) : null}
        </div>

        <div>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="mt-4"
          />
          {errors.email ? (
            <p id="email-error" className="mt-2 text-xs text-terracotta">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className="mt-4"
          />
          {errors.phone ? (
            <p id="phone-error" className="mt-2 text-xs text-terracotta">
              {errors.phone}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="address">Property Address</FieldLabel>
        <Input
          id="address"
          name="address"
          autoComplete="street-address"
          placeholder="Street address, city"
          aria-invalid={Boolean(errors.address)}
          aria-describedby={errors.address ? "address-error" : undefined}
          className="mt-4"
        />
        {errors.address ? (
          <p id="address-error" className="mt-2 text-xs text-terracotta">
            {errors.address}
          </p>
        ) : null}
      </div>

      <div className="grid gap-9 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="community">Community</FieldLabel>
          <Select
            id="community"
            aria-label="Community"
            value={community}
            onChange={(event) => setCommunity(event.target.value)}
            className="mt-4"
          >
            {neighborhoods.map((neighborhood) => (
              <option key={neighborhood.slug} value={neighborhood.name}>
                {neighborhood.name}
              </option>
            ))}
            <option value={elsewhere}>{elsewhere}</option>
          </Select>
        </div>

        <div>
          <FieldLabel htmlFor="timeline">Timeline</FieldLabel>
          <Select
            id="timeline"
            aria-label="Timeline"
            value={timeline}
            onChange={(event) => setTimeline(event.target.value)}
            className="mt-4"
          >
            {timelines.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="notes">Anything We Should Know</FieldLabel>
        <Textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Recent improvements, condition, tenant status, or a date you need to work towards."
          className="mt-4"
        />
      </div>

      {status === "error" && notice ? (
        <p
          role="alert"
          className="border-l-2 border-terracotta bg-terracotta/5 px-5 py-4 text-[0.8125rem] text-charcoal/75"
        >
          {notice}
        </p>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex h-14 items-center justify-center gap-3 bg-charcoal px-9 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors duration-500 hover:bg-bronze disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Request My Valuation"}
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
            strokeWidth={1.6}
          />
        </button>

        <p className="text-[0.75rem] leading-relaxed text-charcoal/45">
          No obligation, no cost. We reply within one business day.
        </p>
      </div>
    </form>
  );
}

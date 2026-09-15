"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { FieldLabel, Input, Textarea } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const interests = [
  { value: "buying", label: "Buying" },
  { value: "selling", label: "Selling" },
  { value: "investing", label: "Investing" },
  { value: "relocating", label: "Relocating" },
  { value: "other", label: "Other" },
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  defaultInterest = "buying",
  property,
}: {
  defaultInterest?: string;
  property?: string;
}) {
  const [interest, setInterest] = useState(defaultInterest);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const body = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      interest,
      message: String(formData.get("message") ?? ""),
      property,
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

      setNotice(data.message ?? "Thank you — your enquiry has been received.");
      setStatus("success");
    } catch {
      setNotice(
        "We could not reach the server. Please call 480.720.5686 and we will pick up.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line bg-ivory-200/40 px-8 py-16 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center bg-bronze text-white">
          <Check className="h-6 w-6" strokeWidth={1.6} />
        </span>
        <h3 className="mt-8 font-display text-3xl text-charcoal">
          Message received.
        </h3>
        <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-charcoal/60">
          {notice}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal underline decoration-bronze decoration-1 underline-offset-8 transition-colors duration-500 hover:text-bronze"
        >
          Send another enquiry
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

      {/* Interest */}
      <fieldset>
        <legend className="eyebrow text-charcoal/45">
          I&rsquo;m Interested In
        </legend>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {interests.map((option) => {
            const active = interest === option.value;
            return (
              <label
                key={option.value}
                className={cn(
                  "cursor-pointer border px-5 py-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] transition-colors duration-400",
                  active
                    ? "border-charcoal bg-charcoal text-ivory"
                    : "border-charcoal/20 text-charcoal/70 hover:border-charcoal/50",
                )}
              >
                <input
                  type="radio"
                  name="interest"
                  value={option.value}
                  checked={active}
                  onChange={() => setInterest(option.value)}
                  className="sr-only"
                />
                {option.label}
              </label>
            );
          })}
        </div>
        {errors.interest ? (
          <p className="mt-2 text-xs text-terracotta">{errors.interest}</p>
        ) : null}
      </fieldset>

      <div>
        <FieldLabel htmlFor="message">Message</FieldLabel>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us what you are looking for, your timeline, and anything that would help us prepare."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="mt-4"
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-xs text-terracotta">
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === "error" && notice ? (
        <p
          role="alert"
          className="border-l-2 border-terracotta bg-terracotta/5 px-5 py-4 text-[0.8125rem] text-charcoal/75"
        >
          {notice}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex h-14 items-center justify-center gap-3 bg-charcoal px-9 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors duration-500 hover:bg-bronze disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Inquiry"}
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
          strokeWidth={1.6}
        />
      </button>
    </form>
  );
}

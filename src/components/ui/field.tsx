"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const fieldBase =
  "w-full appearance-none border-0 border-b border-charcoal/20 bg-transparent pb-3 pt-2 font-sans text-sm text-charcoal transition-colors duration-300 placeholder:text-charcoal/35 hover:border-charcoal/40 focus:border-bronze focus:outline-none focus-visible:outline-none";

export function FieldLabel({
  children,
  htmlFor,
  className,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("eyebrow block text-charcoal/45", className)}
    >
      {children}
    </label>
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldBase, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(fieldBase, "resize-none leading-relaxed", className)}
      {...props}
    />
  );
}

type SelectOption = { value: string; label: string };

function parseOptions(children: React.ReactNode): SelectOption[] {
  const options: SelectOption[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === "option") {
      const props = child.props as { value?: string; children?: React.ReactNode };
      options.push({
        value: String(props.value ?? ""),
        label: String(props.children ?? ""),
      });
    }
  });
  return options;
}

export function Select({
  className,
  children,
  value,
  onChange,
  id,
  "aria-label": ariaLabel,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const options = parseOptions(children);
  const selected = options.find((o) => o.value === value) ?? options[0];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function select(val: string) {
    onChange?.({
      target: { value: val },
    } as React.ChangeEvent<HTMLSelectElement>);
    setOpen(false);
  }

  const isDark = className?.includes("text-ivory");

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        id={id}
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between border-b pb-3 pt-2 text-left font-sans text-sm transition-colors duration-300 focus:outline-none",
          isDark
            ? "border-white/25 text-ivory hover:border-white/50 focus:border-sand"
            : "border-charcoal/20 text-charcoal hover:border-charcoal/40 focus:border-bronze",
          className,
        )}
      >
        <span>{selected?.label}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 transition-transform duration-300",
            open && "rotate-180",
            isDark ? "text-white/50" : "text-charcoal/50",
          )}
          strokeWidth={1.5}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute left-0 top-full z-50 mt-1 min-w-full overflow-hidden border shadow-xl",
            isDark
              ? "border-white/10 bg-charcoal"
              : "border-line bg-ivory",
          )}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => select(opt.value)}
              className={cn(
                "block w-full px-4 py-2.5 text-left text-sm transition-colors duration-200",
                isDark
                  ? "text-ivory/80 hover:bg-white/10 hover:text-ivory"
                  : "text-charcoal/70 hover:bg-ivory-200 hover:text-charcoal",
                opt.value === value &&
                  (isDark ? "bg-white/10 text-ivory" : "bg-ivory-200 text-charcoal font-medium"),
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

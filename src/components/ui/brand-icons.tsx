import type { SVGProps } from "react";

/**
 * Brand marks. Lucide removed brand icons in v1, so these are hand-rolled to
 * keep the icon set visually consistent with the rest of the UI.
 */

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M15.5 8.5h2.2V5.6h-2.4c-2.1 0-3.4 1.3-3.4 3.5v1.6H9.7v2.9h2.2V21h3.1v-7.4h2.3l.4-2.9h-2.7V9.4c0-.6.2-.9.8-.9Z" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M7.2 10.4V17M7.2 7.3v.1M11.4 17v-3.6a2.3 2.3 0 0 1 4.6 0V17M11.4 10.4V17" />
    </svg>
  );
}

export const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
} as const;

/** The Gray Group wordmark, drawn rather than set in type. */
export function Wordmark({
  className,
  subtitle = true,
}: {
  className?: string;
  subtitle?: boolean;
}) {
  return (
    <span className={className}>
      <span className="block font-display text-[1.35rem] leading-none tracking-[0.3em] sm:text-[1.5rem]">
        GRAY GROUP
      </span>
      {subtitle ? (
        <span className="mt-1.5 block text-[0.5rem] font-medium tracking-[0.34em] opacity-70 sm:text-[0.5625rem]">
          ARIZONA REAL ESTATE
        </span>
      ) : null}
    </span>
  );
}

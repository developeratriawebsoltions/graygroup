import Link from "next/link";

import { SmartImage } from "@/components/common/smart-image";
import { LinkedinIcon } from "@/components/ui/brand-icons";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/types";

export function TeamCard({
  member,
  className,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}: {
  member: TeamMember;
  className?: string;
  sizes?: string;
}) {
  return (
    <article className={cn("group", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory-200">
        <SmartImage
          src={member.portrait}
          alt={`${member.name}, ${member.role} at Gray Group`}
          fill
          quality={82}
          sizes={sizes}
          className="object-cover grayscale-[35%] transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:grayscale-0"
        />

        <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/15" />

        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="absolute right-5 top-5 flex h-10 w-10 translate-y-2 items-center justify-center bg-ivory text-charcoal opacity-0 transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-bronze hover:text-white group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
        >
          <LinkedinIcon className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-6">
        <h3 className="font-display text-[1.5rem] leading-tight text-charcoal">
          <Link
            href={`/team#${member.slug}`}
            className="transition-colors duration-500 hover:text-bronze"
          >
            {member.name}
          </Link>
        </h3>
        <p className="eyebrow mt-3 text-bronze">{member.role}</p>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-charcoal/60">{member.phone}</p>
        <p className="mt-1 text-[0.875rem] leading-relaxed text-charcoal/60">{member.email}</p>
        {member.credentials[0] && (
          <p className="mt-1 text-[0.875rem] leading-relaxed text-charcoal/60">{member.credentials[0]}</p>
        )}
      </div>
    </article>
  );
}

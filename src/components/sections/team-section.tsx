import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/common/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TeamCard } from "@/components/team/team-card";
import { team } from "@/lib/data/team";

export function TeamSection({ showAll = false }: { showAll?: boolean }) {
  const members = showAll ? team : team.slice(0, 4);

  return (
    <section className="bg-ivory-200/50 py-24 md:py-32 lg:py-40">
      <div className="shell">
        <SectionHeading
          eyebrow="The Team"
          title="People Behind the Properties."
          subtitle="A deliberately small practice. The person you meet at the first consultation is the person who negotiates your contract and attends your closing."
          action={
            showAll ? undefined : (
              <Link
                href="/team"
                className="group inline-flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 hover:text-bronze"
              >
                Meet The Team
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
                  strokeWidth={1.6}
                />
              </Link>
            )
          }
        />

        <RevealGroup className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {members.map((member) => (
            <RevealItem key={member.slug}>
              <TeamCard member={member} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

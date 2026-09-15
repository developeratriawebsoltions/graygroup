import type { TeamMember } from "@/types";

export const team: TeamMember[] = [
  {
    slug: "chris-gray",
    name: "Chris Gray",
    role: "Team Leader",
    portrait: "/images/team/chris_gray.webp",
    bio: "Team Leader",
    longBio: [],
    credentials: ["License #02012829"],
    email: "chris@graygrouprealty.com",
    phone: "+1 (323) 612-7086",
    linkedin: "https://linkedin.com",
    languages: ["English", "Spanish"],
  },
  {
    slug: "jan-gray",
    name: "Jan Gray",
    role: "Phoenix/Scottsdale Team Member",
    portrait: "/images/team/jan-gray.webp",
    bio: "Phoenix/Scottsdale Team Member",
    longBio: [],
    credentials: ["License #SA666035000"],
    email: "jan@graygrouprealty.com",
    phone: "+1 (602) 717-2422",
    linkedin: "https://linkedin.com",
    languages: ["English"],
  },
];

export function getTeamMember(slug: string): TeamMember | undefined {
  return team.find((m) => m.slug === slug);
}

export function getTeamMembers(slugs: string[]): TeamMember[] {
  return slugs
    .map((s) => getTeamMember(s))
    .filter((m): m is TeamMember => Boolean(m));
}

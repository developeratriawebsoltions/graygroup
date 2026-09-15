import type { TeamMember } from "@/types";

export const team: TeamMember[] = [
  {
    slug: "chris-gray",
    name: "Chris Gray",
    role: "Co-Founding Member",
    portrait: "/images/team/chris_gray.webp",
    bio: "Co-Founding Member, The Gray Group at Russ Lyon Sotheby's International Realty",
    longBio: [
      "Chris Gray is the co-founding member of The Gray Group at Russ Lyon Sotheby's International Realty along with Jan Gray. With more than half his life spent in Phoenix, he has lived all over the Valley and remains an honorary Phoenician.",
      "Chris' extensive education sets his foundation for professional success. He graduated from Arizona State University's W.P. Carey School of Business and Barrett the Honors College, as well as the U.S. State Department's Chinese Flagship Program where he reached the superior fluency level on the U.S. government's program completion exams. Chris also studied Chinese and history at Qinghua University in Beijing and Nanjing University, two of China's most prestigious universities.",
      "After completing the U.S. State Department Flagship program and his thesis on real estate entrepreneurship while in China, Chris lived and worked overseas in downtown Shanghai in the EB-5 immigration investment industry. He interacted heavily with Chinese investors who had the intention for themselves and/or for their children of immigrating to the United States by investing here in real estate.",
      "Since returning from Shanghai, Chris has accumulated over 8 years in commercial and residential real estate combined. In 2016, his sales production exceeded $10M of residential real estate and he earned the Certified Luxury Home Marketing Specialist (CLHMS) certification as well as RE/MAX's Executive and 100% Club achievement awards. His pride stems from helping so many clients both locally and internationally achieve their real estate goals in Arizona. Chris' international and domestic experience has made him a powerful asset to Russ Lyon Sotheby's International Realty in Scottsdale, Arizona. His in-depth knowledge of the Phoenix, Scottsdale, Paradise Valley and Tempe markets allows him to provide comprehensive resources for any question or need a client may have.",
    ],
    credentials: [
      "License #02012829",
      "Certified Luxury Home Marketing Specialist (CLHMS)",
      "RE/MAX Executive Club",
      "RE/MAX 100% Club",
    ],
    email: "chris@graygrouprealty.com",
    phone: "+1 (323) 612-7086",
    linkedin: "https://linkedin.com",
    languages: ["English", "Mandarin Chinese"],
  },
  {
    slug: "jan-gray",
    name: "Jan Gray",
    role: "Member",
    portrait: "/images/team/jan-gray.webp",
    bio: "Co-Founding Member, The Gray Group at Russ Lyon Sotheby's International Realty",
    longBio: [
      "Jan Gray is a member of the Gray Group, working directly with buyers and facilitating the selling process for sellers. Her passion for residential real estate along with garnered expertise spans decades.",
      "This included servicing retail flooring stores and design centers for new homes. Jan says, \"The extensive marketing and cutting-edge technology at Russ Lyon Sotheby's International Realty gives our team the tools to effectively sell your home for the highest price.\"",
      "Her keen eye for color and design assists buyers to envision seeing a house as their new home. So, whether you're a seller or buyer, she has you covered… Let's go!!!",
    ],
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

/**
 * Site content: edit copy and links here.
 * Contribution graph uses `github.username` (see github-contributions-api).
 */
export type SiteLinkIcon = 'github' | 'linkedin' | 'x'

export type SiteLink = {
  label: string
  href: string
  icon: SiteLinkIcon
}

export type Patent = {
  title: string
  number?: string
  year?: string
  href?: string
  summary?: string
}

export type ExperienceRow = {
  title: string
  organization: string
  period: string
  summary?: string
  href?: string
}

export type BlogPost = {
  title: string
  href: string
  date?: string
  summary?: string
}

export type OpenSourceContribution = {
  title: string
  href: string
  context?: string
}

export type Project = {
  name: string
  description: string
  href: string
  tags?: string[]
}

export type SiteGithub = {
  username: string
}

const github: SiteGithub = {
  username: 'white-wizard-2',
}

export const site = {
  meta: {
    title: 'Vinod Balakrishnan — Portfolio',
    description:
      'Portfolio for Vinod Balakrishnan — patents, open source, and projects.',
  },
  identity: {
    name: 'Vinod Balakrishnan',
    headline: 'Software engineer',
    about:
      'I love video. I love software. I love learning systems.',
    photo: {
      src: '/vinod.png',
      alt: 'Vinod Balakrishnan',
    },
  },
  links: [
    {
      label: 'GitHub',
      href: 'https://github.com/white-wizard-2',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/vinod-balakrishnan-82b14868/',
      icon: 'linkedin',
    },
    {
      label: 'X.com',
      href: 'https://x.com/whitewizar36161',
      icon: 'x',
    },
  ] satisfies SiteLink[],
  github,
  experience: [] as ExperienceRow[],
  patents: [] as Patent[],
  blogs: [] as BlogPost[],
  openSourceContributions: [] as OpenSourceContribution[],
  projects: [] as Project[],
}

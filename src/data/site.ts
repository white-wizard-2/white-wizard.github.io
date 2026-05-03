/**
 * Site content: edit copy and links here.
 * Contribution graph uses `github.username` (see github-contributions-api).
 */
export type SiteLink = {
  label: string
  href: string
}

export type Patent = {
  title: string
  number?: string
  year?: string
  href?: string
  summary?: string
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
    },
  ] satisfies SiteLink[],
  github,
  patents: [] as Patent[],
  projects: [] as Project[],
}

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

export type ExperienceRole = {
  title: string
  employmentType?: string
  period: string
  location: string
  arrangement?: string
}

export type ExperienceCompany = {
  id: string
  name: string
  logoSrc: string
  totalTenure?: string
  roles: ExperienceRole[]
}

const experience = [
  {
    id: 'v-nova',
    name: 'V-Nova Ltd.',
    logoSrc: '/experience/v-nova.jpeg',
    totalTenure: '8 yrs 2 mos',
    roles: [
      {
        title: 'Principal Software Engineer',
        employmentType: '',
        period: 'Oct 2025 – Present · 8 mos',
        location: 'London Area, United Kingdom',
        arrangement: '',
      },
      {
        title: 'Senior Software Engineer',
        employmentType: '',
        period: 'Jan 2023 – Oct 2025 · 2 yrs 10 mos',
        location: 'Greater London, England, United Kingdom',
        arrangement: '',
      },
      {
        title: 'Engineering Manager - India',
        period: 'Apr 2018 – Dec 2022 · 4 yrs 9 mos',
        location: 'Bengaluru, Karnataka, India',
      },
    ],
  },
  {
    id: 'fastfilmz',
    name: 'fastfilmz',
    logoSrc: '/experience/fastfilmz.jpeg',
    totalTenure: '1 yr 2 mos',
    roles: [
      {
        title: 'Engineering Manager',
        period: 'Mar 2017 – Apr 2018 · 1 yr 2 mos',
        location: 'Bangalore',
      },
    ],
  },
  {
    id: 'bydesign',
    name: 'ByDesign India Pvt Ltd',
    logoSrc: '/experience/bydesign.jpeg',
    totalTenure: '2 yrs 3 mos',
    roles: [
      {
        title: 'Automation Team Lead',
        period: 'May 2016 – Mar 2017 · 11 mos',
        location: 'Bengaluru Area, India',
      },
      {
        title: 'QA Engineer Headend Operations',
        period: 'Jan 2015 – May 2016 · 1 yr 5 mos',
        location: 'Greater Bengaluru Area',
      },
    ],
  },
  {
    id: 'lebara',
    name: 'Lebara Limited',
    logoSrc: '/experience/lebara.jpeg',
    totalTenure: '3 mos',
    roles: [
      {
        title: 'OTT SOC Engineer',
        period: 'Nov 2014 – Jan 2015 · 3 mos',
        location: 'Greater Chennai Area',
      },
    ],
  },
  {
    id: 'reliance',
    name: 'Reliance Communications',
    logoSrc: '/experience/reliance_communications.jpeg',
    totalTenure: '2 yrs 10 mos',
    roles: [
      {
        title: 'Assistant Manager',
        period: 'Feb 2012 – Nov 2014 · 2 yrs 10 mos',
        location: 'Mumbai Metropolitan Region',
      },
    ],
  },
] satisfies ExperienceCompany[]

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
  experience,
  patents: [] as Patent[],
  blogs: [] as BlogPost[],
  openSourceContributions: [] as OpenSourceContribution[],
  projects: [] as Project[],
}

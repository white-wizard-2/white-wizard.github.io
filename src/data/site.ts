/**
 * Site content: edit copy and links here.
 * Contribution graph uses `github.username` (see github-contributions-api).
 */
import { publicUrl } from '@/lib/public-url'
export type SiteLinkIcon = 'github' | 'linkedin' | 'x' | 'nvidia'

export type SiteLink = {
  label: string
  href: string
  icon: SiteLinkIcon
}

export type Patent = {
  title: string
  inventors: string[]
  status: 'granted' | 'applied'
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
    logoSrc: publicUrl('/experience/v-nova.jpeg'),
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
    logoSrc: publicUrl('/experience/fastfilmz.jpeg'),
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
    logoSrc: publicUrl('/experience/bydesign.jpeg'),
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
    logoSrc: publicUrl('/experience/lebara.jpeg'),
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
    logoSrc: publicUrl('/experience/reliance_communications.jpeg'),
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
  publisher: string
  publisherLogoSrc: string
  imageSrc: string
  date?: string
  summary?: string
}

const blogs = [
  {
    title:
      'VC-6 AI Blueprint: A Technical Deep Dive into VC-6 Enabled AI Multi-Inference Pipelines',
    href: 'https://v-nova.com/blog/vc-6-ai-blueprint-a-technical-deep-dive-into-vc-6-enabled-ai-multi-inference-pipelines/',
    publisher: 'V-Nova',
    publisherLogoSrc: publicUrl('/experience/v-nova.jpeg'),
    imageSrc: publicUrl('/blogs/blog1.png'),
    date: 'Feb 4, 2026',
    summary:
      'SMPTE VC-6 in a real-time AI video analytics pipeline: hierarchical decode, shared multi-model inference, and selective ROI refinement from one stream.',
  },
  {
    title:
      'Build High-Performance Vision AI Pipelines with NVIDIA CUDA-Accelerated VC-6',
    href: 'https://developer.nvidia.com/blog/build-high-performance-vision-ai-pipelines-with-nvidia-cuda-accelerated-vc-6/',
    publisher: 'NVIDIA Technical Blog',
    publisherLogoSrc: publicUrl('/blogs/nvidia-logo.png'),
    imageSrc: publicUrl('/blogs/blog2.png'),
    date: 'Sep 11, 2025',
    summary:
      'CUDA-accelerated VC-6 decode aligned with GPU parallelism—selective LoQ and RoI fetch, and throughput gains for vision AI workloads.',
  },
] satisfies BlogPost[]

export type OpenSourceContribution = {
  title: string
  href: string
  kind: 'pull-request' | 'repository'
  context?: string
}

const openSourceContributions = [
  {
    title: 'MPEG-5 Part 2 LCEVC in Shaka Player',
    href: 'https://github.com/shaka-project/shaka-player/pull/4050',
    kind: 'pull-request' as const,
    context:
      'Integrated MPEG-5 Part 2 LCEVC into Shaka Player for web playback with enhancement decoding.',
  },
  {
    title: 'SEI-based LCEVC decoding in dash.js',
    href: 'https://github.com/Dash-Industry-Forum/dash.js/pull/4491',
    kind: 'pull-request' as const,
    context:
      'MPEG-5 LCEVC in dash.js using SEI (Supplemental Enhancement Information) carriage, rendered on HTML5 canvas.',
  },
  {
    title: 'Scalable dual-track LCEVC delivery in dash.js',
    href: 'https://github.com/Dash-Industry-Forum/dash.js/pull/4572',
    kind: 'pull-request' as const,
    context:
      'Scalable implementation of dual-track LCEVC delivery in the DASH reference player.',
  },
  {
    title: 'LCEVCdecJS',
    href: 'https://github.com/v-novaltd/LCEVCdecJS',
    kind: 'repository' as const,
    context:
      'Maintainer of V-Nova’s MPEG-5 Part 2 LCEVC decoder for web (player integration, Shaka and dash.js demos).',
  },
  {
    title: 'VC-6 samples',
    href: 'https://github.com/v-novaltd/vc6-samples',
    kind: 'repository' as const,
    context:
      'Python samples for VC-6 encode and decode on CPU, CUDA, and OpenCL—batch paths, level-of-quality, ROI workflows, and benchmarking.',
  },
  {
    title: 'VC-6 AI Blueprint',
    href: 'https://github.com/v-novaltd/vc6-ai-blueprint',
    kind: 'repository' as const,
    context:
      'GPU-oriented VC-6 pipeline demo: multi-inference vision (e.g. YOLO, MediaPipe), LOQ and ROI-aware decode, and CustomTkinter UI.',
  },
  {
    title: 'androidx-media (Media3 / ExoPlayer fork)',
    href: 'https://github.com/v-novaltd/androidx-media',
    kind: 'repository' as const,
    context:
      'Custom MediaCodecAdapter-based integration of LCEVC with Android Jetpack Media3 / ExoPlayer.',
  },
  {
    title: 'Trinetr',
    href: 'https://github.com/white-wizard-2/trinetr',
    kind: 'repository' as const,
    context:
      'Model visualization and experimentation platform for CNNs, transformers, diffusion, and related architectures.',
  },
] satisfies OpenSourceContribution[]

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

const patentsGranted = [
  {
    title: 'Synchronising frame decoding in a multi-layer video stream',
    inventors: [
      'Andrew Jordan',
      'Elias Serrano',
      'Dean Alexandrou',
      'Vinod Balakrishnan',
    ],
    status: 'granted' as const,
    number: 'US20250159219 A1',
    year: '2025',
    href: 'https://patents.google.com/patent/US20250159219A1/en',
    summary:
      'Pairs base- and enhancement-layer decoded frames using timing metadata and timestamps when layers are decoded by separate paths (e.g. hardware base + LCEVC), then combines them for output.',
  },
  {
    title: 'Implementing enhancement coding schemes in streaming applications',
    inventors: ['Fabio Murra', 'Vinod Balakrishnan'],
    status: 'granted' as const,
    number: 'EP4696026 A1',
    year: '2026',
    href: 'https://patents.google.com/patent/EP4696026A1/en',
    summary:
      'Manifest-driven streaming for enhancement-coded media: metadata points to a base representation and associated enhancement-layer segment locations for packaging and client playback.',
  },
  {
    title: 'Rendering of video signals',
    inventors: ['Vinod Balakrishnan'],
    status: 'granted' as const,
    number: 'GB2635736 A',
    year: '2025',
    href: 'https://patents.google.com/patent/GB2635736A/en',
    summary:
      'Renders base-layer video in an HTML video element and overlays separately decoded residual enhancement streams in a coincident region for higher-quality browser playback.',
  },
] satisfies Patent[]
const patentsApplied = [] satisfies Patent[]

export const site = {
  meta: {
    title: 'Vinod Balakrishnan — Portfolio',
    description:
      'Portfolio for Vinod Balakrishnan — patents, open source, and projects.',
  },
  identity: {
    name: 'Vinod Balakrishnan',
    moniker: 'White Wizard',
    headline: 'Engineer | Inventor | Builder',
    about:
      'I love video. I love software. I love learning systems.',
    photo: {
      src: publicUrl('/vinod.png'),
      alt: 'Vinod Balakrishnan',
      mysticSrc: publicUrl('/whitewizard.jpg'),
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
      label: 'NVIDIA Technical Blog',
      href: 'https://developer.nvidia.com/blog/author/vinodbalakrishnan/',
      icon: 'nvidia',
    },
    {
      label: 'X.com',
      href: 'https://x.com/whitewizar36161',
      icon: 'x',
    },
  ] satisfies SiteLink[],
  github,
  experience,
  patentsGranted,
  patentsApplied,
  blogs,
  openSourceContributions,
  projects: [] as Project[],
}

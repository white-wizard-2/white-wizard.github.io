import type { ComponentProps, ReactNode } from 'react'
import { ExternalLink } from 'lucide-react'
import { GithubMark, LinkedinMark, XMark } from '@/components/brand-icons'
import { GithubContributionGraph } from '@/components/portfolio/github-contribution-graph'
import { PortfolioTabbedSection } from '@/components/portfolio/portfolio-tabbed-section'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { site } from '@/data/site'
import type { SiteLink } from '@/data/site'
import { cn } from '@/lib/utils'

const linkIcons = {
  github: GithubMark,
  linkedin: LinkedinMark,
  x: XMark,
} satisfies Record<SiteLink['icon'], typeof GithubMark>

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 font-mono text-[11px] tracking-[0.28em] text-primary uppercase">
      {children}
    </p>
  )
}

function LogoMark({
  className,
  decorative = false,
}: {
  className?: string
  decorative?: boolean
}) {
  return (
    <img
      src={site.identity.photo.src}
      alt={decorative ? '' : site.identity.photo.alt}
      width={192}
      height={192}
      decoding="async"
      className={cn(
        'shrink-0 rounded-full border-2 border-primary/45 object-cover shadow-[0_0_28px_-10px_oklch(0.78_0.12_195_/_0.55)]',
        className,
      )}
    />
  )
}

function GlowCard({ className, ...props }: ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        'border-border/80 bg-card/60 shadow-[0_0_0_1px_oklch(1_0_0_/_6%)_inset] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-primary/35 hover:shadow-[0_0_48px_-16px_oklch(0.78_0.12_195_/_0.35)]',
        className,
      )}
      {...props}
    />
  )
}

function App() {
  const showProjects = site.projects.length > 0

  return (
    <div className="relative flex h-svh max-h-svh w-full flex-col overflow-hidden">
      <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <section
          id="hero"
          className="w-full px-5 pt-12 pb-6 sm:px-8 sm:pb-6 lg:px-12 lg:pt-16 lg:pb-7"
          aria-labelledby="hero-heading"
        >
          <div className="mx-auto w-full max-w-[min(100%,2400px)]">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,26%)] lg:items-start lg:gap-10">
              {/* Profile: logo left, copy right; full width of column */}
              <div className="flex min-w-0 w-full flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                <div className="flex shrink-0 justify-start sm:pt-0.5">
                  <LogoMark
                    decorative
                    className="size-40 rounded-full object-cover sm:size-44 lg:size-48"
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-4 text-left">
                  <h1
                    id="hero-heading"
                    className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl sm:text-nowrap lg:text-5xl"
                  >
                    <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                      {site.identity.name}
                    </span>
                  </h1>
                  <p className="text-base text-primary sm:text-lg sm:text-nowrap">
                    {site.identity.headline}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base sm:text-nowrap">
                    {site.identity.about}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {site.links.map((link) => {
                      const Icon = linkIcons[link.icon]
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            buttonVariants({ variant: 'default', size: 'sm' }),
                          )}
                        >
                          <Icon
                            className="size-3.5 shrink-0"
                            data-icon="inline-start"
                          />
                          {link.label}
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div
                id="contributions"
                className="min-w-0 w-full lg:pt-1"
                aria-labelledby="contributions-heading"
              >
                <h2 id="contributions-heading" className="sr-only">
                  GitHub contributions
                </h2>
                <GithubContributionGraph
                  key={site.github.username}
                  username={site.github.username}
                  size="compact"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <PortfolioTabbedSection />

        {showProjects ? (
          <section
            id="projects"
            className="w-full border-t border-border/50 px-5 py-12 sm:px-8 lg:px-12 lg:py-16"
            aria-labelledby="projects-heading"
          >
            <div className="mx-auto max-w-[1800px]">
              <SectionLabel>Selected work</SectionLabel>
              <h2
                id="projects-heading"
                className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Projects
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Products and initiatives beyond a single repo.
              </p>
              <ul className="mt-8 grid list-none gap-5 p-0 md:grid-cols-2 xl:grid-cols-3">
                {site.projects.map((project) => (
                  <li key={project.href}>
                    <GlowCard className="h-full">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 hover:text-primary"
                          >
                            {project.name}
                            <ExternalLink
                              className="size-3.5 opacity-60"
                              aria-hidden
                            />
                          </a>
                        </CardTitle>
                        <CardDescription className="text-sm leading-relaxed">
                          {project.description}
                        </CardDescription>
                        {project.tags && project.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {project.tags.map((t) => (
                              <Badge key={t} variant="secondary">
                                {t}
                              </Badge>
                            ))}
                          </div>
                        ) : null}
                      </CardHeader>
                    </GlowCard>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </main>

      <footer className="w-full shrink-0 border-t border-border/50 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1800px] flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            {site.identity.name} · GitHub Pages
          </p>
          <Separator
            orientation="vertical"
            className="hidden h-8 sm:block"
          />
          <p className="font-mono text-xs text-muted-foreground">
            React · Vite · Tailwind · shadcn
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

import { ExternalLink } from 'lucide-react'
import { BlogPostsPanel } from '@/components/portfolio/blog-posts-panel'
import { ExperienceCareerPanel } from '@/components/portfolio/experience-career-panel'
import { OpenSourceContributionsPanel } from '@/components/portfolio/open-source-contributions-panel'
import { PatentsPanel } from '@/components/portfolio/patents-panel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-lg font-mono text-xs tracking-wide text-muted-foreground">
      {children}
    </p>
  )
}

const githubProfileHref = site.links.find((l) =>
  /github\.com/i.test(l.href),
)?.href

export function PortfolioTabbedSection() {
  return (
    <section
      id="workspace"
      className="w-full min-w-0 max-w-full px-5 pt-1 pb-10 sm:px-8 sm:pt-2 sm:pb-12 lg:px-12 lg:pb-14"
      aria-label="Portfolio workspace"
    >
      <div className="mx-auto w-full min-w-0 max-w-[min(100%,2400px)]">
        <div className="min-w-0 max-w-full rounded-lg bg-card/35 backdrop-blur-md">
          <Tabs defaultValue="experience">
            <TabsList aria-label="Portfolio categories">
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="patents">Patents</TabsTrigger>
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="open-source">
                Open Source Contributions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="experience">
              {site.experience.length === 0 ? (
                <EmptyHint>
                  Add roles in{' '}
                  <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.7rem] text-foreground">
                    src/data/site.ts
                  </code>{' '}
                  under <code className="font-mono text-[0.7rem]">experience</code>.
                </EmptyHint>
              ) : (
                <ExperienceCareerPanel companies={site.experience} />
              )}
            </TabsContent>

            <TabsContent value="patents">
              {site.patentsGranted.length === 0 &&
              site.patentsApplied.length === 0 ? (
                <EmptyHint>
                  Add patents in{' '}
                  <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.7rem] text-foreground">
                    src/data/site.ts
                  </code>{' '}
                  under{' '}
                  <code className="font-mono text-[0.7rem]">
                    patentsGranted
                  </code>{' '}
                  and{' '}
                  <code className="font-mono text-[0.7rem]">
                    patentsApplied
                  </code>
                  .
                </EmptyHint>
              ) : (
                <PatentsPanel
                  granted={site.patentsGranted}
                  applied={site.patentsApplied}
                />
              )}
            </TabsContent>

            <TabsContent value="blogs">
              {site.blogs.length === 0 ? (
                <EmptyHint>
                  Add posts in{' '}
                  <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.7rem] text-foreground">
                    src/data/site.ts
                  </code>{' '}
                  under <code className="font-mono text-[0.7rem]">blogs</code>.
                </EmptyHint>
              ) : (
                <BlogPostsPanel posts={site.blogs} />
              )}
            </TabsContent>

            <TabsContent value="open-source">
              {site.openSourceContributions.length === 0 ? (
                <div className="space-y-3">
                  <EmptyHint>
                    Add entries in{' '}
                    <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.7rem] text-foreground">
                      src/data/site.ts
                    </code>{' '}
                    under{' '}
                    <code className="font-mono text-[0.7rem]">
                      openSourceContributions
                    </code>
                    .
                  </EmptyHint>
                  {githubProfileHref ? (
                    <a
                      href={githubProfileHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'inline-flex items-center gap-2 font-mono text-xs tracking-wide text-primary hover:underline',
                      )}
                    >
                      GitHub profile
                      <ExternalLink className="size-3.5" />
                    </a>
                  ) : null}
                </div>
              ) : (
                <div className="space-y-4">
                  <OpenSourceContributionsPanel
                    items={site.openSourceContributions}
                  />
                  {githubProfileHref ? (
                    <a
                      href={githubProfileHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'inline-flex items-center gap-2 font-mono text-xs tracking-wide text-primary hover:underline',
                      )}
                    >
                      GitHub profile
                      <ExternalLink className="size-3.5" />
                    </a>
                  ) : null}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

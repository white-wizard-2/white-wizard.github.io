import type { ComponentProps } from 'react'
import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

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
        <div className="min-w-0 max-w-full overflow-hidden rounded-lg bg-card/35 backdrop-blur-md">
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
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-border/60 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                        <th className="pb-3 pr-4 font-medium">Period</th>
                        <th className="pb-3 pr-4 font-medium">Role</th>
                        <th className="pb-3 font-medium">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      {site.experience.map((row) => (
                        <tr
                          key={`${row.organization}-${row.title}-${row.period}`}
                          className="border-b border-border/40 last:border-0"
                        >
                          <td className="py-3 pr-4 align-top font-mono text-xs text-primary/90 whitespace-nowrap">
                            {row.period}
                          </td>
                          <td className="py-3 pr-4 align-top text-foreground">
                            <div className="font-medium">{row.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {row.organization}
                            </div>
                          </td>
                          <td className="py-3 align-top">
                            {row.href ? (
                              <a
                                href={row.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                              >
                                {row.summary ?? 'Link'}
                                <ExternalLink className="size-3 shrink-0 opacity-70" />
                              </a>
                            ) : (
                              row.summary ?? '—'
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="patents">
              {site.patents.length === 0 ? (
                <EmptyHint>
                  Add patents in{' '}
                  <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.7rem] text-foreground">
                    src/data/site.ts
                  </code>{' '}
                  under <code className="font-mono text-[0.7rem]">patents</code>.
                </EmptyHint>
              ) : (
                <ul className="grid list-none gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
                  {site.patents.map((patent) => (
                    <li
                      key={`${patent.title}-${patent.number ?? patent.year ?? ''}`}
                    >
                      <GlowCard className="h-full">
                        <CardHeader>
                          <div className="flex flex-wrap items-center gap-2">
                            {patent.year ? (
                              <Badge variant="secondary">{patent.year}</Badge>
                            ) : null}
                            {patent.number ? (
                              <Badge
                                variant="outline"
                                className="font-mono text-xs"
                              >
                                {patent.number}
                              </Badge>
                            ) : null}
                          </div>
                          <CardTitle className="text-lg leading-snug">
                            {patent.href ? (
                              <a
                                href={patent.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-start gap-1.5 underline-offset-4 hover:text-primary hover:underline"
                              >
                                {patent.title}
                                <ExternalLink
                                  className="mt-0.5 size-3.5 shrink-0 opacity-60"
                                  aria-hidden
                                />
                              </a>
                            ) : (
                              patent.title
                            )}
                          </CardTitle>
                          {patent.summary ? (
                            <CardDescription className="text-sm leading-relaxed">
                              {patent.summary}
                            </CardDescription>
                          ) : null}
                        </CardHeader>
                      </GlowCard>
                    </li>
                  ))}
                </ul>
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
                <ul className="grid list-none gap-3 p-0">
                  {site.blogs.map((post) => (
                    <li
                      key={post.href}
                      className="flex flex-col gap-1 border-b border-border/40 py-3 last:border-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <a
                        href={post.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 font-medium text-foreground hover:text-primary"
                      >
                        {post.title}
                        <ExternalLink className="size-3.5 opacity-50 group-hover:opacity-80" />
                      </a>
                      <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-muted-foreground">
                        {post.date ? <span>{post.date}</span> : null}
                        {post.summary ? (
                          <span className="hidden max-w-md truncate sm:inline">
                            {post.summary}
                          </span>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
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
                <ul className="grid list-none gap-3 p-0">
                  {site.openSourceContributions.map((item) => (
                    <li
                      key={item.href}
                      className="flex flex-col gap-1 border-b border-border/40 py-3 last:border-0 sm:flex-row sm:items-start sm:justify-between"
                    >
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 font-medium text-foreground hover:text-primary"
                      >
                        {item.title}
                        <ExternalLink className="size-3.5 opacity-50 group-hover:opacity-80" />
                      </a>
                      {item.context ? (
                        <span className="max-w-xl font-mono text-xs text-muted-foreground">
                          {item.context}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

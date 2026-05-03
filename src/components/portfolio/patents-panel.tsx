import type { ComponentProps } from 'react'
import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Patent } from '@/data/site'
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

function PatentGrid({ patents }: { patents: Patent[] }) {
  if (patents.length === 0) {
    return (
      <p className="font-mono text-xs tracking-wide text-muted-foreground">
        No patents in this category yet.
      </p>
    )
  }
  return (
    <ul className="grid list-none gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
      {patents.map((patent) => (
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
                  <Badge variant="outline" className="font-mono text-xs">
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
  )
}

export function PatentsPanel({
  granted,
  applied,
}: {
  granted: Patent[]
  applied: Patent[]
}) {
  return (
    <div className="space-y-10">
      <section aria-labelledby="patents-granted-heading">
        <h3
          id="patents-granted-heading"
          className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
        >
          Granted
        </h3>
        <PatentGrid patents={granted} />
      </section>
      <section aria-labelledby="patents-applied-heading">
        <h3
          id="patents-applied-heading"
          className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
        >
          Applied
        </h3>
        <PatentGrid patents={applied} />
      </section>
    </div>
  )
}

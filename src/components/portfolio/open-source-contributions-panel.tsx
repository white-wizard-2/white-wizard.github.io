import type { ComponentProps } from 'react'
import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { OpenSourceContribution } from '@/data/site'
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

const kindLabel: Record<OpenSourceContribution['kind'], string> = {
  'pull-request': 'Pull request',
  repository: 'Repository',
}

export function OpenSourceContributionsPanel({
  items,
}: {
  items: OpenSourceContribution[]
}) {
  return (
    <ul className="grid list-none gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <li key={item.href}>
          <GlowCard className="h-full">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{kindLabel[item.kind]}</Badge>
              </div>
              <CardTitle className="text-lg leading-snug">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-1.5 underline-offset-4 hover:text-primary hover:underline"
                >
                  {item.title}
                  <ExternalLink
                    className="mt-0.5 size-3.5 shrink-0 opacity-60"
                    aria-hidden
                  />
                </a>
              </CardTitle>
              {item.context ? (
                <CardDescription className="text-sm leading-relaxed">
                  {item.context}
                </CardDescription>
              ) : null}
            </CardHeader>
          </GlowCard>
        </li>
      ))}
    </ul>
  )
}

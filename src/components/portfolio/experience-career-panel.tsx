import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { ExperienceCompany, ExperienceRole } from '@/data/site'
import { cn } from '@/lib/utils'

/** Matches GlowCard / workspace cards: border, glass surface, inset highlight */
const surfaceCard = cn(
  'border-border/80 bg-card/60 shadow-[0_0_0_1px_oklch(1_0_0_/_6%)_inset] backdrop-blur-xl',
)

function TimelineConnector({ index, total }: { index: number; total: number }) {
  const isFirst = index === 0
  const isLast = index === total - 1

  return (
    <div
      className="relative flex h-6 items-center justify-center"
      aria-hidden
    >
      {!isFirst ? (
        <div className="absolute right-1/2 left-0 top-1/2 z-0 h-px -translate-y-1/2 bg-primary/45" />
      ) : null}
      <span
        className={cn(
          'relative z-[1] size-2.5 shrink-0 rounded-full border-2 border-primary/80 bg-primary/20',
          'shadow-[0_0_0_3px_oklch(0.72_0.14_195_/_0.12),0_0_14px_oklch(0.72_0.14_195_/_0.25)]',
        )}
      />
      {!isLast ? (
        <div className="absolute left-1/2 right-0 top-1/2 z-0 h-px -translate-y-1/2 bg-primary/45" />
      ) : null}
    </div>
  )
}

function RoleBlock({ role, isFirst }: { role: ExperienceRole; isFirst: boolean }) {
  const detail = [role.employmentType, role.period].filter(Boolean).join(' · ')
  const where = [role.location, role.arrangement].filter(Boolean).join(' · ')

  return (
    <div
      className={cn(
        'space-y-1',
        !isFirst && 'border-t border-border/80 pt-2',
      )}
    >
      <CardTitle className="text-xs font-medium leading-snug sm:text-sm">
        {role.title}
      </CardTitle>
      {detail ? (
        <p className="font-mono text-[11px] leading-relaxed tracking-wide text-muted-foreground">
          {detail}
        </p>
      ) : null}
      {where ? (
        <p className="font-mono text-[11px] leading-relaxed tracking-wide text-muted-foreground">
          {where}
        </p>
      ) : null}
    </div>
  )
}

function ExperienceColumn({ company }: { company: ExperienceCompany }) {
  const isCurrent = company.roles.some((r) => /\bpresent\b/i.test(r.period))

  return (
    <Card
      size="sm"
      className="flex h-full min-h-0 flex-col gap-0 rounded-none border-0 bg-transparent py-0 text-card-foreground shadow-none ring-0"
    >
      <CardHeader className="shrink-0 space-y-1.5 border-b border-border/80 px-2 py-2 text-center [.border-b]:pb-2">
        <img
          src={company.logoSrc}
          alt=""
          width={40}
          height={40}
          decoding="async"
          className="mx-auto size-9 rounded-md border border-border bg-background object-contain p-0.5 ring-1 ring-foreground/10"
        />
        <div className="space-y-1">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <CardTitle className="text-xs font-semibold leading-snug sm:text-sm">
              {company.name}
            </CardTitle>
            {isCurrent ? (
              <Badge variant="secondary" className="font-mono text-[10px] font-medium">
                Current
              </Badge>
            ) : null}
          </div>
          {company.totalTenure ? (
            <CardDescription className="font-mono text-xs tracking-wide">
              {company.totalTenure}
            </CardDescription>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-2 py-2">
        <div className="space-y-2">
          {company.roles.map((role, i) => (
            <RoleBlock key={`${role.title}-${role.period}`} role={role} isFirst={i === 0} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ExperienceCareerPanel({
  companies,
}: {
  companies: ExperienceCompany[]
}) {
  const n = companies.length
  if (n === 0) return null

  return (
    <div className="w-full min-w-0">
      <div
        className={cn(
          'grid h-[min(38vh,400px)] w-full min-w-0 gap-0 overflow-hidden rounded-xl text-sm',
          surfaceCard,
          'bg-[linear-gradient(180deg,oklch(1_0_0/3%)_0%,transparent_48%)]',
        )}
        style={{
          gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
          gridTemplateRows: 'auto minmax(0, 1fr)',
        }}
      >
        {companies.map((company, index) => (
          <div
            key={`tl-${company.id}`}
            className={cn(
              'border-b border-border/80 bg-card/30 px-2 py-1',
              index < n - 1 && 'border-r border-border/80',
            )}
            style={{ gridColumn: index + 1, gridRow: 1 }}
          >
            <TimelineConnector index={index} total={n} />
          </div>
        ))}
        {companies.map((company, index) => (
          <div
            key={company.id}
            className={cn('min-h-0 min-w-0', index < n - 1 && 'border-r border-border/80')}
            style={{ gridColumn: index + 1, gridRow: 2 }}
          >
            <ExperienceColumn company={company} />
          </div>
        ))}
      </div>
    </div>
  )
}

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

function RoleBlock({ role, isFirst }: { role: ExperienceRole; isFirst: boolean }) {
  const detail = [role.employmentType, role.period].filter(Boolean).join(' · ')
  const where = [role.location, role.arrangement].filter(Boolean).join(' · ')

  return (
    <div
      className={cn(
        'space-y-1',
        !isFirst && 'border-t border-border/80 pt-3',
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
      <CardHeader className="shrink-0 space-y-2 border-b border-border/80 px-3 py-3 text-center [.border-b]:pb-3">
        <img
          src={company.logoSrc}
          alt=""
          width={48}
          height={48}
          decoding="async"
          className="mx-auto size-11 rounded-md border border-border bg-background object-contain p-0.5 ring-1 ring-foreground/10"
        />
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <CardTitle className="text-sm font-semibold leading-snug">
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
      <CardContent className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-3">
        <div className="space-y-3">
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
          'grid h-[min(56vh,600px)] w-full min-w-0 gap-0 overflow-hidden rounded-xl text-sm',
          surfaceCard,
          'bg-[linear-gradient(180deg,oklch(1_0_0/3%)_0%,transparent_48%)]',
        )}
        style={{
          gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
        }}
      >
        {companies.map((company, index) => (
          <div
            key={company.id}
            className={cn('min-h-0 min-w-0', index < n - 1 && 'border-r border-border/80')}
          >
            <ExperienceColumn company={company} />
          </div>
        ))}
      </div>
    </div>
  )
}

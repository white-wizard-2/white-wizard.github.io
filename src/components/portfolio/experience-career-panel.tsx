import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { ExperienceCompany } from '@/data/site'
import { cn } from '@/lib/utils'

function CompanyLogo({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      width={56}
      height={56}
      decoding="async"
      className="size-12 shrink-0 rounded-md border border-border bg-background object-contain p-0.5 sm:size-14"
    />
  )
}

function RoleEntry({
  role,
  showTopRule,
}: {
  role: ExperienceCompany['roles'][number]
  showTopRule: boolean
}) {
  const metaLine = [role.employmentType, role.period].filter(Boolean).join(' · ')
  const locationLine = [role.location, role.arrangement].filter(Boolean).join(' · ')

  return (
    <div
      className={cn(
        'space-y-1',
        showTopRule && 'border-t border-border/70 pt-4',
      )}
    >
      <p className="text-sm font-medium leading-snug text-foreground">
        {role.title}
      </p>
      {metaLine ? (
        <p className="text-xs leading-relaxed text-muted-foreground">{metaLine}</p>
      ) : null}
      {locationLine ? (
        <p className="text-xs leading-relaxed text-muted-foreground">{locationLine}</p>
      ) : null}
    </div>
  )
}

function ExperienceCompanyCard({ company }: { company: ExperienceCompany }) {
  const isCurrent = company.roles.some((r) => /\bpresent\b/i.test(r.period))

  return (
    <Card
      size="sm"
      className="border-border/80 bg-card shadow-none ring-1 ring-border/60"
    >
      <CardHeader className="border-b border-border/60 pb-3">
        <div className="flex gap-3 sm:gap-4">
          <CompanyLogo src={company.logoSrc} />
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
              <div className="min-w-0">
                <CardTitle className="text-base font-semibold leading-snug sm:text-[1.05rem]">
                  {company.name}
                </CardTitle>
              </div>
              {isCurrent ? (
                <Badge variant="secondary" className="shrink-0 text-[10px] font-medium">
                  Current
                </Badge>
              ) : null}
            </div>
            {company.totalTenure ? (
              <CardDescription className="text-xs leading-normal">
                {company.totalTenure}
              </CardDescription>
            ) : null}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {company.roles.map((role, index) => (
          <RoleEntry
            key={`${role.title}-${role.period}`}
            role={role}
            showTopRule={index > 0}
          />
        ))}
      </CardContent>
    </Card>
  )
}

export function ExperienceCareerPanel({
  companies,
}: {
  companies: ExperienceCompany[]
}) {
  return (
    <div className="flex flex-col gap-4">
      {companies.map((company) => (
        <ExperienceCompanyCard key={company.id} company={company} />
      ))}
    </div>
  )
}

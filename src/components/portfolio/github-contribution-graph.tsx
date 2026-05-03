import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  fetchContributionsAll,
  type ContributionDay,
} from '@/lib/github-contributions-api'
import { cn } from '@/lib/utils'

/** GitHub dark-theme contribution greens */
const LEVEL = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'] as const
const PAD = '#0d1117'

const REFRESH_MS = 300_000

function toLocalISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

type GraphDay = {
  date: string
  level: number
  count: number
  inSpan: boolean
}

/** ~53 weeks (GitHub-style): from Sunday 52 weeks before this week through Saturday of the current week; data only through local `now` (today). */
function buildLast53WeeksWindow(
  contributions: ContributionDay[],
  now: Date,
): {
  weeks: GraphDay[][]
  totalInWindow: number
  totalByYear: Record<string, number>
} {
  const map = new Map(contributions.map((c) => [c.date, c]))

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const thisWeekSunday = new Date(today)
  thisWeekSunday.setDate(thisWeekSunday.getDate() - thisWeekSunday.getDay())

  const gridStart = new Date(thisWeekSunday)
  gridStart.setDate(gridStart.getDate() - 52 * 7)

  const gridEnd = new Date(thisWeekSunday)
  gridEnd.setDate(gridEnd.getDate() + 6)

  const cells: GraphDay[] = []
  let totalInWindow = 0
  const totalByYear: Record<string, number> = {}

  for (let d = new Date(gridStart); d <= gridEnd; d.setDate(d.getDate() + 1)) {
    const iso = toLocalISODate(d)
    const inSpan = d <= today
    const entry = map.get(iso)
    const count = inSpan ? (entry?.count ?? 0) : 0
    const level = inSpan ? (entry?.level ?? 0) : 0

    if (inSpan) {
      totalInWindow += count
      if (count > 0) {
        const y = String(d.getFullYear())
        totalByYear[y] = (totalByYear[y] ?? 0) + count
      }
    }

    cells.push({
      date: iso,
      level,
      count,
      inSpan,
    })
  }

  const weeks: GraphDay[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }

  return { weeks, totalInWindow, totalByYear }
}

export type GithubContributionGraphProps = {
  username: string
  className?: string
  size?: 'default' | 'compact'
}

export function GithubContributionGraph({
  username,
  className,
  size = 'default',
}: GithubContributionGraphProps) {
  const graphScrollRef = useRef<HTMLDivElement>(null)

  const [state, setState] = useState<
    | { status: 'loading' }
    | { status: 'error'; message: string }
    | { status: 'ok'; contributions: ContributionDay[] }
  >({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    let ac: AbortController | null = null

    const run = () => {
      ac?.abort()
      ac = new AbortController()
      fetchContributionsAll(username, ac.signal)
        .then((res) => {
          if (cancelled) return
          setState({
            status: 'ok',
            contributions: res.contributions,
          })
        })
        .catch((err: unknown) => {
          if (cancelled) return
          if (err instanceof DOMException && err.name === 'AbortError') return
          const message =
            err instanceof Error ? err.message : 'Could not load contributions.'
          setState({ status: 'error', message })
        })
    }

    run()
    const interval = window.setInterval(run, REFRESH_MS)
    return () => {
      cancelled = true
      ac?.abort()
      window.clearInterval(interval)
    }
  }, [username])

  const windowGraph = useMemo(() => {
    if (state.status !== 'ok') return null
    return buildLast53WeeksWindow(state.contributions, new Date())
  }, [state])

  const weeks = windowGraph?.weeks ?? []
  const totalInWindow = windowGraph?.totalInWindow ?? 0
  const totalByYearWindow = windowGraph?.totalByYear ?? {}

  const cell = size === 'compact' ? 7 : 11
  const gap = size === 'compact' ? 2 : 3
  const cols = weeks.length
  const vbW = cols * (cell + gap) - gap
  const vbH = 7 * (cell + gap) - gap

  useLayoutEffect(() => {
    if (state.status !== 'ok' || weeks.length === 0) return
    const el = graphScrollRef.current
    if (!el) return
    const snapEnd = () => {
      el.scrollLeft = el.scrollWidth - el.clientWidth
    }
    snapEnd()
    requestAnimationFrame(snapEnd)
    const ro = new ResizeObserver(snapEnd)
    ro.observe(el)
    return () => ro.disconnect()
  }, [state.status, weeks.length, cols, vbW, vbH, size])

  const yearSummary =
    state.status === 'ok'
      ? Object.keys(totalByYearWindow)
          .sort()
          .map((y) => `${y}: ${totalByYearWindow[y]}`)
          .join(' · ')
      : ''

  return (
    <div
      className={cn(
        'flex min-h-0 min-w-0 flex-col rounded-xl border border-[#30363d] bg-[#0d1117] shadow-inner',
        size === 'compact' ? 'p-2.5 sm:p-3' : 'p-3 sm:p-4',
        className,
      )}
    >
      <div
        className={cn(
          'flex flex-wrap items-baseline justify-between gap-2',
          size === 'compact' ? 'mb-1.5' : 'mb-2',
        )}
      >
        <div>
          <p
            className={cn(
              'font-semibold text-[#e6edf3]',
              size === 'compact' ? 'text-xs' : 'text-sm',
            )}
          >
            {state.status === 'ok' ? (
              <>
                <span className="text-[#39d353]">{totalInWindow}</span>
                <span className="font-normal text-[#8b949e]">
                  {' '}
                  contributions
                </span>
              </>
            ) : (
              <span className="text-[#8b949e]">Contributions</span>
            )}
          </p>
          {state.status === 'ok' && yearSummary ? (
            <p className="mt-0.5 font-mono text-[10px] leading-snug text-[#6e7681]">
              {yearSummary}
            </p>
          ) : null}
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs text-[#58a6ff] hover:underline"
        >
          @{username}
        </a>
      </div>

      {state.status === 'loading' ? (
        <p className="font-mono text-xs text-[#8b949e]">Loading graph…</p>
      ) : null}
      {state.status === 'error' ? (
        <p className="text-sm text-red-400">{state.message}</p>
      ) : null}

      {state.status === 'ok' && weeks.length > 0 ? (
        <div
          ref={graphScrollRef}
          className="min-h-0 w-full max-w-full flex-1 overflow-x-auto overflow-y-hidden [scrollbar-gutter:stable]"
        >
          <svg
            viewBox={`0 0 ${vbW} ${vbH}`}
            className={cn(
              'mx-auto block max-w-none shrink-0',
              size === 'compact'
                ? 'h-[10.8rem] w-auto sm:h-[4.6rem]'
                : 'h-auto w-max max-h-[min(42vh,320px)] sm:max-h-[min(55vh,580px)]',
            )}
            preserveAspectRatio="xMinYMid meet"
            role="img"
            aria-label={`Last 53 weeks of GitHub contributions for ${username}, through today`}
          >
            {weeks.map((week, wi) =>
              week.map((day, di) => {
                const x = wi * (cell + gap)
                const y = di * (cell + gap)
                const fill = day.inSpan
                  ? LEVEL[Math.min(4, Math.max(0, day.level))] ?? LEVEL[0]
                  : PAD
                return (
                  <rect
                    key={`${day.date}-${wi}-${di}`}
                    x={x}
                    y={y}
                    width={cell}
                    height={cell}
                    rx={size === 'compact' ? 1.5 : 2}
                    fill={fill}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth={0.5}
                  >
                    <title>
                      {day.count} contributions on {day.date}
                    </title>
                  </rect>
                )
              }),
            )}
          </svg>
        </div>
      ) : null}

      <div
        className={cn(
          'flex flex-wrap items-center gap-2 border-t border-[#30363d]',
          size === 'compact' ? 'mt-2 pt-1.5' : 'mt-3 pt-2',
        )}
      >
        <span
          className={cn(
            'text-[#8b949e]',
            size === 'compact' ? 'text-[10px]' : 'text-xs',
          )}
        >
          Less
        </span>
        <div className="flex gap-0.5">
          {LEVEL.map((c) => (
            <span
              key={c}
              className={cn(
                'rounded-sm border border-[#30363d]',
                size === 'compact' ? 'size-2.5' : 'size-3',
              )}
              style={{ backgroundColor: c }}
              aria-hidden
            />
          ))}
        </div>
        <span
          className={cn(
            'text-[#8b949e]',
            size === 'compact' ? 'text-[10px]' : 'text-xs',
          )}
        >
          More
        </span>
        <span
          className={cn(
            'ml-auto font-mono text-[#6e7681]',
            size === 'compact' ? 'text-[9px]' : 'text-[10px]',
          )}
        >
          Last 53 wks · jogruber.de · {REFRESH_MS / 60_000}m refresh
        </span>
      </div>
    </div>
  )
}

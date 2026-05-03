export type ContributionDay = {
  date: string
  count: number
  level: number
}

export type ContributionsResponse = {
  total: Record<string, number>
  contributions: ContributionDay[]
}

/** Full public contribution history (omit year query). */
export async function fetchContributionsAll(
  username: string,
  signal?: AbortSignal,
): Promise<ContributionsResponse> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}`,
    { signal },
  )
  if (!res.ok) {
    throw new Error(`Contributions API returned ${res.status}`)
  }
  return (await res.json()) as ContributionsResponse
}

export function sumContributionsTotal(total: Record<string, number>): number {
  return Object.values(total).reduce((a, b) => a + b, 0)
}

/** Paths under `public/` — must use this (or `import.meta.env.BASE_URL`) so GitHub project pages `base` works. */
export function publicUrl(pathFromPublicRoot: string): string {
  const path = pathFromPublicRoot.replace(/^\/+/, '')
  const base = import.meta.env.BASE_URL
  return base.endsWith('/') ? `${base}${path}` : `${base}/${path}`
}

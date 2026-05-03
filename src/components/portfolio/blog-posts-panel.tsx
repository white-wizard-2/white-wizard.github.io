import type { ComponentProps } from 'react'
import { ExternalLink } from 'lucide-react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { BlogPost } from '@/data/site'
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

export function BlogPostsPanel({ posts }: { posts: BlogPost[] }) {
  return (
    <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 sm:gap-5">
      {posts.map((post) => (
        <li key={post.href}>
          <GlowCard className="h-full gap-0 overflow-hidden p-0 py-0">
            <a
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full min-h-0 flex-col outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="flex shrink-0 items-center gap-2.5 border-b border-border/80 bg-muted/35 px-3 py-2">
                <img
                  src={post.publisherLogoSrc}
                  alt=""
                  width={28}
                  height={28}
                  decoding="async"
                  loading="lazy"
                  className="size-7 shrink-0 rounded-md border border-border/60 bg-background object-contain p-0.5"
                />
                <span className="min-w-0 font-mono text-[11px] font-medium leading-tight tracking-wide text-foreground sm:text-xs">
                  {post.publisher}
                </span>
              </div>
              <div className="relative h-56 w-full shrink-0 overflow-hidden bg-muted sm:h-64">
                <img
                  src={post.imageSrc}
                  alt=""
                  width={800}
                  height={640}
                  decoding="async"
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-90" />
              </div>
              <CardHeader className="flex flex-1 flex-col gap-1.5 pb-3 pt-3">
                <div className="flex flex-wrap items-center gap-2">
                  {post.date ? (
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {post.date}
                    </span>
                  ) : null}
                </div>
                <CardTitle className="flex items-start gap-2 text-base leading-snug group-hover:text-primary">
                  <span className="min-w-0 flex-1">{post.title}</span>
                  <ExternalLink
                    className="mt-0.5 size-4 shrink-0 opacity-50 transition-opacity group-hover:opacity-90"
                    aria-hidden
                  />
                </CardTitle>
                {post.summary ? (
                  <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                    {post.summary}
                  </CardDescription>
                ) : null}
              </CardHeader>
            </a>
          </GlowCard>
        </li>
      ))}
    </ul>
  )
}

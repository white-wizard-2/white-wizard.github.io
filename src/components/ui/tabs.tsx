import type { ComponentProps } from 'react'
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'

import { cn } from '@/lib/utils'

function Tabs({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      className={cn('flex min-w-0 max-w-full flex-col gap-0', className)}
      {...props}
    />
  )
}

function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        'grid w-full shrink-0 min-w-0 max-w-full grid-cols-2 gap-0 bg-muted/10 sm:grid-cols-4',
        className,
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Tab>) {
  return (
    <TabsPrimitive.Tab
      className={cn(
        'min-w-0 max-w-full px-2 py-2.5 text-center font-mono text-[9px] leading-tight tracking-[0.12em] whitespace-normal text-muted-foreground uppercase outline-none transition-colors sm:px-3 sm:py-3 sm:text-[10px] sm:tracking-[0.18em] lg:text-[11px] lg:tracking-[0.2em]',
        'break-words hyphens-auto [overflow-wrap:anywhere]',
        'hover:bg-muted/20 hover:text-foreground',
        'focus-visible:bg-muted/25 focus-visible:outline-none',
        'aria-selected:bg-primary/10 aria-selected:text-primary',
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Panel>) {
  return (
    <TabsPrimitive.Panel
      className={cn(
        'min-w-0 max-w-full overflow-x-hidden bg-[linear-gradient(180deg,oklch(1_0_0/3%)_0%,transparent_48%)] p-4 sm:p-6',
        className,
      )}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger }

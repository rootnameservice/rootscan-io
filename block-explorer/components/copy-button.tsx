"use client"

import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"
import * as React from "react"

const copyToClipboardWithMeta = async (value: string) => {
  navigator.clipboard.writeText(value)
}

export const CopyButton = ({
  value,
  className,
  ...props
}: {
  value?: any
  className?: string
}) => {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <div
      className={cn(
        "relative z-10 ml-1 inline-flex cursor-pointer items-center justify-center rounded-md border-neutral-200 text-sm font-medium text-muted-foreground transition-all focus:outline-none",
        className
      )}
      {...props}
    >
      {hasCopied ? (
        <Check className="h-4 w-4" />
      ) : (
        <Copy
          className="h-4 w-4"
          onClick={() => {
            copyToClipboardWithMeta(value)
            setHasCopied(true)
          }}
        />
      )}
    </div>
  )
}

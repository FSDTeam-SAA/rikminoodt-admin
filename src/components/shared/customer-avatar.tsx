"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CustomerAvatarProps {
  src?: string | null
  name?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function CustomerAvatar({
  src,
  name,
  size = "md",
  className,
}: CustomerAvatarProps) {
  const [hasError, setHasError] = React.useState(false)

  // Reset error if src changes
  React.useEffect(() => {
    setHasError(false)
  }, [src])

  const isDemoOrMissing =
    !src ||
    src === "/no-image.png" ||
    src.includes("photo-1534528741775") ||
    hasError

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-9 h-9",
    lg: "w-14 h-14",
  }[size]

  if (!isDemoOrMissing) {
    return (
      <img
        src={src}
        alt={name || "Customer"}
        onError={() => setHasError(true)}
        className={cn(
          sizeClasses,
          "rounded-full object-cover shrink-0 border border-slate-100 group-hover:ring-2 group-hover:ring-[#E88DA0]/50 transition-all bg-slate-100",
          className
        )}
      />
    )
  }

  // Beautiful, razor-sharp vector fallback showing clear "NO IMAGE"
  return (
    <div
      title={name ? `No image for ${name}` : "No image available"}
      className={cn(
        sizeClasses,
        "rounded-full bg-slate-100/90 border border-slate-200/90 flex flex-col items-center justify-center shrink-0 shadow-2xs group-hover:border-[#E88DA0]/60 transition-all select-none",
        className
      )}
    >
      {size === "lg" ? (
        <>
          <span className="text-xs font-black text-slate-800 tracking-wider leading-none">
            NO
          </span>
          <span className="text-[10px] font-extrabold text-slate-500 tracking-wider leading-none mt-0.5">
            IMAGE
          </span>
        </>
      ) : size === "sm" ? (
        <>
          <span className="text-[7.5px] font-black text-slate-800 tracking-wider leading-none">
            NO
          </span>
          <span className="text-[6px] font-extrabold text-slate-500 tracking-wider leading-none mt-0.5">
            IMAGE
          </span>
        </>
      ) : (
        <>
          <span className="text-[8.5px] font-black text-slate-800 tracking-wider leading-none">
            NO
          </span>
          <span className="text-[7px] font-extrabold text-slate-500 tracking-wider leading-none mt-0.5">
            IMAGE
          </span>
        </>
      )}
    </div>
  )
}

export default CustomerAvatar


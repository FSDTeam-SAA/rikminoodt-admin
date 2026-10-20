"use client"

import * as React from "react"
interface ProviderProps {
  children: React.ReactNode
}

export function Provider({ children }: ProviderProps) {
  return <>{children}</>
}

export default Provider

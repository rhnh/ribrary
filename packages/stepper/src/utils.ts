import { useEffect, useLayoutEffect } from "react"

interface CallBack<Params extends any[]> {
  (...args: Params): void
}
export const callAll =
  <Params extends any[]>(...fns: Array<CallBack<Params> | undefined>) =>
  (...args: Params) =>
    fns.forEach((fn) => typeof fn === "function" && fn(...args))

export const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
)

export const shade = (fadePercentage: number) => (color?: string) =>
  color
    ? color.replace(/rgb/i, "rgba").replace(/\)/i, `,${fadePercentage})`)
    : "rgba(0, 0, 0, 0.30)"

export const useEnhancedEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

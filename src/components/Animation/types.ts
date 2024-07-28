import type React from "react"

interface AnimationProps {
  children: React.ReactNode
  keyframes: Keyframe[]
  options?: KeyframeAnimationOptions
}

export { AnimationProps }

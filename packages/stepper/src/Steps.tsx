import React, { Children, ReactElement } from "react"
import type { ReactNode, FC } from "react"
import { useStepper } from "Stepper"
import { useEnhancedEffect } from "utils"
interface StepperProps {
  children: ReactNode
  tilesColor?: string
  isNextDisable?: boolean
}

export const Steps: FC<StepperProps> = ({ children }) => {
  const { step, addLabel } = useStepper()

  useEnhancedEffect(() => {
    Children.map(children as ReactElement[], (child: ReactElement) => {
      addLabel(child.props.label ?? "")
      return child
    })
  }, [addLabel, children])

  const showOnlyCurrentChild = Children.map(children, (child, index) => {
    return index === step ? <>{child}</> : null
  })
  return typeof window !== undefined ? (
    <section>{showOnlyCurrentChild}</section>
  ) : (
    <>{children}</>
  )
}

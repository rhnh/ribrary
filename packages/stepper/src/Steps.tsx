import React, { Children, ReactElement, useEffect } from "react"
import type { ReactNode, FC } from "react"
import { useStepper } from "Stepper"
interface StepperProps {
  children: ReactNode
  tilesColor?: string
  isNextDisable?: boolean
}

export const Steps: FC<StepperProps> = ({ children }) => {
  const { step, addLabel } = useStepper()

  useEffect(() => {
    Children.map(children as ReactElement[], (child: ReactElement) => {
      addLabel(child.props.label ?? "")
      return child
    })
  }, [addLabel, children])

  const showOnlyCurrentChild = Children.map(children, (child, index) => {
    return index === step ? <>{child}</> : null
  })
  return <section>{showOnlyCurrentChild}</section>
}

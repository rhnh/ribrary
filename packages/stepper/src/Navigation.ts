import type { FC, ReactElement, HtmlHTMLAttributes } from "react"
import { cloneElement } from "react"
import { useStepper } from "Stepper"
import { callAll } from "utils"
export const NextStepButton: FC<
  { children: ReactElement } & HtmlHTMLAttributes<HTMLButtonElement>
> = ({ children }: { children: ReactElement }) => {
  const { next } = useStepper()
  return cloneElement(children, {
    onClick: callAll(() => next(), children.props.onClick),
  })
}

export const PreviousStepButton: FC<
  { children: ReactElement } & HtmlHTMLAttributes<HTMLButtonElement>
> = ({ children }: { children: ReactElement }) => {
  const { previous } = useStepper()
  return cloneElement(children, {
    onClick: callAll(() => previous(), children.props.onClick),
  })
}
export const CurrentStepButton: FC<
  {
    children: ReactElement
    step?: number
  } & HtmlHTMLAttributes<HTMLButtonElement>
> = ({ children, step }: { children: ReactElement; step?: number }) => {
  const { setCurrentStep, step: current } = useStepper()
  return cloneElement(children, {
    onClick: callAll(
      () => setCurrentStep(step ?? current),
      children.props.onClick
    ),
  })
}

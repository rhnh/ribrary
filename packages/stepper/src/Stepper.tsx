import React from "react"
import {
  Children,
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useContext,
  useState,
  cloneElement,
  HtmlHTMLAttributes,
  useEffect,
} from "react"

import { callAll } from "utils"

interface Props {
  next(): void
  previous(): void
  step: number
  total: number
  setCurrentStep(e: number): void
  setTotalStep(e: number): void
}

const StepperContext = createContext<Props | null>(null)

export const useStepper = () => {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error("You are using useStepper outside its Provider ")
  }
  return context
}
/**
 *
 */
interface StepperProps {
  children: ReactNode
  tilesColor?: string
  isNextDisable?: boolean
}

export const Steps: FC<StepperProps> = ({ children }) => {
  const { step, setTotalStep } = useStepper()
  useEffect(() => {
    setTotalStep(Children.count(children) - 1)
  }, [children, setTotalStep])
  const showOnlyCurrentChild = Children.map(children, (child, index) => {
    return index === step ? <>{child}</> : null
  })
  return <section>{showOnlyCurrentChild}</section>
}

export const Stepper: FC<StepperProps> = ({ children }) => {
  const [total, setTotal] = useState<number>(0)
  const [step, setStep] = useState<number>(total)

  const next = () => {
    step > total ? setStep(total) : setStep((e) => (e += 1))
  }
  const previous = () => {
    step < 0 ? setStep(0) : setStep((e) => (e -= 1))
  }
  const setCurrentStep = (e: number) => {
    setStep(e)
  }
  const setTotalStep = (e: number) => {
    setTotal(e)
  }

  return (
    <StepperContext.Provider
      value={{ next, previous, step, setCurrentStep, total, setTotalStep }}
    >
      {children}
    </StepperContext.Provider>
  )
}

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

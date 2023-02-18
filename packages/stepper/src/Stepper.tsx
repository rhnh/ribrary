import React, { useCallback } from "react"
import { createContext, FC, ReactNode, useContext, useState } from "react"
import { useEnhancedEffect } from "utils"

interface Props {
  next(): void
  previous(): void
  step: number
  setCurrentStep(e: number): void
  labels: string[] // The <Step/> takes label property as argument. It will be need for <StepperBar/> This can be extend for other properties, incase indeed.
  total: number
  addLabel(e: string): void
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

export const Stepper: FC<StepperProps> = ({ children }) => {
  const [step, setStep] = useState<number>(0)
  const [labels, setLabels] = useState<string[]>([])
  const [total, setTotal] = useState(0)

  useEnhancedEffect(() => {
    setTotal(labels.length - 1)
  }, [labels, labels.length])

  const next = useCallback(() => {
    step > total ? setStep(total) : setStep((e) => (e += 1))
  }, [step, total, setStep])

  const previous = useCallback(() => {
    step < 0 ? setStep(0) : setStep((e) => (e -= 1))
  }, [step, setStep])

  const setCurrentStep = useCallback(
    (e: number) => {
      setStep(e)
    },
    [setStep]
  )

  const addLabel = (k: string) => {
    setLabels((v) => {
      if (v.includes(k)) {
        return v
      }
      return [...v, k]
    })
  }

  return (
    <StepperContext.Provider
      value={{
        next,
        previous,
        step,
        setCurrentStep,
        labels,
        addLabel,
        total,
      }}
    >
      {children}
    </StepperContext.Provider>
  )
}

interface PProps {
  value: Props
  children: ReactNode
}

export const StepperProvider: FC<PProps> = ({ children, value }) => {
  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  )
}

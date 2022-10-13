import React, { cloneElement, Children } from "react"
import type { FC, ReactElement } from "react"
import { useStepper } from "./Stepper"
import {
  NextStepButton,
  PreviousStepButton,
  CurrentStepButton,
} from "./Navigation"
import { canUseDOM } from "utils"
import { Button } from "components/Button"
import { css } from "@emotion/css"

interface StepButtonsProps {
  limiters?: boolean
  steps?: boolean
  rgbColor?: string
  size?: number
  children?: ReactElement | ReactElement[]
  fadePercentage?: number
}
/**
 * Children must to buttons
 * @param limiters - add fast forward and fast backward
 * @param steps - shows all steps
 * @param children
 * @returns
 */
export const StepperNav: FC<StepButtonsProps> = ({
  children,
  limiters,
  rgbColor: color,
  size,
  steps,
  fadePercentage = 0.45,
}) => {
  const { step, setCurrentStep, labels, total } = useStepper()

  //if it is on server and no JS.
  if (!canUseDOM) {
    return null
  }

  const numberOfChildren = Children.count(children)
  //no custom buttons
  if (numberOfChildren === 0) {
    return (
      <section
        id="stepper-nav"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        {limiters ? (
          <Button
            height={size}
            width={size}
            rgbaColor={color}
            fadePercentage={fadePercentage}
            disabled={0 === step}
            className="stepper-buttons stepper-nav--btns stepper-nav--start step--nav-limiters"
            onClick={() => setCurrentStep(0)}
          >
            &#171;
          </Button>
        ) : null}
        <PreviousStepButton>
          <Button
            height={size}
            width={size}
            rgbaColor={color}
            fadePercentage={fadePercentage}
            type="button"
            className="step-buttons stepper-nav--btns stepper-nav--previous"
            disabled={step === 0}
          >
            &#8249;
          </Button>
        </PreviousStepButton>
        <section
          className={`${css({
            display: "flex",
          })}`}
        >
          {steps ? (
            labels.map((s, i) => (
              <section key={i} className={`${css({ display: "flex" })}`}>
                <CurrentStepButton step={i}>
                  {step === i ? (
                    <Button
                      height={size}
                      width={size}
                      rgbaColor={color}
                      fadePercentage={fadePercentage}
                      className="stepper-buttons stepper-nav--btns stepper-nav--current"
                    >
                      {i + 1}
                    </Button>
                  ) : (
                    <Button
                      className="step-buttons stepper-nav--btns"
                      height={size}
                      width={size}
                      rgbaColor={color}
                      fadePercentage={fadePercentage}
                    >
                      {i + 1}
                    </Button>
                  )}
                </CurrentStepButton>
              </section>
            ))
          ) : (
            <CurrentStepButton>
              <Button
                height={size}
                width={size}
                rgbaColor={color}
                fadePercentage={fadePercentage}
                type="button"
                className="step-buttons stepper-nav--btns stepper-nav--current"
              >
                {step + 1}
              </Button>
            </CurrentStepButton>
          )}
        </section>

        <NextStepButton>
          <Button
            height={size}
            width={size}
            rgbaColor={color}
            type="button"
            fadePercentage={fadePercentage}
            className="step-buttons stepper-nav--btns stepper-nav--next"
            disabled={total === step}
          >
            &#8250;
          </Button>
        </NextStepButton>
        {limiters ? (
          <Button
            height={size}
            width={size}
            rgbaColor={color}
            fadePercentage={fadePercentage}
            className="step-buttons stepper-nav--btns stepper-nav--end stepper-nav--limiters"
            disabled={total === step}
            onClick={() => setCurrentStep(total)}
          >
            &#187;
          </Button>
        ) : null}
      </section>
    )
  }

  //if the buttons are inside a div, or section
  if (numberOfChildren === 1) {
    const newChildren = Children.map(children, (child) => {
      return Children.map(child?.props.children, (c, i: number) => {
        if (c.type === "button") {
          if (i === 0) {
            const newChild = cloneElement(c as ReactElement, {
              disabled: step === 0,
            })
            return <PreviousStepButton>{newChild}</PreviousStepButton>
          } else if (i === 1) {
            const newChild = cloneElement(c as ReactElement, {
              disabled: step === total,
            })
            return <NextStepButton>{newChild}</NextStepButton>
          }
        } else {
          throw new Error("Only 2 buttons must be provided.")
        }
      })
    })
    return <>{newChildren}</>
  }
  //if it is only custom buttons
  const newChildren = Children.map(
    children as ReactElement[],
    (child: ReactElement, i: number) => {
      if (child.type === "button" && numberOfChildren === 2) {
        if (i === 0) {
          const newChild = cloneElement(child as ReactElement, {
            disabled: step === 0,
          })
          return <PreviousStepButton>{newChild}</PreviousStepButton>
        } else if (i === 1) {
          const newChild = cloneElement(child as ReactElement, {
            disabled: step === total,
          })
          return <NextStepButton>{newChild}</NextStepButton>
        }
      } else {
        throw new Error("Only 2 buttons must be provided.")
      }
    }
  )
  return <>{newChildren}</>
}

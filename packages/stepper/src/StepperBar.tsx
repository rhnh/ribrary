import type { FC } from "react"
import React, { useEffect, useState } from "react"
import { useStepper } from "Stepper"
import { css } from "@emotion/css"
import { Button } from "./components/Button"
import * as colors from "./colors"
interface Props {
  rgbColor?: string
  size?: number
  fadePercentage?: number
}
export const StepperBar: FC<Props> = ({
  rgbColor = "black",
  size = 50,
  fadePercentage = 0.45,
}) => {
  const { step, setCurrentStep, total } = useStepper()
  const [totalSteps, setTotalSteps] = useState<number[]>([])

  useEffect(() => {
    setTotalSteps(Array.from(Array(total + 1).keys()))
  }, [total])
  return (
    <ul
      className={`${css({
        display: "flex",
        margin: 0,
        justifyContent: "center",
        alignItems: "center",
        listStyle: "none",
        left: 0,
        padding: "1em",
      })} step-bar-ul`}
    >
      {totalSteps.map((s, i) => {
        return (
          <li
            className={`${css({
              display: "flex",
              margin: 0,
              left: 0,
              // justifyContent: 'center',
              alignItems: "center",
              ":not(:last-child)": { flex: 1 },
              ":not(:last-child):after": {
                content: '""',
                zIndex: 2,
                flex: 1,
                height: "5px",
                backgroundColor:
                  s < step
                    ? rgbColor
                      ? rgbColor
                      : colors.secondary
                    : "transparent",
                borderColor: `1px solid ${
                  s < step
                    ? rgbColor
                      ? rgbColor
                      : colors.secondary
                    : colors.secondaryLight
                }`,
                borderRadius: "1em",
                transition: "all ease 0.5s",
              },
            })} step-bar-li`}
            key={s}
          >
            {step >= i ? (
              step === i ? (
                <Button
                  rgbaColor={`${rgbColor ? rgbColor : colors.secondaryDark}`}
                  onClick={() => setCurrentStep(s)}
                  height={size}
                  width={size}
                  fadePercentage={fadePercentage}
                  className="step-buttons step-bar-buttons step-bar-current"
                >
                  &#128504;
                </Button>
              ) : (
                <Button
                  rgbaColor={`${rgbColor ? rgbColor : "yellow"}`}
                  onClick={() => setCurrentStep(s)}
                  height={size}
                  width={size}
                  fadePercentage={fadePercentage}
                  className="step-buttons step-bar-buttons step-bar-previous"
                >
                  &#128504;
                </Button>
              )
            ) : (
              <Button
                height={size}
                width={size}
                title={`${1 + i}`}
                fadePercentage={fadePercentage}
                rgbaColor={`${rgbColor ? rgbColor : colors.secondaryDark}`}
                className="step-buttons step-bar-buttons step-bar-next"
              ></Button>
            )}
          </li>
        )
      })}
    </ul>
  )
}

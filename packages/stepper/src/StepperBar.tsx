import { FC } from "react"
import React from "react"
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
  const { step, setCurrentStep, labels } = useStepper()

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
      })} stepper-bar--ul`}
    >
      {labels?.map((item, i) => {
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
                  i < step
                    ? rgbColor
                      ? rgbColor
                      : colors.secondary
                    : "transparent",
                borderColor: `1px solid ${
                  i < step
                    ? rgbColor
                      ? rgbColor
                      : colors.secondary
                    : colors.secondaryLight
                }`,
                borderRadius: "1em",
                transition: "all ease 0.5s",
              },
            })} stepper-bar--ul---li`}
            key={i}
          >
            {step >= i ? (
              step === i ? (
                <>
                  <Button
                    rgbaColor={`${rgbColor ? rgbColor : colors.secondaryDark}`}
                    onClick={() => setCurrentStep(i)}
                    height={size}
                    width={size}
                    fadePercentage={fadePercentage}
                    className="step-buttons stepper-bar--btns stepper-bar--current"
                  >
                    &#128504;
                  </Button>{" "}
                  <p>{item}</p>
                </>
              ) : (
                <>
                  <Button
                    rgbaColor={`${rgbColor ? rgbColor : "yellow"}`}
                    onClick={() => setCurrentStep(i)}
                    height={size}
                    width={size}
                    fadePercentage={fadePercentage}
                    className="step-buttons stepper-bar--btns stepper-bar--previous"
                  >
                    &#128504;
                  </Button>
                  <p>{item}</p>
                </>
              )
            ) : (
              <>
                <Button
                  height={size}
                  width={size}
                  title={`${1 + i}`}
                  fadePercentage={fadePercentage}
                  rgbaColor={`${rgbColor ? rgbColor : colors.secondaryDark}`}
                  className="step-buttons stepper-bar--btns stepper-bar--next"
                ></Button>
                <p>{item}</p>
              </>
            )}
          </li>
        )
      })}
    </ul>
  )
}

import styled from "@emotion/styled"
import { shade } from "utils"

interface Props {
  rgbaColor?: string
  height?: number
  width?: number
  fadePercentage?: number
}
export const Button = styled("button")<Props>(
  ({
    rgbaColor: color = "black",
    width = "50px",
    height = "50px",
    fadePercentage = 0.45,
  }) => ({
    background: "transparent",
    border: `2px solid ${color}`,
    fontSize: "1.5em",
    borderRadius: "100%",
    transition: "all .4s ease",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color,
    height,
    width,
    "&:hover": {
      color: shade(fadePercentage)(color),
      borderColor: color,
    },
    "&:disabled": {
      color: "gray",
      borderColor: "gray",
    },
  })
)

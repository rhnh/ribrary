import { FC, ReactNode } from "react"
import React from "react"

interface IStep {
  label?: string
  children: ReactNode
}

export const Step: FC<IStep> = ({ children }) => {
  return <div>{children}</div>
}

import { ReactNode } from "react";

export interface StepperProps {
  children: ReactNode;
  tilesColor?: string;
  isNextDisable?: boolean;
}

export interface Props {
  next(): void;
  previous(): void;
  step: number;
  total: number;
  setCurrentStep(e: number): void;
  setTotalStep(e: number): void;
}

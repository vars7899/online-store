import { useState } from "react";

export const useMultiStepForm = (steps) => {
  const totalSteps = steps.length;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const $nextStep = () => {
    if (currentStepIndex >= totalSteps) return;
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((current) => current + 1);
    }
  };
  const $prevStep = () => {
    if (currentStepIndex <= 0) return;
    if (currentStepIndex > 0) {
      setCurrentStepIndex((current) => current - 1);
    }
  };
  const $moveTo = (givenIndex) => {
    if (currentStepIndex < 0 || currentStepIndex >= totalSteps) return;
    setCurrentStepIndex(givenIndex);
  };

  return {
    $nextStep,
    $prevStep,
    $moveTo,
    currentStepElement: steps[currentStepIndex],
    currentStepIndex,
    totalSteps,
  };
};

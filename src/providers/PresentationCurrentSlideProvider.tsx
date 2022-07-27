import * as React from 'react';
import { useRouter } from 'next/router';

export const PresentationCurrentSlideContext = React.createContext<{
  currentSlide: number;
  setSlide: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  steps: number[];
  setSteps: React.Dispatch<React.SetStateAction<number[]>>;
  addStep: (step: number) => void;
  removeStep: (step: number) => void;
  clearSteps: () => void;
}>({
  currentSlide: 0,
  setSlide: () => {},
  currentStep: 0,
  setCurrentStep: () => {},
  steps: [],
  setSteps: () => {},
  addStep: () => {},
  removeStep: () => {},
  clearSteps: () => {},
});

export const PresentationCurrentSlideProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { asPath } = useRouter();

  const [initialSlide, setInitialSlide] = React.useState(0);

  const [currentSlide, setSlide] = React.useState(initialSlide);

  const [currentStep, setCurrentStep] = React.useState(0);

  const [steps, setSteps] = React.useState<number[]>([]);

  const addStep = (id) => {
    setSteps((prevSteps) => [...new Set([...prevSteps, id])]);
  };

  const removeStep = (id) => {
    setSteps((prevSteps) => [
      ...prevSteps.filter((prevStep) => prevStep !== id),
    ]);
  };

  const clearSteps = () => {
    setSteps([]);
    setCurrentStep(0);
  };

  return (
    <PresentationCurrentSlideContext.Provider
      value={{
        currentSlide,
        setSlide,
        currentStep,
        setCurrentStep,
        steps,
        setSteps,
        addStep,
        removeStep,
        clearSteps,
      }}
    >
      {children}
    </PresentationCurrentSlideContext.Provider>
  );
};

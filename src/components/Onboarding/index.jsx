import { useState } from "react";
import { Experience } from "./Experience";
import { Target } from "./Target";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";

export const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const onBackClick = () =>
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));

  const onContinueClick = () => {
    setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
  };

  const STEPS = [
    {
      id: 1,
      name: "Education & Work Experience",
      component: (
        <Experience handleBack={onBackClick} handleContinue={onContinueClick} />
      ),
    },
    {
      id: 2,
      name: "Job Preference",
      component: (
        <Target handleBack={onBackClick} handleContinue={onContinueClick} />
      ),
    },
  ];

  return (
    <div className="px-10 py-10 h-full flex justify-center overflow-hidden">
      <div className="w-fit px-4 bg-white h-full overflow-y-auto">
        <div className="flex gap-3 items-center text-xs text-gray-400 font-light">
          <span>Sign Up</span>
          <FontAwesomeIcon icon={faChevronRight} />
          {STEPS.map((step) => (
            <div
              key={step.id}
              onClick={() => setCurrentStep(step.id - 1)}
              className="cursor-pointer flex gap-3 items-center"
            >
              <span
                className={
                  step.id === currentStep + 1
                    ? "text-secondary font-medium"
                    : ""
                }
              >
                {step.name}
              </span>
              {step.id < STEPS.length && (
                <FontAwesomeIcon icon={faChevronRight} />
              )}
            </div>
          ))}
        </div>
        <div className="">
          <div className="w-full text-center pt-4 pb-8">
            <div className="text-2xl font-semibold text-text">
              Tell us something more about yourself
            </div>
            <div className="text-sm font-medium text-gray-500 py-2">
              Step {currentStep + 1} of {STEPS.length}
            </div>
          </div>
          <div>{STEPS[currentStep].component}</div>
          <div className="flex justify-between py-4">
            <Button
              size="small"
              className={
                "!bg-transparent border !border-gray-500 !text-gray-500"
              }
              onClick={onBackClick}
            >
              Go back
            </Button>
            <Button
              size="small"
              className={"!bg-secondary"}
              onClick={onContinueClick}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

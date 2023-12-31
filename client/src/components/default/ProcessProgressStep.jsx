import { IconCheck } from "@tabler/icons-react";

export const ProcessProgressStep = ({ currentStep, stepInformationArray }) => {
  return (
    <div className="flex items-center justify-center">
      <div className={`grid grid-cols-4`}>
        {stepInformationArray.map((step, index) => (
          <div key={`progress-dot-${index}`} className="flex flex-col items-center min-w-[195px]">
            <div className="flex items-center w-[100%]">
              <div className={"flex items-center h-[2px] w-[100%]"}>
                {index === 0 ? null : (
                  <div
                    className={`h-[100%] w-[100%] ${
                      currentStep >= index ? "bg-accent-300" : "bg-gray-300 animate-pulse"
                    }`}
                  ></div>
                )}
              </div>
              <div
                className={`min-h-[28px] min-w-[28px] border-[2px] rounded-full p-[2px] m-[4px] flex items-center justify-center ${
                  currentStep === index
                    ? "border-accent-300 animate-pulse"
                    : currentStep > index
                    ? " border-accent-500"
                    : "border-gray-300"
                }`}
              >
                <p
                  className={`text-white rounded-full text-xs flex items-center justify-center py-[2px] w-[100%] font-semibold ${
                    currentStep === index ? "bg-accent-300" : currentStep > index ? " bg-accent-500" : "bg-gray-300"
                  }`}
                >
                  {currentStep > index ? <IconCheck size={16} /> : index + 1}
                </p>
              </div>
              <div className="flex items-center h-[2px] w-[100%]">
                {index === stepInformationArray.length - 1 ? null : (
                  <div
                    className={`h-[100%] w-[100%] ${
                      currentStep > index ? "bg-accent-300" : "bg-gray-300 animate-pulse"
                    }`}
                  ></div>
                )}
              </div>
            </div>
            <p
              className={`max-w-[200px] mt-1 cursor-pointer text-sm ${
                currentStep === index
                  ? "text-accent-300 animate-pulse"
                  : currentStep > index
                  ? "text-accent-500"
                  : "text-gray-300"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

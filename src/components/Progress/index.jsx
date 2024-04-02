import { InterviewNotes } from "./InterviewNotes";
import { ProgressTracker } from "./ProgressTracker";

export const ProgressComponent = () => {
  return (
    <div className="px-3 md:px-10 pt-3 md:pt-6 pb-2 h-full overflow-y-auto overflow-x-hidden">
      <div className="h-auto md:h-1/2 mb-4">
        <ProgressTracker />
      </div>
      <div className="h-auto md:h-1/2 mt-4">
        <InterviewNotes />
      </div>
    </div>
  );
};

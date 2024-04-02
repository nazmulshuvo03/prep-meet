import { InterviewNotes } from "./InterviewNotes";
import { ProgressTracker } from "./ProgressTracker";

export const ProgressComponent = () => {
  return (
    <div className="px-3 md:px-10 py-3 md:py-6 h-full overflow-y-auto overflow-x-hidden">
      <div className="h-auto md:h-1/2 mb-4">
        <ProgressTracker />
      </div>
      <div className="h-auto mt-4">
        <InterviewNotes />
      </div>
    </div>
  );
};

import { InterviewNotes } from "./InterviewNotes";
import { ProgressTracker } from "./ProgressTracker";

export const ProgressComponent = () => {
  return (
    <div className="px-3 md:px-10 pt-3 md:pt-6 pb-2 h-full overflow-y-auto overflow-x-hidden">
      <div className="h-1/2 pb-2">
        <ProgressTracker />
      </div>
      <div className="h-1/2 pt-2">
        <InterviewNotes />
      </div>
    </div>
  );
};

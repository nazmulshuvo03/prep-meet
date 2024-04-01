import { ProgressChart } from "./ProgressChart";
import { ProgressHighlight } from "./ProgressHighlight";

export const ProgressTracker = () => {
  return (
    <div className="bg-white h-full rounded-sm">
      <div>
        <div>Progress tracker</div>
      </div>
      <div className="flex">
        <ProgressChart />
        <ProgressHighlight />
      </div>
    </div>
  );
};

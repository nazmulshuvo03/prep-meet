import { ProgressChart } from "./ProgressChart";
import { ProgressHighlight } from "./ProgressHighlight";

export const ProgressTracker = () => {
  return (
    <div className="bg-white h-full rounded-sm">
      <div>
        <div>Progress tracker</div>
      </div>
      <div className="flex flex-col md:flex-row">
        <ProgressChart />
        <ProgressHighlight />
      </div>
    </div>
  );
};

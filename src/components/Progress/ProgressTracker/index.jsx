import { ProgressChart } from "./ProgressChart";
import { ProgressHighlight } from "./ProgressHighlight";

export const ProgressTracker = ({ data }) => {
  return (
    <div className="bg-white h-full rounded-sm p-4">
      <div className="text-xl font-medium text-text">Progress tracker</div>
      <div className="flex flex-col md:flex-row">
        <ProgressChart />
        <ProgressHighlight data={data} />
      </div>
    </div>
  );
};

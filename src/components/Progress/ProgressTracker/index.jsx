import { ProgressChart } from "./ProgressChart";
import { ProgressHighlight } from "./ProgressHighlight";

export const ProgressTracker = ({ data, progressData }) => {
  return (
    <div className="bg-white h-full rounded-sm flex flex-col md:flex-row">
      <ProgressChart data={progressData} />
      <ProgressHighlight data={data} />
    </div>
  );
};

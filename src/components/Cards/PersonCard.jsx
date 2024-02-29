import { ImageArea } from "./ImageArea";
import { WorkInfo } from "./WorkInfo";
import { AdditionalInfo } from "./AdditionalInfo";
import { ActionArea } from "./ActionArea";

export const PersonCard = ({ data }) => {
  // console.log("@@@@@@@@@@@", data);

  return (
    <div className="w-full bg-white rounded-md p-4">
      <div className="grid md:grid-cols-12 grid-cols-1 border-b">
        <div className="col-span-2">
          <ImageArea data={data} />
        </div>
        <div className="col-span-5">
          <WorkInfo data={data} />
        </div>
        <div className="col-span-5">
          <AdditionalInfo data={data} />
        </div>
      </div>
      <div className="py-1">
        <ActionArea data={data} />
      </div>
    </div>
  );
};

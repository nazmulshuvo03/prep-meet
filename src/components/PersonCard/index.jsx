import { ImageArea } from "./ImageArea";
import { WorkInfo } from "./WorkInfo";
import { AdditionalInfo } from "./AdditionalInfo";
import { ActionArea } from "./ActionArea";
import { IconButton } from "../Button/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export const PersonCard = ({ data }) => {
  return (
    <div className="w-full bg-white rounded-md p-4">
      <div className="grid md:grid-cols-12 grid-cols-1 pb-3 border-b relative">
        <div className="col-span-3">
          <ImageArea data={data} />
        </div>
        <div className="col-span-9">
          <WorkInfo data={data} />
          <AdditionalInfo data={data} />
        </div>
        <IconButton className={"absolute right-0 top-0"}>
          <FontAwesomeIcon icon={faHeart} className="text-gray-300 !text-lg" />
        </IconButton>
      </div>
      <div className="pt-3 pb-1">
        <ActionArea data={data} />
      </div>
    </div>
  );
};

import { ImageArea } from "./ImageArea";
import { WorkInfo } from "./WorkInfo";
import { ActionArea } from "./ActionArea";
import { IconButton } from "../Button/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import { getDataLabelFromKey } from "../../utils/data";

export const PersonCard = ({ data }) => {
  const preparationStages = useSelector(
    (state) => state.static.preparationStages
  );

  return (
    <div className="w-full h-fit bg-white rounded-md px-4 py-2">
      <div className="grid md:grid-cols-12 grid-cols-1 border-b relative">
        <div className="col-span-2">
          <ImageArea data={data} />
        </div>
        <div className="col-span-10">
          <WorkInfo data={data} />
        </div>
        <div className={"absolute right-0 top-0 flex items-center gap-2"}>
          <div className="text-gray-400 text-xs">
            {data.preparationStage
              ? getDataLabelFromKey(preparationStages, data.preparationStage)
              : ""}
          </div>
          {/* <IconButton>
            <FontAwesomeIcon
              icon={faHeart}
              className="text-gray-300 !text-lg"
            />
          </IconButton> */}
        </div>
      </div>
      <div className="pt-2">
        <ActionArea data={data} />
      </div>
    </div>
  );
};

import { useSelector } from "react-redux";
import { getDataLabelFromKey } from "../../utils/data";
import LANGUAGE_DATA from "../../assets/data/languages.json";

export const PersonCard = ({ data }) => {
  const professionList = useSelector((state) => state.profession.keyLabelPairs);

  return (
    <div className="p-2 rounded-md border w-full flex gap-2">
      <img
        src={data.photoURL}
        alt={"Person Profile Image"}
        className="h-32 w-32 rounded-md"
      />
      <div>
        <div>
          {data.firstName} {data.lastName}
        </div>
        <div>{data.email}</div>
        <div>
          {data.profession
            ? getDataLabelFromKey({
                data: professionList,
                key: data.profession,
              })
            : ""}
        </div>
        <div>
          {data.language
            ? getDataLabelFromKey({
                data: LANGUAGE_DATA,
                key: data.language,
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

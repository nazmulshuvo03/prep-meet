import { useSelector } from "react-redux";
import { getDataLabelFromKey } from "../../utils/data";
import LANGUAGE_DATA from "../../assets/data/languages.json";
import { Capsul } from "../Capsul";
import { ProfileCardCapsul } from "../Capsul/ProfileCardCapsul";

export const PersonCard = ({ data }) => {
  const professionList = useSelector((state) => state.profession.keyLabelPairs);

  console.log("@@@@@@@@@@@", data);

  return (
    <div className="p-4 rounded-md bg-white w-full grid grid-cols-2 gap-2">
      <div>
        <div className="flex flex-col items-center justify-center">
          <img
            src={data.photoURL}
            alt={"Person Profile Image"}
            className="h-32 w-32 rounded-md"
          />
          <div className="flex gap-2 font-semibold text-md">
            <span>{data.firstName}</span>
            <span>{data.lastName}</span>
          </div>
        </div>
        <div className="ml-4 pt-3 pb-4 font-light text-sm text-gray-600">
          <div className="">
            <span>Cancelation Rate:</span>
          </div>
          <div className="">
            <span>Depth of Feedback:</span>
          </div>
          <div className="">
            <span>Analytics and Metrics:</span>
          </div>
          <div className="">
            <span>Product Sense:</span>
          </div>
          <div className="">
            <span>Behavioral:</span>
          </div>
          <div className="">
            <span>Location:</span>
          </div>
        </div>
        <div className="py-2 flex gap-2">
          <ProfileCardCapsul className="bg-blue-100 text-blue-700">
            Chip 1
          </ProfileCardCapsul>
          <ProfileCardCapsul className="bg-yellow-100 text-yellow-700">
            Chip 2
          </ProfileCardCapsul>
          <ProfileCardCapsul className="bg-red-100 text-red-700">
            Chip 3
          </ProfileCardCapsul>
        </div>
      </div>
      <div className="text-sm text-gray-600">
        <div className="flex gap-1 py-1">
          <label className="font-semibold">Current Company: </label>
          <div>Amazom</div>
        </div>
        <div className="flex gap-1 py-1">
          <label className="font-semibold">Industry: </label>
          <div>Amazom</div>
        </div>
        <div className="flex gap-1 py-1">
          <label className="font-semibold">Past Companies: </label>
          <div>Amazom</div>
        </div>
        <div className="flex gap-1 py-1">
          <div className="flex gap-1 py-1">
            <label className="font-semibold">Work Experience: </label>
            <div>X years</div>
          </div>
          <div className="flex gap-1 py-1">
            <label className="font-semibold">PM Experience: </label>
            <div>Y years</div>
          </div>
        </div>
        <div className="flex gap-1 py-1">
          <label className="font-semibold">Availability: </label>
          <div>Tue, Wed</div>
        </div>
        <div className="flex gap-1 py-1">
          <label className="font-semibold">
            Product Management Experience Type:
          </label>
          <div>Consumer, Conent</div>
        </div>
        <div className="flex gap-1 py-1">
          <label className="font-semibold">Target Companies: </label>
          <div>Amazom</div>
        </div>
        <div className="flex gap-1 py-1">
          <label className="font-semibold">Interested to Practice: </label>
          <div>Amazom</div>
        </div>
        <div className="flex gap-1 py-1">
          <label className="font-semibold">Mock interview Practiced: </label>
          <div>Amazom</div>
        </div>
      </div>
    </div>
  );
};

// <div>
//   <div>
//     {data.firstName} {data.lastName}
//   </div>
//   <div>{data.email}</div>
//   <div>
//     {data.profession
//       ? getDataLabelFromKey({
//           data: professionList,
//           key: data.profession,
//         })
//       : ""}
//   </div>
//   <div>
//     {data.language
//       ? getDataLabelFromKey({
//           data: LANGUAGE_DATA,
//           key: data.language,
//         })
//       : ""}
//   </div>
//   <div>Years of experience: {data.yearsOfExperience}</div>
// </div>

import { Button } from "../Button";
import { ProfileCardCapsul } from "../Capsul/ProfileCardCapsul";

export const ActionArea = ({ data = null }) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
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
      <div className="flex gap-3 items-center">
        <Button className="bg-transparent !text-green-700 text-xs font-semibold uppercase !py-1 !px-0">
          Last Practiced X days age
        </Button>
        <Button className="bg-white !text-gray-700 border border-gray-700 text-xs !py-1 !px-2">
          Learn More
        </Button>
        <Button className="bg-blue-500 border border-blue-500 text-xs !py-1 !px-4">
          Next Available Tomorrow
        </Button>
      </div>
    </div>
  );
};

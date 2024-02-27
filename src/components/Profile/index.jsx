import { useSelector } from "react-redux";
import { PersonalAccount } from "../../components/PersonalAccount";

export const Profile = () => {
  const profile = useSelector((state) => state.user.profile);

  return (
    <div className="">
      <PersonalAccount />
    </div>
  );
};

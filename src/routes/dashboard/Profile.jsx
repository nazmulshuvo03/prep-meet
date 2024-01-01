import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleUserDoc } from "../../firebase/functions/user";
import { getDataLabelFromKey } from "../../utils/data";

const Profile = () => {
  const [profile, setProfile] = useState();
  const { userId } = useParams();

  const professionList = useSelector((state) => state.profession.keyLabelPairs);

  const fetchPublicProfile = async () => {
    const res = await getSingleUserDoc(userId);
    console.log("######### public profile: ", res);
    setProfile(res);
  };

  useEffect(() => {
    fetchPublicProfile();
  }, []);

  return (
    <div>
      {profile ? (
        <div>
          <div>
            <span>Name</span>
            <span>
              {profile.firstName} {profile.lastName}
            </span>
          </div>
          <div>
            <span>Email</span>
            <span>{profile.email}</span>
          </div>
          <div>
            <span>Profession</span>
            <span>
              {profile.profession
                ? getDataLabelFromKey({
                    data: professionList,
                    key: profile.profession,
                  })
                : ""}
            </span>
          </div>
          <span>{profile.university}</span>
          <span>{profile.language}</span>
          <div>
            <span>{profile.country}</span>
            <span>{profile.timezone}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;

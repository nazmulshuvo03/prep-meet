import { useEffect, useState } from "react";
// import { getMeetingsInitiated } from "../../firebase/functions/meetings";
import { useSelector } from "react-redux";
import { Capsul } from "../Capsul";

export const PendingRequests = () => {
  const profile = useSelector((state) => state.user.profile);
  const [requests, setRequests] = useState();

  const fetchMeetingRequests = async () => {
    // const meetings = await getMeetingsInitiated(profile.id);
    // setRequests(meetings);
  };

  useEffect(() => {
    if (profile) fetchMeetingRequests();
  }, [profile]);

  return (
    <div>
      <div className="text-center text-4xl font-semibold text-zinc-400 mb-8 my-4">
        Your Meeting Requests
      </div>
      <div>
        {requests && requests.length ? (
          requests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between py-3 px-4 rounded-md mb-2 text-lg border-2 border-zinc-400"
            >
              <div>{request.acceptorProfile.firstName}</div>
              <div>{request.acceptorProfile.lastName}</div>
              <div>{new Date(parseInt(request.time)).toString()}</div>
              {request.status === 1 ? (
                <Capsul className={"bg-green-500"}>CONFIRMED</Capsul>
              ) : request.status === -1 ? (
                <Capsul className={"bg-red-500"}>REJECTED</Capsul>
              ) : (
                <Capsul className={"bg-yellow-500"}>PENDING</Capsul>
              )}
            </div>
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

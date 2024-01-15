import { useEffect, useState } from "react";
import { getAcceptorsMeetings } from "../../firebase/functions/meetings";
import { useSelector } from "react-redux";
import { Button } from "../Button";

export const MeetingRequests = () => {
  const profile = useSelector((state) => state.user.profile);
  const [requests, setRequests] = useState();

  const fetchMeetingRequests = async () => {
    const meetings = await getAcceptorsMeetings(profile.id);
    setRequests(meetings);
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
        {requests &&
          requests.length &&
          requests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between py-3 px-4 rounded-md mb-2 text-lg border-2 border-primary"
            >
              <div>{request.initiatorProfile.firstName}</div>
              <div>{request.initiatorProfile.lastName}</div>
              <div>{new Date(parseInt(request.time)).toString()}</div>
              <Button>Accept</Button>
            </div>
          ))}
      </div>
    </div>
  );
};

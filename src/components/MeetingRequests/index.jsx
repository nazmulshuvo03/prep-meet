import { useEffect, useState } from "react";
import {
  getMeetingRequests,
  updateMeeting,
} from "../../firebase/functions/meetings";
import { useSelector } from "react-redux";
import { Button } from "../Button";

export const MeetingRequests = () => {
  const profile = useSelector((state) => state.user.profile);
  const [requests, setRequests] = useState();

  const fetchMeetingRequests = async () => {
    const meetings = await getMeetingRequests(profile.id);
    setRequests(meetings);
  };

  useEffect(() => {
    if (profile) fetchMeetingRequests();
  }, [profile]);

  const handleAcceptMeeting = async (meetId) => {
    await updateMeeting(meetId, { status: 1 });
    alert("Meeting accepted");
  };

  const handleRejectMeeting = async (meetId) => {
    await updateMeeting(meetId, { status: -1 });
    alert("Meeting rejected");
  };

  console.log("@@@@@@@@ requests", requests);

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
              className="flex items-center justify-between py-3 px-4 rounded-md mb-2 text-lg border-2 border-primary"
            >
              <div>{request.initiatorProfile.firstName}</div>
              <div>{request.initiatorProfile.lastName}</div>
              <div>{new Date(parseInt(request.time)).toString()}</div>
              <div className="flex gap-2">
                <Button onClick={() => handleAcceptMeeting(request.id)}>
                  Accept
                </Button>
                <Button
                  onClick={() => handleRejectMeeting(request.id)}
                  className="bg-red-500"
                >
                  Reject
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

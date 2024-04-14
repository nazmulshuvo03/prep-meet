import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InterviewNotes } from "./InterviewNotes";
import { ProgressTracker } from "./ProgressTracker";
import { getUserProgress } from "../../store/middlewares/user";

export const ProgressComponent = () => {
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.user.progress);

  const [notes, setNotes] = useState();
  const [points, setPoints] = useState();

  const fetchProgress = async () => {
    dispatch(getUserProgress());
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  useEffect(() => {
    if (progress && progress.length) {
      let pointsData = [];
      let notesData = [];
      for (let i = 0; i < progress.length; i++) {
        pointsData.push({
          id: i + 1,
          name: progress[i].name,
          point: progress[i].averagePoint,
        });
        notesData.push({
          id: i + 1,
          name: progress[i].name,
          notes: progress[i].notes,
        });
      }
      setPoints(pointsData);
      setNotes(notesData);
    }
  }, [progress]);

  return (
    <div className="px-3 md:px-10 py-3 md:py-6 h-full overflow-y-auto overflow-x-hidden">
      <div className="h-auto md:h-1/2 mb-4">
        <ProgressTracker data={points} />
      </div>
      <div className="h-auto mt-4">
        <InterviewNotes data={notes} />
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviews } from "../../../store/middlewares/review";
import { Review } from "./Review";

export const Reviews = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.visitingProfile);

  const [reviews, setReviews] = useState();

  const fetchUserReviews = async () => {
    const response = await dispatch(getUserReviews(profile.id));
    setReviews(response);
  };

  useEffect(() => {
    if (profile) {
      fetchUserReviews();
    }
  }, [profile]);

  console.log("!!!!!!!!!!!!", profile, reviews);

  return (
    <div className="bg-white p-3 h-fit w-full">
      <div className="font-semibold text-center pt-2 pb-3">Reviews</div>
      <div>
        {reviews && reviews.length ? (
          <>
            {reviews.map((review) => (
              <Review key={review.id} data={review} />
            ))}
          </>
        ) : (
          <div>No Data</div>
        )}
      </div>
    </div>
  );
};

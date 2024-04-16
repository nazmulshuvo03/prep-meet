import { useSelector } from "react-redux";
import { Review } from "./Review";

export const Reviews = () => {
  const profile = useSelector((state) => state.user.visitingProfile);

  return (
    <div className="bg-white p-3 h-fit w-full">
      <div className="font-semibold text-center pt-2 pb-3">Reviews</div>
      {profile && profile.reviews ? (
        <div>
          {profile.reviews && profile.reviews.length ? (
            <>
              {profile.reviews.map((review) => (
                <Review key={review.id} data={review} />
              ))}
            </>
          ) : (
            <div>No Data</div>
          )}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

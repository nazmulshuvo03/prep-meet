import { useSelector } from "react-redux";
import { Review } from "./Review";
import { ProfileBlock } from "../../Layouts/ProfileBlock";

export const Reviews = () => {
  const profile = useSelector((state) => state.user.visitingProfile);

  return (
    <ProfileBlock title="Reviews" className="!bg-primary h-full">
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
    </ProfileBlock>
  );
};

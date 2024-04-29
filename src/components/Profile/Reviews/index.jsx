import { useSelector } from "react-redux";
import { Review } from "./Review";
import { ProfileBlock } from "../../Layouts/ProfileBlock";
import { NoData } from "../../NoData";

export const Reviews = ({ visit }) => {
  const profile = useSelector((state) =>
    visit ? state.user.visitingProfile : state.user.profile
  );

  return (
    <ProfileBlock title="Reviews" className="!bg-primary h-full">
      <div className="h-full">
        {profile && profile.reviews && profile.reviews.length ? (
          <>
            {profile.reviews.map((review) => (
              <Review key={review.id} data={review} visit={visit} />
            ))}
          </>
        ) : (
          <div className="h-2/3">
            <NoData message="No Reviews Yet" />
          </div>
        )}
      </div>
    </ProfileBlock>
  );
};

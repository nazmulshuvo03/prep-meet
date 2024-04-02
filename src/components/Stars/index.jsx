import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Stars = ({ value = 0, count = 5 }) => {
  return (
    <div className="py-1">
      {[...Array(count).keys()].map((i) => {
        return (
          <FontAwesomeIcon
            className="text-yellow-400"
            icon={i < value ? faStar : faStarRegular}
            key={i}
          />
        );
      })}
    </div>
  );
};

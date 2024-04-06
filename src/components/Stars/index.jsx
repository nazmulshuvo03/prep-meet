import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Stars = ({
  value = 0,
  setValue = () => {},
  count = 5,
  color = "yellow",
}) => {
  return (
    <div className="py-1">
      {[...Array(count).keys()].map((i) => {
        return (
          <FontAwesomeIcon
            className={`text-${color}-400`}
            icon={i < value ? faStar : faStarRegular}
            key={i}
            onClick={() => setValue(i + 1)}
          />
        );
      })}
    </div>
  );
};

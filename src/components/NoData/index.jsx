import NoDataImage from "../../assets/noData.svg";
import NoDataImage1 from "../../assets/noData1.svg";
import NoDataImage2 from "../../assets/noData2.svg";

export const NoData = ({
  message = "No Data",
  size = 0,
  image = 0,
  className,
  fontClassName,
}) => {
  return (
    <div
      className={`h-full w-full flex flex-col justify-center items-center py-2 rounded-md ${className}`}
    >
      <img
        src={
          image === 1 ? NoDataImage1 : image === 2 ? NoDataImage2 : NoDataImage
        }
        className={`m-2`}
        style={size ? { height: `${size}px`, width: `${size}px` } : {}}
        alt="No Data"
      />
      <div
        className={`font-light text-sm md:text-xl text-text ${fontClassName}`}
      >
        {message}
      </div>
    </div>
  );
};

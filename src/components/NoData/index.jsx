import NoDataImage from "../../assets/noData.svg";

export const NoData = ({ message = "No Data", size = 88, className }) => {
  return (
    <div
      className={`h-full w-full flex flex-col justify-center items-center py-2 rounded-md ${className}`}
    >
      <img
        src={NoDataImage}
        className={`m-2`}
        style={{ height: `${size}px`, width: `${size}px` }}
      />
      <div className="font-light text-sm text-text">{message}</div>
    </div>
  );
};

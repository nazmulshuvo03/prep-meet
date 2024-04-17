import NoDataImage from "../../assets/noData.svg";

export const NoData = ({ message = "No Data", size = 88 }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <img
        src={NoDataImage}
        className={`p-4`}
        style={{ height: `${size}px`, width: `${size}px` }}
      />
      <div className="font-light text-sm text-text">{message}</div>
    </div>
  );
};

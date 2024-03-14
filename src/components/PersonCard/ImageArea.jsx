export const ImageArea = ({ data = null }) => {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <img
        src={data.photoURL}
        alt={"Person Profile Image"}
        className="h-28 w-28 rounded-md"
      />
      <div className="flex gap-2 font-semibold text-lg">
        <span>{data.userName}</span>
        {/* <span>{data.lastName}</span> */}
      </div>
      <div className="text-xs font-light text-gray-600">{data.country}</div>
    </div>
  );
};

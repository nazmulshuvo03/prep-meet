export const ImageArea = ({ data = null }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={data.photoURL}
        alt={"Person Profile Image"}
        className="h-32 w-32 rounded-md"
      />
      <div className="flex gap-2 font-semibold text-md">
        <span>{data.firstName}</span>
        <span>{data.lastName}</span>
      </div>
      <div className="text-sm font-light text-gray-500">{data.country}</div>
    </div>
  );
};

export const Display = ({ data }) => {
  return (
    <div className="px-2 relative pb-3 flex justify-between items-start">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <div
              className="border-l-2 border-gray-200 absolute"
              style={{ height: "100%", top: 10, left: -2 }}
            />
            <div
              className="text-gray-300 absolute"
              style={{ fontSize: 30, top: -11, left: -5 }}
            >
              &middot;
            </div>
            <div className="flex items-center justify-between text-sm font-semibold">
              {data.institution}
            </div>
            <div className="text-sm font-medium">
              {data.degree}
              {" in "}
              {data.major}
            </div>
            <div className="text-xs font-normal text-gray-500">
              {data.year_of_graduation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

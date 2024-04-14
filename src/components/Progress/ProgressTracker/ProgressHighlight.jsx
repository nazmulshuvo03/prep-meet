import { Button } from "../../Button";

export const ProgressHighlight = ({ data }) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 grid grid-cols-3">
        {data && data.length ? (
          <>
            {data.map((item) => {
              return (
                <div key={item.id} className="text-center">
                  <div className="text-xs md:text-base font-medium text-gray-500">
                    {item.name}
                  </div>
                  <div className="text-xl md:text-4xl font-bold text-text">
                    {item.point || 0}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div>No Data</div>
        )}
      </div>
      <div className="flex justify-center">
        <Button size="small">Practice Mocks</Button>
      </div>
    </div>
  );
};

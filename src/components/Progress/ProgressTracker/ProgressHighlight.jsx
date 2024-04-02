import { Button } from "../../Button";

export const ProgressHighlight = () => {
  const data = [
    { id: 1, name: "Analytics and Metrics", value: 4.3 },
    { id: 2, name: "Product Sense", value: 4.7 },
    { id: 3, name: "Behavioral", value: 3.8 },
    { id: 4, name: "Total Mocks Practiced", value: 5 },
  ];

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
                    {item.value}
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

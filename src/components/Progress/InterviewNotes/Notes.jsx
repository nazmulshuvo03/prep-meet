export const Notes = ({ data = null }) => {
  return (
    <div>
      {data && data.length ? (
        <>
          {data.map((item) => {
            return (
              <div
                key={item.id}
                className="flex my-3 bg-background py-2 px-1 rounded-sm text-gray-600"
              >
                {item.note}
              </div>
            );
          })}
        </>
      ) : (
        <div>No Notes</div>
      )}
    </div>
  );
};

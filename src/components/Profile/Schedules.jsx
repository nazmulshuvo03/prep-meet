import { convertISOUTCDayTimeToLocalDayTime } from "../../utils/timeDate";

export const Schedules = ({ data }) => {
  return (
    <div className="bg-white p-3">
      <div className="font-semibold text-center pt-2 pb-3">
        Current Schedule
      </div>
      <div>
        {data && data.availabilities && data.availabilities.length ? (
          <div>
            {data.availabilities.map((avl) => {
              return (
                <div
                  key={avl.id}
                  className="flex items-center justify-between py-1"
                >
                  <div className="text-sm font-normal text-gray-500">
                    {convertISOUTCDayTimeToLocalDayTime(avl.dayHourUTC).date}
                  </div>
                  <div
                    className={`capitalize px-5 py-1 text-white font-semibold text-xs ${
                      avl.state === "COMPLETED"
                        ? "bg-red-400"
                        : avl.state === "BOOKED"
                        ? "bg-green-400"
                        : "bg-blue-500"
                    }`}
                  >
                    {avl.state?.toLowerCase()}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

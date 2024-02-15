// Function to get formatted date with weekday (DD-MM-YYYY, Weekday)
export function getFormattedDateWithWeekday(date) {
  // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!", date);
  date.setHours(0, 0, 0, 0); // Set time to 00:00:00 (midnight)
  const options = {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  // const options = {
  //   weekday: "long",
  //   day: "2-digit",
  //   month: "2-digit",
  //   year: "numeric",
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   second: "2-digit",
  // };

  const formattedDate = new Intl.DateTimeFormat("en-IN", options).format(date);
  return formattedDate;
}

// Function to generate an array of date objects with key-label pairs
export function generateDateArray() {
  const currentDate = new Date();
  const dateArray = [];

  for (let i = 0; i < 3; i++) {
    const formattedDate = getFormattedDateWithWeekday(currentDate);
    dateArray.push({ key: currentDate.getTime(), label: formattedDate });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

// Function to format the hour in 12-hour format with am/pm
export function formatHourWithAMPM(hour) {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:00 ${period}`;
}

// Function to generate an array of hour objects with key-label pairs
export function generateHourArray() {
  const hourArray = [];

  for (let hour = 0; hour < 24; hour++) {
    const formattedHour = formatHourWithAMPM(hour);
    hourArray.push({ key: hour, label: formattedHour });
  }

  return hourArray;
}

export function getDateTimeStamp(timeIn24 = 0, originalDate) {
  // Original timestamp representing 12:00 AM
  if (!originalDate) {
    // If any date is not provided, date is set to today
    let current = new Date();
    originalDate = current.setHours(0, 0, 0, 0);
  }
  // Create a new Date object using the original timestamp
  const dateWithOriginalTime = new Date(originalDate);
  dateWithOriginalTime.setHours(timeIn24, 0, 0, 0);

  // Get the updated timestamp
  const updatedTimestamp = dateWithOriginalTime.getTime();
  return updatedTimestamp;
}

export function convertUnixLocalToUnixUTC(localTime) {
  let localDate = new Date(parseInt(localTime));
  let utcTimestamp =
    localDate.getTime() + localDate.getTimezoneOffset() * 60000;
  return utcTimestamp;
}

export function convertUnixUTCToLocal(utcTime) {
  let utcDate = new Date(parseInt(utcTime));
  let localTimeStamp = utcDate.getTime() - utcDate.getTimezoneOffset() * 60000;
  return localTimeStamp;
}

export const convertLocalDayTimeToUTCDayTime = (originalDate, hour) => {
  let dateWithOriginalTime = new Date(originalDate);
  dateWithOriginalTime.setHours(hour, 0, 0, 0);
  const updatedTime =
    dateWithOriginalTime.getTime() +
    dateWithOriginalTime.getTimezoneOffset() * 60000;
  return updatedTime;
};

export const convertUTCDayTimeToLocalDayTime = (unixDayTime) => {
  const dateOptions = {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-IN", dateOptions).format(
    unixDayTime
  );
  const hourOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const formattedHour = new Intl.DateTimeFormat("en-IN", hourOptions).format(
    unixDayTime
  );
  return { date: formattedDate, time: formattedHour };
};
import React from "react";
import DatePicker from "react-datepicker";
// import { getDate } from "date-fns";
import { CustomInput } from "./CustomInput";
import { CustomHeader } from "./CustomHeader";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

export const DateInput = ({
  value = null,
  onChange = () => {},
  label = "",
  minDate = null,
  maxDate = null,
  placeholder = "",
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-xs">{label}</label>
      <DatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <CustomHeader
            {...{
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }}
          />
        )}
        selected={value}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        startDate={value}
        // endDate={endDate}
        // onChange={(date) => setDateValue(date)}
        // calendarClassName="rasta-stripes red-border"
        // withPortal // this opens modal for calender
        // dayClassName={(date) =>
        //   getDate(date) < Math.random() * 31 ? "random" : undefined
        // }
        placeholderText={placeholder}
        customInput={<CustomInput placeholder={placeholder} />}
      />
    </div>
  );
};

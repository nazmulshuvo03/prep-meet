import { useSelector } from "react-redux";
import { MandatoryStar } from "../../MandatoryStar";
import { getDataLabelFromKey } from "../../../utils/data";
import { Tooltip } from "../../Tooltip";
import { companyNameShortner } from "../../../utils/string";

export const TargetItem = ({
  title = "",
  value,
  valueArray,
  optionArray,
  size = "normal", // "normal", "big"
  tooltip = false,
}) => {
  const completionStatus = useSelector((state) => state.user.completionStatus);

  return (
    <div
      className={`flex flex-wrap items-baseline gap-1 break-words ${
        size === "big" ? "text-sm font-medium" : "text-xs font-medium"
      }`}
    >
      {title} {!completionStatus.focusAreas && <MandatoryStar />}:
      {value ? (
        <span className="font-normal">{value}</span>
      ) : valueArray && valueArray.length ? (
        valueArray.map((val, i) => {
          const label = getDataLabelFromKey(optionArray, val);
          return (
            <div
              key={val}
              className={`${size === "big" ? "font-medium" : "font-normal"}`}
            >
              <Tooltip text={tooltip ? label : ""}>
                <span>{tooltip ? companyNameShortner(label, 1) : label}</span>
                {i < valueArray.length - 1 ? (
                  <span style={{ fontSize: 15, marginLeft: "4px" }}>
                    &middot;
                  </span>
                ) : (
                  <span />
                )}
              </Tooltip>
            </div>
          );
        })
      ) : (
        <div />
      )}
    </div>
  );
};

import styles from "./radio.module.css";

export const RadioButtonGroup = ({
  label = "",
  options = [],
  selectedOption = "",
  onChange = () => {},
  buttonSize = 5,
  ...rest
}) => {
  return (
    <div>
      <div>{label}</div>
      <div className="flex gap-2">
        {options.map(({ key, value }) => (
          <label
            key={key}
            className="inline-flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              value={key}
              checked={selectedOption === key}
              onChange={onChange}
              className={styles.radioButton}
              {...rest}
            />
            {/* <div
              className={`w-${buttonSize} h-${buttonSize} rounded-full border border-primary ${
                selectedOption === key ? "bg-primary" : "bg-white"
              }`}
            ></div> */}
            <span className="text-text">{value}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

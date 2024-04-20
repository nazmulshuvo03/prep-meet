import { MandatoryStar } from "../MandatoryStar";

export const Block = ({
  children,
  title = "",
  titleStar = false,
  className = "",
  titleClass = "",
  ...rest
}) => {
  return (
    <div
      className={`bg-white px-4 py-3 h-fit w-full flex flex-col rounded-md shadow-md ${className}`}
      {...rest}
    >
      {title && (
        <div className={`font-semibold text-lg pt-2 pb-3 ${titleClass}`}>
          {title} {titleStar ? <MandatoryStar /> : ""}
        </div>
      )}
      {children}
    </div>
  );
};

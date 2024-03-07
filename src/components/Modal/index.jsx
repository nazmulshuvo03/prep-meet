import { EmptyModal } from "./EmptyModal";

export const Modal = ({
  children = <EmptyModal />,
  handleClose = () => {},
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-10">
      <div
        className="fixed top-0 left-0 w-full h-full z-10"
        onClick={handleClose}
        style={{ backgroundColor: "rgba(0,0,0, 0.5)" }}
      />
      <div
        style={{ maxHeight: "80%", maxWidth: "90%" }}
        className="w-fit min-w-96 h-fit min-h-36 bg-white shadow-lg rounded-md overflow-y-auto overflow-x-hidden z-50"
      >
        {children}
      </div>
    </div>
  );
};

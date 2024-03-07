import { Button } from ".";

export const IconButton = (props) => {
  return (
    <Button {...props} className={`!bg-transparent !p-0 ${props.className}`}>
      {props.children}
    </Button>
  );
};

import { Block } from "./Block";

export const ProfileBlock = (props) => {
  return (
    <Block {...props} titleClass="text-center">
      {props.children}
    </Block>
  );
};

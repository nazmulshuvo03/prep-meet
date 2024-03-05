import { Button } from "../Button";
import { Input } from "../Input";

export const Login = ({ switchMode = () => {} }) => {
  return (
    <div
      className="w-full h-full flex justify-center"
      style={{ paddingTop: "15%" }}
    >
      <div>
        <div className="text-center py-4">
          <div className="text-xl font-bold">Welcome back!</div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Input type="email" label={"Email Address"} />
          <Input type="password" label={"Password"} />
          <div className="py-2 flex items-center justify-start gap-1 text-xs text-secondary">
            <input type="checkbox" />
            <a className="hover:underline" href="/">
              Remember me
            </a>
          </div>
          <Button className={"!w-full !bg-secondary !py-1"}>Sign In</Button>
          <div className="py-2 flex justify-center gap-1 text-sm text-text underline">
            <div>Don't have an account ?</div>
            <div
              onClick={switchMode}
              className="text-secondary font-medium cursor-pointer"
            >
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

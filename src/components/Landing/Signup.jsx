import { Button } from "../Button";
import { Input } from "../Input";

export const Signup = ({ switchMode = () => {} }) => {
  return (
    <div
      className="w-full h-full flex justify-center"
      style={{ paddingTop: "15%" }}
    >
      <div>
        <div className="text-center py-4">
          <div className="text-xl font-bold">Create your account</div>
        </div>
        <div className="grid grid-cols-1 gap-1">
          <div className="flex gap-2">
            <Input type="text" label={"First Name"} />
            <Input type="text" label={"Last Name"} />
          </div>
          <Input type="email" label={"Email Address"} />
          <Input type="password" label={"Password"} />
          <Input type="password" label={"Confirm Password"} />
          <div className="py-2 flex items-center justify-start gap-1 text-xs text-secondary">
            <input type="checkbox" />
            <a className="hover:underline" href="/">
              I agree to the terms & policy
            </a>
          </div>
          <Button className={"!w-full !bg-secondary !py-1"}>Sign Up</Button>
          <div className="py-2 flex justify-center gap-1 text-sm text-text underline">
            <div>Alreay have an account ?</div>
            <div
              onClick={switchMode}
              className="text-secondary font-medium cursor-pointer"
            >
              Sign In
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

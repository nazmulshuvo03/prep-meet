import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../Button";
import { Input } from "../Input";
import { setToastMessage } from "../../store/slices/global";
import { TOAST_TYPES } from "../../constants/Toast";
import { signupUser } from "../../store/middlewares/auth";

export const Signup = ({ switchMode = () => {} }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [agree, setAgree] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleSignup = () => {
    if (!agree) {
      dispatch(
        setToastMessage({
          type: TOAST_TYPES[1],
          message: "Please read our Terms and Conditions",
        })
      );
      return;
    }
    if (!state.firstName) {
      setErrorMessage("First Name can not be empty");
      return;
    }
    if (!state.lastName) {
      setErrorMessage("Last Name can not be empty");
      return;
    }
    if (!state.email) {
      setErrorMessage("Email can not be empty");
      return;
    }
    if (!state.password) {
      setErrorMessage("Password can not be empty");
      return;
    }
    if (!state.confirmPassword) {
      setErrorMessage("Please confirm your password");
      return;
    }
    dispatch(signupUser(state));
    console.log("@@@@@@@@@@ submited: ", state);
  };

  useEffect(() => {
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [errorMessage]);

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
            <Input
              type="text"
              label={"First Name"}
              name="firstName"
              value={state.firstName}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <Input
              type="text"
              label={"Last Name"}
              name="lastName"
              value={state.lastName}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <Input
            type="email"
            label={"Email Address"}
            name="email"
            value={state.email}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <Input
            type="password"
            label={"Password"}
            name="password"
            value={state.password}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <Input
            type="password"
            label={"Confirm Password"}
            name="confirmPassword"
            value={state.confirmPassword}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <div className="py-2 flex items-center justify-start gap-1 text-xs text-secondary">
            <input
              type="checkbox"
              value={agree}
              onChange={(e) => setAgree((prev) => !prev)}
            />
            <a className="hover:underline" href="/">
              I agree to the terms & policy
            </a>
          </div>
          <div className="text-xs text-red-500 font-medium min-h-4 text-center">
            {errorMessage}
          </div>
          <Button
            onClick={handleSignup}
            className={"!w-full !bg-secondary !py-1"}
          >
            Sign Up
          </Button>
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

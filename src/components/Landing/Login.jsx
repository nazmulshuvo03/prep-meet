import { useDispatch } from "react-redux";
import { Button } from "../Button";
import { Input } from "../Input";
import { useEffect, useState } from "react";
import { loginUser } from "../../store/middlewares/auth";

export const Login = ({ switchMode = () => {} }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [remember, setRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleLogin = () => {
    if (!state.email) {
      setErrorMessage("Email can not be empty");
      return;
    }
    if (!state.password) {
      setErrorMessage("Password can not be empty");
      return;
    }
    dispatch(loginUser(state));
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
    <div className="w-full h-full flex justify-center p-4">
      <div>
        <div className="text-center py-4">
          <div className="text-xl font-bold">Welcome back!</div>
        </div>
        <div className="grid grid-cols-1 gap-4">
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
          <div className="py-2 flex items-center justify-start gap-1 text-xs text-secondary">
            <input
              type="checkbox"
              value={remember}
              onChange={(e) => setRemember((prev) => !prev)}
            />
            <a className="hover:underline" href="/">
              Remember me
            </a>
          </div>
          <div className="text-xs text-red-500 font-medium min-h-4 text-center">
            {errorMessage}
          </div>
          <Button
            onClick={handleLogin}
            className={"!w-full !bg-secondary !py-1"}
          >
            Sign In
          </Button>
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

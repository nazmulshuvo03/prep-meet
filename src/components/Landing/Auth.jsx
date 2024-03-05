import { useState } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";

export const Auth = () => {
  const [loginMode, setLoginMode] = useState(true);

  return (
    <div
      className="fixed top-0 left-0 h-full w-full"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className="fixed top-0 left-0 w-full h-full z-10"
        onClick={() => console.log("Landing bg clicked")}
      />
      <div className="absolute right-0 w-3/4 lg:w-1/2 xl:w-1/3 h-full bg-white z-50">
        <div className="h-full">
          {loginMode ? (
            <Login switchMode={() => setLoginMode((prev) => !prev)} />
          ) : (
            <Signup switchMode={() => setLoginMode((prev) => !prev)} />
          )}
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-1/6 bg-white z-50">
        <div className="flex justify-between">
          <h1>Footer 1</h1>
          <h1>Footer 2</h1>
        </div>
      </div>
    </div>
  );
};

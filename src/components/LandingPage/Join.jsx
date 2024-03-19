import { Button } from "../Button";

export const Join = () => {
  return (
    <div
      className="bg-white py-16 flex flex-col md:flex-row justify-between gap-10"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      <div className="text-3xl font-semibold">
        Join 1000+ candidates leveling up together
      </div>
      <div>
        <div className="text-base font-medium pb-6">
          Sign Up now and start practicing. Its fast, free, and the best way to
          ensure you nail your next interview.
        </div>
        <Button className={"border border-text"}>Join</Button>
      </div>
    </div>
  );
};

import { Button } from "../Button";

export const Header = () => {
  return (
    <div
      className="h-2/3 flex flex-col justify-center bg-cover bg-center px-10"
      style={{ backgroundImage: 'url("/images/landingPage/image1.png")' }}
    >
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-8">
          <div className="text-6xl font-bold py-4">
            Ace Your Next Job Interview
          </div>
          <div className="text-lg font-medium py-4">
            Join the candidate network to practice mock interviews together.
            Find peers with experience at your target company and dream roles.
            Take turns interviewing each other, get invaluable feedback, and
            walk into real interviews fully prepared.
          </div>
          <div className="flex gap-6 py-4">
            <Button size="large" className={"border !border-text"}>
              Get started for free!
            </Button>
            <Button
              size="large"
              className={"border !border-text !bg-transparent !text-text"}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

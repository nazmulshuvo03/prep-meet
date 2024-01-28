import { useEffect } from "react";
import { fetchContent } from "./services/api";
import { all_profile_url, all_users_url } from "./services/user";

function App() {
  const fetchData = async () => {
    const reponse = await fetchContent(all_profile_url());
    // console.log("respnse: ", reponse);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-red-500">Hello</h1>
      </div>
    </>
  );
}

export default App;

const devMode = import.meta.env.DEV;

export const config = devMode
  ? { SERVER_URL: "http://localhost:4000" }
  : {
      SERVER_URL: "https://candidace.fyi",
    };

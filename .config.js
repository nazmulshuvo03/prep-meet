const devMode = import.meta.env.DEV;

export const config = devMode
  ? {
      SERVER_URL: "http://localhost:4000",
      FRONTEND_URL: "http://localhost:5173",
      STORAGE_URL:
        "https://candidace-public-storage.s3.ap-south-1.amazonaws.com",
    }
  : {
      SERVER_URL: "https://candidace.fyi",
      FRONTEND_URL: "https://candidace.fyi",
      STORAGE_URL:
        "https://candidace-public-storage.s3.ap-south-1.amazonaws.com",
    };

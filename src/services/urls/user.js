export const all_profile_url = (query = "") =>
  `/user/all${query ? "?" + query : ""}`;
export const all_users_url = () => `/user/users`;
export const user_url = (userId) => `/user/${userId}`;

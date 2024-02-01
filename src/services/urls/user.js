export const all_profile_url = (userId = null, query = "") =>
  `/user/all/${userId}${query ? "?" + query : ""}`;
export const all_users_url = () => `/user/users`;
export const user_url = (userId) => `/user/${userId}`;

export const all_profile_url = (query = "") =>
  `/user/all${query ? "?" + query : ""}`;
export const all_users_url = () => `/user/users`;
export const public_user_url = (userId) => `/user/public/${userId}`;
export const user_url = (userId) => `/user/${userId}`;
export const users_check_prop_url = () => `/user/check`;
export const user_progress = () => `/user/progress`;

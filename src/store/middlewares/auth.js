import { responseHandler } from "../../helper/api";
import { postContent } from "../../services/api";
import { logout_url } from "../../services/urls/auth";

export const logoutUser = () => async (dispatch) => {
  const res = await postContent(logout_url());
  responseHandler(res, () => console.log("Logged out"));
};

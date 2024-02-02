import { responseHandler } from "../../helper/api";
import { loginPageUrl, postContent } from "../../services/api";
import { logout_url } from "../../services/urls/auth";
import { persistor } from "../index";

export const logoutUser = () => async (dispatch) => {
  const res = await postContent(logout_url());
  responseHandler(res, () => {
    persistor.purge();
    window.location.href = loginPageUrl;
  });
};

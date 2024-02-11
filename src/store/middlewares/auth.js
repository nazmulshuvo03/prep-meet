import { responseHandler } from "../../utils/api";
import { asyncWrapper } from "../../utils/async";
import { loginPageUrl, postContent } from "../../services/api";
import { logout_url } from "../../services/urls/auth";
import { persistor } from "../index";

export const logoutUser = () =>
  asyncWrapper(async (dispatch) => {
    const res = await postContent(logout_url());
    responseHandler(res, () => {
      persistor.purge();
      window.location.href = loginPageUrl;
    });
  });

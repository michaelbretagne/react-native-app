import { TRY_AUTH } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import startTabs from "../../screens/MainTabs/startMainTabs";
import { AUTH_API_KEY } from "react-native-dotenv";

export const tryAuth = (authData, authMode) => {
  console.log("here");
  console.log(AUTH_API_KEY);
  return dispatch => {
    dispatch(uiStartLoading());
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${AUTH_API_KEY}`;

    if (authMode === "signup") {
      url = url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${AUTH_API_KEY}`;
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .catch(err => {
        console.log(err);
        alert("Something went wrong, please try again!");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading());
        if (parsedRes.error) {
          alert("Oops! Something went wrong: " + parsedRes.error.message);
        } else {
          startTabs();
        }
      });
  };
};

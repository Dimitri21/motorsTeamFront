import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// const calculateRemainingTime = (expirationTime) => {
//   const currentTime = new Date().getTime();
//   const adjExpirationTime = new Date(expirationTime).getTime();

//   const remainingDuration = adjExpirationTime - currentTime;

//   return remainingDuration;
// };

// const retrieveStoredToken = () => {
//   const storedToken = localStorage.getItem("token");
//   const storedExpirationDate = localStorage.getItem("expirationTime");

//   const remainingTime = calculateRemainingTime(storedExpirationDate);

//   if (remainingTime <= 3600) {
//     localStorage.removeItem("token");
//     localStorage.removeItem("expirationTime");
//     return null;
//   }

//   return {
//     token: storedToken,
//     duration: remainingTime,
//   };
// };

export const AuthContextProvider = (props) => {
  //   const tokenData = retrieveStoredToken();

  //   let initialToken;
  //   if (tokenData) {
  //     initialToken = tokenData.token;
  //   }

  //   const [token, setToken] = useState(initialToken);

  //   const userIsLoggedIn = !!token;

  //   const logoutHandler = useCallback(() => {
  //     setToken(null);
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("expirationTime");

  //     if (logoutTimer) {
  //       clearTimeout(logoutTimer);
  //     }
  //   }, []);

  const loginHandler = async (email, password, token, expirationTime) => {
    const CSRFresponse = await fetch("http://127.0.0.1:8888/getCSRFToken", {
      method: "POST",
    });

    if (!CSRFresponse.ok) {
      throw new Error("Request failed!");
    }

    const dataCSRF = await CSRFresponse.json();
    const CSRFtoken = dataCSRF.CSRFToken;
    console.log(CSRFtoken);

    let formData = new FormData();
    formData.append("_username", "jam-jam"); // là il faut mettre le nom d'utilisateur
    formData.append("password", "azertyuiop*"); // là il faut mettre le mot de passe
    formData.append("getCSRFToken", "true");
    formData.append("_csrf_token", CSRFtoken);

    try {
      const response = await fetch("http://127.0.0.1:8888/login_check", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      console.log(data);
      // localStorage.setItem('token', 'token of the API');
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }

    //   setToken(token);
    //   localStorage.setItem("token", token);
    //   localStorage.setItem("expirationTime", expirationTime);

    //   const remainingTime = calculateRemainingTime(expirationTime);

    //   logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  //   useEffect(() => {
  //     if (tokenData) {
  //       console.log(tokenData.duration);
  //       logoutTimer = setTimeout(logoutHandler, tokenData.duration);
  //     }
  //   }, [tokenData, logoutHandler]);

  const contextValue = {
    token: "token",
    isLoggedIn: false,
    login: loginHandler,
    logout: "logoutHandler",
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// let xhttp = new XMLHttpRequest();
// xhttp.onload = function () {
//   let json = JSON.parse(xhttp.responseText);
//   xhttp = new XMLHttpRequest();
//   xhttp.onload = function () {
//     json = JSON.parse(xhttp.responseText);
//     console.log("User token : " + json.loginToken); // là il faut enregistrer le token en javascript
//   };
//   xhttp.open("POST", "/login_check", true);
//   let formData = new FormData();
//   formData.append("_username", "jam-jam"); // là il faut mettre le nom d'utilisateur
//   formData.append("password", "azertyuiop*"); // là il faut mettre le mot de passe
//   formData.append("getCSRFToken", "true");
//   formData.append("_csrf_token", json.CSRFToken);
//   xhttp.send(formData);
// };
// xhttp.open("POST", "/getCSRFToken", true);
// xhttp.send();

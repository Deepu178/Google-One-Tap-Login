import "./App.css";
import React from "react";
//importing the googleOneTap function
import googleOneTap from "google-one-tap";
import { useEffect, useState } from "react";

//creating the options object
const options = {
  //client id of the google app
  client_id:"114914030611-askhm7c3r7pnhp8b7rq87qbvt8ncb2sb.apps.googleusercontent.com", // required
  auto_select: false, // optional
  cancel_on_tap_outside: false, // optional
  context: "signin", 
};

const App = () => {
  //creating useState hooks
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  //creating the useEffect hook
  useEffect(() => {
    //checking if the loginData is null
    if (!loginData) {
      //calling the googleOneTap function
      googleOneTap(options, async (response) => {
        console.log(response);
        //Ajax call to backend
        const res = await fetch("/api/google-login", {
          method: "POST",
          body: JSON.stringify({
            //sending the id_token to backend
            token: response.credential,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        //getting the response from backend
        const data = await res.json();
        //setting the loginData
        setLoginData(data);
        localStorage.setItem("loginData", JSON.stringify(data));
      });
    }
  }, [loginData]);

  //creating the logout function
  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login with Google</h1>
        <div>
          {/* checking if the user is logged in or not */}
          {loginData ? (
            <div>
              <h3>
                You logged in as {loginData.name} 
              </h3>
              {/* calling the logout function */}
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div>Not logged in</div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;

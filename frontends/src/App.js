import "./App.css";
import React from "react";
import googleOneTap from "google-one-tap";
import { useEffect, useState } from "react";

const options = {
  client_id:"114914030611-askhm7c3r7pnhp8b7rq87qbvt8ncb2sb.apps.googleusercontent.com", // required
  auto_select: false, // optional
  cancel_on_tap_outside: false, // optional
  context: "signin", 
};

function App() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  useEffect(() => {
    if (!loginData) {
      googleOneTap(options, async (response) => {
        console.log(response);
        const res = await fetch("/api/google-login", {
          method: "POST",
          body: JSON.stringify({
            token: response.credential,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setLoginData(data);
        localStorage.setItem("loginData", JSON.stringify(data));
      });
    }
  }, [loginData]);

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login with Google</h1>
        <div>
          {loginData ? (
            <div>
              <h3>
                You logged in as {loginData.name} 
              </h3>
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

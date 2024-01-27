"use client";

import React from "react";
import { auth } from "../lib/firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hasLogged, setHasLogged] = React.useState(false);
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    event.stopPropagation();

    await signInWithEmailAndPassword(auth, email, password).then((user) =>
      console.log("user", user),
    );
    setHasLogged(true);
  }
  return (
    <div>
      {!hasLogged && (
        <>
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="Email address"
            />
            <br />
            <input
              required
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              minLength={8}
            />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Login;

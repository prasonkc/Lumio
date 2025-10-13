"use client";

import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status === "authenticated") router.push("/"); // redirect if logged in
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLogin) {
      // Login via NextAuth
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) alert(result.error);
      else router.push("/");
    } else {
      // Signup
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        alert("Signup failed: " + text);
        return;
      }

      alert("Signup successful! Please log in.");
      setIsLogin(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md rounded-2xl bg-gray-800 p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 cursor-pointer"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="my-4 flex items-center justify-center">
          <span className="text-gray-400 text-sm">or</span>
        </div>

        <button
          className="w-full rounded-lg border border-gray-300 py-2 text-white hover:bg-gray-700 cursor-pointer"
          onClick={() => signIn("github")}
        >
          Continue with GitHub
        </button>

        <p className="mt-4 text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline cursor-pointer"
            type="button"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Fill all fields");
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      toast.success("Login successful");
      router.push("/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <section className="flex items-center justify-center bg-white px-6 py-12">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <button type="button" onClick={() => router.push("/")} className="mb-12 text-xl font-black lg:hidden">EVENT<span className="text-blue-600">.</span></button>
          <p className="mb-2 text-sm font-bold text-blue-600">WELCOME BACK</p>
          <h1 className="mb-8 text-4xl font-black text-black">Sign in</h1>

          <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="email">Email address</label>
          <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-5 w-full rounded-lg border border-slate-300 px-4 py-3 text-black placeholder:text-slate-400 focus:border-blue-600" required />

          <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-6 w-full rounded-lg border border-slate-300 px-4 py-3 text-black placeholder:text-slate-400 focus:border-blue-600" required />

          <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700">Login</button>
          <p className="mt-6 text-center text-sm text-slate-600">New to EVENT? <button type="button" onClick={() => router.push("/register")} className="font-bold text-blue-600 hover:text-blue-800">Create an account</button></p>
        </form>
      </section>
    </main>
  );
}
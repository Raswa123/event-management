"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";


export default function Register(){
  const router = useRouter();


    const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

   const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
     if (
      !userDetails.name ||
      !userDetails.email ||
      !userDetails.password
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      const result = await res.json();

      if (res.status === 201) {

        toast.success("Registration successful!");

        setUserDetails({
          name: "",
          email: "",
          password: "",
        });

        router.push("/login");

      } else {

        toast.error(result.message || "Registration failed");

      }

    } catch (error) {

      toast.error("Something went wrong");

    }
  };

  return(
    <main className="grid min-h-screen lg:grid-cols-[480px_1fr]">
     

      <section className="flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm">
          <button onClick={() => router.push("/")} className="mb-12 text-xl font-black lg:hidden">EVENT</button>
          <p className="mb-2 text-sm font-bold text-blue-600">CREATE YOUR ACCOUNT</p>
          <h1 className="mb-8 text-4xl font-black text-black">Get started</h1>
          <form onSubmit={handleSubmit}>
            <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="name">Full name</label>
            <input id="name" type="text" name="name" placeholder="Enter your name" value={userDetails.name} onChange={handleChange} className="mb-5 w-full rounded-lg border border-slate-300 px-4 py-3 text-black placeholder:text-slate-400 focus:border-blue-600" required />

            <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="register-email">Email address</label>
            <input id="register-email" type="email" name="email" placeholder="you@example.com" value={userDetails.email} onChange={handleChange} className="mb-5 w-full rounded-lg border border-slate-300 px-4 py-3 text-black placeholder:text-slate-400 focus:border-blue-600" required />

            <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="register-password">Password</label>
            <input id="register-password" type="password" name="password" placeholder="At least 6 characters" value={userDetails.password} onChange={handleChange} className="mb-6 w-full rounded-lg border border-slate-300 px-4 py-3 text-black placeholder:text-slate-400 focus:border-blue-600" required minLength={6} />

            <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700">Create account</button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">Already have an account? <button onClick={() => router.push("/login")} className="font-bold text-blue-600 hover:text-blue-800">Sign in</button></p>
        </div>
      </section>
    </main>
  );
  

}
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
        <section className="max-w-xl">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
            Event Management System
          </div>
          <h1 className="text-6xl font-black leading-[0.95] tracking-tight text-black md:text-7xl">
            Plan Your Events Prior
          </h1>
          
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/register" className="rounded-lg bg-blue-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700">
              Get started
            </Link>
            <Link href="/login" className="rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-bold text-black hover:border-black">
              Sign in
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
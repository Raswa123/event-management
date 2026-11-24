"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";

interface Event {
  _id: string;
  eventname: string;
  description: string;
  date: string;
  venue: string;
  event: string;
  status: string;
}

export default function Dashboard() {
  const [events, setEvent] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/event");
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to fetch events");
        return;
      }

      setEvent(result.data);

    } catch (error) {
      toast.error("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const deleteEvent = async (id: string) => {
    try {
      const res = await fetch(`/api/event/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Event deleted");
        fetchEvents();
      } else {
        toast.error("Delete failed");
      }

    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-black text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/dashboard" className="text-xl font-black">EVENT<span className="text-blue-500">.</span></Link>
          <button onClick={() => signOut({ callbackUrl: "/login" })} className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-bold hover:border-blue-500 hover:text-blue-400">Logout</button>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-sm font-bold text-blue-600">YOUR WORKSPACE</p>
            <h1 className="text-4xl font-black text-black">My Events</h1>
          </div>
          <Link href="/dashboard/add" className="rounded-lg bg-blue-600 px-5 py-3 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700">+ Add event</Link>
        </div>

        <div className="mb-6 flex gap-3">
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm"><span className="font-black text-black">{events.length}</span> <span className="text-slate-500">total</span></div>
        </div>

        {events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
            <p className="font-bold text-black">No events yet</p>
            <p className="mt-2 text-sm text-slate-500">Add your first event and start making progress.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {events.map((eventItem) => (
              <article key={eventItem._id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-bold text-black">{eventItem.eventname}</h2>
                </div>
                <p className="my-4 min-h-12 text-sm leading-6 text-slate-600">{eventItem.description}</p>
                <dl className="mb-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="font-bold text-slate-500">Date</dt>
                    <dd className="text-slate-800">{new Date(eventItem.date).toLocaleDateString()}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-500">Venue</dt>
                    <dd className="text-slate-800">{eventItem.venue}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-500">Event</dt>
                    <dd className="text-slate-800">{eventItem.event}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-500">Status</dt>
                    <dd className="text-slate-800">{eventItem.status}</dd>
                  </div>
                </dl>
                <div className="flex items-center justify-end border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-1">
                    <Link href={`/dashboard/${eventItem._id}`} aria-label={`Edit ${eventItem.eventname}`} className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600">Update</Link>
                    <button onClick={() => deleteEvent(eventItem._id)} aria-label={`Delete ${eventItem.eventname}`} className="rounded-lg p-2 text-slate-500 hover:bg-black hover:text-white">Delete</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
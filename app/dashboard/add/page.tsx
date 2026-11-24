"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddEvent() {

  const router = useRouter();

  const [eventDetails, setEventDetails] = useState({
    eventname: "",
    description: "",
    date: "",
    venue: "",
    event: "",
    status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEventDetails({
      ...eventDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(eventDetails).some((value) => !value.trim())) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventDetails),
      });

      if (res.status === 201) {
        toast.success("Event added successfully");

        setEventDetails({
          eventname: "",
          description: "",
          date: "",
          venue: "",
          event: "",
          status: "",
        });

        router.push("/dashboard");

      } else {
        toast.error("Failed to add event");
      }

    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <button onClick={() => router.push("/dashboard")} className="mb-6 text-sm font-bold text-slate-500 hover:text-blue-600">← Back to events</button>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="mb-2 text-sm font-bold text-blue-600">NEW EVENT</p>
          <h1 className="mb-8 text-3xl font-black text-black">Add an event</h1>
          <form onSubmit={handleSubmit} className="grid gap-x-5 md:grid-cols-2">
            <div>
              <label htmlFor="eventname" className="mb-2 block text-sm font-bold text-slate-700">Event Name</label>
              <input id="eventname" type="text" name="eventname" value={eventDetails.eventname} onChange={handleChange} className="mb-5 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-600" required />
            </div>
            <div>
              <label htmlFor="event" className="mb-2 block text-sm font-bold text-slate-700">Event Type</label>
              <input id="event" type="text" name="event" value={eventDetails.event} onChange={handleChange} className="mb-5 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-600" required />
            </div>
            <div>
              <label htmlFor="date" className="mb-2 block text-sm font-bold text-slate-700">Date</label>
              <input id="date" type="date" name="date" value={eventDetails.date} onChange={handleChange} className="mb-5 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-600" required />
            </div>
            <div>
              <label htmlFor="venue" className="mb-2 block text-sm font-bold text-slate-700">Venue</label>
              <input id="venue" type="text" name="venue" value={eventDetails.venue} onChange={handleChange} className="mb-5 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-600" required />
            </div>
            <div>
              <label htmlFor="status" className="mb-2 block text-sm font-bold text-slate-700">Status</label>
              <input id="status" type="text" name="status" value={eventDetails.status} onChange={handleChange} className="mb-5 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-600" required />
            </div>
            <div className="md:col-span-2">
            <label htmlFor="description" className="mb-2 block text-sm font-bold text-slate-700">Description</label>
              <textarea id="description" name="description" value={eventDetails.description} onChange={handleChange} className="mb-6 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-600" required rows={5} />
            </div>
            <div className="flex gap-3 md:col-span-2">
              <button type="button" onClick={() => router.push("/dashboard")} className="flex-1 rounded-lg border border-slate-300 px-4 py-3 font-bold text-black hover:border-black">Cancel</button>
              <button type="submit" className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700">Add event</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
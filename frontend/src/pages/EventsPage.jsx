import { useEffect, useState } from "react";
import NavHeader from "../components/NavHeader";
import { eventsAPI } from "../services/api";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventsAPI
      .getAll()
      .then((data) => {
        setEvents(data.events || []);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setEvents([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Events</h1>
        <p className="text-gray-600 mb-8">
          View upcoming club events around campus.
        </p>

        {loading ? (
          <p className="text-gray-600">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-600">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <article
                key={event.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
              >
                <p className="text-sm font-semibold text-purdue-gold mb-2">
                  {event.club_name || "Club Event"}
                </p>

                <h2 className="text-2xl font-bold mb-2">{event.name}</h2>

                <p className="text-gray-700 mb-4">{event.description}</p>

                <div className="text-sm text-gray-600 space-y-1">
                  {event.event_date && (
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(event.event_date).toLocaleDateString()}
                    </p>
                  )}

                  {event.location && (
                    <p>
                      <strong>Location:</strong> {event.location}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default EventsPage;
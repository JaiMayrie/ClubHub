import NavHeader from "../components/NavHeader";

const events = [
    {
         id: 1,
    title: "Spring Club Fair",
    date: "April 20, 2026",
    time: "12:00 PM",
    location: "Walb Union",
    description: "Meet student organizations and find your community.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Hack Night",
    date: "April 24, 2026",
    time: "6:00 PM",
    location: "Engineering Building",
    description: "Build projects, collaborate, and network with students.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Leadership Workshop",
    date: "May 2, 2026",
    time: "3:00 PM",
    location: "Student Center",
    description: "Develop leadership and communication skills.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  },
];

function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />

      <main className="container mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Events</h1>
          <p className="text-gray-600 mt-3">
            Explore upcoming club events, workshops, and campus activities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                <p className="text-sm text-gray-500 mb-1">{event.date}</p>
                <p className="text-sm text-gray-500 mb-1">{event.time}</p>
                <p className="text-sm text-gray-500 mb-4">{event.location}</p>
                <p className="text-gray-700">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default EventsPage;
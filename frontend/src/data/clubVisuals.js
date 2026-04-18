export const clubVisuals = {
  default: {
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    accent: "from-gray-700 to-gray-900",
  },
  Academic: {
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    accent: "from-blue-700 to-indigo-900",
  },
  Sports: {
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
    accent: "from-green-600 to-emerald-900",
  },
  Arts: {
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
    accent: "from-pink-600 to-rose-900",
  },
  Service: {
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
    accent: "from-amber-500 to-orange-800",
  },
  Professional: {
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    accent: "from-slate-700 to-slate-900",
  },
  "Special Interest": {
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    accent: "from-purple-700 to-fuchsia-900",
  },
};

export const getClubVisual = (club) =>
  clubVisuals[club.category] || clubVisuals.default;
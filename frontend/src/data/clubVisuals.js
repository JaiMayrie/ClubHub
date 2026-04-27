// Specific images for named clubs (you can expand this anytime)
const clubImages = {
  "Association for Computing Machinery":
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",

  "Basketball Club":
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80",

  "Black Student Union":
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",

  "Photography Club":
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",

  "Chess Club":
    "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=900&q=80",
};

// Large pool of fallback images (prevents duplicates)
const fallbackImages = [
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
];

// Accent gradients (for overlay vibe)
const accents = [
  "from-black",
  "from-blue-900",
  "from-purple-900",
  "from-green-900",
  "from-red-900",
  "from-yellow-900",
];

// Helper to generate consistent "random" index per club
function hashString(str = "") {
  return str
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

// MAIN FUNCTION
export function getClubVisual(club) {
  const image =
    clubImages[club.name] ||
    fallbackImages[hashString(club.name) % fallbackImages.length];

  const accent =
    accents[hashString(club.name) % accents.length];

  return {
    image,
    accent,
  };
}
import { getAvatarUrl } from "../services/api";

const SIZE_CLASSES = {
  sm: { wrapper: "w-10 h-10 text-sm", img: "w-10 h-10" },
  md: { wrapper: "w-16 h-16 text-2xl", img: "w-16 h-16" },
  lg: { wrapper: "w-20 h-20 text-2xl", img: "w-20 h-20" },
};

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function resolveUrl(avatarUrl) {
  if (!avatarUrl) return null;
  if (avatarUrl.startsWith("blob:") || avatarUrl.startsWith("http")) {
    return avatarUrl;
  }
  return getAvatarUrl(avatarUrl);
}

export default function UserAvatar({
  name,
  avatarUrl,
  size = "md",
  className = "",
}) {
  const sizes = SIZE_CLASSES[size] ?? SIZE_CLASSES.md;
  const src = resolveUrl(avatarUrl);

  if (src) {
    return (
      <img
        src={src}
        alt={name ?? "Avatar"}
        className={`${sizes.img} rounded-full object-cover flex-shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizes.wrapper} rounded-full bg-purdue-gold flex items-center justify-center font-bold text-black flex-shrink-0 ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}

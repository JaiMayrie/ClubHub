function EmptyState({ title, message, actionLabel, actionTo }) {
  return (
    <div className="text-center py-12">
      <div className="text-5xl mb-4">🏛️</div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      {actionLabel && actionTo && (
        <a
          href={actionTo}
          className="bg-purdue-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-purdue-gold-dark transition-colors"
        >
          {actionLabel}
        </a>
      )}
    </div>
  );
}

export default EmptyState;
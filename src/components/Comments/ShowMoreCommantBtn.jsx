
export default function ShowMoreCommantBtn({ onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full border border-slate-300 text-blue-600 text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer ${className}`}
    >
      View more comments
    </button>
  );
}

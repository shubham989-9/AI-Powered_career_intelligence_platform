function GoogleButton({ text }) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-3 border border-slate-700 bg-slate-800 hover:bg-slate-700 rounded-lg py-3 transition"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />

      <span>{text}</span>
    </button>
  );
}

export default GoogleButton;
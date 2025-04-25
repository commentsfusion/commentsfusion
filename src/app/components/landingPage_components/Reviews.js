export default function Reviews() {
  return (
    <div className="absolute bottom-10 flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-cyan-500 backdrop-blur-md">
      <p className="font-semibold">Reviews About us</p>
      <div className="flex gap-4">
        <div className="bg-white px-3 py-1 rounded-full flex items-center gap-2 text-black">
          Chrome Store ⭐ 5.0
        </div>
        <div className="bg-white px-3 py-1 rounded-full flex items-center gap-2 text-black">
          Trustpilot ⭐⭐⭐⭐⭐
        </div>
        <div className="bg-white px-3 py-1 rounded-full flex items-center gap-2 text-black">
          Clutch ⭐⭐⭐⭐
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="absolute top-6 right-6 flex gap-6 text-sm">
      {['Home', 'Features', 'Pricing', 'About us', 'Contact us'].map((item, idx) => (
        <Link key={idx} href="#" className="hover:text-cyan-300 transition-all">{item}</Link>
      ))}
      <button className="bg-cyan-400 text-black px-4 py-1 rounded-full font-semibold hover:scale-105 transition-transform">
        Sign Up
      </button>
    </div>
  );
}

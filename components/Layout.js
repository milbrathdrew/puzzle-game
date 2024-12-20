// components/Layout.js
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#c41e3a] text-white">
      <main className="min-h-screen">
        {children}
      </main>
      {/* Optional: Add festive footer */}
      <footer className="text-center p-4 text-[#ffd700]">
        <p>🎄 Happy Holidays! 🎅</p>
      </footer>
    </div>
  );
}

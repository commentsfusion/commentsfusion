import Sidebar from './sidenav';
import Topbar from './topBar';
import Image from 'next/image';

export default function Layout({ children }) {
  return (
    <div
      className="
        flex flex-col h-screen text-white
        bg-[linear-gradient(to_bottom,#000000,#33C6F4)]
        bg-cover bg-center max-h-screen
        overflow-y-auto

        p-4
        space-y-4
      "
    >
      {/* Full-width Topbar */}
      <header className="w-full">
        <Topbar />
      </header>

      {/* Content area below: Sidebar and main content */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto bg-transparent">
          {children}
        </main>
        <button className="fixed bottom-2 right-4 text-white p-3 rounded-full transition-colors animate-bounce">
          <Image
            src="/images/chatBotIcon.svg"
            alt="Comments"
            width={80}
            height={80}
          />
        </button>
      </div>
    </div>
  );
}

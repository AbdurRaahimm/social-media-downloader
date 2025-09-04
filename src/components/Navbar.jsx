import { Link, NavLink } from "react-router-dom";
import { DownloadCloud } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-800/50 border-b border-slate-700 shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <DownloadCloud className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full p-1" />
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-tight text-slate-100 hover:text-white transition-colors"
            >
              <span className="md:hidden">SMD</span>
              <span className="hidden md:inline">Social Media Downloader</span>
            </Link>
          </div>

          <nav>
            <ul className="flex items-center gap-6">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-lg font-semibold transition-colors ${
                      isActive
                        ? "text-indigo-400"
                        : "text-slate-300 hover:text-indigo-400"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/yt-mp3"
                  className={({ isActive }) =>
                    `text-lg font-semibold transition-colors ${
                      isActive
                        ? "text-indigo-400"
                        : "text-slate-300 hover:text-indigo-400"
                    }`
                  }
                >
                  YT to MP3
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}


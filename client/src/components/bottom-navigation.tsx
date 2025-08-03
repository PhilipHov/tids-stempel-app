import { Home, User, Clock, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";

interface BottomNavigationProps {
  currentPage?: string;
}

export default function BottomNavigation({ currentPage }: BottomNavigationProps) {
  const [location] = useLocation();
  
  const isActive = (page: string) => {
    if (page === "home") return location === "/";
    if (page === "profile") return location === "/profile";
    if (page === "history") return location === "/history";
    if (page === "settings") return location === "/settings";
    return currentPage === page;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary-green">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1 px-2 py-1">
        <Link href="/">
          <a className={`py-3 px-2 text-center active:bg-green-700 block rounded-lg ${isActive("home") ? "text-white" : "text-white/70"}`}>
            <Home className="block mb-1 mx-auto" size={22} />
            <span className="text-xs font-medium">Start</span>
          </a>
        </Link>
        <Link href="/profile">
          <a className={`py-3 px-2 text-center active:bg-green-700 block rounded-lg ${isActive("profile") ? "text-white" : "text-white/70"}`}>
            <User className="block mb-1 mx-auto" size={22} />
            <span className="text-xs font-medium">Profil</span>
          </a>
        </Link>
        <Link href="/history">
          <a className={`py-3 px-2 text-center active:bg-green-700 block rounded-lg ${isActive("history") ? "text-white" : "text-white/70"}`}>
            <Clock className="block mb-1 mx-auto" size={22} />
            <span className="text-xs font-medium">Historik</span>
          </a>
        </Link>
        <Link href="/settings">
          <a className={`py-3 px-2 text-center active:bg-green-700 block rounded-lg ${isActive("settings") ? "text-white" : "text-white/70"}`}>
            <Settings className="block mb-1 mx-auto" size={22} />
            <span className="text-xs font-medium">Indstillinger</span>
          </a>
        </Link>
      </div>
    </div>
  );
}

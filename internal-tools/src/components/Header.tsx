import { useState, type FC } from "react"
import { Link, useLocation } from "react-router"
import { routes } from "@/utils/constants/routes.ts"
import type { Route } from "@/utils/types/Route.ts"
import { Menu, X } from "lucide-react"

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="border-b border-[#3a3530] bg-[#1a1916]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0" onClick={closeMenu}>
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <img src="/favicon.ico" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-lg text-[#c9a961] font-semibold leading-tight text-nowrap">
                Crypto Analýza
              </h1>
              <p className="text-[10px] text-gray-500">Interní nástroje</p>
            </div>
          </Link>

          {/* Desktop nav — visible from lg (1024px) up */}
          <nav className="hidden lg:flex flex-wrap gap-1 justify-end">
            {Object.values(routes).map((item: Route) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
                    active
                      ? "bg-[#c9a961] text-[#1a1916]"
                      : "text-gray-400 hover:text-[#c9a961] hover:bg-[#2a2620]"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Hamburger — visible below lg */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-[#c9a961] hover:bg-[#2a2620] rounded-lg transition-colors shrink-0"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile / tablet dropdown — visible below lg */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-2 grid grid-cols-2 gap-2 border-t border-[#3a3530] pt-4">
            {Object.values(routes).map((item: Route) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all ${
                    active
                      ? "bg-[#c9a961] text-[#1a1916]"
                      : "text-gray-400 hover:text-[#c9a961] hover:bg-[#2a2620]"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};
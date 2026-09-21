import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logo from "@/assets/partnerstar-full-logo.png";

const links = [
  { name: "The partnership", anchor: "why-us" },
  { name: "Commissions", anchor: "deals" },
  { name: "FAQs", anchor: "faq" },
];
export const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <nav className="shell nav-inner" aria-label="Main navigation">
        <Link
          to="/"
          className="brand-link"
          aria-label="Partnerstar home"
          onClick={() => {
            setOpen(false);
            if (pathname === "/")
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "auto"
                  : "smooth",
              });
          }}
        >
          <img src={logo} alt="Partnerstar" width="210" height="40" />
        </Link>
        <div className="desktop-nav">
          {links.map((link) => (
            <a key={link.anchor} href={`/#${link.anchor}`}>
              {link.name}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <a
            className="login-link"
            href="https://ro-affiliate.partnerstar.com/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            Log in
          </a>
          <a
            className="button button-small"
            href="https://ro-affiliate.partnerstar.com/registration"
            target="_blank"
            rel="noopener noreferrer"
          >
            Become a partner <ArrowUpRight size={16} />
          </a>
        </div>
        <button
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav shell"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <a
              key={link.anchor}
              href={`/#${link.anchor}`}
              onClick={() => setOpen(false)}
            >
              {link.name}
              <ArrowUpRight size={18} />
            </a>
          ))}
          <a
            href="https://ro-affiliate.partnerstar.com/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            Log in <ArrowUpRight size={18} />
          </a>
          <a
            className="button"
            href="https://ro-affiliate.partnerstar.com/registration"
            target="_blank"
            rel="noopener noreferrer"
          >
            Become a partner <ArrowUpRight size={18} />
          </a>
        </nav>
      )}
    </header>
  );
};

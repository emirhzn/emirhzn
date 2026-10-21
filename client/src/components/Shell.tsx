import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Bell,
  ChevronDown,
  FileText,
  LayoutDashboard,
  Users,
  CalendarDays,
  Wallet,
  MessageCircle,
  Video,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
  Plus,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import type { Role } from "@/App";
import { documents } from "@/data/demo";

const nav = [
  {
    label: "Genel Bakış",
    path: "/",
    icon: LayoutDashboard,
    group: "ÇALIŞMA ALANI",
  },
  {
    label: "Müşteriler",
    path: "/clients",
    icon: Users,
    group: "ÇALIŞMA ALANI",
    accountant: true,
  },
  {
    label: "Evraklar",
    path: "/documents",
    icon: FileText,
    group: "ÇALIŞMA ALANI",
  },
  {
    label: "Vergi Takvimi",
    path: "/taxes",
    icon: CalendarDays,
    group: "FİNANS",
  },
  { label: "Finansal Durum", path: "/finance", icon: Wallet, group: "FİNANS" },
  {
    label: "Mesajlar",
    path: "/messages",
    icon: MessageCircle,
    group: "İLETİŞİM",
  },
  { label: "Toplantılar", path: "/meetings", icon: Video, group: "İLETİŞİM" },
];
export function Shell({
  role,
  dark,
  onTheme,
  onRole,
  onSignOut,
  children,
}: {
  role: Role;
  dark: boolean;
  onTheme: () => void;
  onRole: (r: Role) => void;
  onSignOut: () => void;
  children: React.ReactNode;
}) {
  const [loc] = useLocation();
  const [open, setOpen] = useState(false);
  const [bells, setBells] = useState(false);
  const target = role === "accountant" ? "/accountant" : "/client";
  const pendingDocuments = documents.filter(
    document =>
      document.status === "İnceleme bekliyor" &&
      (role !== "client" || document.client === "Mavi Kıyı Tasarım")
  ).length;
  const items = nav
    .filter(n => !n.accountant || role === "accountant")
    .map(n => ({
      ...n,
      path: n.path === "/" ? target : n.path,
      badge: n.path === "/documents" ? String(pendingDocuments) : undefined,
    }));
  const grouped = items.reduce<Record<string, typeof items>>(
    (a, n) => ((a[n.group] ??= []).push(n), a),
    {}
  );
  const title =
    items.find(n => n.path === loc)?.label ??
    (loc === "/meeting-room" ? "Görüntülü görüşme" : "Genel Bakış");
  return (
    <div className="app-shell">
      {open && (
        <button
          aria-label="Menüyü kapat"
          className="mobile-scrim"
          onClick={() => setOpen(false)}
        />
      )}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <span>H</span>
            <i />
          </div>
          <span className="brand-name">
            hesapio<span>.</span>
          </span>
          <button className="icon-btn close-nav" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <button className="workspace-switch">
          <div className="workspace-logo">
            {role === "accountant" ? "N" : "MK"}
          </div>
          <span className="workspace-text">
            <b>
              {role === "accountant"
                ? "Nora Mali Müşavirlik"
                : "Mavi Kıyı Tasarım"}
            </b>
            <small>
              {role === "accountant" ? "Profesyonel Plan" : "Müşteri hesabı"}
            </small>
          </span>
          <ChevronDown size={15} className="muted" />
        </button>
        <div className="quick-search">
          <Search size={15} />
          <span>Hızlı arama...</span>
          <kbd>⌘ K</kbd>
        </div>
        <nav className="side-nav">
          {Object.entries(grouped).map(([group, links]) => (
            <div className="nav-group" key={group}>
              <div className="nav-label">{group}</div>
              {links.map(item => {
                const active =
                  loc === item.path ||
                  (item.path !== target && loc.startsWith(item.path + "/"));
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className={`nav-link ${active ? "active" : ""}`}
                  >
                    <item.icon size={17} strokeWidth={active ? 2.2 : 1.8} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <small className="nav-badge">{item.badge}</small>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">
              <Sparkles size={15} />
            </div>
            <b>Bir sorunuz mu var?</b>
            <span>Bu alan prototip gezinme içindir.</span>
            <button onClick={() => (location.href = "/messages")}>
              Demo mesajlarına git <ArrowUpRight size={13} />
            </button>
          </div>
          <button
            className="profile-row"
            onClick={() =>
              onRole(role === "accountant" ? "client" : "accountant")
            }
          >
            <div className="avatar avatar-ink">
              {role === "accountant" ? "EY" : "MK"}
            </div>
            <span>
              <b>{role === "accountant" ? "Ece Yılmaz" : "Mert Kaya"}</b>
              <small>
                {role === "accountant" ? "Serbest Muhasebeci" : "Mükellef"}
              </small>
            </span>
            <ChevronDown size={15} />
          </button>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <div className="top-left">
            <button
              className="icon-btn menu-trigger"
              onClick={() => setOpen(true)}
            >
              <Menu size={19} />
            </button>
            <div className="breadcrumbs">
              <span>Hesapio</span>
              <b>/</b>
              <strong>{title}</strong>
            </div>
          </div>
          <div className="top-actions">
            <div className="today-label">Çarşamba, 21 Ekim 2026</div>
            <button
              className="icon-btn"
              aria-label="Temayı değiştir"
              onClick={onTheme}
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <div className="bell-wrap">
              <button
                className="icon-btn bell-button"
                aria-label="Bildirimler"
                onClick={() => setBells(!bells)}
              >
                <Bell size={17} />
                <i />
              </button>
              {bells && (
                <div className="notification-pop">
                  <b>Bildirimler</b>
                  <p>
                    <span className="notif-dot amber-dot" />
                    {pendingDocuments} örnek evrak incelemenizi bekliyor
                    <small>Demo bildirimi</small>
                  </p>
                  <p>
                    <span className="notif-dot blue-dot" />
                    Mavi Kıyı Tasarım size örnek mesaj gönderdi
                    <small>Demo bildirimi</small>
                    <button onClick={() => setBells(false)}>Kapat</button>
                  </p>
                </div>
              )}
            </div>
            <div className="top-divider" />
            <button
              className="top-avatar"
              onClick={onSignOut}
              title="Demo oturumundan çık"
            >
              {role === "accountant" ? "EY" : "MK"}
            </button>
          </div>
        </header>
        <div className="page-body">{children}</div>
        <footer className="page-footer">
          <span>© 2026 Hesapio Finansal Teknolojiler</span>
          <span>
            Demo çalışma alanı <i className="secure-dot" />
          </span>
        </footer>
      </main>
    </div>
  );
}

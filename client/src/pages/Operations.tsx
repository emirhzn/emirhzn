import { useMemo, useState } from "react";
import {
  Users,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpDown,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  FileCheck2,
  FileText,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import { clients as seed, documents, taxes as taxSeed, fmt } from "@/data/demo";
import type { Role } from "@/App";
import { TablePagination } from "@/components/TablePagination";

const monthNames = [
  "",
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];
const monthCodes = [
  "",
  "Oca",
  "Şub",
  "Mar",
  "Nis",
  "May",
  "Haz",
  "Tem",
  "Ağu",
  "Eyl",
  "Eki",
  "Kas",
  "Ara",
];
const taxMonthLabels = Object.fromEntries(
  monthCodes.map((code, index) => [code, monthNames[index]])
);

export function Clients() {
  const [list, setList] = useState(seed);
  const [q, setQ] = useState("");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [sort, setSort] = useState(false);
  const [page, setPage] = useState(1);
  const items = useMemo(
    () =>
      list
        .filter(c =>
          `${c.name} ${c.person} ${c.type}`
            .toLocaleLowerCase("tr")
            .includes(q.toLocaleLowerCase("tr"))
        )
        .sort((a, b) =>
          sort ? a.name.localeCompare(b.name, "tr") : b.revenue - a.revenue
        ),
    [list, q, sort]
  );
  const pageItems = items.slice((page - 1) * 5, page * 5);
  const pendingDocsCount = documents.filter(
    document =>
      document.status === "İnceleme bekliyor" &&
      list.some(client => client.name === document.client)
  ).length;
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> MÜŞTERİ YÖNETİMİ
          </div>
          <h1>Müşterileriniz</h1>
          <p>
            Müşteri ilişkilerinizi, finansal durumlarını ve belge süreçlerini
            tek yerden takip edin.
          </p>
        </div>
        <button className="button-primary" onClick={() => setShow(true)}>
          <Plus size={16} /> Yeni müşteri
        </button>
      </div>
      <div className="metric-grid compact-metrics">
        <div className="compact-card">
          <span className="compact-icon blue-tint">
            <Users size={16} />
          </span>
          <div>
            <b>{list.length}</b>
            <small>Toplam müşteri</small>
          </div>
          <span className="compact-trend">örnek veri</span>
        </div>
        <div className="compact-card">
          <span className="compact-icon green-tint">
            <TrendingUp size={16} />
          </span>
          <div>
            <b>
              {fmt(list.reduce((total, client) => total + client.revenue, 0))}
            </b>
            <small>Aylık toplam gelir</small>
          </div>
          <span className="compact-trend">demo toplamı</span>
        </div>
        <div className="compact-card">
          <span className="compact-icon amber-tint">
            <FileCheck2 size={16} />
          </span>
          <div>
            <b>{pendingDocsCount}</b>
            <small>Evrak bekleyen</small>
          </div>
          <span className="compact-alert">demo kayıt</span>
        </div>
      </div>
      <section className="panel documents-table-panel">
        <div className="table-toolbar">
          <div className="table-toolbar-title">
            <b>Tüm müşteriler</b>
            <span>{items.length} örnek kayıt</span>
          </div>
          <div className="table-actions">
            <label className="table-search">
              <Search size={15} />
              <input
                value={q}
                onChange={e => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder="Müşteri ara..."
              />
            </label>
            <button
              className="icon-btn filter-button"
              onClick={() => setSort(!sort)}
              title="Sırala"
            >
              <SlidersHorizontal size={16} />
            </button>
          </div>
        </div>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>
                  MÜŞTERİ{" "}
                  <button
                    className="sort-button"
                    onClick={() => setSort(!sort)}
                  >
                    <ArrowUpDown size={12} />
                  </button>
                </th>
                <th>VERGİ TÜRÜ</th>
                <th>
                  AYLIK GELİR{" "}
                  <button
                    className="sort-button"
                    onClick={() => setSort(!sort)}
                  >
                    <ArrowUpDown size={12} />
                  </button>
                </th>
                <th>TAHSİLAT</th>
                <th>EVRAKLAR</th>
                <th>DURUM</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="empty-table-cell">
                    Bu aramayla eşleşen müşteri yok.
                  </td>
                </tr>
              )}
              {pageItems.map(c => (
                <tr key={c.id}>
                  <td>
                    <span className={`avatar avatar-${c.color} table-avatar`}>
                      {c.initials}
                    </span>
                    <span className="table-primary">
                      {c.name}
                      <small>
                        {c.person} · {c.id}
                      </small>
                    </span>
                  </td>
                  <td>{c.type}</td>
                  <td className="money-cell">{fmt(c.revenue)}</td>
                  <td>
                    {c.debt ? (
                      fmt(c.debt)
                    ) : (
                      <span className="paid-label">
                        <i /> Ödendi
                      </span>
                    )}
                  </td>
                  <td>
                    <span className="docs-count">
                      <FileText size={13} />
                      {c.docs} belge
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-pill ${c.status === "Aktif" ? "status-green" : "status-amber"}`}
                    >
                      <i />
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <button className="more-btn">
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination
          total={items.length}
          page={page}
          pageSize={5}
          onPageChange={setPage}
        />
      </section>
      {show && (
        <div className="modal-backdrop" onClick={() => setShow(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShow(false)}>
              <X size={18} />
            </button>
            <div className="modal-icon">
              <Users size={20} />
            </div>
            <div className="eyebrow">YENİ KAYIT</div>
            <h2>Müşteri ekle</h2>
            <p>Müşteri bilgilerini girerek portföyünüze ekleyin.</p>
            <label>
              İşletme adı
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Örn. Kuzey Tasarım Ltd."
              />
            </label>
            <label>
              Yetkili kişi
              <input placeholder="Ad Soyad" />
            </label>
            <label>
              İşletme türü
              <select>
                <option>Limited Şirket</option>
                <option>Şahıs Şirketi</option>
                <option>Anonim Şirket</option>
              </select>
            </label>
            <button
              className="button-primary modal-submit"
              onClick={() => {
                if (name.trim()) {
                  setList([
                    {
                      id: `M-${Date.now().toString().slice(-4)}`,
                      name: name.trim(),
                      person: "Yeni müşteri",
                      initials: name.trim().slice(0, 2).toUpperCase(),
                      color: "blue",
                      type: "Limited Şirket",
                      taxNo: "—",
                      revenue: 0,
                      expense: 0,
                      debt: 0,
                      docs: 0,
                      status: "Aktif",
                    },
                    ...list,
                  ]);
                  setName("");
                  setShow(false);
                }
              }}
            >
              Müşteriyi kaydet <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Taxes({ role }: { role: Role }) {
  const [filter, setFilter] = useState("Tümü");
  const [month, setMonth] = useState(10);
  const [q, setQ] = useState("");
  const [msg, setMsg] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(false);
  const roleTaxes = useMemo(
    () =>
      taxSeed.filter(
        t => role !== "client" || t.client === "Mavi Kıyı Tasarım"
      ),
    [role]
  );
  const currentMonthCode = monthCodes[month];
  const currentMonthTaxes = roleTaxes.filter(
    t => t.date.split(" ")[1] === currentMonthCode
  );
  const eventDays = new Set(
    currentMonthTaxes.map(t => Number(t.date.split(" ")[0]))
  );
  const entries = useMemo(
    () =>
      roleTaxes
        .filter(
          t =>
            (filter === "Tümü" || t.status === filter) &&
            `${t.name} ${t.client}`
              .toLocaleLowerCase("tr")
              .includes(q.toLocaleLowerCase("tr"))
        )
        .sort((a, b) => (sort ? a.amount - b.amount : b.amount - a.amount)),
    [filter, q, sort, roleTaxes]
  );
  const pageEntries = entries.slice((page - 1) * 5, page * 5);
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> VERGİ VE BEYANNAME TAKİBİ
          </div>
          <h1>Vergi takvimi</h1>
          <p>
            {role === "client"
              ? "Vergi yükümlülüklerinizi ve son ödeme tarihlerini kolayca takip edin."
              : "Müşterilerinizin beyanname ve ödeme dönemlerini takip edin."}
          </p>
        </div>
        <button
          className="button-secondary"
          onClick={() => setMsg("Takvim dışa aktarma demo akışı.")}
        >
          <CalendarDays size={15} /> Takvime aktar
        </button>
      </div>
      {msg && (
        <div className="toast-demo">
          <CheckMark />
          {msg}
          <button onClick={() => setMsg("")}>Kapat</button>
        </div>
      )}
      <div className="tax-top-grid">
        <article className="panel tax-calendar-card">
          <div className="calendar-head">
            <div>
              <div className="panel-kicker">AYLIK TAKVİM</div>
              <h3>{monthNames[month]} 2026</h3>
            </div>
            <div className="calendar-arrows">
              <button onClick={() => setMonth(m => Math.max(1, m - 1))}>
                <ChevronLeft size={15} />
              </button>
              <button onClick={() => setMonth(m => Math.min(12, m + 1))}>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
          <div className="calendar-grid">
            <div className="calendar-weekdays">
              {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map(d => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="calendar-days">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 2;
                const valid = day > 0 && day <= 31;
                const event = eventDays.has(day);
                return (
                  <button
                    key={i}
                    className={`${valid ? "" : "empty-day"} ${month === 10 && day === 21 ? "today-day" : ""} ${event ? "has-event" : ""}`}
                    disabled={!valid}
                  >
                    {valid ? day : ""}
                    {event && <i />}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="calendar-legend">
            <span>
              <i className="amber-dot" />
              Son ödeme tarihi
            </span>
            <span>
              <i className="blue-dot" />
              Bugün
            </span>
          </div>
        </article>
        <article className="tax-summary-card">
          <div className="tax-summary-top">
            <span className="tax-summary-icon">
              <CalendarDays size={18} />
            </span>
            <span className="urgent-pill">
              <i /> {monthNames[month].toLocaleUpperCase("tr")}
            </span>
          </div>
          <div className="panel-kicker">ÖRNEK VERGİ YÜKÜMLÜLÜĞÜ</div>
          <div className="tax-summary-total">
            {fmt(
              currentMonthTaxes.reduce((total, item) => total + item.amount, 0)
            )}
          </div>
          <span className="tax-summary-desc">
            {currentMonthTaxes.length} örnek beyanname ve ödeme kaydı
          </span>
          <div className="tax-progress">
            <i
              style={{
                width: `${Math.min(100, currentMonthTaxes.length * 25)}%`,
              }}
            />
          </div>
          <div className="tax-progress-label">
            <span>{currentMonthTaxes.length} demo kayıt</span>
            <b>Örnek veri</b>
          </div>
          <button
            className="tax-summary-link"
            onClick={() => setMsg("Hatırlatma ayarları demo ekranında.")}
          >
            Hatırlatmaları yönet <ArrowRight size={14} />
          </button>
        </article>
      </div>
      <section className="panel documents-table-panel">
        <div className="table-toolbar">
          <div className="filter-tabs">
            {[
              "Tümü",
              "Yaklaşıyor",
              "Hazırlanıyor",
              "Bekliyor",
              "Planlandı",
            ].map(t => (
              <button
                key={t}
                className={filter === t ? "selected" : ""}
                onClick={() => {
                  setFilter(t);
                  setPage(1);
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="table-actions">
            <label className="table-search">
              <Search size={15} />
              <input
                value={q}
                onChange={e => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder="Vergi veya müşteri ara..."
              />
            </label>
          </div>
        </div>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>BEYANNAME / VERGİ</th>
                <th>MÜŞTERİ</th>
                <th>SON ÖDEME</th>
                <th>
                  TUTAR{" "}
                  <button
                    className="sort-button"
                    onClick={() => setSort(!sort)}
                  >
                    <ArrowUpDown size={12} />
                  </button>
                </th>
                <th>DURUM</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pageEntries.length === 0 && (
                <tr>
                  <td colSpan={6} className="empty-table-cell">
                    Bu aramayla eşleşen vergi kaydı yok.
                  </td>
                </tr>
              )}
              {pageEntries.map(t => (
                <tr key={t.client + t.kind}>
                  <td>
                    <span className="tax-type">{t.kind}</span>
                    <span className="table-primary">
                      {t.name}
                      <small>
                        {taxMonthLabels[t.date.split(" ")[1]] ?? "Vergi"} 2026
                        dönemi
                      </small>
                    </span>
                  </td>
                  <td>{t.client}</td>
                  <td>
                    <span className="date-cell">
                      <CalendarDays size={14} />
                      {t.date}
                    </span>
                  </td>
                  <td className="money-cell">{fmt(t.amount)}</td>
                  <td>
                    <span
                      className={`status-pill ${t.status === "Yaklaşıyor" ? "status-amber" : t.status === "Hazırlanıyor" ? "status-blue" : "status-green"}`}
                    >
                      <i />
                      {t.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="download-btn"
                      title="PDF indir"
                      onClick={() =>
                        setMsg("Tahakkuk fişi PDF'i demo akışında hazırlandı.")
                      }
                    >
                      <Download size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination
          total={entries.length}
          page={page}
          pageSize={5}
          onPageChange={setPage}
        />
      </section>
    </div>
  );
}

function CheckMark() {
  return (
    <span className="toast-check">
      <FileCheck2 size={15} />
    </span>
  );
}
export function Finance({ role }: { role: Role }) {
  const [tab, setTab] = useState("Özet");
  const [msg, setMsg] = useState("");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState(false);
  const [page, setPage] = useState(1);
  const scopedSeed = useMemo(
    () => seed.filter(c => role !== "client" || c.name === "Mavi Kıyı Tasarım"),
    [role]
  );
  const totalRevenue = scopedSeed.reduce(
    (total, client) => total + client.revenue,
    0
  );
  const totalExpense = scopedSeed.reduce(
    (total, client) => total + client.expense,
    0
  );
  const totalReceivables = scopedSeed.reduce(
    (total, client) => total + client.debt,
    0
  );
  const debtClientCount = scopedSeed.filter(client => client.debt > 0).length;
  const rows = useMemo(
    () =>
      scopedSeed
        .filter(c =>
          `${c.name} ${c.person} ${c.type}`
            .toLocaleLowerCase("tr")
            .includes(q.toLocaleLowerCase("tr"))
        )
        .sort((a, b) => (sort ? a.revenue - b.revenue : b.revenue - a.revenue)),
    [scopedSeed, q, sort]
  );
  const pageRows = rows.slice((page - 1) * 5, page * 5);
  const tabs = ["Özet", "Cari hesap", "Gelir-gider", "Mizan"];
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> FİNANSAL RAPORLAMA
          </div>
          <h1>{role === "client" ? "Finansal durumum" : "Finansal durum"}</h1>
          <p>
            {role === "client"
              ? "İşletmenizin gelir, gider ve hizmet bedeli özetini görün."
              : "Portföyünüzün finansal görünümünü ve müşteri alacaklarını inceleyin."}
          </p>
        </div>
        <button
          className="button-secondary"
          onClick={() => setMsg("Rapor PDF'i demo olarak hazırlandı.")}
        >
          <ArrowDownToLine size={15} /> Raporu PDF indir
        </button>
      </div>
      {msg && (
        <div className="toast-demo">
          <FileCheck2 size={15} />
          {msg}
          <button onClick={() => setMsg("")}>Kapat</button>
        </div>
      )}
      <div className="finance-summary-grid">
        <div className="finance-summary-card">
          <span className="compact-icon green-tint">
            <TrendingUp size={16} />
          </span>
          <span>
            <small>Toplam gelir · Ekim</small>
            <b>{fmt(totalRevenue)}</b>
            <i className="finance-good">Örnek veri toplamı</i>
          </span>
        </div>
        <div className="finance-summary-card">
          <span className="compact-icon rose-tint">
            <Wallet size={16} />
          </span>
          <span>
            <small>Toplam gider · Ekim</small>
            <b>{fmt(totalExpense)}</b>
            <i className="finance-neutral">Örnek veri toplamı</i>
          </span>
        </div>
        <div className="finance-summary-card">
          <span className="compact-icon amber-tint">
            <FileText size={16} />
          </span>
          <span>
            <small>
              {role === "client"
                ? "Müşavire hizmet bedeli"
                : "Tahsil edilecek alacak"}
            </small>
            <b>{fmt(totalReceivables)}</b>
            <i className="finance-alert">
              {role === "client"
                ? "Örnek hizmet bedeli borcu"
                : `${debtClientCount} müşteride açık bakiye`}
            </i>
          </span>
        </div>
      </div>
      <section className="panel documents-table-panel">
        <div className="finance-tabs">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={tab === t ? "active" : ""}
            >
              {t}
            </button>
          ))}
          <button className="period-filter">
            01–31 Ekim 2026 <CalendarDays size={14} />
          </button>
        </div>
        <div className="finance-report-heading">
          <div>
            <div className="panel-kicker">
              {tab.toLocaleUpperCase("tr")} · EKİM 2026
            </div>
            <h3>
              {tab === "Gelir-gider"
                ? "Aylık gelir-gider tablosu"
                : tab === "Mizan"
                  ? "Genel mizan"
                  : tab === "Cari hesap"
                    ? "Müşteri cari hesap ekstresi"
                    : "Portföy finans özeti"}
            </h3>
          </div>
          <div className="table-actions">
            <label className="table-search">
              <Search size={15} />
              <input
                value={q}
                onChange={e => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder="Müşteri veya hesap ara..."
              />
            </label>
            <button
              className="icon-btn"
              title="Bakiyeye göre sırala"
              onClick={() => setSort(!sort)}
            >
              <ArrowUpDown size={15} />
            </button>
            <button
              className="icon-btn"
              onClick={() => setMsg("Rapor indirildi (demo).")}
              title="Raporu indir"
            >
              <Download size={16} />
            </button>
          </div>
        </div>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>{tab === "Cari hesap" ? "MÜŞTERİ" : "HESAP / MÜŞTERİ"}</th>
                <th>{tab === "Mizan" ? "BORÇ" : "GELİR"}</th>
                <th>{tab === "Mizan" ? "ALACAK" : "GİDER"}</th>
                <th>BAKİYE</th>
                <th>DURUM</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={5} className="empty-table-cell">
                    Bu aramayla eşleşen finans kaydı yok.
                  </td>
                </tr>
              )}
              {pageRows.map((c, i) => (
                <tr key={c.id}>
                  <td>
                    <span className={`avatar avatar-${c.color} table-avatar`}>
                      {c.initials}
                    </span>
                    <span className="table-primary">
                      {tab === "Mizan"
                        ? [
                            "100 · Kasa",
                            "120 · Alıcılar",
                            "320 · Satıcılar",
                            "600 · Yurtiçi satışlar",
                            "770 · Genel yönetim",
                          ][((page - 1) * 5 + i) % 5]
                        : c.name}
                      <small>
                        {tab === "Mizan"
                          ? "Tek Düzen Hesap Planı"
                          : c.id + " · " + c.type}
                      </small>
                    </span>
                  </td>
                  <td className="money-cell">{fmt(c.revenue)}</td>
                  <td className="money-cell">{fmt(c.expense)}</td>
                  <td className="money-cell">{fmt(c.revenue - c.expense)}</td>
                  <td>
                    <span
                      className={`status-pill ${c.debt ? "status-amber" : "status-green"}`}
                    >
                      <i />
                      {c.debt ? "Açık bakiye" : "Dengede"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination
          total={rows.length}
          page={page}
          pageSize={5}
          onPageChange={setPage}
        />
      </section>
      <div className="ocr-note">
        <Sparkles size={15} />
        <span>
          <b>Örnek muhasebe verisi</b> · Finansal değerler tasarım prototipini
          göstermek amacıyla üretilmiş demo verilerdir.
        </span>
      </div>
    </div>
  );
}

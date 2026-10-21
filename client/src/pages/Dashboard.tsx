import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  Check,
  ChevronRight,
  Clock3,
  FileCheck2,
  FileText,
  MessageCircle,
  MoreHorizontal,
  Plus,
  ReceiptText,
  TrendingUp,
  Users,
  Wallet,
  Video,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Link } from "wouter";
import type { Role } from "@/App";
import { clients, documents, fmt, taxes } from "@/data/demo";

const cashData = [
  { m: "May", g: 312, c: 245 },
  { m: "Haz", g: 286, c: 258 },
  { m: "Tem", g: 348, c: 271 },
  { m: "Ağu", g: 302, c: 286 },
  { m: "Eyl", g: 392, c: 310 },
  { m: "Eki", g: 358, c: 334 },
];
const ownDocuments = documents.filter(d => d.client === "Mavi Kıyı Tasarım");
const reviewDocuments = documents.filter(d => d.status === "İnceleme bekliyor");
const reviewCount = reviewDocuments.length;
const pendingReceivables = clients.reduce(
  (total, client) => total + client.debt,
  0
);
const sixMonthIncome =
  cashData.reduce((total, month) => total + month.g, 0) * 1000;
const processedCount = documents.filter(d => d.status === "İşlendi").length;
const approvedCount = documents.filter(d => d.status === "Onaylandı").length;
const totalDocuments = documents.length;
const percent = (count: number) => Math.round((count / totalDocuments) * 100);
const pieData = [
  { name: "İşlendi", value: percent(processedCount), color: "#5578bd" },
  { name: "İnceleniyor", value: percent(reviewCount), color: "#efab5c" },
  { name: "Onaylandı", value: percent(approvedCount), color: "#e6eaf1" },
];
function Metric({
  label,
  value,
  change,
  positive,
  icon: Icon,
  tint,
  foot,
}: {
  label: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: any;
  tint: string;
  foot: string;
}) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span>{label}</span>
        <i className={`metric-icon ${tint}`}>
          <Icon size={17} />
        </i>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-foot">
        <span
          className={`metric-change ${positive === false ? "negative" : ""}`}
        >
          {positive === false ? (
            <ArrowDownRight size={13} />
          ) : (
            <ArrowUpRight size={13} />
          )}{" "}
          {change}
        </span>
        <span>{foot}</span>
      </div>
    </article>
  );
}
function Header({ client = false }: { client?: boolean }) {
  return (
    <div className="welcome-row">
      <div>
        <div className="eyebrow">
          <span className="eyebrow-dot" />{" "}
          {client ? "MÜŞTERİ DEMO PANELİ" : "MUHASEBECİ DEMO · 21 EKİM 2026"}
        </div>
        <h1>{client ? "Günaydın, Mert" : "Ofisinizin nabzı."}</h1>
        <p>
          {client
            ? "Örnek gelir-gider ve evrak akışı burada."
            : "Örnek verilerle bugünün operasyon özeti."}
        </p>
      </div>
      <div className="welcome-actions">
        {client ? (
          <Link href="/documents" className="button-primary">
            <Plus size={16} /> Evrak yükle
          </Link>
        ) : (
          <>
            <Link href="/clients" className="button-secondary">
              <Users size={15} /> Müşteri ekle
            </Link>
            <Link href="/meeting-room" className="button-primary">
              <Video size={15} /> Görüşme başlat
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
function Accountant() {
  return (
    <>
      <Header />
      <section className="metric-grid">
        <Metric
          label="Toplam müşteri"
          value={String(clients.length)}
          change="örnek kayıt"
          positive
          icon={Users}
          tint="blue-tint"
          foot="demo veri seti"
        />
        <Metric
          label="Tahsil edilecek"
          value={fmt(pendingReceivables)}
          change="örnek alacak"
          positive={false}
          icon={Wallet}
          tint="green-tint"
          foot="demo veri seti"
        />
        <Metric
          label="İnceleme bekleyen"
          value={String(reviewCount)}
          change="örnek evrak"
          icon={FileCheck2}
          tint="amber-tint"
          foot="demo verisi"
        />
        <Metric
          label="Örnek toplantı"
          value="3"
          change="örnek kayıt"
          icon={Video}
          tint="violet-tint"
          foot="demo takvimi"
        />
        <Metric
          label="Okunmamış demo mesaj"
          value="2"
          change="örnek kayıt"
          icon={MessageCircle}
          tint="blue-tint"
          foot="demo konuşma listesi"
        />
      </section>
      <section className="dashboard-grid-main">
        <article className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <div className="panel-kicker">FİNANSAL PERFORMANS</div>
              <h3>Gelir ve gider özeti</h3>
            </div>
            <button className="select-pill">
              Son 6 ay <ChevronRight size={14} />
            </button>
          </div>
          <div className="chart-total">
            <strong>{fmt(sixMonthIncome)}</strong>
            <span>
              <i /> <b>örnek</b> son altı aylık toplam
            </span>
          </div>
          <div className="area-chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={cashData}
                margin={{ top: 12, right: 4, left: -22, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#304f86" stopOpacity={0.14} />
                    <stop offset="95%" stopColor="#304f86" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="var(--line)"
                  strokeDasharray="3 5"
                />
                <XAxis
                  dataKey="m"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted-text)", fontSize: 11 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted-text)", fontSize: 10 }}
                  tickFormatter={v => `₺${v}k`}
                />
                <Tooltip
                  formatter={(v: any) => `₺${v}.000`}
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid var(--line)",
                    background: "var(--surface)",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="g"
                  name="Gelir"
                  stroke="#304f86"
                  strokeWidth={2.5}
                  fill="url(#income)"
                />
                <Area
                  type="monotone"
                  dataKey="c"
                  name="Gider"
                  stroke="#8ba3c9"
                  strokeWidth={2}
                  fill="transparent"
                  strokeDasharray="4 4"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend">
            <span>
              <i className="legend-dot navy-dot" />
              Gelir
            </span>
            <span>
              <i className="legend-dot pale-dot" />
              Gider
            </span>
            <span className="chart-note">₺ bin olarak gösterilmiştir</span>
          </div>
        </article>
        <article className="panel deadlines-panel">
          <div className="panel-heading">
            <div>
              <div className="panel-kicker">TAKVİM</div>
              <h3>Yaklaşan yükümlülükler</h3>
            </div>
            <Link href="/taxes" className="text-link">
              Tümünü gör <ArrowRight size={14} />
            </Link>
          </div>
          <div className="deadline-list">
            {taxes.slice(0, 4).map((t, i) => (
              <div className="deadline-item" key={t.client}>
                <div
                  className={`deadline-date ${i === 0 ? "date-active" : ""}`}
                >
                  <b>{t.date.split(" ")[0]}</b>
                  <small>{t.date.split(" ")[1]}</small>
                </div>
                <div className="deadline-info">
                  <b>{t.name}</b>
                  <span>{t.client}</span>
                </div>
                <div className="deadline-amount">{fmt(t.amount)}</div>
              </div>
            ))}
          </div>
          <Link href="/taxes" className="panel-bottom-link">
            Vergi takvimini aç <ArrowRight size={14} />
          </Link>
        </article>
      </section>
      <section className="dashboard-grid-bottom">
        <article className="panel docs-panel">
          <div className="panel-heading">
            <div>
              <div className="panel-kicker">SON HAREKETLER</div>
              <h3>
                Evrak inceleme kuyruğu{" "}
                <span className="count-chip">{reviewCount}</span>
              </h3>
            </div>
            <Link href="/documents" className="text-link">
              Tüm evraklar <ArrowRight size={14} />
            </Link>
          </div>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>EVRAK</th>
                  <th>MÜŞTERİ</th>
                  <th>YÜKLENME</th>
                  <th>TUTAR</th>
                  <th>DURUM</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {reviewDocuments.slice(0, 4).map(d => (
                  <tr key={d.id}>
                    <td>
                      <span className={`file-icon ${d.color}`}>
                        <FileText size={15} />
                      </span>
                      <span className="table-primary">
                        {d.name}
                        <small>{d.kind}</small>
                      </span>
                    </td>
                    <td>{d.client}</td>
                    <td>{d.date === "Az önce" ? "Bugün · demo" : d.date}</td>
                    <td className="money-cell">{fmt(d.amount)}</td>
                    <td>
                      <span
                        className={`status-pill ${d.status === "İnceleme bekliyor" ? "status-amber" : d.status === "İşlendi" ? "status-green" : "status-blue"}`}
                      >
                        <i />
                        {d.status}
                      </span>
                    </td>
                    <td>
                      <button className="more-btn">
                        <MoreHorizontal size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href="/documents" className="panel-bottom-link">
            Tüm belgeleri görüntüle <ArrowRight size={14} />
          </Link>
        </article>
        <article className="panel activity-panel">
          <div className="panel-heading">
            <div>
              <div className="panel-kicker">MÜŞTERİ PORTFÖYÜ</div>
              <h3>Belge işleme durumu</h3>
            </div>
            <button className="more-btn">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <div className="donut-area">
            <div className="donut-chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius="68%"
                    outerRadius="90%"
                    paddingAngle={4}
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    {pieData.map(e => (
                      <Cell key={e.name} fill={e.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-label">
                <b>{totalDocuments}</b>
                <small>toplam evrak</small>
              </div>
            </div>
            <div className="donut-legend">
              {pieData.map(p => (
                <div key={p.name}>
                  <i style={{ background: p.color }} />
                  <span>{p.name}</span>
                  <b>%{p.value}</b>
                </div>
              ))}
            </div>
          </div>
          <div className="activity-highlight">
            <span className="highlight-icon">
              <Activity size={15} />
            </span>
            <span>
              Demo listesinde <b>{totalDocuments} örnek evrak</b> var.
              <small>
                {approvedCount} onaylı · {reviewCount} inceleniyor ·{" "}
                {processedCount} işlendi
              </small>
            </span>
          </div>
        </article>
      </section>
      <section className="bottom-row">
        <div className="section-title">
          <div>
            <div className="panel-kicker">PORTFÖYÜNÜZ</div>
            <h3>Son görüntülenen müşteriler</h3>
          </div>
          <Link href="/clients" className="text-link">
            Tüm müşteriler <ArrowRight size={14} />
          </Link>
        </div>
        <div className="client-mini-grid">
          {clients.slice(0, 3).map(c => (
            <Link href="/clients" className="client-mini" key={c.id}>
              <div className={`avatar avatar-${c.color}`}>{c.initials}</div>
              <div>
                <b>{c.name}</b>
                <span>{c.person}</span>
              </div>
              <span className="client-mini-arrow">
                <ArrowUpRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
function Client() {
  return (
    <>
      <Header client />
      <section className="client-hero-grid">
        <article className="balance-card">
          <div className="balance-top">
            <div>
              <span>DEMO AYLIK ÖZET · EKİM 2026</span>
              <div className="balance-total">
                ₺128.450<small>,00</small>
              </div>
            </div>
            <div className="balance-chart">
              <svg viewBox="0 0 120 45" preserveAspectRatio="none">
                <path
                  d="M0 35 C12 30 15 33 25 22 S42 29 53 18 S66 28 78 13 S96 20 108 7 S115 11 120 4"
                  fill="none"
                  stroke="#a9bedf"
                  strokeWidth="2.5"
                />
                <path
                  d="M0 35 C12 30 15 33 25 22 S42 29 53 18 S66 28 78 13 S96 20 108 7 S115 11 120 4 V45 H0Z"
                  fill="url(#bal)"
                  opacity=".4"
                />
                <defs>
                  <linearGradient id="bal" x1="0" x2="0" y1="0" y2="1">
                    <stop stopColor="#9cb4d6" />
                    <stop offset="1" stopColor="#9cb4d6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className="balance-stats">
            <div>
              <span>TOPLAM GELİR</span>
              <b>₺156.800</b>
              <small>
                <TrendingUp size={12} /> %8,4
              </small>
            </div>
            <div>
              <span>TOPLAM GİDER</span>
              <b>₺28.350</b>
              <small className="subdued">Bu ay</small>
            </div>
          </div>
          <div className="balance-footer">
            <span>
              <i className="secure-dot" /> Örnek veriler · canlı hesap değil
            </span>
            <Link href="/finance">
              Detayları gör <ArrowRight size={13} />
            </Link>
          </div>
        </article>
        <article className="tax-callout">
          <div className="tax-callout-head">
            <span className="tax-symbol">
              <CalendarClock size={18} />
            </span>
            <span className="urgent-pill">
              <i /> 3 GÜN KALDI
            </span>
          </div>
          <div className="panel-kicker">YAKLAŞAN VERGİ ÖDEMESİ</div>
          <h3>KDV Beyannamesi</h3>
          <p>Ekim 2026 dönemi</p>
          <div className="tax-amount">
            ₺18.640<small>,00</small>
          </div>
          <div className="tax-callout-foot">
            <span>
              <Clock3 size={14} /> Son ödeme: <b>24 Eki, Cuma</b>
            </span>
            <button aria-label="Vergi detayları">
              <ArrowRight size={15} />
            </button>
          </div>
        </article>
      </section>
      <section className="client-home-grid">
        <article className="panel client-doc-panel">
          <div className="panel-heading">
            <div>
              <div className="panel-kicker">EVRAKLARINIZ</div>
              <h3>Son yüklenen belgeler</h3>
            </div>
            <Link href="/documents" className="text-link">
              Tümünü gör <ArrowRight size={14} />
            </Link>
          </div>
          <div className="client-doc-list">
            {ownDocuments.slice(0, 3).map(d => (
              <div className="client-doc-row" key={d.id}>
                <span className={`file-icon ${d.color}`}>
                  <FileText size={15} />
                </span>
                <span className="table-primary">
                  {d.name}
                  <small>
                    {d.date} · {d.kind}
                  </small>
                </span>
                <span
                  className={`status-pill ${d.status === "İnceleme bekliyor" ? "status-amber" : d.status === "İşlendi" ? "status-green" : "status-blue"}`}
                >
                  <i />
                  {d.status}
                </span>
              </div>
            ))}
          </div>
          <Link href="/documents" className="panel-bottom-link">
            Evrak merkezini aç <ArrowRight size={14} />
          </Link>
        </article>
        <article className="panel advisor-panel">
          <div className="panel-heading">
            <div>
              <div className="panel-kicker">MALİ MÜŞAVİRİNİZ</div>
              <h3>Ece Yılmaz</h3>
            </div>
            <div className="avatar avatar-violet">EY</div>
          </div>
          <p className="advisor-role">Serbest Muhasebeci Mali Müşavir</p>
          <div className="advisor-online">
            <i /> Demo durum kartı
          </div>
          <div className="advisor-actions">
            <Link href="/messages" className="button-secondary">
              <MessageCircle size={15} /> Mesaj gönder
            </Link>
            <Link href="/meetings" className="button-primary">
              <CalendarClock size={15} /> Randevu al
            </Link>
          </div>
          <div className="advisor-note">
            <span className="note-mark">“</span>
            <span>
              Ekim ayı evraklarınızı inceledim. Birkaç belge için not bıraktım,
              birlikte üzerinden geçebiliriz.
            </span>
          </div>
        </article>
      </section>
      <section className="bottom-row">
        <div className="section-title">
          <div>
            <div className="panel-kicker">YAPILACAKLAR</div>
            <h3>Bu ay sizi neler bekliyor?</h3>
          </div>
          <Link href="/taxes" className="text-link">
            Takvime git <ArrowRight size={14} />
          </Link>
        </div>
        <div className="task-strip">
          <div>
            <span className="task-icon amber-tint">
              <ReceiptText size={16} />
            </span>
            <span>
              <b>KDV ödemesi</b>
              <small>24 Ekim'e kadar · ₺18.640</small>
            </span>
            <span className="mini-progress">
              <i style={{ width: "75%" }} />
            </span>
            <ChevronRight size={15} />
          </div>
          <div>
            <span className="task-icon blue-tint">
              <FileCheck2 size={16} />
            </span>
            <span>
              <b>
                {
                  ownDocuments.filter(d => d.status === "İnceleme bekliyor")
                    .length
                }{" "}
                evrak incelemede
              </b>
              <small>Demo verisinde müşavir onayı bekleniyor</small>
            </span>
            <span className="mini-progress">
              <i style={{ width: "46%" }} />
            </span>
            <ChevronRight size={15} />
          </div>
          <div>
            <span className="task-icon green-tint">
              <MessageCircle size={16} />
            </span>
            <span>
              <b>Müşavirinizden 1 yeni mesaj</b>
              <small>Son mesaj · 1 saat önce</small>
            </span>
            <span className="mini-progress">
              <i style={{ width: "22%" }} />
            </span>
            <ChevronRight size={15} />
          </div>
        </div>
      </section>
    </>
  );
}
export function Dashboard({ role }: { role: Role }) {
  return (
    <div className="dashboard-page">
      {role === "accountant" ? <Accountant /> : <Client />}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Image,
  Mic,
  MicOff,
  MoreVertical,
  Paperclip,
  Phone,
  Plus,
  Search,
  Send,
  Settings,
  Share2,
  ShieldCheck,
  Smile,
  Video,
  VideoOff,
  Volume2,
  X,
} from "lucide-react";
import type { Role } from "@/App";
const people = [
  {
    name: "Mavi Kıyı Tasarım",
    person: "Mert Kaya",
    initial: "MK",
    tone: "violet",
    time: "12:42",
    last: "Ekim ayı evrakları hazır, inceleyebilirsiniz.",
    unread: 2,
  },
  {
    name: "Limon Atölye",
    person: "Selin Aras",
    initial: "LA",
    tone: "orange",
    time: "Dün",
    last: "Teşekkürler, faturayı tekrar yükledim.",
    unread: 0,
  },
  {
    name: "Kuzey Yazılım A.Ş.",
    person: "Mert Kaya",
    initial: "KY",
    tone: "blue",
    time: "Salı",
    last: "Toplantı daveti: Perşembe 14:30",
    unread: 0,
  },
  {
    name: "Form Mimarlık",
    person: "Can Demir",
    initial: "FM",
    tone: "green",
    time: "Pzt",
    last: "Görüşmek üzere, iyi çalışmalar.",
    unread: 0,
  },
];
const clientConversation = {
  name: "Ece Yılmaz",
  person: "Mali müşaviriniz",
  initial: "EY",
  tone: "violet",
  time: "12:42",
  last: "Ekim ayı evraklarınızı inceleyebilirsiniz.",
  unread: 1,
};
export function Messages({ role }: { role: Role }) {
  const [active, setActive] = useState(0);
  const [text, setText] = useState("");
  const [sent, setSent] = useState<Record<number, string[]>>({});
  const [recording, setRecording] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [, go] = useLocation();
  const conversationList = role === "client" ? [clientConversation] : people;
  const p = conversationList[Math.min(active, conversationList.length - 1)];
  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    setSent(current => ({
      ...current,
      [active]: [...(current[active] ?? []), message.trim()],
    }));
    setText("");
  };
  return (
    <div className="page-content comms-page">
      <div className="page-header">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> HESAPIO İLETİŞİM
          </div>
          <h1>Mesajlar</h1>
          <p>
            Müşterilerinizle ve mali müşavirinizle tüm yazışmalarınız tek yerde.
          </p>
        </div>
        <button className="button-primary" onClick={() => go("/meeting-room")}>
          <Video size={15} /> Görüşme başlat
        </button>
      </div>
      <section className="message-app panel">
        <aside className="conversation-list">
          <div className="conversation-list-top">
            <b>
              Mesajlar <span>{conversationList.length}</span>
            </b>
            <button className="icon-btn">
              <Plus size={17} />
            </button>
          </div>
          <label className="table-search convo-search">
            <Search size={15} />
            <input placeholder="Sohbetlerde ara..." />
          </label>
          {conversationList.map((x, i) => (
            <button
              key={x.name}
              className={`conversation-item ${active === i ? "conversation-active" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className={`avatar avatar-${x.tone}`}>{x.initial}</span>
              <span className="conversation-copy">
                <b>{x.name}</b>
                <small>{x.last}</small>
              </span>
              <span className="convo-meta">
                {x.time}
                {x.unread > 0 && <i>{x.unread}</i>}
              </span>
            </button>
          ))}
        </aside>
        <div className="chat-panel">
          <div className="chat-head">
            <div className={`avatar avatar-${p.tone}`}>{p.initial}</div>
            <div className="chat-person">
              <b>{role === "accountant" ? p.name : "Ece Yılmaz"}</b>
              <span>
                <i /> Demo konuşma · {p.person}
              </span>
            </div>
            <div className="chat-head-actions">
              <button className="icon-btn">
                <Search size={17} />
              </button>
              <button className="icon-btn">
                <Phone size={16} />
              </button>
              <button className="icon-btn" onClick={() => go("/meeting-room")}>
                <Video size={17} />
              </button>
              <button className="icon-btn">
                <MoreVertical size={17} />
              </button>
            </div>
          </div>
          <div className="chat-day">
            <span>ÖRNEK MESAJ GEÇMİŞİ · 21 EKİM</span>
          </div>
          <div className="chat-messages">
            <div style={{ display: active === 0 ? "contents" : "none" }}>
              <div className="message-row other">
                <span className="avatar avatar-violet message-avatar">EY</span>
                <div>
                  <div className="message-bubble">
                    Merhaba Mert, Ekim ayı evraklarınızı aldım. Birkaçını
                    incelemeye başladım.<small>11:18</small>
                  </div>
                </div>
              </div>
              <div className="message-row other">
                <span className="avatar avatar-violet message-avatar">EY</span>
                <div>
                  <div className="message-bubble file-message">
                    <span className="attachment-icon">
                      <FileText size={17} />
                    </span>
                    <span>
                      <b>KDV_tahakkuk_Ekim.pdf</b>
                      <small>PDF · 284 KB</small>
                    </span>
                    <button aria-label="Dosyayı indir">
                      <ArrowRight size={15} />
                    </button>
                    <small className="message-time">11:23</small>
                  </div>
                </div>
              </div>
              <div className="message-row mine">
                <div className="message-bubble">
                  Merhaba Ece Hanım, teşekkürler. Bugün içinde eksik belge varsa
                  tamamlayabilirim.
                  <small>
                    12:06 <CheckCheck size={13} />
                  </small>
                </div>
              </div>
              <div className="message-row other">
                <span className="avatar avatar-violet message-avatar">EY</span>
                <div>
                  <div className="message-bubble">
                    Bir fişin fotoğrafı biraz bulanık geldi, yeniden
                    yükleyebilir misiniz? İsterseniz kısa bir görüşme
                    yapabiliriz.
                    <small>12:18</small>
                  </div>
                </div>
              </div>
              <div className="chat-typing">
                Örnek mesaj geçmişi · canlı bağlantı yok
              </div>
            </div>
            <div style={{ display: active === 0 ? "none" : "contents" }}>
              <div className="message-row other">
                <span className={`avatar avatar-${p.tone} message-avatar`}>
                  {p.initial}
                </span>
                <div className="message-bubble">
                  {p.last}
                  <small>{p.time} · demo</small>
                </div>
              </div>
              <div className="message-row mine">
                <div className="message-bubble">
                  Teşekkürler, not aldım. Demo mesajıdır.<small>12:06</small>
                </div>
              </div>
            </div>
            {sent[active]?.map((m, i) => (
              <div className="message-row mine" key={i}>
                <div className="message-bubble">
                  {m}
                  <small>
                    Şimdi <Check size={12} />
                  </small>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-compose">
            <button
              className="icon-btn"
              onClick={() => fileRef.current?.click()}
              title="Demo eki seç"
            >
              <Paperclip size={17} />
            </button>
            <input
              ref={fileRef}
              hidden
              type="file"
              onChange={event => {
                const file = event.currentTarget.files?.[0];
                if (file) sendMessage(`Demo eki: ${file.name}`);
                event.currentTarget.value = "";
              }}
            />
            <button className="icon-btn">
              <Smile size={17} />
            </button>
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && text.trim()) {
                  sendMessage(text);
                }
              }}
              placeholder="Mesajınızı yazın..."
            />
            <button
              className="icon-btn mic-compose"
              aria-label={
                recording ? "Demo ses notunu gönder" : "Demo ses kaydını başlat"
              }
              title="Gerçek ses kaydı alınmaz"
              onClick={() => {
                if (recording) {
                  sendMessage("Sesli mesaj (demo; gerçek kayıt yok)");
                  setRecording(false);
                } else {
                  setRecording(true);
                }
              }}
            >
              {recording ? <MicOff size={17} /> : <Mic size={17} />}
            </button>
            <button
              className="send-button"
              onClick={() => {
                if (text.trim()) {
                  sendMessage(text);
                }
              }}
            >
              <Send size={16} />
            </button>
          </div>
          <div className="prototype-caption">
            <ShieldCheck size={12} /> Demo sohbet arayüzü · Mesajlar kalıcı veya
            gerçek zamanlı iletilmez
          </div>
        </div>
      </section>
    </div>
  );
}

export function Meetings({ role }: { role: Role }) {
  const [month, setMonth] = useState(10);
  const [selected, setSelected] = useState(23);
  const [time, setTime] = useState("14:30");
  const [notice, setNotice] = useState("");
  const [, go] = useLocation();
  const months = [
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
  const available = ["10:00", "11:30", "14:30", "16:00"];
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> GÖRÜŞME VE RANDEVU
          </div>
          <h1>Toplantılar</h1>
          <p>
            {role === "client"
              ? "Mali müşavirinizin takviminden size uygun bir saat seçin."
              : "Görüşmelerinizi planlayın ve gününüzü düzenleyin."}
          </p>
        </div>
        <button className="button-primary" onClick={() => go("/meeting-room")}>
          <Video size={15} /> Görüşme demosu
        </button>
      </div>
      {notice && (
        <div className="toast-demo">
          <Check size={15} />
          {notice}
          <button onClick={() => setNotice("")}>Kapat</button>
        </div>
      )}
      <div className="meetings-layout">
        <section className="panel booking-panel">
          <div className="panel-heading">
            <div>
              <div className="panel-kicker">UYGUN ZAMAN SEÇİN</div>
              <h3>Randevu oluştur</h3>
            </div>
            <span className="calendar-head-icon">
              <CalendarDays size={19} />
            </span>
          </div>
          <div className="booking-advisor">
            <span className="avatar avatar-violet">EY</span>
            <span>
              <b>Ece Yılmaz</b>
              <small>Serbest Muhasebeci Mali Müşavir · Demo durumu</small>
            </span>
            <ChevronDown size={15} />
          </div>
          <div className="booking-calendar-head">
            <b>{months[month]} 2026</b>
            <span>
              <button onClick={() => setMonth(m => Math.max(1, m - 1))}>
                <ChevronLeft size={15} />
              </button>
              <button onClick={() => setMonth(m => Math.min(12, m + 1))}>
                <ChevronRight size={15} />
              </button>
            </span>
          </div>
          <div className="booking-weekdays">
            {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map(d => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="booking-days">
            {Array.from({ length: 35 }, (_, i) => {
              const d = i - 2,
                valid = d > 0 && d <= 31;
              return (
                <button
                  key={i}
                  disabled={!valid || d < 21}
                  onClick={() => setSelected(d)}
                  className={`${!valid ? "empty-day" : ""} ${d === 21 ? "today-day" : ""} ${d === selected ? "selected-day" : ""} ${[22, 23, 24, 26, 28, 29, 30].includes(d) ? "available-day" : ""}`}
                >
                  {valid ? d : ""}
                </button>
              );
            })}
          </div>
          <div className="available-times">
            <div className="panel-kicker">{selected} EKİM · UYGUN SAATLER</div>
            <div>
              {available.map(t => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={time === t ? "time-selected" : ""}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <button
            className="button-primary booking-submit"
            onClick={() =>
              setNotice(
                `${selected} Ekim 2026, ${time} için demo randevu isteğiniz hazır.`
              )
            }
          >
            Randevu talebi oluştur <ArrowRight size={15} />
          </button>
          <p className="booking-note">
            <ShieldCheck size={13} /> Bu randevu akışı demo amaçlıdır; gerçek
            takvime kaydedilmez.
          </p>
        </section>
        <section className="panel upcoming-panel">
          <div className="panel-heading">
            <div>
              <div className="panel-kicker">PROGRAMINIZ</div>
              <h3>Yaklaşan görüşmeler</h3>
            </div>
            <button className="select-pill">
              Bu hafta <ChevronDown size={13} />
            </button>
          </div>
          <div className="meeting-date-banner">
            <div className="date-icon">
              <CalendarDays size={17} />
            </div>
            <span>
              <b>Perşembe, 22 Ekim</b>
              <small>
                {role === "client" ? "1 örnek toplantı" : "2 örnek toplantı"}
              </small>
            </span>
          </div>
          {role === "accountant" && (
            <div className="upcoming-meeting">
              <div className="meeting-time">
                10:00<small>30 dk</small>
              </div>
              <div className="meeting-line">
                <i />
              </div>
              <div className="meeting-info">
                <div className="meeting-client">
                  <span className="avatar avatar-blue">KY</span>
                  <span>
                    <b>Kuzey Yazılım A.Ş.</b>
                    <small>Üçüncü çeyrek değerlendirmesi</small>
                  </span>
                </div>
                <button
                  className="meeting-join"
                  onClick={() => go("/meeting-room")}
                >
                  <Video size={14} /> Katıl
                </button>
              </div>
            </div>
          )}
          <div className="upcoming-meeting">
            <div className="meeting-time">
              14:30<small>45 dk</small>
            </div>
            <div className="meeting-line">
              <i />
            </div>
            <div className="meeting-info">
              <div className="meeting-client">
                <span className="avatar avatar-violet">MK</span>
                <span>
                  <b>Mavi Kıyı Tasarım</b>
                  <small>Aylık finansal durum görüşmesi</small>
                </span>
              </div>
              <button
                className="meeting-join"
                onClick={() => go("/meeting-room")}
              >
                <Video size={14} /> Katıl
              </button>
            </div>
          </div>
          {role === "accountant" && (
            <div className="meeting-date-banner second-date">
              <div className="date-icon">
                <CalendarDays size={17} />
              </div>
              <span>
                <b>Cuma, 23 Ekim</b>
                <small>1 örnek toplantı</small>
              </span>
            </div>
          )}
          {role === "accountant" && (
            <div className="upcoming-meeting">
              <div className="meeting-time">
                11:30<small>30 dk</small>
              </div>
              <div className="meeting-line">
                <i />
              </div>
              <div className="meeting-info">
                <div className="meeting-client">
                  <span className="avatar avatar-orange">LA</span>
                  <span>
                    <b>Limon Atölye</b>
                    <small>Vergi dönemi hazırlığı</small>
                  </span>
                </div>
                <button
                  className="meeting-join"
                  onClick={() => go("/meeting-room")}
                >
                  <Video size={14} /> Katıl
                </button>
              </div>
            </div>
          )}
          <div className="meeting-foot">
            <span>
              <i className="secure-dot" /> Görüşme özellikleri demo arayüzüdür
            </span>
            <button
              onClick={() =>
                setNotice(
                  "Takvim senkronizasyonu demo prototipinde gösteriliyor."
                )
              }
            >
              Takvime bağla <ArrowRight size={13} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export function MeetingRoom({ role }: { role: Role }) {
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const [share, setShare] = useState(false);
  const [joined, setJoined] = useState(false);
  const [, go] = useLocation();
  const [sec, setSec] = useState(0);
  const remote =
    role === "client"
      ? {
          name: "Ece Yılmaz",
          initials: "EY",
          organization: "Nora Mali Müşavirlik",
        }
      : {
          name: "Mert Kaya",
          initials: "MK",
          organization: "Mavi Kıyı Tasarım",
        };
  const selfInitials = role === "client" ? "MK" : "EY";
  const selfName = role === "client" ? "Mert Kaya" : "Ece Yılmaz";
  useEffect(() => {
    if (!joined) return;
    const timer = window.setInterval(() => setSec(value => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [joined]);
  return (
    <div className="meeting-room-page">
      <div className="meeting-room-top">
        <Link href="/meetings" className="room-back">
          <ArrowLeft size={16} /> Toplantılara dön
        </Link>
        <div className="room-title">
          <span className="room-demo-dot" /> Mavi Kıyı Tasarım · Görüşme demosu{" "}
          <span className="room-encryption">
            <ShieldCheck size={13} /> WebRTC bağlı değil
          </span>
        </div>
        <button className="icon-btn">
          <MoreVertical size={18} />
        </button>
      </div>
      <div className="meeting-stage">
        <div className="remote-video">
          <div className="remote-overlay">
            <span className="remote-name">{remote.name} · örnek katılımcı</span>
            <span className="remote-status">
              {joined ? "Demo görünüm açık" : "Canlı katılımcı yok"}
            </span>
          </div>
          <div className="remote-person">
            <div className="person-avatar">{remote.initials}</div>
            <b>{remote.name}</b>
            <small>{remote.organization}</small>
            <button
              className="button-secondary join-now"
              onClick={() => setJoined(true)}
            >
              {joined ? "Demo görünümü açık" : "Demo görünümünü başlat"}{" "}
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="remote-signal">
            <i />
            <span>Canlı medya bağlantısı yok</span>
          </div>
          <div className="self-video">
            <div className="self-placeholder">{selfInitials}</div>
            <span>{camera ? selfName : "Kamera kapalı"}</span>
          </div>
          {share && (
            <div className="share-overlay">
              <Share2 size={18} /> Ekran paylaşımı demo modu
            </div>
          )}
        </div>
        <div className="room-controls">
          <div className="room-call-info">
            <span className="room-demo-dot" />
            <b>
              {joined ? "Demo görüşme açık" : "Canlı görüşme bağlantısı yok"}
            </b>
            <span>
              {" "}
              · {String(Math.floor(sec / 60)).padStart(2, "0")}:
              {String(sec % 60).padStart(2, "0")}
            </span>
          </div>
          <div className="control-buttons">
            <button
              className={`control-btn ${!mic ? "control-off" : ""}`}
              onClick={() => setMic(!mic)}
            >
              <span>{mic ? <Mic size={18} /> : <MicOff size={18} />}</span>
              <small>{mic ? "Sustur" : "Sesi aç"}</small>
            </button>
            <button
              className={`control-btn ${!camera ? "control-off" : ""}`}
              onClick={() => setCamera(!camera)}
            >
              <span>
                {camera ? <Video size={18} /> : <VideoOff size={18} />}
              </span>
              <small>{camera ? "Kamerayı kapat" : "Kamerayı aç"}</small>
            </button>
            <button
              className={`control-btn ${share ? "control-sharing" : ""}`}
              onClick={() => setShare(!share)}
            >
              <span>
                <Share2 size={18} />
              </span>
              <small>{share ? "Paylaşımı durdur" : "Ekran paylaş"}</small>
            </button>
            <button className="control-btn control-more">
              <span>
                <MoreVertical size={18} />
              </span>
              <small>Diğer</small>
            </button>
            <button className="end-call" onClick={() => go("/meetings")}>
              <Phone size={19} fill="currentColor" />
            </button>
          </div>
          <div className="room-volume">
            <Volume2 size={17} />
            <div>
              <i />
            </div>
            <span>WebRTC demo modu</span>
          </div>
        </div>
      </div>
      <div className="room-side-info">
        <span>
          <ShieldCheck size={14} /> Bu görüşme prototip ekranıdır; canlı WebRTC
          bağlantısı kurulmamıştır.
        </span>
        <button onClick={() => go("/messages")}>
          Sohbete geç <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}

import {
  ArrowRight,
  Check,
  ShieldCheck,
  FileCheck2,
  MessageCircle,
  Play,
} from "lucide-react";
import type { Role } from "@/App";
export function Login({ onChoose }: { onChoose: (r: Role) => void }) {
  return (
    <main className="login-page">
      <section className="login-side">
        <div className="login-brand">
          <div className="brand-mark">
            <span>H</span>
            <i />
          </div>
          <span className="brand-name">
            hesapio<span>.</span>
          </span>
        </div>
        <div className="login-content">
          <div className="eyebrow">
            <span className="eyebrow-dot" /> MUHASEBEDE YENİ BİR DÖNEM
          </div>
          <h1>
            İşleriniz yolunda.
            <br />
            <em>İçiniz rahat.</em>
          </h1>
          <p>
            Muhasebe sürecinizin her adımı tek bir yerde. Evraklar, takvimler ve
            iletişim — sizin için düzenli.
          </p>
          <div className="login-points">
            <div>
              <span>
                <Check size={13} />
              </span>
              Evrak ve iş akışlarınızı tek yerden takip edin
            </div>
            <div>
              <span>
                <Check size={13} />
              </span>
              Müşavirinizle tek bir platformda iletişim
            </div>
            <div>
              <span>
                <Check size={13} />
              </span>
              Vergi takvimi ve yükümlülükleri birlikte görün
            </div>
          </div>
          <div className="login-proof">
            <div className="proof-avatars">
              <i>EY</i>
              <i>MK</i>
              <i>SA</i>
              <b>DEMO</b>
            </div>
            <span>Demo ortamı · örnek kullanıcılar</span>
          </div>
        </div>
        <div className="login-side-foot">
          <span>© 2026 Hesapio</span>
          <span>Dijital finans yönetimi prototipi</span>
        </div>
      </section>
      <section className="login-main">
        <div className="login-main-top">
          <span>HESAPIO'YA HOŞ GELDİNİZ</span>
          <span>
            TR <span className="tiny-chevron">⌄</span>
          </span>
        </div>
        <div className="login-card-wrap">
          <div className="login-card">
            <div className="login-card-icon">
              <ShieldCheck size={23} />
            </div>
            <div className="login-step">ÇALIŞMA ALANINIZI SEÇİN</div>
            <h2>
              Devam etmek için
              <br />
              hesabınızı seçin
            </h2>
            <p>Bu prototipte iki farklı portal deneyimini keşfedebilirsiniz.</p>
            <button
              className="role-card"
              onClick={() => onChoose("accountant")}
            >
              <span className="role-icon accountant">
                <FileCheck2 size={20} />
              </span>
              <span>
                <strong>Muhasebeci paneli</strong>
                <small>Müşterilerinizi ve ofis işlerinizi yönetin</small>
              </span>
              <ArrowRight size={18} />
            </button>
            <button className="role-card" onClick={() => onChoose("client")}>
              <span className="role-icon client">
                <MessageCircle size={20} />
              </span>
              <span>
                <strong>Müşteri paneli</strong>
                <small>Evraklarınızı yükleyin ve sürecinizi takip edin</small>
              </span>
              <ArrowRight size={18} />
            </button>
            <div className="login-demo-note">
              <Play size={13} fill="currentColor" />
              <span>
                <b>İnteraktif demo</b> · Seçiminizle ilgili panele
                yönlendirilirsiniz.
              </span>
            </div>
            <div className="login-terms">
              Bu seçim bir hesap oluşturmaz; yalnızca etkileşimli demo ekranını
              açar.
            </div>
          </div>
        </div>
        <div className="login-main-foot">
          <span>
            <i className="secure-dot" /> Demo arayüzü · gerçek oturum açma yok
          </span>
          <span>İnteraktif önizleme · gerçek destek bağlantısı yok</span>
        </div>
      </section>
    </main>
  );
}

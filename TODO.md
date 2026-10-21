# Hesapio — Teslimat Durumu

> Kapsam: Onaylanan A seçeneği kapsamında etkileşimli prototip. Demo verileri ve ekran içi etkileşimler gerçek canlı servis entegrasyonu değildir.

## Uygulama kabuğu, yönlendirme ve görünüm

- [x] Giriş ekranından başlayarak Muhasebeci Paneli ile Müşteri Panelinin ana sayfalarını, iletişim ve evrak yükleme ekranlarını routing (sayfa geçişi) ile birbirine bağla.
- [x] Rol seçimi Muhasebeci ve Müşteri görünümünü açıkça ayırsın; kullanıcının rolüne göre ilgili panele geçiş akışı görsel olarak anlaşılır olsun.
- [x] Tasarım modern, kurumsal, güven veren; koyu mavi, beyaz ve gri tonlarında ve Inter/Roboto benzeri temiz tipografide olsun.
- [ ] Tailwind CSS veya Material-UI ile %100 responsive olsun; müşteri paneli fiş fotoğrafı telefondan yükleneceği için mobile-first tasarlansın.
- [x] Kullanıcı dostu Dark Mode / Light Mode geçişi ekle.

## Muhasebeci ana paneli ve CRM

- [x] Dashboard’da toplam müşteri sayısı, tahsil edilecek ücretler, yaklaşan vergi ödeme tarihleri, okunmamış mesajlar, onay bekleyen evraklar ve bugünkü görüntülü toplantıların grafiksel özeti (Chart.js veya Recharts) yer alsın.
- [x] Fake data kullanarak dashboard grafiklerini ve tabloları dolu göster ki tasarımın nasıl durduğu tam olarak görülebilsin.
- [ ] CRM’de yeni müşteri ekleme, müşteri profillerini düzenleme, müşteriye özel notlar alma ve müşteri bazlı finansal geçmişi görüntüleme akışları bulunsun.
- [ ] Muhasebecinin kendi kestiği makbuzları ve müşterilerinden alacaklarını takip ettiği özel ön muhasebe modülü bulunsun.

## Evrak yönetimi ve yükleme merkezi

- [x] Muhasebeci, müşterilerin yüklediği fiş, fatura ve dekontları görüntüleyebilsin; onaylama ve reddetme durumları arayüzde etkileşimli olsun.
- [ ] OCR entegrasyonu için yüklenen fişten tutarı ve tarihi otomatik çekme mantığı altyapı tasarımında yer alsın.
- [ ] Güvenli dosya indirme/yükleme (AWS S3 veya lokal storage mantığı) hedefi dikkate alınsın; prototip etkileşimleri gerçek ve kalıcı güvenli depolama diye sunulmasın.
- [x] Müşteri, sürükle-bırak (Drag & Drop) yöntemiyle veya kameradan çekerek toplu fiş/fatura yükleyebilsin.
- [x] Yüklenen evrakların durumu (Bekliyor, Onaylandı, İşlendi) görülebilsin.

## Vergi ve finans akışları

- [x] KDV, Muhtasar, Kurumlar Vergisi vb. beyanname dönemlerini izleyen takvim modülü bulunsun.
- [ ] Vergi takvimi müşteriye otomatik SMS/E-posta bildirimleri atama hedefini desteklesin; prototipte gönderim gerçekleşmiş gibi iddiada bulunulmasın.
- [ ] Müşteri bazlı cari hesap ekstresi, mizan ve gelir-gider tablosu oluşturma ve PDF olarak dışa aktarma (Export to PDF) arayüzü bulunsun.
- [x] Müşteri panelinde aylık gelir/gider özeti, bu ay ödenecek vergiler (tutar ve son ödeme tarihi) ve muhasebeci duyuruları bulunsun.
- [ ] Müşteri panelinde muhasebeciye hizmet bedeli borçları ve devlete ödenecek vergi tahakkuk fişleri listelensin; tahakkuk fişini PDF olarak indirebilme akışı sunulsun.

## Ortak iletişim, randevu ve toplantı

- [ ] Uygulama içi WebRTC tabanlı peer-to-peer görüntülü görüşme hedefinde ekran paylaşımı, mikrofon/kamera aç-kapat kontrolleri bulunsun; harici Zoom/Meet gerektirmesin.
- [x] Görüntülü konuşma ekranı profesyonel tasarlansın: kendi kamera görüntüsü küçük, karşı taraf büyük; altta kırmızı kapatma butonu ve mikrofon susturma butonu bulunsun.
- [ ] Müşteri, muhasebecinin takvimindeki boş saatleri seçerek online toplantı randevusu alabilsin.
- [ ] Görüntülü konuşmaya ek olarak WhatsApp benzeri gerçek zamanlı sohbet penceresi; dosya ve ses kaydı gönderme etkileşimi bulunsun.
- [x] Yeni evrak yüklendiğinde, vergi günü yaklaştığında veya yeni mesaj geldiğinde her iki tarafa düşen zil bildirimleri arayüzde temsil edilsin.

## Tablolar, kod mimarisi ve canlı servis sınırı

- [x] Veri tablolarında sıralama (sorting), filtreleme, sayfalama (pagination) ve global arama (search) bulunsun.
- [x] Modüler komponent mimarisi kullan: /components, /pages, /hooks, /services, /api. Demo dosya işleme `client/src/services/demoFileService.ts` içindedir; API iskeleti starter `server/routers.ts` ve `client/src/lib/trpc.ts` konumundadır.
- [ ] İstenen gerçek sistemin RBAC/JWT tabanlı kimlik doğrulama ve 2FA, Socket.io mesaj/bildirimleri, WebRTC sinyalleşmesi, ilişkisel PostgreSQL/MySQL ve birbiriyle bağlı müşteri/fatura/belge/mesaj/toplantı/vergi takvimi tabloları gereksinimleri planda açık kalsın; onaylanan prototip kapsamı bu canlı üretim entegrasyonlarının tamamlandığını iddia etmesin.
- [x] İstenen ürün tasarımında güvenlik, dosya saklama, OCR ve SMS/e-posta entegrasyonları prototip davranışından ayrıştırılsın; yayınlanabilir üretim sistemi olduğu iddia edilmesin.

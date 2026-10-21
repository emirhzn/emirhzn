# Hesapio — Uygulama Planı

## Ürün hedefi ve kapsam kararı

Hesapio; mali müşavir ile mükellef arasındaki muhasebe işlerini tek bir arayüzde birleştiren, iki role göre ayrılmış, Türkçe ve mobil öncelikli bir SaaS ürünüdür. İlk teslimat; giriş/rol seçimi, muhasebeci ve müşteri panoları, CRM, belge akışı, vergi takvimi, finans özeti, sohbet ve görüntülü görüşme/randevu ekranlarını birbirine bağlayan, zengin örnek verilerle kullanılabilir ürün prototipidir.

Kullanıcı isteği hem inceleme için fake data hem de üretime hazır tam entegrasyon istiyor. Bunlar farklı doğruluk seviyeleri olduğundan, uygulama yaklaşımında demo görünümü ile gerçek entegrasyonları ayırmak gerekir: demo verileri ve etkileşimler canlı veritabanı verisi, gerçek kimlik doğrulama, gerçek SMS/e-posta gönderimi, OCR sonucu, nesne depolama yüklemesi, gerçek zamanlı sunucu mesajlaşması veya çalışan WebRTC görüşmesi gibi sunulmayacaktır. Bu servisler için gerekli kullanıcı/rol politikaları ve uygulama modülleri tasarlanabilir; her birini gerçekten bağlamak ve üretime çıkmak ayrı entegrasyon, güvenlik ve kabul çalışması gerektirir. Demo giriş ekranı yalnızca prototip rol/akış seçicisi olur ve gerçek auth yerine geçmez. Bu kapsam daraltması onaylanmazsa uygulama kodlamadan önce auth ve canlı servislerin kesin tercihleri netleştirilmelidir.

## Uygulama yaklaşımı

- Hazır WebDev web-db-user çatısı (React, TypeScript, Tailwind v4, Express, tRPC, Drizzle/MySQL) ve mevcut yönetilen sunucu/veritabanı kaynakları kullanılacak; proje tekrar başlatılmayacak.
- Prototip için rol seçimi uygulama gezintisini Muhasebeci/Müşteri portalına ayıracak; ortak masaüstü gezinme paneli, dar ekranda mobil menü ve kullanıcıya görünen sayfa başlıkları Türkçe olacak.
- Dashboard, Müşteriler, Evraklar, Vergi Takvimi, Finans, Mesajlar, Randevular ve Görüşme odası sayfaları Wouter ile yönlendirilecek; tablo arama/sıralama/sayfalama, durum filtreleri, tema geçişi ve kullanıcı eylemleri arayüzde çalışacak.
- Recharts ve tutarlı örnek veri setiyle mali müşavir görünümünde operasyon özeti; müşteri görünümünde sade gelir/gider, yaklaşan vergi, duyuru ve evrak yükleme alanı sunulacak. Belge seçimi/drag-drop etkileşimi prototip seviyesinde kalıcı iş akışı veya güvenli nesne depolama olarak gösterilmeyecek.
- Gerçek entegrasyonlar ayrıca gereksinim ve kabul aşamasında ele alınacak: OAuth/session ve rol yetkileri (tercihen mevcut Manus OAuth/JWT oturum standardı), veritabanı sahiplik kuralları ve migrations, saklama ve imzalı yükleme, gerçek SMS/e-posta sağlayıcısı, Socket.IO sinyalleşmesi, STUN/TURN/WebRTC ve TOTP 2FA için operasyonel kurulum.

## Tasarım yönü

Üç olası tasarım yönü (düşük öncül olasılıklar): İsviçre editoryal defteri (%7); kurumsal fintech çalışma alanı, yoğunlukta kontrollü veri hiyerarşisi (%6); sakin mimari ofis, geniş boşluk ve ince çizgisel ikonlar (%4). Kullanıcının tarif ettiği koyu mavi-beyaz-gri, temiz tipografi ve kurumsal güven yönüne en yakın olan **kurumsal fintech çalışma alanı** seçildi.

- **Tasarım hareketi:** Kurumsal fintech SaaS; Türk muhasebe operasyonuna göre sadeleştirilmiş, düzenli çalışma alanı.
- **Temel ilkeler:** Hızlı taranabilir finansal bilgi; durum ve eylemlerde açıklık; müşteri tarafında mobil sadelik; güven ve düşük görsel gürültü.
- **Renk felsefesi:** Lacivert bilgi mimarisine güven ve ağırlık katar, soğuk beyaz/açık gri tabloları ferah tutar, yeşil olumlu tamamlanmayı ve turuncu dikkat gerektiren işi işaretler. Renk hiçbir zaman tek başına durum anlamı taşımaz.
- **Yerleşim:** Solda kalıcı portal gezintisi ve bağımsız geniş içerik tuvali; kısa üst başlık alanı ve modüler paneller. Mobilde gezinme çekmecesi, tek sütun aksiyon önceliği.
- **İmza öğeleri:** Küçük lacivert hesap/terazi işareti; ince kenarlıklı beyaz çalışma yüzeyleri; durumları metin ve nokta/etiket ikilisiyle belirten rozetler.
- **Etkileşim:** Arama, durum filtreleri, tablo aksiyonları ve yükleme alanı görünür ve anlık geri bildirim verir; önemli durum değişiklikleri onay ve toast ile belirtilir.
- **Animasyon:** Kısa, düşük hareketli geçişler; panel/menü açılışında yumuşak geçiş, grafiklerde ilk görünüm animasyonu; sistem reduced-motion tercihi korunur.
- **Tipografi:** Inter; başlıklar net ve ölçülü, parasal değerler iri ve tabular rakamlı, tablo gövdesi kompakt.
- **Marka özü:** Muhasebeci ve mükellefi aynı düzenli iş akışında buluşturan, sade ve anlaşılır dijital ofis. Kişilik: güvenilir, net, çevik.
- **Marka sesi:** Başlıklar işe odaklı, CTA'lar fiil belirten kısa Türkçe ifadeler. Örnekler: “Bugün ofiste neler oluyor?”; “Evrakları incele”.
- **Logotip fikri:** Birbirine geçen iki çizgisel formdan oluşan stilize H: defter sayfası ve iki taraflı iş akışını çağrıştırır.
- **Marka rengi:** Gece laciverti; yardımcı palet soğuk beyaz, açık gri ve ölçülü teal/yeşil.

## Proje yapısı

- `client/src/App.tsx`: demo rol seçimi, tema durumu ve Wouter route guard/yönlendirmesi.
- `client/src/pages/`: portal panoları, müşteriler, evraklar, vergiler, finans, mesajlar ve toplantı sayfaları.
- `client/src/components/`: ortak uygulama kabuğu ve yeniden kullanılabilir tablo sayfalama bileşeni.
- `client/src/data/`: açıkça prototip/demo olduğu belirtilen örnek muhasebe verileri.
- `client/src/services/demoFileService.ts`: dosya baytlarını yüklemeden, seçilen yerel dosyaları açıkça demo olan satır kayıtlarına eşler.
- `client/src/hooks/` ve `client/src/lib/`: starter yardımcı hook’ları, biçimlendirme ve tRPC istemci altyapısı; demo feature API’lerine bağlı değildir.
- `server/routers.ts`, `client/src/lib/trpc.ts`, `server/db.ts`, `drizzle/schema.ts`: starter API istemcisi/sunucusu, veritabanı ve şema alanları; gerçek ürün verisi ve entegrasyon uçları bu prototipte tamamlanmış değildir.
- `client/public/manus-routes.json`: uygulamanın kök, login ve panel sayfalarının eşleşen rota manifesti.

## Kapsam kararı (kullanıcı tarafından onaylandı)

Kullanıcı 2026-10-21 tarihinde A seçeneğini onayladı: ilk iterasyon zengin fake data kullanan etkileşimli ürün prototipidir. Yukarıda sayılan canlı güvenlik/servis bağlantıları üretime hazır entegre sayılmaz. Gerçek sürümün ilerleyen kapsamı için auth/rol, OCR sağlayıcısı, SMS/e-posta sağlayıcısı, depolama ve WebRTC kabul kriterleri ayrıca netleştirilmelidir.

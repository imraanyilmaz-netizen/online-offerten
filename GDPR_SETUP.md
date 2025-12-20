# GDPR Cookie Consent Setup - Kurulum Rehberi

Bu doküman, Google Tag Manager ve Cookie Consent Banner için GDPR uyumluluğunun nasıl kurulacağını açıklar.

## ✅ Yapılan Değişiklikler

1. **Cookie Consent Banner Component** (`components/CookieConsent.tsx`)
   - Kullanıcıya cookie kullanımını bildiren banner
   - Cookie tercihlerini yönetme paneli
   - 3 kategori: Gerekli, Analytics, Marketing

2. **Google Tag Manager Helper** (`lib/gtm.ts`)
   - GTM'yi sadece kullanıcı izin verdiğinde yükler
   - Cookie tercihlerine göre consent durumunu yönetir
   - Consent güncellemelerini handle eder

3. **AppClient Entegrasyonu**
   - Cookie consent banner'ı sayfaya eklendi
   - GTM ve Google Analytics cookie consent'e göre yükleniyor

## 🔧 Yapılması Gerekenler

### 1. Environment Variables Ekleyin

`.env.local` dosyanıza Google Tag Manager ID'nizi ekleyin:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

**Not:** GTM ID'nizi Google Tag Manager dashboard'unuzdan alabilirsiniz:
- Google Tag Manager → Admin → Container → Container ID

### 2. Google Tag Manager'da Consent Mode Yapılandırın (Önerilen)

GTM'de Consent Mode'u etkinleştirin:

1. Google Tag Manager'a giriş yapın
2. **Tags** → Yeni tag oluşturun veya mevcut tag'leri düzenleyin
3. **Advanced Settings** → **Tag firing options** → **Once per page** seçin
4. **Triggering** → Consent gereksinimlerini ekleyin:
   - Analytics için: `analytics_storage = 'granted'`
   - Marketing için: `ad_storage = 'granted'`

### 3. Google Analytics'i GTM Üzerinden Yönetme (Önerilen)

Şu anda Google Analytics doğrudan `react-ga4` ile yükleniyor. Daha iyi yönetim için GTM üzerinden yönetebilirsiniz:

1. GTM'de **Google Analytics: GA4 Configuration** tag'i oluşturun
2. Measurement ID'nizi ekleyin (NEXT_PUBLIC_GA_ID)
3. Trigger olarak **Consent: Analytics Storage = granted** kullanın
4. `components/AppClient.tsx`'teki Google Analytics kodunu kaldırın (opsiyonel)

### 4. Test Etme

1. Geliştirme sunucusunu başlatın: `npm run dev`
2. Tarayıcıda localhost:3000'e gidin
3. Cookie consent banner'ın göründüğünü kontrol edin
4. "Alle akzeptieren" butonuna tıklayın
5. Browser Console'da GTM'nin yüklendiğini kontrol edin
6. DevTools → Application → Cookies → localStorage'da `cookie-consent-preferences` key'ini kontrol edin

### 5. Production'da Test

1. Değişiklikleri commit ve push edin
2. Production'a deploy edin
3. Production URL'de cookie consent banner'ı test edin
4. Google Tag Assistant veya GTM Preview Mode ile test edin

## 📋 Cookie Kategorileri

### 1. Notwendige Cookies (Gerekli)
- **Her zaman aktif** - devre dışı bırakılamaz
- Website'in temel fonksiyonları için gerekli
- Örnek: Session cookies, authentication cookies

### 2. Analyse-Cookies (Analytics)
- Kullanıcı izin verirse aktif
- Website kullanımını analiz etmek için
- Kullanılan servisler:
  - Google Analytics
  - Google Tag Manager

### 3. Marketing-Cookies
- Kullanıcı izin verirse aktif
- Reklam ve marketing amaçlı
- Kullanılan servisler:
  - Remarketing
  - Conversion Tracking

## 🔒 GDPR Uyumluluk Özellikleri

✅ **Kullanıcı onayı** - Cookie'ler kullanıcı izin verene kadar yüklenmez
✅ **Kategorilere göre kontrol** - Her kategori için ayrı izin
✅ **Tercihleri değiştirme** - Kullanıcı istediği zaman tercihlerini değiştirebilir
✅ **LocalStorage'da saklama** - Tercihler 1 yıl boyunca saklanır
✅ **Consent Mode** - Google servislerine consent durumu iletiliyor
✅ **Açık bilgilendirme** - Datenschutz sayfasına link

## 📝 Güncelleme Notları

Eğer cookie consent sistemini güncellemek isterseniz:

1. `components/CookieConsent.tsx` - UI ve kullanıcı etkileşimi
2. `lib/gtm.ts` - GTM yönetimi ve consent handling
3. `components/AppClient.tsx` - Entegrasyon noktası

## ❓ Sorun Giderme

### GTM yüklenmiyor
- `.env.local`'de `NEXT_PUBLIC_GTM_ID` doğru mu kontrol edin
- Browser console'da hata var mı kontrol edin
- Cookie consent preferences localStorage'da var mı kontrol edin

### Cookie banner görünmüyor
- Browser localStorage'ı temizleyin
- `cookie-consent-preferences` key'ini silin
- Sayfayı yenileyin

### Consent güncellenmiyor
- Browser console'da `cookie-consent-updated` event'inin tetiklendiğini kontrol edin
- GTM Preview Mode'da consent değerlerini kontrol edin

## 🔗 Yararlı Linkler

- [Google Tag Manager Documentation](https://developers.google.com/tag-manager)
- [GDPR Consent Mode](https://support.google.com/analytics/answer/9976101)
- [Cookie Consent Best Practices](https://gdpr.eu/cookies/)

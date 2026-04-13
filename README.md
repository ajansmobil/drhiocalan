# Proje — web talimat kontrol listesi

> **Ne bu dosya?** elo web `talimatlar/web/rust.js` çalıştığında proje veri köküne `README.md` olarak yazılır. Üç dosya aynı içeriktir: `README.md`, `.cursorrules`, `CLAUDE.md`.
> **LLM Talimat:** Bu dosyayı okuduğunda aşağıdaki kontrol listesini madde madde **gerçekten kontrol et**. Projedeki ilgili JSON dosyalarını aç, veriyi incele ve her maddeyi doğrula. Doğrulanan maddeyi `[ ]` → `[x]` olarak işaretle, sorunlu olanları `[ ]` bırakıp altına kısa açıklama yaz. Yeniden yazılmada aynı metinli maddelerin `[x]` işareti korunur.

| Alan | Değer |
|------|-------|
| Veri kökü | `D:\matrix\public\data\proje\drhiocalan\web` |
| Üretim | 2026-04-13T17:59:28.081Z |
| Talimat slug | `web` |
| Tam kural metni | elo web `talimatlar/web/rust.md` |
| Proje kontrol şablonu | `talimatlar/web/CLAUDE.md` ile aynı maddeler (bu dosya üreticide tanımlı) |

## Zorunlu JSON dosyaları

- [ ] `setting.json` mevcut ve geçerli JSON
- [ ] `desing.json` mevcut ve geçerli JSON
- [ ] `modules.json` mevcut ve geçerli JSON
- [ ] `pagesetting.json` mevcut ve geçerli JSON
- [ ] `page.json` mevcut ve geçerli JSON

## R1 — Ana sayfa listeye eklenmez

- [ ] Hiçbir kategori JSON `data[]` içinde `id`, `path` veya `name` değeri `"home"` / `"Ana Sayfa"` yok
- [ ] `page/home/` klasörü mevcut değil

## R2 — path: sadece slug, slash yok

- [ ] Tüm `path` alanlarında başında ve sonunda `/` yok

## R3 — page.json yapısı

- [ ] `page.json` üst seviyede `name`, `path`, `desc`, `data`, `index`, `desing`, `modulestatus` alanları mevcut
- [ ] `index` alanı sayı tipinde (string değil)

## R4 — pagesetting.json yapısı

- [ ] `pagesetting.json` üst seviyede yalnızca `{ "data": [...] }` var
- [ ] `name` tek string (`"name": "Sayfalar"` doğru; obje yanlış)

## R5 — setting.json domain ve çoklu dil

- [ ] `domain` alanında `http://`, `https://` ve sonda `/` yok
- [ ] `description` ve `keyword` alanları çoklu dil objesi (`{ "tr": "...", "en": "..." }`)

## R6 — desing.json renk anahtarları

- [ ] Renk anahtarları `lite` ve `dark` (`"light"` kullanılmamış)

## R7 — Modül ekleme kuralı

- [ ] `modules.json` içindeki her modül `path` değeri WebYapar katalogunda tanımlı
- [ ] `desing.json` ve `pagesetting` modül id'leri `modules.json` ile uyumlu

## R8 — Zorunlu modüller

- [ ] `desing.json` içinde `header` ve `headerdefault` dizilerinde menü modülü id'si var
- [ ] `desing.json` içinde `footer` ve `footerdefault` dizilerinde footer modülü id'si var

## R9 — Çoklu kategori dosyaları

- [ ] `pagesetting.json` her `path` için karşılık gelen `[path].json` dosyası mevcut

## R10 — Aktif dillere göre çeviri tamlığı

- [ ] `setting.langs` içinde `true` olan her kod için `setting.description` ve `setting.keyword` dolu (anahtar var, değer anlamlı; boş string yok)
- [ ] Kök `page.json` ve ilgili `[path].json` `data[]` öğelerinde: `name`, `description`, `keyword` ve tanımlıysa `title` — aktif dillere göre çok dilli nesne (`text` konumu **R11 / R14** ile belirlenir, liste satırında `text` olmayabilir)
- [ ] `pagesetting.json` içindeki her `path` ile eşleşen `[path].json` dosyasında `data[]` için aynı çok dilli tamlık; **DIL** rapor satırı hangi dosyayı gösteriyorsa o dosya bu kapsamdadır
- [ ] **Liste + detay** (`detail` açık) kategorilerde birleşik `text` tüm aktif dillerde dolu; kanonik kaynak **`page/{id}/index.json`** (R14 — listede `text` yok)
- [ ] `status === "play"` kayıtlarda eksik dil anahtarı kalmamalı

## R11 — modulestatus.detail === false ve text yokluğu

- [ ] `detail: false` olan kategorilerde `page/{id}/index.json` içinde `text` anahtarı yok

## R12 — Modül seçimi: önce katalogdan, son çare code

- [ ] Modül `path` değerleri gerçek WebYapar katalog modülü (code modülü yalnızca son çare)

## R13 — page.json modulestatus

- [ ] `page.json` üst seviye `modulestatus`: `detail: false`, `img: false`

## R14 — `text` yalnızca `page/{id}/index.json` (liste→detay açıkken)

- [ ] `detail` açık kategorilerde (`modulestatus.detail !== false`) liste `data[]` satırında **`text` anahtarı yok**; gövde metni yalnızca `page/{id}/index.json` içinde
- [ ] R11 istisnası: `detail === false` ise tam tersi — `page/{id}/index.json` içinde `text` yok, metin liste satırında olabilir

## R15 — Üst liste satırı: yalnızca beyaz liste anahtarları

- [ ] `[path].json` `data[]` satırında yalnızca: `name`, `id`, `index`, `path`, `category`, `img`, `bg`, `bgimg`, `status`, `url`, `icon`, `desing`, `pathnext`, `description`, `modulestatus` (+ R11 iken liste satırında `text`)
- [ ] `keyword`, `title`, `textmodul`, `slider`, `update`, `date` ve diğer ek anahtarlar **`page/{id}/index.json`** içinde (üst liste şişmesin)

## DIL bulguları — genel yorumlama ve düzeltme (rust.js çıktısı)

> Bu bölüm **belirli bir projeye özel değildir**; `talimatlar/web/rust.js` veya eşdeğer kontrolün ürettiği **DIL** satırlarını her veri kökünde aynı mantıkla okumak ve gidermek içindir.

### DIL satırı ne anlama gelir?

- **DIL**, kayıtta **zorunlu çok dilli alanın** (`name`, `description`, `keyword`, `title`, `text` vb.) `setting.json` → `langs` içinde **`true`** olan dil kodlarından en az biri için **eksik** olduğunu veya **boş string** olduğunu ifade eder.
- Çıktıda **(liste+detay)** ifadesi geçiyorsa denetleyici birleşik alanı kontrol eder; **`text` düzeltmesi** çoğunlukla **`page/{id}/index.json`** üzerinden yapılır (**R14**: `detail` açıkken listede `text` olmamalı).

### Rapor satırını ayrıştırma (şablon)

| Parça | Yorum |
|-------|-------|
| `dosya.json` | Veri köküne göre göreli yol; tam dosyayı aç |
| `data[i]` | Kök `data` dizinindeki indeks; `id:...` ile çakışma varsa `id` üzerinden doğrula |
| `.alan` | Örn. `.text` → ilgili nesnede `text` yoksa ekle; varsa eksik dil alt anahtarlarını tamamla |

### Aktif dil kümesi (tek doğruluk kaynağı)

- Düzeltmeden önce **`setting.json` → `langs`** okunur: yalnızca değeri **`true`** olan kodlar zorunludur (ör. `tr`, `en`, `de`, `ar`). `false` olanlar için anahtar açmak gerekmez.

### Önerilen düzeltme sırası

1. `read_file` ile `setting.json` ve raporda adı geçen JSON.
2. Eksik çok dilli nesneyi, aynı kayıttaki `name` / `description` ile **aynı dil kodları** üzerinden doldur; içerik o dilde tutarlı olsun (SEO bölümündeki TR/EN ayrımı ve kopya yasağı geçerlidir).
3. `patch_file` veya eşdeğer diff ile kaydet; JSON sözdizimi ve UTF-8 korunur.
4. Rapor açıkça bir **HTML** dosyası gösteriyorsa müdahale orada; aksi halde veri katmanı JSON’da kalır.

### R10 / R11 / R14 / R15 ile hizalama

- **R10** çok dilli tamlığı geniş kapsar (kök sayfa + `[path].json` kategori dosyaları).
- **R11** yalnızca `modulestatus.detail === false` durumunda `page/{id}/index.json` içinde **`text` olmamasını** ister; eksik `text` tamamlanacaksa liste `data[]` satırına bakılır.
- **R14** `detail` açıkken **`text` yalnızca** `page/{id}/index.json` içindedir; DIL `(liste+detay).text` gösteriyorsa önce bu dosyayı açın, listeden `text` kaldırın.
- **R15** `R15:` satırı izinsiz anahtar gösteriyorsa alanı `page/{id}/index.json` dosyasına taşıyın (beyaz liste dışı).

### Kanonik kuralın yeri

- Otomatik kurallar ve tam denetim mantığı **ELO web** `talimatlar/web/rust.md` + `rust.js` üzerindedir. Bu dosya **elle kontrol özeti**dir; denetleyici ile çelişki varsa ELO tarafındaki talimat güncellenmelidir. Bu DIL bölümü, raporu okuyan LLM veya geliştirici için **ortak sözlük ve iş akışı** sağlar.

## SEO ve içerik kalitesi

- [ ] TR description uzunluğu ~120–160 karakter aralığında
- [ ] TR/EN metinleri farklı (kopyala-yapıştır çeviri yok)
- [ ] Sayfalar arası Jaccard benzerliği %65 altında
- [ ] Yetim `page/*` klasörü yok (listedeki id ile eşleşmeyen)

## Elle notlar

_(İsteğe bağlı: kullanıcı veya LLM buraya serbest not ekleyebilir; yeniden üretimde bu blok şablonda sabitlenmez — dosyayı elle genişletiyorsanız yedek alın.)_

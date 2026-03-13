# Mod Merkezi - Modern Oyun Modu Paylaşım Platformu

Mod Merkezi, oyuncuların favori oyunları için modları keşfedebileceği, paylaşabileceği ve indirebileceği modern, hızlı ve mobil uyumlu bir web platformudur. Node.js ve Express.js kullanılarak geliştirilmiştir.

![Mod Merkezi Preview](https://via.placeholder.com/1200x600/0f172a/ffffff?text=Mod+Merkezi+Premium+UI)

## 🚀 Özellikler

- **Modern Tasarım**: Glassmorphism ve Dark Mode odaklı, tamamen responsive (mobil uyumlu) kullanıcı arayüzü.
- **Kullanıcı Sistemi**: Kayıt olma, giriş yapma, profil yönetimi (kullanıcı adı, şifre ve fotoğraf güncelleme).
- **Mod Paylaşımı**: Kullanıcıların dosya yükleme zahmetine girmeden dış bağlantılar (ShareMods, Mega, Mediafire vb.) üzerinden mod paylaşabilmesi.
- **Detaylı Mod Sayfaları**: Büyük görseller, detaylı açıklamalar, indirme ve görüntülenme sayaçları.
- **Etkileşim**: Modlara yorum yapma ve benzer mod önerileri.
- **Gelişmiş Arama**: Mod adına veya oyun adına göre anlık arama.
- **Admin Paneli**: Mod onaylama/silme, kategori yönetimi, kullanıcı denetimi ve site istatistikleri.
- **Güvenlik**: `bcrypt` ile şifreleme ve `express-session` ile güvenli oturum yönetimi.

## 🛠️ Teknolojiler

- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Frontend**: [EJS](https://ejs.co/), [Bootstrap 5](https://getbootstrap.com/), CSS3 (Custom Glassmorphism)
- **Veritabanı**: [MySQL](https://www.mysql.com/) / [MariaDB](https://mariadb.org/)
- **Dosya Yönetimi**: [Multer](https://github.com/expressjs/multer) (Profil ve mod görselleri için)
- **Güvenlik**: [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

## 📦 Kurulum

1. **Depoyu klonlayın:**
   ```bash
   git clone https://github.com/kullaniciadi/mod-merkezi.git
   cd mod-merkezi
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Veritabanını hazırlayın:**
   - MySQL sunucunuzda `mod_db` adında bir veritabanı oluşturun.
   - `db.sql` dosyasındaki sorguları çalıştırarak tabloları ve kategorileri oluşturun.

4. **Yapılandırma:**
   - `.env` dosyasını düzenleyerek veritabanı bilgilerinizi girin:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASS=sifreniz
     DB_NAME=mod_db
     PORT=3001
     SESSION_SECRET=gizli_anahtar
     ```

5. **Veritabanını kurun ve Admin oluşturun:**
   ```bash
   node setup-db.js
   node seed.js
   ```

6. **Sunucuyu başlatın:**
   ```bash
   npm start
   ```

## 🔐 Varsayılan Admin Bilgileri

- **E-posta**: `admin@modmerkezi.com`
- **Şifre**: `admin123`

## 📂 Proje Yapısı

```text
├── config/         # Multer ve diğer yapılandırmalar
├── controllers/    # İş mantığı (Business Logic)
├── middlewares/    # Auth ve diğer ara yazılımlar
├── models/         # Veritabanı modelleri
├── public/         # CSS, JS ve resimler
├── routes/         # Sayfa ve API rotaları
├── views/          # EJS şablonları
├── uploads/        # Yüklenen dosyalar
├── .env            # Ortam değişkenleri
├── server.js       # Ana giriş noktası
└── db.sql          # Veritabanı şeması
```

## 📜 Lisans

Bu proje [MIT](LICENSE) lisansı altında lisanslanmıştır.

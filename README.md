# React TypeScript Todo Uygulaması

Bu proje, kullanıcı girişli bir Todo uygulamasıdır. Modern web geliştirme teknolojileriyle oluşturulmuş, ölçeklenebilir ve kullanıcı dostu bir yapıya sahiptir.

## Kullanılan Teknolojiler

-   **React & TypeScript**: Bileşen tabanlı, tip güvenli modern web uygulaması.
-   **Material UI**: Şık ve modern kullanıcı arayüzü bileşenleri.
-   **Redux**: Uygulama genelinde session ve state yönetimi.
-   **Formik & Yup**: Form yönetimi ve doğrulama işlemleri.
-   **Firebase Authentication**: Kullanıcı kimlik doğrulama ve oturum yönetimi.
-   **Vite**: Hızlı geliştirme ve build aracı.

## Özellikler

-   Kullanıcı kayıt ve giriş sistemi (Firebase Authentication ile)
-   Kullanıcıya özel todo listesi
-   Formlarda Formik ile kolay yönetim, Yup ile güvenli doğrulama
-   Modern ve responsive arayüz (Material UI)
-   Global state yönetimi (Redux)
-   Hızlı build ve geliştirme ortamı (Vite)

## Kurulum

1. Bağımlılıkları yükleyin:
    ```
    npm install
    ```
2. Geliştirme sunucusunu başlatın:
    ```
    npm run dev
    ```
3. Üretim için build alın:
    ```
    npm run build
    ```

## Firebase Ayarları

`src/Firebase.ts` dosyasını kendi Firebase projenize göre düzenleyin. Bu dosya `.gitignore`'a eklenmiştir, paylaşmayınız.

## Yayınlama

-   Build edilen `dist` klasörünü Firebase Hosting veya başka bir statik sunucuya yükleyebilirsiniz.

---

Modern, güvenli ve kullanıcı dostu bir todo uygulaması geliştirmek için ideal bir başlangıç projesidir.

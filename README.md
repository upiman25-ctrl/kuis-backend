# Gacha API

## Deskripsi

Project ini adalah API sederhana untuk fitur gacha (random hadiah).
User bisa melakukan gacha untuk mendapatkan hadiah tertentu dengan jumlah terbatas (quota).

---

## Base URL

http://localhost:5000/api

---

## Endpoint

### 1. Gacha

**POST** `/gacha`

Digunakan untuk melakukan gacha.

Request:

```json
{
  "userId": "user1"
}
```

Response:

```json
{
  "message": "Menang!",
  "prize": "Pulsa Rp50.000"
}
```

Atau jika tidak mendapatkan hadiah:

```json
{
  "message": "Zonk",
  "prize": null
}
```

---

### 2. History Gacha

**GET** `/gacha/history/:userId`

Digunakan untuk melihat riwayat gacha dari user tertentu.

Contoh:

```
/gacha/history/user1
```

---

### 3. List Hadiah

**GET** `/gacha/prizes`

Menampilkan semua hadiah yang tersedia beserta sisa quota.

---

### 4. List Pemenang

**GET** `/gacha/winners`

Menampilkan daftar pemenang dari setiap hadiah.
Nama user akan disamarkan (contoh: user1 → u\*\*\*1).

---

## Aturan

- Setiap user hanya bisa gacha maksimal 5 kali per hari
- Setiap hadiah memiliki quota terbatas
- Jika quota habis, hadiah tidak bisa didapatkan lagi
- Ada kemungkinan user tidak mendapatkan hadiah (zonk)
- Nama pemenang ditampilkan dalam bentuk yang disamarkan

---

## Cara Menjalankan

1. Install dependencies:

```
npm install
```

2. Jalankan server:

```
npm run dev
```

3. Test API menggunakan EchoAPI

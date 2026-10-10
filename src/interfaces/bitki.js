/**
 * Bitki kaydının yapısı (interface).
 *
 * @typedef {Object} Bitki
 * @property {string} id          Benzersiz kimlik
 * @property {string} ad          Bitkinin adı, örn. "Salondaki paşa kılıcı"
 * @property {string} tur         Bitki türü, örn. "Paşa kılıcı"
 * @property {number} aralik      Kaç günde bir sulanacağı
 * @property {string} sonSulama   Son sulama tarihi (YYYY-AA-GG)
 * @property {string} not         İsteğe bağlı not
 */

/** Yeni bir bitki kaydı üretir. */
export function yeniBitki(veri) {
  return {
    id: crypto.randomUUID(),
    ad: veri.ad.trim(),
    tur: veri.tur.trim(),
    aralik: Number(veri.aralik),
    sonSulama: veri.sonSulama,
    not: veri.not.trim(),
  };
}

/** Formun başlangıç değerleri. */
export const BOS_FORM = {
  ad: "",
  tur: "",
  aralik: 7,
  sonSulama: bugun(),
  not: "",
};

/** Bugünün tarihini YYYY-AA-GG biçiminde verir. */
export function bugun() {
  const d = new Date();
  const ay = String(d.getMonth() + 1).padStart(2, "0");
  const gun = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${ay}-${gun}`;
}

/**
 * Bir sonraki sulamaya kaç gün kaldığını hesaplar.
 * Negatif değer gecikmiş demektir.
 */
export function kalanGun(bitki) {
  const birGun = 1000 * 60 * 60 * 24;
  const son = new Date(bitki.sonSulama + "T00:00:00");
  const sonraki = new Date(son.getTime() + bitki.aralik * birGun);
  const simdi = new Date(bugun() + "T00:00:00");
  return Math.round((sonraki - simdi) / birGun);
}

/** Kalan güne göre durum etiketi döndürür. */
export function durum(bitki) {
  const kalan = kalanGun(bitki);
  if (kalan < 0) return { etiket: `${Math.abs(kalan)} gün gecikti`, renk: "gecikmis" };
  if (kalan === 0) return { etiket: "Bugün sulanmalı", renk: "bugun" };
  if (kalan === 1) return { etiket: "Yarın sulanmalı", renk: "yakin" };
  return { etiket: `${kalan} gün sonra`, renk: "sakin" };
}

/** Tarihi okunur biçime çevirir: 2026-10-11 -> 11 Ekim 2026 */
export function tarihYaz(iso) {
  const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
                 "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const [yil, ay, gun] = iso.split("-");
  return `${Number(gun)} ${AYLAR[Number(ay) - 1]} ${yil}`;
}

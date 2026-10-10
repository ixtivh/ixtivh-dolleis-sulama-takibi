import { useEffect, useState } from "react";
import { BOS_FORM } from "../interfaces/bitki";

/**
 * Hem EKLEME hem GÜNCELLEME için kullanılır.
 * `duzenlenen` dolu geldiğinde form güncelleme kipine geçer.
 */
export default function BitkiFormu({ duzenlenen, onKaydet, onVazgec }) {
  const [form, setForm] = useState(BOS_FORM);
  const [hata, setHata] = useState("");

  // Düzenlenecek bitki değişince formu onun verisiyle doldur.
  useEffect(() => {
    setForm(duzenlenen ? { ...duzenlenen } : BOS_FORM);
    setHata("");
  }, [duzenlenen]);

  const guncelle = (alan) => (e) =>
    setForm((onceki) => ({ ...onceki, [alan]: e.target.value }));

  function gonder(e) {
    e.preventDefault();
    if (!form.ad.trim()) return setHata("Bitkine bir isim ver.");
    if (Number(form.aralik) < 1) return setHata("Sulama aralığı en az 1 gün olmalı.");
    onKaydet(form);
    setForm(BOS_FORM);
    setHata("");
  }

  const kutu =
    "w-full rounded-lg border border-yaprak/20 bg-white px-3 py-2 text-sm " +
    "outline-none focus:border-yaprak focus:ring-2 focus:ring-yaprak/20";
  const etiket = "mb-1 block text-xs font-medium text-koyu/70";

  return (
    <form
      onSubmit={gonder}
      className="rounded-xl border border-yaprak/15 bg-white p-5"
    >
      <h2 className="font-baslik text-lg text-yaprak">
        {duzenlenen ? "Bitkiyi düzenle" : "Yeni bitki ekle"}
      </h2>
      <p className="mt-1 mb-4 text-sm text-koyu/60">
        {duzenlenen
          ? "Bilgileri değiştirip kaydet."
          : "Sulama aralığını bilmiyorsan 7 gün iyi bir başlangıç."}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={etiket} htmlFor="ad">Bitkinin adı</label>
          <input
            id="ad" className={kutu} value={form.ad} onChange={guncelle("ad")}
            placeholder="Salondaki paşa kılıcı"
          />
        </div>

        <div>
          <label className={etiket} htmlFor="tur">Türü</label>
          <input
            id="tur" className={kutu} value={form.tur} onChange={guncelle("tur")}
            placeholder="Paşa kılıcı"
          />
        </div>

        <div>
          <label className={etiket} htmlFor="aralik">Kaç günde bir sulanır</label>
          <input
            id="aralik" type="number" min="1" max="120"
            className={kutu} value={form.aralik} onChange={guncelle("aralik")}
          />
        </div>

        <div>
          <label className={etiket} htmlFor="sonSulama">Son sulama tarihi</label>
          <input
            id="sonSulama" type="date"
            className={kutu} value={form.sonSulama} onChange={guncelle("sonSulama")}
          />
        </div>

        <div>
          <label className={etiket} htmlFor="not">Not (isteğe bağlı)</label>
          <input
            id="not" className={kutu} value={form.not} onChange={guncelle("not")}
            placeholder="Pencere kenarında"
          />
        </div>
      </div>

      {hata && (
        <p className="mt-3 rounded-lg bg-terrakota/10 px-3 py-2 text-sm text-terrakota">
          {hata}
        </p>
      )}

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-yaprak px-4 py-2 text-sm font-medium text-white transition hover:bg-yaprak/90"
        >
          {duzenlenen ? "Değişiklikleri kaydet" : "Ekle"}
        </button>
        {duzenlenen && (
          <button
            type="button" onClick={onVazgec}
            className="rounded-lg border border-yaprak/25 px-4 py-2 text-sm text-koyu/70 transition hover:bg-yaprak-acik"
          >
            Vazgeç
          </button>
        )}
      </div>
    </form>
  );
}

import { useState } from "react";
import { durum, tarihYaz } from "../interfaces/bitki";

const RENKLER = {
  gecikmis: "border-terrakota/50 bg-terrakota/10 text-terrakota",
  bugun: "border-terrakota/50 bg-terrakota/10 text-terrakota",
  yakin: "border-yaprak/30 bg-yaprak-acik text-yaprak",
  sakin: "border-yaprak/20 bg-white text-koyu/60",
};

export default function BitkiKarti({ bitki, onSuladim, onDuzenle, onSil }) {
  const { etiket, renk } = durum(bitki);
  const [silinecek, setSilinecek] = useState(false);

  return (
    <li className="rounded-xl border border-yaprak/15 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-baslik text-lg text-koyu">{bitki.ad}</h3>
          <p className="text-sm text-koyu/55">
            {bitki.tur || "Tür belirtilmedi"} · {bitki.aralik} günde bir
          </p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${RENKLER[renk]}`}>
          {etiket}
        </span>
      </div>

      <p className="mt-2 text-sm text-koyu/55">
        Son sulama: {tarihYaz(bitki.sonSulama)}
      </p>
      {bitki.not && <p className="mt-1 text-sm italic text-koyu/45">{bitki.not}</p>}

      {silinecek ? (
        <div className="mt-4 rounded-lg border border-terrakota/30 bg-terrakota/5 p-3">
          <p className="text-sm text-koyu/75">
            <strong>{bitki.ad}</strong> kaydı silinecek. Emin misin?
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => onSil(bitki.id)}
              className="rounded-lg bg-terrakota px-3 py-1.5 text-sm text-white transition hover:bg-terrakota/90"
            >
              Evet, sil
            </button>
            <button
              onClick={() => setSilinecek(false)}
              className="rounded-lg border border-yaprak/25 px-3 py-1.5 text-sm text-koyu/70 transition hover:bg-yaprak-acik"
            >
              Vazgeç
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => onSuladim(bitki.id)}
            className="rounded-lg bg-yaprak px-3 py-1.5 text-sm text-white transition hover:bg-yaprak/90"
          >
            Bugün suladım
          </button>
          <button
            onClick={() => onDuzenle(bitki)}
            className="rounded-lg border border-yaprak/25 px-3 py-1.5 text-sm text-koyu/70 transition hover:bg-yaprak-acik"
          >
            Düzenle
          </button>
          <button
            onClick={() => setSilinecek(true)}
            className="rounded-lg border border-terrakota/30 px-3 py-1.5 text-sm text-terrakota transition hover:bg-terrakota/10"
          >
            Sil
          </button>
        </div>
      )}
    </li>
  );
}

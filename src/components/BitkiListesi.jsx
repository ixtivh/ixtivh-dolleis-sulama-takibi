import { kalanGun } from "../interfaces/bitki";
import BitkiKarti from "./BitkiKarti";

export default function BitkiListesi({ bitkiler, onSuladim, onDuzenle, onSil }) {
  if (bitkiler.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-yaprak/30 bg-white/50 px-5 py-10 text-center">
        <p className="font-baslik text-lg text-yaprak">Henüz bitki eklemedin</p>
        <p className="mt-1 text-sm text-koyu/55">
          Yukarıdaki formdan ilk bitkini ekle; ne zaman sulaman gerektiğini burada göreceksin.
        </p>
      </div>
    );
  }

  // Suyu en acil olan en üstte.
  const sirali = [...bitkiler].sort((a, b) => kalanGun(a) - kalanGun(b));

  return (
    <ul className="grid gap-3">
      {sirali.map((bitki) => (
        <BitkiKarti
          key={bitki.id}
          bitki={bitki}
          onSuladim={onSuladim}
          onDuzenle={onDuzenle}
          onSil={onSil}
        />
      ))}
    </ul>
  );
}

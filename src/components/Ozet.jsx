import { kalanGun } from "../interfaces/bitki";

export default function Ozet({ bitkiler }) {
  const toplam = bitkiler.length;
  const sulanacak = bitkiler.filter((b) => kalanGun(b) <= 0).length;

  const kutular = [
    { sayi: toplam, yazi: toplam === 1 ? "bitki kayıtlı" : "bitki kayıtlı" },
    { sayi: sulanacak, yazi: "bugün su istiyor", vurgu: sulanacak > 0 },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {kutular.map((k) => (
        <div
          key={k.yazi}
          className={`rounded-xl border px-4 py-3 ${
            k.vurgu
              ? "border-terrakota/40 bg-terrakota/10"
              : "border-yaprak/15 bg-white"
          }`}
        >
          <p className={`font-baslik text-2xl ${k.vurgu ? "text-terrakota" : "text-yaprak"}`}>
            {k.sayi}
          </p>
          <p className="text-sm text-koyu/60">{k.yazi}</p>
        </div>
      ))}
    </div>
  );
}

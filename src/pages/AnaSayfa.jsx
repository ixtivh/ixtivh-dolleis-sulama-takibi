import { useEffect, useState } from "react";
import Baslik from "../components/Baslik";
import Ozet from "../components/Ozet";
import BitkiFormu from "../components/BitkiFormu";
import BitkiListesi from "../components/BitkiListesi";
import { bugun, yeniBitki } from "../interfaces/bitki";

const ANAHTAR = "dolleis-bitkiler";

export default function AnaSayfa() {
  // --- LocalStorage'dan oku (ilk açılışta bir kez) ---
  const [bitkiler, setBitkiler] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(ANAHTAR)) ?? [];
    } catch {
      return [];
    }
  });
  const [duzenlenen, setDuzenlenen] = useState(null);

  // --- Her değişiklikte LocalStorage'a yaz ---
  useEffect(() => {
    try {
      localStorage.setItem(ANAHTAR, JSON.stringify(bitkiler));
    } catch {
      // Tarayıcı depolamayı engelliyorsa uygulama yine de çalışsın.
    }
  }, [bitkiler]);

  // --- EKLE ve GÜNCELLE ---
  function kaydet(form) {
    if (duzenlenen) {
      setBitkiler((liste) =>
        liste.map((b) =>
          b.id === duzenlenen.id
            ? { ...b, ...form, aralik: Number(form.aralik) }
            : b
        )
      );
      setDuzenlenen(null);
    } else {
      setBitkiler((liste) => [...liste, yeniBitki(form)]);
    }
  }

  // --- GÜNCELLE (kısayol: son sulama tarihini bugüne çek) ---
  function suladim(id) {
    setBitkiler((liste) =>
      liste.map((b) => (b.id === id ? { ...b, sonSulama: bugun() } : b))
    );
  }

  // --- SİL ---
  function sil(id) {
    setBitkiler((liste) => liste.filter((b) => b.id !== id));
    if (duzenlenen?.id === id) setDuzenlenen(null);
  }

  return (
    <div className="min-h-screen">
      <Baslik />

      <main className="mx-auto grid max-w-3xl gap-5 px-5 py-8">
        <section>
          <h2 className="font-baslik text-xl text-koyu">
            Bitkilerin ne zaman su istiyor?
          </h2>
          <p className="mt-1 mb-4 text-sm text-koyu/60">
            Fazla sulama, ev bitkilerini en sık öldüren sebeplerden biri.
            Buraya yazdıkça tahmin etmek zorunda kalmazsın.
          </p>
          <Ozet bitkiler={bitkiler} />
        </section>

        <BitkiFormu
          duzenlenen={duzenlenen}
          onKaydet={kaydet}
          onVazgec={() => setDuzenlenen(null)}
        />

        <BitkiListesi
          bitkiler={bitkiler}
          onSuladim={suladim}
          onDuzenle={setDuzenlenen}
          onSil={sil}
        />
      </main>

      <footer className="mx-auto max-w-3xl px-5 pb-10 text-center text-xs text-koyu/45">
        Dolleis kurgusal bir markadır · Olgu Fidan · Veriler yalnızca bu tarayıcıda saklanır
      </footer>
    </div>
  );
}

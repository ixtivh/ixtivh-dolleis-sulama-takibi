export default function Baslik() {
  return (
    <header className="border-b border-yaprak/15 bg-white/60">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-6">
        <div className="flex size-10 items-center justify-center rounded-full bg-yaprak text-lg text-white">
          🌿
        </div>
        <div>
          <h1 className="font-baslik text-2xl leading-none text-yaprak">Dolleis</h1>
          <p className="mt-1 text-sm text-koyu/60">Sulama Takibi</p>
        </div>
      </div>
    </header>
  );
}

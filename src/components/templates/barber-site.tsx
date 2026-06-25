import {
  Scissors,
  Phone,
  MapPin,
  Clock,
  Aperture,
  Share2,
  Star,
  Menu,
  ArrowRight,
  Check,
} from "lucide-react";

export function BarberSite() {
  const services = [
    { name: "Saç kəsimi", desc: "Klassik və modern saç kəsimi, fade, taper", price: "20" },
    { name: "Saqqal düzəltmə", desc: "Forma verilməsi, kontur və yağ qulluğu", price: "15" },
    { name: "Üz qırxma", desc: "İsti dəsmal və ülgüc ilə klassik qırxma", price: "12" },
    { name: "Saç + Saqqal", desc: "Tam dəyişim — kombo paket", price: "30" },
    { name: "Uşaq saç kəsimi", desc: "12 yaşa qədər, sakit mühit", price: "15" },
    { name: "Saç boyama", desc: "Kül, qara və ya təbii tonlar", price: "35" },
  ];

  const barbers = [
    { name: "Elvin Məmmədov", role: "Baş usta", exp: "12 il təcrübə", initials: "EM" },
    { name: "Rəşad Quliyev", role: "Saqqal ustası", exp: "8 il təcrübə", initials: "RQ" },
    { name: "Tural Hüseynov", role: "Stilist", exp: "6 il təcrübə", initials: "TH" },
  ];

  const gallery = [
    "from-amber-500/30 to-neutral-900",
    "from-neutral-700 to-neutral-950",
    "from-amber-600/40 to-neutral-900",
    "from-neutral-800 to-black",
    "from-amber-400/20 to-neutral-900",
    "from-neutral-700 to-neutral-950",
  ];

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100 antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-amber-500 text-neutral-950">
              <Scissors className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="text-xl font-black uppercase tracking-widest">
              Usta<span className="text-amber-500">.</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-wider text-neutral-300 md:flex">
            <a href="#xidmetler" className="transition hover:text-amber-500">Xidmətlər</a>
            <a href="#ustalar" className="transition hover:text-amber-500">Ustalar</a>
            <a href="#qalereya" className="transition hover:text-amber-500">Qalereya</a>
            <a href="#novbe" className="transition hover:text-amber-500">Əlaqə</a>
          </nav>
          <a
            href="#novbe"
            className="hidden items-center gap-2 rounded-md bg-amber-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-neutral-950 transition hover:bg-amber-400 md:flex"
          >
            Onlayn növbə
          </a>
          <button type="button" className="text-neutral-200 md:hidden" aria-label="Menyu">
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-neutral-800">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-amber-700/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Star className="h-3.5 w-3.5 fill-amber-400" /> Bakının ən yaxşı barbershop'u
            </span>
            <h1 className="mt-6 text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl">
              Usta
              <br />
              <span className="text-amber-500">Barber</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-400">
              Ənənəvi ülgüc, müasir stil. Peşəkar ustalar əlində kişi obrazına dəyər
              veririk. Onlayn növbə tut — gözləmə yoxdur.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#novbe"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-neutral-950 transition hover:bg-amber-400"
              >
                Onlayn növbə <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#xidmetler"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-700 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-neutral-200 transition hover:border-amber-500 hover:text-amber-500"
              >
                Qiymətlərə bax
              </a>
            </div>
            <div className="mt-12 flex gap-10">
              <div>
                <p className="text-3xl font-black text-amber-500">12+</p>
                <p className="text-xs uppercase tracking-wider text-neutral-500">İl təcrübə</p>
              </div>
              <div>
                <p className="text-3xl font-black text-amber-500">8K+</p>
                <p className="text-xs uppercase tracking-wider text-neutral-500">Məmnun müştəri</p>
              </div>
              <div>
                <p className="text-3xl font-black text-amber-500">4.9</p>
                <p className="text-xs uppercase tracking-wider text-neutral-500">Reytinq</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.18),transparent_55%)]" />
              <div className="absolute left-6 top-6 flex h-16 w-16 items-center justify-center rounded-xl bg-amber-500 text-neutral-950">
                <Scissors className="h-8 w-8" strokeWidth={2.5} />
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500">Est. 2013</p>
                <p className="mt-2 text-4xl font-black uppercase leading-none tracking-tight">
                  Kişi<br />stili
                </p>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-4 hidden rounded-xl border border-neutral-800 bg-neutral-900 px-5 py-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-sm font-bold">Hər gün açıq</p>
                  <p className="text-xs text-neutral-500">10:00 — 22:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* XIDMƏTLƏR */}
      <section id="xidmetler" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500">Xidmətlər</p>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-5xl">
            Xidmətlər və qiymət
          </h2>
          <p className="mt-4 text-neutral-400">
            Bütün xidmətlər təcrübəli ustalar tərəfindən, premium məhsullarla həyata keçirilir.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.name}
              className="group flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-900/50 p-7 transition hover:border-amber-500/60 hover:bg-neutral-900"
            >
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold">{s.name}</h3>
                  <span className="rounded-md bg-amber-500/10 px-3 py-1 text-lg font-black text-amber-500">
                    {s.price} ₼
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">{s.desc}</p>
              </div>
              <a
                href="#novbe"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-500 transition group-hover:text-amber-500"
              >
                Növbə tut <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* USTALAR */}
      <section id="ustalar" className="border-y border-neutral-800 bg-neutral-900/40">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="mb-14 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500">Komanda</p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Ustalarımız
            </h2>
            <p className="mt-4 text-neutral-400">
              Hər bir usta öz sahəsinin peşəkarıdır — sənə yaraşan obrazı birlikdə tapaq.
            </p>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {barbers.map((b) => (
              <div
                key={b.name}
                className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950"
              >
                <div className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-neutral-800 to-black">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,158,11,0.15),transparent_60%)]" />
                  <span className="text-6xl font-black uppercase tracking-tight text-amber-500/90">
                    {b.initials}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{b.name}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-amber-500">
                    {b.role}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-neutral-400">
                    <Check className="h-4 w-4 text-amber-500" /> {b.exp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QALEREYA */}
      <section id="qalereya" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500">Qalereya</p>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-5xl">
            İşlərimiz
          </h2>
          <p className="mt-4 text-neutral-400">
            Salonumuzun atmosferi və ustalarımızın əl işlərindən bəzi anlar.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((g, i) => (
            <div
              key={i}
              className={`group relative aspect-square overflow-hidden rounded-xl border border-neutral-800 bg-gradient-to-br ${g}`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-30 transition group-hover:opacity-60">
                <Scissors className="h-10 w-10 text-amber-500" />
              </div>
              <span className="absolute bottom-3 left-3 text-xs font-bold uppercase tracking-widest text-neutral-300">
                Usta №{i + 1}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ONLAYN NÖVBƏ FORM */}
      <section id="novbe" className="border-y border-neutral-800 bg-neutral-900/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500">Onlayn növbə</p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Növbəni indi tut
            </h2>
            <p className="mt-4 max-w-md text-neutral-400">
              Formu doldur, ustanı və vaxtı seç. Təsdiq üçün səninlə əlaqə saxlayacağıq.
            </p>
            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-neutral-500">Telefon</p>
                  <p className="font-bold">+994 50 555 12 34</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-neutral-500">Ünvan</p>
                  <p className="font-bold">Nizami küç. 22, Bakı</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-neutral-500">İş saatları</p>
                  <p className="font-bold">Hər gün 10:00 — 22:00</p>
                </div>
              </div>
            </div>
          </div>

          <form className="rounded-2xl border border-neutral-800 bg-neutral-950 p-7 sm:p-9">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-neutral-400">
                  Ad
                </label>
                <input
                  type="text"
                  placeholder="Adınız və soyadınız"
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-neutral-100 placeholder-neutral-600 outline-none transition focus:border-amber-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-neutral-400">
                  Telefon
                </label>
                <input
                  type="tel"
                  placeholder="+994 __ ___ __ __"
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-neutral-100 placeholder-neutral-600 outline-none transition focus:border-amber-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-neutral-400">
                  Usta
                </label>
                <select className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-neutral-100 outline-none transition focus:border-amber-500">
                  <option>Elvin Məmmədov — Baş usta</option>
                  <option>Rəşad Quliyev — Saqqal ustası</option>
                  <option>Tural Hüseynov — Stilist</option>
                  <option>Fərqi yoxdur</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-neutral-400">
                  Vaxt
                </label>
                <input
                  type="datetime-local"
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-neutral-100 outline-none transition focus:border-amber-500"
                />
              </div>
              <button
                type="button"
                className="w-full rounded-lg bg-amber-500 px-6 py-4 text-sm font-bold uppercase tracking-widest text-neutral-950 transition hover:bg-amber-400"
              >
                Növbəni təsdiqlə
              </button>
              <p className="text-center text-xs text-neutral-600">
                Formu göndərməklə əlaqə şərtləri ilə razılaşırsınız.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-amber-500 text-neutral-950">
                <Scissors className="h-5 w-5" strokeWidth={2.5} />
              </span>
              <span className="text-xl font-black uppercase tracking-widest">
                Usta<span className="text-amber-500">.</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
              Bakıda kişi gözəlliyi və üslubunun ünvanı. Ənənə və müasirliyin qovuşduğu yer.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Aperture"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 text-neutral-400 transition hover:border-amber-500 hover:text-amber-500"
              >
                <Aperture className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Share2"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 text-neutral-400 transition hover:border-amber-500 hover:text-amber-500"
              >
                <Share2 className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-neutral-300">İş saatları</p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-500">
              <li className="flex justify-between gap-4">
                <span>B.e — Cümə</span>
                <span className="text-neutral-300">10:00 — 22:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Şənbə</span>
                <span className="text-neutral-300">10:00 — 23:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Bazar</span>
                <span className="text-neutral-300">11:00 — 21:00</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-neutral-300">Əlaqə</p>
            <ul className="mt-4 space-y-3 text-sm text-neutral-500">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-500" /> Nizami küç. 22, Bakı
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-500" /> +994 50 555 12 34
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-neutral-600 sm:flex-row sm:px-8">
            <p>© 2026 Usta Barbershop. Bütün hüquqlar qorunur.</p>
            <p>Bakı, Azərbaycan</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import {
  Car,
  ShieldCheck,
  Clock,
  Truck,
  MapPin,
  Phone,
  Mail,
  CalendarDays,
  Gauge,
  Users,
  Settings2,
  Fuel,
  Check,
  Star,
  ArrowRight,
  Menu,
} from "lucide-react";

const navLinks = [
  { label: "Avtomobillər", href: "#park" },
  { label: "Üstünlüklər", href: "#ustunlukler" },
  { label: "Şərtlər", href: "#sertler" },
  { label: "Əlaqə", href: "#rezervasiya" },
];

const cars = [
  {
    name: "Toyota Camry",
    cls: "Biznes",
    price: 75,
    seats: 5,
    gear: "Avtomat",
    fuel: "Benzin",
    accent: "from-blue-600 to-blue-800",
  },
  {
    name: "Hyundai Tucson",
    cls: "SUV / Krossover",
    price: 90,
    seats: 5,
    gear: "Avtomat",
    fuel: "Benzin",
    accent: "from-slate-600 to-slate-800",
  },
  {
    name: "Mercedes E-Class",
    cls: "Premium",
    price: 160,
    seats: 5,
    gear: "Avtomat",
    fuel: "Dizel",
    accent: "from-indigo-700 to-slate-900",
  },
  {
    name: "Kia Rio",
    cls: "Ekonom",
    price: 45,
    seats: 5,
    gear: "Mexaniki",
    fuel: "Benzin",
    accent: "from-sky-600 to-blue-700",
  },
  {
    name: "Toyota Land Cruiser",
    cls: "Premium SUV",
    price: 220,
    seats: 7,
    gear: "Avtomat",
    fuel: "Dizel",
    accent: "from-blue-800 to-slate-900",
  },
  {
    name: "Hyundai Elantra",
    cls: "Komfort",
    price: 60,
    seats: 5,
    gear: "Avtomat",
    fuel: "Benzin",
    accent: "from-cyan-700 to-blue-800",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Tam sığorta (KASKO)",
    text: "Bütün avtomobillər tam sığorta ilə təqdim olunur. Yolda özünüzü tam arxayın hiss edin.",
  },
  {
    icon: Clock,
    title: "24/7 dəstək",
    text: "Gecə-gündüz əlçatan dəstək komandası. İstənilən vaxt zəng edin, kömək edək.",
  },
  {
    icon: Truck,
    title: "Pulsuz çatdırılma",
    text: "Avtomobili Bakının istənilən nöqtəsinə və ya hava limanına pulsuz çatdırırıq.",
  },
  {
    icon: Gauge,
    title: "Limitsiz kilometr",
    text: "Gündəlik məsafə limiti yoxdur. Azərbaycanı sərbəst, narahatlıq olmadan gəzin.",
  },
];

const terms = [
  "Minimum yaş — 21, sürücülük vəsiqəsi 2 ildən artıq",
  "Şəxsiyyət vəsiqəsi və sürücülük vəsiqəsi tələb olunur",
  "Depozit nağd və ya kartla qəbul edilir, qaytarılır",
  "Avtomobil tam dolu yanacaqla təhvil verilir",
];

export function RentacarSite() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1220]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-900/40">
              <Car className="h-5 w-5 text-white" strokeWidth={2.4} />
            </span>
            <span className="text-lg font-bold tracking-tight text-white">
              Sahil <span className="text-blue-400">Rent-a-Car</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-slate-300 transition hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+994125550112"
              className="hidden items-center gap-2 text-sm font-semibold text-slate-200 sm:flex"
            >
              <Phone className="h-4 w-4 text-blue-400" />
              +994 12 555 01 12
            </a>
            <a
              href="#rezervasiya"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500"
            >
              Rezervasiya
            </a>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-slate-200 md:hidden"
              aria-label="Menyu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0b1220] text-white">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 md:pb-28 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-blue-200">
              <Star className="h-3.5 w-3.5 fill-blue-400 text-blue-400" />
              Bakıda 10 ildən artıq etibarlı icarə xidməti
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
              Yolunuza layiq avtomobil,
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {" "}
                bir kliklə icarədə
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-slate-300 md:text-lg">
              Ekonomdan premiuma — geniş avtomobil parkı, tam sığorta və pulsuz
              çatdırılma. Bakıda və bütün Azərbaycanda etibarlı sürüş.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.06] p-2 shadow-2xl shadow-black/40 backdrop-blur">
            <form className="grid grid-cols-1 gap-2 md:grid-cols-[1.4fr_1fr_1fr_auto]">
              <label className="flex flex-col gap-1 rounded-xl bg-white/5 px-4 py-3 text-left transition focus-within:bg-white/10">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-blue-400" /> Götürmə yeri
                </span>
                <input
                  type="text"
                  placeholder="Bakı, Heydər Əliyev hava limanı"
                  className="w-full bg-transparent text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-1 rounded-xl bg-white/5 px-4 py-3 text-left transition focus-within:bg-white/10">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <CalendarDays className="h-3.5 w-3.5 text-blue-400" /> Götürmə tarixi
                </span>
                <input
                  type="date"
                  className="w-full bg-transparent text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none [color-scheme:dark]"
                />
              </label>

              <label className="flex flex-col gap-1 rounded-xl bg-white/5 px-4 py-3 text-left transition focus-within:bg-white/10">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <CalendarDays className="h-3.5 w-3.5 text-blue-400" /> Qaytarma tarixi
                </span>
                <input
                  type="date"
                  className="w-full bg-transparent text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none [color-scheme:dark]"
                />
              </label>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/50 transition hover:bg-blue-500"
              >
                Axtar
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* STATS */}
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { n: "120+", l: "Avtomobil" },
              { n: "10 il", l: "Təcrübə" },
              { n: "24/7", l: "Dəstək" },
              { n: "4.9★", l: "Reytinq" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-2xl font-extrabold text-white md:text-3xl">
                  {s.n}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAR PARK */}
      <section id="park" className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Avtomobil parkı
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Hər ehtiyaca uyğun seçim
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Təmiz, texniki baxımdan saz və tam sığortalı avtomobillər. Qiymətə
            sığorta və yol yardımı daxildir.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <div
              key={car.name}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
            >
              <div
                className={`relative flex h-44 items-end bg-gradient-to-br ${car.accent} p-5`}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 80% 20%, #fff 0%, transparent 50%)",
                  }}
                />
                <Car
                  className="absolute right-4 top-4 h-12 w-12 text-white/30"
                  strokeWidth={1.5}
                />
                <div className="relative">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {car.cls}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900">{car.name}</h3>

                <div className="mt-4 grid grid-cols-3 gap-2 border-y border-slate-100 py-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-xs font-medium text-slate-600">
                      {car.seats} nəfər
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Settings2 className="h-4 w-4 text-blue-600" />
                    <span className="text-xs font-medium text-slate-600">
                      {car.gear}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Fuel className="h-4 w-4 text-blue-600" />
                    <span className="text-xs font-medium text-slate-600">
                      {car.fuel}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900">
                      {car.price} ₼
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      {" "}
                      / gün
                    </span>
                  </div>
                  <a
                    href="#rezervasiya"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
                  >
                    İcarə et
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section id="ustunlukler" className="bg-[#0b1220] py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-14 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Niyə Sahil?
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Sürüşünüzü rahat və təhlükəsiz edirik
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-blue-500/40 hover:bg-white/[0.07]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-900/40">
                  <b.icon className="h-6 w-6 text-white" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TERMS + RESERVATION */}
      <section id="sertler" className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Terms */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              İcarə şərtləri
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Sadə və şəffaf şərtlər
            </h2>
            <p className="mt-4 text-slate-600">
              Gizli ödəniş yoxdur. Avtomobili götürmək üçün lazım olan hər şey
              aydındır.
            </p>

            <ul className="mt-8 space-y-4">
              {terms.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <Check className="h-3.5 w-3.5 text-blue-700" strokeWidth={3} />
                  </span>
                  <span className="text-slate-700">{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                  <Phone className="h-5 w-5 text-white" />
                </span>
                <div>
                  <p className="text-sm text-slate-500">Sual var? Zəng edin</p>
                  <a
                    href="tel:+994125550112"
                    className="text-lg font-bold text-slate-900"
                  >
                    +994 12 555 01 12
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation form */}
          <div
            id="rezervasiya"
            className="rounded-3xl bg-[#0b1220] p-7 text-white shadow-2xl shadow-slate-300 md:p-9"
          >
            <h3 className="text-2xl font-extrabold tracking-tight">
              Rezervasiya et
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Formu doldurun — 15 dəqiqə ərzində sizinlə əlaqə saxlayaq.
            </p>

            <form className="mt-7 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    Ad, Soyad
                  </label>
                  <input
                    type="text"
                    placeholder="Elvin Məmmədov"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    placeholder="+994 50 123 45 67"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  Avtomobil sinfi
                </label>
                <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 [color-scheme:dark]">
                  <option>Ekonom — 45 ₼/gün</option>
                  <option>Komfort — 60 ₼/gün</option>
                  <option>Biznes — 75 ₼/gün</option>
                  <option>SUV / Krossover — 90 ₼/gün</option>
                  <option>Premium — 160 ₼-dən</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    Götürmə tarixi
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    Qaytarma tarixi
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 [color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  Götürmə yeri
                </label>
                <input
                  type="text"
                  placeholder="Bakı, Heydər Əliyev hava limanı"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition hover:bg-blue-500"
              >
                Rezervasiyanı təsdiqlə
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-center text-xs text-slate-500">
                Formu göndərməklə istifadə şərtləri ilə razılaşırsınız.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#0b1220] text-slate-300">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <a href="#" className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700">
                  <Car className="h-5 w-5 text-white" strokeWidth={2.4} />
                </span>
                <span className="text-lg font-bold text-white">
                  Sahil <span className="text-blue-400">Rent-a-Car</span>
                </span>
              </a>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Bakıda etibarlı avtomobil icarəsi. Tam sığorta, pulsuz
                çatdırılma və 24/7 dəstək.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white">Naviqasiya</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-slate-400 transition hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white">Siniflər</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
                <li>Ekonom</li>
                <li>Biznes</li>
                <li>SUV / Krossover</li>
                <li>Premium</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white">Əlaqə</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                  <span className="text-slate-400">
                    Bakı şəhəri, Nizami küç. 203, Nəsimi rayonu
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 flex-shrink-0 text-blue-400" />
                  <a
                    href="tel:+994125550112"
                    className="text-slate-400 transition hover:text-white"
                  >
                    +994 12 555 01 12
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 flex-shrink-0 text-blue-400" />
                  <a
                    href="mailto:info@sahilrentacar.az"
                    className="text-slate-400 transition hover:text-white"
                  >
                    info@sahilrentacar.az
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
            <p>© 2026 Sahil Rent-a-Car. Bütün hüquqlar qorunur.</p>
            <div className="flex gap-6">
              <a href="#" className="transition hover:text-white">
                Məxfilik siyasəti
              </a>
              <a href="#" className="transition hover:text-white">
                İstifadə şərtləri
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
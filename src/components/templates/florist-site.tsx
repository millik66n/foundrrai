import {
  Flower2,
  Truck,
  Clock,
  Heart,
  Gift,
  Cake,
  Sparkles,
  Phone,
  MapPin,
  Mail,
  Camera,
  Globe,
  Send,
  ShieldCheck,
  Star,
} from "lucide-react";

export function FloristSite() {
  const navLinks = [
    { label: "Ana səhifə", href: "#" },
    { label: "Buketlər", href: "#buketler" },
    { label: "Münasibətlər", href: "#munasibetler" },
    { label: "Çatdırılma", href: "#catdirilma" },
    { label: "Əlaqə", href: "#sifaris" },
  ];

  const bouquets = [
    {
      name: "Çəhrayı Sevda",
      desc: "Frenç qızılgülləri və evkalipt",
      price: "65 ₼",
      from: "from-pink-200 to-rose-300",
      accent: "bg-rose-400",
    },
    {
      name: "Ağ Zəriflik",
      desc: "Ağ pioniya və qızılgül kompozisiyası",
      price: "85 ₼",
      from: "from-rose-50 to-pink-100",
      accent: "bg-pink-300",
    },
    {
      name: "Yay Çələngi",
      desc: "Mövsümi çöl çiçəkləri buketi",
      price: "55 ₼",
      from: "from-amber-100 to-rose-200",
      accent: "bg-amber-400",
    },
    {
      name: "Lalə Nəfəsi",
      desc: "21 təzə Hollandiya laləsi",
      price: "70 ₼",
      from: "from-pink-100 to-fuchsia-200",
      accent: "bg-fuchsia-400",
    },
    {
      name: "Qırmızı Etiraf",
      desc: "51 qırmızı qızılgül, romantik dizayn",
      price: "120 ₼",
      from: "from-rose-300 to-red-300",
      accent: "bg-red-400",
    },
    {
      name: "Lavanda Xəyalı",
      desc: "Lavanda, hortenziya və ipək lent",
      price: "75 ₼",
      from: "from-violet-100 to-pink-200",
      accent: "bg-violet-400",
    },
  ];

  const occasions = [
    {
      icon: Heart,
      title: "Toy",
      text: "Gəlin buketləri, masa kompozisiyaları və zal bəzəkləri ən incə zövqlə.",
    },
    {
      icon: Cake,
      title: "Ad günü",
      text: "Rəngarəng və sevincli buketlər — sevdiyiniz insanı sürpriz edin.",
    },
    {
      icon: Gift,
      title: "Yubiley",
      text: "Zərif və yaddaqalan kompozisiyalar xüsusi tarixlər üçün hazırlanır.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fdf6f3] font-sans text-[#4a2c33] antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-rose-100 bg-[#fdf6f3]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-400 text-white shadow-sm shadow-rose-200">
              <Flower2 className="h-5 w-5" />
            </span>
            <span className="font-serif text-2xl font-semibold tracking-tight text-rose-700">
              Gül Evi
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-[#7a5560] transition-colors hover:text-rose-600"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#sifaris"
            className="rounded-full bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-rose-200 transition-colors hover:bg-rose-600"
          >
            Sifariş et
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-rose-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-40 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600">
              <Sparkles className="h-3.5 w-3.5" /> Bakının çiçək evi
            </span>
            <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-[#5b2a35] md:text-6xl">
              Təzə güllər,
              <br />
              <span className="text-rose-500">eyni gün</span> çatdırılma
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#7a5560]">
              Hər səhər təzə gətirilən güllərdən əl ilə toplanan buketlər. Bakı
              boyu 3 saat ərzində qapınıza çatdırırıq.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#sifaris"
                className="rounded-full bg-rose-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-rose-200 transition-transform hover:-translate-y-0.5 hover:bg-rose-600"
              >
                Sifariş et
              </a>
              <a
                href="#buketler"
                className="rounded-full border border-rose-300 bg-white px-7 py-3.5 text-base font-semibold text-rose-600 transition-colors hover:bg-rose-50"
              >
                Buketlərə bax
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-[#7a5560]">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="font-semibold text-[#5b2a35]">4.9</span>
                <span>(820+ rəy)</span>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-rose-200 via-pink-100 to-amber-100 shadow-xl shadow-rose-200/60 ring-1 ring-white/60">
              <div className="absolute left-8 top-10 h-28 w-28 rounded-full bg-rose-300/70 blur-md" />
              <div className="absolute bottom-16 right-8 h-36 w-36 rounded-full bg-fuchsia-200/70 blur-md" />
              <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Flower2 className="h-32 w-32 text-rose-500/80" strokeWidth={1} />
              </div>
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/85 p-4 backdrop-blur-sm">
                <p className="font-serif text-lg font-semibold text-[#5b2a35]">
                  Buket “Çəhrayı Sevda”
                </p>
                <p className="text-sm text-[#7a5560]">Bu gün çatdırılır · 65 ₼</p>
              </div>
            </div>
            <div className="absolute -right-2 -top-4 hidden rotate-6 rounded-2xl bg-white p-3 shadow-lg shadow-rose-100 md:block">
              <Truck className="h-6 w-6 text-rose-500" />
              <p className="mt-1 text-xs font-semibold text-[#5b2a35]">
                3 saata
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-rose-100 bg-white/60">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:grid-cols-3">
          {[
            { icon: Clock, t: "Eyni gün çatdırılma", s: "Saat 16:00-a kimi sifariş" },
            { icon: Flower2, t: "Hər gün təzə", s: "Səhər bazarından gətirilir" },
            { icon: ShieldCheck, t: "Təravət zəmanəti", s: "5 gün təravət sözü" },
          ].map((f) => (
            <div key={f.t} className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                <f.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-[#5b2a35]">{f.t}</p>
                <p className="text-sm text-[#7a5560]">{f.s}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOUQUETS */}
      <section id="buketler" className="mx-auto max-w-6xl px-5 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-rose-500">
            Kolleksiya
          </span>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-[#5b2a35] md:text-5xl">
            Populyar buketlər
          </h2>
          <p className="mt-4 text-lg text-[#7a5560]">
            Florist­lərimizin ən çox sevilən kompozisiyaları — hamısı bu gün
            çatdırıla bilər.
          </p>
        </div>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {bouquets.map((b) => (
            <article
              key={b.name}
              className="group overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-100"
            >
              <div
                className={`relative aspect-[5/4] bg-gradient-to-br ${b.from}`}
              >
                <span
                  className={`absolute left-4 top-4 h-10 w-10 rounded-full ${b.accent} opacity-80 blur-[2px]`}
                />
                <span className="absolute bottom-6 right-6 h-16 w-16 rounded-full bg-white/40 blur-md" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Flower2
                    className="h-20 w-20 text-white/80 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    strokeWidth={1.25}
                  />
                </div>
              </div>
              <div className="flex items-start justify-between gap-3 p-5">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#5b2a35]">
                    {b.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#7a5560]">{b.desc}</p>
                </div>
                <span className="shrink-0 rounded-full bg-rose-50 px-3 py-1 text-sm font-bold text-rose-600">
                  {b.price}
                </span>
              </div>
              <div className="px-5 pb-5">
                <a
                  href="#sifaris"
                  className="block w-full rounded-full border border-rose-200 bg-rose-50/50 py-2.5 text-center text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-500 hover:text-white"
                >
                  Səbətə əlavə et
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* OCCASIONS */}
      <section
        id="munasibetler"
        className="bg-gradient-to-b from-white to-rose-50/60 py-20"
      >
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-rose-500">
              Hər an üçün
            </span>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-[#5b2a35] md:text-5xl">
              Münasibətlər
            </h2>
            <p className="mt-4 text-lg text-[#7a5560]">
              Həyatın ən gözəl anlarını güllərlə bəzəyirik.
            </p>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {occasions.map((o) => (
              <div
                key={o.title}
                className="rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-lg hover:shadow-rose-100"
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-100 to-pink-200 text-rose-600">
                  <o.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-serif text-2xl font-semibold text-[#5b2a35]">
                  {o.title}
                </h3>
                <p className="mt-3 text-[#7a5560]">{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY INFO */}
      <section id="catdirilma" className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-rose-400 to-pink-500 p-10 text-white shadow-xl shadow-rose-200">
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/15 blur-xl" />
            <Truck className="h-12 w-12" strokeWidth={1.25} />
            <h3 className="mt-5 font-serif text-3xl font-semibold">
              Eyni gün çatdırılma
            </h3>
            <p className="mt-3 max-w-sm text-rose-50">
              Bakı boyu sürətli və qayğılı çatdırılma. Buketləriniz xüsusi
              soyuq qutularda, təravəti qorunaraq gəlir.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">3 saat</p>
                <p className="text-sm text-rose-50">orta çatdırılma vaxtı</p>
              </div>
              <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">5 ₼-dən</p>
                <p className="text-sm text-rose-50">çatdırılma haqqı</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-4xl font-semibold text-[#5b2a35]">
              Çatdırılma məlumatı
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                {
                  t: "İş saatları",
                  s: "Hər gün 09:00 – 21:00, bayram günləri də daxil.",
                },
                {
                  t: "Çatdırılma zonası",
                  s: "Bütün Bakı və Abşeron. Sumqayıta ertəsi gün çatdırılır.",
                },
                {
                  t: "Sifariş vaxtı",
                  s: "Saat 16:00-a kimi verilən sifarişlər eyni gün çatdırılır.",
                },
                {
                  t: "Pulsuz çatdırılma",
                  s: "100 ₼-dən yuxarı sifarişlərə çatdırılma pulsuzdur.",
                },
              ].map((item) => (
                <li key={item.t} className="flex gap-4">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-[#5b2a35]">{item.t}</p>
                    <p className="text-[#7a5560]">{item.s}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section
        id="sifaris"
        className="bg-gradient-to-b from-rose-50/60 to-[#fdf6f3] py-20"
      >
        <div className="mx-auto max-w-3xl px-5">
          <div className="mx-auto max-w-xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-rose-500">
              Sifariş
            </span>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-[#5b2a35] md:text-5xl">
              Buketinizi sifariş edin
            </h2>
            <p className="mt-4 text-lg text-[#7a5560]">
              Formanı doldurun, florist­lərimiz sizinlə 15 dəqiqə ərzində
              əlaqə saxlasın.
            </p>
          </div>

          <form className="mt-12 rounded-3xl border border-rose-100 bg-white p-7 shadow-lg shadow-rose-100/60 sm:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#5b2a35]">
                  Adınız
                </label>
                <input
                  type="text"
                  placeholder="Ayan Məmmədova"
                  className="w-full rounded-xl border border-rose-200 bg-rose-50/40 px-4 py-3 text-[#4a2c33] outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-200"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#5b2a35]">
                  Telefon
                </label>
                <input
                  type="tel"
                  placeholder="+994 50 123 45 67"
                  className="w-full rounded-xl border border-rose-200 bg-rose-50/40 px-4 py-3 text-[#4a2c33] outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-200"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#5b2a35]">
                  Buket
                </label>
                <select className="w-full rounded-xl border border-rose-200 bg-rose-50/40 px-4 py-3 text-[#4a2c33] outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-200">
                  <option>Çəhrayı Sevda — 65 ₼</option>
                  <option>Ağ Zəriflik — 85 ₼</option>
                  <option>Qırmızı Etiraf — 120 ₼</option>
                  <option>Lalə Nəfəsi — 70 ₼</option>
                  <option>Fərdi kompozisiya</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#5b2a35]">
                  Çatdırılma tarixi
                </label>
                <input
                  type="date"
                  className="w-full rounded-xl border border-rose-200 bg-rose-50/40 px-4 py-3 text-[#4a2c33] outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-200"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#5b2a35]">
                  Çatdırılma ünvanı
                </label>
                <input
                  type="text"
                  placeholder="Bakı, Nəsimi rayonu, Nizami küç. 24"
                  className="w-full rounded-xl border border-rose-200 bg-rose-50/40 px-4 py-3 text-[#4a2c33] outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-200"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#5b2a35]">
                  Kartdakı arzu (istəyə bağlı)
                </label>
                <textarea
                  rows={3}
                  placeholder="Sevgilim, doğum günün mübarək..."
                  className="w-full resize-none rounded-xl border border-rose-200 bg-rose-50/40 px-4 py-3 text-[#4a2c33] outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-200"
                />
              </div>
            </div>

            <button
              type="button"
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-rose-500 py-4 text-base font-semibold text-white shadow-lg shadow-rose-200 transition-colors hover:bg-rose-600"
            >
              <Send className="h-4 w-4" />
              Sifarişi göndər
            </button>
            <p className="mt-4 text-center text-sm text-[#7a5560]">
              Və ya bizə zəng edin:{" "}
              <a href="#" className="font-semibold text-rose-600">
                +994 12 555 08 90
              </a>
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-rose-100 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-400 text-white">
                <Flower2 className="h-4 w-4" />
              </span>
              <span className="font-serif text-xl font-semibold text-rose-700">
                Gül Evi
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#7a5560]">
              Bakının ən təzə çiçək evi. 2016-cı ildən sevgini güllərlə
              çatdırırıq.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Aperture"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition-colors hover:bg-rose-500 hover:text-white"
              >
                <Camera className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Veb sayt"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition-colors hover:bg-rose-500 hover:text-white"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#5b2a35]">Naviqasiya</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[#7a5560]">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="transition-colors hover:text-rose-600">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#5b2a35]">Münasibətlər</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[#7a5560]">
              <li>Toy buketləri</li>
              <li>Ad günü çiçəkləri</li>
              <li>Yubiley kompozisiyaları</li>
              <li>Korporativ sifarişlər</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#5b2a35]">Əlaqə</h4>
            <ul className="mt-4 space-y-3 text-sm text-[#7a5560]">
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-rose-500" />
                Bakı, Fəvvarələr meydanı 12
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-rose-500" />
                +994 12 555 08 90
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-rose-500" />
                salam@gulevi.az
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-rose-100 py-6">
          <p className="text-center text-sm text-[#9a7780]">
            © 2026 Gül Evi. Bütün hüquqlar qorunur.
          </p>
        </div>
      </footer>
    </div>
  );
}
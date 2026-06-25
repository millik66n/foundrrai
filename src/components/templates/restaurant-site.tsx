import {
  Phone,
  MapPin,
  Clock,
  Star,
  ChefHat,
  Utensils,
  Flame,
  Cake,
  Soup,
  Aperture,
  Share2,
  Send,
} from "lucide-react";

export function RestaurantSite() {
  const navLinks = [
    { label: "Menyu", href: "#menyu" },
    { label: "Qalereya", href: "#qalereya" },
    { label: "Rezervasiya", href: "#rezervasiya" },
    { label: "Əlaqə", href: "#elaqe" },
  ];

  const menuCategories = [
    {
      title: "Başlanğıclar",
      icon: Soup,
      items: [
        { name: "Düşbərə", desc: "Ənənəvi xırda xəngəl, nanə və sarımsaqlı qatıqla", price: "9 ₼" },
        { name: "Kükü", desc: "Təzə göyərti, yumurta və zəfəranla", price: "11 ₼" },
        { name: "Badımcan dolması", desc: "Üç bacı — bibər, badımcan, pomidor", price: "14 ₼" },
        { name: "Qutab dəsti", desc: "Ət, göyərti və balqabaqlı qarışıq", price: "12 ₼" },
      ],
    },
    {
      title: "Plovlar",
      icon: Utensils,
      items: [
        { name: "Şah plov", desc: "Quzu əti, qaysı, şabalıd və qazmaq ilə", price: "28 ₼" },
        { name: "Toyuq plov", desc: "Zəfəranlı düyü, qızardılmış toyuq budu", price: "22 ₼" },
        { name: "Sebzi plov", desc: "Göyərtili plov, dana ətli turşusu ilə", price: "24 ₼" },
        { name: "Süd plov", desc: "Şirin düyü, darçın və quru meyvələrlə", price: "16 ₼" },
      ],
    },
    {
      title: "Kabablar",
      icon: Flame,
      items: [
        { name: "Quzu tikə kababı", desc: "Maydanoz, soğan və lavaşla, manqalda", price: "26 ₼" },
        { name: "Lülə kabab", desc: "Dana və quzu qiyməsi, ədviyyatla", price: "23 ₼" },
        { name: "Toyuq kababı", desc: "Marinad edilmiş döş əti, narşərabla", price: "19 ₼" },
        { name: "Balıq kababı (nərə)", desc: "Xəzər nərəsi, limon və göyərtiylə", price: "34 ₼" },
      ],
    },
    {
      title: "Şirniyyat",
      icon: Cake,
      items: [
        { name: "Şəkərbura", desc: "Fındıq, qoz və hil ilə, ev üsulu", price: "8 ₼" },
        { name: "Paxlava", desc: "Bakı paxlavası, bal və zəfəran şərbəti", price: "9 ₼" },
        { name: "Firni", desc: "Düyü unu, gülab və darçınla", price: "7 ₼" },
        { name: "Şəkər çörəyi", desc: "Təzə bişmiş, çay ilə servis edilir", price: "6 ₼" },
      ],
    },
  ];

  const gallery = [
    { from: "from-amber-700", to: "to-amber-500", label: "Manqal sənəti" },
    { from: "from-stone-800", to: "to-stone-600", label: "İç bağça" },
    { from: "from-orange-800", to: "to-amber-600", label: "Şah plov" },
    { from: "from-yellow-800", to: "to-amber-500", label: "Çay süfrəsi" },
    { from: "from-rose-900", to: "to-amber-700", label: "Şərab zalı" },
    { from: "from-stone-700", to: "to-yellow-600", label: "Gecə terası" },
  ];

  const hours = [
    { day: "Bazar ertəsi – Cümə", time: "12:00 – 00:00" },
    { day: "Şənbə", time: "12:00 – 01:00" },
    { day: "Bazar", time: "11:00 – 00:00" },
  ];

  return (
    <div className="min-h-screen bg-[#1a1410] font-sans text-stone-200 antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-amber-500/15 bg-[#1a1410]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-[#1a1410]">
              <ChefHat className="h-5 w-5" />
            </span>
            <span className="font-serif text-xl font-semibold tracking-wide text-amber-300">
              Laləzar
            </span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-stone-300 transition-colors hover:text-amber-300"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#rezervasiya"
            className="rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-5 py-2.5 text-sm font-semibold text-[#1a1410] shadow-lg shadow-amber-900/40 transition-transform hover:scale-105"
          >
            Rezervasiya
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-orange-700/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-amber-300">
              <Star className="h-3.5 w-3.5 fill-amber-300" /> Bakının ürəyində, 2008-dən
            </span>
            <h1 className="mt-6 font-serif text-5xl font-bold leading-tight text-stone-50 sm:text-6xl lg:text-7xl">
              Laləzar
              <span className="block bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Azərbaycan mətbəxi
              </span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-stone-400">
              Nəsillərdən gələn reseptlər, manqalın istisi və zəfəranın ətri.
              Şah plovdan tutmuş təzə paxlavaya qədər — hər süfrə bir bayramdır.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#rezervasiya"
                className="rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-8 py-3.5 text-base font-semibold text-[#1a1410] shadow-xl shadow-amber-900/40 transition-transform hover:scale-105"
              >
                Rezervasiya et
              </a>
              <a
                href="#menyu"
                className="rounded-full border border-amber-500/30 px-8 py-3.5 text-base font-semibold text-amber-200 transition-colors hover:bg-amber-500/10"
              >
                Menyuya bax
              </a>
            </div>
            <div className="mt-10 flex items-center gap-8">
              <div>
                <p className="font-serif text-3xl font-bold text-amber-300">4.9</p>
                <p className="text-xs text-stone-500">2.400+ rəy</p>
              </div>
              <div className="h-10 w-px bg-amber-500/20" />
              <div>
                <p className="font-serif text-3xl font-bold text-amber-300">120+</p>
                <p className="text-xs text-stone-500">milli yemək növü</p>
              </div>
              <div className="h-10 w-px bg-amber-500/20" />
              <div>
                <p className="font-serif text-3xl font-bold text-amber-300">16</p>
                <p className="text-xs text-stone-500">illik usta</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-stone-800 via-amber-900/40 to-[#1a1410] p-1 shadow-2xl">
              <div className="flex h-full w-full flex-col justify-between rounded-[1.4rem] bg-gradient-to-br from-amber-700/30 to-stone-900 p-8">
                <div className="flex justify-end">
                  <span className="rounded-full bg-[#1a1410]/60 px-4 py-2 text-xs font-medium text-amber-200 backdrop-blur">
                    Manqal kömürü üstündə
                  </span>
                </div>
                <div>
                  <ChefHat className="mb-4 h-14 w-14 text-amber-300/80" />
                  <p className="font-serif text-3xl font-bold text-stone-50">
                    Gündəlik təzə bişən
                  </p>
                  <p className="mt-2 text-amber-200/80">
                    Səhər seçilən ət, axşam süfrənizdə.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-amber-500/20 bg-[#221b15] px-6 py-4 shadow-xl sm:block">
              <p className="font-serif text-2xl font-bold text-amber-300">Şah plov</p>
              <p className="text-sm text-stone-400">təkrarsız dad — 28 ₼</p>
            </div>
          </div>
        </div>
      </section>

      {/* MENYU */}
      <section id="menyu" className="border-t border-amber-500/10 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              Menyumuz
            </span>
            <h2 className="mt-3 font-serif text-4xl font-bold text-stone-50 sm:text-5xl">
              Süfrəmizin dadları
            </h2>
            <p className="mt-4 text-stone-400">
              Hər yemək əl ilə, ənənəvi üsulla hazırlanır. Qiymətlərə xidmət daxildir.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {menuCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="rounded-2xl border border-amber-500/15 bg-[#221b15] p-7 transition-colors hover:border-amber-500/30"
                >
                  <div className="mb-6 flex items-center gap-3 border-b border-amber-500/10 pb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/15 text-amber-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-serif text-2xl font-semibold text-amber-200">
                      {cat.title}
                    </h3>
                  </div>
                  <ul className="space-y-5">
                    {cat.items.map((item) => (
                      <li key={item.name} className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium text-stone-100">{item.name}</p>
                          <p className="mt-0.5 text-sm text-stone-500">{item.desc}</p>
                        </div>
                        <span className="shrink-0 font-serif text-lg font-semibold text-amber-300">
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QALEREYA */}
      <section id="qalereya" className="border-t border-amber-500/10 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              Qalereya
            </span>
            <h2 className="mt-3 font-serif text-4xl font-bold text-stone-50 sm:text-5xl">
              Laləzardan anlar
            </h2>
            <p className="mt-4 text-stone-400">
              İsti atmosfer, zəngin süfrə və Bakının ən rahat guşəsi.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.map((g, i) => (
              <div
                key={g.label}
                className={`group relative flex aspect-[4/3] items-end overflow-hidden rounded-2xl bg-gradient-to-br ${g.from} ${g.to} p-5 shadow-lg ${
                  i === 0 ? "col-span-2 row-span-1 md:col-span-1" : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="relative font-serif text-lg font-semibold text-white drop-shadow">
                  {g.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REZERVASIYA */}
      <section
        id="rezervasiya"
        className="border-t border-amber-500/10 bg-gradient-to-b from-[#221b15] to-[#1a1410] py-20 lg:py-28"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              Rezervasiya
            </span>
            <h2 className="mt-3 font-serif text-4xl font-bold text-stone-50 sm:text-5xl">
              Süfrənizi ayırdın
            </h2>
            <p className="mt-4 max-w-md text-stone-400">
              Xüsusi gün, ailə yığıncağı və ya sadəcə dadlı bir axşam — bizə bildirin,
              ən yaxşı masanı sizin üçün hazırlayaq.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-stone-300">
                <Phone className="h-5 w-5 text-amber-300" />
                <span>+994 12 555 18 24</span>
              </div>
              <div className="flex items-center gap-3 text-stone-300">
                <MapPin className="h-5 w-5 text-amber-300" />
                <span>Nizami küç. 67, Səbail, Bakı</span>
              </div>
              <div className="flex items-center gap-3 text-stone-300">
                <Clock className="h-5 w-5 text-amber-300" />
                <span>Hər gün 12:00 – 00:00</span>
              </div>
            </div>
          </div>

          <form className="rounded-3xl border border-amber-500/20 bg-[#1a1410] p-7 shadow-2xl sm:p-9">
            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-stone-300">
                  Ad, soyad
                </label>
                <input
                  type="text"
                  placeholder="Orxan Məmmədov"
                  className="w-full rounded-xl border border-amber-500/20 bg-[#221b15] px-4 py-3 text-stone-100 placeholder-stone-600 outline-none transition-colors focus:border-amber-400"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-stone-300">
                  Telefon
                </label>
                <input
                  type="tel"
                  placeholder="+994 50 123 45 67"
                  className="w-full rounded-xl border border-amber-500/20 bg-[#221b15] px-4 py-3 text-stone-100 placeholder-stone-600 outline-none transition-colors focus:border-amber-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-stone-300">
                    Qonaq sayı
                  </label>
                  <select className="w-full rounded-xl border border-amber-500/20 bg-[#221b15] px-4 py-3 text-stone-100 outline-none transition-colors focus:border-amber-400">
                    <option>1–2 nəfər</option>
                    <option>3–4 nəfər</option>
                    <option>5–6 nəfər</option>
                    <option>7+ nəfər</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-stone-300">
                    Tarix və saat
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full rounded-xl border border-amber-500/20 bg-[#221b15] px-4 py-3 text-stone-100 outline-none transition-colors focus:border-amber-400"
                  />
                </div>
              </div>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-3.5 text-base font-semibold text-[#1a1410] shadow-lg shadow-amber-900/40 transition-transform hover:scale-[1.02]"
              >
                <Send className="h-4 w-4" /> Rezervasiyanı göndər
              </button>
              <p className="text-center text-xs text-stone-500">
                Təsdiq üçün sizinlə 15 dəqiqə ərzində əlaqə saxlayacağıq.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* ƏLAQƏ */}
      <section id="elaqe" className="border-t border-amber-500/10 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-amber-500/15 bg-[#221b15] p-7">
              <MapPin className="mb-4 h-7 w-7 text-amber-300" />
              <h3 className="font-serif text-xl font-semibold text-stone-50">Ünvan</h3>
              <p className="mt-2 leading-relaxed text-stone-400">
                Nizami küçəsi 67, Səbail rayonu, Bakı AZ1000, Azərbaycan
              </p>
            </div>
            <div className="rounded-2xl border border-amber-500/15 bg-[#221b15] p-7">
              <Phone className="mb-4 h-7 w-7 text-amber-300" />
              <h3 className="font-serif text-xl font-semibold text-stone-50">Əlaqə</h3>
              <p className="mt-2 leading-relaxed text-stone-400">
                +994 12 555 18 24<br />
                +994 50 555 18 24<br />
                salam@lalezar.az
              </p>
            </div>
            <div className="rounded-2xl border border-amber-500/15 bg-[#221b15] p-7">
              <Clock className="mb-4 h-7 w-7 text-amber-300" />
              <h3 className="font-serif text-xl font-semibold text-stone-50">İş saatları</h3>
              <ul className="mt-2 space-y-1.5 text-stone-400">
                {hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-3">
                    <span>{h.day}</span>
                    <span className="text-amber-300">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-amber-500/15 bg-[#150f0b] py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-[#1a1410]">
                <ChefHat className="h-5 w-5" />
              </span>
              <span className="font-serif text-xl font-semibold tracking-wide text-amber-300">
                Laləzar Restoran
              </span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-6">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-stone-400 transition-colors hover:text-amber-300"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Aperture"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/20 text-stone-300 transition-colors hover:border-amber-400 hover:text-amber-300"
              >
                <Aperture className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Share2"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/20 text-stone-300 transition-colors hover:border-amber-400 hover:text-amber-300"
              >
                <Share2 className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-amber-500/10 pt-6 text-center text-sm text-stone-600">
            © 2026 Laləzar Restoran. Bütün hüquqlar qorunur. Bakı şəhəri ilə hazırlanıb.
          </div>
        </div>
      </footer>
    </div>
  );
}

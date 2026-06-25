import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  Stethoscope,
  Smile,
  Sparkles,
  Baby,
  ShieldCheck,
  Award,
  HeartHandshake,
  Star,
  Check,
  CalendarDays,
  Mail,
  Aperture,
  Share2,
} from "lucide-react";
import { useState } from "react";

export function ClinicSite() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Ana səhifə", href: "#hero" },
    { label: "Xidmətlər", href: "#xidmetler" },
    { label: "Həkimlər", href: "#hekimler" },
    { label: "Qiymətlər", href: "#qiymetler" },
    { label: "Rəylər", href: "#reyler" },
    { label: "Əlaqə", href: "#elaqe" },
  ];

  const services = [
    {
      icon: Stethoscope,
      title: "İmplantasiya",
      desc: "İtirilmiş dişlərin müasir titan implantlarla bərpası — ömürlük zəmanətlə.",
    },
    {
      icon: Smile,
      title: "Ortodontiya",
      desc: "Görünməz breketlər və elayner sistemləri ilə düzgün, gözəl gülüş.",
    },
    {
      icon: Sparkles,
      title: "Dişlərin ağardılması",
      desc: "Təhlükəsiz lazer ağartma ilə bir seansda 4-5 ton açıq diş rəngi.",
    },
    {
      icon: Baby,
      title: "Uşaq stomatologiyası",
      desc: "Balalarınız üçün ağrısız, qorxusuz və oyun kimi keçən müalicə.",
    },
  ];

  const doctors = [
    {
      name: "Dr. Aysel Məmmədova",
      role: "Baş həkim · İmplantoloq",
      initials: "AM",
      tone: "from-teal-500 to-emerald-600",
    },
    {
      name: "Dr. Rəşad Quliyev",
      role: "Ortodont",
      initials: "RQ",
      tone: "from-emerald-500 to-cyan-600",
    },
    {
      name: "Dr. Günel Həsənova",
      role: "Terapevt-stomatoloq",
      initials: "GH",
      tone: "from-cyan-500 to-teal-600",
    },
    {
      name: "Dr. Elvin Əliyev",
      role: "Uşaq stomatoloqu",
      initials: "EƏ",
      tone: "from-teal-600 to-emerald-500",
    },
  ];

  const prices = [
    { name: "Konsultasiya və müayinə", price: "Pulsuz" },
    { name: "Peşəkar diş təmizliyi", price: "60 ₼" },
    { name: "Diş ağartma (lazer)", price: "280 ₼" },
    { name: "Titan implant (1 ədəd)", price: "850 ₼" },
    { name: "Metal-keramik qoplama", price: "190 ₼" },
    { name: "Elayner kursu (orta)", price: "2 400 ₼" },
  ];

  const reasons = [
    {
      icon: ShieldCheck,
      title: "Steril mühit",
      desc: "Avropa standartlarına uyğun avadanlıq və tam sterilizasiya.",
    },
    {
      icon: Award,
      title: "15 illik təcrübə",
      desc: "12 000-dən çox uğurla müalicə olunmuş xəstə.",
    },
    {
      icon: HeartHandshake,
      title: "Ağrısız müalicə",
      desc: "Müasir anesteziya ilə tamamilə rahat seanslar.",
    },
  ];

  const reviews = [
    {
      text: "İmplant əməliyyatından heç qorxmadım. Aysel xanım hər mərhələni izah etdi, ağrı olmadı. Nəticədən çox razıyam!",
      name: "Nigar Süleymanova",
      city: "Bakı, Nəsimi",
    },
    {
      text: "Uşağımı ilk dəfə qorxmadan həkimə apardım. Elvin müəllim balamla elə danışdı ki, indi özü gedək deyir.",
      name: "Tural Babayev",
      city: "Bakı, Yasamal",
    },
    {
      text: "Breketlərimi bir ildə açdırdım, gülüşüm tamam dəyişdi. Komanda çox peşəkar və səmimidir.",
      name: "Ləman Rəhimova",
      city: "Bakı, Xətai",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#hero" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-sm">
              <Smile className="h-5 w-5" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              Dental <span className="text-teal-600">Gülüm</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-teal-600"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#qeydiyyat"
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-teal-600/30 transition-all hover:bg-teal-700 hover:shadow-md"
            >
              <CalendarDays className="h-4 w-4" />
              Randevu al
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
            aria-label="Menyu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#qeydiyyat"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white"
              >
                <CalendarDays className="h-4 w-4" />
                Randevu al
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-white"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-1.5 text-xs font-semibold text-teal-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Bakının ən etibarlı diş klinikası
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              Sağlam gülüş, <br />
              <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                ömürlük özünə inam
              </span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600">
              Müasir avadanlıq, təcrübəli həkimlər və ağrısız müalicə ilə gülüşünüzə
              qayğı göstəririk. İlk konsultasiya tamamilə pulsuzdur.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#qeydiyyat"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-600/30 transition-all hover:bg-teal-700 hover:shadow-xl"
              >
                <CalendarDays className="h-5 w-5" />
                Randevu al
              </a>
              <a
                href="#xidmetler"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:border-teal-300 hover:text-teal-700"
              >
                Xidmətlərə bax
              </a>
            </div>

            <div className="mt-10 flex items-center gap-8">
              <div>
                <div className="text-2xl font-extrabold text-slate-900">12 000+</div>
                <div className="text-sm text-slate-500">Razı xəstə</div>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <div className="text-2xl font-extrabold text-slate-900">15 il</div>
                <div className="text-sm text-slate-500">Təcrübə</div>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <div className="flex items-center gap-1 text-2xl font-extrabold text-slate-900">
                  4.9 <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-sm text-slate-500">Reytinq</div>
              </div>
            </div>
          </div>

          {/* Visual block */}
          <div className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 p-8 shadow-2xl shadow-teal-600/30">
              <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-white/15 blur-md" />
              <div className="flex h-full flex-col justify-between">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 backdrop-blur">
                  <Smile className="h-10 w-10 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-teal-50">Bu gün sənə</div>
                  <div className="mt-1 text-3xl font-extrabold text-white">
                    Pulsuz müayinə
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-teal-50/90">
                    Diş sağlamlığınızı peşəkar həkimlərimizlə pulsuz yoxladın və müalicə
                    planınızı öyrən.
                  </p>
                </div>
              </div>
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-2 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-xl sm:-left-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div>
                <div className="text-sm font-bold text-slate-900">Zəmanətli</div>
                <div className="text-xs text-slate-500">Bütün işlərə zəmanət</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="xidmetler" className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-teal-600">
            Xidmətlərimiz
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Hər ehtiyacınız üçün tam həll
          </h2>
          <p className="mt-4 text-slate-600">
            Profilaktikadan mürəkkəb cərrahi müalicəyə qədər — hamısı bir klinikada.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DOCTORS */}
      <section id="hekimler" className="bg-slate-50 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-teal-600">
              Komandamız
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Təcrübəli həkimlərimiz
            </h2>
            <p className="mt-4 text-slate-600">
              İşinə bağlı, davamlı təhsil alan və hər xəstəyə fərdi yanaşan mütəxəssislər.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((d) => (
              <div
                key={d.name}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-lg"
              >
                <div
                  className={`flex h-44 items-center justify-center bg-gradient-to-br ${d.tone}`}
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/25 text-2xl font-extrabold text-white backdrop-blur">
                    {d.initials}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-900">{d.name}</h3>
                  <p className="mt-1 text-sm font-medium text-teal-600">{d.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="qiymetler" className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-teal-600">
              Qiymətlər
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Şəffaf və münasib qiymətlər
            </h2>
            <p className="mt-4 max-w-md text-slate-600">
              Heç bir gizli ödəniş yoxdur. Müalicə planınızı və dəqiq qiyməti əvvəlcədən
              öyrənirsiniz. Hissə-hissə ödəniş imkanı mövcuddur.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "Konsultasiya tamamilə pulsuz",
                "0% faizlə 6 aya qədər kreditlə ödəniş",
                "Bütün işlərə rəsmi zəmanət",
              ].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-slate-700">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-2 shadow-sm">
            <ul className="divide-y divide-slate-100">
              {prices.map((p) => (
                <li
                  key={p.name}
                  className="flex items-center justify-between px-5 py-4"
                >
                  <span className="text-sm font-medium text-slate-700">{p.name}</span>
                  <span className="text-base font-extrabold text-teal-600">
                    {p.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHY US + REVIEWS */}
      <section id="reyler" className="bg-gradient-to-b from-teal-50/60 to-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-6 sm:grid-cols-3">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border border-teal-100 bg-white p-6 text-center shadow-sm"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-white">
                  <r.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{r.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Xəstələrimiz nə deyir?
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((rev) => (
              <div
                key={rev.name}
                className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                  “{rev.text}”
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                    {rev.name.charAt(0)}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{rev.name}</div>
                    <div className="text-xs text-slate-500">{rev.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="qeydiyyat" className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl lg:grid lg:grid-cols-2">
          <div className="bg-gradient-to-br from-teal-600 to-emerald-600 p-8 text-white md:p-12">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Onlayn qeydiyyat
            </h2>
            <p className="mt-4 max-w-sm leading-relaxed text-teal-50">
              Formanı doldurun, qısa zamanda sizinlə əlaqə saxlayaq və sizə uyğun vaxtı
              təyin edək. İlk müayinə pulsuzdur.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="font-semibold">+994 12 555 18 24</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                  <Clock className="h-5 w-5" />
                </span>
                <span className="font-semibold">B.e – Şənbə: 09:00 – 20:00</span>
              </div>
            </div>
          </div>

          <form className="p-8 md:p-12">
            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Ad, Soyad
                </label>
                <input
                  type="text"
                  placeholder="Məsələn: Aysu Quliyeva"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Telefon
                </label>
                <input
                  type="tel"
                  placeholder="+994 50 123 45 67"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Xidmət
                </label>
                <select
                  defaultValue=""
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                >
                  <option value="" disabled>
                    Xidmət seçin
                  </option>
                  <option>İmplantasiya</option>
                  <option>Ortodontiya (breket / elayner)</option>
                  <option>Dişlərin ağardılması</option>
                  <option>Uşaq stomatologiyası</option>
                  <option>Müayinə və konsultasiya</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Tarix
                </label>
                <input
                  type="date"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-600/30 transition-all hover:bg-teal-700"
              >
                <CalendarDays className="h-5 w-5" />
                Randevunu təsdiqlə
              </button>
              <p className="text-center text-xs text-slate-400">
                Formanı göndərməklə şəxsi məlumatların emalına razılıq verirsiniz.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* CONTACT */}
      <section id="elaqe" className="bg-slate-50 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <MapPin className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Ünvan</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Nizami küç. 118, Nəsimi rayonu,
                <br />
                Bakı AZ1000, Azərbaycan
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <Clock className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">İş saatları</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Bazar ertəsi – Şənbə: 09:00 – 20:00
                <br />
                Bazar: 10:00 – 16:00
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <Phone className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Əlaqə</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                +994 12 555 18 24
                <br />
                info@dentalgulum.az
              </p>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="relative mt-6 h-56 overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-teal-100 via-emerald-50 to-slate-100">
            <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,#0d9488_1px,transparent_1px),linear-gradient(to_bottom,#0d9488_1px,transparent_1px)] [background-size:40px_40px]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-teal-600 text-white shadow-lg shadow-teal-600/40">
                <MapPin className="h-6 w-6" />
              </span>
            </div>
            <div className="absolute bottom-4 left-4 rounded-xl bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur">
              Dental Gülüm · Nizami küç. 118
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 py-14 text-slate-300">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white">
                  <Smile className="h-5 w-5" />
                </span>
                <span className="text-lg font-extrabold text-white">
                  Dental Gülüm
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Bakıda sağlam və gözəl gülüş üçün etibarlı ünvanınız.
              </p>
              <div className="mt-5 flex gap-3">
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition-colors hover:bg-teal-600 hover:text-white"
                  aria-label="Aperture"
                >
                  <Aperture className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition-colors hover:bg-teal-600 hover:text-white"
                  aria-label="Share2"
                >
                  <Share2 className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition-colors hover:bg-teal-600 hover:text-white"
                  aria-label="E-poçt"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Xidmətlər
              </h4>
              <ul className="mt-4 space-y-2 text-sm">
                {services.map((s) => (
                  <li key={s.title}>
                    <a href="#xidmetler" className="text-slate-400 hover:text-teal-400">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Klinika
              </h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href="#hekimler" className="text-slate-400 hover:text-teal-400">
                    Həkimlər
                  </a>
                </li>
                <li>
                  <a href="#qiymetler" className="text-slate-400 hover:text-teal-400">
                    Qiymətlər
                  </a>
                </li>
                <li>
                  <a href="#reyler" className="text-slate-400 hover:text-teal-400">
                    Rəylər
                  </a>
                </li>
                <li>
                  <a href="#qeydiyyat" className="text-slate-400 hover:text-teal-400">
                    Onlayn qeydiyyat
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Əlaqə
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-400" />
                  Nizami küç. 118, Nəsimi, Bakı
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0 text-teal-400" />
                  +994 12 555 18 24
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0 text-teal-400" />
                  info@dentalgulum.az
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
            <span>© 2026 Dental Gülüm. Bütün hüquqlar qorunur.</span>
            <span>Bakı, Azərbaycan ilə hazırlanıb</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
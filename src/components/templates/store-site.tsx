import {
  ShoppingCart,
  Search,
  Menu,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Star,
  ArrowRight,
  AtSign,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";

const products = [
  { name: "İpək Bluz", category: "Qadın geyimi", price: 64, oldPrice: 92, tag: "Yeni" },
  { name: "Yüksək Bel Cins", category: "Qadın geyimi", price: 79, oldPrice: 110, tag: "Çox satılan" },
  { name: "Oversize Trençkot", category: "Üst geyim", price: 145, oldPrice: 199, tag: "Endirim" },
  { name: "Kaşmir Sviter", category: "Trikotaj", price: 98, oldPrice: 130, tag: null },
  { name: "Dəri Çiyin Çantası", category: "Aksesuar", price: 120, oldPrice: 165, tag: "Yeni" },
  { name: "Minimal Qol Saatı", category: "Aksesuar", price: 210, oldPrice: null, tag: "Premium" },
  { name: "Klassik Loafer", category: "Ayaqqabı", price: 135, oldPrice: 180, tag: "Endirim" },
  { name: "İpək Şarf", category: "Aksesuar", price: 42, oldPrice: 58, tag: null },
];

const swatches = [
  "from-violet-200 to-indigo-300",
  "from-indigo-200 to-blue-300",
  "from-fuchsia-200 to-violet-300",
  "from-sky-200 to-indigo-300",
  "from-rose-200 to-fuchsia-300",
  "from-violet-300 to-indigo-400",
  "from-indigo-200 to-violet-300",
  "from-purple-200 to-indigo-300",
];

const categories = [
  { name: "Qadın geyimi", count: "240 məhsul", grad: "from-violet-500 to-indigo-600" },
  { name: "Kişi geyimi", count: "180 məhsul", grad: "from-indigo-500 to-blue-600" },
  { name: "Aksesuarlar", count: "120 məhsul", grad: "from-fuchsia-500 to-violet-600" },
  { name: "Ayaqqabı", count: "95 məhsul", grad: "from-purple-500 to-indigo-600" },
];

const perks = [
  { icon: Truck, title: "Pulsuz çatdırılma", desc: "70 ₼-dən yuxarı bütün sifarişlər üçün Bakı daxili pulsuz." },
  { icon: RotateCcw, title: "14 gün qaytarma", desc: "Bəyənmədiniz? Heç bir sual vermədən geri qaytarın." },
  { icon: ShieldCheck, title: "Təhlükəsiz ödəniş", desc: "Kart məlumatlarınız 256-bit şifrələmə ilə qorunur." },
  { icon: Headphones, title: "Daimi dəstək", desc: "Hər gün 09:00–21:00 arası canlı dəstək xidməti." },
];

export function StoreSite() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      {/* Promo banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-4 py-2.5 text-center text-sm font-medium text-white">
        <span className="inline-flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Endirim 30% — yeni kolleksiya başladı. Kod:{" "}
          <span className="rounded bg-white/20 px-1.5 py-0.5 font-bold tracking-wide">AYLA30</span>
        </span>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-base font-black text-white">
              A
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              Ayla<span className="text-indigo-600">Store</span>
            </span>
          </div>

          <ul className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
            <li><a href="#mehsullar" className="transition hover:text-indigo-600">Məhsullar</a></li>
            <li><a href="#kateqoriyalar" className="transition hover:text-indigo-600">Kateqoriyalar</a></li>
            <li><a href="#ustunlukler" className="transition hover:text-indigo-600">Üstünlüklər</a></li>
            <li><a href="#abune" className="transition hover:text-indigo-600">Endirimlər</a></li>
          </ul>

          <div className="flex items-center gap-2">
            <button type="button" className="hidden h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 sm:flex" aria-label="Axtar">
              <Search className="h-5 w-5" />
            </button>
            <button type="button" className="hidden h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 sm:flex" aria-label="Sevimlilər">
              <Heart className="h-5 w-5" />
            </button>
            <button type="button" className="relative flex h-10 items-center gap-2 rounded-full bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700" aria-label="Səbət">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Səbət</span>
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-500 text-[10px] font-bold text-white">3</span>
            </button>
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 lg:hidden" aria-label="Menyu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-violet-200 to-indigo-200 opacity-60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-200 to-violet-200 opacity-50 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-xs font-semibold text-indigo-700">
              <Sparkles className="h-3.5 w-3.5" />
              Yaz–Yay 2026 kolleksiyası
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Üslubunu{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                yenidən kəşf et
              </span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-600">
              Bakının ən seçilmiş onlayn butiki. Premium parçalar, müasir dizayn və hər
              gün sənin üçün yenilənən kolleksiya — hamısı bir yerdə.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">
                Alış-verişə başla
                <ArrowRight className="h-4 w-4" />
              </button>
              <button type="button" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600">
                Kolleksiyaya bax
              </button>
            </div>
            <div className="mt-10 flex items-center gap-8">
              <div>
                <p className="text-2xl font-black text-slate-900">12k+</p>
                <p className="text-sm text-slate-500">Məmnun müştəri</p>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <p className="text-2xl font-black text-slate-900">630+</p>
                <p className="text-sm text-slate-500">Aktiv məhsul</p>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-2xl font-black text-slate-900">4.9</span>
                </div>
                <p className="text-sm text-slate-500">Orta reytinq</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-violet-400 to-indigo-500 p-6 shadow-xl shadow-indigo-200">
                  <span className="rounded-full bg-white/25 px-3 py-1 text-xs font-bold text-white">Yeni</span>
                  <p className="mt-28 text-lg font-bold text-white">İpək Kolleksiya</p>
                  <p className="text-sm text-white/80">64 ₼-dən başlayır</p>
                </div>
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-fuchsia-300 to-violet-400 p-6 shadow-lg">
                  <p className="text-3xl font-black text-white">-30%</p>
                  <p className="mt-1 text-sm font-medium text-white/90">bütün üst geyimə</p>
                </div>
              </div>
              <div className="space-y-4 pt-10">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-indigo-300 to-blue-400 p-6 shadow-lg">
                  <p className="text-sm font-medium text-white/90">Aksesuarlar</p>
                  <p className="mt-1 text-lg font-bold text-white">Stil tamamlayır</p>
                </div>
                <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-slate-800 to-indigo-900 p-6 shadow-xl">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white">Premium</span>
                  <p className="mt-28 text-lg font-bold text-white">Limitli seriya</p>
                  <p className="text-sm text-white/70">Yalnız onlayn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="kateqoriyalar" className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Kateqoriyalar</h2>
            <p className="mt-2 text-slate-500">Axtardığını sürətlə tap</p>
          </div>
          <a href="#mehsullar" className="hidden items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 sm:flex">
            Hamısına bax <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((c) => (
            <button
              key={c.name}
              type="button"
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${c.grad} p-6 text-left shadow-lg transition hover:-translate-y-1`}
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15" />
              <p className="relative text-lg font-bold text-white">{c.name}</p>
              <p className="relative mt-1 text-sm text-white/80">{c.count}</p>
              <span className="relative mt-6 inline-flex items-center gap-1 text-sm font-semibold text-white">
                Kəşf et <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="mehsullar" className="mx-auto max-w-7xl px-5 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Ən çox satılanlar</h2>
            <p className="mt-2 text-slate-500">Bu həftə hər kəsin sevdiyi məhsullar</p>
          </div>
          <a href="#mehsullar" className="hidden items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 sm:flex">
            Bütün məhsullar <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {products.map((p, i) => (
            <div key={p.name} className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white transition hover:shadow-xl hover:shadow-slate-100">
              <div className={`relative aspect-square overflow-hidden bg-gradient-to-br ${swatches[i]}`}>
                {p.tag && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-indigo-700 backdrop-blur">
                    {p.tag}
                  </span>
                )}
                <button type="button" aria-label="Sevimlilərə əlavə et" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-600 backdrop-blur transition hover:text-fuchsia-500">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-indigo-500">{p.category}</p>
                <h3 className="mt-1 font-semibold text-slate-900">{p.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-black text-slate-900">{p.price} ₼</span>
                  {p.oldPrice && (
                    <span className="text-sm text-slate-400 line-through">{p.oldPrice} ₼</span>
                  )}
                </div>
                <button type="button" className="mt-4 flex items-center justify-center gap-2 rounded-full bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600">
                  <ShoppingCart className="h-4 w-4" />
                  Səbətə at
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Perks */}
      <section id="ustunlukler" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black tracking-tight">Niyə Ayla Store?</h2>
            <p className="mt-2 text-slate-500">Alış-verişi rahat və etibarlı edirik</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((perk) => (
              <div key={perk.title} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <perk.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{perk.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / subscribe form */}
      <section id="abune" className="mx-auto max-w-7xl px-5 py-16">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="relative mx-auto max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white">
              <Send className="h-3.5 w-3.5" />
              Bülletenə abunə ol
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
              İlk sifarişinə 10% endirim qazan
            </h2>
            <p className="mt-3 text-base text-white/80">
              Yeni kolleksiyalar, özəl endirimlər və yalnız abunəçilərə özəl təkliflərdən
              ilk sən xəbər tut.
            </p>
            <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="E-mail ünvanınız"
                className="h-12 flex-1 rounded-full border-0 bg-white px-5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button type="button" className="h-12 rounded-full bg-slate-900 px-7 text-sm font-semibold text-white transition hover:bg-slate-800">
                Abunə ol
              </button>
            </form>
            <p className="mt-4 text-xs text-white/60">
              İstənilən vaxt abunəlikdən çıxa bilərsiniz. Spam göndərmirik.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-base font-black text-white">
                  A
                </div>
                <span className="text-xl font-extrabold tracking-tight">
                  Ayla<span className="text-indigo-600">Store</span>
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
                Bakının müasir onlayn butiki. Üslub, keyfiyyət və rahatlığı bir araya
                gətiririk.
              </p>
              <div className="mt-5 flex gap-3">
                <a href="#abune" aria-label="Aperture" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-indigo-600 hover:text-white">
                  <AtSign className="h-5 w-5" />
                </a>
                <a href="#abune" aria-label="Mesaj" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-indigo-600 hover:text-white">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900">Mağaza</h4>
              <ul className="mt-4 space-y-3 text-sm text-slate-500">
                <li><a href="#mehsullar" className="hover:text-indigo-600">Yeni gələnlər</a></li>
                <li><a href="#mehsullar" className="hover:text-indigo-600">Çox satılanlar</a></li>
                <li><a href="#abune" className="hover:text-indigo-600">Endirimlər</a></li>
                <li><a href="#kateqoriyalar" className="hover:text-indigo-600">Kateqoriyalar</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900">Dəstək</h4>
              <ul className="mt-4 space-y-3 text-sm text-slate-500">
                <li><a href="#ustunlukler" className="hover:text-indigo-600">Çatdırılma</a></li>
                <li><a href="#ustunlukler" className="hover:text-indigo-600">Qaytarma</a></li>
                <li><a href="#ustunlukler" className="hover:text-indigo-600">Ölçü cədvəli</a></li>
                <li><a href="#ustunlukler" className="hover:text-indigo-600">Tez-tez soruşulan</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900">Əlaqə</h4>
              <ul className="mt-4 space-y-3 text-sm text-slate-500">
                <li>Nizami küç. 28, Bakı</li>
                <li>+994 50 412 18 76</li>
                <li>salam@aylastore.az</li>
                <li>Hər gün 09:00–21:00</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 text-sm text-slate-400 sm:flex-row">
            <p>© 2026 Ayla Store. Bütün hüquqlar qorunur.</p>
            <div className="flex gap-6">
              <a href="#abune" className="hover:text-indigo-600">Məxfilik</a>
              <a href="#abune" className="hover:text-indigo-600">Şərtlər</a>
              <a href="#abune" className="hover:text-indigo-600">Çərəzlər</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
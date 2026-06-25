import type { TemplateId } from "@/components/landing/browser-card";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  domain: string;
  tag: string;
  desc: string;
  /** The build brief used when a visitor remixes this template. */
  prompt: string;
}

/** Shared showcase/template metadata — used by the landing grid + /templates/[id]. */
export const TEMPLATES: ReadonlyArray<TemplateMeta> = [
  {
    id: "clinic",
    name: "Dental Gülüm",
    domain: "dentalgulum.az",
    tag: "Klinika",
    desc: "Diş klinikası — xidmətlər, həkimlər və onlayn qeydiyyat.",
    prompt:
      "Bakıda müasir diş klinikası üçün peşəkar sayt: güclü hero, xidmətlər (implant, ağartma, ortodontiya), həkimlər, qiymətlər, pasiyent rəyləri və onlayn randevu forması.",
  },
  {
    id: "florist",
    name: "Gül Evi",
    domain: "gulevi.az",
    tag: "Mağaza",
    desc: "Çiçək mağazası — buketlər və eyni gün çatdırılma.",
    prompt:
      "Çiçək mağazası üçün zərif sayt: buket kataloqu və qiymətlər, eyni gün çatdırılma, haqqımızda bölməsi, müştəri rəyləri və sifariş forması.",
  },
  {
    id: "rentacar",
    name: "Sahil Rent-a-Car",
    domain: "sahilrent.az",
    tag: "İcarə",
    desc: "Avtomobil icarəsi — axtarış, qiymətlər və rezervasiya.",
    prompt:
      "Avtomobil icarəsi şirkəti üçün sayt: avtomobil axtarışı, avtopark, gündəlik/həftəlik qiymətlər, icarə şərtləri, üstünlüklər və rezervasiya forması.",
  },
  {
    id: "restaurant",
    name: "Laləzar Restoran",
    domain: "lalezar.az",
    tag: "Restoran",
    desc: "Restoran — menyu, qalereya və masa rezervasiyası.",
    prompt:
      "Azərbaycan restoranı üçün premium sayt: menyu və qiymətlər, qalereya, haqqımızda hekayəsi, rəylər və masa rezervasiyası forması.",
  },
  {
    id: "barber",
    name: "Usta Barbershop",
    domain: "ustabarber.az",
    tag: "Barbershop",
    desc: "Barbershop — xidmət qiymətləri və onlayn növbə.",
    prompt:
      "Kişi barbershop üçün stilli, tünd dizaynlı sayt: xidmət qiymətləri, ustalar, qalereya, iş saatları və onlayn növbə forması.",
  },
  {
    id: "store",
    name: "Ayla Store",
    domain: "aylastore.az",
    tag: "E-ticarət",
    desc: "Onlayn mağaza — məhsul kataloqu və səbət.",
    prompt:
      "Onlayn geyim mağazası üçün sayt: məhsul kataloqu, kateqoriyalar, endirim banneri, məhsul kartları və qiymətlər, səbət və əlaqə bölməsi.",
  },
];

export function getTemplate(id: string): TemplateMeta | undefined {
  return TEMPLATES.find((template) => template.id === id);
}

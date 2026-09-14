export type Lang = "en" | "es";

const dict = {
  en: {
    // Header / nav
    "nav.openMenu": "Open menu",
    "nav.backToHome": "Back to home",
    "nav.hours": "Hours",
    // Homepage
    "home.hero.headline": "Information, Culture, & Community.",
    "home.hero.body":
      "Otis Library is a free, welcoming space for reading, learning, and connection — open to everyone in Norwich and beyond.",
    "home.hero.cta.libraryOfThings": "Library of Things",
    "home.hero.cta.onExhibit": "On Exhibit",
    "home.hero.cta.communityResources": "Community Resources",
    "home.badge.free247": "Free 24/7",
    "home.quickLinks.heading": "What are you looking for?",
    "home.audiences.heading": "Especially For You",
    "home.history.seeAll": "See all snippets ↗",
    "home.reviews.readMore": "Read more from our community →",
    // Days (for footer hours table)
    "days.sunday": "Sunday",
    "days.monday": "Monday",
    "days.tuesday": "Tuesday",
    "days.wednesday": "Wednesday",
    "days.thursday": "Thursday",
    "days.friday": "Friday",
    "days.saturday": "Saturday",
    // Footer
    "footer.quickLinks": "Quick Links",
    "footer.hours": "Our Hours",
    "footer.copyright": "Otis Library, Norwich, CT. Prototype redesign.",
  },
  es: {
    // Header / nav
    "nav.openMenu": "Abrir menú",
    "nav.backToHome": "Volver al inicio",
    "nav.hours": "Horario",
    // Homepage
    "home.hero.headline": "Información, Cultura y Comunidad.",
    "home.hero.body":
      "La Biblioteca Otis es un espacio gratuito y acogedor para leer, aprender y conectarse — abierto para todos en Norwich y más allá.",
    "home.hero.cta.libraryOfThings": "Biblioteca de Cosas",
    "home.hero.cta.onExhibit": "En Exhibición",
    "home.hero.cta.communityResources": "Recursos Comunitarios",
    "home.badge.free247": "Gratis 24/7",
    "home.quickLinks.heading": "¿Qué estás buscando?",
    "home.audiences.heading": "Especialmente Para Ti",
    "home.history.seeAll": "Ver todos los artículos ↗",
    "home.reviews.readMore": "Leer más de nuestra comunidad →",
    // Days
    "days.sunday": "Domingo",
    "days.monday": "Lunes",
    "days.tuesday": "Martes",
    "days.wednesday": "Miércoles",
    "days.thursday": "Jueves",
    "days.friday": "Viernes",
    "days.saturday": "Sábado",
    // Footer
    "footer.quickLinks": "Enlaces Rápidos",
    "footer.hours": "Nuestro Horario",
    "footer.copyright": "Biblioteca Otis, Norwich, CT. Rediseño prototipo.",
  },
};

export type TranslationKey = keyof typeof dict.en;

export function getT(lang: Lang) {
  const langDict = dict[lang] as Partial<Record<TranslationKey, string>>;
  return (key: TranslationKey): string => langDict[key] ?? dict.en[key];
}

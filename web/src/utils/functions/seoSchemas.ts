import { domain, facebookURL, instagramURL, linkedinURL, twitterURL, youtubeURL, contactEmail, phoneNumber, imageURL } from "../constants";
import { ArticleDetailProps } from "../types/article/ArticleDetailProps.ts";
import { GlossaryType } from "../types/article/GlossaryType.ts";

export const getOrganizationSchema = () => ({
  "@type": "Organization",
  "@id": `${domain}/#organization`,
  name: "Serious Broker",
  url: domain,
  logo: {
    "@type": "ImageObject",
    url: `${domain}/SB-badge.ico`,
    width: 192,
    height: 192,
  },
  email: contactEmail,
  telephone: phoneNumber,
  sameAs: [
    facebookURL,
    instagramURL,
    linkedinURL,
    youtubeURL,
    twitterURL,
  ],
});

export const getWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    getOrganizationSchema(),
    {
      "@type": "WebSite",
      "@id": `${domain}/#website`,
      url: domain,
      name: "Serious Broker",
      description: "Platforma pro analýzu a investice do kryptoměn, semafory trhu, investiční strategie a vzdělávání.",
      publisher: {
        "@id": `${domain}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${domain}/articles/search/{search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
});

export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url.startsWith("http") ? item.url : `${domain}${item.url.startsWith("/") ? "" : "/"}${item.url}`,
  })),
});

export const getArticleSchema = (article: ArticleDetailProps, currentUrl: string) => {
  const imageUrl = article.titleImage
    ? (article.titleImage.startsWith("http") ? article.titleImage : `${imageURL}${article.titleImage}`)
    : (article.banner ? (article.banner.startsWith("http") ? article.banner : `${imageURL}${article.banner}`) : `${domain}/SB-badge.ico`);

  const authorName = [article.user_firstname, article.user_surname].filter(Boolean).join(" ") || "Serious Broker Team";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": currentUrl,
    },
    headline: article.title,
    description: article.description || article.title,
    image: imageUrl,
    datePublished: article.created,
    dateModified: article.changed || article.created,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: getOrganizationSchema(),
    inLanguage: article.language || "cs",
  };
};

export const getGlossaryFAQSchema = (glossaries: GlossaryType[], currentLang: string = "cs") => {
  const isCs = currentLang.startsWith("cs");

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: glossaries.slice(0, 50).map((item) => {
      const question = isCs ? (item.title_cs || item.title) : (item.title || item.title_cs);
      const answer = isCs ? (item.answer_cs || item.answer) : (item.answer || item.answer_cs);
      return {
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      };
    }),
  };
};

export const getCalculatorSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Krypto kalkulačka výnosů a zisků | Serious Broker",
  operatingSystem: "All",
  applicationCategory: "FinanceApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CZK",
  },
  description: "Interaktivní kalkulačka výnosů pro Bitcoin a další kryptoměny. Spočítejte si potenciální výnos a návratnost investice.",
});

export const getAboutPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "O projektu Serious Broker",
  url: `${domain}/about`,
  description: "Serious Broker je projekt zaměřený na asistenci při investování a šíření povědomí o kryptoměnách.",
  mainEntity: getOrganizationSchema(),
});

export const getContactPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Kontakt | Serious Broker",
  url: `${domain}/contact`,
  mainEntity: getOrganizationSchema(),
});

import { FC, useEffect } from "react";
import { domain } from "../../utils/constants";

export type SEOProps = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  schema?: object | object[];
}

export const SEO: FC<SEOProps> = ({
  title,
  description,
  canonicalPath,
  ogImage = `${domain}/SB-badge.ico`,
  ogType = "website",
  publishedTime,
  modifiedTime,
  author,
  schema,
}) => {
  useEffect(() => {
    // 1. Page Title
    const formattedTitle = title
      ? (title.toLowerCase().includes("serious broker") || title.toLowerCase().includes("serious.broker")
          ? title
          : `${title} | Serious Broker`)
      : "Serious Broker - Chytré investice do kryptoměn";
    document.title = formattedTitle;

    // Helper to update or create <meta> tag
    const setMetaTag = (attribute: "name" | "property", attrValue: string, content?: string) => {
      let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${attrValue}"]`);
      if (!content) {
        if (element) element.remove();
        return;
      }
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 2. Meta Description
    const metaDescription =
      description ||
      "Serious Broker – platforma pro analýzu kryptoměn, semafory trhu, investiční plány, vzdělávací články a slovník pojmů.";
    setMetaTag("name", "description", metaDescription);

    // 3. Canonical Link
    const currentUrl = canonicalPath
      ? (canonicalPath.startsWith("http") ? canonicalPath : `${domain}${canonicalPath.startsWith("/") ? "" : "/"}${canonicalPath}`)
      : window.location.href.split("?")[0].split("#")[0];

    let canonicalLink = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", currentUrl);

    // 4. OpenGraph Tags
    setMetaTag("property", "og:title", formattedTitle);
    setMetaTag("property", "og:description", metaDescription);
    setMetaTag("property", "og:url", currentUrl);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:site_name", "Serious Broker");

    if (ogType === "article") {
      if (publishedTime) setMetaTag("property", "article:published_time", publishedTime);
      if (modifiedTime) setMetaTag("property", "article:modified_time", modifiedTime);
      if (author) setMetaTag("property", "article:author", author);
    }

    // 5. Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:site", "@SeriousBroker");
    setMetaTag("name", "twitter:title", formattedTitle);
    setMetaTag("name", "twitter:description", metaDescription);
    setMetaTag("name", "twitter:image", ogImage);

    // 6. JSON-LD Structured Data
    const scriptId = "structured-data-jsonld";
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = scriptId;
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Optional cleanup on unmount if needed
    };
  }, [title, description, canonicalPath, ogImage, ogType, publishedTime, modifiedTime, author, schema]);

  return null;
};

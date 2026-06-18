import { useLocation } from "react-router-dom";

const SITE_URL = "https://projectgmanipur.org";
const SITE_NAME = "Project G Manipur";
const DEFAULT_OG_IMAGE = `${SITE_URL}/small_logo.jpeg`;

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  type?: "website" | "article";
  jsonLd?: object | object[];
}

export default function SEO({
  title,
  description,
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
  jsonLd,
}: SEOProps) {
  const { pathname } = useLocation();
  const canonicalUrl = `${SITE_URL}${pathname}`;
  const fullTitle = `${title} | ${SITE_NAME}`;
  const schemas = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  );
}

import { hasKey, isObject, isValueArray } from "./object-utils";

const API = process.env.OPTIMIZELY_API_URL!;

async function getSite(): Promise<SiteDefinition> {
  const res = await fetch(`${API}/site`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Optimizely API ${res.status}: ${res.url}`);

  const data = await res.json();
  const site = data?.[0];
  if (!isSiteDefinition(site))
    throw new Error("Result is not a valid SiteDefintion");
  console.log("getSite", site);

  return site;
}

export async function getStartPage(): Promise<ContentItem> {
  const site = await getSite();

  const startPageId = site?.contentRoots?.startPage?.id;
  if (!startPageId) throw new Error(`No start page id found`);

  return getContentById(startPageId);
}

export async function getContentById(id: number): Promise<ContentItem> {
  const res = await fetch(`${API}/content/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Optimizely API ${res.status}: ${res.url}`);

  const data = await res.json();
  if (!isContentItem(data))
    throw new Error(`Result is not a valid ContentItem`);
  console.log("getContentById", data);

  return data;
}

export async function getContentByUrl(url: string): Promise<ContentItem> {
  const res = await fetch(`${API}/content?url=${encodeURIComponent(url)}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Optimizely API ${res.status}: ${res.url}`);

  const data = await res.json();
  if (!isContentItem(data?.[0]))
    throw new Error(`Result is not a valid ContentItem`);
  console.log("getContentByUrl", data);

  return data?.[0] ?? null;
}

const isContentItem = (value: unknown): value is ContentItem => {
  return (
    isObject(value) &&
    hasKey(value, "name") &&
    hasKey(value, "url") &&
    hasKey(value, "contentType") &&
    isValueArray(value.contentType)
  );
};

const isSiteDefinition = (value: unknown): value is SiteDefinition => {
  return (
    isObject(value) &&
    hasKey(value, "id") &&
    hasKey(value, "name") &&
    hasKey(value, "contentRoots") &&
    isObject(value.contentRoots)
  );
};

export type SiteLanguage = {
  displayName: string;
  isMasterLanguage: boolean;
  name: string;
  url: string;
  urlSegment: string;
};

export type ContentLink = {
  id: number;
  workId: number;
  expanded: boolean | null;
  guidValue: string;
  providerName: string | null;
  url: string;
};

export type SiteDefinition = {
  id: string;
  name: string;
  languages: Array<SiteLanguage>;
  contentRoots: {
    globalAssetsRoot: ContentLink;
    startPage: ContentLink;
  };
};

export type ContentLanguage = {
  displayName: string;
  link: string;
  name: string;
};

export type ContentLongString = {
  propertyDataType: "PropertyLongString";
  value: string;
};

export type ContentHtmlString = {
  propertyDataType: "PropertyXhtmlString";
  value: string;
};

export type ContentAreaValue = {
  contentLink: ContentLink;
  displayOption: string;
  inlineBlock: { contentType: Array<string> } | null;
};

export type ContentArea = {
  propertyDataType: "PropertyContentArea";
  value: Array<ContentAreaValue>;
};

export type ContentItem = {
  name: string;
  url: string;
  routeSegment: string;
  stopPublish: unknown;
  status: string;
  created: string;
  changed?: string;
  saved: string;
  category: {
    propertyDataType: "PropertyCategory";
    value: Array<unknown>;
  };
  contentLink: ContentLink;
  contentType: Array<string>;
  existingLanguages: Array<ContentLanguage>;
  language: ContentLanguage;
};

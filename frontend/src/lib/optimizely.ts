import { getHttpErrorSummary, isDevEnv } from "./dev-utils";
import { hasKey, isObject, isValueArray } from "./object-utils";

const API = process.env.OPTIMIZELY_API_URL!;
const CMS_BASE = API.replace(/\/api\/.*/, "");
const DEFAULT_LANG = "en";

async function getSite(): Promise<SiteDefinition> {
  const req = new Request(`${API}/site`);
  const res = await fetch(req, {
    headers: { "Accept-Language": "en" },
    cache: "force-cache",
    // next: { revalidate: 60 },
  });

  if (!res.ok) {
    const err = await logAndGetError(req, res);
    throw err;
  }

  const data = await res.json();
  if (isDevEnv()) console.log("getSite", data);

  const site = data?.[0];
  if (!isSiteDefinition(site))
    throw new Error("Result is not a valid SiteDefintion");

  return site;
}

export async function getStartPage(): Promise<ContentItem> {
  const site = await getSite();

  const startPageId = site?.contentRoots?.startPage?.id;
  if (!startPageId) throw new Error(`No start page id found`);

  return getContentById(startPageId);
}

export async function getContentById(
  id: number,
  expand = false,
): Promise<ContentItem> {
  const url = expand ? `${API}/content/${id}?expand=*` : `${API}/content/${id}`;
  const req = new Request(url, {
    headers: { "Accept-Language": "en" },
    cache: "force-cache",
    // next: { revalidate: 60 },
  });
  const res = await fetch(req);

  if (!res.ok) {
    const err = await logAndGetError(req, res);
    throw err;
  }

  const data = await res.json();
  if (isDevEnv()) console.log("getContentById", data);

  if (!isContentItem(data))
    throw new Error(`Result is not a valid ContentItem`);

  return data;
}

export async function getChildrenById(id: number): Promise<Array<ContentItem>> {
  const req = new Request(`${API}/content/${id}/children`, {
    headers: { "Accept-Language": "en" },
    cache: "force-cache",
    // next: { revalidate: 60 },
  });
  const res = await fetch(req);

  if (!res.ok) {
    const err = await logAndGetError(req, res);
    throw err;
  }

  const data = await res.json();
  if (isDevEnv()) console.log("getContentById", data);

  if (!isValueArray(data) || !data.every(isContentItem))
    throw new Error(`Result is not a valid Array of ContentItem`);

  return data;
}

export async function getContentByUrl(
  url: string,
): Promise<ContentItem | null> {
  const cmsUrl = `${CMS_BASE}/${DEFAULT_LANG}${url}`;

  const req = new Request(
    `${API}/content?ContentUrl=${encodeURIComponent(cmsUrl)}`,
    {
      headers: { "Accept-Language": "en" },
      cache: "force-cache",
      // next: { revalidate: 60 },
    },
  );
  const res = await fetch(req);

  if (!res.ok) {
    const err = await logAndGetError(req, res);
    throw err;
  }

  const data = await res.json();
  if (isDevEnv()) console.log("getContentByUrl", data);

  const contentItem = data?.[0];
  if (contentItem && !isContentItem(contentItem))
    throw new Error(`Result is not a valid ContentItem`);

  return contentItem ?? null;
}

// Strips the language prefix (/en/, /de/, …), since frontend URLs are language-agnostic
export function cleanContentUrl(url: string) {
  return cleanContentUrlSegment(new URL(url).pathname);
}
export function cleanContentUrlSegment(urlSegment: string) {
  return urlSegment.replace(/^\/[a-z]{2}(\/|$)/, "/");
}

async function logAndGetError(req: Request, res: Response): Promise<Error> {
  if (isDevEnv()) {
    const summary = await getHttpErrorSummary(req, res);
    console.log("Error summary", summary);
  }
  return new Error(`Optimizely API ${res.status}: ${res.url}`);
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
  expanded: ContentItem | null;
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

export type ContentUrl = {
  propertyDataType: "PropertyUrl";
  value: string;
};

export type ContentDate = {
  propertyDataType: "PropertyDate";
  value: string;
};

export type ContentHtmlString = {
  propertyDataType: "PropertyXhtmlString";
  value: string;
};

export type ContentFileReference = {
  propertyDataType: "PropertyContentReference";
  value: ContentLink;
};

export type ContentReference = {
  propertyDataType: "PropertyContentReference";
  value: ContentLink;
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

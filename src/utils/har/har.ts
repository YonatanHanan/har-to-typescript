import { Entry, Har } from "har-format";
import { groupBy, mapValues } from "lodash";

export const filterEntriesByContentType = (
  har: Har,
  contentType: string = "application/json"
): Entry[] => {
  return har.log.entries.filter((entry) => {
    return entry.response.content.mimeType.includes(contentType);
  });
};

export const countRequestsByUrl = (
  entries: Entry[],
  urlPart: "hostname" | "pathname" | "href" = "hostname"
): Record<string, number> => {
  const frequency: Record<string, number> = {};

  entries.forEach((entry) => {
    const url = new URL(entry.request.url);
    const path = url[urlPart];
    if (!frequency[path]) {
      frequency[path] = 0;
    }
    frequency[path]++;
  });
  return frequency;
};

export const groupResponsesByPathname = (entries: Entry[]) => {
  return mapValues(
    groupBy(entries, (e) => {
      const url = new URL(e.request.url);
      return `${url.origin}${url.pathname}`;
    }),
    (entries) =>
      entries.map((e) => {
        return e.response.content.text || "";
      })
  );
};

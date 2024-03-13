export const convertUrlToNameSpace = (urls: string[]): string[] => {
  const namespace: string[] = [];

  urls.forEach((url) => {
    const namespaceSegment = urlToNamespace(url);
    namespace.push(namespaceSegment);
  });

  return [...new Set(namespace)];
};

export const urlToNamespace = (url: string): string => {
  const urlObj = new URL(url);
  const segments = urlObj.hostname.split(".");
  const namespaceSegment = segments
    .filter(
      (segment) =>
        segment !== "" && !segment.includes("?") && !segment.includes(".")
    )
    .map((segment) =>
      segment.includes("-")
        ? `'${segment}'`
        : segment.charAt(0).toUpperCase() + segment.slice(1)
    )
    .join("");

  return namespaceSegment;
};

export function formatPostTitleAsUrl(title: string): string {
  const noSpaces = title.replace(/ /g, "_");
  return encodeURIComponent(noSpaces);
}

export function formatUrlAsPostTitle(url: string): string {
  const decodedUrl = decodeURIComponent(url);
  const withSpaces = decodedUrl.replace(/_/g, " ");
  return withSpaces;
}

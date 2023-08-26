export function formatImage(url: string | null | undefined): string {
  if (url) {
    return url.trim() == "" ? "/img/user.png" : url;
  }
  return "/img/user.png";
}

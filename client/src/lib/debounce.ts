// biome-ignore lint/suspicious/noExplicitAny: only any works here
export default function debounce<T extends (...args: any[]) => void>(
  fn: T,
  t: number,
) {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), t);
  };
}

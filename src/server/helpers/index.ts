export function unescapeNewline(string?: string): string {
  return string ? string.replace(/\\n/g, '\n').replace(/\\r/g, '\r') : '';
}

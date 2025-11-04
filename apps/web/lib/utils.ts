export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return '';

  if (words.length === 1) {
    const word = words[0];
    return (word?.substring(0, 2) ?? '').toUpperCase();
  }

  const first = words[0]?.[0] ?? '';
  const second = words[1]?.[0] ?? '';
  return (first + second).toUpperCase();
}

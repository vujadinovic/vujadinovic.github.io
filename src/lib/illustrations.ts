const files = import.meta.glob<string>('../assets/illustrations/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const byName = new Map(Object.entries(files).map(([path, svg]) => [path.split('/').pop()!, svg]));

export function illustration(name: string): string {
  const svg = byName.get(name);
  if (!svg) throw new Error(`Unknown illustration "${name}". Add it to src/assets/illustrations/.`);
  return svg;
}

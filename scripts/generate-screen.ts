/*
Simple scaffold helper contract.
Implementation can be expanded to generate screen files automatically.

Usage idea:
  pnpm tsx scripts/generate-screen.ts --domain customer --name CustomerDetail
*/

export type GenerateScreenInput = {
  domain: string;
  name: string;
  routeSegment: string;
};

export function getScreenPaths(input: GenerateScreenInput): string[] {
  const screenBase = `src/screens/${input.domain}/${input.name}`;
  const pageBase = `src/pages/${input.domain}/${input.name}`;
  const kebabName = input.name.replace(/[A-Z]/g, (char, idx) => (idx === 0 ? char.toLowerCase() : `-${char.toLowerCase()}`));

  return [
    `${screenBase}/${input.name}.screen.tsx`,
    `${screenBase}/${input.name}.layout.ts`,
    `${screenBase}/${input.name}.schema.ts`,
    `${screenBase}/${input.name}.policy.md`,
    `${pageBase}/${input.name}.page.tsx`,
    `${pageBase}/${input.name}.route.ts`,
    `docs/screens/${input.routeSegment}-${kebabName}.md`,
  ];
}

export function getListBasePatternPath(): string {
  return 'src/patterns/list-base/ListBase.pattern.tsx';
}

export type GenerateDocInput = {
  slug: string;
};

export function getScreenDocPath(input: GenerateDocInput): string {
  return `docs/screens/${input.slug}.md`;
}

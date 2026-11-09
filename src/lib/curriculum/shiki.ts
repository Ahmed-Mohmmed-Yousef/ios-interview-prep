import { codeToHtml } from 'shiki';

export async function highlightCode(
  code: string,
  lang: string = 'swift'
): Promise<string> {
  const validLang = ['swift', 'json', 'bash', 'markdown', 'typescript'].includes(lang)
    ? lang
    : 'text';

  return codeToHtml(code, {
    lang: validLang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    defaultColor: false,
  });
}

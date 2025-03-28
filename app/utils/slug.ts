import type { Route } from '+/app/routes/($lang)/$/+types/_pages';

export function parseParamsToSlug(params: Route.ComponentProps['params']) {
  const { lang, '*': paths } = params;
  return [lang, paths].filter(Boolean).join('/');
}

const getCssVar = (varName: string, fallback: string) => {
  if (typeof window === 'undefined') return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || fallback;
};

export const CHART_COLORS = {
  get red() { return getCssVar('--red-color', '#ef5350'); },
  get orange() { return getCssVar('--orange-color', '#ffa726'); },
  get yellow() { return getCssVar('--yellow-color', '#ffee58'); },
  get green() { return getCssVar('--green-color', '#26a675'); },
  get blue() { return getCssVar('--blue-color', '#42a5f5'); },
  get purple() { return getCssVar('--purple-color', '#ab47bc'); },
  get gold() { return getCssVar('--secondary-color', '#C5A657'); },
  get gray() { return getCssVar('--gray-2-color', '#A8A6A3'); },
} as const;
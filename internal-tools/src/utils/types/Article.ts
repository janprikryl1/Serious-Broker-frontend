export type Article = {
  id: number;
  date: string;
  time: string;
  impact: 'low' | 'medium' | 'high';
  name: string;
  actual: string;
  forecast: string;
  previous: string;
}
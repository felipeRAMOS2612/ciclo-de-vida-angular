export interface Event {
  id?: number;
  date: string;
  title: string;
  category: string;
  description?: string;
  userId: number;
  color: string;
}
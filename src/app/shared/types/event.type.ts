export interface Event {
  id: number;
  date: string;
  category: string;
  description?: string;
  userId: number;
  color?: string;
}
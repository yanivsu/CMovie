export interface IMovie {
  id: number,
  name: string,
  rating: number,
  smallImage: string,
  posterImage: string,
  description?: string,
  date: string,
  budget?: number,
  income?: number,
  youtube?: string
}

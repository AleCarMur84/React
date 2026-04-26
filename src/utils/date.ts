import { differenceInDays } from 'date-fns'

export function diasEntreFechas(fecha1: Date, fecha2: Date): number {
  return differenceInDays(fecha1, fecha2)
}
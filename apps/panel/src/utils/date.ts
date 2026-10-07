import dayjs from 'dayjs'
import jalaliday from 'jalaliday/dayjs'

dayjs.extend(jalaliday)

export { dayjs }

export function formatDateTime(value: string | Date) {
  return dayjs(value)
    .calendar('jalali')
    .locale('fa')
    .format('YYYY/MM/DD HH:mm')
}

export function formatDate(value: string | Date) {
  return dayjs(value).calendar('jalali').locale('fa').format('YYYY/MM/DD')
}

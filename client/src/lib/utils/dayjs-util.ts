import dayjs from 'dayjs';

function formatYmdhm(date: string | Date): string {
  if(date == null) return "-"
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

function formatYmd(date: string | Date): string {
  return dayjs(date).format('YYYY-MM-DD')
}
export {
  formatYmdhm,
  formatYmd,
}

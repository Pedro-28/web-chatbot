import dayjs from "dayjs";

export function generateFormattedDate() {
  return dayjs().format('DD/MM/YYYY HH:mm');
}

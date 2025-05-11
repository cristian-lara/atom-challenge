import { formatDistanceToNow, format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';

export function getSmartDateText(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const days = differenceInDays(new Date(), date);
  if (days < 30) {
    return formatDistanceToNow(date, { addSuffix: true, locale: es });
  } else {
    return format(date, 'yyyy-MM-dd', { locale: es });
  }
} 
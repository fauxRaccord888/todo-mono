import { differenceInDays } from 'date-fns';

export const yyyymmdd = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  return `${year}/${month}/${day}`;
};

export const dueDateFormatter = (date: Date) => {
  const start = new Date();
  const diffDays = differenceInDays(date, start);
  if (diffDays < 0) return `${diffDays}일 지났어요!`;
  if (diffDays === 0) return '오늘까지!';
  return `${diffDays}일 남았어요!`;
};

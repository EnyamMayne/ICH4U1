export const getPrice = (date: string): number => {
  const year = new Date(date).getFullYear();
  const age = new Date().getFullYear() - year;
  return Math.max(19.99 - age, 4.99);
};
export const isValidDate = (date: string): boolean => {
  // checks if an already converted date (non-string) is valid.
  return !isNaN(Number(new Date(date)));
};

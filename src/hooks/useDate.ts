import { format } from 'date-fns';

export const useDate = () => {
  const formatDate = (date: string | Date): string => {
    const d = format(new Date(date), 'yyyy-MM-dd');
    return d;
  };

  return {
    formatDate,
  };
};

export default useDate;

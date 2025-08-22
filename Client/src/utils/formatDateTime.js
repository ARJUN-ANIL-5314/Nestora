import { format } from 'date-fns';

const formatDateTime = (dateString) => {
  try {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm:ss');
  } catch (error) {
    console.error('Invalid date:', dateString);
    return '-';
  }
};

export default formatDateTime;

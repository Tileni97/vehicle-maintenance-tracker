export const getStatusColor = (status) => {
  // Determines the CSS classes for text and background color based on the status.
  // status: A string representing the status ('overdue', 'due_soon', or others).
  switch(status) {
    case 'overdue': 
      // Returns red color classes for overdue status.
      return 'text-red-600 bg-red-50';
    case 'due_soon': 
      // Returns yellow color classes for due soon status.
      return 'text-yellow-600 bg-yellow-50';
    default: 
      // Returns green color classes for all other statuses.
      return 'text-green-600 bg-green-50';
  }
};

export const formatDate = (dateString) => {
  // Converts a date string into a localized date format.
  // dateString: A string representing a date (e.g., '2023-01-01').
  return new Date(dateString).toLocaleDateString();
  // Example output: '1/1/2023' (format depends on the user's locale).
};

export const formatNumber = (num) => {
  // Formats a number with commas as thousands separators.
  // num: A number to be formatted (e.g., 1234567).
  return num.toLocaleString();
  // Example output: '1,234,567' (format depends on the user's locale).
};
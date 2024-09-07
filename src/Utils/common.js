export const setDateFormat = (value, format = 'YYYY-MM-DD') => {
  if (value != null || value != undefined) {
    const d = new Date(value);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(d.getDate()).padStart(2, '0');

    // Format the date as 'YYYY-MM-DD'
    return `${year}-${month}-${day}`;
  } else {
    return value;
  }
}
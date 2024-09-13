async function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  
  async function getFutureDate(monthsToAdd) {
    const now = new Date();
    const futureDate = new Date(now);
    futureDate.setMonth(now.getMonth() + monthsToAdd);
    return formatDate(futureDate);
  }
  
  // Get the current date
//   const currentDate = new Date();
//   console.log('Current date:', formatDate(currentDate));
  
//   // Get the date 6 months from now
//   const dateIn6Months = getFutureDate(6);
//   console.log('Date in 6 months:', dateIn6Months);
  
//   // Get the date 3 months from now
//   const dateIn3Months = getFutureDate(3);
//   console.log('Date in 3 months:', dateIn3Months);
  

  module.exports = getFutureDate
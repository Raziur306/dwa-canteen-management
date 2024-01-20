export const dateFormatter = (date) => {
    const inputDate = new Date(date);
    return `${inputDate.getDate()}/${
      inputDate.getMonth() + 1
    }/${inputDate.getFullYear()}`;
  };
  
  export const formatTimeDistance = (targetTime) => {
    const currentTime = new Date();
    const targetDate = new Date(targetTime);
    const timeDifference = currentTime.getTime() - targetDate.getTime();
  
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days} ${days === 1 ? "day" : "days"}`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hr" : "hrs"}`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "min" : "mins"}`;
    } else {
      return "Just now";
    }
  };
  

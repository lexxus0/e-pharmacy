export const convertReviewDate = (dateString: string) => {
  const currentDate = new Date();
  const inputDateParts = dateString.split(".");
  const inputDate = new Date(
    `${inputDateParts[1]}/${inputDateParts[0]}/${inputDateParts[2]}`
  );

  const diffInMilliseconds = currentDate.getTime() - inputDate.getTime();
  const diffInSeconds = diffInMilliseconds / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;
  const diffInMonths = diffInDays / 30;
  const diffInYears = diffInMonths / 12;

  if (diffInYears >= 1) {
    const years = Math.floor(diffInYears);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (diffInMonths >= 1) {
    const months = Math.floor(diffInMonths);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (diffInDays >= 1) {
    const days = Math.floor(diffInDays);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (diffInHours >= 1) {
    const hours = Math.floor(diffInHours);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes >= 1) {
    const minutes = Math.floor(diffInMinutes);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${Math.floor(diffInSeconds)} second${
      Math.floor(diffInSeconds) > 1 ? "s" : ""
    } ago`;
  }
};

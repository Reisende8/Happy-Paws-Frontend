export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.match(emailRegex)) {
    return true;
  }
  return false;
};
export const isValidPassword = (password: string) => {
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[^\da-zA-Z]).{8,}$/;
  if (password.match(passwordRegex)) {
    return true;
  }
  return false;
};

// Calculate the next date
export const nextDate = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const nextDate = currentDate.toISOString().split("T")[0];
  return nextDate;
};

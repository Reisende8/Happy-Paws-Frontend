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

export const validateName = (name) => {
  if (name.trim().length === 0) return "Full Name is required.";
  return "";
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.trim().length === 0) return "Email is required.";
  if (!emailRegex.test(email)) return "Invalid email format.";
  return "";
};

export const validatePassword = (password) => {
  if (password.length < 6) return "Password must be at least 6 characters.";
  return "";
};

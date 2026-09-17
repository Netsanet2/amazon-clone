export function sanitizePhone(value) {
  const sanitized = value.replace(/[^0-9+()\-\s]/g, "");
  return sanitized.replace(/(?!^)\+/g, "");
}

export function isValidPhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15 && /^[0-9+()\-\s]+$/.test(value);
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPassword(value) {
  return value.length >= 7;
}

export const validationMessages = {
  phone: "Enter a valid phone number using 7 to 15 digits.",
  email: "Enter a valid email address, such as name@example.com.",
  password: "Password must be at least 7 characters.",
};

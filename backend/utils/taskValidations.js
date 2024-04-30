// Validate Text
const validateText = (text) => {
  if (!text) return "Text is missing";
  if (typeof text !== "string") return "Text must be a string";
  if (text.length > 50) return "Text must be 50 characters or less";
  return false;
};

module.exports = {
  validateText,
};

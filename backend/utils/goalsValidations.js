// Validate Title
const validateTitle = (title) => {
  if (!title) return "Title is missing";
  if (typeof title !== "string") return "Title must be a string";
  if (title.length > 30) return "Title must be 30 characters or less";
  return false;
};

// Validate Description
const validateDescription = (description) => {
  if (!description) return "Description is missing";
  if (typeof description !== "string") return "Description must be a string";
  if (description.length > 200)
    return "Description must be 200 characters or less";
  return false;
};

// Validate urgency
const validateUrgency = (urgency) => {
  if (!urgency) return "Urgency is missing";
  if (typeof urgency !== "string") return "Urgency must be a string";
  if (
    urgency.toUpperCase() !== "LOW" &&
    urgency.toUpperCase() !== "MEDIUM" &&
    urgency.toUpperCase() !== "HIGH"
  ) {
    return "Urgency must be LOW, MEDIUM or HIGH";
  }
  return false;
};

// Validate Title Update
const validateTitleUpdate = (title) => {
  if (typeof title !== "string") return "Title must be a string";
  if (title.length > 30) return "Title must be 30 characters or less";
  return false;
};

// Validate Description Update
const validateDescriptionUpdate = (description) => {
  if (typeof description !== "string") return "Description must be a string";
  if (description.length > 100)
    return "Description must be 100 characters or less";
  return false;
};

// Validate urgency update
const validateUrgencyUpdate = (urgency) => {
  if (typeof urgency !== "string") return "Urgency must be a string";
  if (
    urgency.toUpperCase() !== "LOW" &&
    urgency.toUpperCase() !== "MEDIUM" &&
    urgency.toUpperCase() !== "HIGH"
  ) {
    return "Urgency must be LOW, MEDIUM or HIGH";
  }
  return false;
};

function isValidObjectId(id) {
  // ObjectID consists of 24 hexadecimal characters (0-9, a-f)
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
}

module.exports = {
  validateTitle,
  validateDescription,
  validateUrgency,
  validateTitleUpdate,
  validateDescriptionUpdate,
  validateUrgencyUpdate,
  isValidObjectId,
};

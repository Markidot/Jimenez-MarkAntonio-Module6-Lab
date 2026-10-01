// Pure validation function: student number only
function isValidStudentNumber(value) {
  if (typeof value !== "string") {
    return false;
  }

  return /^\d{2}-\d{4}-\d{3}$/.test(value);
}

// Pure validation function: password only
function isValidPassword(value) {
  if (typeof value !== "string") {
    return false;
  }

  return /^(?=\S{8,}$)(?=.*[A-Z])(?=.*\d)(?=.*[@$!-]).+$/.test(value);
}

const form = document.getElementById("registrationForm");

const fullName = document.getElementById("fullName");
const studentNumber = document.getElementById("studentNumber");
const email = document.getElementById("email");
const mobileNumber = document.getElementById("mobileNumber");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const course = document.getElementById("course");
const terms = document.getElementById("terms");

const fullNameError = document.getElementById("fullNameError");
const studentNumberError = document.getElementById("studentNumberError");
const emailError = document.getElementById("emailError");
const mobileNumberError = document.getElementById("mobileNumberError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const courseError = document.getElementById("courseError");
const termsError = document.getElementById("termsError");

const passwordFeedback = document.getElementById("passwordFeedback");
const successMessage = document.getElementById("successMessage");
const registrationSummary = document.getElementById("registrationSummary");

const summaryName = document.getElementById("summaryName");
const summaryStudentNumber = document.getElementById("summaryStudentNumber");
const summaryEmail = document.getElementById("summaryEmail");
const summaryMobileNumber = document.getElementById("summaryMobileNumber");
const summaryCourse = document.getElementById("summaryCourse");

function setError(field, errorElement, message) {
  errorElement.textContent = message;
  if (message) {
    field.classList.add("invalid");
    field.setAttribute("aria-invalid", "true");
  } else {
    field.classList.remove("invalid");
    field.setAttribute("aria-invalid", "false");
  }
}

function validateFullName() {
  const value = fullName.value.trim();

  if (value.length < 2) {
    setError(fullName, fullNameError, "Enter at least two characters for your full name.");
    return false;
  }

  if (!/\S/.test(value)) {
    setError(fullName, fullNameError, "Full name cannot contain only spaces.");
    return false;
  }

  setError(fullName, fullNameError, "");
  return true;
}

function validateStudentNumber() {
  const value = studentNumber.value.trim();

  if (!isValidStudentNumber(value)) {
    setError(studentNumber, studentNumberError, "Enter a student number in the format 24-1234-123.");
    return false;
  }

  setError(studentNumber, studentNumberError, "");
  return true;
}

function validateEmail() {
  const value = email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(value)) {
    setError(email, emailError, "Enter a valid email such as student@email.com.");
    return false;
  }

  setError(email, emailError, "");
  return true;
}

function validateMobileNumber() {
  const value = mobileNumber.value.trim();
  const mobilePattern = /^(09\d{9}|\+639\d{9})$/;

  if (!mobilePattern.test(value)) {
    setError(mobileNumber, mobileNumberError, "Enter 09 followed by 9 digits or +639 followed by 9 digits.");
    return false;
  }

  setError(mobileNumber, mobileNumberError, "");
  return true;
}

function updatePasswordFeedback() {
  const value = password.value;

  if (value.length === 0) {
    passwordFeedback.textContent = "";
    return;
  }

  const checks = [
    value.length >= 8,
    /[A-Z]/.test(value),
    /\d/.test(value),
    /[@$!-]/.test(value),
    !/\s/.test(value)
  ];

  passwordFeedback.textContent = checks.every(Boolean)
    ? "Password meets all stated rules."
    : "Password needs 8+ characters, an uppercase letter, a digit, one of @, $, !, -, and no spaces.";
}

function validatePassword() {
  if (!isValidPassword(password.value)) {
    setError(password, passwordError, "Password must be 8+ characters with an uppercase letter, digit, @, $, !, or -, and no spaces.");
    return false;
  }

  setError(password, passwordError, "");
  return true;
}

function validateConfirmPassword() {
  if (confirmPassword.value !== password.value || confirmPassword.value === "") {
    setError(confirmPassword, confirmPasswordError, "Confirm password must match the password exactly.");
    return false;
  }

  setError(confirmPassword, confirmPasswordError, "");
  return true;
}

function validateCourse() {
  if (course.value !== "BSIT" && course.value !== "BSCS") {
    setError(course, courseError, "Please select BSIT or BSCS.");
    return false;
  }

  setError(course, courseError, "");
  return true;
}

function validateTerms() {
  if (!terms.checked) {
    termsError.textContent = "You must agree to the terms before registering.";
    terms.setAttribute("aria-invalid", "true");
    return false;
  }

  termsError.textContent = "";
  terms.setAttribute("aria-invalid", "false");
  return true;
}

function validateAll() {
  const results = [
    validateFullName(),
    validateStudentNumber(),
    validateEmail(),
    validateMobileNumber(),
    validatePassword(),
    validateConfirmPassword(),
    validateCourse(),
    validateTerms()
  ];

  return results.every(Boolean);
}

function clearOutput() {
  successMessage.textContent = "";
  registrationSummary.hidden = true;

  summaryName.textContent = "";
  summaryStudentNumber.textContent = "";
  summaryEmail.textContent = "";
  summaryMobileNumber.textContent = "";
  summaryCourse.textContent = "";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  clearOutput();

  const isValid = validateAll();

  if (!isValid) {
    return;
  }

  successMessage.textContent = "Registration details validated successfully!";

  // textContent is intentionally used for user-entered values.
  summaryName.textContent = fullName.value.trim();
  summaryStudentNumber.textContent = studentNumber.value.trim();
  summaryEmail.textContent = email.value.trim();
  summaryMobileNumber.textContent = mobileNumber.value.trim();
  summaryCourse.textContent = course.value;

  registrationSummary.hidden = false;
});

password.addEventListener("input", function () {
  updatePasswordFeedback();
  validatePassword();

  if (confirmPassword.value !== "") {
    validateConfirmPassword();
  }
});

fullName.addEventListener("input", validateFullName);
fullName.addEventListener("blur", validateFullName);

studentNumber.addEventListener("input", validateStudentNumber);
email.addEventListener("input", validateEmail);
mobileNumber.addEventListener("input", validateMobileNumber);
confirmPassword.addEventListener("input", validateConfirmPassword);

course.addEventListener("change", validateCourse);
terms.addEventListener("change", validateTerms);

form.addEventListener("reset", function () {
  window.setTimeout(function () {
    clearOutput();

    const fields = [
      fullName,
      studentNumber,
      email,
      mobileNumber,
      password,
      confirmPassword,
      course,
      terms
    ];

    fields.forEach(function (field) {
      field.classList.remove("invalid");
      field.setAttribute("aria-invalid", "false");
    });

    fullNameError.textContent = "";
    studentNumberError.textContent = "";
    emailError.textContent = "";
    mobileNumberError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    courseError.textContent = "";
    termsError.textContent = "";
    passwordFeedback.textContent = "";
  }, 0);
});

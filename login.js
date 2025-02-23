const emailInp = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");
const otpForm = document.querySelector(".otp-verification");
const form = document.getElementById("userDetails");
const otpInputs = document.querySelectorAll(".otp-inp");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = e.target.email;
  const phone = e.target.phoneNumber;
  const emailError = document.querySelector(".email-error-msg");
  const phoneError = document.querySelector(".phone-error-msg");
  emailError.textContent = "";
  phoneError.textContent = "";
  const emailPattern = /^[a-zA-Z0-9._%+-]+@marmeto\.com$/;
  const telPattern = /^\+91[0-9]{10}$/;
  if (!emailPattern.test(email.value) || email.value === "") {
    emailError.textContent = "Invalid Email Address";
  }
  if (!telPattern.test(phone.value) || phone.value === "") {
    phoneError.textContent = "Invalid phone number";
  }
  if (emailPattern.test(email.value) && telPattern.test(phone.value)) {
    document.querySelector("#sec-1").classList.add("hide");
    document.querySelector("#sec-2").classList.remove("hide");
  }
});

otpInputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value;
    console.log("value", value);
    // Check if the input is not empty and is a digit between 0 and 9
    if (value.length === 1 && (isNaN(value) || value < 0 || value > 9)) {
      e.target.value = ""; // Clear the input if invalid
      return; // Exit the function
    }

    if (value.length === 1 && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }
    if (value.length === 0 && index > 0) {
      otpInputs[index - 1].focus();
    }
  });
  input.addEventListener("paste", (e) => {
    const pastedData = e.clipboardData.getData("text");
    if (pastedData.length === 4) {
      otpInputs.forEach((inputField, i) => {
        inputField.value = pastedData[i] || ""; // Fill each input with the corresponding digit
        if (i < otpInputs.length - 1) {
          otpInputs[i + 1].focus(); // Move focus to the next input
        }
      });
    }
    e.preventDefault(); // Prevent the default paste behavior
  });
});

otpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const errorMessage = document.querySelector(".otp-error-msg");
  errorMessage.textContent = "";
  let enteredOtp = "";
  otpInputs.forEach((input) => {
    enteredOtp += input.value; // Concatenate the values of the inputs
  });

  // Check if the entered OTP matches the predefined OTP
  if (+enteredOtp !== 2025) {
    errorMessage.textContent = "Invalid OTP. Please try again.";
  } else {
    document.querySelector("#sec-2").classList.add("hide");
    document.querySelector("#sec-3").classList.remove("hide");
    document.querySelector(".userNameHeading").textContent = `Hey ${
      emailInp.value.split("@")[0]
    }`;
  }
});

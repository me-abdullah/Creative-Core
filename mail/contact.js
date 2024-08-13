function validateForm(event) {
  event.preventDefault(); // Prevent the default form submission

  let isValid = true;

  // Get the form fields
  const fname = document.getElementById("fname").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Clear previous error messages
  document.getElementById("nameError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("subjectError").innerText = "";
  document.getElementById("messageError").innerText = "";

  // Validate name
  if (fname === "") {
      document.getElementById("nameError").innerText = "Please enter your full name";
      isValid = false;
  }

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
      document.getElementById("emailError").innerText = "Please enter your Email Address";
      isValid = false;
  } else if (!emailPattern.test(email)) {
      document.getElementById("emailError").innerText = "Please enter a valid Email Address";
      isValid = false;
  }

  // Validate subject
  if (subject === "") {
      document.getElementById("subjectError").innerText = "Please enter your Subject";
      isValid = false;
  }

  // Validate message
  if (message === "") {
      document.getElementById("messageError").innerText = "Please enter your message";
      isValid = false;
  }

  if (isValid) {
      // Show success message
      document.getElementById("formSuccessMessage").style.display = "block";

      // Optionally, clear the form fields
      document.getElementById("contactForm").reset();
  }

  return isValid;
}
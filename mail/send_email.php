<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST['fname']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Email details
    $to = "h.abdullahsheikh568@gmail.com";
    $subject = "New Contact Form Submission: " . $subject;
    $body = "You have received a new message from your contact form.\n\n".
            "Here are the details:\n".
            "Name: $name\n".
            "Email: $email\n".
            "Subject: $subject\n".
            "Message:\n$message";
    
    $headers = "From: $email";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>
                document.getElementById('formSuccessMessage').style.display = 'block';
                document.getElementById('contactForm').reset();
              </script>";
    } else {
        echo "Sorry, something went wrong. Please try again later.";
    }
}
?>

import { FormEvent, useRef, useState } from "react";

import classes from "./newsletter-registration.module.css";
import { validateEmail } from "@/helpers/emailValidation";
import { useNotification } from "@/store/notification-provider";

function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [validationError, setValidationEror] = useState("");
  const { showNotification } = useNotification();

  async function registrationHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const isEmailValid = enteredEmail && validateEmail(enteredEmail);
    if (isEmailValid) {
      setValidationEror("");
      showNotification({
        title: "Registering...",
        message: "Registering for newsletter in progress.",
        status: "pending",
      });

      const rawResponse = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: enteredEmail }),
      });
      const content = await rawResponse.json();

      if (!rawResponse.ok) {
        showNotification({
          title: "Error!",
          message: content.message || "Something went wrong!",
          status: "error",
        });
        return;
      }

      showNotification({
        title: "Success!",
        message: "Successfully registered for newsletter :)",
        status: "success",
      });

      formRef.current?.reset();
    } else {
      setValidationEror("Invalid email address!");
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form ref={formRef} onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
      <div className={classes.error}>{validationError}</div>
    </section>
  );
}

export default NewsletterRegistration;

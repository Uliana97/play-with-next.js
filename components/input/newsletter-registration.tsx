import { FormEvent, useRef, useState } from "react";

import classes from "./newsletter-registration.module.css";
import { validateEmail } from "@/helpers/emailValidation";

function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [validationError, setValidationEror] = useState("");

  async function registrationHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const isEmailValid = enteredEmail && validateEmail(enteredEmail);
    if (isEmailValid) {
      setValidationEror("");

      const rawResponse = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: enteredEmail }),
      });
      const content = await rawResponse.json();
      console.log(content);
      emailInputRef.current.value === "";
    } else {
      setValidationEror("Invalid email address!");
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
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

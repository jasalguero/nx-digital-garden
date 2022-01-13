import { useState } from 'react';
import { validateEmail } from '../utils/functions';

export interface FormState {
  name: string;
  email: string;
  message: string;
}

const EMPTY_STATE = { name: '', email: '', message: '' };

export function Contact() {
  const [state, setState] = useState<FormState>(EMPTY_STATE);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(state),
      });

      //if sucess do whatever you like, i.e toast notification
      setTimeout(() => reset(), 2000);
    } catch (error) {
      // toast error message. whatever you wish
    }
  };

  const reset = () => {
    setState(EMPTY_STATE);
  };

  const isDisabled =
    !state.name ||
    state.name === '' ||
    !state.email ||
    !validateEmail(state.email) ||
    !state.message ||
    state.message === '';

  return (
    <form
      name="contact"
      method="post"
      action="/thanks/"
      onSubmit={handleSubmit}
    >
      {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
      <input
        type="hidden"
        name="form-name"
        value="contact"
        aria-label="Form Name"
      />
      <p hidden>
        <label>
          Don’t fill this out:{' '}
          <input
            id="name"
            name="bot-field"
            aria-label="Bot Field"
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <label>
          Your name:
          <br />
          <input
            type="text"
            name="name"
            aria-label="Your name"
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <label>
          Your email:
          <br />
          <input
            type="email"
            name="email"
            aria-label="Your email"
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <label>
          Message:
          <br />
          <textarea
            name="message"
            aria-label="Message"
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <button type="submit" aria-label="Submit Form" disabled={isDisabled}>
          SEND
        </button>
      </p>
    </form>
  );
}

export default Contact;

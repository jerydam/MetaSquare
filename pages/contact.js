/* eslint-disable */
import { Footer } from "../components";
import Navbar from "../components/Navbar";

const contact = () => {
  return (
    <div className="bck">
      <Navbar />
      <div className="container">
        <form
          className="form"
          action="https://formspree.io/f/mlekabld"
          method="POST"
        >
          <label className="label">
            Email:
            <br />
            <input className="input" type="email" name="email" />
          </label>
          <br />
          <br />
          <label className="label">
            Message:
            <br />
            <textarea className="textarea" name="message"></textarea>
          </label>
          <br />
          <br />

          <button className="button" type="submit">
            Send
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default contact;

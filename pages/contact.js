import Navbar from "../components/Navbar";

const contact = () => {
  return (
    <div>
      <form action="https://formspree.io/f/mlekabld" method="POST">
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Message:
          <textarea name="message"></textarea>
        </label>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default contact;

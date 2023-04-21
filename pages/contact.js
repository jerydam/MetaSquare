import Navbar from "../components/Navbar";

const contact = () => {
  return (
    <div>
      <form action="https://formspree.io/f/mlekabld" method="POST">
        <label>
          Email:<br/>
          <input type="email" name="email" />
        </label><br/><br/>
        <label>
          Message:<br/>
          <textarea name="message"></textarea>
        </label><br/><br/>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default contact;

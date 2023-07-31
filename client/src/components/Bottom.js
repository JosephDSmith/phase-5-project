import logo from "../assets/images/logo.png";

function Bottom() {
  return (
    <footer>
      <img src={logo} alt="image"/>

      <div className="social-media">
        <h3>Reach us on:</h3>
        <ul>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Twitter</li>
        </ul>
      </div>
    </footer>
  );
}

export default Bottom;
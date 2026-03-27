import { Link } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="navbar">
      <header>
        <nav>
          <h2>Realworld Blog</h2>
          <Link to="/">Home</Link>
          {!user && (
            <>
              <Link to="sign-in">Sign In</Link>
              <Link to="sign-up">Sign Up</Link>
            </>
          )}

          {user && (
            <>
              <Link to="">
                <RiPencilFill style={{ color: "#61BB61" }} /> New Post
              </Link>
              <Link to="setting">
                <IoMdSettings style={{ color: "#61BB61" }} />
                Setting
              </Link>
              <Link to="">Profile</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}

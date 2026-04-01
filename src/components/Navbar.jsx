import { Link } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa6";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

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
              <Link to="new-post">
                <RiPencilFill style={{ color: "#61BB61" }} /> New Post
              </Link>
              <Link to="settings">
                <IoMdSettings style={{ color: "#61BB61" }} />
                Settings
              </Link>
              <Link to={`profile/${user.username}`}>
                <FaUser style={{ color: "#61BB61" }} />
                {user.username}
              </Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}

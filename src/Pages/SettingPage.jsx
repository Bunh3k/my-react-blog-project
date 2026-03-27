import { useNavigate } from "react-router-dom";

export default function SettingPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="setting-page">
      <h1>Setting</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

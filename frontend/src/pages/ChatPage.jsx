import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Chat } from "../components/Chat";

export function ChatPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <header style={styles.header}>
        <span style={styles.logo}>⚓ NavalMaint AI</span>
        <span style={styles.vessel}>Guardamar Talía</span>
        <button style={styles.logout} onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Chat />
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#112240",
    borderBottom: "1px solid #233554",
  },
  logo: {
    color: "#64ffda",
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  vessel: {
    color: "#8892b0",
    fontSize: "0.9rem",
  },
  logout: {
    backgroundColor: "transparent",
    border: "1px solid #233554",
    color: "#8892b0",
    padding: "0.4rem 0.8rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
};
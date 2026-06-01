import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!token) {
      setError("Introduce un token");
      return;
    }
    login(token);
    navigate("/chat");
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>⚓ NavalMaint AI</h1>
        <p style={styles.subtitle}>Asistente de mantenimiento naval</p>
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Token de acceso</label>
            <input
              style={styles.input}
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="demo-token-12345"
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.button} type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0a1628",
  },
  card: {
    backgroundColor: "#112240",
    padding: "2rem",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  },
  title: {
    color: "#64ffda",
    textAlign: "center",
    marginBottom: "0.5rem",
    fontSize: "1.8rem",
  },
  subtitle: {
    color: "#8892b0",
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "0.9rem",
  },
  field: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    color: "#ccd6f6",
    marginBottom: "0.4rem",
    fontSize: "0.9rem",
  },
  input: {
    width: "100%",
    padding: "0.7rem",
    borderRadius: "6px",
    border: "1px solid #233554",
    backgroundColor: "#0a1628",
    color: "#ccd6f6",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  error: {
    color: "#ff6b6b",
    fontSize: "0.85rem",
    marginBottom: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.8rem",
    backgroundColor: "#64ffda",
    color: "#0a1628",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
};
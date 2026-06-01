import { useState, useRef, useEffect } from "react";
import { auth } from "../api/auth";

export function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hola, soy NavalMaint AI. Puedo ayudarte con el plan de mantenimiento del Guardamar Talía. ¿En qué puedo ayudarte?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const sessionId = useRef(`session-${Date.now()}`);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setError("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/chat/stream`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getToken()}`,
          },
          body: JSON.stringify({
            message: userMessage,
            session_id: sessionId.current,
          }),
        }
      );

      if (!response.ok) throw new Error("Error en la respuesta del servidor");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            const text = data.replace(/\\n/g, "\n");
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: "assistant",
                content: updated[updated.length - 1].content + text,
              };
              return updated;
            });
          }
        }
      }
    } catch (err) {
      setError("Error de conexión. ¿Está el servidor arrancado?");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              ...(msg.role === "user" ? styles.userMsg : styles.assistantMsg),
            }}
          >
            <span style={styles.role}>
              {msg.role === "user" ? "Tú" : "⚓ NavalMaint AI"}
            </span>
            <p style={styles.content}>
              {msg.content || (loading && i === messages.length - 1 ? "▌" : "")}
            </p>
          </div>
        ))}
        {error && <p style={styles.error}>{error}</p>}
        <div ref={bottomRef} />
      </div>
      <div style={styles.inputArea}>
        <textarea
          style={styles.textarea}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pregunta sobre el mantenimiento del Guardamar Talía..."
          disabled={loading}
          rows={2}
        />
        <button
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
          }}
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#0a1628",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  message: {
    padding: "1rem",
    borderRadius: "10px",
    maxWidth: "75%",
  },
  userMsg: {
    backgroundColor: "#1e3a5f",
    alignSelf: "flex-end",
    border: "1px solid #2d5a8e",
  },
  assistantMsg: {
    backgroundColor: "#112240",
    alignSelf: "flex-start",
    border: "1px solid #233554",
  },
  role: {
    fontSize: "0.75rem",
    color: "#64ffda",
    fontWeight: "bold",
    display: "block",
    marginBottom: "0.3rem",
  },
  content: {
    color: "#ccd6f6",
    margin: 0,
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
  },
  error: {
    color: "#ff6b6b",
    textAlign: "center",
    fontSize: "0.9rem",
  },
  inputArea: {
    display: "flex",
    gap: "0.75rem",
    padding: "1rem",
    backgroundColor: "#112240",
    borderTop: "1px solid #233554",
  },
  textarea: {
    flex: 1,
    padding: "0.7rem",
    borderRadius: "8px",
    border: "1px solid #233554",
    backgroundColor: "#0a1628",
    color: "#ccd6f6",
    fontSize: "1rem",
    resize: "none",
    fontFamily: "inherit",
  },
  button: {
    padding: "0 1.5rem",
    backgroundColor: "#64ffda",
    color: "#0a1628",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
  },
};
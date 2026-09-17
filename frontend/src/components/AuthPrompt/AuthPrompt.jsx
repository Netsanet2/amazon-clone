import { useNavigate } from "react-router-dom";
import "./AuthPrompt.css";

function AuthPrompt({ title, message, destination, onCancel, modal = false, compact = false }) {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login", {
      state: { from: destination || { pathname: "/account" } },
    });
  };

  return (
    <div className={`auth-prompt ${modal ? "auth-prompt-modal" : ""} ${compact ? "auth-prompt-compact" : ""}`} role="dialog" aria-modal={modal} aria-labelledby="auth-prompt-title">
      <div className="auth-prompt-card">
        <h2 id="auth-prompt-title">{title}</h2>
        <p>{message}</p>
        <div className="auth-prompt-actions">
          <button type="button" className="auth-prompt-sign-in" onClick={handleSignIn}>Sign in</button>
          {onCancel && <button type="button" className="auth-prompt-cancel" onClick={onCancel}>Cancel</button>}
        </div>
      </div>
    </div>
  );
}

export default AuthPrompt;
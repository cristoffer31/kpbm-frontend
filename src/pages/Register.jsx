import React, { useState, useContext } from "react";
import "./Auth.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setOk("");

    try {
      await register(nombre, email, password, telefono);
      setOk("¡Registro exitoso! Redirigiendo al login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Error de registro:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("No se pudo completar el registro.");
      }
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* LOGO KPBM */}
        <img src="/kpbm_logo.PNG" alt="KPBM" className="auth-logo" />

        <h2>Crear Cuenta</h2>
        <p>Únete a la familia KPBM</p>

        {error && <div className="auth-error">{error}</div>}
        {ok && <div className="auth-ok">{ok}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Nombre completo"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Teléfono (Celular)"
            required
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="auth-btn">
            Registrarme
          </button>
        </form>

        <div className="auth-footer-text">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}
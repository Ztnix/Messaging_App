import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const { setUser } = useAuth();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  function onChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(null);

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const body = await res.json().catch(() => "Incorrect Credentials");

      if (!res.ok) {
        setMsg(body.errors || body.error || "Incorrect Credentials");
        return;
      }
      setUser(body.user);
      navigate(body.redirect || "/home");
    } catch (err) {
      console.log(err);
      setMsg("Network error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full space-y-4  text-black">
      <div className="flex flex-col gap-2">
        <label className="block font-bold">Username</label>
        <input
          name="username"
          value={form.username}
          onChange={onChange}
          className="border px-2 py-1 w-full  rounded-md"
          placeholder="Enter username"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="block font-bold">Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          className="border px-2 py-1 w-full   rounded-md"
          placeholder="********"
        />
      </div>

      <button
        type="submit"
        className="bg-linear-to-t from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 transition-colors duration-200 text-white px-4 py-2 rounded w-full mt-2"
      >
        Login
      </button>
      {msg && (
        <div className="text-red-600 mt-2">
          {Array.isArray(msg) ? (
            msg.map((mes, i) => <p key={i}>{mes?.msg ?? mes}</p>)
          ) : (
            <p>
              {typeof msg === "object"
                ? msg.error || msg.message || JSON.stringify(msg)
                : msg}
            </p>
          )}
        </div>
      )}
    </form>
  );
}

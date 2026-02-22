import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const errors = useMemo(() => validate(form), [form]);

  const canSubmit = Object.keys(errors).length === 0 && !submitting;

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setServerError("");
  }

  function onBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    setTouched({ name: true, email: true, password: true, confirmPassword: true });

    const currentErrors = validate(form);
    if (Object.keys(currentErrors).length > 0) return;

    try {
      setSubmitting(true);
      setServerError("");

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          data?.message ||
          (Array.isArray(data?.errors) ? data.errors.join(", ") : null) ||
          "Registration failed. Please try again.";
        setServerError(msg);
        return;
      }

    
      navigate("/login", { replace: true, state: { registeredEmail: form.email } });
    } catch (err) {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold text-slate-900">Create your account</h1>
        <p className="text-slate-600 mt-1">
          Join ClubHub and start exploring campus orgs.
        </p>

        {serverError ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {serverError}
          </div>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
          <Field
            label="Name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={onChange}
            onBlur={onBlur}
            error={touched.name ? errors.name : ""}
            placeholder="Jaida Calvin"
          />

          <Field
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={onChange}
            onBlur={onBlur}
            error={touched.email ? errors.email : ""}
            placeholder="you@school.edu"
          />

          <Field
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={onChange}
            onBlur={onBlur}
            error={touched.password ? errors.password : ""}
            placeholder="At least 8 characters"
          />

          <Field
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={onChange}
            onBlur={onBlur}
            error={touched.confirmPassword ? errors.confirmPassword : ""}
            placeholder="Re-enter your password"
          />

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-xl px-4 py-3 font-medium text-white bg-slate-900 disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating account..." : "Create account"}
          </button>

          <p className="text-sm text-slate-600 text-center">
            Already have an account?{" "}
            <Link className="text-slate-900 font-medium underline" to="/login">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      <input
        className={`mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${
          error
            ? "border-red-300 focus:ring-red-200"
            : "border-slate-200 focus:ring-slate-200"
        }`}
        {...props}
      />
      {error ? <p className="mt-1 text-xs text-red-700">{error}</p> : null}
    </div>
  );
}

function validate(form) {
  const e = {};

  if (!form.name.trim()) e.name = "Name is required.";

  if (!form.email.trim()) e.email = "Email is required.";
  else if (!EMAIL_RE.test(form.email.trim())) e.email = "Enter a valid email address.";

  if (!form.password) e.password = "Password is required.";
  else if (form.password.length < 8) e.password = "Password must be at least 8 characters.";

  if (!form.confirmPassword) e.confirmPassword = "Please confirm your password.";
  else if (form.confirmPassword !== form.password)
    e.confirmPassword = "Passwords do not match.";

  return e;
}

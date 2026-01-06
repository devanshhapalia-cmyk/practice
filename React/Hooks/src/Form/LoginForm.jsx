import useForm   from "./useForm";

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
}

export default function LoginForm() {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useForm(
    { email: "", password: "" },
    validate
  );

  const submit = (values) => {
    alert("Logged in successfully!");
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <h2>Login</h2>

      <div>
        <input
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      <button disabled={isSubmitting}>Login</button>
    </form>
  );
}

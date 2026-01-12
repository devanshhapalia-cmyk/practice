import { useForm } from "react-hook-form";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: { value: 4, message: "Min 4 characters" },
          maxLength: { value: 12, message: "Max 12 characters" },
          pattern: { value: /^[A-Za-z]+$/, message: "Only letters allowed" },
        })}
        placeholder="Username"
      />

      {errors.username &&
        Object.values(errors.username.types).map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}

      <button type="submit">Submit</button>
    </form>
  );
}

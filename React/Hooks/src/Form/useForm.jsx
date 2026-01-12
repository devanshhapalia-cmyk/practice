import { useEffect, useState } from "react";

export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle form submit
  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors(validate(values));
  };

  // EFFECT: submit form only if no errors
  useEffect(() => {
    if (isSubmitting && Object.keys(errors).length === 0) {
      console.log("Form submitted:", values);
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting, values]);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
  };
}

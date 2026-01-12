import { useInsertionEffect } from "react";

export default function StyleInjector({ css }) {
  useInsertionEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [css]);

  return null;
}

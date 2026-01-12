import { useRef } from "react";
import AmountInput from "./AmountInput";

function CheckoutForm() {
  const amountRef = useRef(null);

  return (
    <>
      <AmountInput ref={amountRef} />

      <button onClick={() => amountRef.current.focus()}>
        Focus
      </button>

      <button onClick={() => amountRef.current.clear()}>
        Clear
      </button>
    </>
  );
}
export default CheckoutForm;

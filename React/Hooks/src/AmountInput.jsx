import { forwardRef, useImperativeHandle, useRef } from "react";

const AmountInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },

    clear() {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
  }));

  return (
    <div>
      <label>Amount</label>
      <input ref={inputRef} />
    </div>
  );
});

export default AmountInput;

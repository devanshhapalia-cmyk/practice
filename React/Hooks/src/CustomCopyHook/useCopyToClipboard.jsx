import { useState } from "react";
import copy from "copy-to-clipboard";

export default function useCopyToClipboard(resetInterval = null) {
  const [isCopied, setCopied] = useState(false);

  function handleCopy(text) {
    if (text === undefined || text === null) {
      console.error("Nothing to copy");
      return;
    }

    const copied = copy(String(text));

    if (copied) {
      setCopied(true);

      if (resetInterval) {
        setTimeout(() => setCopied(false), resetInterval);
      }
    }
  }

  return [isCopied, handleCopy];
}

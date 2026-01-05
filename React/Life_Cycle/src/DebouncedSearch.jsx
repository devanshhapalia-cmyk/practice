//Debouncing runs a function only after the user stops triggering an event for a specified time.
import { useEffect, useState } from "react";

function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        console.log("API call for:", query);
        setResult([query]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>Result: {result}</p>
    </>
  );
}
export default DebouncedSearch;

// Best Use Cases

// Search input (API calls)

// Form validation

// Auto-save drafts

// Window resize (when final value matters)
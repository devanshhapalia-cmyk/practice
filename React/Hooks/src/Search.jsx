import { useTransition, useState } from "react";

function Search() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    const value = e.target.value;

    // Urgent update (input)
    setQuery(value);

    // Non-urgent update
    startTransition(() => {
      setQuery(value);
    });
  }

  return (
    <>
      <input onChange={handleChange} />
      {isPending && <p>Loading...</p>}
      <HeavyList query={query} />
    </>
  );
}
export default Search;

function HeavyList({ query }) {
  // Simulate heavy computation
  const items = [];
  for (let i = 0; i < 10000; i++) {
    items.push(`Item ${i} - ${query}`);
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
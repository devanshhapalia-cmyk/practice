// Usage
// Showing stale content while fresh content is loading
// Indicating that the content is stale
// Deferring re-rendering for a part of the UI

import { useState, useDeferredValue } from "react";

export default function UseDeferredHooks() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const isStale = query !== deferredQuery;

  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);
  return (
    <div style={{ padding: 20 }}>
      <h2>useDeferredValue Demo</h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type fast..."
      />

      <p>Immediate value: {query}</p>

      {isStale && <p style={{ color: "orange" }}>Updating deferred value…</p>}

      {/* <SlowList query={deferredQuery} /> */}
        <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={deferredText} />
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={text} />
    </div>
  );
}
import { memo } from 'react';

const SlowList = memo(function SlowList({ text }) {
  // Log once. The actual slowdown is inside SlowItem.
  console.log('[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />');

  let items = [];
  for (let i = 0; i < 250; i++) {
    items.push(<SlowItem key={i} text={text} />);
  }
  return (
    <ul className="items">
      {items}
    </ul>
  );
});

function SlowItem({ text }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 100) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return (
    <li className="item">
      Text: {text}
    </li>
  )
}


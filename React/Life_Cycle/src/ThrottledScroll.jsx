import { useEffect, useRef } from "react";
//Throttling allows a function to run once every X milliseconds, no matter how often the event fires.
function ThrottledScroll() {
  const lastRun = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();

      if (now - lastRun.current >= 1000) {
        console.log("Scroll event fired");
        lastRun.current = now;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <p>Scroll and check console</p>;
}
export default ThrottledScroll

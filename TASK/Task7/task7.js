const output = document.getElementById("output");

    const urls = [
      "https://jsonplaceholder.typicode.com/users/1",
      "https://jsonplaceholder.typicode.com/posts/1",
      "https://jsonplaceholder.typicode.com/comments/2",
      "https://jsonplaceholder.typicode.com/todos/1",
      "https://jsonplaceholder.typicode.com/albums/1"
    ];

    async function stopOnFail() {

      const controller = new AbortController();

      try {
        const results = await Promise.all(
          urls.map(url =>
            fetch(url, { signal: controller.signal })
              .then(res => {
                if (!res.ok) {
                  throw new Error(`Failed API → ${url}`);
                }
                return res.json();
              })
          )
        );

        output.textContent = JSON.stringify(results);

      } catch (err) {
        controller.abort();
        output.innerHTML = `<span>${err.message}</span>`;
      }
    }

    async function runAll() {

      const results = await Promise.allSettled(
        urls.map(url =>
          fetch(url)
            .then(res => {
              if (!res.ok) {
                throw new Error(`Failed API → ${url}`);
              }
              return res.json();
            })
        )
      );

      output.textContent = JSON.stringify(results, null, 2);
    }
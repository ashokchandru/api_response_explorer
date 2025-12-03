document.getElementById("sendBtn").addEventListener("click", async () => {
  const url = document.getElementById("apiUrl").value.trim();
  if (!url) return alert("Please enter a valid API URL.");

  const prettyJsonEl = document.getElementById("prettyJson");
  const rawJsonEl = document.getElementById("rawJson");
  const headersEl = document.getElementById("headers");
  const summaryEl = document.getElementById("summary");

  prettyJsonEl.textContent = "Loading...";
  rawJsonEl.textContent = "Loading...";
  headersEl.textContent = "Loading...";

  const start = performance.now();
  
  try {
    const response = await fetch(url);
    const end = performance.now();
    const timeTaken = Math.round(end - start);

    const text = await response.text();
    let jsonPretty = "";
    
    try {
      jsonPretty = JSON.stringify(JSON.parse(text), null, 2);
    } catch {
      jsonPretty = "Not a JSON response.";
    }

    // Display pretty JSON
    prettyJsonEl.textContent = jsonPretty;

    // Display raw
    rawJsonEl.textContent = text;

    // Display headers
    let headersText = "";
    response.headers.forEach((v, k) => {
      headersText += `${k}: ${v}\n`;
    });
    headersEl.textContent = headersText;

    // Summary info
    document.getElementById("statusCode").textContent = response.status;
    document.getElementById("responseTime").textContent = timeTaken;
    document.getElementById("responseSize").textContent =
      (text.length / 1024).toFixed(2);

    summaryEl.classList.remove("hidden");

  } catch (err) {
    prettyJsonEl.textContent = "Error fetching API.";
    rawJsonEl.textContent = err.toString();
    headersEl.textContent = "";
  }
});

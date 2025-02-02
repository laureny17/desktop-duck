const { initializeDuck, moveDuck } = require("./components/duckLogic.js");
const { countWindows } = require("./components/windowCounter.js");

// Start everything when the page loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded - starting window counting");
  countWindows();
  setInterval(countWindows, 2500); // check every 2.5 seconds
  initializeDuck();

  const duck = document.getElementById("duck");
  setInterval(() => moveDuck(duck), 100); // check movement every 0.1 seconds
});

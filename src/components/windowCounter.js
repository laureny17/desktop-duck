const { desktopCapturer } = require("@electron/remote");
const { updateEnergyLevel } = require("./duckLogic.js");

let currentWindowCount = 0;

async function countWindows() {
  try {
    const sources = await desktopCapturer.getSources({
      types: ["window"],
      thumbnailSize: { width: 1, height: 1 },
      fetchWindowIcons: false,
    });

    const windowCount = sources.length;

    if (windowCount !== currentWindowCount) {
      console.log(
        `Window count changed from ${currentWindowCount} to ${windowCount}`
      );
      currentWindowCount = windowCount;
      updateEnergyLevel(windowCount);
    }
    return currentWindowCount;
  } catch (error) {
    console.error("Error counting windows:", error);
    return currentWindowCount;
  }
}

module.exports = {
  countWindows,
};

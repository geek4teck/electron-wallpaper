const { app, BrowserWindow } = require("electron");
const path = require("path");
let wallpapers = [];
let currentWallpaper = 0;
function loadWallpapers() {
  const testFolder = "./wallpapers/";
  const fs = require("fs");

  fs.readdir(testFolder, (err, files) => {
    files.forEach((file) => {
     wallpapers.push(file);
    });
  });
  setInterval(() =>{
    repeat();
  },60000);
}

const repeat = () => {
  currentWallpaper++;
  if (currentWallpaper >= wallpapers.length)
  currentWallpaper = 0;
  const wallpaper = require("wallpaper");
  (async () => {
    await wallpaper.set('./wallpapers/' + wallpapers[currentWallpaper]);
  })();
};
app.whenReady().then(loadWallpapers);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) loadWallpapers();
});

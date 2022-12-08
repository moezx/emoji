import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import { execSync } from "child_process";

const target = path.join(__dirname, "skype");

const fragment = fs.readFileSync(
  path.join(__dirname, "skype.html"),
  "utf-8"
);

const { document } = new JSDOM(fragment).window;

const images = document.querySelectorAll(".emoji-grid img");

images.forEach((image, index) => {
  const src = image.getAttribute("src");
  const alt = image.getAttribute("alt");
  const unicode = src?.match(/_([a-zA-Z0-9\-]*)/)?.[1];

  if (!unicode) return;

  console.log(`[${index + 1} / ${images.length}]`, alt, src);
  execSync(`wget ${src} -O ${path.join(target, unicode)}.png`, {
    stdio: "pipe",
  });
});

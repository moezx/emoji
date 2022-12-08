import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import { execSync } from "child_process";

const target = path.join(__dirname, "skype");

const fragment = fs.readFileSync(path.join(__dirname, "skype.html"), "utf-8");

const { document } = new JSDOM(fragment).window;

const images = document.querySelectorAll(".emoji-grid img");

for (let i = 0; i < images.length; i++) {
  const image = images[i];
  const src = image.getAttribute("data-src") || image.getAttribute("src");
  const alt = image.getAttribute("alt");
  const unicode = src?.match(/_([a-zA-Z0-9\-]*)/)?.[1];

  if (!unicode) {
    console.error("No unicode found for", src);
    continue;
  }


  if (i < 1424) continue;

  console.log(`[${i + 1} / ${images.length}]`, alt, src);

  execSync(`wget ${src} -O ${path.join(target, unicode)}.png`, {
    stdio: "pipe",
  });
}

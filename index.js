import fs from "fs-extra";
import axios from "axios";
import { getImageSize } from "./getImageSize.js";
import { time, log } from "./log.js";

// start timer
const endTime = time();

const XKCD_INITIAL_COMIC_ID = 2600;
const XKCD_LATEST_COMIC_ID = 2665;

for (let index = XKCD_INITIAL_COMIC_ID; index < XKCD_LATEST_COMIC_ID; index++) {
  // get data from xkcd
  const url = `https://xkcd.com/${index}/info.0.json`;
  log(`Getting data from ${url}`);
  const { data } = await axios.get(url);

  // handle data
  const { num, news, transcript, img, ...restOfProperties } = data;
  log(`Fetched comic #${num}. Getting image dimensions...`);
  // we need to use await here because getImageSize returns a promise
  const { height, width } = await getImageSize({ url: img });
  log(`Image dimensions: ${width}x${height}`);
  const comicToSave = {
    index,
    img,
    height,
    width,
    ...restOfProperties,
  };

  // save data
  const jsonFile = `./comics/${index}.json`;
  await fs.writeJSON(jsonFile, comicToSave);
  log(`Wrote ${jsonFile}! ✔\n`);
}

// cut the counter
endTime();

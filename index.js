import fs from "fs-extra";
import axios from "axios";
import { getImageSize } from "./getImageSize.js";
import { time, log } from "./log.js";

// start timer
const endTime = time();

const XKCD_INITIAL_COMIC_ID = 2700;
const XKCD_LATEST_COMIC_ID = 2735;

// index file for algolia
const indexFile = [];

for (let id = XKCD_INITIAL_COMIC_ID; id < XKCD_LATEST_COMIC_ID; id++) {
  // get data from xkcd
  const url = `https://xkcd.com/${id}/info.0.json`;
  log(`Getting data from ${url}`);
  const { data } = await axios.get(url);

  // handle data
  const { num, news, transcript, img, ...restOfProperties } = data;
  log(`Fetched comic #${num}. Getting image dimensions...`);
  // we need to use await here because getImageSize returns a promise
  const { height, width } = await getImageSize({ url: img });
  log(`Image dimensions: ${width}x${height}`);
  const comicToSave = {
    id,
    img,
    height,
    width,
    ...restOfProperties,
  };

  // write data
  indexFile.push(comicToSave);

  const jsonFile = `./comics/${id}.json`;
  await fs.writeJSON(jsonFile, comicToSave);
  log(`Wrote ${jsonFile}! ✔\n`);
}

// write index file for algolia
await fs.writeJSON("./index/index.json", indexFile);
log(`Wrote index content! ✔\n`);

// cut the counter
endTime();

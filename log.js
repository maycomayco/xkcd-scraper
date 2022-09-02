const LOG_PREFFIX = "[🤤 scrapper] ";

export const log = (...args) => console.log(LOG_PREFFIX, ...args);

export const time = (string = "") => {
  console.time(`${LOG_PREFFIX}${string}`);
  return () => console.timeEnd(`${LOG_PREFFIX}${string}`);
};

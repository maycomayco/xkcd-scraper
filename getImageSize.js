/*
	getImageSize.js
	Module to get the size of an image though its URL
*/
// import { parse } from "url";
import { get } from "https";

import sizeOf from "image-size";

export const getImageSize = ({ url }) => {
  // el metodo devuelve una promesa, y la promesa se resuelve en el metodo 'end' de la respuesta
  return new Promise((resolve) => {
    // http.get() from node
    get(url, (response) => {
      // va leyendo informacion de la imagen y la va gurdando dentro de chunks (pedazos, bytes)
      const chunks = [];
      response
        .on("data", (chunk) => {
          chunks.push(chunk);
        })
        .on("end", () => {
          // cuando la finaliza el proceso lo convierte a un buffer
          const buffer = Buffer.concat(chunks);
          const { height, width } = sizeOf(buffer);
          // la promesa se resuelve con el tamaño de la imagen y se retorna
          resolve({ height, width });
        });
    });
  });
};

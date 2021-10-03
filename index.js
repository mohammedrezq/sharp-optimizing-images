const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const directoryName = "original";

const fileNames = fs.readdirSync(directoryName);

fileNames.forEach((file) => {

  const fileFormat = getExtension(file);

  if (fileFormat === "svg") {
    console.log("SVGs are not processed in this script at the moment");
    return;
  }

  let sh = sharp("./original/" + file);

  if (fileFormat === "jpg" || fileFormat === "jpeg") {
    sh = sh.jpeg({ quality: 70 }).resize({
      width: 350,
      height: 450,
    });
  } else if (fileFormat === "png") {
    sh = sh.png({ quality: 70 }).resize({
      width: 350,
      height: 450,
    });
  }

  console.log('output/' + file);

  sh.toFile('output/' + file, function (err, info) {
    // console.log(info);
    if(err) {
      console.log(err + "Error occurred while optimization process")
    }
  })
});

function getExtension(filename) {
  let ext = path.extname(filename || "").split(".");

  return ext[ext.length - 1];
}

// async function optimizeImage() {
//   try {
//     const image = await sharp("./original/university.jpg")
//       .resize({ width: 6500, height: 4800 })
//       .webp({
//         quality: 10,
//       })
//       .toFile("./output/gfddsg4500.webp");
//   } catch (error) {
//     console.log(error);
//   }
// }

// optimizeImage();

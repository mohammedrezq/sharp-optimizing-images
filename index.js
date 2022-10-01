const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const directoryName = "images";

const fileNames = fs.readdirSync(directoryName);

fileNames.forEach((file) => {

  const fileFormat = getExtension(file);

  console.log("fileFormat", fileFormat)
  if (fileFormat === "svg") {
    console.log("SVGs are not processed in this script at the moment");
    return;
  }


  let sh = sharp("./images/" + file);

  if(fileFormat == 'jpg') {
    sh.jpeg({
      quality: 80,
      progressive: true,
    }).resize(
      {
        fit:  sharp.fit.contain,
        width: 900,
      }
    ).flip(true)
  } else if ('png' === fileFormat) {
    sh.png({
      quality: 80,
      progressive: true,
    }).resize(
      {
        fit:  sharp.fit.contain,
        width: 900,
      }
    )
  }

  // sh.png({
    
  // })
  // sh.webp({lossless:true, quality: 80, alphaQuality: 100, force: true}).resize(
  //   {fit: sharp.fit.contain, width: 700}
  // )

  // if (fileFormat === "jpg" || fileFormat === "jpeg") {
  //   sh = sh.jpeg({ quality: 70 }).resize({
  //     width: 350,
  //     height: 450,
  //   });
  // } else if (fileFormat === "png") {
  //   sh = sh.png({ quality: 70 }).resize({
  //     width: 350,
  //     height: 450,
  //   });
  // }

  console.log('output/' + file);
  let fileNameWOExtension = file.replace(/\.[^/.]+$/, "");

  console.log(fileNameWOExtension);


  sh.toFile('output/' + `${file}`, function (err, info) {
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
//     const image = await sharp("./images/university.jpg")
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

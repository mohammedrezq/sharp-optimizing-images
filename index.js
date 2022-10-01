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

  if( 'jpg' == fileFormat ) {
    sh.jpeg({
      quality: 80,
      progressive: true,
    }).resize(
      {
        fit:  sharp.fit.contain,
        width: 900,
      }
    )
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
  } else if('webp' === fileFormat){
    sh.webp({lossless:true, quality: 80, alphaQuality: 100, force: true}).resize(
        {fit: sharp.fit.contain, width: 900}
      )
  }


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

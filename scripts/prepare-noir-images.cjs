const sharp = require('sharp');
const path = require('node:path');
const photos = [
  ['exec-05eddb52-d043-41b4-8eb9-94c6478f6c16.png','imagination'],
  ['exec-234e0afe-c82c-44dc-a63b-858d99645b30.png','tygar'],
  ['exec-b3eff897-0965-44b7-8089-d3898cce1621.png','hedonistic'],
  ['exec-92749a07-09d0-4b25-9e5c-8fe5143c6a50.png','absolu'],
  ['exec-86d9a4f1-f352-4dbb-b59e-5cbb4f868e2c.png','pheramone']
];
Promise.all(photos.map(async ([source,name])=>{
  const result = await sharp(path.join('/workspace/generated_images',source)).resize({width:850,withoutEnlargement:true}).webp({quality:86}).toFile(path.join(__dirname,`../assets/${name}.webp`));
  console.log(`${name}: ${Math.round(result.size/1024)} KB`);
})).catch(error=>{console.error(error);process.exitCode=1;});

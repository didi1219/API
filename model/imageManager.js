import sharp from 'sharp';


export const saveImage = (imageBuffer, imageName, desFolder) => {
    const imagePath = `${imageName}.jpeg`;
    return sharp(imageBuffer)
        .jpeg({ quality: 75 })
        .resize({
            fit: 'inside',
            width: 1920,
            height: 1080
        })
        .toFile(`${desFolder}/${imageName}.jpeg`)
        .then(() => imagePath);
};
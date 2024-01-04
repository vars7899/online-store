const getDataUri = require("./dataURI");
const cloudinary = require("cloudinary");

async function uploadFile(requestedFile) {
  const fileUri = getDataUri(requestedFile);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  return {
    publicId: myCloud.public_id,
    url: myCloud.secure_url,
  };
}

async function destroyFile(requestedFilePublicId) {
  const myCloudResponse = await cloudinary.v2.uploader.destroy(requestedFilePublicId);

  return myCloudResponse;
}

module.exports = {
  destroyFile,
  uploadFile,
};


const CLOUD_NAME: string = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME as string;
const IMAGE_UPLOAD_URL: string = process.env.REACT_APP_CLOUDINARY_IMAGE_URL as string;
const UPLOAD_PRESENT: string = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESENT as string;

export const uploadImageCloudinary = (file: any) => {
  const data = new FormData()
  data.append("file", file)
  data.append("cloud_name", CLOUD_NAME)
  data.append("upload_preset", UPLOAD_PRESENT)
  return fetch(IMAGE_UPLOAD_URL, {
    method: "post",
    body: data
  }).then(resp => resp.json())
    .then(({ public_id, secure_url }) => {
      return { public_id, url: secure_url }
    })
}

export const uploadNewImage = (imageData: any) => {
  const { isNew, file } = imageData
  if (isNew) {
    return uploadImageCloudinary(file)
  } else {
    return Promise.resolve(file)
  }
}
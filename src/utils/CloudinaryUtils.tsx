export const uploadImageCloudinary = (file: any) => {
  const data = new FormData()
  data.append("file", file)
  data.append("upload_preset", "IzzeDev")
  data.append("cloud_name", "drbfa8358")
  return fetch("https://api.cloudinary.com/v1_1/drbfa8358/image/upload", {
    method: "post",
    body: data
  }).then(resp => resp.json())
    .then(({ public_id, secure_url }) => {
      return { public_id, url: secure_url }
    })
}
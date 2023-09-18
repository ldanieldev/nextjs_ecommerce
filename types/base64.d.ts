type ImageType = 'png' | 'jpeg' | 'jpg'
type Base64<imageType extends ImageType> =
  `data:image/${imageType};base64${string}`

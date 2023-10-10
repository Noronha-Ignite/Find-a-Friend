import { env } from '../env'

export const uploadImageImgur = async (image: Buffer) => {
  const response = await fetch(env.IMGUR_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Client-ID ${env.IMGUR_CLIENT_ID}`,
    },
    body: JSON.stringify({ image: image.toString('base64') }),
  })

  const responseBody = await response.json()

  return responseBody.data.link as string
}

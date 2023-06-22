import axios from 'axios';

export default async function PutPostEdit(postId, token, post) {
  try {
    const response = await axios.put(
      `https://api.mandarin.weniv.co.kr/post/${postId}`,
      {
        post: {
          content: String,
          image: String,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
}

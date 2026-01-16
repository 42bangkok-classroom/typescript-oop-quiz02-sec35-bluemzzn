import axios from "axios";


interface Comment {
  commentId: number;
  id: number;
  name?: string;
  email: string;
  body: string;
}

interface FilterComment {
  id: number;
  body: string;
}

export async function safeFetchComment(): Promise<FilterComment[] | null> {
  const res = await axios.get<Comment[]>('https://jsonplaceholder.typicode.com/comments/{id}');
  const comments = res.data;
  try {
    const { id, body } = comment;

    return { id, body };
  } catch (error) {
    return null;
  }
}


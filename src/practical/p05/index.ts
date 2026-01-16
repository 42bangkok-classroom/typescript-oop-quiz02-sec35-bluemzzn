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

export async function safeFetchComment(commentId : number): Promise<FilterComment | null> {
  try {
    const res = await axios.get<Comment>(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
    const comments = res.data;
    const { id, body } = comments;

    return { id, body };
  } catch (error) {
    return null;
  }
}


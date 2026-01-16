import axios from "axios";

interface Comment {
  postId: number;
  id: number;
  name?: string;
  email: string;
  body: string;
}

export async function countCommentsByPost(): Promise<Record<number, number>> {
  const res = await axios.get<Comment[]>('https://jsonplaceholder.typicode.com/comments');
  const comments = res.data;

  try {
    return comments.reduce((acc, comment) => {
      if (comment.postId !== null && comment.postId !== undefined) {
        acc[comment.postId] = (acc[comment.postId] || 0) + 1;
      }
      return acc;
    }, {} as Record<number, number>);
  } catch (error) {
    throw new Error(`Failed to fetch comments: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

}

import axios from "axios";



interface Post {
  userId?: number;
  id: number;
  title: string;
  body?: string;
}

interface filterPost {
  id: number;
  title: string;
}

export async function getPostsByUser(userId : number): Promise<filterPost[]> {
  try {
    const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data;

    return posts
    .filter(post => post.userId === userId)
    .map(post => ({ id: post.id, title: post.title }));

  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

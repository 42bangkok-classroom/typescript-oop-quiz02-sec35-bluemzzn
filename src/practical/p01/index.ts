import axios from 'axios';

interface Post {
  id: number;
  title: string;
  userId: number;
  body?: string;
}

interface EdgePost {
  id: number;
  title: string;
}

export async function getPostsByUser(userId: number): Promise<EdgePost[]> {
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
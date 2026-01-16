import axios from 'axios';

interface Post {
  userId?: number;
  id: number;
  title: string;
  body?: string;
}

interface EdgePost {
  id: number;
  title: string;
}

export async function getEdgePosts(): Promise<EdgePost[]> {
  try {
    const res = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
    const posts = res.data;

    if (posts.length === 0) {
      return [];
    }

    const firstPost = posts[0];
    const lastPost = posts[posts.length - 1];

    return [
      { id: firstPost.id, title: firstPost.title },
      { id: lastPost.id, title: lastPost.title }
    ].map(post => ({ id: post.id, title: post.title }))

  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
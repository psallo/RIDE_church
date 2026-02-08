import { useEffect, useState } from 'react';

export default function CardBoard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold text-center my-[2em]">
        라이드처치 소식
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <article
            key={post.id}
            className="bg-white rounded-xl shadow-sm p-6
                       hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-3">
              {post.title}
            </h3>

            <p className="text-gray-600 leading-relaxed mb-4">
              {post.content}
            </p>

            <time className="text-sm text-gray-400">
              {new Date(post.created_at).toLocaleDateString()}
            </time>
          </article>
        ))}
      </div>
    </section>
  );
}

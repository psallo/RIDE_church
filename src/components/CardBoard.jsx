import { useEffect, useState } from 'react';

export default function CardBoard({ lang = 'ko' }) {
  const title = lang === 'en' ? 'Church Updates' : '라이드처치 소식';
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => {
        console.error('Failed to load posts', err);
        setPosts([]);
      });
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold text-center my-[2em]">
        {title}
      </h2>

      {posts.length === 0 ? (
        <p className="text-center text-gray-400">
          {lang === 'en'
            ? 'There are no posts yet.'
            : '아직 등록된 소식이 없습니다.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-sm p-6
                         hover:shadow-md transition flex flex-col"
            >
              {/* 이미지가 있을 때만 상단에 표시 */}
              {post.image_url && (
                <div className="mb-4 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl bg-slate-100">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      // 이미지 로딩 실패 시 그냥 숨기기
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              <h3 className="text-xl font-semibold mb-3">
                {post.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-4 flex-1">
                {post.content}
              </p>

              <time className="text-sm text-gray-400">
                {lang === 'en'
                  ? new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : new Date(post.created_at).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
              </time>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

import { useState } from 'react';

export default function AdminBoard() {
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const res = await fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          title,
          content,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({
          type: 'error',
          message: data.error || 'Failed to create post.',
        });
        return;
      }

      setStatus({
        type: 'success',
        message: 'Post has been created successfully.',
      });
      setTitle('');
      setContent('');
      // 비밀번호는 유지하거나 초기화는 취향대로
      // setPassword('');
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        message: 'Unexpected error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Ride Church Admin – New Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Admin Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
          </div>

          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 주일예배 안내"
              required
            />
          </div>

          {/* 내용 */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Content
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-300 px-3 py-2 h-40
                         focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400
                         resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="게시글 내용을 입력하세요."
              required
            />
          </div>

          {/* 상태 메시지 */}
          {status && (
            <div
              className={`text-sm rounded-md px-3 py-2 ${
                status.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {status.message}
            </div>
          )}

          {/* 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-sky-600 text-white py-2.5 font-medium
                       hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed
                       transition"
          >
            {loading ? 'Saving...' : 'Publish Post'}
          </button>
        </form>
      </div>
    </div>
  );
}

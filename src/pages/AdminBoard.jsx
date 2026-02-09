import { useEffect, useMemo, useState } from 'react';

// Google Drive 공유 링크를 직접 이미지 URL로 변환하는 헬퍼 함수
// 지원 예시:
// - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
// - https://drive.google.com/open?id=FILE_ID
// - https://drive.google.com/uc?id=FILE_ID&export=download
//  → https://drive.google.com/uc?export=view&id=FILE_ID
function convertGoogleDriveUrl(url) {
  if (!url) return '';

  try {
    // https://drive.google.com/file/d/FILE_ID/view?... 에서 FILE_ID 추출
    const match = url.match(/\/file\/d\/([^/]+)/);
    if (!match || !match[1]) {
      return url.trim();
    }

    const fileId = match[1];

    // 예전: uc?export=view
    // return `https://drive.google.com/uc?export=view&id=${fileId}`;

    // 변경: thumbnail 엔드포인트 사용
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  } catch {
    return url.trim();
  }
}


export default function AdminBoard() {
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // 🔹 Google Drive 이미지 URL
  const [content, setContent] = useState('');
  const [previewFailed, setPreviewFailed] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isAuthed, setIsAuthed] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem('admin_authed') === '1';
    } catch {
      return false;
    }
  });
  const [authError, setAuthError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  // 미리보기용 변환 URL (입력은 원본 공유 링크 그대로 유지)
  const previewUrl = convertGoogleDriveUrl(imageUrl);
  const isEditing = useMemo(() => editingId !== null, [editingId]);

  const loadPosts = async () => {
    setListLoading(true);
    setListError(null);
    try {
      const res = await fetch('/posts');
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Failed to load posts.');
      }
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setListError('Failed to load posts.');
      setPosts([]);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthed) {
      loadPosts();
    }
  }, [isAuthed]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      const res = await fetch('/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data?.error || 'Unauthorized');
        return;
      }
      setIsAuthed(true);
      try {
        sessionStorage.setItem('admin_authed', '1');
      } catch {}
    } catch (err) {
      console.error(err);
      setAuthError('Unexpected error occurred.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      // 실제 저장할 때는 변환된 URL 사용
      const convertedImageUrl = convertGoogleDriveUrl(imageUrl);

      const res = await fetch('/posts', {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          id: editingId,
          title,
          content,
          imageUrl: convertedImageUrl, // 🔹 변환된 URL로 전송
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
        message: isEditing
          ? 'Post has been updated successfully.'
          : 'Post has been created successfully.',
      });
      setTitle('');
      setImageUrl('');
      setContent('');
      setEditingId(null);
      // setPassword(''); // 필요하면 비밀번호도 초기화
      await loadPosts();
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

  const handleEdit = (post) => {
    setEditingId(post.id);
    setTitle(post.title || '');
    setImageUrl(post.image_url || '');
    setContent(post.content || '');
    setPreviewFailed(false);
    setStatus(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setImageUrl('');
    setContent('');
    setPreviewFailed(false);
    setStatus(null);
  };

  const handleDelete = async (postId) => {
    if (!password) {
      setStatus({
        type: 'error',
        message: 'Admin password is required to delete.',
      });
      return;
    }
    const ok = window.confirm('정말 삭제하시겠습니까?');
    if (!ok) return;

    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/posts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          id: postId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({
          type: 'error',
          message: data.error || 'Failed to delete post.',
        });
        return;
      }
      setStatus({
        type: 'success',
        message: 'Post has been deleted successfully.',
      });
      await loadPosts();
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

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Ride Church Admin
          </h1>
          <form onSubmit={handleAuthSubmit} className="space-y-4">
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
            {authError && (
              <div className="text-sm rounded-md px-3 py-2 bg-red-50 text-red-700">
                {authError}
              </div>
            )}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full rounded-lg bg-sky-600 text-white py-2.5 font-medium
                         hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed
                         transition"
            >
              {authLoading ? 'Checking...' : 'Enter Admin'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">
            Ride Church Admin – New Post
          </h1>
          <button
            type="button"
            onClick={() => {
              setIsAuthed(false);
              setPassword('');
              try {
                sessionStorage.removeItem('admin_authed');
              } catch {}
            }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          {/* Google Drive 이미지 URL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Google Drive Image URL (optional)
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setPreviewFailed(false);
              }}
              placeholder="https://drive.google.com/file/d/FILE_ID/view?..."
            />
            <p className="mt-1 text-xs text-gray-500">
              구글 드라이브에서 &quot;링크가 있는 모든 사용자&quot;로 공유한 뒤,
              공유 링크를 그대로 붙여넣으면 자동으로 이미지 주소로 변환돼요.
            </p>

            {imageUrl && !previewUrl && (
              <p className="mt-2 text-xs text-red-600">
                공유 링크에서 파일 ID를 찾지 못했습니다. 링크 형식을 확인해 주세요.
              </p>
            )}

            {/* 이미지 미리보기 (선택) */}
            {previewUrl && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">미리보기:</p>
                <div className="border rounded-lg overflow-hidden max-h-56 flex items-center justify-center bg-slate-100">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-56 object-contain"
                    onError={(e) => {
                      // 로딩 실패 시 메시지 노출
                      e.currentTarget.style.display = 'none';
                      setPreviewFailed(true);
                    }}
                  />
                </div>
                {previewFailed && (
                  <p className="mt-2 text-xs text-red-600">
                    이미지 로딩에 실패했습니다. 공유 설정이 "링크가 있는 모든 사용자"인지 확인해 주세요.
                  </p>
                )}
              </div>
            )}
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
            {loading
              ? 'Saving...'
              : isEditing
              ? 'Update Post'
              : 'Publish Post'}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="w-full rounded-lg border border-gray-300 py-2.5 font-medium
                         text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel Edit
            </button>
          )}
        </form>

        <div className="mt-10 border-t pt-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold">
              Existing Posts
              {!listLoading && !listError && (
                <span className="ml-2 text-sm text-gray-500">
                  ({posts.length})
                </span>
              )}
            </h2>
            <button
              type="button"
              onClick={loadPosts}
              className="px-3 py-1.5 text-sm rounded-md border border-gray-300
                         text-gray-700 hover:bg-gray-50 transition"
            >
              Reload
            </button>
          </div>

          {listLoading && (
            <p className="text-sm text-gray-500">Loading posts...</p>
          )}

          {listError && (
            <p className="text-sm text-red-600">{listError}</p>
          )}

          {!listLoading && !listError && posts.length === 0 && (
            <p className="text-sm text-gray-500">No posts yet.</p>
          )}

          {!listLoading && !listError && posts.length > 0 && (
            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="border rounded-lg p-4 flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="font-medium truncate">{post.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(post.created_at).toLocaleString('ko-KR')}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEdit(post)}
                      className="px-3 py-1.5 text-sm rounded-md border border-gray-300
                                 hover:bg-gray-50 transition"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      className="px-3 py-1.5 text-sm rounded-md border border-red-200
                                 text-red-600 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

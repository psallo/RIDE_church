import { useState } from 'react';

// Google Drive 공유 링크를 직접 이미지 URL로 변환하는 헬퍼 함수
// 지원 예시:
// - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
// - https://drive.google.com/open?id=FILE_ID
// - https://drive.google.com/uc?id=FILE_ID&export=download
//  → https://drive.google.com/uc?export=view&id=FILE_ID
function convertGoogleDriveUrl(url) {
  if (!url) return '';

  try {
    const parsed = new URL(url);

    if (!parsed.hostname.includes('drive.google.com')) {
      return url;
    }

    const pathMatch = parsed.pathname.match(/\/d\/([^/]+)/);
    const fileId =
      (pathMatch && pathMatch[1]) ||
      parsed.searchParams.get('id');

    if (!fileId) return '';

    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  } catch {
    return '';
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

  // 미리보기용 변환 URL (입력은 원본 공유 링크 그대로 유지)
  const previewUrl = convertGoogleDriveUrl(imageUrl);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      // 실제 저장할 때는 변환된 URL 사용
      const convertedImageUrl = convertGoogleDriveUrl(imageUrl);

      const res = await fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
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
        message: 'Post has been created successfully.',
      });
      setTitle('');
      setImageUrl('');
      setContent('');
      // setPassword(''); // 필요하면 비밀번호도 초기화
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
            {loading ? 'Saving...' : 'Publish Post'}
          </button>
        </form>
      </div>
    </div>
  );
}

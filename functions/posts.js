// GET: 게시글 목록 조회
export async function onRequestGet({ env }) {
  const { results } = await env.DB
    .prepare('SELECT * FROM posts ORDER BY id DESC')
    .all();

  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' },
  });
}

// POST: 관리자 글쓰기 (비밀번호 검증)
export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON body' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const { password, title, content } = data || {};

  // 1) 비밀번호 체크
  if (!password || password !== env.ADMIN_PASSWORD) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // 2) 필드 검증
  if (!title || !title.trim() || !content || !content.trim()) {
    return new Response(
      JSON.stringify({ error: 'Title and content are required.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const createdAt = new Date().toISOString();

  // 3) DB 저장
  await env.DB
    .prepare(
      'INSERT INTO posts (title, content, created_at) VALUES (?, ?, ?)'
    )
    .bind(title.trim(), content.trim(), createdAt)
    .run();

  return new Response(
    JSON.stringify({ ok: true }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

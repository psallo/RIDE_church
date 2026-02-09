// POST: 관리자 비밀번호 검증
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

  const { password } = data || {};

  if (!password || password !== env.ADMIN_PASSWORD) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return new Response(
    JSON.stringify({ ok: true }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

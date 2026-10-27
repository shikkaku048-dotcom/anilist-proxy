export default async function handler(req: any, res: any) {
  // 1. Izinkan Cloudflare (dan localhost) mengakses API ini
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 2. Tangani preflight request (CORS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 3. Hanya izinkan POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 4. Teruskan request ke AniList
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://anilist.co/',
        'Origin': 'https://anilist.co'
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Gagal terhubung ke AniList' });
  }
}
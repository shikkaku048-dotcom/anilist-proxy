// File: api/scrape.ts (Di proyek Vercel)
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const targetUrl = req.query.url as string;
  if (!targetUrl) return res.status(400).json({ error: 'URL parameter is required' });

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Referer': 'https://komiku.org/',
        'Origin': 'https://komiku.org'
      }
    });
    
    const text = await response.text();
    return res.status(200).send(text);
  } catch (error) {
    return res.status(500).json({ error: 'Gagal mengambil data dari Komiku' });
  }
}
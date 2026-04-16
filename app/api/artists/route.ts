import { NextResponse } from 'next/server';
import { getArtists } from '../../../lib/get-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const artists = await getArtists();
  return NextResponse.json(artists, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

import fs from 'fs/promises';
import path from 'path';

export async function getArtists() {
  const filePath = path.join(process.cwd(), 'data', 'artists.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  return JSON.parse(jsonData);
}

export async function getEvents() {
  const filePath = path.join(process.cwd(), 'data', 'events.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  return JSON.parse(jsonData);
}

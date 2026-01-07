import { getDb, schema } from './client';

export async function logAnalysisEvent(fid: number, username: string | null): Promise<void> {
  const db = getDb();
  if (!db) return;

  try {
    await db.insert(schema.analysisEvents).values({
      fid,
      username,
    });
  } catch (error) {
    console.error('Failed to log analysis event:', error);
  }
}

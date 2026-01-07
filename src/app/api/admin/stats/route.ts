import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { users, userAnalysisHistory, analysisCache, analysisEvents } from '@/lib/db/schema';
import { sql, desc, count, gte } from 'drizzle-orm';

export async function GET() {
  try {
    const db = getDb();
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not configured' },
        { status: 500 }
      );
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // User stats
    const [totalUsers] = await db
      .select({ count: count() })
      .from(users);

    const [usersToday] = await db
      .select({ count: count() })
      .from(users)
      .where(gte(users.createdAt, today));

    const [usersThisWeek] = await db
      .select({ count: count() })
      .from(users)
      .where(gte(users.createdAt, weekAgo));

    // Analysis stats (from events table)
    const [totalAnalyses] = await db
      .select({ count: count() })
      .from(analysisEvents);

    const [analysesToday] = await db
      .select({ count: count() })
      .from(analysisEvents)
      .where(gte(analysisEvents.createdAt, today));

    const [analysesThisWeek] = await db
      .select({ count: count() })
      .from(analysisEvents)
      .where(gte(analysisEvents.createdAt, weekAgo));

    // Most analyzed accounts (top 10)
    const topAnalyzedAccounts = await db
      .select({
        username: analysisEvents.username,
        fid: analysisEvents.fid,
        count: count(),
      })
      .from(analysisEvents)
      .groupBy(analysisEvents.fid, analysisEvents.username)
      .orderBy(desc(count()))
      .limit(10);

    // Most active users (by analysis history, top 10)
    const topActiveUsers = await db
      .select({
        username: users.username,
        fid: users.fid,
        pfpUrl: users.pfpUrl,
        analysisCount: count(userAnalysisHistory.id),
      })
      .from(users)
      .leftJoin(userAnalysisHistory, sql`${users.id} = ${userAnalysisHistory.userId}`)
      .groupBy(users.id, users.username, users.fid, users.pfpUrl)
      .orderBy(desc(count(userAnalysisHistory.id)))
      .limit(10);

    // Recent signups (last 10)
    const recentSignups = await db
      .select({
        username: users.username,
        fid: users.fid,
        pfpUrl: users.pfpUrl,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(10);

    // Signups by day (last 30 days)
    const signupsByDay = await db
      .select({
        date: sql<string>`DATE(${users.createdAt})`.as('date'),
        count: count(),
      })
      .from(users)
      .where(gte(users.createdAt, monthAgo))
      .groupBy(sql`DATE(${users.createdAt})`)
      .orderBy(sql`DATE(${users.createdAt})`);

    // Analyses by day (last 30 days)
    const analysesByDay = await db
      .select({
        date: sql<string>`DATE(${analysisEvents.createdAt})`.as('date'),
        count: count(),
      })
      .from(analysisEvents)
      .where(gte(analysisEvents.createdAt, monthAgo))
      .groupBy(sql`DATE(${analysisEvents.createdAt})`)
      .orderBy(sql`DATE(${analysisEvents.createdAt})`);

    return NextResponse.json({
      success: true,
      data: {
        users: {
          total: totalUsers.count,
          today: usersToday.count,
          thisWeek: usersThisWeek.count,
        },
        analyses: {
          total: totalAnalyses.count,
          today: analysesToday.count,
          thisWeek: analysesThisWeek.count,
        },
        topAnalyzedAccounts,
        topActiveUsers,
        recentSignups,
        charts: {
          signupsByDay,
          analysesByDay,
        },
      },
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

import { pgTable, text, timestamp, integer, jsonb, uuid } from 'drizzle-orm/pg-core';

// Cached analysis results - expires after 6 hours
export const analysisCache = pgTable('postcoach_analysis_cache', {
  id: uuid('id').defaultRandom().primaryKey(),
  fid: integer('fid').notNull(),
  username: text('username'),
  analysisJson: jsonb('analysis_json').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at').notNull(),
});

// Rate limiting table
export const rateLimits = pgTable('postcoach_rate_limits', {
  id: uuid('id').defaultRandom().primaryKey(),
  identifier: text('identifier').notNull(), // IP or user identifier
  endpoint: text('endpoint').notNull(),
  requestCount: integer('request_count').default(0).notNull(),
  windowStart: timestamp('window_start').defaultNow().notNull(),
});

// Optional: Store embeddings for faster re-analysis
export const castEmbeddings = pgTable('postcoach_cast_embeddings', {
  id: uuid('id').defaultRandom().primaryKey(),
  castHash: text('cast_hash').notNull().unique(),
  fid: integer('fid').notNull(),
  embedding: jsonb('embedding').notNull(), // Store as JSON array
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Users table - stores authenticated Farcaster users
export const users = pgTable('postcoach_users', {
  id: uuid('id').defaultRandom().primaryKey(),
  fid: integer('fid').notNull().unique(),
  username: text('username').notNull(),
  displayName: text('display_name'),
  pfpUrl: text('pfp_url'),
  custodyAddress: text('custody_address'), // Farcaster wallet address
  createdAt: timestamp('created_at').defaultNow().notNull(),
  lastLoginAt: timestamp('last_login_at').defaultNow().notNull(),
});

// Track every analysis run (for analytics)
export const analysisEvents = pgTable('postcoach_analysis_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  fid: integer('fid').notNull(),
  username: text('username'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Track which analyses a user has viewed (history)
export const userAnalysisHistory = pgTable('postcoach_user_analysis_history', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  analyzedFid: integer('analyzed_fid').notNull(),
  analyzedUsername: text('analyzed_username'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type AnalysisCache = typeof analysisCache.$inferSelect;
export type NewAnalysisCache = typeof analysisCache.$inferInsert;
export type RateLimit = typeof rateLimits.$inferSelect;
export type CastEmbedding = typeof castEmbeddings.$inferSelect;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserAnalysisHistory = typeof userAnalysisHistory.$inferSelect;
export type NewUserAnalysisHistory = typeof userAnalysisHistory.$inferInsert;
export type AnalysisEvent = typeof analysisEvents.$inferSelect;

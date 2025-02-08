import {
    integer,
    pgTable,
    timestamp,
    uniqueIndex,
    uuid,
    varchar,
  } from "drizzle-orm/pg-core";
  
  export const usersTable = pgTable(
    "users",
    {
      id: uuid("id").primaryKey().defaultRandom(),
      name: varchar({ length: 255 }).notNull(),
      age: integer().notNull(),
      email: varchar({ length: 255 }).notNull().unique(),
      sessionId: uuid("session_id"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (t) => [
      uniqueIndex("id_idx").on(t.id),
      uniqueIndex("session_id_idx").on(t.sessionId),
    ]
  );
  
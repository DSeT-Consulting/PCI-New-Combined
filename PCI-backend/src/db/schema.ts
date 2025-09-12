import { relations } from "drizzle-orm";
import { boolean, index, integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const currencyEnum = pgEnum("currency", ["USD", "EUR", "GBP"]);
export const newsStatusEnum = pgEnum("news_status", ["draft", "published", "archived"]);

export const accountTable = pgTable("account", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  currency: currencyEnum("currency").notNull().default("USD"), //default value required to be set for old records during migration
  balance: integer("balance").notNull().default(0),
});

// Tags table - Global tags that can be used across different content types
export const tagsTable = pgTable(
  "tags",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull().unique(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => {
    return {
      activeTagsIdx: index("tags_active_name_idx").on(table.isActive, table.name),
      nameIdx: index("tags_name_idx").on(table.name),
      activeIdx: index("tags_active_idx").on(table.isActive),
      createdAtIdx: index("tags_created_at_idx").on(table.createdAt),
    };
  }
);

// News Classifications table - For news-specific labels like Featured, Breaking, etc.
export const newsClassificationsTable = pgTable(
  "news_classifications",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull().unique(),
    priority: integer("priority").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => {
    return {
      activePriorityIdx: index("news_classifications_active_priority_idx").on(table.isActive, table.priority),
      nameIdx: index("news_classifications_name_idx").on(table.name),
      activeIdx: index("news_classifications_active_idx").on(table.isActive),
    };
  }
);

// Categories table - For organizing content into categories
export const categoriesTable = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull().unique(),
    description: text("description"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => {
    return {
      activeCategoriesIdx: index("categories_active_name_idx").on(table.isActive, table.name),
      nameIdx: index("categories_name_idx").on(table.name),
      activeIdx: index("categories_active_idx").on(table.isActive),
    };
  }
);

// News table - Main news articles
export const newsTable = pgTable(
  "news",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    excerpt: text("excerpt").notNull(),
    content: text("content").notNull(),
    featuredImage: varchar("featured_image", { length: 500 }),
    otherImages: text("other_images").array(), // Array of image URLs
    categoryId: integer("category_id")
      .notNull()
      .references(() => categoriesTable.id),
    status: newsStatusEnum("status").notNull().default("draft"),
    viewCount: integer("view_count").notNull().default(0),
    readTime: integer("read_time"), // in minutes
    metaDescription: varchar("meta_description", { length: 160 }),
    metaKeywords: varchar("meta_keywords", { length: 255 }),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => {
    return {
      // Most common queries
      statusPublishedIdx: index("news_status_published_idx").on(table.status, table.publishedAt),
      slugIdx: index("news_slug_idx").on(table.slug),
      categoryStatusIdx: index("news_category_status_idx").on(table.categoryId, table.status),
      publishedAtIdx: index("news_published_at_idx").on(table.publishedAt),
      // Full-text search support
      titleIdx: index("news_title_idx").on(table.title),
      // Analytics queries
      viewCountIdx: index("news_view_count_idx").on(table.viewCount),
      // Foreign key index
      categoryIdIdx: index("news_category_id_idx").on(table.categoryId),
    };
  }
);

// Junction table - News to Tags (Many-to-Many)
export const newsTagsTable = pgTable(
  "news_tags",
  {
    id: serial("id").primaryKey(),
    newsId: integer("news_id")
      .notNull()
      .references(() => newsTable.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tagsTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => {
    return {
      // Composite unique constraint to prevent duplicates
      newsTagUniqueIdx: index("news_tags_unique_idx").on(table.newsId, table.tagId),
      // Foreign key indexes for efficient joins
      newsIdIdx: index("news_tags_news_id_idx").on(table.newsId),
      tagIdIdx: index("news_tags_tag_id_idx").on(table.tagId),
    };
  }
);

// Junction table - News to Classifications (Many-to-Many)
export const newsClassificationAssignmentsTable = pgTable(
  "news_classification_assignments",
  {
    id: serial("id").primaryKey(),
    newsId: integer("news_id")
      .notNull()
      .references(() => newsTable.id, { onDelete: "cascade" }),
    classificationId: integer("classification_id")
      .notNull()
      .references(() => newsClassificationsTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => {
    return {
      // Composite unique constraint to prevent duplicates
      newsClassificationUniqueIdx: index("news_classification_unique_idx").on(table.newsId, table.classificationId),
      // Foreign key indexes for efficient joins
      newsIdIdx: index("news_classification_news_id_idx").on(table.newsId),
      classificationIdIdx: index("news_classification_classification_id_idx").on(table.classificationId),
    };
  }
);

// RELATIONS DEFINITIONS
export const categoriesRelations = relations(categoriesTable, ({ many }) => ({
  news: many(newsTable),
}));

export const newsRelations = relations(newsTable, ({ one, many }) => ({
  category: one(categoriesTable, {
    fields: [newsTable.categoryId],
    references: [categoriesTable.id],
  }),
  newsTags: many(newsTagsTable),
  newsClassifications: many(newsClassificationAssignmentsTable),
}));

export const tagsRelations = relations(tagsTable, ({ many }) => ({
  newsTags: many(newsTagsTable),
}));

export const newsClassificationsRelations = relations(newsClassificationsTable, ({ many }) => ({
  newsClassifications: many(newsClassificationAssignmentsTable),
}));

export const newsTagsRelations = relations(newsTagsTable, ({ one }) => ({
  news: one(newsTable, {
    fields: [newsTagsTable.newsId],
    references: [newsTable.id],
  }),
  tag: one(tagsTable, {
    fields: [newsTagsTable.tagId],
    references: [tagsTable.id],
  }),
}));

export const newsClassificationAssignmentsRelations = relations(newsClassificationAssignmentsTable, ({ one }) => ({
  news: one(newsTable, {
    fields: [newsClassificationAssignmentsTable.newsId],
    references: [newsTable.id],
  }),
  classification: one(newsClassificationsTable, {
    fields: [newsClassificationAssignmentsTable.classificationId],
    references: [newsClassificationsTable.id],
  }),
}));

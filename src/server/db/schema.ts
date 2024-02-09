import { fromBinaryUUID } from "binary-uuid";
import { type SQL, relations, sql } from "drizzle-orm";
import {
  bigint,
  customType,
  index,
  int,
  mysqlTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const binary = customType<{
  data: string;
  driverData: string;
  config: { length?: number };
}>({
  dataType(config) {
    return typeof config?.length !== "undefined"
      ? `binary(${config.length})`
      : `binary`;
  },
  fromDriver(value: string): string {
    const buff = value.startsWith("base64:type254:")
      ? Buffer.from(value.split(":")[2] ?? "", "base64")
      : Buffer.from(value, "binary");

    return fromBinaryUUID(buff);
  },
  toDriver(value: string): SQL<unknown> {
    return sql`UUID_TO_BIN(${value}, 1)`;
  },
});

export const mysqlTable = mysqlTableCreator(
  (name) => `create-t3-app-custom_${name}`,
);

export const posts = mysqlTable(
  "post",
  {
    cuid: bigint("cuid", { mode: "number" }).primaryKey().autoincrement(),
    uuid: binary("uuid", { length: 16 })
      .default(sql`(UUID_TO_BIN(UUID()))`)
      .unique(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("createdById", { length: 255 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

async function up(db) {
    await db.schema
        .createTable("Customers")
        .addColumn("id", "varchar", (col) => col.primaryKey())
        .addColumn("firstName", "varchar", (col) => col.notNull())
        .addColumn("lastName", "varchar", (col) => col.notNull())
        .execute();
}

async function down(db) {
    await db.schema.dropTable("Customers").execute();
}

module.exports = { up, down };

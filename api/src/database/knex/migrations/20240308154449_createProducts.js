exports.up = (knex) =>
  knex.schema.createTable("products", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("email").notNullable();
    table.text("password").notNullable();

    table
      .enum("role", ["admin", "sale"], {
        useNative: true,
        enumName: "role"
      })
      .notNullable()
      .default("customer");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("products");

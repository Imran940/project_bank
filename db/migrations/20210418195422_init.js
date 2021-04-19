
const createTableSafely = knex => tables => {
    const createTables = tables.map(({ name, schema }) => {
        return knex.schema.createTable(name, schema)
    });

    return Promise.all(createTables)
        .catch(e => {
            const dropTables = tables.map(({ name }) => {
                return knex.schema.dropTableIfExists(name);
            });

            return Promise.all(dropTables).then(() => Promise.reject(e));
        });
}


exports.up = function (knex, Promise) {
    //new changes
    return createTableSafely(knex)([{
        name: "user",
        schema(table) {
            table.increments('id');
            table.string('banker', 255).notNullable();
            table.string('customer', 255).notNullable();
            table.string('customer_bal', 20).notNullable();
        },
    },
    {
        name: "account",
        schema(table) {
            table.string('Date', 255).notNullable();
            table.string('CustName', 255).notNullable();
            table.integer('Deposit', 20).notNullable();
            table.integer('withdrawn', 20).notNullable();
            table.integer('balance', 20).notNullable();
        },
    },
    {
        name: "login",
        schema(table) {
            table.string('username', 255).notNullable();
            table.string('password', 255).notNullable();
        },
    }

    ])

};

exports.down = function (knex) {
    //rollback
};

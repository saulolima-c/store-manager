const connection = require('./connection');

const getAll = async () => {
    const [products] = await connection.execute('SELECT * FROM products');
    return products;
};

const getOne = async (id) => {
    const [product] = await connection.execute('SELECT * FROM products WHERE id = ?;',
    [id]);
    return product;
};

const deleteOne = async (id) => {
    await connection.execute('DELETE FROM products WHERE id = ?;', [id]);
};

const editOne = async (id, name, quantity) => {
    const [newProduct] = await connection.execute(
        'UPDATE products SET name = (?), quantity = (?) WHERE id = (?)',
        [name, quantity, id],
    );
    console.log(`lint friendly :) ${newProduct}`);
    return {
        id,
        name,
        quantity,
    };
};

const createProduct = async (name, quantity) => {
    const [result] = await connection
        .execute(
            'INSERT INTO products (name, quantity) VALUES (?, ?)',
            [name, quantity],
        );
    return {
        id: result.insertId,
        name,
        quantity,
    };
};

const searchProduct = async (name) => {
    const [product] = await connection
        .execute(
            'SELECT 1 FROM products WHERE name = ?',
            [name],
        );
    return product;
};

const getQuantityProd = async (id) => {
    const [quantity] = await connection.execute(
        'SELECT quantity FROM products WHERE id = (?)',
        [id],
    );
    return quantity;
};

const refreshProduct = async (id, quantity) => {
    const [refresh] = await connection.execute(
        'UPDATE products SET quantity = (?) WHERE id = (?)',
        [quantity, id],
    );
    return refresh;
};

module.exports = {
    createProduct,
    searchProduct,
    getAll,
    getOne,
    editOne,
    deleteOne,
    getQuantityProd,
    refreshProduct,
};

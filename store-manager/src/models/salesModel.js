const connection = require('./connection');

const createSaleProducts = async (vendas) => {
    const [res] = await connection.query('INSERT INTO sales (date) VALUES (now());');

    await Promise.all(vendas.map(async (venda) => {
        try {
            await connection
                .execute(
                    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
                [res.insertId, venda.product_id, venda.quantity],
                );
    } catch (error) {
        return error.message;
    }
    }));
    return res.insertId;
};

const getSales = async () => {
        const [sales] = await connection
            .execute(
                'SELECT SP.sale_id as saleId, '
                + 'date, SP.product_id, SP.quantity '
                + 'FROM sales_products AS SP INNER JOIN sales AS s ON sale_id = s.id',
            );
        return sales;
};

const getOneSale = async (id) => {
        const [specificSale] = await connection
            .execute(
                'SELECT s.date, SP.product_id, SP.quantity '
                + 'FROM sales_products AS SP INNER JOIN sales AS s ON SP.sale_id = s.id '
                + 'WHERE SP.sale_id = ?;', [id],
            );
        return specificSale;
};

const editSale = async (saleId, saleDetails) => {
    await Promise.all(saleDetails.map((async (detail) => {
        try {
            await connection.execute(
                'UPDATE sales_products SET product_id = (?), quantity = (?) WHERE sale_id = (?)',
                [detail.product_id, detail.quantity, saleId],
            );
        } catch (error) {
            return 'Oh, no!';
        }
    })));
    return {
        saleId,
        saleDetails,
    };
};

const deleteSale = async (id) => {
    await connection.execute('DELETE FROM sales_products WHERE sale_id = ?;', [id]);
};

const getQuantitySales = async (id) => {
    const [quantity] = await connection.execute(
        'SELECT quantity FROM sales_products WHERE product_id = (?)',
        [id],
    );
    return quantity[0].quantity;
};

module.exports = {
    createSaleProducts,
    getSales,
    getOneSale,
    editSale,
    deleteSale,
    getQuantitySales,
};
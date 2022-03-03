const { expect } = require('chai');
const sinon = require('sinon');

const mockProds = require('./mocks/mockProducts');
const mockSales = require('./mocks/mockSales');

const connection = require('../../models/connection');

const saleModel = require('../../models/salesModel');
const prodModel = require('../../models/productModel');


describe('Testando a camada de models', () => {
    describe('1 - Testando o cadastro de um novo produto', () => {

        before(async () => {
            sinon.stub(connection, 'execute').resolves(mockProds.allProducts);
        });

        after(async () => {
            connection.execute.restore();
        });

        it('Será validado que o retorno é do tipo object', async () => {
            const insertion = await prodModel.createProduct(mockProds.insertProduct);
            expect(insertion).to.be.a('object');
        });

        it('Será validado a existencia da chave id no novo produto', async () => {
            const insertion = await prodModel.createProduct(mockProds.insertProduct);
            expect(insertion).to.have.a.property('id');
        });

        it('Será validado a existencia da chave name no novo produto', async () => {
            const insertion = await prodModel.createProduct(mockProds.insertProduct);
            expect(insertion).to.have.a.property('name');
        });

        it('Será validado a existencia da chave quantity no novo produto', async () => {
            const insertion = await prodModel.createProduct(mockProds.insertProduct);
            expect(insertion).to.have.a.property('quantity');
        });
    });

    describe('2 - Testando busca de produto pelo id', () => {

        before(async () => {
            sinon.stub(connection, 'execute').resolves(mockProds.allProducts);
        });

        after(async () => {
            connection.execute.restore();
        });

        it('Será validado se o retorno é do tipo object', async () => {
            const insertion = await prodModel.getOne(2);
            expect(insertion).to.be.a('object');
        });

        it('Será validado a existencia da chave id no produto buscado', async () => {
            const insertion = await prodModel.getOne(2);
            expect(insertion).to.have.a.property('id');
        });

        it('Será validado a existencia da chave name no produto buscado', async () => {
            const insertion = await prodModel.getOne(2);
            expect(insertion).to.have.a.property('name');
        });

        it('Será validado a existencia da chave quantity no produto buscado', async () => {
            const insertion = await prodModel.getOne(2);
            expect(insertion).to.have.a.property('quantity');
        });
    })

    describe('3 - Testando a edição de um produto por id', () => {

        before(async () => {
            sinon.stub(connection, 'execute').resolves(mockProds.allProducts);
        });

        after(async () => {
            connection.execute.restore();
        });

        it('Será validado se o retorno é do tipo object', async () => {
            const insertion = await prodModel.editOne(1, 'AWP Gold', 4);
            expect(insertion).to.be.a('object');
        });

        it('Será validada a existencia das chaves id, name e quantity no produto editado', async () => {
            const insertion = await prodModel.editOne(1, 'AWP Gold', 4);
            expect(insertion).to.have.a.property('id');
            expect(insertion).to.have.a.property('name');
            expect(insertion).to.have.a.property('quantity');
        });
    })

    describe('4 - Testando a remoção de algum produto', () => {

        before(async () => {
            sinon.stub(connection, 'execute').resolves([mockProds.allProducts]);
        });

        after(async () => {
            connection.execute.restore();
        });

        it('Será avaliado se o retorno é inexistente', async () => {
            const remove = await prodModel.deleteOne(3);
            expect(remove).to.be.a('undefined');
        })
    })

    describe('5 - Testando a listagem de todos os produtos', () => {

        before(async () => {
            sinon.stub(connection, 'execute').resolves([mockProds.allProducts]);
        });

        after(async () => {
            connection.execute.restore();
        });

        it('Será avaliado se todos os produtos são listados', async () => {
            const allP = await prodModel.getAll();
            expect(allP.length).to.be.equals(3)
        });

        it('Será validado se o retorno é um array', async () => {
            const allP = await prodModel.getAll();
            expect(allP).to.be.an('array');
        })
    })

    describe('6 - Testando a listagem de um produto pelo nome', () => {

        before(async () => {
            sinon.stub(connection, 'execute').resolves(mockProds.allProducts);
        });

        after(async () => {
            connection.execute.restore();
        });

        it('Será avaliado se o produto é listado corretamente', async () => {
            const prod = await prodModel.searchProduct('BARRETT');
            expect(prod).to.have.property('id');
            expect(prod).to.have.property('name');
            expect(prod).to.have.property('quantity');
        });

        it('Será avaliado se o retorno é do tipo object', async () => {
            const prod = await prodModel.searchProduct('BARRETT');
            expect(prod).to.be.a('object');
        });
    })

    describe('7 - Testando a criação de uma nova venda', () => {

        before(async () => {
            sinon.stub(connection, 'query').resolves([{ insertId: 5 }]);
            sinon.stub(connection, 'execute').resolves([mockSales.saleManipulation]);
        });

        after(async () => {
            connection.execute.restore();
        });

        it('Será validado se o id da nova venda cadastrada é retornado', async () => {
            const newSale = await saleModel.createSaleProducts(mockSales.saleManipulation);
            expect(newSale).to.equals(5);
        });
    })

    describe('8 - Testando a listagem das vendas', async () => {

        before(async () => {
            sinon.stub(connection, 'execute').resolves([mockSales.allSales]);
        });

        after(async () => {
            connection.execute.restore();
        });

        const sales = await saleModel.getSales();

        it('Será validado se o retorno é um array', () => {
            expect(sales).to.be.an('array');
        });

        it('Será validado se o retorno é um array com 3 objetos', () => {
            expect(sales.length).toBe(3);
        });

        it('Será validado se o retorno possui as propriedades corretas', () => {
            expect(sales).to.have.a.property('saleId');
            expect(sales).to.have.a.property('date');
            expect(sales).to.have.a.property('product_id');
            expect(sales).to.have.a.property('quantity');
        });    
    })

    describe('9 - Testando a atualização de uma venda', () => {
        before(async () => {
            sinon.stub(connection, 'execute').resolves([mockSales.saleManipulation]);
        });

        after(async () => {
            connection.execute.restore();
        });

        it('Será validado se é retornado um array com os detalhes da venda', async () => {
            const edit = await saleModel.editSale(1, mockSales.saleManipulation);
            expect(edit.saleDetails).to.be.an('array');
        })

        it('Será validado se é retornado o objeto da venda com a nova quantidade', async () => {
            const edit = await saleModel.editSale(1, mockSales.saleManipulation);
            expect(edit.saleDetails[0]).to.have.a.property('quantity').equals(3);
        })
    });

    describe('10 - Testando a procura de vendas por id', () => {

        before(async () => {
            sinon.stub(connection, 'execute').resolves([mockSales.allSales.filter((sale) => sale.saleId === 4)]);
        });

        after(async () => {
            connection.execute.restore();
        });

        it('Será validado que o retorno possui apenas as vendas esperadas', async () => {
            const salesById = await saleModel.getOneSale(4);
            expect(salesById.length).to.be.equals(3);
        });

        it('Será validado se é retornado um array com os detalhes das vendas', async () => {
            const sales = await saleModel.getOneSale(4);
            expect(sales).to.be.an('array');
        });
    });

    describe('11 - Testando a remoção de uma venda', () => {

        before(async () => {
            sinon.stub(connection, 'execute').resolves();
        });

        after(async () => {
            connection.execute.restore();
        });

        it('Será validado que a função apresenta retorno nulo', async () => {
            const deleting = await saleModel.deleteSale();
            expect(deleting).to.be.a('undefined');
        });
    })
})
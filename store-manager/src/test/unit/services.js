const { expect } = require('chai');
const sinon = require('sinon');

const saleModel = require('../../models/salesModel');
const saleService = require('../../services/salesService');

const prodModel = require('../../models/productModel');
const prodService = require('../../services/productService');
const prodMiddle = require('../../middlewares/productsMiddle');

const { saleManipulation, allSales, salesById } = require('./mocks/mockSales');

const { insertProduct, allProducts, editProduct } = require('./mocks/mockProducts');

describe('Testa o funcionamento da camada service', () => {
    describe('1- Ao editar um produto', () => {

        const editingProduct = {
            "id": 1,
            "name": "Cheytac",
            "quantity": 10
        }

        before(async () => {
            sinon.stub(prodModel, 'editOne').resolves(editingProduct);
            sinon.stub(prodMiddle, 'findProductById').resolves(editingProduct);
        })
        after(async () => {
            prodModel.editOne.restore();
            prodMiddle.findProductById.restore();
        })

        it('Será validado se o retorno é do tipo objeto', async () => {
            const editing = await prodService
            .editProduct(editingProduct.id, editingProduct.name, editingProduct.quantity);
            expect(editing).to.be.a('object');
        });

        it('Será validado se o code do obj existe', async () => {
            const editing = await prodService
            .editProduct(editingProduct.id, editingProduct.name, editingProduct.quantity);
            expect(editing.code).to.exist;
        });
    })

    describe('2 - Ao remover um produto por id', () => {
        
        const mockProd = {
            "id": 1,
            "name": "AWP",
            "quantity": 4
        };

        before(async () => {
            sinon.stub(prodMiddle, 'findProductById').resolves(mockProd);
            sinon.stub(prodModel, 'deleteOne').resolves(undefined);
        });

        after(async () => {
            prodModel.deleteOne.restore();
            prodMiddle.findProductById.restore();
        });

        it('Será validado se o tipo de retorno é um objeto', async () => {
            const removing = await prodService.deleteProduct(1);
            expect(removing).to.be.a('object');
        });
    });

    describe('3 - Ao registrar um produto novo', async () => {

        before(async () => {
            sinon.stub(prodModel, 'createProduct').resolves(insertProduct);
        });

        after(async () => {
            prodModel.createProduct.restore();
        });

        const register = await prodService.create(insertProduct);
        it('Será validado se o tipo de retorno é um objeto', async () => {
            expect(register).to.be.a('object');
        });

        it('Será validado que o retorno possui status de fracasso', () => {
            expect(register.code).to.be.equals(400)
        })
    });

    describe('4 - Ao buscar todos os produtos', async () => {

        before(async () => {
            sinon.stub(prodModel, 'getAll').resolves(allProducts);
        });

        after(async () => {
            prodModel.getAll.restore();
        });

        const register = await prodService.getAllProducts();
        
        it('Será validado se o tipo de retorno é um array', () => {
            expect(register).to.be.a('array');
        });

        it('Será avaliado se todos os produtos são listados', () => {
            expect(register.allProds).to.have.lengthOf(3);
        });

        it('Será avaliado se o retorno contém us satatus 200', () => {
            expect(register.code).to.be.equals(200);
        });
    });

    describe('5 - Testando a busca do produto pelo id', () => {

        before(async () => {
            sinon.stub(prodMiddle, 'findProductById').resolves(allProducts[0]);
        });

        after(async () => {
            prodMiddle.findProductById.restore();
        });

        it('Será validado que o retorno é um objeto', async () => {
            const findP = await prodService.getOneProduct(allProducts[0].id);
            expect(findP).to.be.a('object');
        });

        it('Será validado que o retorno é um objeto com as devidas chaves', async () => {
            const findP = await prodService.getOneProduct(allProducts[0].id);
            expect(findP.code).to.exist;
        });

    });

    describe('6 - Ao solicitar a listagem das vendas', () => {

        before(async () => {
            sinon.stub(saleModel, 'getSales').resolves(allSales);
        });

        after(async () => {
            saleModel.getSales.restore();
        });

        it('Será validado o tipo de retorno como um objeto', async () => {
            const sales = await saleService.showSales();
            expect(sales).to.be.a('object');
        });

        it('Será validado o tipo de retorno de vendas como sendo um array', async () => {
            const sales = await saleService.showSales();
            expect(sales.sales).to.be.a('array');
        });

        it('Será validado se o retorno da função apresenta status 200', async () => {
            const sales = await saleService.showSales();
            expect(sales.code).to.be.equals(200);
        });
    });

    describe('7 - Ao solicitar uma venda pelo seu id', () => {

        before(async () => {
            sinon.stub(saleModel, 'getOneSale').resolves(salesById[0]);
        });

        after(async () => {
            saleModel.getOneSale.restore();
        });

        it('Será validado se o tipo de retorno é um objeto', async () => {
            const get = await saleService.showOneSale(salesById[0].saleId);
            expect(get).to.be.a('object');
        });

        it('Será validado se o retorno contem um objeto com as informações venda', async () => {
            const get = await saleService.showOneSale(salesById[0].saleId);
            expect(get.oneSale).to.be.a('object');
        });

        
        it('Será validado se o retorno contém status 200', async () => {
            const get = await saleService.showOneSale(salesById[0].saleId);
            expect(get.code).to.be.equals(200);
        });
    });

    describe('8 - Ao solicitar a edição de uma venda', () => {

        before(async () => {
            sinon.stub(saleModel, 'editSale').resolves(1, saleManipulation);
        });

        after(async () => {
            saleModel.editSale.restore();
        });

        it('Será validado se o retorno é um objeto', async () => {
            const edit = await saleService.modificateSale(1, saleManipulation);
            expect(edit).to.be.a('object');
        });

        it('Será validado se o retorno contém status 200', async () => {
            const get = await saleService.modificateSale(1, saleManipulation);
            expect(get.code).to.be.equals(200);
        });

        it('Será validado se o retorno contém os detalhes da venda', async () => {
            const get = await saleService.modificateSale(1, saleManipulation);
            expect(get.saleDetails[0]).to.have.a.property('product_id');
            expect(get.saleDetails[0]).to.have.a.property('quantity');
        });

        it('Será validado se o retorno contém o id da venda', async () => {
            const get = await saleService.modificateSale(1, saleManipulation);
            expect(get.saleId).to.exist;
        });
    });
});

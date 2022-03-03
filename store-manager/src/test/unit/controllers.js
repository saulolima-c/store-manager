const sinon = require('sinon');
const { expect } = require('chai');

const prodService = require('../../services/productService');
const prodController = require('../../controllers/productController');

const { allProducts } = require('./mocks/mockProducts');


/* describe('Testando a camada dos controllers', () => {
    describe('1 - Testando a busca de todos os produtos', () => {
        const request = {};
        const response = {};

        const allProds = [
            {
                "id": 1,
                "name": "AWP",
                "quantity": 4
            },
            {
                "id": 2,
                "name": "BARRETT",
                "quantity": 5
            },
            {
                "id": 3,
                "name": "McMillan",
                "quantity": 3
            },
        ]

        before(() => {
            request.body = {};
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();

            sinon.stub(prodService, 'getAllProducts').resolves(allProds);
        });

        after(() => {
            sinon.restore();
          });

        it('Será validado se há um retorno com status 200', async () => {
            await prodController.showProducts(request, response);
            expect(prodService.getAllProducts.calledOnce).to.be.true;
            expect(response.status.calledWith(200)).to.be.true;
        });
    })
}) */

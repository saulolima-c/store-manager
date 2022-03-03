const allSales = [
	{
		"saleId": 1,
		"date": "2022-02-07T14:15:04.000Z",
		"product_id": 1,
		"quantity": 4
	},
	{
		"saleId": 1,
		"date": "2022-02-07T14:15:04.000Z",
		"product_id": 1,
		"quantity": 55
	},
	{
		"saleId": 1,
		"date": "2022-02-07T14:15:04.000Z",
		"product_id": 1,
		"quantity": 32
	},
	{
		"saleId": 2,
		"date": "2022-02-07T14:15:04.000Z",
		"product_id": 1,
		"quantity": 4
	},
	{
		"saleId": 2,
		"date": "2022-02-07T14:15:04.000Z",
		"product_id": 1,
		"quantity": 55
	},
	{
		"saleId": 2,
		"date": "2022-02-07T14:15:04.000Z",
		"product_id": 1,
		"quantity": 32
	},
	{
		"saleId": 3,
		"date": "2022-02-07T14:15:04.000Z",
		"product_id": 22,
		"quantity": 2
	},
	{
		"saleId": 3,
		"date": "2022-02-07T14:15:04.000Z",
		"product_id": 23,
		"quantity": 6
	},
	{
		"saleId": 3,
		"date": "2022-02-07T14:15:04.000Z",
		"product_id": 1,
		"quantity": 32
	},
	{
		"saleId": 4,
		"date": "2022-02-07T14:15:04.000Z",
		"product_id": 22,
		"quantity": 4
	},
	{
		"saleId": 4,
		"date": "2022-02-07T14:15:04.000Z",
		"product_id": 23,
		"quantity": 3
	},
	{
		"saleId": 4,
		"date": "2022-02-07T14:15:04.000Z",
		"product_id": 1,
		"quantity": 32
	}
];

const salesPayload = [
	{
		"date": "2022-02-15:05:06.000Z",
		"product_id": 1,
		"quantity": 10
	},
	{
		"date": "2022-02-15:05:06.000Z",
		"product_id": 3,
		"quantity": 9
	},
	{
		"date": "2022-02-06:05:1506.000Z",
		"product_id": 2,
		"quantity": 8
	}
];

const saleManipulation =   [
	{
		"product_id": 2,
		"quantity": 3
	}
];

const salesById = [
	{
		"saleId": 1,
		"date": "2022-02-15:05:06.000Z",
		"product_id": 1,
		"quantity": 48
	},
	{
		"saleId": 2,
		"date": "2022-02-15:05:06.000Z",
		"product_id": 1,
		"quantity": 49
	},
]

module.exports = { allSales, saleManipulation, salesPayload, salesById };
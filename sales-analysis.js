const products = [
    {
        id: 1,
        name: 'foo',
        price: 7
    },
    {
        id: 2,
        name: 'bar',
        price: 2
    },
    {
        id: 5,
        name: 'bazz',
        price: 1
    },
];

const users = [
    {
        id: 1,
        name: 'moe'
    },
    {
        id: 2,
        name: 'larry'
    },
    {
        id: 3,
        name: 'curly'
    }
];

// productId matches up with product in products
// userId matches up with user in users
const orders = [
    {
        id: 1,
        productId: 1,
        quantity: 3,
        userId: 1
    },
    {
        id: 2,
        productId: 1,
        quantity: 7,
        userId: 1
    },
    {
        id: 3,
        productId: 5,
        quantity: 70,
        userId: 3
    },
    {
        id: 3,
        productId: 5,
        quantity: 1,
        userId: 3
    }
];

function productsPurchased(orders, products) {
    // loop through the orders to create an array of unique productIDs 
    // [1, 5]
    let purchasedProductIDs = [];

    orders.forEach(function (order) {
        if (!purchasedProductIDs.includes(order.productId)) purchasedProductIDs.push(order.productId);
    })

    // create an array of name of product purchased, using an array of productIDs
    let purchasedProductNames = [];

    purchasedProductNames = products.reduce(function (nameArr, product) {
        if (purchasedProductIDs.includes(product.id)) {
            return nameArr.concat(([product.name]));
        } else {
            return nameArr;
        }
    }, []);

    return purchasedProductNames;
};

function topSellingProductByQuantity(orders, products) {
    // create a freq obj
    let productSold = {}

    orders.forEach(function (order) {
        productSold[order.productId] = (productSold[order.productId] || 0) + order.quantity;
    })

    // find the id with the highest freq
    let maxQuantSold = 0, productIDSoldMost;

    for (let key in productSold) {
        if (productSold[key] > maxQuantSold) {
            productIDSoldMost = key;
            maxQuantSold = productSold[key];
        }
    }

    let topProd = products.filter(function (product) {
        return product.id == productIDSoldMost;
    })

    // console.log the product name
    return topProd[0].name;
};

function usersWithOrders(users, orders) {
    let customerIDs = [];

    orders.forEach(function (order) {
        if (!customerIDs.includes(order.userId)) customerIDs.push(order.userId);
    })

    return users.reduce(function (names, user) {
        if (customerIDs.includes(user.id)) {
            return names.concat([user.name])
        } else {
            return names;
        }
    }, []);
};

console.log(productsPurchased(orders, products)); // logs foo and bar products

console.log(topSellingProductByQuantity(orders, products));//logs bazz product

console.log(usersWithOrders(users, orders));//logs info on moe and curly
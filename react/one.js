"use strict";
//type script 
let isActive = false;
const catalog = [
    { id: 1, title: "Huawei", price: 100, isAvaliable: true },
    { id: 2, title: "Xiaomi", price: 150, isAvaliable: true },
    { id: 3, title: "MC", price: 200, isAvaliable: false },
];
function getAvaliableProduct(products) {
    return products.filter(product => product.isAvaliable)
        .map(product => product.title);
}
console.log(getAvaliableProduct(catalog));

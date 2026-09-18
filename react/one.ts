//type script 
let isActive:boolean = false;

// unknown - требует явной проверки типа
// any - полностью отключает проверку типов данных. похоже на динамическое поведение

// массивы и кортежи
// number[] - массивы
// [string, number] - кортежи

// void never
// never - не закончится естесственным путем

interface Product{
    id: number,
    title: string,
    price: number,
    isAvaliable: boolean,
}

const catalog:Product[] = [
    {id: 1, title: "Huawei", price: 100, isAvaliable: true},
    {id: 2, title: "Xiaomi", price: 150, isAvaliable: true},
    {id: 3, title: "MC", price: 200, isAvaliable: false},
];

function getAvaliableProduct(products:Product[]):string[]{
    return products.filter(product=>product.isAvaliable)
    .map(product => product.title)
}

console.log(getAvaliableProduct(catalog));
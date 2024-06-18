let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

// console.log(title, price, taxes, ads, discount, total, count, category, submit);


function getTotal() {
    // console.log('in total')
    if(price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value

        total.innerHTML = result;

        total.style.background = '#040';
    } else {
        total.innerHTML = "";
        total.style.background = '#a00d02';
    }
}

// Create Products
let Products;
if(localStorage.products != null){
    Products = JSON.parse(localStorage.products);
} else {
    Products = [];
}

submit.onclick = function() {

    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }

    Products.push(newProduct);
    
    localStorage.setItem('products', JSON.stringify(Products));
    // console.log(Products);

    ClearData();
    showData();
}


// Clear Inputs 
function ClearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
// Show Data
function showData() {
    let table = '';
    for (let i = 0; i < Products.length; i++){
        table += `
                    <tr>
                        <td>${i}</td>
                        <td>${Products[i].title}</td>
                        <td>${Products[i].price}</td>
                        <td>${Products[i].taxes}</td>
                        <td>${Products[i].ads}</td>
                        <td>${Products[i].discount}</td>
                        <td>${Products[i].total}</td>
                        <td>${Products[i].category}</td>
                        <td><button id="update">update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
                    </tr>
                `
    }
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if (Products.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAllProducts()" id="delete">Delete All</button>`
    }
    else {
        btnDelete.innerHTML = '';
    }
}

showData();


// Delete Product 
function deleteProduct(id){
    Products.splice(id, 1);
    localStorage.products = JSON.stringify(Products);

    showData();
}

function deleteAllProducts() {
    localStorage.clear();
    Products.splice(0);
    showData();
}
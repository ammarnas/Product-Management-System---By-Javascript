let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mode = 'create';
let tempIndex;
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
    if(title.value != ''
    && price.value != '' 
    && category.value != ''
    && count.value < 100) {
        if(mode === 'create') {
            if(newProduct.count > 1){
                for(let i = 0; i < newProduct.count; i++){
                    Products.push(newProduct);
            }
        } else {
            Products.push(newProduct);
        }
        } else {
            Products[tempIndex] = newProduct;
            mode = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        } 
        ClearData();
    }
    
    
    
    localStorage.setItem('products', JSON.stringify(Products));
    // console.log(Products);

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
    getTotal();

    let table = '';
    for (let i = 0; i < Products.length; i++){
        table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${Products[i].title}</td>
                        <td>${Products[i].price}</td>
                        <td>${Products[i].taxes}</td>
                        <td>${Products[i].ads}</td>
                        <td>${Products[i].discount}</td>
                        <td>${Products[i].total}</td>
                        <td>${Products[i].category}</td>
                        <td><button onclick="updateProduct(${i})" id="update">update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
                    </tr>
                `
    }
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if (Products.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAllProducts()" id="delete">Delete All (${Products.length})</button>`
    }
    else {
        btnDelete.innerHTML = '';
    }
}

showData();


// Delete Product 
function deleteProduct(index){
    Products.splice(index, 1);
    localStorage.products = JSON.stringify(Products);

    showData();
}
// Delete All Products
function deleteAllProducts() {
    localStorage.clear();
    Products.splice(0);
    showData();
}

function updateProduct(index) {
    title.value = Products[index].title;
    price.value = Products[index].price;
    taxes.value = Products[index].taxes;
    ads.value = Products[index].ads;
    discount.value = Products[index].discount;
    category.value = Products[index].category;

    getTotal();

    count.style.display = 'none';

    submit.innerHTML = 'Update';

    mode = 'update';

    tempIndex = index;

    scroll({
        top:0,
        behavior: 'smooth'
    })
}


let searchMode = 'title';
function getSearchMode(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMode = 'title';
    } else {
        searchMode = 'category';
    }

    search.placeholder = 'Search By ' + searchMode.toUpperCase();

    search.focus();
    
    search.value = '';

    showData();
}

function searchProduct(textSearch){
    let table = '';
    for(let i = 0; i < Products.length; i++){

    if(searchMode == 'title') {
            if(Products[i].title.toLowerCase().includes(textSearch.toLowerCase())){
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
                            <td><button onclick="updateProduct(${i})" id="update">update</button></td>
                            <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
                        </tr>
                    `            
        
        }
    }else {
            if(Products[i].category.toLowerCase().includes(textSearch.toLowerCase())){
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
                            <td><button onclick="updateProduct(${i})" id="update">update</button></td>
                            <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
                        </tr>
                    `            
        }
    }
}
    document.getElementById('tbody').innerHTML = table;
}
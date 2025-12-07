const products = [
    { id: 'mug', name: 'مج سيراميك', image: 'assets/images/products/mug-base.jpg' },
    { id: 'notebook', name: 'أجندة جلد', image: 'assets/images/products/notebook.jpg' },
    { id: 'pen', name: 'قلم معدني', image: 'assets/images/products/pen.jpg' }
];

const productSelect = document.getElementById('product-select');
if(productSelect) {
    products.forEach(prod => {
        const option = document.createElement('option');
        option.value = prod.image;
        option.textContent = prod.name;
        productSelect.appendChild(option);
    });
}
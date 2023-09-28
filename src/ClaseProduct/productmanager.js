const fs = require('node:fs')

class product {
    constructor(id, title, description, price, code, stock) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._price = price;
        this._code = code;
        this._stock = stock;
    }

    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    } get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;

    } get code() {
        return this._code;
    }
    set code(value) {
        this._code = value;
    } get stock() {
        return this._stock;
    }
    set stock(value) {
        this._stock = value;
    }
}

 class ProductManager {

    constructor(products) {
        this._products = products
        this.path = './Productos.txt'
    }
    static id = 1

    addProduct(product) {

        product._id = ProductManager.id++
        this._products.push(product)
        //const fileExists = fs.existsSync(this.path)
        fs.writeFileSync(this.path, JSON.stringify(this._products))

    }
    getProducts() {

        const fileExists = fs.existsSync(this.path)

        if (fileExists) {
            let fileContent = fs.readFileSync(this.path, 'utf-8')
            //fs.appendFileSync('./Productos.txt', ' Más contenido')
            return JSON.parse(fileContent)
            //fileContent = fs.readFileSync('./Productos.txt', 'utf-8')
            //console.log(fileContent)
            //fs.unlinkSync(this.path)

        }

    }
    getProductsById(id) {


        let fileContent = fs.readFileSync(this.path, 'utf-8')
        let arreglo = JSON.parse(fileContent)

        const product = arreglo.find((p) => p._id === id);


        if (product) {
            console.log(`Producto encontrado:\nId: ${product._id}\nNombre: ${product._title}\nDescripción: ${product._description}\nPrecio: ${product._price}\nCódigo: ${product._code}\nStock: ${product._stock}`);
        } else {
            console.log("Producto no encontrado.");
        }

    }
    /* updateProduct(id, campo){
         let fileContent = fs.readFileSync(this.path, 'utf-8')
         let arreglo = JSON.parse(fileContent)
 
         const product = arreglo.find((p) => p._id === id);
         
         let aux = product.indexOf(2)
         console.log()
 
     }*/
    async updateProduct(id, updatedProductData) {
        try {
            // Obtenemos todos los productos actuales del archivo
            // const products = await this.getProducts();

            let fileContent = fs.readFileSync(this.path, 'utf-8')
            let arreglo = JSON.parse(fileContent)

            // Buscamos el índice del producto que tiene el ID proporcionado
            const index = arreglo.findIndex(product => product._id === id);
            // Si no encontramos un producto con el ID, retornamos null
            if (index === -1) {
                return null;
            }

            // Creamos un nuevo objeto actualizado fusionando el producto existente con los datos actualizados
            const updatedProduct = { ...arreglo[index], ...updatedProductData };

            // Reemplazamos el producto existente en el arreglo de productos con el producto actualizado
            arreglo[index] = updatedProduct;

            // Guardamos los productos actualizados en el archivo
            fs.writeFileSync(this.path, JSON.stringify(arreglo))

            // Retornamos el producto actualizado
            return updatedProduct;
        } catch (error) {
            console.error('Error updating product:', error);

            // Si ocurre un error, retornamos null
            return null;
        }

    }


    deleteProduct(id) {

        let fileContent = fs.readFileSync(this.path, 'utf-8')
        let arreglo = JSON.parse(fileContent)

        let filterA = arreglo.splice(id, 1)

        console.log("Eliminado: ")
        console.log(filterA)

        console.log(arreglo)
    }

}

const product1 = new product(0, "Gaseosa", "description1", 1, 1111, 1)
const product2 = new product(0, "torta", "description2", 2, 222, 2)
const product3 = new product(0, "Pasta", "description3", 3, 333, 3)
const product4 = new product(0, "fiambre", "description4", 4, 444, 4)
const product5 = new product(0, "queso", "description5", 5, 555, 5)
const product6 = new product(0, "sal", "description6", 6, 666, 6)
//const productActualizado = new product(0,"Tortita", "description3", 9, 222, 3)

const productManager = new ProductManager([product1])

productManager.addProduct(product2)
productManager.addProduct(product3)
productManager.addProduct(product4)
productManager.addProduct(product5)
productManager.addProduct(product6)

module.exports = ProductManager
// console.log(productManager.getProducts())

//productManager.getProductsById(1)

//console.log(productManager.updateProduct(2, productActualizado))

//productManager.getProductsById(1)

//productManager.deleteProduct(1)

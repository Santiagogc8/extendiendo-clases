import * as fs from 'fs';

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
  }
  add(nuevaCosa) {
    this.cosas.push(nuevaCosa);
  }
  getCosas() {
    return this.cosas;
  }
}

class Product {
  name: string;
  price: number;
  id: number;
  constructor(name: string, price: number, id: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }
}

class ListaDeProductos extends ListaDeCosas {
    // Eliminamos la propiedad 'products' y usaremos 'cosas' de la clase padre
    constructor (name){
      super(name);

      // Se asume que products.json siempre existirá en la misma ruta.
      // Si el archivo no existe, esta línea causará un error y detendrá el programa.
      const data = fs.readFileSync('./src/products.json', 'utf-8'); // Lee el archivo
      
      const productos = JSON.parse(data); // Parsea el contenido a un objeto

      productos.forEach(p => {
        this.addProduct(p); // Pasamos el objeto simple directamente
      });

    }

  addProduct(product: { id: number; name: string; price: number }): void {
    const exists = this.cosas.some(p => p.id === product.id);
    if (!exists) {
      this.add(product);
    } else {
      console.log(`El producto con id ${product.id} ya existe.`);
    }
  }


  getProduct(id: number): Product | undefined { // Ahora puede retornar Product o undefined

    // Guardamos el resultado del find en una variable
    const buscarProducto = this.cosas.find(p => p.id == id); // Busca en 'cosas'

    // Si la variable retorna undefined (producto no encontrado), no lanza error, solo lo retorna
    return buscarProducto; 
  }

  removeProduct(id: number): void {
    const index = this.cosas.findIndex(p => p.id == id); // Usamos findIndex para encontrar el indice del id que estamos buscando en 'cosas'

    if(index === -1){
      console.log(`El producto con el id ${id} no se encuentra`); // Muestra un mensaje por consola
      return; // Termina la funcion
    }

    this.cosas.splice(index, 1); // Elimina el elemento desde el indice (index) y solo 1 elemento de 'cosas'
    console.log(`El elemento con id ${id} fue eliminado`);
  }

  getSortedByPrice(order: string): Product[] {
    const sortedProducts = [...this.cosas]; // Hacemos una copia del array 'cosas' con el spread operator

    sortedProducts.sort((a: Product, b: Product) => { // Usamos sort que recibe 2 parametros
      // Comparar precios según el orden
      if (order === 'asc') { // Si el valor de order es === asc
        return a.price - b.price; // Crea un orden ascendente
      } else if (order === 'desc') { // Si es igual a desc
        return b.price - a.price; // Crea un orden descendente
      } else { // Si nada se cumple
        throw new Error(`Orden '${order}' no válido. Usa 'asc' o 'desc'.`); // Envia un error
      }
    });

    return sortedProducts; // Retornar el array ordenado
  }  
}

export { ListaDeProductos, Product };
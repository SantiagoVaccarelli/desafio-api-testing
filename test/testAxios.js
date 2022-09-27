import axios from 'axios';
axios.defaults.baseURL ='http://localhost:8080/api/productos';

let id;

async function Pruebas(){
    await PruebaMostrar()
    await PruebaCrear()
    await PruebaActualizar()
    await PruebaBorrar()
}

async function PruebaMostrar(){
    try{
        const response = await axios.get('/');
        if(Array.isArray(response.data)) {
        	console.log('Done')
        }
        else{ console.log('No se pudieron leer los productos')}
    }catch(error){ console.log(`${error}`)}
}

async function PruebaBorrar() {
    try {
      	const response = await axios.delete(`/${id}`);
      	if (response.data.message == 'Producto borrado correctamente') {
			console.log('Done')
		}
      	else{console.log("error");
		}
    }catch(error){
		console.log(`${error}`);}
}
  

async function PruebaCrear(){
    try{
        const response = await axios.post('/', {
			nombre: "Compu",
			codigo: "123",
			precio: 44,
			stock: 3,
			thumbnail:"img1"
        });
        const {nombre, codigo, thumbnail, precio, stock, _id} = response.data.producto;
        if(nombre && codigo && thumbnail && precio && stock && _id){
			id = _id
			console.log('Done')
		}
        else console.log("error"); 
    }catch(error){ 
		console.log(`${error}`);
	}
}

async function PruebaActualizar() {
    try {
      const res = await axios.put(`/${id}`, {
			nombre: "Tele",
			codigo: "123",
			precio: 44,
			stock: 3,
			thumbnail:"img1"
		});
      	if (res.data.message == 'Producto actualizado correctamente') {
			console.log('Done')
		}
    	else{console.log("error");}
    }catch(error){ 
		console.log(`${error}`);
	}
}

Pruebas()
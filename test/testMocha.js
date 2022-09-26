import supertest from 'supertest';
import chai from 'chai';
const request = supertest('http://localhost:8080/api/productos');
const expect = chai.expect;

describe('test productos', () => {
    describe('lista de productos', () => {
        it('Debería retornar un status 200', async () => {
        const response = await request.get('/');
        expect(response.status).to.eql(200);
        });
        
        it('Debería retornar un objeto como data', async () => {
        const response = await request.get('/');
        expect(response.body).to.be.a('array');
        });
    });

    describe('crear producto', async () => {
        it('Debería retornar un status 201', async () => {
            const response = await request.post('/').send({
                nombre: "Tele",
                codigo: "123",
                precio: 44,
                stock: 3,
                thumbnail:"img1"
            });
            expect(response.status).to.eql(201);
            expect(response.body.producto).include.keys( 'nombre', 'codigo', 'thumbnail', 'precio', 'stock', '_id', "__v");
            expect(response.body.producto.nombre).to.eql('Tele');
            expect(response.body.producto.codigo).to.eql('123');
            expect(response.body.producto.thumbnail).to.eql('img1');
            expect(response.body.producto.precio).to.eql(44);
            expect(response.body.producto.stock).to.eql(3);
        });
    });


    describe('actualizar producto', async () => {
        it('Debería retornar un status 200 y modificar un producto', async () => {
            let response = await request.post('/').send({
                nombre: "Tele",
                codigo: "123",
                precio: 44,
                stock: 3,
                thumbnail:"img1"
            });
            const productId = response.body.producto._id;
            response = await request.put(`/${productId}`).send({
                nombre: "Compu",
                codigo: "123",
                precio: 44,
                stock: 3,
                thumbnail:"img1"
            });
            expect(response.status).to.eql(200);
            expect(response.body.message).to.eql('Producto actualizado correctamente')
        });
    });

    describe('borrar producto', async () => {
        it('Debería retornar un status 200 y borrar un producto', async () => {
            let response = await request.post('/').send({
                nombre: "Compu",
                codigo: "123",
                precio: 44,
                stock: 3,
                thumbnail:"img1"
            });
            const productId = response.body.producto._id;
            response = await request.delete(`/${productId}`);
            expect(response.status).to.eql(200);
            expect(response.body.message).to.eql('Producto borrado correctamente')
        });
    });
 });
const chai      = require('chai')
const supertest = require('supertest')

const expect    = chai.expect
const requester = supertest('http://localhost:8000')

describe('Testist de Adoptame', () => {
    describe('Test de mascotas', ()=>{
        it('El endpoint POST /api/pets debe creaer una mascota correctamente', async () => {
            const petMock = {
                name: 'Patitas',
                specie: 'Pez',
                birthDate: '10-10-2023'
            }
            // resp => _body({status y payload}) - ok (booleano) - statusCode (200) - status
            const {_body, ok, statusCode, status} = await requester.post('/api/pets').send(petMock)
            // console.log(_body, ok, statusCode, status)
            expect(_body.payload).to.have.property('_id')            
        })
        it('El endpoint POST /api/pets debe devolver un status 400 al intentar crear una mascota sin un campo obligatorio', async ()=>{
            const petMock = {
                // name: 'Patitas',
                specie: 'Pez',
                birthDate: '10-10-2023'
            }

            const {statusCode} = await requester.post('/api/pets').send(petMock)
            expect(statusCode).to.equal(400)
        })
        // it('El endpoint GET /api/pets/:pid debe devolver una mascota por el id', async () => {
        //     const petMock = {
        //         name: 'Patitas',
        //         specie: 'Pez',
        //         birthDate: '10-10-2023'
        //     }

        //     const response = await requester.post('/api/pets').send(petMock)
        //     expect(response._body.payload).to.have.property('_id')
        //     // console.log(response._body)
        //     const { _body, ok, statusCode } = await requester.get(`/api/pets/${response._body.payload._id}`)
        //     // console.log(_body)
        //     expect(ok).to.be.equal(true)
        //     expect(statusCode).to.be.equal(200)
        //     expect(_body.payload._id).to.be.equal(response._body.payload._id)
        // })
    })

    describe('Test avanzado de sessions', () => {
        let cookie

        // it('El endpoint POST /api/sessions/register debe registrar un usuario correctamente', async () => {
        //     const mockUser = {
        //         first_name: 'Federico', 
        //         last_name:  'Osandón', 
        //         email: 'supertest@gmail.com', 
        //         password: '123456'                
        //     }            

        //     const {_body} = await requester.post('/api/sessions/register').send(mockUser)
        //     expect(_body).to.be.ok
        // })

        it('El endpoint POST /api/sessions/login debe devolver una cookie al loguear un usuario registrado', async () => {
            const mockUser = {
                email: 'supertest@gmail.com', 
                password: '123456'                
            }   

            const result = await requester.post('/api/sessions/login').send(mockUser)
            // console.log(result.headers)
            const cookieResult = result.headers['set-cookie'][0] // coderCookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRmVkZXJpY28gT3NhbmTDs24iLCJyb2xlIjoidXNlciIsImVtYWlsIjoic
            expect(cookieResult).to.be.ok

            cookie = { // ['coderCookie', 'aaskdfhaskjdfhasdfsadf']
                name: cookieResult.split('=')[0], // coderCookie
                value: cookieResult.split('=')[1] // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi
            }

            expect(cookie.name).to.be.ok.and.eql('coderCookie')
            expect(cookie.value).to.be.ok
        })
        it('El endpoint GET /api/sessinos/current debe recibir una cookie y devolver el usurio que contiene', async () => {
            const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`])
            expect(_body.payload.email).to.be.eql('supertest@gmail.com')
        })

    })

    describe('Test de upload', ()=>{
        it('Debe crear una mascota con imagen', async () => {
            const petMock = {
                name: 'Aletitas',
                specie: 'perro',
                birthDate: '10-10-2023'
            }

            const result = await requester.post('/api/pets/withimage')
                                                    .field('name', petMock.name)
                                                    .field('specie', petMock.specie)
                                                    .field('birthDate', petMock.birthDate)
                                                    .attach('image', './test/aletitas.jpg')

            expect(result.status).to.be.eql(200)
            expect(result._body.payload).to.have.property('_id')
            expect(result._body.payload.image).to.be.ok
        })
    })
})

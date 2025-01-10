// import mongoose from 'mongoose'
const mongoose = require('mongoose')
const Users = require('../src/dao/Users.dao')
const Assert = require('node:assert')

mongoose.connect('mongodb://127.0.0.1:27017/c70135test')
const assert = Assert.strict


describe('Testing de User Dao', function(){
    before(function() {
        this.usersDao = new Users()
    })

    beforeEach(function() {
        mongoose.connection.collections.users.drop()
        this.timeout(5000)
    })
    it('El Dao debe poder obtener todos los usuarios en formato arreglo', async function(){
        // console.log(this.usersDao)

        const result = await this.usersDao.get()
        assert.strictEqual(Array.isArray(result), true)
    })

    it('El Dao debe agregar un usuario correctamente a la base de datos', async function() {
        let mockUser = {
            first_name: 'Fede',
            last_name: 'Osandón',
            email: 'f@gmai.com',
            password: "123456"
        }

        const result = await this.usersDao.save(mockUser)
        assert.ok(result._id)
    })

    it('El Dao agregará al documento insertado un arraglo de mascotas vacío por defecto', async function() {
        let mockUser = {
            first_name: 'Fede',
            last_name: 'Osandón',
            email: 'f@gmai.com',
            password: "123456"
        }

        const result = await this.usersDao.save(mockUser)


        assert.deepStrictEqual(result.pets, [])
    })


    it('El Dao puede obtener a un usuario por el email', async function() {
        let mockUser = {
            first_name: 'Fede',
            last_name: 'Osandón',
            email: 'f@gmai.com',
            password: "123456"
        }

        const result = await this.usersDao.save(mockUser)

        const user = await this.usersDao.getBy({email: result.email})
        assert.strictEqual(typeof user, 'object')
    })

})
const mongoose = require('mongoose')
const Users = require('../src/dao/Users.dao')
const chai = require('chai')

const expect = chai.expect
mongoose.connect('mongodb://127.0.0.1:27017/c70135test')

describe('Testing de Users Dao', ()=>{
    before(function() {
        this.usersDao = new Users()
    })

    beforeEach(function() {
        mongoose.connection.collections.users.drop()
        this.timeout(5000)
    })

    // it('El Dao debe poder obtener todos los usuarios en formato arreglo', async function(){
    //     // console.log(this.usersDao)

    //     const result = await this.usersDao.get()
    //     console.log(result)
    //     expect(result).to.be.deep.equal([])
    // })
    it('El dao debe poder obtener los usuarios en formato de arreglo', async function(){
        const result = await this.usersDao.get()
        expect(result).to.be.deep.equal([])
        expect(result).deep.equal([])
        expect(Array.isArray(result)).to.be.ok
        expect(Array.isArray(result)).to.be.equals(true)
    })

    it('El Dao debe agregar un usuario correctamente a la base de datos', async function() {
        let mockUser = {
            first_name: 'Fede',
            last_name: 'Osandón',
            email: 'f@gmai.com',
            password: "123456"
        }

        const result = await this.usersDao.save(mockUser)

        expect(result._id).to.exist
        expect(result).to.have.property('_id')

    })

})

const chai = require('chai')
const { createHash, passwordValidation } = require('../src/utils')
const UserDTO = require('../src/dto/User.dto')

const expect = chai.expect

describe('Testing de bcrypt', () => {
    it('La función debe devolver un haseo efectivo del password', async ()=>{
        const password     = '123456'
        const passwordHash = await createHash(password) 

        expect(passwordHash).to.not.equal(password)
    })

    it('La función passwordValidation debe poder compoarar efectivamente el password haseado con el password', async ()=>{
        const password     = '123456'
        const passwordHash = await createHash(password) 
        const isValidPassword = await passwordValidation({password: passwordHash}, password)
        expect(isValidPassword).to.be.true
    })
    it('La función passwordValidation debe poder detectar efectivamente el password haseado fue alterado', async ()=>{
        const password     = '123456'
        const passwordHash = await createHash(password) 
        const passwordHashAlterado = passwordHash +'e'

        const isValidPassword = await passwordValidation({password: passwordHashAlterado}, password)
        expect(isValidPassword).to.be.false
    })

    

})

describe('Testing del Dto de Users', ()=>{
    it('El Dto debe devolver un user con compos de nombre y apellido unificados a name', ()=>{
        let mockUser = {
            first_name: 'Fede',
            last_name: 'Osandón',
            email: 'f@gmai.com',
            password: "123456"
        }

        const userDtoResult = UserDTO.getUserTokenFrom(mockUser)
        expect(userDtoResult).to.have.property('name', `${mockUser.first_name} ${mockUser.last_name}`)
    })
    it('El Dto debe devolver un user sin los compos innecesarios', ()=>{
        let mockUser = {
            first_name: 'Fede',
            last_name: 'Osandón',
            email: 'f@gmai.com',
            password: "123456"
        }

        const userDtoResult = UserDTO.getUserTokenFrom(mockUser)
        expect(userDtoResult).to.not.have.property('first_name')
        expect(userDtoResult).to.not.have.property('last_name')
        expect(userDtoResult).to.not.have.property('password')
    })
})
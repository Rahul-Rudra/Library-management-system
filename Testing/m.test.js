

process.env.NODE_ENV='test';
const request = require('supertest');
const mongoose = require('mongoose');
//const { check, validationResult } = require("express-validator/check");
const User=require('../models/User');

let server;

describe('/api/users',()=>{
    beforeEach(() => { server = require('../server'); })
    afterEach(async () => { 
      server.close(); 
      await User.remove({});
    });
  describe('POST /', () => {

    // Define the happy path, and then in each test, we change 
    // one parameter that clearly aligns with the name of the 
    // test. 
   
    let name; 
    let email;
    let password;
    let role;

    const exec = async () => {
      return await request(server)
        .post('/api/users')
        .send({ name,email,password,role });
    }

    beforeEach(() => {
      name = 'genre1';
      email='gen@gmail.com';
      password="123@genrea" ;
      role="user"
    })

    it('should return the user if it is valid', async () => {
        const res = await exec();
  
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name');
        //expect(res.body).toHaveProperty('payload.email');
      });

      it('should return 406 if name is less than 3 ', async () => {
          name='ra';
        const res = await exec();
  
        expect(res.status).toBe(406);
      });
      it('should return 406  password must be atleast 6 character', async () => {
        password='ra';
      const res = await exec();

      expect(res.status).toBe(406);
    });


  })

  describe('GET /', () => {

    /* const exec = async () => {
        return await request(server)
          .get('/api/users')
          
      } */
      it('should return all user', async () => {

    const genres = [
        
        { name: 'genre2' ,email:"genre2@gmail.com",password:'123@#asdf',role:"user"},
        { name: 'genre3' ,email:"genre3@gmail.com",password:'123@#asdf',role:"user"}
      ];
      
      await User.collection.insertMany(genres);
      const res = await request(server).get('/api/users');
      //const res = await exec();
      //expect(res.body).toHaveProperty('name');
      expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    }); 

  })
  
})



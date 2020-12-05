/**
 * ************************************
 *
 * @module  test for controllers
 * @author Elise and Lara
 * @date 12/3
 * @description unit tests for controllers
 *
 * ************************************
 */

const {menuController} = require('../server/controllers/menuController.js');
const regeneratorRuntime = require('regenerator-runtime/runtime');


 //describe
 describe('menuController', () => {
   //before all
   //clear redis server, pub, sub objects 
   //after all
   describe('connect', () => {
    // const mockRequest = (sessionData) => {
    //   return {
    //     session: { data: sessionData },
    //   };
    // };
    const mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };
     //write tests and assertions
     //grabs port accurately
     //correctly determines if port is empty
     //new instance of redis 
     //pass in wrong information --> 400,
     //pass in correct info --> 200
     //https://www.npmjs.com/package/redis-mock
     test('accurately grabs port number inputted by user', async () => {
       const mockReq = {body: {port: "2222"}};
       const mockRes = mockResponse();
       await menuController.connect(mockReq, mockRes);
       expect(mockRes.status).toHaveBeenCalledWith(200);
       
       
     })
   })
 })
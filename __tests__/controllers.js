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


// const mockResponse = () => {
//   const res = {};
//   //mock function for status
//   res.status = jest.fn().mockReturnValue(res);
//   res.json = jest.fn().mockReturnValue(res);
//   return res;
// };

// const mockRequest = (body) => {
//   return {body};
// }


//  //describe
//  describe('menuController', () => {
//    //before all
//    //clear redis server, pub, sub objects 
//    //after all
//    describe('connect', () => {
//     // const mockRequest = (sessionData) => {
//     //   return {
//     //     session: { data: sessionData },
//     //   };
//     // };
    
//      //write tests and assertions
//      //grabs port accurately
//      //correctly determines if port is empty
//      //new instance of redis 
//      //pass in wrong information --> 400,
//      //pass in correct info --> 200
//      //https://www.npmjs.com/package/redis-mock
//      test('accurately grabs port number inputted by user', async () => {
//        const req = mockRequest( 
//          {port: "6379"}
//          );
//        const res = mockResponse();
//        await menuController.connect(req, res);
//        expect(res.status).toHaveBeenCalledWith(200);
       
       
//      })
//    })
//  })
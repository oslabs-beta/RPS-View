const request = require('supertest');


const server = 'http://localhost:3000';





describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      })
    })

  });
  describe('/static', () => {
    it('responds with 200 status when static resource requested', () => {
      return request(server)
        .get('/static/RPS_View_logo.png')
        .expect(200)
    });
  });

  /**NOTE - need to add dependency injection -- this route depends on open redis-server */
  describe('/menu/connect', () => {
    it('responds with 200 and type json when connect is requested to an empty port', () => {
      //test any port
      //test '' -- will work if redis-server is running on port 6379
      return request(server)
        .post('/menu/connect')
        .send({port: ''})
        .expect('Content-Type', /json/)
        .expect(200)

    });
    it('responds with 200 and type json when connect is requested to default port', () => {
      return request(server)
          .post('/menu/connect')
          .send({port: '6379'})
          .expect('Content-Type', /json/)
          .expect(200)

    });
  });
})
/* index.test.js
 *
 * Basic tests of API and database.
 *
 * TODO: these tests should run on a test database.
 * NOTE: for now, they just clean themselves up.
*/
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./index');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

const cleanupIds = [];
const invalidId = 'postgres should ignore me';
const invalidObject = {
  wrongProperty: 10,
};
const validObject = {
  title: '1234567890',
  x: 10.12345,
  y: 20,
  velocityX: -20,
  velocityY: 30000000000.99,
  properties: {
    property1: 'test',
  },
};

describe('Testing API', () => {
  describe('/GET objects', () => {
    it('it should GET all objects', (done) => {
      chai.request(server)
        .get('/objects')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('/POST objects', () => {
    it('it should POST a valid object', (done) => {
      const object = validObject;
      chai.request(server)
        .post('/objects')
        .send(object)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.have.length(1);
          expect(res.body[0]).to.deep.include(object);
          cleanupIds.push(res.body[0].id);
          done();
        });
    });

    it('it should POST a valid object that encodes title as int and x/y/velocityX/velocityY as string', (done) => {
      const object = JSON.parse(JSON.stringify(validObject)); // deep copy so we can modify
      object.title = parseInt(object.title, 10);
      object.x = object.x.toString();
      object.y = object.y.toString();
      object.velocityX = object.velocityX.toString();
      object.velocityY = object.velocityY.toString();
      chai.request(server)
        .post('/objects')
        .send(object)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.have.length(1);
          expect(res.body[0]).to.deep.include(validObject);
          cleanupIds.push(res.body[0].id);
          done();
        });
    });

    it('it will try to POST an object with an explicit, invalid id that should be ignored', (done) => {
      const object = JSON.parse(JSON.stringify(validObject)); // deep copy so we can modify
      object.id = invalidId;
      chai.request(server)
        .post('/objects')
        .send(object)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.have.length(1);
          res.body[0].id.should.not.equal(invalidId);
          cleanupIds.push(res.body[0].id);
          done();
        });
    });

    it('it will try to POST an invalid object', (done) => {
      chai.request(server)
        .post('/objects')
        .send(invalidObject)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.equal('');
          done();
        });
    });

    it('it will try to POST an object with invalid properties', (done) => {
      const object = JSON.parse(JSON.stringify(validObject)); // deep copy so we can modify
      object.properties = 123;
      chai.request(server)
        .post('/objects')
        .send(object)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.equal('');
          done();
        });
    });
  });

  describe('/PUT/{id} object', () => {
    console.log(cleanupIds);
    it('it should PUT a valid, existing object', (done) => {
      const object = JSON.parse(JSON.stringify(validObject)); // deep copy so we can modify
      object.title = 'modified title';
      object.properties = {
        property2: 'modified dynamic property',
      };
      chai.request(server)
        .put(`/objects/${cleanupIds[0]}`)
        .send(object)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.have.length(1);
          expect(res.body[0]).to.deep.include(object);
          done();
        });
    });
    it('it should PUT a valid, non-existant object', (done) => {
      chai.request(server)
        .put(`/objects/${invalidId}`)
        .send(validObject)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.equal('');
          done();
        });
    });
    it('it should PUT an invalid, existing object', (done) => {
      chai.request(server)
        .put(`/objects/${cleanupIds[0]}`)
        .send(invalidObject)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.equal('');
          done();
        });
    });
  });

  after(() => {
    describe('/DELETE/{id} object', () => {
      cleanupIds.forEach((id) => {
        it('it should DELETE an existing object', (done) => {
          chai.request(server)
            .delete(`/objects/${id}`)
            .send()
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.equal('');
              done();
            });
        });
      });

      it('it should DELETE a non-existant object', (done) => {
        chai.request(server)
          .delete(`/objects/${invalidId}`)
          .send()
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.equal('');
            done();
          });
      });
    });
  });
});

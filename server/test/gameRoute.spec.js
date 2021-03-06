const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app.js');

const payload = { input: { text: 'WPW' } };


describe('server game route', () => {
  it('sends back new game instance', (done) => {
    request(app)
    .get('/api/game')
    .expect(200)
    .expect((res) => {
      expect(typeof (res.text)).to.equal('string');
    })
    .end(done);
  });

  it('send Posted back to the sender', (done) => {
    request(app)
    .post('/api/game')
    .expect(201)
    .expect((res) => {
      expect(res.body.data).to.equal('Posted!');
    })
    .end(done);
  });
});

describe('updateUserGameStat handler', () => {
  it('update user game status after each game', (done) => {
    request(app)
    .post('/api/game/updateUserGameStat')
    .expect(200)
    .expect((res) => {
      expect(res.text).to.equal('done');
    })
    .end(done);
  });
});

describe('Watson conversation and error message handler', () => {
  it('should return capture message for the capturing side', (done) => {
    request(app)
    .post('/api/game/conversation')
    .send(payload)
    .expect(200)
    .expect((res) => {
      expect(res.body.output.text[0]).to.not.equal('');
    })
    .end(done);
  });

  it('should return correct message for incorrect entry', (done) => {
    request(app)
      .post('/api/game/errorMessage')
      .send({ input: 'randome message' })
      .expect(200)
      .expect(res => {
        //   console.log(res.text);
        expect(res.text).to.equal('system error')
      })
      .end(done);
  });

  it('should return correct message for correct entry', (done) => {
    request(app)
      .post('/api/game/errorMessage')
      .send({ input: 'Not your turn.' })
      .expect(200)
      .expect((res) => {
        expect(['Don\'t worry, your turn is coming', 'Back up there...', 'Reign in those horses.', 'Don\'t worry, your turn is coming']).to.include(res.text);
      })
      .end(done);
  });

  it('should not return empty string for correct entry', (done) => {
    request(app)
    .post('/api/game/errorMessage')
    .send({input: 'Not your turn.'})
    .expect(200)
    .expect(res => {
      expect(res.text).to.not.equal('');
    })
    .end(done);
  });

  it('should return system error when passing in empty string', (done) => {
    request(app)
    .post('/api/game/errorMessage')
    .send({ input: '' })
    .expect(200)
    .expect((res) => {
      expect(res.text).to.equal('system error');
    })
    .end(done);
  });
});

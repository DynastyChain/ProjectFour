'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var purchaseCtrlStub = {
  index: 'purchaseCtrl.index',
  show: 'purchaseCtrl.show',
  create: 'purchaseCtrl.create',
  update: 'purchaseCtrl.update',
  destroy: 'purchaseCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var purchaseIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './purchase.controller': purchaseCtrlStub
});

describe('Purchase API Router:', function() {

  it('should return an express router instance', function() {
    purchaseIndex.should.equal(routerStub);
  });

  describe('GET /api/purchases', function() {

    it('should route to purchase.controller.index', function() {
      routerStub.get
        .withArgs('/', 'purchaseCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/purchases/:id', function() {

    it('should route to purchase.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'purchaseCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/purchases', function() {

    it('should route to purchase.controller.create', function() {
      routerStub.post
        .withArgs('/', 'purchaseCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/purchases/:id', function() {

    it('should route to purchase.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'purchaseCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/purchases/:id', function() {

    it('should route to purchase.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'purchaseCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/purchases/:id', function() {

    it('should route to purchase.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'purchaseCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

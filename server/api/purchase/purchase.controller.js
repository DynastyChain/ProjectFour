/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/purchases              ->  index
 * POST    /api/purchases              ->  create
 * GET     /api/purchases/:id          ->  show
 * PUT     /api/purchases/:id          ->  update
 * DELETE  /api/purchases/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Purchase from './purchase.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Purchases
export function index(req, res) {
  Purchase.find({owner: req.user._id})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Purchase from the DB
export function show(req, res) {
  Purchase.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Purchase in the DB
export function create(req, res) {
  var purchase = new Purchase(req.body)
  purchase.owner = req.user._id
  purchase.budget = req.user.budget
  purchase.save()
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Purchase in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Purchase.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Purchase from the DB
export function destroy(req, res) {
  Purchase.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

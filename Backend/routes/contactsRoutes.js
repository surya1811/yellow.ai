const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new contact
router.post('/', authMiddleware, contactsController.create);

// Get all contacts for the logged in user
router.get('/', authMiddleware, contactsController.getAll);

// Get a specific contact
router.get('/:id', authMiddleware, contactsController.getOne);

// Update a specific contact
router.put('/:id', authMiddleware, contactsController.update);

// Delete a specific contact
router.delete('/:id', authMiddleware, contactsController.delete);

module.exports = router;

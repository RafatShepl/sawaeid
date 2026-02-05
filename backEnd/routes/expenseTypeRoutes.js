const express = require('express');
const { 
    createExpenseType, 
    getAllExpenseTypes, 
    updateExpenseType, 
    deleteExpenseType 
} = require('../controllers/expenseTypeController');
const authorize = require('../middelware/authmiddelware'); // Optional: Add back when ready

const router = express.Router();

// Routes for /api/expense-types
router.post('/', createExpenseType);
router.get('/', getAllExpenseTypes);

// Routes for /api/expense-types/:id
router.put('/:id', updateExpenseType);
router.delete('/:id', deleteExpenseType);

module.exports = router;
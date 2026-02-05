const express = require("express");
const router = express.Router();

const {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense
} = require("../controllers/expenseController");

const authorize = require("../middelware/authmiddelware");

/**
 * @route   POST /api/expenses
 * @desc    Create new expense
 * @access  Manager, Accountant
 */
router.post(
  "/",
  authorize("user"),
  createExpense
);

/**
 * @route   GET /api/expenses
 * @desc    Get all expenses
 * @access  Owner, Manager, Accountant
 */
router.get(
  "/",
  authorize("user"),
  getAllExpenses
);

/**
 * @route   GET /api/expenses/:id
 * @desc    Get single expense
 * @access  Owner, Manager, Accountant
 */
router.get(
  "/:id",
  authorize("user"),
  getExpenseById
);

/**
 * @route   PUT /api/expenses/:id
 * @desc    Update expense
 * @access  Manager, Accountant
 */
router.put(
  "/:id",
  authorize("user"),
  updateExpense
);

/**
 * @route   DELETE /api/expenses/:id
 * @desc    Delete expense
 * @access  Owner, Manager
 */
router.delete(
  "/:id",
  authorize("user"),
  deleteExpense
);

module.exports = router;

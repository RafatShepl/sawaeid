const ExpenseType = require('../models/ExpenseType');

// Create a new expense type
exports.createExpenseType = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const typeExists = await ExpenseType.findOne({ name });
    if (typeExists)
      return res.status(400).json({ message: 'Expense type already exists' });

    const type = await ExpenseType.create({ name, description });
    res.status(201).json({ success: true, data: type });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all expense types
exports.getAllExpenseTypes = async (req, res) => {
  try {
    const types = await ExpenseType.find().sort({ name: 1 });
    res.status(200).json({ success: true, count: types.length, data: types });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Update an expense type
exports.updateExpenseType = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;

    const updatedType = await ExpenseType.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true } // Returns the modified document
    );

    if (!updatedType) {
      return res.status(404).json({ success: false, message: 'Expense type not found' });
    }

    res.status(200).json({ success: true, data: updatedType });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an expense type
exports.deleteExpenseType = async (req, res) => {
  try {
    const { id } = req.params;

    const type = await ExpenseType.findByIdAndDelete(id);

    if (!type) {
      return res.status(404).json({ success: false, message: 'Expense type not found' });
    }

    res.status(200).json({ success: true, message: 'Expense type deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

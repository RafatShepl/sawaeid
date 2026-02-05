const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: { 
    type: Number, 
    required: [true, 'Amount is required'] 
  },
  date: { 
    type: Date, 
    required: [true, 'Date is required'] 
  },
  // Linked to ExpenseType model
  type: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ExpenseType', 
    required: [true, 'Expense category (type) is required'] 
  },
  reason: { 
    type: String, 
    required: [true, 'Reason is required'],
    trim: true 
  },
  // Linked to User model (The field that caused your populate error)
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { 
  timestamps: true // Automatically creates createdAt and updatedAt
});

module.exports = mongoose.model('Expense', expenseSchema);
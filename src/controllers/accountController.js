import Account from '../models/account.js';
import bcrypt from 'bcrypt'; 

export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.status(200).json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAccount = async (req, res) => {
  try {
    const accountId = req.params.id;
    const account = await Account.findOne({ where: { id: accountId } });
    if (account) {
      return res.status(200).json(account);
    }
    return res.status(404).json({ message: 'account not found' });
  } catch (error) {
    console.error('Error fetching account:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createAccount = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAccount = await Account.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'account created', account: newAccount });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteAccount = async (req, res) => {
  const accountId = req.params.id;
  if (!accountId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const result = await Account.destroy({ where: { id: accountId } }); // Use Sequelize destroy
    if (result === 0) {
      return res.status(404).json({ message: 'account not found' });
    }
    return res.status(200).json({ message: 'account deleted' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateAccount = async (req, res) => {
  const { id, name, email, password } = req.body;
  if (!id || !name || !email || !password) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [updated] = await Account.update(
      { name, email, password: hashedPassword },
      { where: { id } }
    );
    if (updated) {
      const updatedAccount = await Account.findOne({ where: { id } });
      return res.status(200).json({ message: 'Account updated', account: updatedAccount });
    }
    return res.status(404).json({ message: 'Account not found' });
  } catch (error) {
    console.error('Error updating Account:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

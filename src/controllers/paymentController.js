import Payment from '../models/payment.js';

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getPayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await Payment.findOne({ where: { id: paymentId } });
    if (payment) {
      return res.status(200).json(payment);
    }
    return res.status(404).json({ message: 'Payment not found' });
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createPayment = async (req, res) => {
  const { amount, method, studentId } = req.body;
  if (amount === undefined || !method || !studentId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const newPayment = await Payment.create({ amount, method, studentId });
    res.status(201).json({ message: 'Payment created', payment: newPayment });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deletePayment = async (req, res) => {
  const paymentId = req.params.id;
  if (!paymentId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const result = await Payment.destroy({ where: { id: paymentId } });
    if (result === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    return res.status(200).json({ message: 'Payment deleted' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updatePayment = async (req, res) => {
  const { id, amount, method } = req.body;
  if (!id || amount === undefined || !method) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const [updated] = await Payment.update(
      { amount, method },
      { where: { id } }
    );
    if (updated) {
      const updatedPayment = await Payment.findOne({ where: { id } });
      return res.status(200).json({ message: 'Payment updated', payment: updatedPayment });
    }
    return res.status(404).json({ message: 'Payment not found' });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

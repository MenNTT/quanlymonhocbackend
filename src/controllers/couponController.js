import Coupon  from '../models/coupon.js';

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.findAll();
    res.status(200).json(coupons);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getCoupon = async (req, res) => {
  try {
    const couponId = req.params.id;
    const coupon = await Coupon.findOne({ where: { id: couponId } });
    if (coupon) {
      return res.status(200).json(coupon);
    }
    return res.status(404).json({ message: 'Coupon not found' });
  } catch (error) {
    console.error('Error fetching coupon:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createCoupon = async (req, res) => {
  const { code, discount, expirationDate } = req.body;
  if (!code || !discount || !expirationDate) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const newCoupon = await Coupon.create({ code, discount, expirationDate });
    res.status(201).json({ message: 'Coupon created', coupon: newCoupon });
  } catch (error) {
    console.error('Error creating coupon:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteCoupon = async (req, res) => {
  const couponId = req.params.id;
  if (!couponId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const result = await Coupon.destroy({ where: { id: couponId } });
    if (result === 0) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    return res.status(200).json({ message: 'Coupon deleted' });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateCoupon = async (req, res) => {
  const { id, code, discount, expirationDate } = req.body;
  if (!id || !code || !discount || !expirationDate) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const [updated] = await Coupon.update(
      { code, discount, expirationDate },
      { where: { id } }
    );
    if (updated) {
      const updatedCoupon = await Coupon.findOne({ where: { id } });
      return res.status(200).json({ message: 'Coupon updated', coupon: updatedCoupon });
    }
    return res.status(404).json({ message: 'Coupon not found' });
  } catch (error) {
    console.error('Error updating coupon:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

import Cart from '../models/cart.js';

// Thêm khóa học vào giỏ hàng hoặc danh sách yêu thích
export const addToCart = async (req, res) => {
  const { userId, courseId, isWishlist } = req.body;

  if (!userId || !courseId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    // Kiểm tra xem khóa học đã tồn tại trong giỏ hàng/danh sách yêu thích chưa
    const existingEntry = await Cart.findOne({
      where: { userId, courseId, isWishlist },
    });

    if (existingEntry) {
      // Nếu đã tồn tại, cập nhật số lượng (nếu cần)
      existingEntry.quantity += 1;
      await existingEntry.save();
      return res.status(200).json({ message: 'Updated quantity', cart: existingEntry });
    }

    // Nếu chưa tồn tại, thêm mới
    const newEntry = await Cart.create({ userId, courseId, isWishlist });
    res.status(201).json({ message: 'Added to cart', cart: newEntry });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

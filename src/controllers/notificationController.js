import Notification from '../models/notification.js';

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findOne({ where: { id: notificationId } });
    if (notification) {
      return res.status(200).json(notification);
    }
    return res.status(404).json({ message: 'Notification not found' });
  } catch (error) {
    console.error('Error fetching notification:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createNotification = async (req, res) => {
  const { accountId, message } = req.body;
  if (!accountId || !message) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const newNotification = await Notification.create({ accountId, message });
    res.status(201).json({ message: 'Notification created', notification: newNotification });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteNotification = async (req, res) => {
  const notificationId = req.params.id;
  if (!notificationId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const result = await Notification.destroy({ where: { id: notificationId } });
    if (result === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    return res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateNotification = async (req, res) => {
  const { id, message, isRead } = req.body;
  if (!id || !message) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const [updated] = await Notification.update(
      { message, isRead },
      { where: { id } }
    );
    if (updated) {
      const updatedNotification = await Notification.findOne({ where: { id } });
      return res.status(200).json({ message: 'Notification updated', notification: updatedNotification });
    }
    return res.status(404).json({ message: 'Notification not found' });
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

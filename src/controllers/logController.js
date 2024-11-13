import Log from '../models/log.js';

export const getAllLogs = async (req, res) => {
  try {
    const logs = await Log.findAll();
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getLog = async (req, res) => {
  try {
    const logId = req.params.id;
    const log = await Log.findOne({ where: { id: logId } });
    if (log) {
      return res.status(200).json(log);
    }
    return res.status(404).json({ message: 'Log not found' });
  } catch (error) {
    console.error('Error fetching log:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createLog = async (req, res) => {
  const { message, level } = req.body;
  if (!message || !level) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const newLog = await Log.create({ message, level });
    res.status(201).json({ message: 'Log created', log: newLog });
  } catch (error) {
    console.error('Error creating log:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteLog = async (req, res) => {
  const logId = req.params.id;
  if (!logId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const result = await Log.destroy({ where: { id: logId } });
    if (result === 0) {
      return res.status(404).json({ message: 'Log not found' });
    }
    return res.status(200).json({ message: 'Log deleted' });
  } catch (error) {
    console.error('Error deleting log:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateLog = async (req, res) => {
  const { id, message, level } = req.body;
  if (!id || !message || !level) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const [updated] = await Log.update(
      { message, level },
      { where: { id } }
    );
    if (updated) {
      const updatedLog = await Log.findOne({ where: { id } });
      return res.status(200).json({ message: 'Log updated', log: updatedLog });
    }
    return res.status(404).json({ message: 'Log not found' });
  } catch (error) {
    console.error('Error updating log:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

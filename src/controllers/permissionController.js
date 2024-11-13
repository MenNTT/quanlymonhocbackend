import Permission from '../models/permission.js';

export const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.status(200).json(permissions);
  } catch (error) {
    console.error('Error fetching permissions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getPermission = async (req, res) => {
  try {
    const permissionId = req.params.id;
    const permission = await Permission.findOne({ where: { id: permissionId } });
    if (permission) {
      return res.status(200).json(permission);
    }
    return res.status(404).json({ message: 'Permission not found' });
  } catch (error) {
    console.error('Error fetching permission:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createPermission = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const newPermission = await Permission.create({ name });
    res.status(201).json({ message: 'Permission created', permission: newPermission });
  } catch (error) {
    console.error('Error creating permission:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deletePermission = async (req, res) => {
  const permissionId = req.params.id;
  if (!permissionId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const result = await Permission.destroy({ where: { id: permissionId } });
    if (result === 0) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    return res.status(200).json({ message: 'Permission deleted' });
  } catch (error) {
    console.error('Error deleting permission:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updatePermission = async (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const [updated] = await Permission.update(
      { name },
      { where: { id } }
    );
    if (updated) {
      const updatedPermission = await Permission.findOne({ where: { id } });
      return res.status(200).json({ message: 'Permission updated', permission: updatedPermission });
    }
    return res.status(404).json({ message: 'Permission not found' });
  } catch (error) {
    console.error('Error updating permission:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

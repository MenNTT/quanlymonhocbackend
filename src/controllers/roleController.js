import Role from '../models/role.js';

export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findOne({ where: { id: roleId } });
    if (role) {
      return res.status(200).json(role);
    }
    return res.status(404).json({ message: 'Role not found' });
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createRole = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const newRole = await Role.create({ name });
    res.status(201).json({ message: 'Role created', role: newRole });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteRole = async (req, res) => {
  const roleId = req.params.id;
  if (!roleId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const result = await Role.destroy({ where: { id: roleId } });
    if (result === 0) {
      return res.status(404).json({ message: 'Role not found' });
    }
    return res.status(200).json({ message: 'Role deleted' });
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateRole = async (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const [updated] = await Role.update(
      { name },
      { where: { id } }
    );
    if (updated) {
      const updatedRole = await Role.findOne({ where: { id } });
      return res.status(200).json({ message: 'Role updated', role: updatedRole });
    }
    return res.status(404).json({ message: 'Role not found' });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

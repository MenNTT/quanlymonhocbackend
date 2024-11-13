import Tag from '../models/tag.js';

export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getTag = async (req, res) => {
  try {
    const tagId = req.params.id;
    const tag = await Tag.findOne({ where: { id: tagId } });
    if (tag) {
      return res.status(200).json(tag);
    }
    return res.status(404).json({ message: 'Tag not found' });
  } catch (error) {
    console.error('Error fetching tag:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createTag = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const newTag = await Tag.create({ name });
    res.status(201).json({ message: 'Tag created', tag: newTag });
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteTag = async (req, res) => {
  const tagId = req.params.id;
  if (!tagId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const result = await Tag.destroy({ where: { id: tagId } });
    if (result === 0) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    return res.status(200).json({ message: 'Tag deleted' });
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateTag = async (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const [updated] = await Tag.update(
      { name },
      { where: { id } }
    );
    if (updated) {
      const updatedTag = await Tag.findOne({ where: { id } });
      return res.status(200).json({ message: 'Tag updated', tag: updatedTag });
    }
    return res.status(404).json({ message: 'Tag not found' });
  } catch (error) {
    console.error('Error updating tag:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

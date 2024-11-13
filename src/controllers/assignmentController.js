import Assignment from '../models/Assignment.js'; // Adjust the path as needed
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating IDs

export const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.findAll();
        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getAssignment = async (req, res) => {
    const assignmentId = req.params.id;
    try {
        const assignment = await Assignment.findOne({ where: { id: assignmentId } });
        if (assignment) {
            return res.status(200).json(assignment);
        }
        return res.status(404).json({ message: 'Assignment not found' });
    } catch (error) {
        console.error('Error fetching assignment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const createAssignment = async (req, res) => {
    const { title, description, dueDate, courseId } = req.body;
    if (!title || !dueDate || !courseId) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
        const newAssignment = await Assignment.create({
            id: uuidv4(), // Generate a new UUID for the assignment
            title,
            description,
            dueDate,
            courseId,
        });

        res.status(201).json({ message: 'Assignment created', assignment: newAssignment });
    } catch (error) {
        console.error('Error creating assignment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateAssignment = async (req, res) => {
    const { id, title, description, dueDate, courseId } = req.body;
    if (!id || !title || !dueDate || !courseId) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
        const [updated] = await Assignment.update(
            { title, description, dueDate, courseId },
            { where: { id } }
        );
        if (updated) {
            const updatedAssignment = await Assignment.findOne({ where: { id } });
            return res.status(200).json({ message: 'Assignment updated', assignment: updatedAssignment });
        }
        return res.status(404).json({ message: 'Assignment not found' });
    } catch (error) {
        console.error('Error updating assignment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteAssignment = async (req, res) => {
    const assignmentId = req.params.id;
    if (!assignmentId) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
        const result = await Assignment.destroy({ where: { id: assignmentId } });
        if (result === 0) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        return res.status(200).json({ message: 'Assignment deleted' });
    } catch (error) {
        console.error('Error deleting assignment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

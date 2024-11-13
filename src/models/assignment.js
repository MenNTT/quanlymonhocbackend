import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js';  // Adjust the path as needed

const Assignment = sequelize.define('assignment', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        comment: 'Primary key - UUID',
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Title of the assignment',
    },
    description: {
        type: DataTypes.TEXT,
        comment: 'Detailed description of the assignment',
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Due date for the assignment',
    },
    courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Course', // Name of the referenced model
            key: 'id',
        },
        comment: 'Foreign key referencing Course',
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        comment: 'Assignment creation time',
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
        comment: 'Assignment update time',
    },
});

// Optionally define associations if needed
Assignment.associate = (models) => {
    Assignment.belongsTo(models.Course, {
        foreignKey: 'courseId',
        as: 'course',
    });
};

export default Assignment;

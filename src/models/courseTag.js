import { DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB.js'; 

module.exports = (sequelize) => {
  const CourseTag = sequelize.define('CourseTag', {
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Courses',
        key: 'id',
      },
      comment: 'Foreign key referencing Course',
    },
    tagId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Tags',
        key: 'id',
      },
      comment: 'Foreign key referencing Tag',
    },
  }, {
    tableName: 'Course_Tags',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['courseId', 'tagId'],
      },
    ],
  });

  return CourseTag;
};

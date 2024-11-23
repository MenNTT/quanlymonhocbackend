import Course from '../models/course.js';
import CourseDetail from '../models/courseDetail.js';

// Lấy danh sách tất cả các khóa học cùng thông tin chi tiết
export const getAllCoursesWithDetails = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [{
        model: CourseDetail,
        as: 'detail',
        attributes: ['duration', 'prerequisites', 'objectives', 'detailedSyllabus', 'format']
      }],
      attributes: ['id', 'name', 'description', 'feeAmount', 'currency', 'image', 'createdAt', 'updatedAt']
    });
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses with details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Lấy thông tin chi tiết của một khóa học
export const getCourseWithDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findOne({
      where: { id },
      include: [{
        model: CourseDetail,
        as: 'detail',
        attributes: ['duration', 'prerequisites', 'objectives', 'detailedSyllabus', 'format']
      }],
      attributes: ['id', 'name', 'description', 'feeAmount', 'currency', 'image', 'createdAt', 'updatedAt']
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course with details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

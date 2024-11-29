import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import Payment from '../models/payment.js';

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findOne({ where: { id: courseId } });
    if (course) {
      return res.status(200).json(course);
    }
    return res.status(404).json({ message: 'Course not found' });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createCourse = async (req, res) => {
  const { name, description, feeAmount, currency, image } = req.body;

  if (!name || !description || !feeAmount) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const newCourse = await Course.create({ name, description, feeAmount, currency, image });
    res.status(201).json({ message: 'Course created', course: newCourse });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  if (!courseId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const result = await Course.destroy({ where: { id: courseId } });
    if (result === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    return res.status(200).json({ message: 'Course deleted' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateCourse = async (req, res) => {
  const { id, name, description, feeAmount, currency, image } = req.body;
  if (!id || !name || !description) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const [updated] = await Course.update(
      { name, description, feeAmount, currency, image },
      { where: { id } }
    );
    if (updated) {
      const updatedCourse = await Course.findOne({ where: { id } });
      return res.status(200).json({ message: 'Course updated', course: updatedCourse });
    }
    return res.status(404).json({ message: 'Course not found' });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getTotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await Course.sum('feeAmount');
    res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error('Error fetching total revenue:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getRecentCourses = async (req, res) => {
  try {
    const recentCourses = await Course.findAll({
      where: {
        createdAt: {
          [Op.gte]: moment().subtract(30, 'days').toDate(),
        },
      },
    });
    res.status(200).json(recentCourses);
  } catch (error) {
    console.error('Error fetching recent courses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const enrollCourse = async (req, res) => {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
        return res.status(400).json({
            success: false,
            message: 'Missing required parameters'
        });
    }

    try {
        // Kiểm tra xem user đã đăng ký khóa học này chưa
        const existingEnrollment = await Enrollment.findOne({
            where: {
                userId,
                courseId
            }
        });

        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: 'User already enrolled in this course'
            });
        }

        // Kiểm tra khóa học có tồn tại không
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Tạo enrollment record
        const enrollment = await Enrollment.create({
            userId,
            courseId,
            enrollmentDate: new Date()
        });

        // Tạo payment record
        await Payment.create({
            accountId: userId,
            amount: course.feeAmount,
            currency: 'VND',
            status: 'completed',
            paymentDate: new Date()
        });

        // Lấy thông tin chi tiết enrollment kèm thông tin khóa học
        const enrollmentWithCourse = await Enrollment.findOne({
            where: { id: enrollment.id },
            include: [{
                model: Course,
                as: 'Course'
            }]
        });

        return res.status(201).json({
            success: true,
            message: 'Course enrolled successfully',
            data: enrollmentWithCourse
        });
    } catch (error) {
        console.error('Error enrolling course:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// API để lấy danh sách khóa học đã đăng ký
export const getEnrolledCourses = async (req, res) => {
    try {
        // Lấy userId từ token đã được xác thực
        const userId = req.user.id;

        const enrollments = await Enrollment.findAll({
            where: { userId },
            include: [{
                model: Course,
                as: 'Course'
            }]
        });

        return res.status(200).json({
            success: true,
            data: enrollments
        });
    } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

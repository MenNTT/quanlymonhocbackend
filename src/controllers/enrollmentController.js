import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import Payment from '../models/payment.js';

export const enrollCourse = async (req, res) => {
    const { accountId, courseId } = req.body;

    if (!accountId || !courseId) {
        return res.status(400).json({
            success: false,
            message: 'AccountId and CourseId are required'
        });
    }

    try {
        // Kiểm tra xem đã đăng ký chưa
        const existingEnrollment = await Enrollment.findOne({
            where: {
                accountId,
                courseId
            }
        });

        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: 'Bạn đã đăng ký khóa học này rồi'
            });
        }

        // Lấy thông tin khóa học để lấy giá
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy khóa học'
            });
        }

        // Tạo enrollment mới
        const enrollment = await Enrollment.create({
            accountId,
            courseId,
            enrollmentDate: new Date(),
            status: 'enrolled'
        });

        // Tạo payment record
        await Payment.create({
            accountId,
            amount: course.feeAmount,
            currency: course.currency || 'VND',
            paymentDate: new Date(),
            status: 'completed'
        });

        return res.status(201).json({
            success: true,
            message: 'Đăng ký khóa học thành công',
            data: enrollment
        });
    } catch (error) {
        console.error('Error enrolling course:', error);
        return res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra khi đăng ký khóa học'
        });
    }
};

export const getUserEnrollments = async (req, res) => {
    const userId = req.user.id; // Lấy từ token

    try {
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
        console.error('Error getting user enrollments:', error);
        return res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra khi lấy danh sách khóa học'
        });
    }
};

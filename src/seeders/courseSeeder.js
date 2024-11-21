import { v4 as uuidv4 } from 'uuid';
import Course from '../models/course.js';
import Account from '../models/account.js';

const sampleCourses = [
  {
    id: uuidv4(),
    name: 'JavaScript Cơ Bản',
    description: 'Khóa học lập trình JavaScript từ cơ bản đến nâng cao',
    feeAmount: 299.99,
    currency: 'USD'
  },
  {
    id: uuidv4(),
    name: 'React.js cho Người Mới Bắt Đầu',
    description: 'Học cách xây dựng ứng dụng web với React.js',
    feeAmount: 399.99,
    currency: 'USD'
  },
  {
    id: uuidv4(),
    name: 'Node.js và Express',
    description: 'Phát triển backend với Node.js và Express framework',
    feeAmount: 349.99,
    currency: 'USD'
  },
  {
    id: uuidv4(),
    name: 'SQL Masterclass',
    description: 'Làm chủ SQL và quản lý cơ sở dữ liệu',
    feeAmount: 249.99,
    currency: 'USD'
  }
];

export const seedCourses = async () => {
  try {
    // Lấy một instructor ngẫu nhiên
    const instructor = await Account.findOne();
    if (!instructor) {
      console.error('Không tìm thấy instructor nào trong database');
      return;
    }

    // Thêm instructorId vào mỗi khóa học
    const coursesWithInstructor = sampleCourses.map(course => ({
      ...course,
      instructorId: instructor.email
    }));

    // Tạo các khóa học
    await Course.bulkCreate(coursesWithInstructor);
    
    console.log('Đã tạo dữ liệu mẫu cho khóa học thành công!');
  } catch (error) {
    console.error('Lỗi khi tạo dữ liệu mẫu cho khóa học:', error);
  }
}; 
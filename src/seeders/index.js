import { seedCourses } from './courseSeeder.js';
import { seedAdmin } from './adminSeeder.js';

const runSeeders = async () => {
  try {
    await seedAdmin();
    await seedCourses();
    console.log('Đã chạy tất cả seeders thành công!');
  } catch (error) {
    console.error('Lỗi khi chạy seeders:', error);
  }
};

runSeeders(); 
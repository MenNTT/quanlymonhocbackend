import express from 'express';
import { getAllCoursesWithDetails, getCourseWithDetails } from '../controllers/courseController.js';

const router = express.Router();

// Route để lấy danh sách tất cả các khóa học cùng thông tin chi tiết
router.get('/courses', getAllCoursesWithDetails);

// Route để lấy thông tin chi tiết của một khóa học
router.get('/courses/:id', getCourseWithDetails);

// Enroll in a course
router.post('/courses/enroll', async (req, res) => {
  const { courseId } = req.body;
  // Implement enrollment logic here
});

// Get recent courses
router.get('/courses/recent', async (req, res) => {
  // Implement recent courses logic here
});

// Get total revenue
router.get('/courses/revenue', async (req, res) => {
  // Implement revenue calculation logic here
});

export default router;

import initAuthRoute from "./authRoutes.js";
import initAccountRoute from "./accountRoutes.js";
import initCouponRoute from "./couponRoutes.js";
import initLogRoute from "./logRoutes.js";
import initGradeRoute from "./gradeRoutes.js";
import initPaymentRoute from "./paymentRoutes.js";
import initPermissionRoute from "./permissionRoutes.js";
import initRatingRoute from "./ratingRoutes.js";
import initRoleRoute from "./roleRoutes.js";
import initTagRoute from "./tagRoutes.js";
import initSubjectRoute from "./subjectRoutes.js";
import initNotificationRoute from "./notificationRoutes.js";
import initLessonRoute from "./lessonRoutes.js";
import initEnrollmentRoute from "./enrollmentRoutes.js";
import initCourseRoute from "./courseRoutes.js";
import initAssignmentRoute from "./assignmentRoutes.js";
import initCartRoute from "./CartRoutes.js";

const initRoutes = (app) => {
    initAuthRoute(app);
    initAccountRoute(app);
    initCouponRoute(app);
    initLogRoute(app);
    initGradeRoute(app);
    initPaymentRoute(app);
    initPermissionRoute(app);
    initRatingRoute(app);
    initRoleRoute(app);
    initTagRoute(app);
    initSubjectRoute(app);
    initNotificationRoute(app);
    initLessonRoute(app);
    initEnrollmentRoute(app);
    initCourseRoute(app);
    initAssignmentRoute(app);
    initCartRoute(app);

};

export default initRoutes;

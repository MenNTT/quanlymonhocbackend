import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { User, Account, Role, Permission, RolePermission, AccountRole } from '../models/index.js';

export const seedAdmin = async () => {
  try {
    // Create roles if they don't exist
    const roleNames = ['Admin', 'Instructor', 'Student'];
    const roleDescriptions = {
      'Admin': 'System Administrator',
      'Instructor': 'Course Instructor/Teacher',
      'Student': 'Student/Learner'
    };

    const roles = await Promise.all(
      roleNames.map(async (roleName) => {
        const [role] = await Role.findOrCreate({
          where: { name: roleName },
          defaults: {
            id: uuidv4(),
            description: roleDescriptions[roleName]
          }
        });
        return role;
      })
    );

    // Create permissions if they don't exist
    const permissionConfigs = [
      {
        value: 'USER_MANAGEMENT',
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        canView: true,
        description: 'Manage all users'
      },
      {
        value: 'COURSE_MANAGEMENT',
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        canView: true,
        description: 'Manage all courses'
      },
      {
        value: 'COURSE_CONTENT',
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        canView: true,
        description: 'Manage course content'
      },
      {
        value: 'ENROLLMENT_MANAGEMENT',
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        canView: true,
        description: 'Manage course enrollments'
      },
      {
        value: 'GRADE_MANAGEMENT',
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        canView: true,
        description: 'Manage student grades'
      },
      {
        value: 'PAYMENT_MANAGEMENT',
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        canView: true,
        description: 'Manage payments'
      },
      {
        value: 'REPORT_ACCESS',
        canCreate: false,
        canUpdate: false,
        canDelete: false,
        canView: true,
        description: 'Access system reports'
      },
      {
        value: 'STUDENT_ACCESS',
        canCreate: false,
        canUpdate: false,
        canDelete: false,
        canView: true,
        description: 'Basic student access'
      }
    ];

    const permissions = await Promise.all(
      permissionConfigs.map(async (config) => {
        const [permission] = await Permission.findOrCreate({
          where: { value: config.value },
          defaults: {
            id: uuidv4(),
            ...config
          }
        });
        return permission;
      })
    );

    // Define role-permission mappings
    const rolePermissionMappings = {
      'Admin': [
        'USER_MANAGEMENT',
        'COURSE_MANAGEMENT',
        'COURSE_CONTENT',
        'ENROLLMENT_MANAGEMENT',
        'GRADE_MANAGEMENT',
        'PAYMENT_MANAGEMENT',
        'REPORT_ACCESS'
      ],
      'Instructor': [
        'COURSE_CONTENT',
        'GRADE_MANAGEMENT',
        'REPORT_ACCESS'
      ],
      'Student': [
        'STUDENT_ACCESS'
      ]
    };

    // Create role-permission associations
    for (const role of roles) {
      const permissionsForRole = rolePermissionMappings[role.name];
      const permissionRecords = permissions.filter(p => 
        permissionsForRole.includes(p.value)
      );

      for (const permission of permissionRecords) {
        await RolePermission.findOrCreate({
          where: {
            roleId: role.id,
            permissionId: permission.id
          }
        });
      }
    }

    // Create admin user if it doesn't exist
    const adminRole = roles.find(role => role.name === 'Admin');
    const [adminUser] = await User.findOrCreate({
      where: { fullName: 'System Administrator' },
      defaults: {
        id: uuidv4(),
        phoneNumber: '0123456789',
        address: 'Admin Address'
      }
    });

    // Create admin account if it doesn't exist
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const [adminAccount] = await Account.findOrCreate({
      where: { email: 'admin@example.com' },
      defaults: {
        password: hashedPassword,
        userId: adminUser.id
      }
    });

    // Assign role to admin account
    await AccountRole.findOrCreate({
      where: {
        accountId: adminAccount.email,
        roleId: adminRole.id
      }
    });

    // Create demo instructor if it doesn't exist
    const instructorRole = roles.find(role => role.name === 'Instructor');
    const [instructorUser] = await User.findOrCreate({
      where: { fullName: 'Demo Instructor' },
      defaults: {
        id: uuidv4(),
        phoneNumber: '0987654321',
        address: 'Instructor Address'
      }
    });

    const [instructorAccount] = await Account.findOrCreate({
      where: { email: 'instructor@example.com' },
      defaults: {
        password: await bcrypt.hash('instructor123', 10),
        userId: instructorUser.id
      }
    });

    // Assign role to instructor account
    await AccountRole.findOrCreate({
      where: {
        accountId: instructorAccount.email,
        roleId: instructorRole.id
      }
    });

    // Create demo student if it doesn't exist
    const studentRole = roles.find(role => role.name === 'Student');
    const [studentUser] = await User.findOrCreate({
      where: { fullName: 'Demo Student' },
      defaults: {
        id: uuidv4(),
        phoneNumber: '0123498765',
        address: 'Student Address'
      }
    });

    const [studentAccount] = await Account.findOrCreate({
      where: { email: 'student@example.com' },
      defaults: {
        password: await bcrypt.hash('student123', 10),
        userId: studentUser.id
      }
    });

    // Assign role to student account
    await AccountRole.findOrCreate({
      where: {
        accountId: studentAccount.email,
        roleId: studentRole.id
      }
    });

    console.log('Seeding completed successfully');
    console.log('Demo accounts:');
    console.log('Admin - email: admin@example.com, password: admin123');
    console.log('Instructor - email: instructor@example.com, password: instructor123');
    console.log('Student - email: student@example.com, password: student123');

  } catch (error) {
    console.error('Error in seeding:', error);
    throw error;
  }
};
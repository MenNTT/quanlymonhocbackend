import Account from './account.js';
import User from './user.js';
import Role from './role.js';
import Permission from './permission.js';
import RolePermission from './rolePermission.js';
import AccountRole from './accountRole.js';

<<<<<<< Updated upstream
// User associations
=======
// Set up relationships
>>>>>>> Stashed changes
Account.belongsTo(User, {
    foreignKey: 'userId',
    as: 'User'
});

User.hasOne(Account, {
    foreignKey: 'userId',
    as: 'Account'
});

<<<<<<< Updated upstream
// Role associations
Account.belongsToMany(Role, {
    through: AccountRole,
    foreignKey: 'accountId',
    otherKey: 'roleId',
    as: 'Roles'
});

=======
>>>>>>> Stashed changes
Role.belongsToMany(Account, {
    through: AccountRole,
    foreignKey: 'roleId',
    otherKey: 'accountId',
<<<<<<< Updated upstream
    as: 'Accounts'
});

// Permission associations
=======
    as: 'RoleAccounts'
});

Account.belongsToMany(Role, {
    through: AccountRole,
    foreignKey: 'accountId',
    otherKey: 'roleId',
    as: 'AccountRoles'
});

>>>>>>> Stashed changes
Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKey: 'roleId',
    otherKey: 'permissionId',
    as: 'Permissions'
});

Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKey: 'permissionId',
    otherKey: 'roleId',
    as: 'Roles'
});

export {
    Account,
    User,
    Role,
    Permission,
    RolePermission,
    AccountRole
<<<<<<< Updated upstream
}; 
=======
};
>>>>>>> Stashed changes

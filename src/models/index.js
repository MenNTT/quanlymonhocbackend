import User from './user.js';
import Account from './account.js';
import Role from './role.js';
import AccountRole from './accountRole.js';

// Clear existing associations
User.associations = {};
Account.associations = {};
Role.associations = {};
AccountRole.associations = {};

// Account - User relationship
Account.belongsTo(User, { 
    foreignKey: 'userId',
    as: 'User' 
});

User.hasOne(Account, { 
    foreignKey: 'userId',
    as: 'Account' 
});

// Account - Role relationships
Account.belongsToMany(Role, { 
    through: AccountRole,
    foreignKey: 'accountId',
    otherKey: 'roleId',
    as: 'Roles'
});

Role.belongsToMany(Account, { 
    through: AccountRole,
    foreignKey: 'roleId',
    otherKey: 'accountId',
    as: 'Accounts'
});

export {
    User,
    Account,
    Role,
    AccountRole
};

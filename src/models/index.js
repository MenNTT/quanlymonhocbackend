import Account from './account.js';
import User from './user.js';

// Thiết lập relationships
Account.belongsTo(User, {
    foreignKey: 'userId',
    as: 'User'
});

User.hasOne(Account, {
    foreignKey: 'userId',
    as: 'Account'
});

export {
    Account,
    User
}; 
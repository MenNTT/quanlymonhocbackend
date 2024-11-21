import Account from './account.js';
import User from './user.js';

// Set up relationships
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
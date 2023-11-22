const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection')
const { hash, compare } = require('bcrypt')
const Post = require('./Post')

class User extends Model {};

User.init({
    username: {
        type: DataTypes.STRING,
        unique: {
            args: true,
            msg: 'User already registered.'
        },
        validate: {
            len: {
                args: 6,
                msg: 'Username and Password must each be at least 6 characters long'
            }
        },
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: 6,
                msg: 'Username and Password must each be at least 6 characters long'
            }
        },
        allowNull: false
    }
}, {
    modelName: 'user',
    sequelize: db,
    hooks: {
        async beforeCreate(user) {
            user.password = await hash(user.password, 10);
            return user;
        }
    }
})

User.hasMany(Post, { as: 'users_posts', foreignKey: 'user_id'})
Post.belongsTo(User, { as: 'author', foreignKey: 'user_id'})

User.prototype.validatePass = async (pass) => {
    const valid = await compare(pass, this.password);

    return valid;
}

module.exports = User;
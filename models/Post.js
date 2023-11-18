const { Model, DataTypes } = require('sequelize')
const db = require('../config/connection')
const dj = require('dayjs')

class Post extends Model {}

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        validate: {
            len: {
                args: [1, 1000],
                msg: 'Post can neither exceed 1000 characters nor be empty.'
            }
        }
    },
    timestamp: {
        type: DataTypes.VIRTUAL,
        get() {
            return dj(this.createdAt).format('MM/DD/YYYY [at] HH:mm:ss') //'08/21/2023 at 13:06:43'
        }
    }
},
{
    modelName: 'users_posts',
    freezeTableName: true,
    sequelize: db
})

module.exports = Post;
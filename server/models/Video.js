module.exports = (sequelize, DataTypes) =>
    sequelize.define('Video', {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            unique: true
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING
    })
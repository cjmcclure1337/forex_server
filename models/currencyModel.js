module.exports = (sequelize, DataTypes) => {

    // Define currency model
    const Currency = sequelize.define('currency', {
        code: { // the code will be our primary key for accessing currencies
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        symbol: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastPrice: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    })

    return Currency
}
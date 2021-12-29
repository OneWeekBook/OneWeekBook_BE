const User = ((sequelize, Sequelize) => {
    sequelize.define('user', {
        username: {
            type: Sequelize.STRING(30),
            allwoNull: false,
        },
        userid: {
            type: Sequelize.STRING(30),
            allwoNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING(100),
            allwoNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING(50),
            allwoNull: false,
            unique: true,
        },
        state: {
            type: Sequelize.INTEGER(2),
            defaultValue: 0  //0은 회원, 1은 탈퇴회원,
        },
        status: {
            type: Sequelize.INTEGER(2),
            defaultValue: 0 //0은 일반회원, 1은 관리자,
        }
    }, {

    });

})

module.exports = User;
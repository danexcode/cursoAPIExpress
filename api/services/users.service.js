const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class UsersServices {

  constructor(){}

  async create(data) {
    const newUser = await models.User.create(data);
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const response = await models.User.findAll({
      include: 'customer'
    });
    return response;
  }

  async findByEmail(email) {
    const response = await models.User.findOne({
      where: { email }
    });
    return response;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound("user not found");
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }

}

module.exports = UsersServices;

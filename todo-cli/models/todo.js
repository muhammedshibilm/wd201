// models/todo.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      let over = await Todo.overdue();
      console.log(over.map((items)=> items.displayableString()).join("\n"))
      console.log("\n");

      console.log("Due Today");
      let todaydue = await Todo.dueToday();
      console.log(todaydue.map((items)=> items.displayableString()).join("\n"))
      console.log("\n");

      console.log("Due Later");
      let later = await Todo.dueToday();
      console.log(later.map((items)=> items.displayableString()).join("\n"))
    }
    //Today date
    static today = new Date().toISOString().split("T")[0];

    static async overdue() {
      const over = await Todo.findAll({
        where: {
          dueDate: {
            [sequelize.Sequelize.Op.lt] : this.today
          }
        }
      });
      return over;
    }

    static async dueToday() {
      const todaydue = await Todo.findAll({
        where: {
          dueDate: this.today
        }
      });
      return todaydue;
    }

    static async dueLater() {
      const later = await Todo.findAll({
        where: {
          dueDate: {
            [sequelize.Sequelize.Op.gt] : this.today
          }
        }
      });
      return later;
    }

    static async markAsComplete(id) {
      const item = await Todo.findByPk(id);
      if (item) {
        item.completed = true;
        await item.save()
      }
      console.log(`${id} is not founded`);
      
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      const date = new Date(this.dueDate).toISOString().split("T")[0];
      if(date === this.dueDate) {
        return `${this.id}. ${checkbox} ${this.title}`;
      }
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
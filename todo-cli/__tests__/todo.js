const todoList = require("../todo");
const {describe,test,expect,beforeAll} = require("@jest/globals");

const {all, add, markAsComplete} = todoList();

describe("todoList", () => {
    beforeAll(() => {
         add({ title: "Buy groceries", dueDate: "2021-09-30" , completed: false});
    });
    test("should add a todo item", () => {
        const todoItemCount= all.length;
        add({ title: "Buy groceries", dueDate: "2021-09-30" , completed: false});
        expect(all.length).toBe(todoItemCount+1);
    });
    test("should mark a todo item as complete", () => {
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    });
})


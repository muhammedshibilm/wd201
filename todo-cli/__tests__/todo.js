const { todoList , today , tomorrow, yesterday  }  = require("../todo");
const { describe, test, expect, beforeAll } = require("@jest/globals");

const { all, add, markAsComplete, overdue, dueLater, dueToday  } = todoList();


describe("todoList", () => {
    beforeAll(() => {
        add({ title: "Submit assignment", dueDate: yesterday, completed: false });
        add({ title: "Pay rent", dueDate: today, completed: true });
        add({ title: "Service Vehicle", dueDate: today, completed: false });
        add({ title: "File taxes", dueDate: tomorrow, completed: false });
    });
  test("should add a todo item", () => {
    const todoItemCount = all.length;
    add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });
    expect(all.length).toBe(todoItemCount + 1);
  });

  test("should mark a todo item as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
 
  test("cheacking the  retrieval of overdue items",()=>{
    const overdueItems = overdue();
    const overdueDates = overdueItems.map((item)=> item.dueDate);
    const alloverdueDates = all.filter((item)=> item.dueDate < today).map((item)=> item.dueDate);
    expect(overdueDates).toEqual(alloverdueDates);
  })
  
  test("checking  retrieval of due today items",()=>{
    const todayItems = dueToday();
    const todayDates = todayItems.map((item)=> item.dueDate);
    const alltodayDates = all.filter((items)=> items.dueDate ==  today).map((item)=> item.dueDate);
    expect(todayDates).toEqual(alltodayDates);
  })

   test("checks retrieval of due later items",()=>{
    const laterItems = dueLater();
    const laterDates = laterItems.map((item)=> item.dueDate);
    const alllaterDates = all.filter((items)=> items.dueDate >  today).map((item)=> item.dueDate);
    expect(laterDates).toEqual(alllaterDates);
  })


});
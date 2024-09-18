const todoList = require("../todo");
const { describe, test, expect, beforeAll } = require("@jest/globals");

const { all, add, markAsComplete, overdue, dueLater, dueToday } = todoList();

describe("Todolist test suite", () => {
  beforeAll(() => {
    add({
      title: "Submit assignment",
      dueDate: new Date().toLocaleDateString("en-CA"),
      completed: false,
    });
  });

  test("Test to add a todo", () => {
    const todoItemCount = all.length;
    add({
      title: "Pay electric bill",
      dueDate: new Date().toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(all.length).toBe(todoItemCount + 1);
  });

  test("Test to mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Test to retrieve overdue items", () => {
    const overdueItems = overdue();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    add({
      title: "yesteday task",
      dueDate: yesterday.toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(overdue().length).toEqual(overdueItems.length + 1);
  });

  test("Test to retrieve due today items", () => {
    const todayItems = dueToday();
    const today = new Date();
    add({
      title: "today task",
      dueDate: today.toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(dueToday().length).toEqual(todayItems.length + 1);
  });

  test("Test to retrieve due later items", () => {
    const laterItems = dueLater();
    const tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);
    add({
      title: "tommorow task",
      dueDate: tommorow.toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(dueLater().length).toEqual(laterItems.length + 1);
  });
});

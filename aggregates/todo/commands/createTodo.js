const validate = require("../../validate");
const { TodoCreatedEvent } = require("../events");

const schema = {
  state: {
    createdAt: {
      type: "forbidden",
      messages: { forbidden: "Aggregate is already created" },
    },
    deletedAt: {
      type: "forbidden",
      messages: { forbidden: "Aggregate is already deleted" },
    },
  },
  command: { payload: { type: "object" } },
};

function createTodo(state, command) {
  validate(state, schema.state);
  validate(command, schema.command);

  return TodoCreatedEvent({ ...command.payload, createdAt: Date.now() });
}

module.exports = createTodo;

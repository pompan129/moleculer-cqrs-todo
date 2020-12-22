const validate = require("../../validate");
const { TodoDeletedEvent } = require("../events");

const schema = {
  state: {
    deletedAt: {
      type: "forbidden",
      messages: { forbidden: "Aggregate is already deleted" },
    },
  },
  command: { payload: { type: "object" } },
};

function deleteTodo(state, command) {
  validate(state, schema.state);
  validate(command, schema.command);

  return TodoDeletedEvent({ ...command.payload, deletedAt: Date.now() });
}

module.exports = deleteTodo;

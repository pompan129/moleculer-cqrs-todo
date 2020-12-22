const CREATED = "aggregate.todo.created";
const DELETED = "aggregate.todo.deleted";
const GENERIC_EVENT = "aggregate.todo.generic_event";

function TodoCreatedEvent(payload) {
  return {
    type: CREATED,
    payload,
  };
}

function TodoDeletedEvent(payload) {
  return {
    type: DELETED,
    payload,
  };
}

function TodoGenericEvent(payload) {
  return {
    type: GENERIC_EVENT,
    payload,
  };
}

module.exports = {
  types: { CREATED, DELETED, GENERIC_EVENT },
  TodoCreatedEvent,
  TodoDeletedEvent,
  TodoGenericEvent,
};

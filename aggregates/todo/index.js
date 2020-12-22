const events = require("./events");
const projection = require("./projection");
const commands = require("./commands");

/**
 * todo aggregate
 */

module.exports = {
  name: "todo",
  commands,
  projection,
  events: events.types,
  invariantHash: null,
  serializeState: state => JSON.stringify(state),
  deserializeState: serializedState => JSON.parse(serializedState),
};

const DbService = require("moleculer-db");
const { events: event } = require(".././aggregates/todo");

module.exports = {
  name: "todo-list",

  mixins: [DbService],

  adapter: new DbService.MemoryAdapter(),

  metadata: {
    viewModel: true
  },

  /**
   *
   * Service settings
   */
  settings: { fields: ["_id", "title"] },

  /**
   * Service dependencies
   */
  dependencies: [],

  /**
   * Actions
   */
  actions: {
    async dispose() {
      return this.adapter.removeMany({});
    },
  },

  /**
   * Events
   */
  events: {
    [event.CREATED](event) {
      this.actions.create({
        _id: event.aggregateId,
        title: event.payload.title,
      });
    },
    [event.DELETED](event) {
      this.actions.remove({ id: event.aggregateId });
    },
  },

  /**
   * Methods
   */
  methods: {},

  /**
   * Service created lifecycle event handler
   */
  created() {},

  /**
   * Service started lifecycle event handler
   */
  started() {},

  /**
   * Service stopped lifecycle event handler
   */
  stopped() {},
};

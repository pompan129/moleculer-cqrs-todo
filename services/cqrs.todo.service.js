const CQRSEventSourcing = require("moleculer-cqrs");
const EventSourcingStorage = require("../event-sourcing-storage");
const aggregate = require(".././aggregates/todo");

module.exports = {
  name: "todo",

  mixins: [CQRSEventSourcing({ aggregate })],

  storage: EventSourcingStorage,
  /**
   *
   * Service settings
   */
  settings: {},

  /**
   * Service dependencies
   */
  dependencies: [],

  /**
   * Actions
   */
  actions: {},

  /**
   * Events
   */
  events: {},

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

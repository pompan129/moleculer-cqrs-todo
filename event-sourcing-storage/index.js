// event-sourcing-storage/index.js

const createAdapter = require("resolve-storage-lite").default;

const fileAdapter = createAdapter({
	databaseFile: "./store.db",
});
fileAdapter.init();
module.exports = fileAdapter;

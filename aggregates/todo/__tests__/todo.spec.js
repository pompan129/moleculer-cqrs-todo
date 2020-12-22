const { CQRSFixture } = require("moleculer-cqrs");

const aggregate = require("..");
const events = require("../events");

const {
	commands: { createTodo, deleteTodo },
	// events: { TodoCreatedEvent, TodoDeletedEvent },
} = aggregate;

const { TodoCreatedEvent, TodoDeletedEvent } = events;

jest.spyOn(global.Date, "now").mockImplementation(() =>
	new Date("2019-10-01T11:01:58.135Z").valueOf()
);

const payload = {
	title: "Test document title",
	userId: "user-id-1",
	text: "Asperiores nam tempora qui et provident temporibus illo et fugit.",
};

describe("Testing aggregate commands in isolation", () => {
	test("should commands with empty payload throw error", () => {
		expect(() => createTodo({}, {})).toThrow("Aggregate validation error");
	});

	test("should createTodo command return an TestsCreatedEvent", () => {
		expect(
			createTodo(
				{},
				{
					payload,
				}
			)
		).toMatchSnapshot();
	});
});

describe("Testing aggregate with cqrs fixture", () => {
	let fixture;

	beforeEach(() => {
		fixture = new CQRSFixture(aggregate);
	});

	test("should call raw command", () => {
		fixture
			.givenEvents([])
			.when({
				aggregateId: "aggregate-uuid-1",
				type: "createTodo",
				payload,
			})
			.expectEvent(
				TodoCreatedEvent({ ...payload, createdAt: Date.now() })
			);
	});

	test("should createTodo return an TodoCreatedEvent event", () => {
		fixture
			.givenEvents()
			.when(createTodo, { aggregateId: "aggregate-uuid-1", payload })
			.expectEvent(
				TodoCreatedEvent({ ...payload, createdAt: Date.now() })
			);
	});

	test("should reject all next commands when aggregate is already deleted", () => {
		const initialEventStream = [
			TodoCreatedEvent({ payload, createdAt: Date.now() }),
			TodoDeletedEvent({ deletedAt: Date.now() }),
		];
		fixture
			.givenEvents(initialEventStream)
			.whenThrow(deleteTodo, {})
			.toThrow("Aggregate is already deleted");
	});

	test("should created order accepts delete command", () => {
		const aggregateId = "aggregate-uuid-1";
		const initialEventStream = [
			TodoCreatedEvent({ payload, createdAt: Date.now() }),
		];
		fixture
			.givenEvents(initialEventStream, aggregateId)
			.when(deleteTodo, { aggregateId, payload: {} })
			.expectEvent(TodoDeletedEvent({ deletedAt: Date.now() }));
	});
});

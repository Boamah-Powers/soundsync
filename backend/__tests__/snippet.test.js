import request from "supertest";
import app from "../src/app.js";
import { Snippet } from "../src/models/snippet.js";
import { Comment } from "../src/models/comment.js";
import { User } from "../src/models/user.js";

describe("Snippets API", () => {
	let user;

	beforeAll(async () => {
		// a user for the tests
		user = await User.create({
			username: "requester",
			email: "req@example.com",
		});
	});

	afterAll(async () => {
		// Clean up database after tests
		await Snippet.deleteMany({});
		await Comment.deleteMany({});
		await User.deleteMany({});
	});

	describe("GET /snippets", () => {
		it("should retrieve all snippets", async () => {
			const snippetsData = [
				{
					audioUrl: "https://example.com/audio/chill-vibes.mp3",
					description: "A chill vibe track to relax to.",
					tags: ["chill", "relaxing", "lofi"],
					genre: "Lofi",
					public_id: "001",
					user: user._id,
				},
				{
					audioUrl: "https://example.com/audio/energetic-beats.mp3",
					description: "An energetic track to pump up your day.",
					tags: ["energetic", "beats", "workout"],
					genre: "Electronic",
					public_id: "002",
					user: user._id,
				},
			];

			// Seed snippets in the database
			await Snippet.insertMany(snippetsData);

			const res = await request(app).get("/api/snippets");

			expect(res.status).toBe(200);
			expect(res.body).toBeInstanceOf(Array);
			expect(res.body.length).toBe(2);

			// Check the content of the response
			expect(res.body).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						audioUrl: "https://example.com/audio/chill-vibes.mp3",
						description: "A chill vibe track to relax to.",
						genre: "Lofi",
					}),
					expect.objectContaining({
						audioUrl:
							"https://example.com/audio/energetic-beats.mp3",
						description: "An energetic track to pump up your day.",
						genre: "Electronic",
					}),
				])
			);
		});
	});

	describe("GET /snippets/:id", () => {
		it("should retrieve snippet with specified id", async () => {
      const snippet = await Snippet.create({
        audioUrl: "https://example.com/audio/ambient-dreams.mp3",
        description: "An atmospheric ambient track with ethereal vibes.",
        tags: ["ambient", "dreamy", "atmosphere"],
        genre: "Ambient",
        public_id: "003",
        user: user._id,
      });
			const res = await request(app).get(`/api/snippets/${snippet._id}`);

			expect(res.status).toBe(200);
			expect(res.body).toEqual(
				expect.objectContaining({
					_id: snippet._id.toString(),
				})
			);
		});
	});
});

const request = require("supertest");
const app = require("./server");

describe("API health", () => {
  it("returns ok true on /api/health", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});

describe("404 handling", () => {
  it("returns HTML 404 for unknown GET paths", async () => {
    const res = await request(app).get("/page-inexistante-xyz");
    expect(res.statusCode).toBe(404);
    expect(String(res.headers["content-type"] || "")).toMatch(/html/i);
    expect(res.text).toMatch(/introuvable/i);
  });

  it("returns JSON 404 for unknown API paths", async () => {
    const res = await request(app).get("/api/inconnu");
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Introuvable" });
  });
});

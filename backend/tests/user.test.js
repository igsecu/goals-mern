const request = require("supertest");
const app = require("../index");

beforeAll(async () => {
  try {
  } catch (error) {
    console.log(error.message);
  }
}, 30000);

afterAll((done) => {
  done();
});

describe("POST /api/users route -> create new user", () => {
  it("it should return 400 status code -> name is missing", async () => {
    const user = {};
    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Name is missing");
  });
  it("it should return 400 status code -> name must be a string", async () => {
    const user = {
      name: 1234,
    };
    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Name must be a string");
  });
  it("it should return 400 status code -> password must be a string", async () => {
    const user = {
      name: "Nacho",
      password: 1234,
      email: "user1@email.com",
    };

    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Password must be a string");
  });
  it("it should return 400 status code -> password is missing", async () => {
    const user = {
      name: "Nacho",
      email: "user1@email.com",
    };

    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Password is missing");
  });
  it("it should return 400 status code -> password must be at least 8 characters long", async () => {
    const user = {
      name: "Nacho",
      password: "1234",
      email: "user1@email.com",
    };

    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe(
      "Password must be at least 8 characters long"
    );
  });
  it("it should return 400 status code -> password must have one capital letter", async () => {
    const user = {
      name: "Nacho",
      password: "password",
      email: "user1@email.com",
    };

    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Password must have one capital letter");
  });
  it("it should return 400 status code -> password must have one number", async () => {
    const user = {
      name: "Nacho",
      password: "Password",
      email: "user1@email.com",
    };

    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Password must have one number");
  });
  it("it should return 400 status code -> password must have one symbol", async () => {
    const user = {
      name: "Nacho",
      password: "Password14",
      email: "user1@email.com",
    };

    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Password must have one symbol");
  });
  it("it should return 400 status code -> password must have one small letter", async () => {
    const user = {
      name: "Nacho",
      password: "PASSWORD14!",
      email: "user1@email.com",
    };

    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Password must have one small letter");
  });
  it("it should return 400 status code -> email parameter is missing", async () => {
    const user = {
      name: "Nacho",
      password: "Password14!",
    };

    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Email is missing");
  });
  it("it should return 400 status code -> email must be a string", async () => {
    const user = {
      name: "Nacho",
      password: "Password14!",
      email: 1234,
    };

    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Email must be a string");
  });
  it("it should return 400 status code -> email does not have a @", async () => {
    const user = {
      name: "Nacho",
      email: "user1email.com",
      password: "Password14!",
    };

    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Email format is not valid");
  });
  it("it should return 400 status code -> email format is not valid", async () => {
    const user = {
      name: "Nacho",
      email: "user1@emailcom",
      password: "Password14!",
    };

    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Email format is not valid");
  });
  it("it should return 400 status code -> email second part has a symbol", async () => {
    const user = {
      name: "Nacho",
      email: "user1@email.#com",
      password: "Password14!",
    };

    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Email format not valid");
  });
  it("it should return 400 status code -> email second part has a number", async () => {
    const user = {
      name: "Nacho",
      email: "user1@email.1com",
      password: "Password14!",
    };

    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Email format not valid");
  });
  /*  it("it should return 201 status code -> account created", async () => {
    const user = {
      name: "User 1",
      email: "user1@gmail.com",
      password: "Password14!",
    };

    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(201);
    expect(response.body.msg).toBe("User created successfully!");
   
  }); */
  it("it should return 400 status code -> email exists", async () => {
    const user = {
      name: "User 1",
      email: "user1@gmail.com",
      password: "Password14!",
    };

    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe(
      "Email user1@gmail.com exists! Try with another one..."
    );
  });
});

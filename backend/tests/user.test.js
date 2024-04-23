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
  /*  it("it should return 201 status code -> account created", async () => {
    const user = {
      name: "User 2",
      email: "user2@gmail.com",
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

let token;

describe("POST /api/users/login route -> login process", () => {
  it("it should return 400 status code -> email is missing", async () => {
    const user = {};
    const response = await request(app).post("/api/users/login").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Email is missing");
  });
  it("it should return 400 status code -> password is missing", async () => {
    const user = {
      email: "user@gmail.com",
    };
    const response = await request(app).post("/api/users/login").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Password is missing");
  });
  it("it should return 400 status code -> email not exist", async () => {
    const user = {
      email: "user@gmail.com",
      password: "Password14",
    };
    const response = await request(app).post("/api/users/login").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Email does not exist!");
  });
  it("it should return 400 status code -> incorrect password", async () => {
    const user = {
      email: "user1@gmail.com",
      password: "Password14",
    };
    const response = await request(app).post("/api/users/login").send(user);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Incorrect password!");
  });
  it("it should return 200 status code -> login success", async () => {
    const user = {
      email: "user1@gmail.com",
      password: "Password14!",
    };
    const response = await request(app).post("/api/users/login").send(user);
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe("Login successfully!");
    token = response.body.token;
  });
});

describe("GET /api/users/user route -> get logged in user", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).get("/api/users/user");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  /* it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app)
      .get("/api/users/user")
      .set("Authorization", "Bearer hola");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  }); */
  it("it should return 200 status code -> get user data", async () => {
    const response = await request(app)
      .get("/api/users/user")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

describe("GET /api/goals route -> get goals", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).get("/api/goals");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  /*   it("it should return 404 status code -> no goals", async () => {
    const response = await request(app)
      .get("/api/goals")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("You do not have goals!");
  }); */
});

let goal1_id;

describe("POST /api/goals route -> create a new goal", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).post("/api/goals");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 400 status code -> text is missing", async () => {
    const response = await request(app)
      .post("/api/goals")
      .send({})
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Text is missing");
  });
  it("it should return 201 status code -> goal created", async () => {
    const response = await request(app)
      .post("/api/goals")
      .send({ text: "Goal 1" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
    expect(response.body.msg).toBe("Goal created successfully!");
    goal1_id = response.body.data._id;
  });
});

describe("GET /api/goals route -> get goals", () => {
  it("it should return 200 status code -> no goals", async () => {
    const response = await request(app)
      .get("/api/goals")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

describe("PUT /api/goals/:id route -> update goal", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).put(
      "/api/goals/662828bd4ab4dedb76f3f4bd"
    );
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 200 status code -> login success", async () => {
    const user = {
      email: "user2@gmail.com",
      password: "Password14!",
    };
    const response = await request(app).post("/api/users/login").send(user);
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe("Login successfully!");
    token = response.body.token;
  });
  it("it should return 404 status code -> goal not found", async () => {
    const response = await request(app)
      .put("/api/goals/662828bd4ab4dedb76f3f4bd")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe(
      "Goal with ID: 662828bd4ab4dedb76f3f4bd not found!"
    );
  });
  it("it should return 400 status code -> text is missing", async () => {
    const response = await request(app)
      .put("/api/goals/662833fc18a0798d39e075f5")
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Text is missing");
  });
  it("it should return 401 status code -> goal not yours", async () => {
    const response = await request(app)
      .put("/api/goals/662833fc18a0798d39e075f5")
      .send({ text: "Goal Updated" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe(
      "You can not update a goal that is not yours!"
    );
  });
  it("it should return 200 status code -> login success", async () => {
    const user = {
      email: "user1@gmail.com",
      password: "Password14!",
    };
    const response = await request(app).post("/api/users/login").send(user);
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe("Login successfully!");
    token = response.body.token;
  });
  it("it should return 200 status code -> goal updated", async () => {
    const response = await request(app)
      .put("/api/goals/662833fc18a0798d39e075f5")
      .send({ text: "Goal Updated" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe("Goal updated successfully!");
  });
});

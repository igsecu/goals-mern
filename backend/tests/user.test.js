const request = require("supertest");
const app = require("../index");
const connectDB = require("../config/db");

beforeAll(async () => {
  try {
    const conn = await connectDB();
    await conn.connection.dropDatabase();
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
  it("it should return 201 status code -> account created", async () => {
    const user = {
      name: "User 1",
      email: "user1@gmail.com",
      password: "Password14!",
    };

    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(201);
    expect(response.body.msg).toBe("User created successfully!");
  });
  it("it should return 201 status code -> account created", async () => {
    const user = {
      name: "User 2",
      email: "user2@gmail.com",
      password: "Password14!",
    };

    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(201);
    expect(response.body.msg).toBe("User created successfully!");
  });
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

describe("PUT /api/users/image route -> update user image", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).put("/api/users/image");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 400 status code -> image file is missing", async () => {
    const response = await request(app)
      .put("/api/users/image")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Image file is missing!");
  });
  it("it should return 400 status code -> file type no allowed", async () => {
    const response = await request(app)
      .put("/api/users/image")
      .set("Authorization", `Bearer ${token}`)
      .attach("image", `${__dirname}/files/file.txt`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe(
      "File format not allowed! Only JPG or PNG..."
    );
  });
  it("it should return 400 status code -> file size not supported", async () => {
    const response = await request(app)
      .put("/api/users/image")
      .set("Authorization", `Bearer ${token}`)
      .attach("image", `${__dirname}/files/heavyimage.jpg`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("File must be up to 2mb!");
  });
  /*  it("it should return 200 status code -> user image updated", async () => {
    const response = await request(app)
      .put("/api/users/image")
      .set("Authorization", `Bearer ${token}`)
      .attach("image", `${__dirname}/files/avatar1.png`);
    expect(response.status).toBe(200);
  }); */
});

let goal1_id, goal2_id, goal3_id, goal4_id;

describe("POST /api/goals route -> create a new goal", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).post("/api/goals");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 400 status code -> title is missing", async () => {
    const response = await request(app)
      .post("/api/goals")
      .send({})
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Title is missing");
  });
  it("it should return 400 status code -> title must be a string", async () => {
    const response = await request(app)
      .post("/api/goals")
      .send({ title: 1234 })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Title must be a string");
  });
  it("it should return 400 status code -> title 30 characters", async () => {
    const response = await request(app)
      .post("/api/goals")
      .send({
        title:
          "fdsflds;jfa;ldsjfsdl;fjds;afjdsl;afjdls;afjd;lsajfd;sajf;dsfjds;l",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Title must be 30 characters or less");
  });
  it("it should return 400 status code -> description is missing", async () => {
    const response = await request(app)
      .post("/api/goals")
      .send({
        title: "Title 1",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Description is missing");
  });
  it("it should return 400 status code -> description must be a string", async () => {
    const response = await request(app)
      .post("/api/goals")
      .send({
        title: "Title 1",
        description: 1234,
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Description must be a string");
  });
  it("it should return 400 status code -> urgency is missing", async () => {
    const response = await request(app)
      .post("/api/goals")
      .send({
        title: "Goal 1",
        description: "Description of Goal 1",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Urgency is missing");
  });
  it("it should return 400 status code -> urgency must be a string", async () => {
    const response = await request(app)
      .post("/api/goals")
      .send({
        title: "Goal 1",
        description: "Description of Goal 1",
        urgency: 1234,
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Urgency must be a string");
  });
  it("it should return 400 status code -> urgency low, medium, high", async () => {
    const response = await request(app)
      .post("/api/goals")
      .send({
        title: "Goal 1",
        description: "Description of Goal 1",
        urgency: "hola",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Urgency must be LOW, MEDIUM or HIGH");
  });
  it("it should return 201 status code -> goal created", async () => {
    const response = await request(app)
      .post("/api/goals")
      .send({
        title: "Goal 1",
        description: "Description of Goal 1",
        urgency: "low",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
    goal1_id = response.body.data._id;
  });
  it("it should return 201 status code -> goal created", async () => {
    const response = await request(app)
      .post("/api/goals")
      .send({
        title: "Goal 2",
        description: "Description of Goal 2",
        urgency: "low",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
    goal2_id = response.body.data._id;
  });
  it("it should return 201 status code -> goal created", async () => {
    const response = await request(app)
      .post("/api/goals")
      .send({
        title: "Goal 3",
        description: "Description of Goal 3",
        urgency: "high",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
    goal3_id = response.body.data._id;
  });
  it("it should return 201 status code -> goal created", async () => {
    const response = await request(app)
      .post("/api/goals")
      .send({
        title: "Goal 4",
        description: "Description of Goal 4",
        urgency: "low",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
    goal4_id = response.body.data._id;
  });
  it("it should return 201 status code -> goal created", async () => {
    const response = await request(app)
      .post("/api/goals")
      .send({
        title: "Goal 5",
        description: "Description of Goal 5",
        urgency: "low",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
  });
  it("it should return 201 status code -> goal created", async () => {
    const response = await request(app)
      .post("/api/goals")
      .send({
        title: "Goal 6",
        description: "Description of Goal 6",
        urgency: "high",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
  });
});

describe("PUT /api/goals/:id route -> update goal", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).put("/api/goals/1");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 400 status code -> title must be a string", async () => {
    const response = await request(app)
      .put("/api/goals/1")
      .send({ title: 1234 })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Title must be a string");
  });
  it("it should return 400 status code -> description must be a string", async () => {
    const response = await request(app)
      .put("/api/goals/1")
      .send({ description: 1234 })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Description must be a string");
  });
  it("it should return 400 status code -> title or description missing", async () => {
    const response = await request(app)
      .put("/api/goals/1")
      .send({})
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Title, description or urgency missing");
  });
  it("it should return 400 status code -> id invalid format", async () => {
    const response = await request(app)
      .put("/api/goals/1")
      .send({ title: "Title updated!" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("ID: 1 - Invalid format!");
  });
  it("it should return 404 status code -> goal not found", async () => {
    const response = await request(app)
      .put("/api/goals/66314419909472edf65229fb")
      .send({ title: "Title updated!" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe(
      "Goal with ID: 66314419909472edf65229fb not found!"
    );
  });
  it("it should return 200 status code -> goal updated", async () => {
    const response = await request(app)
      .put(`/api/goals/${goal1_id}`)
      .send({ title: "Title updated!" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("it should return 200 status code -> goal updated", async () => {
    const response = await request(app)
      .put(`/api/goals/${goal2_id}?urgency=medium`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

describe("DELETE /api/goals/:id route -> delete goal", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).delete("/api/goals/1");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 400 status code -> id invalid format", async () => {
    const response = await request(app)
      .delete("/api/goals/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("ID: 1 - Invalid format!");
  });
  it("it should return 404 status code -> goal not found", async () => {
    const response = await request(app)
      .delete("/api/goals/6631441c909472edf6522a18")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe(
      "Goal with ID: 6631441c909472edf6522a18 not found!"
    );
  });
  it("it should return 200 status code -> goal deleted", async () => {
    const response = await request(app)
      .delete(`/api/goals/${goal1_id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

describe("GET /api/goals/urgency/low route -> get low urgency goals", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).get("/api/goals/urgency/low");

    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 200 status code -> get goals", async () => {
    const response = await request(app)
      .get("/api/goals/urgency/low")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

/* describe("GET /api/goals/urgency/medium route -> get medium urgency goals", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).get("/api/goals/urgency/medium");

    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 200 status code -> get goals", async () => {
    const response = await request(app)
      .get("/api/goals/urgency/medium")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

describe("GET /api/goals/urgency/high route -> get high urgency goals", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).get("/api/goals/urgency/high");

    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 200 status code -> get goals", async () => {
    const response = await request(app)
      .get("/api/goals/urgency/high")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

describe("GET /api/goals/completed route -> get completed goals", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).get("/api/goals/completed");

    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 404 status code -> no completed goals", async () => {
    const response = await request(app)
      .get("/api/goals/completed")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("You do not have completed goals!");
  });
}); */

let task1_id, task2_id, task3_id;

describe("POST /api/task route -> create new task", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).post("/api/tasks");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 400 status code -> text is missing", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Text is missing");
  });
  it("it should return 400 status code -> text must be a string", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: 1234 });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Text must be a string");
  });
  it("it should return 400 status code -> goalId is missing", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Task 1" });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("goalId is missing");
  });
  it("it should return 400 status code -> goalId invalid format", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Task 1", goalId: 1 });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("goalId: 1 - Invalid format!");
  });
  it("it should return 404 status code -> goal not found", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Task 1", goalId: "66314f999626130dd8ec339e" });
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe(
      "Goal with ID: 66314f999626130dd8ec339e not found!"
    );
  });
  it("it should return 201 status code -> task created", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Task 1", goalId: goal2_id });
    expect(response.status).toBe(201);
    task1_id = response.body.data._id;
  });
  it("it should return 201 status code -> task created", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Task 2", goalId: goal2_id });
    expect(response.status).toBe(201);
    task2_id = response.body.data._id;
  });
  it("it should return 201 status code -> task created", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Task 3", goalId: goal2_id });
    expect(response.status).toBe(201);
    task3_id = response.body.data._id;
  });
});

describe("PUT /api/task/:id/status/progress route -> update task progress", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).put("/api/tasks/1/status/progress");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 400 status code -> id invalid format", async () => {
    const response = await request(app)
      .put("/api/tasks/1/status/progress")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("ID: 1 - Invalid format!");
  });
  it("it should return 404 status code -> task not found", async () => {
    const response = await request(app)
      .put("/api/tasks/66315bffb17524ff82a6e404/status/progress")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe(
      "Task with ID: 66315bffb17524ff82a6e404 not found!"
    );
  });
  it("it should return 200 status code -> task updated", async () => {
    const response = await request(app)
      .put(`/api/tasks/${task1_id}/status/progress`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

describe("PUT /api/task/:id/status/completed route -> update task completed", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).put("/api/tasks/1/status/completed");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 400 status code -> id invalid format", async () => {
    const response = await request(app)
      .put("/api/tasks/1/status/completed")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("ID: 1 - Invalid format!");
  });
  it("it should return 404 status code -> task not found", async () => {
    const response = await request(app)
      .put("/api/tasks/66315bffb17524ff82a6e404/status/completed")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe(
      "Task with ID: 66315bffb17524ff82a6e404 not found!"
    );
  });
  it("it should return 200 status code -> task updated", async () => {
    const response = await request(app)
      .put(`/api/tasks/${task1_id}/status/completed`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("it should return 200 status code -> task updated", async () => {
    const response = await request(app)
      .put(`/api/tasks/${task2_id}/status/completed`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("it should return 200 status code -> task updated", async () => {
    const response = await request(app)
      .put(`/api/tasks/${task3_id}/status/completed`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

describe("DELETE /api/tasks/:id route -> delete task", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).delete("/api/tasks/1");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 400 status code -> id invalid format", async () => {
    const response = await request(app)
      .delete("/api/tasks/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("ID: 1 - Invalid format!");
  });
  it("it should return 404 status code -> task not found", async () => {
    const response = await request(app)
      .delete("/api/tasks/6631441c909472edf6522a18")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe(
      "Task with ID: 6631441c909472edf6522a18 not found!"
    );
  });
  /*   it("it should return 200 status code -> task deleted", async () => {
    const response = await request(app)
      .delete(`/api/tasks/${task1_id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  }); */
});

describe("PUT /api/goals/:id/completed route -> update goal completed", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).put("/api/goals/1/completed");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 400 status code -> id invalid format", async () => {
    const response = await request(app)
      .put("/api/goals/1/completed")
      .send({ title: "Title updated!" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("ID: 1 - Invalid format!");
  });
  it("it should return 404 status code -> task not found", async () => {
    const response = await request(app)
      .put("/api/goals/66314419909472edf65229fb/completed")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe(
      "Goal with ID: 66314419909472edf65229fb not found!"
    );
  });
  it("it should return 200 status code -> goal updated", async () => {
    const response = await request(app)
      .put(`/api/goals/${goal3_id}/completed`)
      .send({ title: "Title updated!" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

let newTask_id;

describe("POST /api/task route -> create new task", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).post("/api/tasks");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 400 status code -> text is missing", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Text is missing");
  });
  it("it should return 400 status code -> text must be a string", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: 1234 });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Text must be a string");
  });
  it("it should return 400 status code -> goalId is missing", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Task 1" });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("goalId is missing");
  });
  it("it should return 400 status code -> goalId invalid format", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Task 1", goalId: 1 });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("goalId: 1 - Invalid format!");
  });
  it("it should return 404 status code -> goal not found", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Task 1", goalId: "66314f999626130dd8ec339e" });
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe(
      "Goal with ID: 66314f999626130dd8ec339e not found!"
    );
  });
  it("it should return 201 status code -> task created", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Task 1", goalId: goal4_id });
    expect(response.status).toBe(201);
  });
  it("it should return 201 status code -> task created", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Task 2", goalId: goal4_id });
    expect(response.status).toBe(201);
    newTask_id = response.body.data._id;
  });
  it("it should return 201 status code -> task created", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Task 3", goalId: goal4_id });
    expect(response.status).toBe(201);
  });
});

describe("GET /api/goals/urgency/low route -> get low urgency goals", () => {
  it("it should return 200 status code -> get goals", async () => {
    const response = await request(app)
      .get("/api/goals/urgency/low")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

describe("DELETE /api/tasks/:id route -> delete task", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).delete("/api/tasks/1");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 400 status code -> id invalid format", async () => {
    const response = await request(app)
      .delete("/api/tasks/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("ID: 1 - Invalid format!");
  });
  it("it should return 404 status code -> task not found", async () => {
    const response = await request(app)
      .delete("/api/tasks/6631441c909472edf6522a18")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe(
      "Task with ID: 6631441c909472edf6522a18 not found!"
    );
  });
  it("it should return 200 status code -> task deleted", async () => {
    const response = await request(app)
      .delete(`/api/tasks/${newTask_id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

describe("GET /api/goals/urgency/low route -> get low urgency goals", () => {
  it("it should return 200 status code -> get goals", async () => {
    const response = await request(app)
      .get("/api/goals/urgency/low")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

let note1_id, note2_id, note3_id;

describe("POST /api/task route -> create new note", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).post("/api/notes");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 400 status code -> text is missing", async () => {
    const response = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Text is missing");
  });
  it("it should return 400 status code -> text must be a string", async () => {
    const response = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: 1234 });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Text must be a string");
  });
  it("it should return 400 status code -> goalId is missing", async () => {
    const response = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Task 1" });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("goalId is missing");
  });
  it("it should return 400 status code -> goalId invalid format", async () => {
    const response = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Task 1", goalId: 1 });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("goalId: 1 - Invalid format!");
  });
  it("it should return 404 status code -> goal not found", async () => {
    const response = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Task 1", goalId: "66314f999626130dd8ec339e" });
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe(
      "Goal with ID: 66314f999626130dd8ec339e not found!"
    );
  });
  it("it should return 201 status code -> note created", async () => {
    const response = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Note 1", goalId: goal4_id });
    expect(response.status).toBe(201);
    note1_id = response.body.data._id;
  });
  it("it should return 201 status code -> note created", async () => {
    const response = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Note 2", goalId: goal4_id });
    expect(response.status).toBe(201);
    note2_id = response.body.data._id;
  });
  it("it should return 201 status code -> note created", async () => {
    const response = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Note 3", goalId: goal4_id });
    expect(response.status).toBe(201);
    note3_id = response.body.data._id;
  });
});

describe("GET /api/goals/urgency/low route -> get low urgency goals", () => {
  it("it should return 200 status code -> get goals", async () => {
    const response = await request(app)
      .get("/api/goals/urgency/low")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

describe("DELETE /api/notes/:id route -> delete note", () => {
  it("it should return 401 status code -> not authorized", async () => {
    const response = await request(app).delete("/api/notes/1");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("You are not authorized! Please login...");
  });
  it("it should return 400 status code -> id invalid format", async () => {
    const response = await request(app)
      .delete("/api/notes/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("ID: 1 - Invalid format!");
  });
  it("it should return 404 status code -> note not found", async () => {
    const response = await request(app)
      .delete("/api/notes/6631441c909472edf6522a18")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe(
      "Note with ID: 6631441c909472edf6522a18 not found!"
    );
  });
  it("it should return 200 status code -> note deleted", async () => {
    const response = await request(app)
      .delete(`/api/notes/${note2_id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

describe("GET /api/goals/urgency/low route -> get low urgency goals", () => {
  it("it should return 200 status code -> get goals", async () => {
    const response = await request(app)
      .get("/api/goals/urgency/low")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

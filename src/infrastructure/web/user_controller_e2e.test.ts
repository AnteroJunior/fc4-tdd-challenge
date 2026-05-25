import { DataSource } from "typeorm";
import { UserService } from "../../application/services/user_service";
import { UserEntity } from "../persistence/entities/user_entity";
import { TypeORMUserRepository } from "../repositories/typeorm_user_repository";
import { UserController } from "./user_controller";
import express from "express";
import request from "supertest";

const app = express();
app.use(express.json());

describe("UserController", () => {
  let dataSource: DataSource;
  let userRepository: TypeORMUserRepository;
  let userService: UserService;
  let userController: UserController;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [UserEntity],
      synchronize: true,
      logging: false,
    });

    await dataSource.initialize();

    userRepository = new TypeORMUserRepository(
      dataSource.getRepository(UserEntity),
    );

    userService = new UserService(userRepository);
    userController = new UserController(userService);

    app.post("/users", (req, res, next) => {
      userController.createUser(req, res).catch((err) => next(err));
    });
  });

  it("deve criar um usuário com sucesso", async () => {
    const response = await request(app).post("/users").send({
      id: "1",
      name: "Usuário de Teste",
    });

    const user = (await userRepository.findById("1")) as any;
    expect(user).not.toBeNull();
    expect(user.getId()).toBe("1");
    expect(user.getName()).toBe("Usuário de Teste");

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "User created successfully" });
  });

  it("deve retornar erro ao criar um usuário com nome vazio", async () => {
    const response = await request(app).post("/users").send({
      id: "2",
      name: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "O nome é obrigatório" });
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});

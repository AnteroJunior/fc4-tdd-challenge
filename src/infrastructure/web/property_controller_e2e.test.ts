import { DataSource } from "typeorm";
import { PropertyEntity } from "../persistence/entities/property_entity";
import { BookingEntity } from "../persistence/entities/booking_entity";
import { UserEntity } from "../persistence/entities/user_entity";

import { PropertyService } from "../../application/services/property_service";
import { TypeORMPropertyRepository } from "../repositories/typeorm_property_repository";
import { PropertyController } from "./property_controller";

import express from "express";
import request from "supertest";

const app = express();
app.use(express.json());

describe("PropertyController", () => {
  let dataSource: DataSource;
  let propertyController: PropertyController;
  let propertyService: PropertyService;
  let propertyRepository: TypeORMPropertyRepository;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [PropertyEntity, BookingEntity, UserEntity],
      synchronize: true,
      logging: false,
    });

    await dataSource.initialize();

    propertyRepository = new TypeORMPropertyRepository(
      dataSource.getRepository(PropertyEntity),
    );

    propertyService = new PropertyService(propertyRepository);
    propertyController = new PropertyController(propertyService);

    app.post("/properties", (req, res, next) => {
      propertyController.createProperty(req, res).catch((err) => next(err));
    });
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it("deve criar uma propriedade com sucesso", async () => {
    const response = await request(app).post("/properties").send({
      id: "1",
      name: "Propriedade de Teste",
      description: "Descrição da propriedade de teste",
      maxGuests: 4,
      basePricePerNight: 100.0,
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Property created successfully" });
  });

  it("deve retornar erro com código 400 e mensagem 'O nome é obrigatório.' ao enviar um nome vazio", async () => {
    const response = await request(app).post("/properties").send({
      id: "2",
      name: "",
      description: "Descrição da propriedade de teste",
      maxGuests: 4,
      basePricePerNight: 100.0,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "O nome é obrigatório",
    });
  });

  it("deve retornar erro com código 400 e mensagem 'A capacidade máxima deve ser maior que zero.' ao enviar maxGuests igual a zero ou negativo", async () => {
    const response = await request(app).post("/properties").send({
      id: "3",
      name: "Propriedade de Teste",
      description: "Descrição da propriedade de teste",
      maxGuests: 0,
      basePricePerNight: 100.0,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "O número máximo de hóspedes deve ser maior que zero",
    });
  });

  it("deve retornar erro com código 400 e mensagem 'O preço base por noite é obrigatório.' ao enviar basePricePerNight ausente", async () => {
    const response = await request(app).post("/properties").send({
      id: "4",
      name: "Propriedade de Teste",
      description: "Descrição da propriedade de teste",
      maxGuests: 4,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "O preço base por noite é obrigatório",
    });
  });
});

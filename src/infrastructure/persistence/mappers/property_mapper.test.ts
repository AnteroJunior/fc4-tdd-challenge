import { PropertyMapper } from "./property_mapper";

describe("PropertyMapper", () => {
  it("deve converter PropertyEntity em Property corretamente", () => {
    const mockPropertyEntity = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Casa de Praia",
      description: "Uma casa de praia aconchegante.",
      maxGuests: 6,
      basePricePerNight: 250.0,
      bookings: [],
    };

    const property = PropertyMapper.toDomain(mockPropertyEntity) as any;

    expect(property).toBeDefined();
    expect(property.id).toBe(mockPropertyEntity.id);
    expect(property.name).toBe(mockPropertyEntity.name);
    expect(property.description).toBe(mockPropertyEntity.description);
    expect(property.maxGuests).toBe(mockPropertyEntity.maxGuests);
    expect(property.basePricePerNight).toBe(
      mockPropertyEntity.basePricePerNight,
    );
  });

  it("deve converter Property para PropertyEntity corretamente", () => {
    const mockProperty = {
      getId: () => "123e4567-e89b-12d3-a456-426614174000",
      getName: () => "Casa de Praia",
      getDescription: () => "Uma casa de praia aconchegante.",
      getMaxGuests: () => 6,
      getBasePricePerNight: () => 250.0,
    };

    const propertyEntity = PropertyMapper.toPersistence(
      mockProperty as any,
    ) as any;

    expect(propertyEntity).toBeDefined();
    expect(propertyEntity.id).toBe(mockProperty.getId());
    expect(propertyEntity.name).toBe(mockProperty.getName());
    expect(propertyEntity.description).toBe(mockProperty.getDescription());
    expect(propertyEntity.maxGuests).toBe(mockProperty.getMaxGuests());
    expect(propertyEntity.basePricePerNight).toBe(
      mockProperty.getBasePricePerNight(),
    );
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
    const invalidPropertyEntity = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      description: "Uma casa de praia aconchegante.",
      maxGuests: 6,
      basePricePerNight: 250.0,
    } as any;

    expect(() => {
      PropertyMapper.toDomain(invalidPropertyEntity);
    }).toThrowError("O nome é obrigatório");
  });
});

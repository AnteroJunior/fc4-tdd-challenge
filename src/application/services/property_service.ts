import { Property } from "../../domain/entities/property";
import { PropertyRepository } from "../../domain/repositories/property_repository";
import { CreatePropertyDTO } from "../dtos/create_property_dto";

export class PropertyService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async findPropertyById(id: string): Promise<Property | null> {
    return this.propertyRepository.findById(id);
  }

  async createProperty(property: CreatePropertyDTO): Promise<void> {
    const newProperty = new Property(
      property.id,
      property.name,
      property.description,
      property.maxGuests,
      property.basePricePerNight,
    );
    return await this.propertyRepository.save(newProperty);
  }
}

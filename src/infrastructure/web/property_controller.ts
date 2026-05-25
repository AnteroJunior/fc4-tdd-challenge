import { Request, Response } from "express";
import { PropertyService } from "../../application/services/property_service";
import { CreatePropertyDTO } from "../../application/dtos/create_property_dto";

export class PropertyController {
  private propertyService: PropertyService;

  constructor(propertyService: PropertyService) {
    this.propertyService = propertyService;
  }

  async createProperty(req: Request, res: Response): Promise<Response> {
    const params: CreatePropertyDTO = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      maxGuests: req.body.maxGuests,
      basePricePerNight: req.body.basePricePerNight,
    };

    try {
      await this.propertyService.createProperty(params);
      return res.status(201).json({ message: "Property created successfully" });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "An unexpected error occurred" });
    }
  }
}

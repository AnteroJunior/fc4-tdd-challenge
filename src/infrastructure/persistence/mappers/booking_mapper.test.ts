import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";
import { BookingEntity } from "../entities/booking_entity";
import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../entities/user_entity";
import { BookingMapper } from "./booking_mapper";

describe("BookingMapper", () => {
  it("deve converter BookingEntity em Booking corretamente", () => {
    const mockUserEntity = new UserEntity();
    mockUserEntity.id = "user123";
    mockUserEntity.name = "John Doe";

    const mockPropertyEntity = new PropertyEntity();
    mockPropertyEntity.id = "property123";
    mockPropertyEntity.name = "Test Property";
    mockPropertyEntity.description = "A nice place to stay";
    mockPropertyEntity.maxGuests = 4;
    mockPropertyEntity.basePricePerNight = 100;

    const mockBookingEntity = new BookingEntity();
    mockBookingEntity.id = "123";
    mockBookingEntity.guest = mockUserEntity;
    mockBookingEntity.property = mockPropertyEntity;
    mockBookingEntity.startDate = new Date("2026-05-20");
    mockBookingEntity.endDate = new Date("2026-05-24");
    mockBookingEntity.guestCount = 2;
    mockBookingEntity.totalPrice = 400;
    mockBookingEntity.status = "CONFIRMED";

    const booking = BookingMapper.toDomain(mockBookingEntity);

    expect(booking).toBeInstanceOf(Booking);
    expect(booking.getId()).toBe("123");
    expect(booking.getUser().getId()).toBe("user123");
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
    const mockBookingEntity = new BookingEntity();
    mockBookingEntity.id = "123";

    expect(() => BookingMapper.toDomain(mockBookingEntity)).toThrowError();
  });

  it("deve converter Booking para BookingEntity corretamente", () => {
    const mockProperty = new Property(
      "property123",
      "Test Property",
      "A nice place to stay",
      4,
      100,
    );
    const mockUser = new User("user123", "John Doe");
    const mockDateRange = new DateRange(
      new Date("2026-05-20"),
      new Date("2026-05-24"),
    );

    const mockBooking = new Booking(
      "1",
      mockProperty,
      mockUser,
      mockDateRange,
      2,
    );

    const bookingEntity = BookingMapper.toPersistence(mockBooking);

    expect(bookingEntity).toBeInstanceOf(BookingEntity);
    expect(bookingEntity.id).toBe("1");
    expect(bookingEntity.guest.name).toBe(mockUser.getName());
  });
});

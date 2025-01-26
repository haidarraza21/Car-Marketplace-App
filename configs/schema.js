import { integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CarListing = pgTable("carListing", {
  id: serial("id").primaryKey(),
  listingTitle: varchar("listingTitle"),
  tagline: varchar("tagline"),
  originalPrice: varchar("originalPrice"),
  sellingPrice: varchar("sellingPrice"),
  category: varchar("category"),
  condition: varchar("condition"),
  make: varchar("make"),
  model: varchar("model"),
  year: varchar("year"),
  driveType: varchar("driveType"),
  transmission: varchar("transmission"),
  fuelType: varchar("fuelType"),
  mileage: varchar("mileage"),
  engineSize: varchar("engineSize"),
  cylinder: varchar("cylinder"),
  Color: varchar("Color"),
  door: varchar("door"),
  vin: varchar("vin"),
  offerType: varchar("offerType"),

  listingDescription: varchar("listingDescription").notNull(),
  features: json("features"),
});

export const CarImages = pgTable("carImage", {
  id: serial("id").primaryKey(), // Auto-incrementing ID for the car image
  imageUrl: varchar("imageUrl").notNull(), // URL of the uploaded image
  carListingId: integer("carListingId") // Foreign key referencing the CarListing table
    .notNull()
    .references(() => CarListing.id), // Referencing the id field of the CarListing table
});

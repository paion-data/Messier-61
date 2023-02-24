// Copyright 2023 Paion Data. All rights reserved.
import { nanoid } from "nanoid";

/**
 * Generates a 21-char random string, which can be commonly used as a surrogate key or ID
 *
 * @returns a random ID with 21 characters (to have a collision probability similar to UUID v4)
 */
export default function generateId(): string {
  return nanoid();
}

export class DuplicateIdError extends Error {
  constructor(id: number) {
    super(`Duplicate ID found: ${id}`);
    this.name = "DuplicateIdError";
  }
}
export class ApiError extends Error {

  constructor(public status: number, message?: string) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }

}
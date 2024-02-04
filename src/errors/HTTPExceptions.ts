class HTTPException extends Error {
  private status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'HTTPException';
    this.status = status;
  }
}

// sadly next.js error.js doesn't support custom error names

export class HTTPUnauthorizedException extends HTTPException {
  constructor() {
    super('HTTPUnauthorizedException', 401);
    this.name = 'HTTPUnauthorizedException';
  }
}

export class HTTPForbiddenException extends HTTPException {
  constructor() {
    super('HTTPForbiddenException', 403);
    this.name = 'HTTPForbiddenException';
  }
}

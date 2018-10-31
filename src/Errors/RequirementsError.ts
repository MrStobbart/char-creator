import { Requirement } from '../models/interfaces';

export class RequirementsError extends Error{

  notMetRequirements: Requirement[] = []

  constructor(message: string, notMetRequirements: Requirement[]) {
    super(message);
    Object.setPrototypeOf(this, RequirementsError.prototype);
    this.notMetRequirements = notMetRequirements
  }
} 
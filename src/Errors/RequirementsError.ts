import { Requirement } from '../models/interfaces';

export class RequirementsError extends Error{
  constructor(message: string, notMeetRequirements: Requirement[]) {
    super(message);
    Object.setPrototypeOf(this, RequirementsError.prototype);
  }
} 
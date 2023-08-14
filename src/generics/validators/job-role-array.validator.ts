import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { JobRole } from 'src/generics/enums/jobRole';

@ValidatorConstraint({ name: 'IsValidJobRoleArray', async: false })
export class IsValidJobRoleArray implements ValidatorConstraintInterface {
  validate(jobs: any[], args: ValidationArguments) {
    if (!jobs || !Array.isArray(jobs)) {
      return false;
    }
    return jobs.every((job) => Object.values(JobRole).includes(job));
  }

  defaultMessage(args: ValidationArguments) {
    return `Each job in the jobs array must be a valid job role.`;
  }
}

export function IsJobRoleArray(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      name: 'IsJobRoleArray',
      options: validationOptions,
      validator: IsValidJobRoleArray,
    });
  };
}

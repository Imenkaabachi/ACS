import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidRelayIndex', async: false })
export class IsValidRelayIndex implements ValidatorConstraintInterface {
  validate(relayIndex: number, args: ValidationArguments) {
    return relayIndex >= 1 && relayIndex <= 8;
  }

  defaultMessage(args: ValidationArguments) {
    return `relayIndex must be a number between 1 and 8.`;
  }
}

export function IsRelayIndex(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      name: 'IsRelayIndex',
      options: validationOptions,
      validator: IsValidRelayIndex,
    });
  };
}

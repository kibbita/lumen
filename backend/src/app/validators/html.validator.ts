// validators/is-html.validator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsHtml(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isHtml',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;

          const htmlRegex = /<\/?[a-z][\s\S]*>/i;
          return htmlRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must contain valid HTML`;
        },
      },
    });
  };
}
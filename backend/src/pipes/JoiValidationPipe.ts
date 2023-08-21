import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(
    private schema: ObjectSchema,
    private errorType?: HttpException,
  ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const { error } = this.schema.validate(value);
      if (error) {
        if (this.errorType) throw this.errorType;

        throw new BadRequestException(
          'Validation failed' + JSON.stringify(error),
        );
      }
    }
    return value;
  }
}

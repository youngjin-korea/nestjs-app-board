import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions: BoardStatus[] = [
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not in the status options`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    // arrays.indexof(값)인 경우에 포함되지 않으면 -1을 리턴함
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}

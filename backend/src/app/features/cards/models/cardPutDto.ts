import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { CardPostDto } from './cardPostDto';
import { IsHtml } from '../../../validators/html.validator';

export class CardPutDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsString()
  @IsHtml({ message: 'backContet must be valid HTML' })
  @IsNotEmpty()
  backContent!: string;

  @IsString()
  @IsHtml({ message: 'frontContent must be valid HTML' })
  @IsNotEmpty()
  frontContent!: string;
}

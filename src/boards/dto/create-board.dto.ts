import { IsNotEmpty } from 'class-validator';

// db에서 데이터를 받아오는 형식의 객체인데 interface보다 class를 선호하는 이유는 class는 런타임중 생성되므로 파이프라인 역할을 할때 유용함.
export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

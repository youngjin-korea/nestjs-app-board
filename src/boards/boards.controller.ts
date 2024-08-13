import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  // 1) 필드변수로 boardService를 만들고 생성자 함수로 DI를하는 방식
  //   boardsService: BoardsService;
  //   constructor(boardsService: BoardsService) {
  //     this.boardsService = boardsService;
  //   }
  //2) 생성자 매개변수에 접근제어자를 설정해주면 자동으로 필드변수 생성 및 의존성주입됨
  constructor(private boardsService: BoardsService) {}
  //   // host/boards 경로로 Get요청시 Read -> 모든 게시물 읽어오기
  //   @Get('/')
  //   getAllBoards(): Board[] {
  //     return this.boardsService.getAllBoards();
  //   }
  //   @UsePipes(ValidationPipe) // createBoardDto에 멤버변수에 설정된 validation들이 유효성체크됨
  //   @Post('/')
  //   createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //     return this.boardsService.createBoard(createBoardDto);
  //   }
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }
  //   @Delete('/:id')
  //   deleteBoard(@Param('id') id: string): void {
  //     this.boardsService.deleteBoard(id);
  //   }
  //   @Patch('/:id/status')
  //   updateBoardsStatus(
  //     @Param('id') id: string,
  //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  //   ): Board {
  //     return this.boardsService.updateBoardStatus(id, status);
  //   }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';

@Injectable() //어디에서든 DI 가능해짐
export class BoardsService {
  // 레파지토리 사용을 위한 DI @InjectRepository
  constructor(
    // module에 Board 엔티티 등록 후 여기서 DI 해줌
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  //READ -> 모든 게시물 읽어오기
  //   getAllBoards(): Board[] {
  //     return this.boards;
  //   }
  //   createBoard(createBoardDto: CreateBoardDto) {
  //     const { title, description } = createBoardDto;
  //     const board: Board = {
  //       id: uuid(),
  //       title,
  //       description,
  //       status: BoardStatus.PUBLIC,
  //     };
  //     this.boards.push(board);
  //     return board;
  //   }
  //findOne()은 repository의 메소드로 비동기로 처리하여 promise객체에 Board객체를 리턴함.
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id: id } }); // where : {id => db column: id => parameter}

    if (!found) {
      console.log(found); //found는 undefined찍힘
      throw new NotFoundException(`Can't find Board with id ${id}`); //body에 message로 "Not Found"라고 보냄
    }

    return found;
  }
  //   deleteBoard(id: string): void {
  //     const found = this.getBoardById(id);
  //     this.boards = this.boards.filter((board) => board.id !== found.id);
  //   }
  //   updateBoardStatus(id: string, status: BoardStatus): Board {
  //     const board = this.getBoardById(id);
  //     board.status = status;
  //     return board;
  //   }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { BoardRepository } from './board.repository';

@Injectable() //어디에서든 DI 가능해짐
export class BoardsService {
  //의존성 주입 DI(IOC)
  constructor(private readonly boardRepository: BoardRepository) {}

  //READ -> 모든 게시물 읽어오기
  async getAllBoards(): Promise<Board[]> {
    //reopsitory.find()에 매개변수로 옵션을 넣어주지 않으면
    //모든 테이블 인스턴스를 조회해서 가져옴.
    return await this.boardRepository.find();
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    return await this.boardRepository.createBoard(createBoardDto);
  }

  //findOne()은 repository의 메소드로 비동기로 처리하여 promise객체에 Board객체를 리턴함.
  async getBoardById(id: number): Promise<Board> {
    // where : {id => db column: id => parameter}
    const found = await this.boardRepository.findOne({ where: { id: id } });
    if (!found) {
      console.log(found); //found는 undefined찍힘
      throw new NotFoundException(`Can't find Board with id ${id}`); //body에 message로 "Not Found"라고 보냄
    }
    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    await this.boardRepository.deleteBoard(id);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
}

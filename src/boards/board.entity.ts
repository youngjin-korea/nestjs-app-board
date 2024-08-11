import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './board.model';

//테이블 생성
@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn() // 기본키 및 자동 증가 id
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;
}

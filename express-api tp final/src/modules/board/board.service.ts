import {Board, CreateBoardRequest} from "../../types";
import {BoardRepository} from "./board.repository";

export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async getAllBoards(): Promise<Board[]> {
    // Here we can implement some business logic
    //console.log('Donde estan mis boardddssss');
    return this.boardRepository.getAllBoards();
    console.log(this.getAllBoards)
  }

  async getBoardById(id: string): Promise<Board | undefined> {
    return this.boardRepository.getBoardById(id);
  }

  async createBoard(boardData: CreateBoardRequest): Promise<Board> {
    // Here we can implement some business logic like validation, etc.
    return this.boardRepository.createBoard(boardData);
  }

  async deleteBoard(id: string): Promise<boolean> {
    return this.boardRepository.deleteBoard(id);
  }

  async boardExists(id: string): Promise<boolean> {
    return this.boardRepository.boardExists(id);
  }
}
import { database } from "../../db/connection";     
import { Board, CreateBoardRequest } from "../../types";
import { v4 as uuidv4 } from "uuid";

export class BoardRepository {
  async getAllBoards(): Promise<Board[]> {
    return database.all<Board>("SELECT * FROM boards");
  }

  async getBoardById(id: string): Promise<Board | undefined> {
    return database.get<Board>("SELECT * FROM boards WHERE id = ?", [id]);
  }

  async createBoard(boardData: CreateBoardRequest): Promise<Board> {
    const id = uuidv4();
    const now = new Date().toISOString();

    await database.run(
      "INSERT INTO boards (id, name, owner_id) VALUES (?, ?, ?)",
      [id, boardData.name, boardData.owner_id]
    );

    const board = await this.getBoardById(id);
    if (!board) {
      throw new Error("Failed to create board");
    }

    return board;
  }

  async deleteBoard(id: string): Promise<boolean> {
    await database.run("DELETE FROM boards WHERE id = ?", [id]);
    return true;
  }

  async boardExists(id: string): Promise<boolean> {
    const board = await this.getBoardById(id);
    return !!board;
  }
}
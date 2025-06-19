import {Request, Response} from 'express';
import {BoardService} from './board.service';
import {CreateBoardRequest} from '../../types';

export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  getAllBoards = async (req: Request, res: Response): Promise<void> => {
    try {
      const boards = await this.boardService.getAllBoards();
      console.log('Donde estan mis boardddssss');
      res.json({boards});
    } catch (error) {
      console.error('Error getting boards:', error);
      res.status(500).json({error: 'Failed to retrieve boards'});
    }
  };

  getBoardById = async (req: Request, res: Response): Promise<void> => {
    try {
      const {id} = req.params;
      const board = await this.boardService.getBoardById(id);

      if (!board) {
        res.status(404).json({error: 'Board not found'});
        return;
      }

      res.json({board});
    } catch (error) {
      console.error('Error getting board:', error);
      res.status(500).json({error: 'Failed to retrieve board'});
    }
  };

  createBoard = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user.id;
      if (!userId) {
        res.status(401).json({error: 'Falta  el user Id'});
        return;
      }

      const boardData: CreateBoardRequest = req.body;
console.log(boardData);
      if (!boardData.name) {
        //console.log("Este es mi boardDataa", boardData)
        res.status(400).json({error: 'Falta el nombre del board'});
        return;
      }

      const board = await this.boardService.createBoard(boardData);
      res.status(201).json({board});
    } catch (error) {
      console.error('Error creating board:', error);
      res.status(500).json({error: 'Failed to create board'});
    }
  };

  deleteBoard = async (req: Request, res: Response): Promise<void> => {
    try {
      const {id} = req.params;

      if (!(await this.boardService.boardExists(id))) {
        res.status(404).json({error: 'Board not found'});
        return;
      }

      await this.boardService.deleteBoard(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting board:', error);
      res.status(500).json({error: 'Failed to delete board'});
    }
  };
}
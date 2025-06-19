import { Router } from "express";
import { BoardRepository } from "../modules/board/board.repository";
import { BoardService } from "../modules/board/board.service";
import { BoardController } from "../modules/board/board.controller";
import { authWithHeadersMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Inyección de dependencias
const boardRepository = new BoardRepository();
const boardService = new BoardService(boardRepository);
const boardController = new BoardController(boardService);

// Middleware de autenticación para todas las rutas de boards
router.use(authWithHeadersMiddleware);

// Rutas para Boards
router.get("/", boardController.getAllBoards);
router.get("/:id", boardController.getBoardById);
router.post("/", boardController.createBoard);
router.delete("/:id", boardController.deleteBoard);

export { router as boardRoutes };

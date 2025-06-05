  // src/hooks/useTasks.ts
  import { useQuery } from "@tanstack/react-query";
  import type { Reminder } from "../types";
  import { useConfigStore } from "../store/configStore";
  import { useTaskStore } from "../store/taskStore"; // 👈 importar el store

  const BASE_URL = "http://localhost:4321/api";

  interface PaginatedTasks {
    some: any;
    reminders: Reminder[];
    total: number;
    page: number;
    limit: number;
    filter: string;
    boardId: string;
  }

  export function useTasks(boardId: string, page: number, limit: number) {
    const filter = useTaskStore((s) => s.filter); // 👈 ahora se toma de Zustand
    const refetchInterval = useConfigStore((s) => s.refetchInterval);

    return useQuery<PaginatedTasks>({
      queryKey: ["tasks", boardId, page, limit, filter], // 👈 ¡clave depende del filtro!
      queryFn: async () => {
        const params = new URLSearchParams({
          boardId,
          page: page.toString(),
          limit: limit.toString(),
          filter,
        });

        const res = await fetch(`${BASE_URL}/filter?${params.toString()}`);
        if (!res.ok) throw new Error("Error al obtener las tareas");
        return res.json();
      },
      placeholderData: (prev) => prev,
      refetchInterval,
    });
  }

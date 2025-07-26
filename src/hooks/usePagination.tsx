import { create } from "zustand";

interface PaginationState {
  currentRoute: string;
  page: number;
  pages: number;
  setCurrentRoute: (route: string) => void;
  setPage: (page: number) => void;
  setPages: (pages: number) => void;
}

const usePagination = create<PaginationState>((set) => ({
  currentRoute: "",
  page: 1,
  pages: 10,
  setCurrentRoute: (route: string) => set({ currentRoute: route }),
  setPage: (page) => set({ page }),
  setPages: (pages) => set({ pages }),
}));

export default usePagination;

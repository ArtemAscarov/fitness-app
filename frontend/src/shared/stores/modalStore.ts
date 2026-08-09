import { create } from "zustand";

type Modals = "SelectCategory" | "ExerciseCategory";
type ModalState = {
  isOpen: boolean;
  extraMessage: string;
};

type ModalFnParams = {
  key: Modals;
  extraMessage?: string;
};

type ModalStoreType = {
  modals: Record<Modals, ModalState>;
  closeModal: (p: ModalFnParams) => void;
  openModal: (p: ModalFnParams) => void;
};

const defaultValue: Record<Modals, ModalState> = {
  SelectCategory: {
    isOpen: false,
    extraMessage: "",
  },
  ExerciseCategory: {
    isOpen: false,
    extraMessage: "",
  },
};

export const useModalStore = create<ModalStoreType>((set) => ({
  modals: defaultValue,
  closeModal: ({ key, extraMessage }) =>
    set((value) => ({
      modals: {
        ...value.modals,
        [key]: {
          extraMessage: extraMessage || value.modals[key].extraMessage,
          isOpen: false,
        },
      },
    })),
  openModal: ({ key, extraMessage }) =>
    set((value) => ({
      modals: {
        ...value.modals,
        [key]: {
          isOpen: true,
          extraMessage: extraMessage || value.modals[key].extraMessage,
        },
      },
    })),
}));

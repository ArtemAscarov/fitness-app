"use client";

import ChangeFiltersModal from "@/entities/category/ui/modal/ChangeFiltersModal";
import { useModalStore } from "@/shared/stores/modalStore";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const ModalLayout = ({ children }: Props) => {
  const { modals } = useModalStore((state) => state);

  return (
    <div>
      {modals.SelectCategory.isOpen && <ChangeFiltersModal />}

      {children}
    </div>
  );
};

import { API } from "@/shared/lib/axios";

type Params = {
  exerciseId: number;
  isFavorite: boolean;
};

export const changeIsFavoriteState = ({ exerciseId, isFavorite }: Params) => (
  isFavorite
    ? API.delete(`/favorite/${exerciseId}`)
    : API.post("/favorite/", { exerciseId })
)

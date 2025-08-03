import type { FormAddCardData } from "./formAddCard.schema";

export interface FormAddCardProps {
    onSubmit: (data: FormAddCardData) => void;
    onCancel: () => void;
    loading?: boolean;
}

export interface FormAddCardState {
    isSubmitting: boolean;
}

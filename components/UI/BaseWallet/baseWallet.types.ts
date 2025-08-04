export interface BaseWalletProps {
    children: React.ReactNode;
    onBack?: () => void;
    onAddCard?: () => void;
    showAddButton?: boolean;
}

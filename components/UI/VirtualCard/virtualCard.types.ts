export interface VirtualCardProps {
    numeroCartao: string;
    nomeTitular: string;
    vencimento: string;
    isValid: boolean;
    onSendAnimation?: () => void;
    triggerSend?: boolean;
}

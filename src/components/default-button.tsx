import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface DefaultButtonProps {
    isLoading: boolean;
    handleSubmit: () => void;
    children: React.ReactNode;
}

const DefaultButton = ({ isLoading, handleSubmit, children }: DefaultButtonProps) => {
    return (
        <Button
            disabled={isLoading}
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {children}
        </Button>
    )
}

export default DefaultButton;
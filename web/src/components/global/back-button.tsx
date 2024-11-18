import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export function BackButton() {
    const navigate = useNavigate();

    function handleBack() {
        navigate(-1);
    }

    return (
        <Button variant={'outline'} onClick={handleBack}>
            <ChevronLeft size={20} />
        </Button>
    )
}
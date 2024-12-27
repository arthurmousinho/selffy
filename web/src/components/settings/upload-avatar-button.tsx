import { useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { uploadUserAvatar } from "@/hooks/use-user";
import { Loader } from "lucide-react";

export function UploadAvatarButton() {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { toast } = useToast();
    const { mutate: uploadUserAvatarFn, isPending } = uploadUserAvatar();

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            await handleFileUpload(file);
        }
    };

    const handleFileUpload = async (file: File) => {
        if (!file.type.startsWith("image/")) {
            toast({
                title: "Invalid file type",
                description: "Please upload an image file.",
                variant: "destructive",
            });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: "File too large",
                description: "Please select an image smaller than 5MB.",
                variant: "destructive",
            });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        uploadUserAvatarFn(formData);
    };

    return (
        <div className="flex items-center">
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
            />
            <Button
                variant={'outline'}
                className="flex items-center gap-2 text-muted-foreground"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isPending}
            >
                {
                    isPending ? 
                    <span className="flex items-center gap-2">
                        <Loader size={20} className="animate-spin" />
                        Uploading
                    </span> : 'Change Avatar'
                }
            </Button>
        </div>
    );
}
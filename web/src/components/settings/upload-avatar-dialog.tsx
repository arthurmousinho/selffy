import { useState, useRef, ReactNode } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CloudIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Button } from "../ui/button"

interface UploadAvatarDialogProps {
    children: ReactNode
}

export function UploadAvatarDialog({ children }: UploadAvatarDialogProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { toast } = useToast()

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        if (file) {
            await handleFileUpload(file)
        }
    }

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            await handleFileUpload(file)
        }
    }

    const handleFileUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            toast({
                title: "Invalid file type",
                description: "Please upload an image file.",
                variant: "destructive",
            })
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: "File too large",
                description: "Please select an image smaller than 5MB.",
                variant: "destructive",
            })
            return
        }

        setIsUploading(true)
        try {
            // Mock upload - replace with actual upload logic
            const uploadedUrl = await new Promise<string>((resolve) => {
                setTimeout(() => {
                    resolve(URL.createObjectURL(file))
                }, 1000)
            })

            setPreviewUrl(uploadedUrl) // Define a URL para o preview
            toast({
                title: "Upload successful",
                description: "Your image has been uploaded successfully.",
            })
        } catch (error) {
            toast({
                title: "Upload failed",
                description: "There was an error uploading your image. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload Avatar</DialogTitle>
                </DialogHeader>
                <div
                    className={cn(
                        "relative mt-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-12 text-center",
                        isDragging && "border-primary bg-primary/10",
                        isUploading && "pointer-events-none opacity-60"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileSelect}
                    />
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="mb-4 h-32 w-32 rounded-3xl object-cover"
                        />
                    ) : (
                        <>
                            <CloudIcon className="mb-4 h-10 w-10 text-gray-400" />
                            <p className="mb-2 text-sm font-semibold">Drag an image</p>
                            <p className="text-xs text-slate-500">
                                Select a image or drag here to upload directly
                            </p>
                        </>
                    )}
                    {isUploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                            <div className="text-sm">Uploading...</div>
                        </div>
                    )}
                </div>
                <Button>
                    Save 
                </Button>
            </DialogContent>
        </Dialog>
    )
}

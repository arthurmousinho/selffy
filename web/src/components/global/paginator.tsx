import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface PaginatorProps {
    showing: number;
    total: number;
    totalPages: number;
    currentPage: number;
    currentLimit: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

export function Paginator(props: PaginatorProps) {
    return (
        <footer className="flex items-center justify-between w-full">
            <span className="text-sm text-muted-foreground">
                Showing {props.showing} of {props.total} items
            </span>
            <footer className="space-x-4 flex items-center">
                <Label>
                    Page {props.currentPage} of {props.totalPages} pages
                </Label>
                <div className="flex flex-row items-center gap-2">
                    <Select 
                        defaultValue={props.currentLimit.toString()} 
                        onValueChange={value => props.onLimitChange(Number(value))}
                    >
                        <SelectTrigger className="w-[100px] h-12" id="rows-per-page-input">
                            <SelectValue placeholder="Rows per page" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className="cursor-pointer" value="5">5 rows</SelectItem>
                            <SelectItem className="cursor-pointer" value="10">10 rows</SelectItem>
                            <SelectItem className="cursor-pointer" value="15">15 rows</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-x-2">
                    <Button 
                        variant={'outline'} 
                        onClick={() => props.onPageChange(1)} 
                        disabled={props.currentPage === 1}
                    >
                        <ChevronsLeft size={20} />
                    </Button>
                    <Button 
                        variant={'outline'}
                        onClick={() => props.onPageChange(props.currentPage - 1)} 
                        disabled={props.currentPage === 1}
                    >
                        <ChevronLeft size={20} />
                    </Button>
                    <Button 
                        variant={'outline'}
                        onClick={() => props.onPageChange(props.currentPage + 1)}
                        disabled={props.currentPage === props.totalPages}
                    >
                        <ChevronRight size={20} />
                    </Button>
                    <Button 
                        variant={'outline'}
                        onClick={() => props.onPageChange(props.totalPages)}
                        disabled={props.currentPage === props.totalPages}
                    >
                        <ChevronsRight size={20} />
                    </Button>
                </div>
            </footer>
        </footer>
    )
}
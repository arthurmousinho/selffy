import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Moon, Palette, SunMoon } from "lucide-react";

export function PreferencesSettings() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2 border-b">
                <div className="w-10 h-10 flex border items-center justify-center rounded-xl">
                    <span className="text-sm">
                        <Palette size={20} />
                    </span>
                </div>
                <h2 className="text-lg font-semibold">
                    Preferences
                </h2>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
                <form className="flex items-center gap-4 w-full">
                    <div className="space-y-2 flex-1">
                        <Label className="text-muted-foreground font-medium" htmlFor="language-input">
                            Language
                        </Label>
                        <Select>
                            <SelectTrigger id="language-input">
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en" className="cursor-pointer">🇺🇸 English</SelectItem>
                                <SelectItem value="es" className="cursor-pointer">🇪🇸 Spanish</SelectItem>
                                <SelectItem value="fr" className="cursor-pointer">🇫🇷 French</SelectItem>
                                <SelectItem value="de" className="cursor-pointer">🇩🇪 German</SelectItem>
                                <SelectItem value="pt" className="cursor-pointer">🇧🇷 Portuguese</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 flex-1">
                        <Label className="text-muted-foreground font-medium" htmlFor="theme-input">
                            Theme
                        </Label>
                        <Select>
                            <SelectTrigger id="theme-input">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light" className="cursor-pointer">
                                    <div className="flex flex-row items-center gap-2">
                                        <SunMoon size={20} />
                                        <span>Light</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="dark" className="cursor-pointer">
                                    <div className="flex flex-row items-center gap-2">
                                        <Moon size={20} />
                                        <span>Dark</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button>
                    Save changes
                </Button>
            </CardFooter>
        </Card>
    )
}
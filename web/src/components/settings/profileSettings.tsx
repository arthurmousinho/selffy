import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Lock, Upload, UserRound } from "lucide-react";

export function ProfileSettings() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2 border-b">
                <div className="w-10 h-10 flex border items-center justify-center rounded-xl">
                    <span className="text-sm">
                        <UserRound size={20} />
                    </span>
                </div>
                <h2 className="text-lg font-semibold">
                    Profile
                </h2>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-muted-foreground font-medium">
                            Avatar
                        </Label>
                        <div className="flex flex-row items-center gap-4">
                            <Avatar>
                                <AvatarFallback>AM</AvatarFallback>
                            </Avatar>
                            <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground" type="button">
                                <Upload size={20} />
                                Upload image
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-muted-foreground font-medium" htmlFor="name-input">
                            Name
                        </Label>
                        <Input
                            placeholder="John Doe"
                            type="text"
                            required
                            id="name-input"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-muted-foreground font-medium" htmlFor="email-input">
                            Email
                        </Label>
                        <Input
                            placeholder="example@email.com"
                            type="email"
                            required
                            id="email-input"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-muted-foreground font-medium" htmlFor="email-input">
                            Password
                        </Label>
                        <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
                            <Lock size={20} />
                            Change password
                        </Button>
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
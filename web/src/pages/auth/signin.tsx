import GoogleIcon from "@/components/icons/googleIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EllipsisVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom";

export function SignIn() {
    return (
        <form className="w-[500px] space-y-4">
            <header className="flex flex-row justify-between">
                <div className="flex flex-col ">
                    <h2 className="text-2xl font-semibold">
                        Wellcome Back
                    </h2>
                    <span className="text-sm text-muted-foreground">
                        Enter your email below to access your account
                    </span>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical size={20} className="text-muted-foreground" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Auth Asistent</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                            Forgot your password?
                        </DropdownMenuItem>
                        <Link to={'/auth/signup'}>
                            <DropdownMenuItem className="cursor-pointer">
                                Don't you have an account?
                            </DropdownMenuItem>
                        </Link>
                        <Link to={'/auth/signin'}>
                            <DropdownMenuItem className="cursor-pointer">
                                Already have an account?
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
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
                <Label className="text-muted-foreground font-medium" htmlFor="password-input">
                    Password
                </Label>
                <Input
                    placeholder="******"
                    type="password"
                    required
                    id="password-input"
                />
            </div>
            <Button className="w-full">
                Sign In
            </Button>
            <Button variant={'outline'} className="w-full flex flex-row items-center gap-2">
                <GoogleIcon />
                Sign In with Google
            </Button>
        </form>
    )
}
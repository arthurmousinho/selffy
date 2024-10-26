import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

enum PopularPlanType {
    NO = 0,
    YES = 1,
}

interface PricingProps {
    title: string;
    popular: PopularPlanType;
    price: number;
    description: string;
    buttonText: string;
    benefitList: string[];
}

export function PlanCard(props: PricingProps) {
    return (
        <Card
            key={props.title}
            className={
                props.popular === PopularPlanType.YES
                    ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                    : ""
            }
        >
            <CardHeader>
                <CardTitle className="flex item-center justify-between">
                    {props.title}
                    {props.popular === PopularPlanType.YES ? (
                        <Badge
                            variant="secondary"
                            className="text-sm text-primary"
                        >
                            Most popular
                        </Badge>
                    ) : null}
                </CardTitle>
                <div>
                    <span className="text-3xl font-bold">${props.price}</span>
                    <span className="text-muted-foreground"> /month</span>
                </div>

                <CardDescription>{props.description}</CardDescription>
            </CardHeader>

            <CardContent>
                <Button className="w-full">{props.buttonText}</Button>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
                <div className="space-y-4">
                    {props.benefitList.map((benefit: string) => (
                        <span
                            key={benefit}
                            className="flex"
                        >
                            <Check className="text-primary" />{" "}
                            <h3 className="ml-2">{benefit}</h3>
                        </span>
                    ))}
                </div>
            </CardFooter>
        </Card>
    )
}

const pricingList: PricingProps[] = [
    {
        title: "Free",
        popular: 0,
        price: 0,
        description:
            "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
        buttonText: "Get Started",
        benefitList: [
            "1 Team member",
            "2 GB Storage",
            "Upto 4 pages",
            "Community support",
            "lorem ipsum dolor",
        ],
    },
    {
        title: "Premium",
        popular: 1,
        price: 5,
        description:
            "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
        buttonText: "Start Free Trial",
        benefitList: [
            "4 Team member",
            "4 GB Storage",
            "Upto 6 pages",
            "Priority support",
            "lorem ipsum dolor",
        ],
    }
];

export const Pricing = () => {
    return (
        <section className="flex items-center justify-between w-[1200px] flex-row gap-10">
            <aside className="space-y-4">
                <h2 className="text-4xl font-extrabold">
                    Get Unlimited Access
                </h2>
                <p className="text-base text-muted-foreground">
                    Discover how our tool can help you achieve your goals more efficiently and stay organized.
                </p>
                <Button className="flex items-center gap-2">
                    Get Started for Free
                </Button>
            </aside>
            <div className="w-full grid grid-cols-2 gap-2">
                {pricingList.map((pricing: PricingProps) => (
                    <PlanCard 
                        {...pricing}
                    />
                ))}
            </div>
        </section>
    );
};
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

interface FeatureCardProps {
    icon: string;
    color: string;
    title: string;
    description: string;
}

function FeatureCard(props: FeatureCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2">
                <div
                    className="w-10 h-10 flex items-center justify-center rounded-xl"
                    style={{ backgroundColor: props.color }}
                >
                    <span className="text-xl">
                        {props.icon}
                    </span>
                </div>
                <h3 style={{ margin: 0 }} className="font-medium">
                    {props.title}
                </h3>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
                {props.description}
            </CardContent>
        </Card>
    );
}

const features = [
    {
        title: 'Overview of your projects',
        description: 'Gain insights into all your projects in one place, helping you stay on top of every detail.',
        icon: '📊',
        color: '#7dd3fc'
    },
    {
        title: 'Track your progress',
        description: 'Monitor your progress in real-time, celebrating each milestone along the way.',
        icon: '🔥',
        color: '#f9a8d4'
    },
    {
        title: 'Organize your priorities',
        description: 'Set clear priorities to manage tasks efficiently and keep your focus on what matters.',
        icon: '🎯',
        color: '#fca5a5'
    },
    {
        title: 'AI tasks assistent',
        description: 'Get personalized recommendations to help you stay productive',
        icon: '🤖',
        color: '#34d399'
    },
];

export function Features() {
    return (
        <section className="flex items-center justify-between w-[1200px] flex-row gap-10">
            <aside className="space-y-4">
                <h2 className="text-4xl font-extrabold">
                    Features
                </h2>
                <p className="text-base text-muted-foreground">
                    Discover how our tool can help you achieve your goals more efficiently and stay organized.
                </p>
                <Button className="flex items-center gap-2">
                    Get Started for Free
                </Button>
            </aside>
            <div className="w-full grid grid-cols-2 gap-2">
                {
                    features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            color={feature.color}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))
                }
            </div>
        </section>
    );
}

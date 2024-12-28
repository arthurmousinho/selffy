import { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Bot, FileQuestion, FileText, Flag, Sparkles, RefreshCw, Copy, ArrowLeft } from 'lucide-react'

const aiFeatures = [
    {
        title: "Generate task description",
        icon: <Sparkles size={20} />,
        description: "AI-generated detailed task description.",
        sampleResult: "Create a responsive landing page for our new product launch. Include a hero section with a compelling headline, product features, pricing table, and a call-to-action form. Ensure compatibility with major browsers and optimize for mobile devices.",
    },
    {
        title: "Summarize the task description",
        icon: <FileText size={20} />,
        description: "Concise summary of your task description.",
        sampleResult: "Design and develop a responsive product landing page with key sections: hero, features, pricing, and CTA form. Ensure cross-browser compatibility and mobile optimization.",
    },
    {
        title: "Help me with the task",
        icon: <FileQuestion size={20} />,
        description: "AI assistance for your current task.",
        sampleResult: "1. Start with a wireframe to plan the layout.\n2. Use a CSS framework like Tailwind for responsiveness.\n3. Optimize images for web to improve load times.\n4. Implement smooth scrolling for better UX.\n5. Use semantic HTML for better SEO.\n6. Test on various devices and browsers.",
    },
    {
        title: "Suggest task priority",
        icon: <Flag size={20} />,
        description: "AI-suggested priority level for your task.",
        sampleResult: "Priority: High\nRationale: This landing page is crucial for the new product launch. It directly impacts marketing efforts and potential sales. Completing this task should be prioritized to align with the launch timeline and maximize the product's initial market impact.",
    }
]

function FeatureContent({ feature, onBack }: { feature: typeof aiFeatures[0], onBack: () => void }) {
    const [result, setResult] = useState(feature.sampleResult)

    const handleRefresh = () => {
        setResult(`Refreshed: ${feature.sampleResult}`)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result).then(() => {
            console.log('Copied to clipboard');
        });
    };

    return (
        <div className="space-y-4">
            <header className='flex items-center gap-2 border-b p-2'>
                <h2 className="text-base font-semibold text-muted-foreground flex items-center gap-2">
                    {feature.icon}
                    {feature.title}
                </h2>
            </header>
            <div className="p-4 bg-secondary rounded-lg">
                <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">{result}</p>
            </div>
            <div className="flex gap-2">
                <Button onClick={onBack} variant={'outline'} className='text-muted-foreground p-3' >
                    <ArrowLeft size={15} />
                </Button>
                <Button onClick={handleRefresh} variant={'outline'} className='text-muted-foreground p-3'>
                    <RefreshCw size={15} />
                </Button>
                <Button onClick={copyToClipboard} variant={'outline'} className='text-muted-foreground p-3'>
                    <Copy size={15} />
                </Button>
            </div>
        </div>
    )
}

export function AiAssistantSheet() {
    const [selectedFeature, setSelectedFeature] = useState<typeof aiFeatures[0] | null>(null)

    return (
        <Sheet>
            <SheetTrigger>
                <Button className="flex items-center gap-2 text-muted-foreground" variant="outline">
                    <Bot />
                    AI Assistant
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>AI Assistant</SheetTitle>
                    <SheetDescription>
                        This is the AI Assistant to help you with your tasks
                    </SheetDescription>
                </SheetHeader>
                <main className="mt-6 w-full space-y-4">
                    {selectedFeature ? (
                        <FeatureContent
                            feature={selectedFeature}
                            onBack={() => setSelectedFeature(null)}
                        />
                    ) : (
                        aiFeatures.map((feature) => (
                            <Button
                                className="w-full text-muted-foreground flex items-center gap-2 justify-start"
                                variant="outline"
                                key={feature.title}
                                onClick={() => setSelectedFeature(feature)}
                            >
                                {feature.icon}
                                {feature.title}
                            </Button>
                        ))
                    )}
                </main>
            </SheetContent>
        </Sheet>
    )
}


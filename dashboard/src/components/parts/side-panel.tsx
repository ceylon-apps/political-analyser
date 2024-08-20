"use client"

import Image from "next/image"
import {Upload} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function ChatSidePanelComponent() {
    return (
        <Card className="overflow-hidden w-full h-full">
            <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
        </Card>
    )
}

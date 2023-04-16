'use client'

import { useRouter } from "next/router";


interface EmptyStateProps {
    title?: string; 
    subtitle?:string; 
    showReset?:boolean; 

}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No exact matches",
    subtitle="Try changing or removing some of your filters",
    showReset

}) =>{

    const router = useRouter()
    return(
        <div></div>
    )
}

export default EmptyState; 

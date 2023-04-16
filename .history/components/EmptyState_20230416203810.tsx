

interface EmptyStateProps {
    title?: string; 
    subtitle?:string; 
    showReset?:boolean; 

}

const EmptyState: React.FC<EmptyStateProps> = () =>{
    return(
        <div></div>
    )
}

export default EmptyState; 

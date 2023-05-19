export const Headings =({level, title, className}) => {
    
    switch(level){
        case 1: 
            return <h1 className={className}>{title}</h1>
        case 2: 
            return <h2 className={className}>{title}</h2>
        case 3: 
            return <h3 className={className}>{title}</h3>    
        case 4: 
            return <h4 className={className}>{title}</h4>
        case 5: 
            return <h5 className={className}>{title}</h5>            
        case 6: 
            return <h6 className={className}>{title}</h6>
        default: 
            return {title}
    }
}
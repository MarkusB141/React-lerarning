import { buttonBaseClass } from "../styles/buttonStyles";
type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
}

export function Button({ children, onClick, variant }: ButtonProps) {
    const buttonColor = getButtonColor();
    
    function getButtonColor() {
        if(variant === 'danger' ){
            return 'bg-red-600 hover:bg-red-700';
        } else if(variant === 'secondary') {
           return 'bg-gray-600 hover:bg-gray-700';
        } else {
            return 'bg-blue-600 hover:bg-blue-700';
        }
    }
    
    
    return (
        <button
            className={`${buttonColor} ${buttonBaseClass}`}
            type="button" 
            onClick={onClick}
        >
            {children}
        </button>
    )
}
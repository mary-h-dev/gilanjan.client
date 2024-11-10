import {CustomButtonProps} from "../../../types/index"

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    className,
    onClick
}) => {
    
    return (
        <div 
            onClick={onClick}
            className={`w-full felex items-center py-4 bg-airbnbb hover:bg-airbnb-darkk font-light text-white text-center rounded-xl transition cursor-pointer ${className}`}
        >
            {label}
        </div>
    )
}

export default CustomButton;
import * as React from "react"



import { Input } from "./input"
import { Smartphone, MailIcon } from "lucide-react"




export interface TelInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
}


const TelInput = React.forwardRef<HTMLInputElement, TelInputProps>(
    ({ className, ...props }, ref) => {

        const [showTel, setShowTel] = React.useState(false);
        
        return (

            <Input type={showTel ? "number" : "email"} placeholder={showTel ? "0123456789" : ""} suffix={showTel ? (<MailIcon className="select-none" onClick={() => setShowTel(false)} />) : (<Smartphone className="select-none" onClick={() => setShowTel(true)} />)} className={className} {...props} ref={ref}
            />
            
        )
    }
)
TelInput.displayName = "TelInput"

export { TelInput }


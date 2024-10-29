import { Quote } from "../components/Quote"
import { SignupIN } from "../components/SignupIN"


export const Signup = ()=>{
    return(
        <div>
            <div className="grid grid-cols-2">
                <SignupIN/>
                <Quote/>
            </div>
        </div>
    )
}
import { cookies } from "next/headers";

const Test = () => {
    console.log("HI")
    console.log(cookies().get('JSESSIONID'))
    const cookie = cookies().get('JSESSIONID')?.value
    
    return ( <>helloo</> );
}
 
export default Test;
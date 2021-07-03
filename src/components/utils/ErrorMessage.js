

function FormErrorMsg(errors){
    const messages = []
    for(const key in errors){
        let value= errors[key]
        if(typeof value === "string"){
            messages.push(value);
        }else if(typeof value=== "object"){
            messages.push(...FormErrorMsg(value))
        }else if(Array.isArray(value)){
            for(const item of value){
                messages.push(...FormErrorMsg(item))
            }
        }

    }
    return [...new Set(messages)]


}





export default FormErrorMsg;
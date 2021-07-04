

function formErrorMsg(errors){
    const messages = []
    for(const key in errors){
        let value= errors[key]
        if(typeof value === "string"){
            messages.push(value);
        }else if(typeof value=== "object"){
            messages.push(...formErrorMsg(value))
        }else if(Array.isArray(value)){
            for(const item of value){
                messages.push(...formErrorMsg(item))
            }
        }

    }
    return [...new Set(messages)]


}





export default formErrorMsg;
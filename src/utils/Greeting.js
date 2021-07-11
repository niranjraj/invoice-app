export function greetingMsg(){
    var today = new Date()
    var curHr = today.getHours()
    
    if (curHr >= 5 && curHr < 12) {
      return "Good Morning"
    } else if (curHr >=12 && curHr < 18) {
        return "Good Afternon"
    } else if(curHr >=18 && curHr < 20) {
        return "Good Evening"
    }else{
        return "Good Night"
    }

}
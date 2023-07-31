///gets the current hour and converts it into the HH:00 format
function convertedTime(){
    const now = new Date();
    const hours = now.getHours().toString();
    if(hours.length == 1){
        return "0" + hours + ":00";
    }else{
        return hours + ":00";
    }
}


fetch("test.json")
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data)
    })


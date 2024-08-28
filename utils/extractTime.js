export function extractTime(dateString){

    let date = new Date(dateString);

    let hours   =  date.getHours().toString().padStart(2 , "0") ;
    let minutes =  date.getMinutes().toString().padStart(2 , "0") ; ;


    return `${hours}:${minutes}`;

}
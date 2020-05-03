export const parrallax = {
    'backgroundImage':"linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8)),url('https://picsum.photos/800')",
    'backgroundAttachment': 'fixed',
  'backgroundPosition': 'center',
  'backgroundRepeat': 'no-repeat',
  'backgroundSize':'cover',
  

}

export const getFormatedDate = (date) => {
    if(date === null){
        return "";
    }

    if(date.length === 0){
        return "";
    }
    
    let month= ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    date = new Date(date);

    return month[date.getMonth()]+" "+date.getFullYear();




}
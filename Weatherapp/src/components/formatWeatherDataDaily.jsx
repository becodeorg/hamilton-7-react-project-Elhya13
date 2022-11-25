export const formatWeatherDataDaily =(data) => {
    const dataDaily = [];
    const dataEntries= Object.keys(data);
    //console.log(dataEntries);

    dataEntries.forEach((key, keyIndex) => {
        for (let i= 0; i< data[key].length; i++) {
            if (keyIndex === 0 ) {
                dataDaily.push ({});
            }
            const dayValue = data[key][i];
            //console.log (dayValue);
            dataDaily [i][key] = dayValue;
        }
    });
    console.log(dataDaily);
    return dataDaily;

//     // french day
//     const frenchDays = [
//         "Jeudi",
//         "Vendredi",
//         "Samedi",
//         "Dimanche",
//         "Lundi",
//         "Mardi",
//         "Mercredi",
//      ];
    
//     dataDaily.forEach((data) => {
//         const date = new Date(data.time);
//         const dayIndex = date.getDay();// 0 à 6 
//         data.jour = frenchDays[dayIndex];
//     });
//     console.log (dataDaily);
 };


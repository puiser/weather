function mean (array) {
    const i = 0;
    const sum = array.reduce (
        (a,b) => Number(a) + Number(b), Number(i)
    )
    console.log(sum);
    const divider = array.length;
    return sum / divider;
};


function median (array) {
    console.log(array);
    array.sort((a,b) => Number(a) - Number(b));
    const middle = Math.floor(array.length / 2);
    return array.length % 2 === 0 ? (Number(array[middle - 1]) + Number(array[middle])) / 2 : Number(array[middle]);
};

function mode (array) {
    const frequencyTable = {};
    array.forEach(elem => frequencyTable[elem] = frequencyTable[elem] + 1 || 1);

    let modes = [];
    let maxFrequency = 0;
    for(const key in frequencyTable) {
        if(frequencyTable[key] > maxFrequency) {
            modes = [Number(key)];
            maxFrequency = frequencyTable[key]
    }
    else if(frequencyTable[key] === maxFrequency) {
        modes.push(Number(key));
    }
}


return modes;

}

function range (array) {
    let minValue = Math.min(...array);
    let maxValue = Math.max(...array);
    return [minValue , maxValue];
};

function deviation(array){
    let mean = array.reduce((a, b)=>{
      return Number(a) + Number(b)
    }, 0) / array.length;
     
    array = array.map((k)=>{
      return (Number(k) - mean) ** 2
    })
     
   let sum = array.reduce((a, b)=> Number(a) + Number(b), 0);

   let variance = Number(sum) / array.length
    
   return Math.sqrt(sum / array.length)
  }
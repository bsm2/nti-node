// const myPromise = (id)=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             if(id>5) {
//                 resolve('true')
//             }else{
//                 reject('false id')
//             }
                
//         },3000)
//     })
// }

// const myCheck = async()=>{
//     try {
//         c= await (myPromise(7))
//         console.log(c)
//     } catch (error) {
//         console.log(error)
//     }
    
// }

// myCheck()
const createMyElement = (parent, element, text = false) =>{
    myElement = document.createElement(element)
    parent.appendChild(myElement)
    if(text) myElement.textContent= text
    return myElement
}
const getData = async(callback)=>{
    try {
        x= await fetch('https://api.covid19api.com/summary')
        y= await(x.json())
        console.log(y)
        callback(y,false)
    } catch (error) {
        callback(false,error)
    }
    
}

getData((data,err)=>{
    if(data) {
        data.Countries.forEach((d,i) => {
            console.log(d)
            // let container = document.querySelector('#data')  
            // myElement = document.createElement('h1')
            // container.appendChild(myElement)
            // myElement.textContent= d.Country
            // myElement = document.createElement('div')
            // container.appendChild(myElement)
            // myElement.textContent= d.TotalConfirmed
            let tbody = document.querySelector('#data')     
            let tr = createMyElement(tbody, 'tr')
            createMyElement(tr, 'td', i+1)
            createMyElement(tr, 'td', d.Country)
            createMyElement(tr, 'td', d.TotalConfirmed)
            createMyElement(tr, 'td', d.NewRecovered)
            createMyElement(tr, 'td', d.NewDeaths)
            createMyElement(tr, 'td', d.TotalDeaths)
            createMyElement(tr, 'td', d.TotalRecovered)
            createMyElement(tr, 'td', d.Date)
            
        });
    }else {
        console.log(err)
    }
})


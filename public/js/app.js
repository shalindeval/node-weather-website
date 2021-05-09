 const weatherForm = document.querySelector('form')
 const search = document.querySelector('input')
 const messageOne = document.querySelector('#messageOne')
 const messageTwo = document.querySelector('#messageTwo')
 
 weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    const url = `/weather?address=${location}`

    fetch(url).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
               messageOne.textContent = "Error: " + data.error
            }else{
                messageOne.textContent = "Temperature: " + data.temperature + " Precipitation: " + data.precip
                messageTwo.textContent = "Location: " + search.value
            }
        })
    })

 })
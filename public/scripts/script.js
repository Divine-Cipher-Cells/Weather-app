

// it is a browser based web api so cannot run on node side
// json() of the json response type takes in response reads it and returns a promise which on resolving returns a parsed object as response 

const form=document.querySelector("form");

const search=document.querySelector("input");

const message1=document.getElementById("1")

const message2=document.getElementById("2")
//data extraction
//message1.textContent=""



form.addEventListener("submit",(e)=>{

e.preventDefault();

const location=search.value;

message1.innerHTML=`<i class='fa fa-spinner fa-lg' aria-hidden='true'></i>`+"Loading..."

message2.textContent=""


// fetching data using fetch that returns a promise

fetch(`/weather?address=${location}`).then((response)=>{
response.json().then((data)=>{
    if(data.error)
    {
        message1.innerHTML=`<div class='toad'>`+data.error+"</div>"
        return;
    }
   // console.log(`location: ${data.location}, forecast: ${data.forecast} `)
   message1.innerHTML=`<div class='toad'>`+data.location+"</div>";
   message2.innerHTML=`<div class='toad'>`+data.forecast+"</div>";

})
});

});

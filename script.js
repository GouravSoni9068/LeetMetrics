document.addEventListener('DOMContentLoaded',()=>{
    let searchBtn=document.querySelector('#search')

    function isValid(username)
    {
        if(username=="")
        {
            alert("username shouldn't be empty")
        }
        let regex = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/;
        return regex.test(username);
    }

    async function getData(username)
    {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            searchBtn.innerHTML="searching..."
            searchBtn.disabled=true;

            let response=await fetch(url)

            if(!response.ok)
            {
                throw new Error("Response is not okky")
                
            }
            let data=response.json();
            // console.log(data);
            
            return data;
            
        } 
        catch (error) {
            document.querySelector(".progress").innerHTML="No data found";
            
        }
        finally{
            searchBtn.innerHTML="search"
            searchBtn.disabled=false;
        }
          
    }

    searchBtn.addEventListener('click',async ()=>{

        const username=document.querySelector('.username').value;
        // document.querySelector(".progress").style.setProperty("display","none")

        if(isValid(username))
        {
            let data=await getData(username)
            console.log(data);
            

            document.querySelector('#easy .data').innerHTML=`${data.easySolved}/${data.totalEasy}`
            document.querySelector('#easy').style.setProperty('--progressPercent', `${data.easySolved/data.totalEasy*100}%`);

            document.querySelector('#medium .data').innerHTML=`${data.mediumSolved}/${data.totalMedium}`
            document.querySelector('#medium').style.setProperty('--progressPercent', `${data.mediumSolved/data.totalMedium*100}%`);

            document.querySelector('#hard .data').innerHTML=`${data.hardSolved}/${data.totalHard}`
            document.querySelector('#hard').style.setProperty('--progressPercent', `${data.hardSolved/data.totalHard*100}%`);

            let cardsdata=[
                {label:"Total Submission",value:`${data.totalSolved}`},
                {label:"Total Easy Submission",value:`${data.easySolved}`},
                {label:"Total Medium Submission",value:`${data.mediumSolved}`},
                {label:"Total Hard Submission",value:`${data.hardSolved}`}
            ]
            // console.log(cards);
            

            document.querySelector(".cards").innerHTML=cardsdata.map((card)=>{
                return  `<div class="card">
                            <div class="type">${card.label}</div>
                            <div>${card.value}</div>
                        </div> `;
            }).join("");

        }
        else{
            alert("Enter valid username")
            
        }

        
        
    })

})
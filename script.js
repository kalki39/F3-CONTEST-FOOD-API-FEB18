// -----getting html element for DOM manipulation----------/////////

let divMain = document.querySelector(".products");
let listHeading = document.querySelector(".listHeading");

let arr;
let  orderedFood=[]
let obj

//// --------get data of food from API using fetch method-----/////

function getMenu() {
    return fetch(" https://free-food-menus-api-production.up.railway.app/burgers").then(res => res.json()).then(data => {
        // loop selecting random 3 burger food
        for(let i=0;i<3;i++){
            orderedFood.push(data[ranDom()])
        }
        listHeading.innerHTML="BURGER VARIETIES"
        data.map((item) => {
            divMain.innerHTML += `
                  <div class="product">
                        <img src=${item.img} alt="">         
                        <p class="restaurant">${item.name}<br>
                        <span class="shopLocation">${item.country}</span></p>
                        <p class="item">${item.dsc}</p>
                        <div class="ratePrice">
                            <div class="rating">
                            <p class="rating">${item.rate}<i class="fa-solid fa-star"></i></p>
                            </div>
                            <div>•</div>
                            <div>20mins</div>
                            <div>•</div>
                            <div>$${item.price} for 2</div>            
                        </div>
                        hgch
                        <p class="coupen"><i class="fa-solid fa-badge-percent"></i>50% off | Use WELCOME50</p>
                        
                  </div>`                
        })
        
    }).catch(err =>{
        console.log("Error in API is",err)
    })
}

function takeOrder(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            listHeading.innerText="";
            listHeading.innerHTML=`<h2 class="head2">YOU SELECTED 3 FOOD IN THE LIST</h2>`
            divMain.innerHTML=""
            orderedFood.map((it) => {
                divMain.innerHTML += `
                <div class="product">
                <img src=${it.img} alt="">         
                <p class="restaurant">${it.name}<br>
                <span class="shopLocation">${it.country}</span></p>
                <p class="item">${it.dsc}</p>
                <div class="ratePrice">
                    <div class="rating">
                    <p class="rating">${it.rate}<i class="fa-solid fa-star"></i></p>
                    </div>
                    <div>•</div>
                    <div>20mins</div>
                    <div>•</div>
                    <div>$${it.price} for 2</div>            
                </div>
                hgch
                <p class="coupen"><i class="fa-solid fa-badge-percent"></i>50% off | Use WELCOME50</p>
                
          </div>`                      
            })
            resolve({
                food1:orderedFood[0],
                food2:orderedFood[1],
                food3:orderedFood[2],
              })
            
        },2500)
    })
}


function orderPrep(food){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            listHeading.innerHTML=""
            listHeading.style.display="none"
            divMain.innerHTML=`<h2 class="head2">YOUR ORDER IS UNDER PROCESSING!
                                PLEASE MAKE PAYMENT</h2>`
             resolve({order_status:true, paid:false})
        }, 1500);
    })

}

function payOrder(payMentStatus){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            divMain.innerHTML=`<h2 class="head2">YOUR PAYMENT IS UNDER PROCESSING!<br>
                                DON'T GO BACK TILL CONFIRMATION </h2>`
            resolve({order_status:true, paid:true})
        }, 1000);       
    })

}

function thankyouFnc(payMentStatus){
    setTimeout(() => {
        if(payMentStatus.order_status==true){
        divMain.innerHTML=`<h2 class="head2">YOUR PAYMENT IS SUCCESSFULL! <br>
                            IT WILL BE DELIVERED BETWEEN <br>
                            <span class="time"> 8.00PM - 8.10PM!</span><br>
                            ENJOY YOUR FOOD!!!</h2>`
            alert("YOUR PAYMENT IS SUCCESSFULL!");
            (console.log("ENJOY YOUR FOOD!!!"))
        }
        else{
            (console.log("payment failed"))
        }
    }, 1000);
}

////// ------ RANDOM function for selecting random 3 burger food------////////

function ranDom(){
    return Math.floor(Math.random()*20)
}


///////// -------- calling multiple functin using promise chaining to encounter callback hell  ----------///


getMenu()
.then(()=>{
    return takeOrder()
})
.then(food=>{
    console.log("YOU HAVE CHOOSED 3 BURGER IN THE LIST>>>>",food)
    return orderPrep(food)
})
.then(prepObject =>{
    console.log("ORDER PREPARATION PROCESS>>>>",prepObject)
    return payOrder(prepObject)
}).then(payMentStatus =>{
    console.log("YOUR PAYMENT IS SUCCESSFULL>>>>>",payMentStatus)
    return thankyouFnc(payMentStatus)
}).catch((err)=> console.log(err))
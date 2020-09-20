document.addEventListener('DOMContentLoaded',()=>{

    var a=document.querySelectorAll(".see-menu")
    var top=document.querySelector("#get-toppings")
    var current_menu=""
    var pay = document.querySelector("#pay")
    pay.addEventListener('click',payAmount)
    var close = document.querySelector('.close')
    close.addEventListener('click', () => {
        var closebox = document.querySelector('#messagebox')
        closebox.innerHTML = "Are you sure you want to proceed?"
        location.reload()

    
})

    for(let i=0;i<a.length;i++){
        var title = a[i].previousSibling.previousSibling.innerHTML
        console.log(title)
        a[i].addEventListener('click',(event)=>{getMenuDetails(event)})
    }
    top.addEventListener('click',getToppings)

})


function payAmount(){
    xhr = new XMLHttpRequest()
    xhr.open('POST', '/email_send')
    var closebox = document.querySelector('#messagebox')
    closebox.innerHTML="Processing...."
    xhr.onload = (res) => {
        closebox.innerHTML="Sucessfully Ordered"
        var table = document.querySelector("#current-list")
        var button = document.querySelector("#pay_t")
        button.style.display="none"

        table.innerHTML = "Payment Successful"
        cart=[]
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));

    console.log(cart)
    xhr.send(JSON.stringify(cart))
}


var tempCart=[]

function getCartData(){
    xhr=new XMLHttpRequest()
    xhr.open('GET','/getCartData')
    xhr.onload=(res)=>{
        console.log("YEP",JSON.parse(JSON.parse(res.target.responseText).data))    
    data = JSON.parse(JSON.parse(res.target.responseText).data)
    cart=data.map((el)=>{return {'main':el.fields.main,'item':el.fields.item,'type':el.fields.type,'price':el.fields.price,'qty':parseInt(el.fields.qty), 'topping':el.fields.toppings}})
    console.log("CARTDATA",cart)    
    tableConstructor()
}
    xhr.send()
}

getCartData()


function getMenuDetails(event){
    xhr = new XMLHttpRequest()
    // var elem = event.path[1].children[0].innerText 
    var elem= event.target.dataset.cat
    console.log("EVENT",event)
    console.log(elem)
    items_menu= document.querySelector("#menu-details")
    items_menu.innerHTML=""
    // small = document.querySelector("#small-item")
    // large = document.querySelector("#large-item")
    // itemName.innerHTML=""
    // small.innerHTML = ""
    // large.innerHTML=""

        xhr.open('GET', `/menu/${elem}`)
        xhr.onload = (res) => {
            console.log(res.target.response)
            let data = JSON.parse(res.target.response)
            name=(data.menu_name)
            current_menu=name
            data = JSON.parse(data.pizza)
            // document.querySelector("#menu-title").innerHTML = data[0].fields.name
             document.querySelector("#menu-title").innerHTML = name
            const main = document.querySelector("#menu-details")
            const divTemp = document.createElement('div')
            divTemp.className = "row"

            const div_a = document.createElement('div')
            div_a.className = "col-sm-4"
            div_a.innerHTML = "Item"

            const div_b = document.createElement('div')
            div_b.className = "col-sm-4"
            div_b.innerHTML = "Small"


            const div_c = document.createElement('div')
            div_c.className = "col-sm-4"
            div_c.innerHTML = "Large"

            divTemp.append(div_a)
            divTemp.append(div_b)
            divTemp.append(div_c)

            main.append(divTemp)
            for(let i=0 ;i<data.length;i++){
                const div0=document.createElement('div')
                div0.className="row"
                const div1=document.createElement('div')
                const div2 = document.createElement('div')
                const div3= document.createElement('div')
                div1.className="col-sm-4"
                div2.className = "col-sm-4"
                div3.className = "col-sm-4"




                item = data[i].fields.name || ""
                small_price = data[i].fields.small || data[i].fields.price|| "" 
                large_price = data[i].fields.large || ""
                div1.innerHTML = (item)
                div0.append(div1)


            if (small_price !== ""){
                data0=document.createElement("span")
                data0.className="small-price"
                data0.innerHTML=small_price

                span0=document.createElement('span')
                span0.className="badge badge-light"
                span0.innerHTML='+'
                span0.addEventListener('click',(event)=>{addToCart(event)})
                span0.dataset.dataName="small"
                span0.style.cursor="pointer"

                span1=document.createElement('span')
                span1.append(data0)
                span1.append(span0)
                div2.append(span1)
                div0.append(div2)


            }

            if (large_price !==""){
                span2 = document.createElement('span')
                span2.className = "badge badge-light"
                span2.innerHTML = '+'
                span2.dataset.dataName = "large"

                span2.addEventListener('click', (event) => { addToCart(event) })
                span2.style.cursor = "pointer"


                data1 = document.createElement("span")
                data1.innerHTML = large_price
                
                data1.className="large_price"
                span3 = document.createElement('span')
                span3.append(data1)
                span3.append(span2)
                div3.append(span3)
                div0.append(div3)


            }
                
                items_menu.append(div0)
            }
        }
        xhr.send() 
}
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
function addCartToDataBase(event) {
    xhr = new XMLHttpRequest()
    xhr.open('POST', '/addtocart')
    xhr.onload = (res) => {
        console.log(JSON.parse(JSON.parse(res.target.responseText).data))
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("X-CSRFToken",getCookie('csrftoken'));    

    console.log(cart)
    xhr.send(JSON.stringify(cart))
}
var cart=[]
var currenttopping=0

function addTopping(topping){

    if(currenttopping<numberoftoppings){
    if(!current_item['topping']){
        current_item['topping'] = ""

        current_item['topping']=topping
        addCartToDataBase()
        tableConstructor()

    }
    else{
        current_item['topping'] +=" " + topping
        addCartToDataBase() 

        tableConstructor()
    }
    currenttopping+=1
}

else{
    alert("Cannot add More")
}
}

function getToppings() {
    xhr = new XMLHttpRequest()
    xhr.open('GET', `/menu/Toppings`)
    xhr.onload = (res) => {
        console.log("DONE")
        document.querySelector("#menu-title").innerHTML = "Toppings"

        items_menu = document.querySelector("#menu-details")
        items_menu.innerHTML = ""
        var toppings=JSON.parse(JSON.parse(res.target.responseText).pizza)
        
        for (let i=0;i<toppings.length;i++){
            // var div = document.createElement('div')
            // var span=document.createElement('span')
            // var button=document.createElement('button')
            // button.innerHTML="+"
            // span.innerHTML = toppings[i].fields.name
            // div.append(span)
            // div.append(button)
            
            var span=document.createElement('span')
            span.innerHTML = toppings[i].fields.name

            var button=document.createElement('button')
            button.innerHTML="+"

            button.addEventListener('click', () => { addTopping(toppings[i].fields.name)})

            const div0 = document.createElement('div')
            div0.className = "row"
            const div1 = document.createElement('div')
            const div2 = document.createElement('div')
            div1.className = "col-sm-4"
            div2.className = "col-sm-4"

            div1.append(span)
            div2.append(button)
            div0.append(div1)
            div0.append(div2)

            items_menu.append(div0)
        }


    }

    xhr.send()

}


var current_item = {}
var numberoftoppings=0
function addToCart(event){

    var price=event.path[1].children[0].innerText
    var type= (event.path[0].dataset['dataName'])
    var item = event.path[3].firstElementChild.innerText

    current_item={}
   current_item['main']=current_menu
   current_item['item']=item
   current_item['type']=type
   current_item['price']=price
   current_item['qty'] = 1
   current_item['topping']=""

   

    var bool=checkItem(current_item,cart)
    console.log(bool)
    if(cart.length===0){
        if (current_item.item.toLowerCase() == "1 Topping".toLowerCase() || current_item.item.toLowerCase() == "1 item".toLowerCase()) {
            numberoftoppings+= 1

            getToppings()
            console.log("1 Topping")
        }
        if (current_item.item.toLowerCase() == "2 items".toLowerCase() || current_item.item.toLowerCase() == "2 Toppings".toLowerCase()) {
            numberoftoppings+= 2

            getToppings()

            console.log("1 Topping")
        }
        if (current_item.item.toLowerCase() == "3 items".toLowerCase() || current_item.item.toLowerCase() == "3 Toppings".toLowerCase()) {
            numberoftoppings+= 3

            getToppings()

            console.log("1 Topping")
        }

        if (current_item.item.toLowerCase() =="Special".toLowerCase()){
            numberoftoppings+=5
            getToppings()
        }
        cart.push(current_item)

    }
    else{
        if(bool){
        }
        else{
            console.log(current_item)
             if (current_item.item.toLowerCase() == "1 Topping".toLowerCase() || current_item.item.toLowerCase() == "1 item".toLowerCase()) 
                    {
                 numberoftoppings+= 1

                    getToppings()

                        console.log("1 Topping")
                    }
            if (current_item.item.toLowerCase() == "2 items".toLowerCase() || current_item.item.toLowerCase() == "2 Toppings".toLowerCase()) {
                numberoftoppings+= 2

                getToppings()

                console.log("1 Topping")
            }
            if (current_item.item.toLowerCase() == "3 items".toLowerCase()  || current_item.item.toLowerCase() == "3 Toppings".toLowerCase()) {
                numberoftoppings+= 3

                getToppings()

                console.log("1 Topping")
            }

            if (current_item.item.toLowerCase() == "Special".toLowerCase()) {
                numberoftoppings += 5
                getToppings()
            }
           
            cart.push(current_item)

        }
    }

    console.log(cart)

tableConstructor()
addCartToDataBase()

}


function removeFromCart(currentItem){

    cart = cart.filter((item) => { return !(item.main === (currentItem).main && item.item === currentItem.item && item.type === currentItem.type && item.price === currentItem.price)})
    addCartToDataBase()

    console.log("Delete",cart),currentItem

}


function filterItem(obj, list) {
    
        if (list.main === (obj).main && list.item === obj.item && list.type === obj.type && list.price === obj.price) {
            return false;
        }
        else{
            return true
        }
 
}


function checkItem(obj, list) { 
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].main === (obj).main && list[i].item===obj.item &&list[i].type===obj.type && list[i].price===obj.price  ) {
            return true;
        }
    }
    return false
}

function quantity(currentItem) {
    currentItem.qty += 1
    console.log(currentItem)
    console.log(cart)
    addCartToDataBase()

    tableConstructor()
}


function subtract(currentItem) {
    currentItem.qty -= 1
    console.log(currentItem)
    if (currentItem.qty <= 0) {
        removeFromCart(currentItem)
    }

    console.log(cart)
    addCartToDataBase()

    tableConstructor()
}


function tableConstructor(){
    var table = document.querySelector("#current-list")
    table.innerHTML = ""
    table.className = "table"
    var totalCost=0
    for (let i = 0; i < cart.length; i++) {
        var tr = document.createElement('tr')
        var keysinObject = Object.keys(cart[i])
        for (let j = 0; j < keysinObject.length; j++) {
            var td = document.createElement('td')
            td.innerHTML = (cart[i][keysinObject[j]])

            tr.append(td)

        }
        var button = document.createElement("button")
        button.innerHTML = "Add"
        button.addEventListener('click', () => { quantity(cart[i]) })
        var td1 = document.createElement('td')
        td1.append(button)
        tr.append(td1)

        var buttonDel = document.createElement("button")
        buttonDel.innerHTML = "-"
        buttonDel.addEventListener('click', () => { subtract(cart[i]) })
        var td2 = document.createElement('td')
        td2.append(buttonDel)
        tr.append(td2)

        table.append(tr)

        totalCost+=parseFloat(cart[i][keysinObject[3]])*cart[i][keysinObject[4]]
    }



    var total=document.querySelector("#total")
    total.innerHTML=" " + totalCost.toFixed(2)




}

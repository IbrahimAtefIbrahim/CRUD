var show_Data = document.getElementById("show");
var table = document.getElementById("table");
var product_Name = document.getElementById("name");
var product_Price = document.getElementById("price");
var product_Category = document.getElementById("category");
var product_Description = document.getElementById("description");
var tbody = document.getElementById("tableContent");
var submit = document.getElementById("submit");
var delete_All = document.getElementById("delete_All");
var search = document.getElementById("search");
var head = document.getElementById("thead");
var valid_name = document.getElementById("valid_name");
var valid_price = document.getElementById("valid_price");
var valid_char = document.getElementById("valid_char");
var valid_Textaria = document.getElementById("valid_Textaria");
var show_message_success = document.getElementById("show_message_success")
var StoredProducts = "products";

var list = [];
var newI;
//**show Empty Card Message**/
function showEmptyCardMessage(){
    head.classList.add("d-none");
    submit.innerHTML="Create first product";
    submit.classList.add("crazy")
    search.classList.add("d-none")
    submit.classList.add("btn-primary")
    submit.setAttribute("onclick", "addProduct()")
    tbody.innerHTML = `
    <tr>
    <td colspan=7><p class="emptyMessage fs-4 fw-bolder text-center mt-3 ps-1 pe-1">Cart is Empty!!!  please create your first product</p></td>
    </tr>
    `
}
showEmptyCardMessage();

if(localStorage.getItem(StoredProducts) != null){
    list = JSON.parse(localStorage.getItem(StoredProducts))
    show(list);
}
//****addProduct function*******/
function addProduct() {
    if(validName() && validPrice() && validChar() && validTextArea()) {
        var product = {
            product_Name: product_Name.value.toLowerCase(),
            product_Price:product_Price.value,
            product_Category:product_Category.value,
            product_Description:product_Description.value
        };
    
        list.push(product)
        show(list);
        localStorage.setItem(StoredProducts, JSON.stringify(list))
        clearData();
  hideValidMessage();
    show_message_success.classList.add("startAnimation")

      // remove class move after 2 second
      setTimeout(() => {
        show_message_success.classList.remove('startAnimation')
      }, 2000)
    } else{
        scroll({
            top:0,
            behavior:"smooth"
        })
    }
}
//* clear data from input**/
function clearData(){
    product_Name.value = "";
    product_Price.value = "";
    product_Category.value = "";
    product_Description.value = "";
}
//* show list in body**/
function show(showData){
    var tableContent = ""
    for(i = 0; i < showData.length; i++){
        tableContent += `
        <tr>
                <th scope="row">${i + 1}</th>
                <td>${showData[i].productNewName? showData[i].productNewName : showData[i].product_Name}</td>
                <td>${showData[i].product_Price}</td>
                <td>${showData[i].product_Category}</td>
                <td>${showData[i].product_Description}</td>
                <td><button class="btn btn-primary py-0 px-3" onclick="editItem(${i})">Edit</button></td>
                <td><button class="btn btn-danger py-0 px-3" onclick="deleteItem(${i})">Delete</button></td>
              </tr>
        `
    }
    tbody.innerHTML = tableContent
    if(list.length == 0){
        delete_All.setAttribute("disabled", "diasbaled")
        showEmptyCardMessage();
        tbody.classList.add("cartImpty")
    } else{
        delete_All.removeAttribute("disabled", "diasbaled")
        submit.innerHTML="Add product";
        search.classList.remove("d-none")
        head.classList.remove ("d-none");
        submit.classList.remove("crazy")
        search.setAttribute("oninput", "searchPro()")
    }
}
//** delete item function**/
function deleteItem(i){
    list.splice(i,1);
    localStorage.setItem(StoredProducts, JSON.stringify(list))
    show(list);
}
//* edit item function**/
function editItem(i){
    submit.innerHTML="Update";
    submit.classList.add("btn-success")
    submit.setAttribute("onclick", "updateProduct()")
    delete_All.setAttribute("disabled", "diasbaled")
    product_Name.value = list[i].product_Name;
    product_Price.value = list[i].product_Price;
    product_Category.value = list[i].product_Category;
    product_Description.value = list[i].product_Description;
    newI = i;
    hideValidMessage()
    scroll({
        top:0,
        behavior:"smooth"
    })
}
//***update item function****/
function updateProduct(){
    if(validName() && validPrice() && validChar() && validTextArea()) {
    var products = {
        product_Name: product_Name.value.toLowerCase(),
        product_Price:product_Price.value,
        product_Category:product_Category.value,
        product_Description:product_Description.value
    };
    list[newI] = products;
    localStorage.setItem(StoredProducts, JSON.stringify(list))
    document.getElementById("success").innerHTML="updated";
    show_message_success.classList.add("startAnimation")

      // remove class move after 2 second
      setTimeout(() => {
        show_message_success.classList.remove('startAnimation')
      }, 2000)
    clearData();
    show(list);
    hideValidMessage();
    submit.innerHTML="Add product";
    submit.classList.remove("btn-success")
    submit.classList.add("btn-primary")
    submit.setAttribute("onclick", "addProduct()")
    delete_All.removeAttribute("disabled", "diasbaled")
} else{
    scroll({
        top:0,
        behavior:"smooth"
    })
}
}
//***delete All items function****/
function deleteAll(){
    list.splice(0);
    localStorage.setItem(StoredProducts, JSON.stringify(list))
    show(list);
}
//***search item function****/

function searchPro(){
    var searchList = [];
   for(var i = 0; i < list.length; i++){
     if(list[i].product_Name.toLowerCase().includes(search.value.toLowerCase()))
     {
        list[i].productNewName = list[i].product_Name.toLowerCase().replace(search.value, `<span class="text-primary fw-bolder">${search.value}</span>`)
        searchList.push(list[i])
        show(searchList)
     } else if(searchList == 0){
       tbody.innerHTML=`<td colspan=7><p class="bg-danger fs-4 text-center mt-3">Sorry not founded any product include this word : <span class="text-warning fw-bolder"> ${search.value}</span></p> </td>`
   
     }
   }
}
//***valid Name function****/
function validName(){
    var regex = /^[A-Z][a-z]{2,5}$/;
    var isValid = regex.test(product_Name.value);
    function validNameIn(){
        if(isValid){
            valid_name.innerHTML=`<p class="text-success"><i class="fa-solid fa-check"></i></p>`
        } else if(!isValid){
            valid_name.innerHTML=`<p class="text-danger"><i class="fa-solid fa-xmark"></i>  first litter should be capital an the word between 3 char and 6 char</p>`
        }
    }
    validNameIn()
    return isValid
}
//***valid Price function****/
function validPrice(){
    var regex = /^(100\d|10[1-9]\d|1[1-9]\d{2}|[2-9]\d{3}|10000)$/;
    var isValid = regex.test(product_Price.value);
    function validPriceIn(){
        if(isValid){
            valid_price.innerHTML=`<p class="text-success"><i class="fa-solid fa-check"></i></p>`
        } else if(!isValid){
            valid_price.innerHTML=`<p class="text-danger"><i class="fa-solid fa-xmark"></i>  you should write number from 1000 to 10000</p>`
        }
    }
    validPriceIn()
    return isValid
}
//***valid Char function****/
function validChar(){
    var regex = /(^mobile$|^screen$|^watch$)/;
    var isValid = regex.test(product_Category.value);
    function validCharIn(){
        if(isValid){
            valid_char.innerHTML=`<p class="text-success"><i class="fa-solid fa-check"></i></p>`
        } else if(!isValid){
         
            valid_char.innerHTML=`<p class="text-danger"><i class="fa-solid fa-xmark"></i>  you should write mobile or screen or watch</p>`
        }
    }
    validCharIn()
    return isValid
}
//***valid TextArea function****/
function validTextArea(){
    var regex = (/^.{1,250}$/);
    var isValid = regex.test(product_Description.value);
    function validTextAreaIn(){
        if(isValid){
            valid_Textaria.innerHTML=`<p class="text-success"><i class="fa-solid fa-check"></i></p>`
        } else if(!isValid){
         
            valid_Textaria.innerHTML=`<p class="text-danger"><i class="fa-solid fa-xmark"></i> number of character should be start's with 1 character to liss than or equal 250 character</p>`
        }
    }
    validTextAreaIn()
    return isValid
}
//*******hide Valid Message function*******/
function hideValidMessage(){
    valid_name.innerHTML=""
valid_price.innerHTML=""
valid_char.innerHTML=""
valid_Textaria.innerHTML=""
}

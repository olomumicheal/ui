let monthList = ['Invalid','janaury','february','march','april','may','june','july','august','september','october','november','december']
function toMonth(x){
    let responseText = monthList[x];
    responseText=responseText.toUpperCase()
    return responseText;
}
function createDate(x,txt){
    const myDate = new Date();
    let month = myDate.getMonth();
    let year = myDate.getFullYear();
    // let date = myDate.getDate();
    day = x;
    let newDate = myDate.setFullYear(year,month,day);
    let newMonth = myDate.setFullYear(year,month,day);
    newDate  = new Date(newDate);
    newDate = newDate.getDate();
    newMonth = new Date(newMonth);
    newMonth = newMonth.getMonth();
    newMonth = toMonth(newMonth);
    if(txt==true){
        if(newDate=='1'||newDate=='21'||newDate=='31'){
            newDate=newDate+'st - '+newMonth;
        }
        if(newDate=='2'||newDate=='22'){
            newDate=newDate+'nd - '+newMonth;
        }
        if(newDate=='3'||newDate=='23'){
            newDate=newDate+'rd - '+newMonth;
        }
        if(newDate>3||newDate<20 ||newDate>23 ||newDate<31){
            newDate=newDate+'th - '+newMonth;
        }
    }else{
        newDate = newDate;
    }
    // if()  
    return newDate;
}
// 
function rbt(elt,cls,txt,t){
    elt = $('#'+elt);
    elt.show('slow');
    elt.html(txt);
    elt.addClass(cls);
    setTimeout(function(){
         elt.hide('slow');
        elt.removeClass(cls);
        clearTimeout();
    },t);
}
// :::::::Update User info::::::::
// ::::::::::::::::::::::::::
// ::::::::::::::::::::
// :::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::
// :::::::::::::::::::::::::::::::::::
// :::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::
// :::::::::::::::::::::::::::::::::::::::::::::
function updateUserInfo(){
    let name = $('#fname').val(); name=name.trim();
    let gender = $('#gender').val();
    let dob = $('#dob').val();dob=dob.trim();
    let shopName = $('#shopName').val();shopName=shopName.trim();
    const newData = {
                    "name":name,
                    "gender":gender,
                    'dob':dob,
                    "shopName":shopName
                    }
    $.post('../server/updateUser.php',newData,function(data){
        if(data=='1'){
            rbt('msg','border border-light p-2','Account Updated succesfully',6000);
            setTimeout(function(){
                location.reload();
                localStorage.setItem('activeContent','');
            },3000)
        }else if(data==''){
            location.href='../php/logout.php';
        }else{
            location.reload();
        }
    })
}
// 
function searchHistory(){
        search = $('#src').val();search=search.trim();
    let req={'req':'searchHistory','searchDate':search}
   
    $.post('../server/loadHistory.php',req,function(data){
        $('.history-container').html(data);
        alert(data);
    })
}
//  view product
    function viewProduct(product){
        let req = {
            "req":'viewProduct',
            "product":product
        }
        $.post('../server/handle.php',req, function(data,status){
            data  = JSON.parse(data);
            $('#pName').val(data.pName);
            $('#pId').val(data.pId);
            $('#pAmt').val(data.pAmt);
            $('#pDesc').val(data.pDesc);
            $('#pQty').val(data.pQty);
            $('#pImg').attr('src',data.pImg);
            if(data.pStatus=='1'){
                $('#statusDisplay').html('ACTIVE');
            }
            if(data.pStatus=='0'){
                $('#statusDisplay').html('CLOSED');
            }
            
            $('.productCard').removeClass('hide').show('slow');
        }) 
}
// 
// :::::::::UpdTE product info :::::::::::
// ::::::::::::::::::::::::::
// ::::::::::::::::::::
// :::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::
// :::::::::::::::::::::::::::::::::::
// :::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::
// :::::::::::::::::::::::::::::::::::::::::::::
function updateProduct(){
    let pName = $('#pName').val();pName=pName.trim();
    let pAmt = $('#pAmt').val();pAmt=pAmt.trim();
    let pDesc = $('#pDesc').val(); pDesc=pDesc.trim();
    let pQty = $('#pQty').val();pQty=pQty.trim();
    let status = $('#status').val();
    const product = {
                    "pName":pName,
                    "pAmt":pAmt,
                    'pDesc':pDesc,
                    "pQty":pQty,
                    "status":status,
                    "req":"updateProduct"
                    }
        $.post('../server/handle.php',product,function(data){
            if(data=='1'){
                    rbt('msg','b shadow p-2 rounded m-2','Product Updated Successfully!',6000);
                    setTimeout(function(){
                        location.reload();
                    },2000)
            }
            else if(data=='0'){
                rbt('msg','b shadow p-2 rounded m-2','Product Updated Successfully!',6000);
            }
            else{

            }
        })
    }
    function delProduct(){
        $.post('../server/handle.php',{'req':'delProduct'},function(data){
            alert(data);
        })
    }
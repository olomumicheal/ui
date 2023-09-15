<?php 
session_start();
?>
<!DOCTYPE html>
<html lang="en_us">
    <head>
        <title>SHOP OWNER - SIGNIN</title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta property='og:title' content="MET">
	    <meta property='og:description' content=''>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/x-icon" href="">
        <link rel="stylesheet" href="login.css">
        <link rel="stylesheet" href="def.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
        <script src="fnx.js"></script>
        <style>
            .bg-def{background-color: rgb(230, 224, 231);}
        </style>
    </head>
    <body class="bg-green">
        <div class="p-3 shadow mx-auto rounded mt-3 login-area">
                <form>
                    <div class="form-group">
                        <input type="text" class="bg-green"  id="email" placeholder="username - email or Phone" autofocus/>
                    </div>
                    
                    <div class="form-group">
                        <input type="password" class="bg-green" id="pass" placeholder="Password"/>
                    </div>
                    
                    <div class="form-group mt-3">
                        <p class="rounded" id="msg"></p>
                        <button type="button" class="bg-green container" id="signin"><strong>SIGN IN</strong></button>  
                    </div>
                </form>
        </div>
        <div class="bg-dark mt-3 p-2 w-75 mx-auto">
            <a href="#" class="text-muted text-center text-decoration-none">
                <h4 class="">MET PLATFORM</h4>
            </a>
        </div>
        <div class="overlay p-5 text-center">
            <div class="p-5">
                <div class="mx-auto mt-5" id='txt1'><i>SIGIN PROCESSING </i><br>
                    <strong id="txt"></strong>
                </div>
                <div class="spinner-grow bg-white"></div>
            </div>
        </div>
    </body>
    <script>
        $(document).ready(function(){
            $('#signin').click(function(){
                let email,pass;
                pass  =$('#pass').val();
                email=$('#email').val();
                if(email.length<6&&pass.length<6){
                    // $('#msg').html("Please Fill out the form!").addClass('text-danger');
                    rbt('msg','text-secondary p-3','Invalid Login Credentials',6000);
                    $('#email').focus();

                }else{
                    if(email.length<6){
                        rbt('msg','text-secondary p-3','Invalid username',6000); 
                        $('#fname').focus();
                    }
                    else if(pass.length<6){
                        rbt('msg','text-secondary p-3','Invalid Password',6000); 
                        $('#pass').focus();
                    }else{
                        let login ={
                            'username':email,
                            'pass':pass,
                            'req':'signin'
                        }
                        $.post('account.php',login,function(data,status){
                            if(data=='1'){
                                rbt('msg','text-light bg-info p-2',"<b><i>...Processing... </i></b>",120000);
                                    setTimeout(function(){
                                    $('.overlay').fadeIn('slow');
                                    $('#txt').html(login.username);
                                        setTimeout(function(){
                                            $('#txt1').html('<i><b>SUCCESSFUL</b></i>')
                                            location.href='dashboard.php';
                                        },3000);
                                    },1000);
                            }else if(data=='0'){
                                rbt('msg','text-light bg-info p-2',"<b><i>Invalid User Credentials </i></b>",120000);
                            }else{
                                // alert(data);
                                rbt('msg','text-light bg-info p-2',"<b><i> Something Happedned! Please try again</i></b>"+data,120000);
                            }
                        });
                        
                    }

                }
            })
        })
</script>
</html>
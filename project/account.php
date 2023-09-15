<?php
session_start();
require_once('start.php');
if($_POST['req']=='signin'){
    $fname = $email=$phone=$pass=$msg='';
    $email = $con->real_escape_string($_POST['username']);
    $pass = $con->real_escape_string($_POST['pass']);
    $select=$con->query("SELECT * FROM shops WHERE email='$email'");
        if($select->num_rows>0){
            $_SESSION['user'] = $email;
            $msg = '1';
            // header('location:../php/dashboard.php');
        }else if($select->num_rows<1){
            $msg = '0';
        }else{
            $msg = "2";
        }
    echo $msg;
}
?>
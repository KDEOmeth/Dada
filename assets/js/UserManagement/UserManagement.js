//Jquery Function
$(function () {
    $(function () {
        
        //load Users
        $(document).ready(function () {
            $('#spnPageTrack').html("User Management"); 
            $('#btnUnlock').hide();
            $.ajax({
                type: "POST",
                url: "UserManagement.aspx/LoadUsers",
                contentType: "application/json; charset=utf;",
                success: function (res) {
                    $('#tbleUserDv').html(res.d);

                    $('#kt_customers_table').DataTable({
                        info: !1,
                        order: [],
                        pageLength: 10,
                        lengthChange: !1,
                        dom: 'bfrtipq',
                        
                    });
                },
                complete: function () {
                },
                error: function (xhr, status, error) {
                    alert(error);
                    alert(xhr.responseText);
                }
            });
        });
        //Bank DD
        
        $.ajax({
            type: "POST",
            url: "UserManagement.aspx/DropDBanksName",
            data: JSON.stringify({
            }),
            contentType: "application/json; charset=utf;",
            success: function (res) {
                $('#TxtBankID').append("<option value='0'> -SELECT- </option>");
                $('#txtBnk').append("<option value='0'> -SELECT- </option>");

                $.each(res.d, function (key, value) {
                    $("#TxtBankID").append($("<option></option>").val(value.BnkCode).html(value.Bank));
                    $("#txtBnk").append($("<option></option>").val(value.BnkCode).html(value.Bank));
                });

            },
            complete: function () {
            },
            error: function (xhr, status, error) {
                alert(error);
                alert(xhr.responseText);
            }
        });

        //model Close
        $("#btnClose").click(function () {
            //alert();
            $('#popUpModelUsers').hide();
        });

        //User Adding
        $("#btnSubmitUserDtls").click(function () {
           // alert();
            var userName = $("#TxtUserID").val();
            var Name = $("#TxtUserName").val();
            var BankID = $("#TxtBankID").val();
            var Bank = BankID.join();
            var userPW = $("#TxtUserPW").val();
           // var userRPW = $("#TxtUserRPW").val();
            var userLevel = $("#SlectLvl").val();
            var Email = $("#TxtUserMail").val();
            var RegDate = new Date().toLocaleDateString('en-US');
            var Activity = 1;
            var AccessBility = "";

            $.ajax({
                type: "POST",
                url: "UserManagement.aspx/ValidateUserAdd",
                data: "{'userName':'" + userName + "'}",
                dataType: "json",
                contentType: "application/json; charset=utf",
                success: function (res) {
                  //  alert(res.d);

                   
                   if (userName === res.d[0]) {

                        swal({
                            title: "Warning",
                            text: "User name currently Exist!",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        });

                   }

                   else if (userName === "") {

                        swal({
                            title: "Warning",
                            text: "Please Insert Your UserName!",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        });

                    }
                   
                    else if (Name === "") {                       
                        swal({
                            title: "Warning",
                            text: "Please Insert Your Name!",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        });
                    }


                    else if (userPW ==="")
                    {
                        swal({
                            title: "Warning",
                            text: "Please Insert Your Password!",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        });
                    }
                    else if (Bank === "0") {
                        
                            swal({
                                title: "Warning",
                                text: "Please Select Bank!",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                            });
                    }
                    else if (IsEmail(Email) == false)
                    {
                        swal({
                            title: "Warning",
                            text: "Please insert correct Email!",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        });
                    }
                    else if (Email === "") {

                        swal({
                            title: "Warning",
                            text: "Please Insert Your Email address!",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        });

                    }
                    else if (IsEmail(Email) == false) {
                        swal({
                            title: "Warning",
                            text: "Please insert correct Email!",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        });
                    }
                    else {
                        if (userLevel === "") {
                           
                            swal({
                                title: "Warning",
                                text: "Please Select UserLevel!",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                            });
                        }

                        else {
                            
                            if ((userLevel === '1') || (userLevel === '2') || (userLevel === '3')) {
                                AccessBility = '1';

                            }
                            else {
                                AccessBility = '2';
                            }
                           

                            $.ajax({
                                type: "POST",
                                url: "UserManagement.aspx/InsertUserData",
                                dataType: "json",
                                data: JSON.stringify({
                                    userName: userName,
                                    Name: Name,
                                    Password: userPW,
                                    UserLvl: userLevel,
                                    BankID: Bank,
                                    Acces: AccessBility,
                                    RegDate: RegDate,
                                    actStatus: Activity,
                                    mail:Email,
                                }),
                                contentType: "application/json; charset=utf;",
                                success: function (res) {
                                    //sessionStorage["UserName"] = UserName;
                                    //sessionStorage["Userlevel"] = Userlevel;
                                    //sessionStorage["DeptID"] = DeptID;
                                    
                                    swal({
                                        title: "Success",
                                        text: "You have successfully Registered to the System!",
                                        icon: "success",
                                        buttons: true,

                                    });
                                   
                                },
                                complete: function () {

                                    location.reload();
                                },
                                error: function (xhr, status, error) {
                                    alert(xhr.responseText);
                                }
                            });
                        }
                    }
                },
                error: function (xhr, status, error) {
                    alert(xhr.responseText);
                }
            });


          

        });

        //Update Users
        $("#btnUpdateUsers").click(function () {
            //alert(sessionStorage["ID"]);
           var UserName = $('#txtUserName').val();
           var Name = $('#txtName').val();
            var Bankids = $('#txtBnk').val();
            var Bank = Bankids.join();
            var PassWord = $('#txtPassword').val();
            var Email = $('#txtEmail').val();
            var Level = $('#txtLevel').val();
            //var RePassWord = $('#txtRePassword').val();
            var RowID = sessionStorage["ID"]
            //alert($('#txtBnk').val());
            
            if (Bank === "0") {
                swal({
                    title: "Warning",
                    text: "Please Select Bank!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                });
            }
            else if (UserName ==="")
            {
                swal({
                    title: "Warning",
                    text: "Please Insert Your Username!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                });
            }
            else if (IsEmail(Email) == false) {
                swal({
                    title: "Warning",
                    text: "Please insert correct Email!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                });
            }
            else if (Email === "") {

                swal({
                    title: "Warning",
                    text: "Please Insert Your Email address!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                });

            }
            else
            {

                    $.ajax({
                        type: "POST",
                        url: "UserManagement.aspx/UpdateUsers",
                        data: JSON.stringify({
                            RowID: RowID,
                            UserName: UserName,
                            Name: Name,
                            Password: PassWord,
                            bank: Bank,
                            email: Email,
                            level: Level,

                        }),
                        contentType: "application/json; charset=utf;",
                        success: function (res) {

                            swal({
                                title: "Success",
                                text: "User Updated Successfully!",
                                icon: "success",
                                buttons: true,
                            });
                        },
                        complete: function () {
                       
                            location.reload();
                        },
                        error: function (xhr, status, error) {
                            alert(xhr.responseText);
                        }
                    });
            }

           

        });
        $("#kt_modal_users_search_close").click(function () {
           
            $('#kt_modal_users_search').modal("hide");
        });

        $("#kt_modal_add_customer_close").click(function () {

            $('#kt_modal_add_customer').modal("hide");
        });

        $("#btnUnlock").click(function () {
            var rowid = sessionStorage["ID"];
            var UserName = $('#txtUserName').val();
            //alert(rowid);
            $.ajax({
                type: "POST",
                url: "UserManagement.aspx/unlockAcc",
                data: JSON.stringify({
                    ID: rowid,
                    User: UserName,
                }),
                contentType: "application/json; charset=utf;",
                success: function (res) {
                    swal({
                        title: "Success",
                        text: "Account Successfully unlocked!",
                        icon: "success",
                        buttons: true,
                    });
                },
                complete: function () {
                    $('#kt_modal_users_search').modal("hide");
                },
                error: function (xhr, status, error) {
                    alert(error);
                    alert(xhr.responseText);
                }
            });
        });

        $("#btnDeactiveUsers").click(function () {
            var RowID = sessionStorage["ID"];
            var UserName = $('#txtUserName').val();

            $.ajax({
                type: "POST",
                url: "UserManagement.aspx/DeactiveUsers",
                data: JSON.stringify({
                    ID: RowID,
                    User: UserName,
                }),
                contentType: "application/json; charset=utf;",
                success: function (res) {

                    swal({
                        title: "Success",
                        text: "User Deactivated!",
                        icon: "success",
                        buttons: true,
                    });
                },
                complete: function () {

                    location.reload();
                },
                error: function (xhr, status, error) {
                    alert(xhr.responseText);
                }
            });
           
        });
    });

});

//functions
function UserTr(thisID) {
   // alert(thisID.id);
    var RowID = thisID.id;
    sessionStorage["ID"] = RowID;
    $('#btnUnlock').hide();

    $.ajax({
        type: "POST",
        url: "UserManagement.aspx/EditUSers",
        data: JSON.stringify({
            ID: RowID,            
        }),
        contentType: "application/json; charset=utf;",
        success: function (res) {
            const Text = res.d[2];
            const array = Text.split(",");

            $('#txtUserName').val(res.d[0]);
            $('#txtName').val(res.d[1]);
           // $('#txtBnk').val(res.d[2]);
            $('#txtBnk').select2().val([array[0],array[1],array[2],array[3]]).trigger("change");
          //  $('#txtBnk').select2().val(bnkids).trigger("change");
            $('#txtEmail').val(res.d[4]);
            $('#txtLevel').select2().val(res.d[5]).trigger("change");

            if (res.d[3] == '1') {
                $('#btnUnlock').show();
            }

           // alert(array[1]);
           // $('#tbleUserDv').html(res.d);
        },
        complete: function () {
            $('#kt_modal_users_search').modal("show");
            
           
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
            alert(error);
        }
    });
    //alert(Locked);

}

//email validate
function IsEmail(TxtUserMail) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(TxtUserMail)) {
        return false;
    } else {
        return true;
    }
}

function IsEmail(txtEmail) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(txtEmail)) {
        return false;
    } else {
        return true;
    }
}

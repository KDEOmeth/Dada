$(function () {
    $(document).ready(function () {
     

        $('#TxtNewPW').keyup(function (){
         
          
          
            var number = /([0-9])/;
            var alphabets = /([a-zA-Z])/;
            var special_characters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
            if ($('#TxtNewPW').val().length < 14) {
                $('#password-strength-status').removeClass();
                $('#password-strength-status').addClass('weak-password');
                $('#password-strength-status').html("Weak (should be atleast 14 characters.)");
            } else {
                if ($('#TxtNewPW').val().match(number) && $('#TxtNewPW').val().match(alphabets) && $('#TxtNewPW').val().match(special_characters)) {
                    $('#password-strength-status').removeClass();
                    $('#password-strength-status').addClass('strong-password');
                    $('#password-strength-status').html("Strong");
                    sessionStorage["Pass"] = 1;
                } else {
                    $('#password-strength-status').removeClass();
                    $('#password-strength-status').addClass('medium-password');
                    $('#password-strength-status').html("Medium (should include alphabets, numbers and special characters or some combination.)");
                }
            }


        });
    });

    $("#btnuserR").click(function () {
        var RePassWord =$("#TextRePw").val();
        var PassWord = $("#TxtNewPW").val();
        
        if (PassWord === "") {
            swal({
                title: "Warning",
                text: "Please insert your Password",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
        }
        else if (RePassWord === "")
        {
            swal({
                title: "Warning",
                text: "Please insert your Password again",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
        }
        else if (sessionStorage["Pass"] === '')
        {
            swal({
                title: "Warning",
                text: "Please insert your Strong Password",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
        }

        else if (PassWord === RePassWord && sessionStorage["Pass"] === '1')
        {
                $.ajax({
                    type: "POST",
                    url: "userrestpw.aspx/UserResetPw",
                    data: JSON.stringify({
                        PassW: PassWord,
                    }),
                    contentType: "application/json; charset=utf;",
                    success: function (res) {
                        swal({
                            title: "Success",
                            text: "Password Reset Successfully!",
                            icon: "success",
                            buttons: true,
                        });
                    },
                    complete: function () {
                        $(location).prop('href', 'login.aspx')

                    
                    },
                    error: function (xhr, status, error) {
                        alert(xhr.responseText);
                    }
                });
        }
        else
        {
            swal({
                title: "Warning",
                text: "Password Not Matched",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
        }
    });
});


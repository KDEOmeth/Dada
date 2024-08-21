//jQuery Functions
"use strict";

$(function () {

    $(document).ready(function () {

        $('#spnPageTrack').html("Terminal Management");
        $("#txtAdUserName").val($('#lblUserName').html());
        //Datatbl
        $('#example').DataTable({
            info: !1,
            order: [],
            pageLength: 10,
            lengthChange: !1,
            dom: 'frtipq',
            "columnDefs": [
                {
                    "targets": 5,
                    "render": function (data, type, row) {

                        if ($(data).text() == "0") {
                            $(data).addClass("badge-light-danger");
                            return "<span class='badge badge-light-danger'>Inactive</span>";
                        }
                        return "<span class='badge badge-light-success'>Active</span>";
                    }
                }
            ],
        });
 
        ///

        $.ajax({
            type: "POST",
            url: "TerminalManagement.aspx/BranchSDD1",
            data: JSON.stringify({
                //bankID: BankID,
            }),
            contentType: "application/json; charset=utf;",
            success: function (res) {
                //  $('#txtBranch').append("<option value='0'> -SELECT- </option>");
                $.each(res.d, function (key, value) {
                    $("#txtBankBranch").append($("<option></option>").val(value.BanchID1).html(value.Location1));
                });
            },
            complete: function () {

            },
            error: function (xhr, status, error) {
                // alert(error);
                alert(xhr.responseText);
            }
        });

        //

      
        $.ajax({
            type: "POST",
            url: "TerminalManagement.aspx/LoadTerminals",
            contentType: "application/json; charset=utf;",
            success: function (res) {
               // $('#tbleTerminalDv').html(res.d);
              
               // $('#tblTerminal').DataTable();
            },
            complete: function () {
            },
            error: function (xhr, status, error) {
                //alert(error);
                alert(xhr.responseText);
            }
        });

        //Venders dropdown
        $.ajax({
            type: "POST",
            url: "TerminalManagement.aspx/VenderDD",
            data: JSON.stringify({
            }),
            contentType: "application/json; charset=utf;",
            success: function (res) {
                $('#txtTermServiceType').append("<option value='0'> -SELECT- </option>");
                $.each(res.d, function (key, value) {
                    $("#txtTermServiceType").append($("<option></option>").val(value.ID).html(value.vender));
                });
            },
            complete: function () {
            },
            error: function (xhr, status, error) {
                // alert(error);
                alert(xhr.responseText);
            }
        });

        //Venders dropdown
        $.ajax({
            type: "POST",
            url: "TerminalManagement.aspx/VenderDD",
            data: JSON.stringify({
            }),
            contentType: "application/json; charset=utf;",
            success: function (res) {
                $('#txtVTermServiceType').append("<option value='0'> -SELECT- </option>");
                $.each(res.d, function (key, value) {
                    $("#txtVTermServiceType").append($("<option></option>").val(value.ID).html(value.vender));
                });
            },
            complete: function () {
            },
            error: function (xhr, status, error) {
                // alert(error);
                alert(xhr.responseText);
            }
        });

        //ATM Category DropDown
        $.ajax({
            type: "POST",
            url: "TerminalManagement.aspx/ATMCatDD",
            data: JSON.stringify({
            }),
            contentType: "application/json; charset=utf;",
            success: function (res) {
                $('#txtTermModel').append("<option value='0'> -SELECT- </option>");
                $.each(res.d, function (key, value) {
                    $("#txtTermModel").append($("<option></option>").val(value.ID).html(value.Category));
                });
            },
            complete: function () {
            },
            error: function (xhr, status, error) {
                // alert(error);
                alert(xhr.responseText);
            }
        });
        //Bank DD
        //bank DD
        $.ajax({
            type: "POST",
            url: "TerminalManagement.aspx/DropDBanksName",
            data: JSON.stringify({
            }),
            contentType: "application/json; charset=utf;",
            success: function (res) {
                $('#txtBankId').append("<option value='0'> -SELECT- </option>");

                $.each(res.d, function (key, value) {
                    $("#txtBankId").append($("<option></option>").val(value.BnkCode).html(value.Bank));
                });

            },
            complete: function () {
            },
            error: function (xhr, status, error) {
                alert(error);
                alert(xhr.responseText);
            }
        });

       

       //Province DD

        //Venders dropdown
        $.ajax({
            type: "POST",
            url: "TerminalManagement.aspx/ProvinceDD",
            data: JSON.stringify({
            }),
            contentType: "application/json; charset=utf;",
            success: function (res) {
                $('#txtProvince').append("<option value='0'> -SELECT- </option>");
                $.each(res.d, function (key, value) {
                    $("#txtProvince").append($("<option></option>").val(value.ID).html(value.Province));
                });
            },
            complete: function () {
            },
            error: function (xhr, status, error) {
                // alert(error);
                alert(xhr.responseText);
            }
        });



    });

    $('#txtBankId').change(function () {
        //Branch Category DropDown
        //$('#txtBranch').val("").trigger("change");
        $('#txtBranch').empty();
        var BankID = $('#txtBankId').val();
      
        $.ajax({
            type: "POST",
            url: "TerminalManagement.aspx/BranchSDD",
            data: JSON.stringify({
                bankID: BankID,
            }),
            contentType: "application/json; charset=utf;",
            success: function (res) {
              //  $('#txtBranch').append("<option value='0'> -SELECT- </option>");
                $.each(res.d, function (key, value) {
                    $("#txtBranch").append($("<option></option>").val(value.BanchID).html(value.Location));
                });
            },
            complete: function () {
                
            },
            error: function (xhr, status, error) {
                // alert(error);
                alert(xhr.responseText);
            }
        });
        
    });

    //Branch DD
    $('#txtBranch').select2({
        dropdownParent: $("#kt_modal_new_card"),
        minimumInputLength: 1
    });

    //$('#txtBankBranch').select2({
    //    dropdownParent: $("#kt_modal_view_users"),
    //    minimumInputLength: 1
    //});
    //close view DELETE model
    $("#btnVDelete").click(function () {
      //  var RowID = $("#HiddenField1").html();   
        var RowID1 = $('#MainContent_HiddenField').val();
        //var RowID1 = $("#<%=HiddenField1.ClientID%>").val();
        //alert(RowID1);
        

        $.ajax({
            type: "POST",
            url: "TerminalManagement.aspx/DeleteTerm",
            data: JSON.stringify({
                RowID: RowID1,
            }),
            contentType: "application/json; charset=utf;",
            success: function (res) {
                location.href = 'TerminalManagement.aspx';
            },
            complete: function () {
            },
            error: function (xhr, status, error) {
                //alert(error);
                alert(xhr.responseText);
            }
        });
       
    });

    //close view edit model
    $("#btnVClose").click(function () {
        //alert();
        $('#popUpModelTerm').hide();
    });

    //Model show button
    $("#btnTerminalAd").click(function () {
       
       $("#popUpModelAddTerm").fadeIn();    

     
    });
    
    //close button
    $("#btnClose").click(function () {
        $("#popUpModelAddTerm").hide();
    });

    $("#kt_modal_view_users_cancel").click(function () {
        $('#kt_modal_view_users').modal("hide");

    });

    $("#kt_modal_new_card_cancel").click(function () {
        $('#kt_modal_new_card').modal("hide");
        location.reload();

    });

    //Close Button Reset
    $("#btnTermAdClose").click(function () {
        $("#txtTerminalID").val("");
        $("#txtAdUserName").val("");
        $("#txtBankId").val("");
        $("#txtBranch").val("");
        $("#txtTermIP").val("");
        $("#txtTermCity").val("");
        $("#txtLocation").val("");


    });
   
    //Add Terminals
    $("#kt_modal_new_card_submit").click(function () {
        var TerminalID = $("#txtTerminalID").val();
        var AddedUser = $("#lblUserName").html();        
        var Bank = $("#txtBankId").val();
        var City = $("#txtTermCity").val();
        var Location = $("#txtLocation").val();
        var Province = $("#txtProvince").val();
        var IP = $("#txtTermIP").val();
        var Model = $("#txtTermModel").val();
        var Service = $("#txtTermServiceType").val();
        var OnOffsite = $("#txtOnoffSite").val();
        var Email = $("#txtEmail").val();
        var Branch = $("#txtBranch").val();

        var Novus = $("#txtNovusCC").val();
        var ChanManager = $("#txtChanManager").val();
        var ATMOff1 = $("#txtatmOfficer1").val();
        var ATMOff2 = $("#txtatmOfficer2").val();
        var CheckTermID = "";

        //Check Terminal ID Exists
        $.ajax({
            type: "POST",
            url: "TerminalManagement.aspx/CheckTerminalID",
            data: JSON.stringify({
                TermID: TerminalID,
            }),
            contentType: "application/json; charset=utf;",
            success: function (res) {
               // alert(res.d);
              

                if (TerminalID === "") {
                  
                    swal({
                        title: "Warning",
                        text: "Please Add terminal ID!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    });
                }
                else if (City === "") {
                    
                    swal({
                        title: "Warning",
                        text: "Please Add the city!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    });
                }
                else if (Location === "") {
                   
                    swal({
                        title: "Warning",
                        text: "Please Add the Terminal Location!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    });
                }
                else if (Model === "")
                {
                    swal({
                        title: "Warning",
                        text: "Please Add the Terminal Model!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    });
                }
                else if (Bank === "0") {
                    swal({
                        title: "Warning",
                        text: "Please Add the Bank!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    });
                }
                else if (Branch === "0") {
                    swal({
                        title: "Warning",
                        text: "Please Add the Bank-Branch!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    });
                }
                else if (res.d[0] === TerminalID) {
                   
                    swal({
                        title: "Warning",
                        text: "Terminal ID already exists!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    });
                   // alert(res.d[0]);
                }
                else {
                        $.ajax({
                            type: "POST",
                            url: "TerminalManagement.aspx/AddTerminals",
                            data: JSON.stringify({
                                BankID: Bank,
                                TerminalID: TerminalID,
                                Province: Province,
                                Location: Location,
                                City: City,
                                Device: Model,
                                IP: IP,
                                Vender: Service,
                            //  Email: Email,
                                siteonOFF: OnOffsite,
                                UpUser: AddedUser,
                                branchID: Branch,
                                NovusNo: Novus,
                                ChanManager: ChanManager,
                                ATMOf1: ATMOff1,
                                ATMOf2: ATMOff2,
                            }),
                            contentType: "application/json; charset=utf;",
                            success: function (res) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Terminal Added SucessFully',
                                    showConfirmButton: false,
                                    timer: 1500
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
            },
            complete: function () {
               
            },
            error: function (xhr, status, error) {
                alert(xhr.responseText);
            }
        });      
        
    });

    //Update Terminals
    $("#btnVETErm").click(function () {

        var RowID = $('#MainContent_HiddenField').val();
        var TermID = $("#MainContent_txtTerminalVID").val();
        var Prov = $("#MainContent_txtVProvince").val();
        var Loctn = $("#MainContent_txtVLocation").val();
        var city = $("#MainContent_txtTermVCity").val();
        var model = $("#MainContent_txtVTermModel").val();
        var TermIP = $("#MainContent_txtVTermIP").val();
        var vendr = $("#MainContent_txtVTermServiceType").val();
        var Auser = $("#MainContent_txtAdUserVName").val();
        var site = $("#MainContent_txtVOnoffSite").val();

        var Novus = $("#MainContent_txtEditNovusCC").val();
        var CM = $("#MainContent_txtEditChanManager").val();
        var atmof1 = $("#MainContent_txtEditatmOfficer1").val();
        var atmof2 = $("#MainContent_txtEditatmOfficer2").val();

        if (TermID === "") {
            swal({
                title: "Warning",
                text: "Please Terminal ID is Empty",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
        }
        else if (model === "") {
            swal({
                title: "Warning",
                text: "Please Terminal Model is Empty",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
        }
        else if (Loctn === "") {
            swal({
                title: "Warning",
                text: "Please Terminal Location is Empty",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
        }
        else if (site === "") {
            swal({
                title: "Warning",
                text: "Please Terminal Site code is Empty",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
        }

        else
        {
            $.ajax({
                type: "POST",
                url: "TerminalManagement.aspx/UpdateTerminals",
                data: JSON.stringify({
                    RowID: RowID,
                    TermID: TermID,
                    Prov: Prov,
                    Locatn: Loctn,
                    City: city,
                    Model: model,
                    TermIP: TermIP,
                    Vender: vendr,
                    Aduser: Auser,
                    Site: site,

                    Novus: Novus,
                    CM: CM,
                    AtmOf1: atmof1,
                    ATMOf2: atmof2,

                }),
                contentType: "application/json; charset=utf;",
                success: function (res) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Updated Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                },
                complete: function () {
                    //  alert('User Updated Successfully');
                    location.href = 'TerminalManagement.aspx';
                },
                error: function (xhr, status, error) {
                    alert(xhr.responseText);
                }
            });
        }
        
    });



});

function TerminalTr()
{
   // var RowID = $('#HiddenField1').val(); 
   alert($('#HiddenField1').val());
    

    sessionStorage["TermID"] = RowID;    
    $.ajax({
        type: "POST",
        url: "TerminalManagement.aspx/EditTerminals",
        data: JSON.stringify({
            ID: RowID,
        }),
        contentType: "application/json; charset=utf;",
        success: function (res) {
          
            $("#txtBankVId").val(res.d[0]);
            $("#txtTerminalVID").val(res.d[1]);
            $("#txtVProvince").val(res.d[2]);
            $("#txtVLocation").val(res.d[3]);
            $("#txtTermVCity").val(res.d[4]);
            $("#txtVTermModel").val(res.d[5]);
            $("#txtVTermIP").val(res.d[6]);          
            $('#txtVTermServiceType').select2().val(res.d[7]).trigger("change");
            $("#txtVEmail").val(res.d[8]);
            $("#txtAdUserVName").val(res.d[9]);
          //  $("#txtVOnoffSite").val(res.d[10]);
            $('#txtVOnoffSite').select2().val(res.d[10]).trigger("change");
            $("#txtBankBranch").val(res.d[11]);
            $("#txtEditNovusCC").val(res.d[12]);
            $("#txtEditChanManager").val(res.d[13]);
            $("#txtEditatmOfficer1").val(res.d[14]);
            $("#txtEditatmOfficer2").val(res.d[15]);
            //alert(res.d[10]);

            // $('#tbleUserDv').html(res.d);
           
        },
        complete: function () {
            $('#kt_modal_view_users').modal("show");

        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    });

 

}





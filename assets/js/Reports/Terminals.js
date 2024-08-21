$(function () {


    //load Reports
    $(document).ready(function () {
        $('#spnPageTrack').html("Terminal List");

        $.ajax({
            type: "POST",
            url: "termreport.aspx/Loadterminals",
            data: JSON.stringify({
                
            }),
            contentType: "application/json; charset=utf;",
            success: function (res) {
                $('#Terminals').html(res.d);

            },
            complete: function () {

                $('#tblTerminal1').DataTable({
                    info: !1,
                    order: [],
                    pageLength: 10,
                    lengthChange: !1,
                    dom: 'Bfrtipq',
                    buttons: [
                        { extend: 'excel', className: "btn btn-light text-primary" },
                        { extend: 'pdf', className: 'btn text-primary btn-light' }
                    ],
                });
            },
            error: function (xhr, status, error) {
                // alert(error);
                alert(xhr.responseText);
            }
        });

    });

});


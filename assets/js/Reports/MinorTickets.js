$(function () {


    //load Reports
    $(document).ready(function () {
        $('#spnPageTrack').html("Reports");
              

    });

    $("#btnFilter").click(function () {
        var FromDate = $('#txtFromdate').val();
        var ToDate = $('#txtTodate').val();

        FromDate.replace("T", " ");
        ToDate.replace("T", " ");

        if (FromDate === "") {
            // alert();
            swal({
                title: "Warning",
                text: "Insert a Correct From-Date!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
        }
        else if (ToDate === "") {
            swal({
                title: "Warning",
                text: "Insert a Correct To-Date!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
        }
        else {



            $.ajax({
                type: "POST",
                url: "Minorreports.aspx/LoadFilteredData",
                data: JSON.stringify({
                    FromDate: FromDate,
                    ToDate: ToDate,

                }),
                contentType: "application/json; charset=utf;",
                success: function (res) {
                    $('#Reporttbl').html(res.d);

                },
                complete: function () {

                    $('#tblReports').DataTable({
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
        }



    });



});


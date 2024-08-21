
$(function () {
    $('#Loading').hide();

    //load Reports
    $(document).ready(function () {
        $('#spnPageTrack').html("Reports");

         //Report DropD
        $.ajax({
            type: "POST",
            url: "Reports.aspx/Reportdropdown",
            data: JSON.stringify({
            }),
            contentType: "application/json; charset=utf;",
            success: function (res) {
                $('#txtTickType').append("<option value='0'> -SELECT- </option>");
                $.each(res.d, function (key, value) {
                    $("#txtTickType").append($("<option></option>").val(value.reportID).html(value.reportName));
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

    $("#btnFilter").click(function () {
        $('#DataDiv').hide();
        $('#Loading').show();
        var FromDate = $('#txtFromdate').val();
        var ToDate = $('#txtTodate').val();
        var TickType = $('#txtTickType').val();

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


            if (TickType === '4') {
                $.ajax({
                    type: "POST",
                    url: "Reports.aspx/LoadMonthlyReport",
                    data: JSON.stringify({
                        FromDate: FromDate,
                        ToDate: ToDate,
                        Ttype: TickType,

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
                                {
                                    extend: 'excel',
                                    className: "btn btn-light text-primary",
                                    exportOptions: {
                                        columns: ':visible',
                                        format: {
                                            body: function (data, row, column, node) {
                                                data = $('<p>' + data + '</p>').text();
                                                return $.isNumeric(data.replace(',', '.')) ? data.replace(',', '.') : data;
                                            }
                                        }
                                    }

                                },
                                { extend: 'pdf', className: 'btn text-primary btn-light' }
                            ],

                        });
                        $('#DataDiv').show();
                        $('#Loading').hide();
                    },
                    error: function (xhr, status, error) {
                        // alert(error);
                        alert(xhr.responseText);
                    }
                });
            }

                if (TickType === '6')
                {
                    $.ajax({
                        type: "POST",
                        url: "Reports.aspx/LoadBDR",
                        data: JSON.stringify({
                            FromDate: FromDate,
                            ToDate: ToDate,
                            Ttype: TickType,

                        }),
                        contentType: "application/json; charset=utf;",
                        success: function (res) {
                            $('#Reporttbl').html(res.d);
                            console.log(res.d)

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
                            $('#DataDiv').show();
                            $('#Loading').hide();
                        },
                        error: function (xhr, status, error) {
                            // alert(error);
                            alert(xhr.responseText);
                        }
                    });
                }

            else {
                $.ajax({
                    type: "POST",
                    url: "Reports.aspx/LoadFilteredData",
                    data: JSON.stringify({
                        FromDate: FromDate,
                        ToDate: ToDate,
                        Ttype: TickType,

                    }),
                    contentType: "application/json; charset=utf;",
                    success: function (res) {
                        $('#Reporttbl').html(res.d);
                        console.log(res.d)

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
                        $('#DataDiv').show();
                        $('#Loading').hide();
                    },
                    error: function (xhr, status, error) {
                        // alert(error);
                        alert(xhr.responseText);
                    }
                });

            }

        }



    });



});



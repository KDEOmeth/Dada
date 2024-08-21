$(function () {

    $(document).ready(function () {

        $('#spnPageTrack').html("Non-critical Tickets");

        // Drop Down Foults
        $.ajax({
            type: "POST",
            url: "Minor.aspx/MinorF",
            data: JSON.stringify({
            }),
            contentType: "application/json; charset=utf;",
            success: function (res) {
                $('#txtfaultType').append("<option value='0'> </option>");
                $.each(res.d, function (key, value) {
                    $("#txtfaultType").append($("<option></option>").val(value.ID).html(value.Fault));
                });

            },
            complete: function () {
                $("#txtfaultType").select2("val", "4");
            },
            error: function (xhr, status, error) {
                alert(error);
                alert(xhr.responseText);
            }
        });



    });

    $('#txtfaultType').change(function () {

        var FaultID = $('#txtfaultType').val();
      
        $.ajax({
            type: "POST",
            url: "Minor.aspx/LoadMinorTickets",
            data: JSON.stringify({
                FaultID: FaultID,
            }),
            contentType: "application/json; charset=utf;",
            success: function (res) {
                $('#TicketMinorDv').html(res.d);
            },
            complete: function () {
                $('#kt_customers_table').DataTable({
                    info: !1,
                    order: [],
                    pageLength: 10,
                    lengthChange: !1,
                    dom: 'bfrtipq',

                });

            },
            error: function (xhr, status, error) {
                alert(error);
                alert(xhr.responseText);
            }
        });
    });

});
$(document).ready(function () {
    $('#searchDDlG1').hide();
    $('#searchDDlG2').hide();
    $('#searchDDlG3').hide();
    $('#searchDDlG4').hide();

    fnClearGroup();   // Reset form
    fnGetGroup();     // Load initial table


    $("#btnSaveGroup").click(function () {
        if (!fnValidateGroup()) return;
        fnAddGroup();
    });

    $("#btnUpdateGroup").click(function () {
        if (!fnValidateGroup()) return;
        fnUpdateGroup();
    });

    $("#btnClearPage").click(function () {
        fnClearGroup();
    });


    $(document).on('click', '.class-btnUpdateGroup', function () {
        var id = $(this).attr('id');
        fnGetGroupById(id);

    });


    function fnGetGroup() {

        var gtype = $("#txtGroupType").val();

        $.ajax({
            url: "/Group/GetGroup",
            type: "GET",
            data: { groupType: gtype },
            success: function (res) {

                var html = "";
                var i = 1;

                $.each(res, function (index, item) {
                    let c = assignClass(item.GroupType);//"style='background-color: red'";
                    html += "<tr class='" + assignClass(item.GroupType) + "'>";
                    html += "<td " + c + " >" + (i++) + "</td>";
                    html += "<td " + c + " >" + item.GroupName + "</td>";
                    html += "<td " + c + " >" + item.GroupType + "</td>";
                    html += "<td " + c + " >" + (item.IsActive ? 1 : 0) + "</td>";
                    html += "<td " + c + " >" + (item.IsFixedAmt ? 1 : 0) + "</td>";
                    html += "<td " + c + " >" + item.Amt + "</td>";
                    html += "<td " + c + " >";
                    html += "<a href='#'><i id='" + item.Id + "' class='fa-solid fa-pen-to-square text-warning class-btnUpdateGroup'></i></a> | ";
                    html += "<a href='#' onclick='fnDeleteGroup(" + item.Id + ")'><i class='fa-regular fa-trash-can text-danger'></i></a>";
                    html += "</td>";
                    html += "</tr>";
                });

                $("#gridTableGroup tbody").html(html);

                // Refresh DataTable
                initDataTable();
            }
        });
    }

    function assignClass(group) {
        let _style = "";
        if (group == 'G1') { _style = "style='background-color: #3f51b552'" }
        else if (group == 'G2') { _style = "style='background-color: #ef08e840'" }
        else if (group == 'G3') { _style = "style='background-color: #08a7ef61'" }
        else if (group == 'G4') { _style = "style='background-color: #8bc34a94'" }
        return _style;
    }

    function fnAddGroup() {
        var obj = {
            GroupName: $("#txtGroupName").val(),
            GroupType: $("#txtGroupType").val(),
            IsActive: $("#chkIsActive").is(":checked"),
            IsFixedAmt: $("#chkIsFixedAmt").is(":checked"),
            Amt: $("#txtFixedAmt").val()
        };

        $.ajax({
            url: "/Group/AddGroup",
            type: "POST",
            data: obj,
            success: function (res) {
                alert("Added Successfully. ID = " + res.Id);
                fnGetGroup();
                fnClearGroup();   // Reset form
            }
        });
    }

    function fnUpdateGroup() {

        var obj = {
            Id: $("#hidenGroupID").val(),
            GroupName: $("#txtGroupName").val(),
            GroupType: $("#txtGroupType").val(),
            IsActive: $("#chkIsActive").is(":checked"),
            IsFixedAmt: $("#chkIsFixedAmt").is(":checked"),
            Amt: $("#txtFixedAmt").val()
        };

        $.ajax({
            url: "/Group/UpdateGroup",
            type: "POST",
            data: obj,
            success: function (res) {
                alert("Updated Successfully");
                fnGetGroup();
                fnClearGroup();   // Reset form
            }
        });
    }

    function fnDeleteGroup(id) {

        Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the record!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {

                $.ajax({
                    url: "/Group/DeleteGroup",
                    type: "POST",
                    data: { id: id },
                    success: function (res) {

                        Swal.fire("Deleted!", "Record deleted successfully.", "success");

                        fnGetGroup();
                    }
                });

            }
        });
    }

    //fill for update
    function fnGetGroupById(id) {
        $.ajax({
            url: "/Group/GroupById",
            type: "GET",
            data: { id: id },
            success: function (item) {

                $("#hidenGroupID").val(item.Id);
                $("#txtGroupName").val(item.GroupName);
                $("#txtGroupType").val(item.GroupType);
                $("#chkIsActive").prop("checked", item.IsActive);
                $("#chkIsFixedAmt").prop("checked", item.IsFixedAmt);
                $("#txtFixedAmt").val(item.Amt);

                $("#btnSaveGroup").hide();
                $("#btnUpdateGroup").show();
            }
        });

    }

    function fnClearGroup() {
        $("#hidenGroupID").val("");
        $("#txtGroupName").val("");
        $("#txtGroupType").val("");
        $("#chkIsActive").prop("checked", false);
        $("#chkIsFixedAmt").prop("checked", false);
        $("#txtFixedAmt").val("");

        $("#btnSaveGroup").show();
        $("#btnUpdateGroup").hide();
    }

    function fnValidateGroup() {
        if ($("#txtGroupName").val().trim() === "") {
            Swal.fire("Validation", "Group Name is required", "warning");
            $("#txtGroupName").focus();
            return false;
        }

        if ($("#txtGroupType").val().trim() === "") {
            Swal.fire("Validation", "Group Type is required", "warning");
            $("#txtGroupType").focus();
            return false;
        }

        if ($("#chkIsFixedAmt").is(":checked") && $("#txtFixedAmt").val().trim() === "") {
            Swal.fire("Validation", "Fixed Amount is required when FixedAmt is checked", "warning");
            $("#txtFixedAmt").focus();
            return false;
        }

        return true;
    }



    var tbl;

    function initDataTable() {
        tbl = $("#gridUnit").DataTable({
            destroy: true,
            pageLength: 50,
            searching: true,
            ordering: false,
            lengthMenu: [5, 10, 20, 50]
        });
    }

});
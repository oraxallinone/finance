$(function () {
    // call on year/month change or page ready
    $("#ddlYear, #ddlMonth").on("change", function () {
        debugger
        var y = parseInt($("#ddlYear").val(), 10) || 0;
        var m = parseInt($("#ddlMonth").val(), 10) || 0;
        if (y > 0 && m > 0) {
            GetBudgetOverview(y, m);
        }
    });

    function GetBudgetOverview(year, month) {
        $.ajax({
            url: "/BudgetOverview/BudgetOverview",
            type: "GET",
            data: { year: year, month: month },
            dataType: "json",
            success: function (res) {
                bindGridOverview(res || []);
            },
            error: function (xhr, status, err) {
                console.error("BudgetOverview error:", err);
            }
        });
    }

    function bindGridOverview(list) {
        var $tbody = $("#gridGroupOverview tbody");
        $tbody.empty();
        if (!list || !list.length) {
            $tbody.html('<tr><td colspan="5" class="text-center">No data found</td></tr>');
            return;
        }
        var html = "";
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var no = i + 1;
            html += "<tr>";
            html += "<td class='text-center' style='width:5%'>" + no + "</td>";
            html += "<td style='width: 15%; text-align: left;'>" + (item.GroupName || '') + "</td>";
            html += "<td style='width:20%;text-align: left;'>" + (item.SumAmount != null ? parseFloat(item.SumAmount).toFixed(2) : "0.00") + "</td>";
            html += "<td style='width:20%' class='text-right'>" + (item.FixedAmount != null ? parseFloat(item.FixedAmount).toFixed(2) : "0.00") + "</td>";
            var remaining = (parseFloat(item.FixedAmount || 0) - parseFloat(item.SumAmount || 0));
            html += "<td class='text-right'>" + remaining.toFixed(2) + "</td>";
            html += "</tr>";
        }
        $tbody.html(html);
    }

    // expose functions if needed
    window.GetBudgetOverview = GetBudgetOverview;
    window.bindGridOverview = bindGridOverview;
});
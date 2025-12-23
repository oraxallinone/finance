$(function () {
    // Load dashboard on button click
    $("#btnLoadDashboard").on("click", function () {
        LoadDashboardData();
    });

    // Load on year/month change
    $("#ddlYearDash, #ddlMonthDash").on("change", function () {
        LoadDashboardData();
    });

    function LoadDashboardData() {
        var year = parseInt($("#ddlYearDash").val(), 10) || 0;
        var month = parseInt($("#ddlMonthDash").val(), 10) || 0;

        if (year === 0 || month === 0) {
            //alert("Please select Year and Month");
            return;
        }

        $.ajax({
            url: "/BudgetOverview/BudgetOverview",
            type: "GET",
            data: { year: year, month: month },
            dataType: "json",
            success: function (res) {
                BindDashboardCards(res || []);
            },
            error: function (xhr, status, err) {
                console.error("LoadDashboardData error:", err);
                alert("Error loading dashboard data.");
            }
        });
    }

    function BindDashboardCards(list) {
        if (!list || !list.length) {
            $("#gridGroupBreakdown tbody").html('<tr><td colspan="6" class="text-center">No data found</td></tr>');
            ResetCards();
            return;
        }

        var totalBudget = 0;
        var totalSpent = 0;
        var tableHtml = "";

        $.each(list, function (idx, item) {
            var no = idx + 1;
            var spent = parseFloat(item.SumAmount || 0);
            var budget = parseFloat(item.FixedAmount || 0);
            var remaining = budget - spent;
            var percentage = budget > 0 ? ((spent / budget) * 100).toFixed(1) : 0;

            totalBudget += budget;
            totalSpent += spent;

            tableHtml += "<tr>";
            tableHtml += "<td class='text-center'>" + no + "</td>";
            tableHtml += "<td>" + (item.GroupName || "") + "</td>";
            tableHtml += "<td class='text-right amount-value'>₹ " + budget.toFixed(0) + "</td>";
            tableHtml += "<td class='text-right spent-value'>₹ " + spent.toFixed(0) + "</td>";

            if (budget > 0) { tableHtml += "<td class='text-right remaining-value'>₹ " + remaining.toFixed(0) + "</td>"; }
            else { tableHtml += "<td class='text-right remaining-value'>" + spent.toFixed(0) + "</td>"; }

            tableHtml += "<td class='text-center'>";
            if (budget > 0) { tableHtml += "<div class='progress-bar-container'>"; }

            tableHtml += percentage > 100// keep 234.1% in 100%
                                        ? "<div class='progress-bar-fill-over' style='width:100%'>" + percentage + "%</div>"
                                        : "<div class='progress-bar-fill' style='width:" + percentage + "%'>" + percentage + "%</div>";

            if (budget > 0) { tableHtml += "</div>"; }
            tableHtml += "</td>";
            tableHtml += "</tr>";
        });

        $("#gridGroupBreakdown tbody").html(tableHtml);

        // Update dashboard cards
        var totalRemaining = totalBudget - totalSpent;
        var totalPercentage = totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(1) : 0;

        $("#dashTotalBudget").text("₹ " + totalBudget.toFixed(0));
        $("#dashSpendingAmount").text("₹ " + totalSpent.toFixed(0));
        $("#dashRemainingAmount").text("₹ " + totalRemaining.toFixed(0));
        $("#dashPercentage").text(totalPercentage + "%");
    }

    function ResetCards() {
        $("#dashTotalBudget").text("₹ 0.00");
        $("#dashSpendingAmount").text("₹ 0.00");
        $("#dashRemainingAmount").text("₹ 0.00");
        $("#dashPercentage").text("0%");
    }
});
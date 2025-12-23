$(document).ready(function () {
    Get4Group();

    let spendingData = [];

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    $('#btnCalederSearch').click(function () {
        getList();
    });

    $('#ddlGroup1').change(function () {
        //$("#ddlGroup2  option:first").prop("selected", "selected");
        //$("#ddlGroup3  option:first").prop("selected", "selected");
        //getList();
    });

    $(document).on('change', '#ddlGroup2', function () {
        //$("#ddlGroup1  option:first").prop("selected", "selected");
        //$("#ddlGroup3  option:first").prop("selected", "selected");
        //getList();
    });

    $('#ddlGroup3').change(function () {
        //$("#ddlGroup1  option:first").prop("selected", "selected");
        //$("#ddlGroup2  option:first").prop("selected", "selected");
        //getList();
    });

    $('#ddlMonth').change(function () {
        //getList();
    });

    $('#ddlYear').change(function () {
        //getList();
    });

    //#get monthwise dates
    function getList() {

        $('.spending').remove();           // Remove ₹amount display
        $('.highlight').removeClass('highlight'); // Remove color highlights

        let forYear = $('select#ddlYear option:selected').val();
        let forMonth = $('select#ddlMonth option:selected').val();

        let g1 = $('select#ddlUpdateG1 option:selected').val();
        let g2 = $('select#ddlUpdateG2 option:selected').val();
        let g3 = $('select#ddlUpdateG3 option:selected').val();
        let g4 = $('select#ddlUpdateG4 option:selected').val();

        //if (forYear == 0 || forMonth == "-- select --") {
        //    return false;
        //}

        //if (forGroup1 == 0 && forGroup2 == 0 && forGroup3 == 0 && forGroup4 == 0) {
        //    return false;
        //}

        //if (forGroup2 != "" && forGroup1 != "" && forGroup3 != "") {
        //    $("#tblExpensive").empty();
        //    return;
        //}

        //if (forMonth == "-- select --") {
        //    $("#tblExpensive").empty();
        //    return;
        //}

        let CalenderBudgetModelIn = {
            forYear: forYear,
            forMonth: forMonth,
            g1: g1,
            g2: g2,
            g3: g3,
            g4: g4
        }

        $.ajax({
            type: "POST",
            url: '/Calender/GetDataForCalender',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(CalenderBudgetModelIn),
            success: function (result) {
                //Main calender function execute form here
                const today = new Date(result.calenderDate[0].toDate);//last day of this month

                const monthStart = new Date(result.calenderDate[0].fromDate);
                const monthEnd = new Date(result.calenderDate[0].toDate);

                const fromMonth = monthStart.getMonth();
                const fromYear = monthStart.getFullYear();
                const toMonth = monthEnd.getMonth();
                const toYear = monthEnd.getFullYear();

                function stripTime(dateTimeStr) {
                    return dateTimeStr.split(" ")[0];
                }

                //monthMaster
                spendingData = [];
                $.each(result.calenderData, function (index, data) {
                    let tempObj = { date: stripTime(data.date), amount: data.spending };
                    spendingData.push(tempObj);
                });

                generateCalendar(fromMonth, fromYear, 'prev-calendar', 'prev-calendar-title');
                generateCalendar(toMonth, toYear, 'curr-calendar', 'curr-calendar-title');
            },
            error: function (xhr) {
                alert('Error: ' + xhr.statusText);
            }
        });
    }

    function generateCalendar(month, year, calendarId, titleId) {

        const calendar = $(`#${calendarId}`);
        const title = $(`#${titleId}`);
        calendar.empty();

        title.text(`${monthNames[month]} ${year}`);

        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // Day headers
        for (let d of daysOfWeek) {
            calendar.append(`<div class='day-head header'>${d}</div>`);
        }

        // Blank slots before first day
        for (let i = 0; i < firstDay; i++) {
            calendar.append(`<div class='day'></div>`);
        }

        // Days with spending
        for (let day = 1; day <= lastDate; day++) {
            const fullDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

            const spend = spendingData.find(s => s.date == fullDate);
            const highlightClass = spend ? 'highlight' : '';
            const spendingHtml = spend ? `<div class='spending'>₹${spend.amount}</div>` : '';

            calendar.append(`
                <div class='day ${highlightClass}'>
                    ${day}
                    ${spendingHtml}
                </div>
            `);
        }
    }

    function Get4Group() {
        $.ajax({
            url: "/Budget/Get4Group",
            type: "GET",
            dataType: "json",
            success: function (res) {
                if (res) {
                    // Populate G1 dropdown
                    if (res.G1Groups && res.G1Groups.length > 0) {
                        $.each(res.G1Groups, function (idx, item) {
                            $("#searchDDlG1").append($('<option></option>').attr('value', item.GroupId).text(item.GroupName));
                            $("#ddlUpdateG1").append($('<option></option>').attr('value', item.GroupId).text(item.GroupName));
                        });
                    }

                    // Populate G2 dropdown
                    if (res.G2Groups && res.G2Groups.length > 0) {
                        $.each(res.G2Groups, function (idx, item) {
                            $("#searchDDlG2").append($('<option></option>').attr('value', item.GroupId).text(item.GroupName));
                            $("#ddlUpdateG2").append($('<option></option>').attr('value', item.GroupId).text(item.GroupName));
                        });
                    }

                    // Populate G3 dropdown
                    if (res.G3Groups && res.G3Groups.length > 0) {
                        $.each(res.G3Groups, function (idx, item) {
                            $("#searchDDlG3").append($('<option></option>').attr('value', item.GroupId).text(item.GroupName));
                            $("#ddlUpdateG3").append($('<option></option>').attr('value', item.GroupId).text(item.GroupName));
                        });
                    }

                    // Populate G4 dropdown
                    if (res.G4Groups && res.G4Groups.length > 0) {
                        $.each(res.G4Groups, function (idx, item) {
                            $("#searchDDlG4").append($('<option></option>').attr('value', item.GroupId).text(item.GroupName));
                            $("#ddlUpdateG4").append($('<option></option>').attr('value', item.GroupId).text(item.GroupName));
                        });
                    }
                }
            },
            error: function (xhr, status, error) {
                alert("Error loading groups: " + error);
                console.log(xhr.responseText);
            }
        });
    }

});
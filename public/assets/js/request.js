"use strict";

$(document).ready(function() {


    $("#accountId").change(function() {
        var id = document.getElementById("accountId").value;
        console.log(id)
        $.ajax({

            url: '/subscriptions/agences/' + id,
            type: 'GET',
            cache: false,
            success: function(data) {
                console.log(data)
            }
        }).done(function(data) {
            var html = '';
            for (let i = 0; i < data.length; i++) {
                const element = data[i]
                html += '<option value="' + element.id + '">' + element.name + '</option>';
                document.getElementById('agenceId').innerHTML = html;
            }
        });


    });
});

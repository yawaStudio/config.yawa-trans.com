"use strict";

function v_ticket(ticket_id) {
  var imsi = document.getElementById('imsi').value;

  $.ajax({
    url: '/sims/search',
    type: 'POST',
    cache: false,
    data: {
      imsi: imsi,
    },
    success: function (data) {
      var response = JSON.stringify(data);
      console.log(response);

    }
  });

}

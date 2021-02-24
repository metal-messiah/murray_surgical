let dbResults = [];
let fuse;
let dbKeys = ['name', 'phone', 'date', 'time', 'response', 'updated_at', 'created_at', 'lang', 'reason'];
const dbUrl = `https://murray-surgical.herokuapp.com`;
let calendar;
let timeline;

$(document).ready(() => {
  $.ajax({
    url: `${dbUrl}/api/wake`,
    type: 'GET',
    success: function (data) {
      console.info('Server is listening!');
    },
  });
});

$('#refreshButton').click(() => {
  $('#resultsTable').html('');
  $('#form').submit();
});

$('#clearButton').click(() => {
  generateResultsTable(dbResults);

  $('#searchInput').val('');
});

$('#todayButton').click(() => {
  $('#todaysSchedule').toggle();
  $('#timeline').toggle();
});

$('#calendarButton').click(() => {
  $('#calendar').toggle();
});

$('#search').submit(function (e) {
  e.preventDefault();

  let { searchInput } = $('#search')
    .serializeArray()
    .reduce(function (obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});
  let result = fuse.search(searchInput);

  generateResultsTable(result);
});

const formatTime = time => {
  let t = time.toLowerCase();
  if (!t.includes(' ')) {
    if (t.includes('am')) {
      t = [t.split('am')[0], ' AM'];
    }
    if (t.includes('pm')) {
      t = [t.split('pm')[0], ' PM'];
    }
  }
  if (!t.includes(':')) {
    t = t.slice(0, 1) + ':00' + t.slice(1);
  }
  return t;
};

$('#form').submit(function (e) {
  e.preventDefault();
  $('#submitIcon').toggleClass('fa-database');
  $('#submitIcon').toggleClass('fa-spinner');
  $('#submitIcon').toggleClass('fa-spin');
  $.ajax({
    url: $('#form').attr('action'),
    type: 'POST',
    data: $('#form').serialize(),
    success: function (data) {
      $('#submitIcon').toggleClass('fa-database');
      $('#submitIcon').toggleClass('fa-spinner');
      $('#submitIcon').toggleClass('fa-spin');

      data.sort((a, b) => {
        let aTime = formatTime(a.time);
        let bTime = formatTime(b.time);
        return Date.parse(`${b.date} ${bTime}`) - Date.parse(`${a.date} ${aTime}`);
      });
      console.log('sorted data');
      dbResults = Object.assign([], data);

      const options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: dbKeys,
      };
      fuse = new Fuse(dbResults, options); // "list" is the item array

      $('#form').hide();
      $('#search').show();

      generateResultsTable(data);
    },
    error: function (data) {
      $('#submitIcon').toggleClass('fa-database');
      $('#submitIcon').toggleClass('fa-spinner');
      $('#submitIcon').toggleClass('fa-spin');
      $('#resultsTable').html(`<tr class='danger'><td>${data.responseText}</td></tr>`);
    },
  });
  return false;
});

const generateResultsTable = data => {
  console.log('generate results table');
  const headerRow = `<thead><tr>
			  <th scope="col"></th>
              <th scope="col">Type</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Response</th>
              <th scope="col" class="hidden-xs">Language</th>
			  <th class="hidden-xs" scope="col">Created</th>
              <th class="hidden-xs" scope="col">Updated</th>
              <th class="hidden-xs" scope="col">Sent Survey</th>
          </tr></thead>`;

  const bodyRows = data
    .map(row => {
      //   const localTimeStamp = convertUTCDateToLocalDate(new Date(row.updated_at));
      const targetDate = !isNaN(Date.parse(row.date)) ? Date.parse(`${row.date} ${row.time}`) : new Date(row.date);
      const now = new Date();
      let rowcss = targetDate - now < 0 ? 'warning text-muted' : '';

      row.updated_at = new Date(row.updated_at).toDateString();
      row.created_at = new Date(row.created_at).toDateString();
      row.surveyed_at = row.surveyed_at ? new Date(row.surveyed_at).toDateString() : null;

      let responsecss = 'warning';
      let surveycss = !rowcss ? (row.surveyed_at ? 'success' : 'danger') : rowcss;

      if (!rowcss) {
        if (row.response === 'no') {
          responsecss = 'danger';
        }
        if (row.response !== null && row.response !== 'no') {
          responsecss = 'success';
        }
      }

      return `
			  <tr class=${rowcss}>
				<td class="td-menu">
					<div class="dropdown">
						<button class="btn dropdown-toggle" type="button" data-toggle="dropdown">
							<i class="fas fa-ellipsis-v"></i>
						</button>
						<ul class="dropdown-menu">
							<li>
								<div class="send-update" data-record-id="${row.id}" data-name="${row.name}">
									<i class="fas fa-sync"></i> Send Update Text
								</div>
							</li>
							<li>
								<div class="send-survey" data-record-id="${row.id}" data-name="${row.name}">
									<i class="fas fa-poll"></i> Send Survey
								</div>
							</li>
							<li>
								<div class="delete" data-record-id="${row.id}" data-name="${row.name}">
									<i class="fas fa-trash"></i> Delete
								</div>
							</li>
						</ul>
					</div>
				</td>
				<td data-field="reason" data-record-id=${row.id} contenteditable="true" title="Click to Update">${row.reason}</td>
                <td data-field="name" data-record-id="${row.id}" contenteditable="true" title="Click to Update">${row.name}</td>
                <td data-field="phone" data-record-id="${row.id}">${row.phone}</td>
                <td data-field="date" data-record-id="${row.id}" contenteditable="true" title="Click to Update">${row.date}</td>
                <td data-field="time" data-record-id="${row.id}" contenteditable="true" title="Click to Update">${row.time}</td>
                <td class=${responsecss} data-field="response" data-record-id="${row.id}">${row.response}</td>
                <td class="hidden-xs" data-field="lang" data-record-id="${row.id}" contenteditable="true" title="Click to Update">${row.lang}</td>
                <td class="hidden-xs" data-field="created_at" data-record-id="${row.id}" >${row.created_at}</td>
                <td class="hidden-xs" data-field="updated_at" data-record-id="${row.id}" >${row.updated_at}</td>
                <td class="hidden-xs ${surveycss}" data-field="sent_survey" data-record-id="${row.id}" >${row.surveyed_at ? row.surveyed_at : 'False'}</td>
              </tr>`;
    })
    .join('');

  $('#resultsTable').html(headerRow.concat(bodyRows));

  $('td').on('blur', e => {
    const { target } = e;
    const { recordId, field } = $(target).data();

    const idx = dbResults.findIndex(v => v.id === recordId);
    const existingVal = dbResults[idx][field];
    const newVal = $(target).text();

    if (newVal !== existingVal) {
      updateRecord(recordId, field, newVal);
    }
  });

  $('.send-update').click(e => {
    let { recordId, name } = $(e.target).data();
    let shouldSend = confirm(`Are you sure you want to send an update message to ${name}?`);
    if (shouldSend) {
      const authKey = getAuthKey();
      $.ajax({
        url: `${dbUrl}/api/send-update-sms/${recordId}`,
        type: 'POST',
        data: { authKey },
        success: function (data) {
          alert('Successfully Sent Update Text');
        },
        error: function (data) {
          alert(data);
        },
      });
    }
  });

  $('.send-survey').click(e => {
    let { recordId, name } = $(e.target).data();
    let shouldSend = confirm(`Are you sure you want to send a survey to ${name}?`);
    if (shouldSend) {
      const authKey = getAuthKey();
      $.ajax({
        url: `${dbUrl}/api/send-survey-sms/${recordId}`,
        type: 'POST',
        data: { authKey },
        success: function (data) {
          alert('Successfully Sent Survey');
          const idx = dbResults.findIndex(v => v.id === recordId);
          dbResults[idx]['surveyed_at'] = new Date().toDateString();

          refreshList();
        },
        error: function (data) {
          console.error(data);
          alert('Something went wrong!');
        },
      });
    }
  });

  $('.delete').click(e => {
    let { recordId, name } = $(e.target).data();
    let shouldSend = confirm(`Are you sure you want to PERMANENTLY delete ${name}'s record?`);
    if (shouldSend) {
      if (shouldSend) {
        const authKey = getAuthKey();
        $.ajax({
          url: `${dbUrl}/api/contacts/${recordId}`,
          type: 'DELETE',
          data: { authKey },
          success: function (data) {
            alert('Deleted Record!');
            const idx = dbResults.findIndex(v => v.id === recordId);
            dbResults.splice(idx, 1);

            refreshList();
          },
          error: function (data) {
            console.error(data);
            alert('Something went wrong!');
          },
        });
      }
    }
  });

  if (!calendar) {
    populateCalendar(data);
  }
  if (!timeline) {
    populateTimeline(data);
  }
};

const populateCalendar = data => {
  calendar = new Calendar(data);
};

const populateTimeline = data => {
  timeline = new Timeline(data);
};

const updateRecord = (id, field, val) => {
  console.log('update record');

  const authKey = getAuthKey();

  $.ajax({
    url: `${dbUrl}/api/contacts/${id}`,
    type: 'PATCH',
    data: { authKey: authKey, [field]: val },
    success: function (data) {
      if (field === 'date' || field === 'time') {
        alert("You've changed something critical... (appt. date or time).  Click 'Send Update Text' to notify the client of the changes.");
      }
      const idx = dbResults.findIndex(v => v.id === id);
      dbResults[idx][field] = val;
      dbResults[idx]['updated_at'] = new Date().toDateString();

      refreshList();
    },
    error: data => {
      console.error(data);
      alert('Something went wrong!');
    },
  });
};

const getAuthKey = () => {
  let { authKey } = $('#form')
    .serializeArray()
    .reduce(function (obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});

  return authKey;
};

const refreshList = () => {
  let { searchInput } = $('#search')
    .serializeArray()
    .reduce(function (obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});

  if (searchInput) {
    $('#search').submit();
  } else {
    $('#clearButton').click();
  }
};

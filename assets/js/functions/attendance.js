const tablePaper = document.getElementById('table-paper');
tablePaper.style.display = 'none';

$(document).ready(function() {
  getAttendances();
});

function getAttendances() {
  const tablePaper = document.getElementById('table-paper');
  tablePaper.style.display = 'none';

  $.ajax({
    url: 'https://e-attendance-development.herokuapp.com/api/attendance',
    contentType: 'application/json',
    crossOrigin: true,
    crossDomain: true,
    type: 'GET',
    success(response) {
      const { data } = response;
      const tableBodyLight = document.getElementById('tbody-light');
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };

      let tableRow = '';

      if (data.length === 0) {
        tableRow = `<tr><td>
                      <span class="badge badge-dot mr-4">
                        No Data
                      </span>
                    </td></tr>`;
      }

      for (let i = 0; i < data.length; i++) {
        console.log(data[i].user.name);
        tableRow += `<tr>
                    <th scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="mb-0 text-sm">${data[i].user.name ||
                            '-'}</span>
                        </div>
                      </div>
                    </th>
                    <td>
                      <span class="badge badge-dot mr-4">
                         ${data[i].classroom || '-'}
                      </span>
                    </td>
                    <td>
                      <span class="badge badge-dot mr-4">
                         ${data[i].user.grade || '-'}
                      </span>
                    </td>
                    
                    <td>
                     ${new Date(data[i].checkInTime).toLocaleDateString(
                       'id-ID',
                       options
                     )}
                    </td>
                    <td>
                      <span class="badge badge-dot mr-4">
                         ${
                           data[i].checkOutTime
                             ? new Date(
                                 data[i].checkOutTime
                               ).toLocaleDateString('id-ID', options)
                             : '-'
                         }
                      </span>
                    </td>
                    <td>
                      <span class="badge badge-dot">
                        ${
                          data[i].status === 'Checkin'
                            ? '<i class="bg-danger"></i>'
                            : '<i class="bg-success"></i>'
                        }
                        ${data[i].status || '-'}
                      </span>
                    </td>
                    
                    <td class="text-right">
                      <div class="dropdown">
                        <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                          <a class="dropdown-item" href="#">Action</a>
                          <a class="dropdown-item" href="#">Another action</a>
                          <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                      </div>
                    </td>
                  </tr>`;
      }

      tableBodyLight.innerHTML += tableRow;
      const loader = document.getElementById('loader-screen');
      const footer = document.getElementById('footer');
      const tablePaper = document.getElementById('table-paper');
      loader.style.display = 'none';
      footer.style.display = 'block';
      tablePaper.style.display = 'block';
    },
    error(jqXHR, textStatus) {
      const loader = document.getElementById('loader-screen');
      const tablePaper = document.getElementById('table-paper');
      const tableBodyLight = document.getElementById('tbody-light');
      let tableRow = '';
      tableRow = `<tr><td>
                      <span class="badge badge-dot mr-4">
                        No Data
                      </span>
                    </td></tr>`;

      loader.style.display = 'none';
      tablePaper.style.display = 'block';
      tableBodyLight.innerHTML += tableRow;
    }
  });
}

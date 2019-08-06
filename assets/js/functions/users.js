const tablePaper = document.getElementById('table-paper');
tablePaper.style.display = 'none';

$(document).ready(function() {
  getUsers();
});

function deleteUser(userId) {
  const loader = document.getElementById('loader-screen');
  loader.style.display = 'block';

  $.ajax({
    url: `https://e-attendance-development.herokuapp.com/api/users/${userId}`,
    contentType: 'application/json',
    crossOrigin: true,
    crossDomain: true,
    type: 'DELETE',
    success(response) {},
    error(jqXHR) {
      const loader = document.getElementById('loader-screen');
      loader.style.display = 'none';
    }
  }).done(function() {
    window.location.reload();
  });
}

function getUsers() {
  const tablePaper = document.getElementById('table-paper');
  const loader = document.getElementById('loader-screen');
  loader.style.display = 'block';
  tablePaper.style.display = 'none';

  $.ajax({
    url: 'https://e-attendance-development.herokuapp.com/api/users',
    contentType: 'application/json',
    crossOrigin: true,
    crossDomain: true,
    type: 'GET',
    success(response, textStatus, jqXHR) {
      const { data } = response;
      const tableBodyLight = document.getElementById('tbody-light');
      let tableRow = '';

      if (data.length === 0) {
        tableRow = `<tr><td>
                      <span class="badge badge-dot mr-4">
                        No Data
                      </span>
                    </td></tr>`;
      }

      for (let i = 0; i < data.length; i++) {
        tableRow += `<tr>
                    <th scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="mb-0 text-sm">${data[i].name ||
                            '-'}</span>
                        </div>
                      </div>
                    </th>
                    <td>
                     ${data[i].grade || '-'}
                    </td>
                    <td>
                      <span class="badge badge-dot mr-4">
                        ${data[i].nis || '-'}
                      </span>
                    </td>
                    <td>
                      <span class="badge badge-dot mr-4">
                     ${data[i].birthdate || '-'}
                      </span>
                    </td>
                    <td>
                      <div class="media-body">
                          <span class="mb-0 text-sm">${data[i].imei ||
                            '-'}</span>
                        </div>
                    </td>
                    <td class="text-right">
                      <div class="dropdown">
                        <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                          <a class="dropdown-item" onclick="deleteUser('${
                            data[i]._id
                          }')">Delete</a>
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
    error(jqXHR) {
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

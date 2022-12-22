$(document).ready(onReady);

function onReady() {
  renderTask();
  $('#enterButton').on('click', addTask);
  $('body').on('click', '.deleteButton', deleteTask);
  $('body').on('click', '.completeButton', completeTask);
}
function renderTask() {
  $.ajax({
    type: 'GET',
    url: '/weekend-to-do-app',
  })
    .then((res) => {
      $('#renderInfo').empty();
      for (let jobs of res) {
        $('#renderInfo').append(`
            <tr ${conditionalBackgroundColor(jobs)}>
                <td>${jobs.job}</td>
                <td>${jobs.description}</td>
                <td data-status=${jobs.status}>${jobs.status}</td>
                <td>conditional calculation here</td>
                <td><button class="completeButton" data-id=${jobs.id}>DONE</button></td>
                <td><button class="deleteButton" data-id=${jobs.id}>DELETE</button></td>
            </tr>
            `);
      }
      $('#jobInput').val('');
      $('#descriptionInput').val('');
    })
    .catch((error) => {
      console.log('GET route broke: client side', error);
    });
}

function addTask() {
  let jobInput = $('#jobInput').val();
  let descriptionInput = $('#descriptionInput').val();

  let postNewJob = {
    job: jobInput,
    description: descriptionInput,
    status: 'INCOMPLETE',
  };
  $.ajax({
    method: 'POST',
    url: '/weekend-to-do-app',
    data: postNewJob,
  })
    .then((response) => {
      renderTask();
    })
    .catch((error) => {
      console.log('something broke in POST: clientside', error);
    });
}

function deleteTask() {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'This job has been deleted.',
        'success'
      )
      let deleteThis = $(this).data().id;
  $.ajax({
    method: 'DELETE',
    url: `/weekend-to-do-app/${deleteThis}`,
  })
    .then((response) => {
      renderTask();
    })
    .catch((error) => {
      console.log('something broke in DELETE: client side', error);
    });
    }
  })
}

function completeTask() {
  Swal.fire({
    title: 'Submit your first name',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Enter',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${result.value.login}'s avatar`,
        imageUrl: result.value.avatar_url
      })
      let updateStatus = $(this).data().id;
      $.ajax({
        method: 'PUT',
        url: `/weekend-to-do-app/${updateStatus}`,
        data: {
          status: 'COMPLETE',
        },
      })
        .then((response) => {
          
          renderTask();
        })
        .catch((error) => {
          console.log('something broke in PUT: client side', error);
        });
    }
  })
  
}

function conditionalBackgroundColor(jobs) {
  if (jobs.status === 'COMPLETE') {
    return 'class="background"';
  } else {
    return 'class="default"';
  }
}

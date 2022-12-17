$(document).ready(onReady)

function onReady(){
    renderTask()
    $('#enterButton').on('click', addTask)
    $('body').on('click', '.deleteButton',  deleteTask)
}

function renderTask(){
    $.ajax({
            type: 'GET',
            url: '/weekend-to-do-app'
    }).then((res)=>{
        $('#renderInfo').empty()
        for (let jobs of res){
            $('#renderInfo').append(`
            <tr>
                <td>${jobs.job}</td>
                <td>${jobs.description}</td>
                <td><button class="completeButton">COMPLETE</button></td>
                <td><button class="deleteButton" data-id=${jobs.id}>DELETE</button></td>
            </tr>
            `)
        }
    }).catch((error)=>{
        console.log('GET route broke: client side', error);
    })

    $('#jobInput').val('')
    $('#descriptionInput').val('')
}

function addTask(){

    let jobInput = $('#jobInput').val()
    let descriptionInput = $('#descriptionInput').val()

    let postNewJob = {
        job: jobInput,
        description: descriptionInput
    }
    $.ajax({
        method: 'POST',
        url: '/weekend-to-do-app',
        data: postNewJob
      }).then ((response) => {
        renderTask();
      }).catch((error) => {
        console.log('something broke in POST: clientside', error);
      })

}

function deleteTask(){
    let deleteThis = $(this).data().id
    $.ajax({
      method: 'DELETE',
      url: `/weekend-to-do-app/${deleteThis}`,
    }).then((response)=>{
      renderTask()
    }).catch((error) =>{
      console.log('something broke in DELETE: client side', error);
    })
}
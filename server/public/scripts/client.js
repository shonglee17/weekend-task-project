$(document).ready(onReady)

function onReady(){
    renderTask()
    $('#enterButton').on('click', addTask)
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
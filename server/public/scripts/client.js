$(document).ready(onReady)

function onReady(){
    console.log('everything is linked');
    renderTask()
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
}
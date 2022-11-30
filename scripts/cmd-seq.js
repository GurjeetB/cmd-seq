function addCommandRow(){
    $(`#cmd_input`).append(`
    <form action="#" class="cmd_row">
                    <input type="text" name="Command" id="command">
                    <input type="number" name="Time" id="time">
                    <select name="Type" id="pulsetype">
                        <option value="impulse" selected>Impulse</option>
                        <option value="repeat">Repeating</option>
                    </select>
                </form>
    `);
    updateResult();
}

function updateResult(){
    let html = ``;
    let initialTicks = 0;
    let totalTicks = 0;
    let realTicks = 0;
    let command = ``;
    let duration = ``;
    let pulse = ``;
    $(`form`).each(function(){
        command = $(this).find(`#command`).val();
        duration = $(this).find(`#time`).val();
        pulse = $(this).find(`select#pulsetype`).val();
        totalTicks += Math.round(duration * 20);

        if(pulse == "impulse"){
            realTicks = `${initialTicks}`;
        }else{
            realTicks = `${initialTicks} .. ${totalTicks}`;
        }
        initialTicks += Math.round(duration * 20);
        html += `${command} | ${realTicks} | ${pulse}\n`;
    });
    $(`#list_of_commands`).text(html);
}

$(`#add_row`).click(addCommandRow);

$(`#cmd_input`).change(updateResult);
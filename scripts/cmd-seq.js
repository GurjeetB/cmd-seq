// Defines the function for adding a new event to the sequence
function addCommandRow(){
    // It adds a form. That's literally it
    $(`#cmd_input`).append(`
    <form action="#" class="cmd_row">
                    <input type="text" name="Command" placeholder="Command" id="command">
                    <input type="number" min="0" value="0" name="Time" id="time">
                    <select name="Type" id="pulsetype">
                        <option value="impulse" selected>Impulse</option>
                        <option value="repeat">Repeating</option>
                    </select>
                </form>
    `);

    // Updates the final result
    updateResult();
}

// Defines the function for updating the final result
function updateResult(){
    let html = ``;
    // Determines when the function starts running commands
    let initialTicks = 0;
    // Determines when the function stops running commands
    let totalTicks = 0;
    let realTicks = ``;
    // Fetches the selected function prefix
    let cmd_objective = `${$(`#cmd_prefix`).val()}_timer`;

    // Updates the command for creating the scoreboard
    $(`#objective_creator`).html(`scoreboard objectives add ${cmd_objective} dummy`);

    // Updates the command for starting the sequence
    $(`#sequence_starter`).html(`scoreboard players add value ${cmd_objective} 0`);

    // For each form:
    $(`form`).each(function(){
        // Fetches all user input
        let command = $(this).find(`#command`).val();
        let duration = $(this).find(`#time`).val();
        let pulse = $(this).find(`select#pulsetype`).val();
        // Gets the current total time
        totalTicks += Math.round(duration * 20);

        // If the current command is set to run once
        if(pulse == "impulse"){
            // Runs the command only once
            realTicks = `${initialTicks}`;
        // If the current command is set to repeat for the whole duration
        }else{
            // Runs the command for the whole duration
            realTicks = `${initialTicks} .. ${totalTicks}`;
        }
        // The 
        initialTicks += Math.round(duration * 20);
        // Adds the command to the final output
        html += `execute if score value ${cmd_objective} matches ${realTicks} run ${command}\n`;
    });
    // Updates the code block with the final output
    $(`#list_of_commands`).html(html)
}

updateResult();

$(`#add_row`).click(addCommandRow);

$(`#cmd_prefix`).change(updateResult);
$(`#cmd_input`).change(updateResult);
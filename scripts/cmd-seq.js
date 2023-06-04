// Defines the function for adding a new event to the sequence
function addCommandRow(){
    // It adds a form. That's literally it
    $(`#cmd_input`).append(`
    <form action="#" class="cmd_row">
                        <input type="text" class="user_input dialogue" name="Dialogue" placeholder="Dialogue">
                        <input type="number" class="user_input timestamp" min="0" name="Time" placeholder="Timestamp (seconds)">
                    </form>
    `);

    // Updates the final result
    updateResult();
}

// Defines the function for removing the most recent event
function removeCommandRow(){
    // Counts how many rows there are
    let numberOfRows = $(`.cmd_row`).length;
    // If there's more than 1 row:
    if( numberOfRows > 1 ){
        // Removes the most recent row
        $(`.cmd_row`).last().remove();
    }

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

    // Updates the command for making the sequence progress
    html += `execute if score value ${cmd_objective} matches 0.. run scoreboard players add value ${cmd_objective} 1\n`;

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
            realTicks = `${initialTicks + 1}`;
        // If the current command is set to repeat for the whole duration
        }else{
            // Runs the command for the whole duration
            realTicks = `${initialTicks + 1}..${totalTicks}`;
        }
        // The 
        initialTicks += Math.round(duration * 20);
        // Adds the command to the final output
        html += `execute if score value ${cmd_objective} matches ${realTicks} run ${command}\n`;
    });

    //
    html += `execute if score value ${cmd_objective} matches ${totalTicks + 1} run scoreboard players reset value ${cmd_objective}`;

    // Updates the code block with the final output
    $(`#list_of_commands`).html(html)
}

updateResult();

$(`#add_row`).click(addCommandRow);
$(`#remove_row`).click(removeCommandRow);

$(`#cmd_prefix`).change(updateResult);
$(`#cmd_input`).change(updateResult);
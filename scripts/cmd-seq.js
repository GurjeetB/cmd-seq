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
    refreshPage();
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
    refreshPage();
}

function refreshPage() {
    $(`#list_of_commands`).html(updateResult)
}

// Defines the function for updating the final result
function updateResult(){
    let html = ``;
    // Lists all timestamps
    const allTimestamps = [];
    // Fetches the selected function prefix
    let cmd_objective = `${$(`#cmd_prefix`).val()}`;

    // Updates the command for creating the scoreboard
    $(`#objective_creator`).html(`scoreboard objectives add ${cmd_objective} dummy`);

    // Updates the command for starting the sequence
    $(`#sequence_starter`).html(`scoreboard players add time ${cmd_objective} 0`);

    // Updates the command for making the sequence progress
    html += `execute if score time ${cmd_objective} matches 0.. run scoreboard players add value ${cmd_objective} 1\n`;

    // For each form:
    $(`form`).each(function(){
        // Fetches all user input
        let command = $(this).find(`.dialogue`).val();
        let timestamp = $(this).find(`.timestamp`).val();

        // Adds the timestamp to the list
        allTimestamps.push(timestamp);

        // Gets the timestamp equivalent in ticks
        let timestampInTicks = Math.round(timestamp * 20);

        // Adds the command to the final output
        html += `execute if score time ${cmd_objective} matches ${timestampInTicks} run ${command}\n`;
    });

    // Sorts all timestamps by highest to lowest
    allTimestamps.sort(function(a, b){return b-a});
    // Gets the highest timestamp
    let finalTick = Math.round(allTimestamps[0] * 20 + 1)
    // Resets the scoreboard after
    html += `execute if score time ${cmd_objective} matches ${finalTick} run scoreboard players reset time ${cmd_objective}`;

    return html;
}

function loadFromStorage() {
    console.log(`unfinished`);
}

function saveToStorage() {
    console.log(`unfinished`);
}

refreshPage();

$(`#add_row`).click(addCommandRow);
$(`#remove_row`).click(removeCommandRow);

$(`#cmd_prefix`).change(refreshPage);
$(`#cmd_input`).change(refreshPage);

$(`#save_to_storage`).click(saveToStorage);
$(`#load_from_storage`).click(loadFromStorage);
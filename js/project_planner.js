async function minecraftItemsData(version) {
    let items = await (await fetch(`https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/${version}/items.json`)).text()
    return JSON.parse(items)
}


// Get item stack size
function itemStackSize(items, item) {
    for (let elem of items) {
        if (elem.displayName == item) {
            return elem.stackSize
        }
    }
}

// Create a td element with each element of the elements list as child element
function createCell(elements) {
    let cell = document.createElement('td')
    elements.forEach(element => {
        if (typeof element === "string") {
            element = document.createTextNode(element)
        }
        cell.appendChild(element)
    })
    return cell
}


// Fill the row of a table with the given cells
function fillRow(row, cells) {
    cells.forEach(element => {
        row.appendChild(element)
    });
}


// Fill a datalist element with the items given
function fillDatalist(datalist, items) {
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let option = document.createElement('option')
        option.value = item.displayName
        datalist.appendChild(option)
    }
}


// Create the item input and list elements
function createItemInputList(items) {
    let item_list_input = document.createElement('input')
    item_list_input.setAttribute("list", "item-list")
    let item_list = document.createElement('datalist')
    item_list.id = "item-list"
    fillDatalist(item_list, items)

    return [item_list_input, item_list]
}


// Create the stack and rest inputs
function createStackRestInput() {
    let stack_input = document.createElement('input')
    stack_input.type = "number"
    stack_input.setAttribute("min", "0")
    let rest_input = document.createElement('input')
    rest_input.type = "number"
    rest_input.setAttribute("min", "0")

    return [stack_input, rest_input]
}


// Create the amount input
function createAmountInput() {
    let amount_input = document.createElement('input')
    amount_input.type = "number"

    return amount_input
}


// Create a row to put in the table
function createRow(items) {
    let row = document.createElement('tr')


    // Create html elements of row
    let [item_input, item_list] = createItemInputList(items)
    let [stack_input, rest_input] = createStackRestInput()
    let amount_input = createAmountInput()


    // Create cells
    let item_list_cell = createCell([item_input, item_list])
    let stack_rest_cell = createCell([stack_input, "+", rest_input])
    let amount_cell = createCell([amount_input])


    // Inserting elements into row
    fillRow(row, [item_list_cell, stack_rest_cell, amount_cell])
    
    return row
}

document.addEventListener('DOMContentLoaded', async () => {
    let items = await minecraftItemsData("1.21.4")

    const table = document.querySelector(".planner-config table")
    table.appendChild(createRow(items))

    // Add item button add a row each time it's clicked
    const add_item_btn = document.getElementById('add-item-btn')
    add_item_btn.addEventListener('click', async () => {
        table.appendChild(createRow(items))
    })

    // Start project button create a table or edit the actual one
    const start_project_btn = document.getElementById('start-project-btn')
    start_project_btn.addEventListener("click", () => {

    })
})
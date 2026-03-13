const num_cupcakes = 5;

const cupcake_data = cupcakes(num_cupcakes);
const tax_percentage = 0.075;

function frosting_error(i) {
    const frosting_elem = document.getElementById('frosting' + i);
    frosting_elem.style.outline = '2px solid red';
}

function frosting_clear(i) {
    const frosting_elem = document.getElementById('frosting' + i);
    frosting_elem.style.outline = 'none';
}

function purchase() {
    let subtotal = 0;

    // Looping through all cupcakes to calculate the subtotal
    for (let i = 0; i < cupcake_data.length; i++) {
        const qty = parseInt(document.getElementById('quantity' + i).value);

        frosting_clear(i);

        //Only add to subtotal if quantity is greater than 0
        if (qty > 0) {
            subtotal += qty * cupcake_data[i].price;
        }
    }

    //Calculating Tax and Final Total
    const tax = subtotal * tax_percentage;
    const finalTotal = subtotal + tax;

    //Updating the UI with the final values
    document.getElementById('total').textContent =
        `Total: $${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `Tax: $${tax.toFixed(2)}`;
    document.getElementById('total_with_tax').textContent =
        `Total with Tax: $${finalTotal.toFixed(2)}`;

    document.getElementById('message').textContent =
        'Select quantity and frosting for the cupcakes you would like to purchase';
}

function make_header(table) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    let th = document.createElement('th');
    th.textContent = 'ID';
    tr.appendChild(th);
    th = document.createElement('th');
    th.textContent = 'Name';
    tr.appendChild(th);
    th = document.createElement('th');
    th.textContent = 'Frosting';
    tr.appendChild(th);

    // Adding the Price and Quantity headers to match the assignment requirements
    th = document.createElement('th');
    th.textContent = 'Price';
    tr.appendChild(th);

    th = document.createElement('th');
    th.textContent = 'Quantity';
    tr.appendChild(th);

    thead.appendChild(tr);
    table.appendChild(thead);
}

function color_frosting(i, frosting_index) {
    const frosting_elem = document.getElementById('cupcake_frosting' + i);
    const frosting = cupcake_data[i].frosting[frosting_index];
    const [r, g, b] = frosting.color;
    frosting_elem.style.backgroundColor = `rgb(${r},${g},${b})`;
}

function make_frosting_cell(i) {
    const td = document.createElement('td');
    const select = document.createElement('select');
    select.id = 'frosting' + i;
    select.form = 'cupcake';
    select.onchange = () => {
        frosting_clear(i);
        const message_elem = document.getElementById('message');
        message_elem.textContent = '';
        message_elem.style.color = 'white';
        const frosting_elem = document.getElementById('frosting' + i);
        const frosting_index = frosting_elem.value;
        if (frosting_index) {
            color_frosting(i, frosting_index);
        }
    };
    const option = document.createElement('option');
    option.value = '';
    option.textContent = '--';
    select.appendChild(option);
    for (let j = 0; j < cupcake_data[i].frosting.length; j++) {
        const option = document.createElement('option');
        option.value = j;
        option.textContent = cupcake_data[i].frosting[j]['name'];
        select.appendChild(option);
    }
    td.appendChild(select);
    return td;
}

function append_cupcake(td, i) {
    // -----------------
    // |    frosting   |
    // -----------------
    // |    cupcake    |
    // -----------------
    // |      name     |
    // -----------------
    const cupcake = cupcake_data[i];

    // add frosting
    const div_frosting = document.createElement('div');
    div_frosting.id = 'cupcake_frosting' + i;
    div_frosting.className = 'cupcake_frosting';
    div_frosting.style.backgroundColor = 'white';
    td.appendChild(div_frosting);

    const div_cake = document.createElement('div');
    div_cake.id = 'cupcake_cake' + i;
    div_cake.className = 'cupcake_cake';
    const [r, g, b] = cupcake.color;
    div_cake.style.backgroundColor = `rgb(${r},${g},${b})`;
    td.appendChild(div_cake);

    const name_div = document.createElement('div');
    name_div.id = 'cupcake_name' + i;
    name_div.className = 'cupcake_name';
    const p = document.createElement('span');
    p.textContent = cupcake.name;
    name_div.appendChild(p);
    td.appendChild(name_div);
}

function make_row(i, tbody) {
    const tr = document.createElement('tr');

    let td = document.createElement('td');
    td.textContent = cupcake_data[i].id;
    tr.appendChild(td);

    td = document.createElement('td');
    append_cupcake(td, i);
    tr.appendChild(td);

    td = make_frosting_cell(i);
    tr.appendChild(td);

    // Creating the price cell and format the number to two decimal places
    td = document.createElement('td');
    td.textContent = '$' + cupcake_data[i].price.toFixed(2);
    tr.appendChild(td);

    // Creating the quantity cell using a select dropdown instead of an input
    td = document.createElement('td');
    const select = document.createElement('select');
    select.id = 'quantity' + i;

    // Building the dropdown options 0-5 as shown in the demo
    for (let q = 0; q <= 5; q++) {
        const option = document.createElement('option');
        option.value = q;
        option.textContent = q;
        select.appendChild(option);
    }

    td.appendChild(select);
    tr.appendChild(td);

    tbody.appendChild(tr);
}

function display_cupcakes() {
    const table = document.createElement('table');
    make_header(table);

    const tbody = document.createElement('tbody');
    for (let i = 0; i < cupcake_data.length; i++) {
        make_row(i, tbody);
    }
    table.appendChild(tbody);

    // put table in a form
    const form = document.createElement('form');
    form.id = 'cupcake';
    form.appendChild(table);

    // put form in a div separator
    const div = document.createElement('div');
    div.className = 'separator';
    div.appendChild(form);
    document.body.appendChild(div);
}

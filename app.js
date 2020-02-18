function LoadJsonPlayers()
{
    const url = 'https://www.balldontlie.io/api/v1/players'

fetch(url)
.then(response => response.json())
.then (respuesta => {

    var objJson = respuesta.data.length;
    var hiDatosJson =  document.getElementById('valDatos');
    hiDatosJson.value = respuesta;

    PintarTabla(respuesta);
})
.catch(err=>console.log(err))   
}

function Filtro()
{
    var valorFiltro = document.getElementById('txtDatos').value;
    const url = 'https://www.balldontlie.io/api/v1/players'

        fetch(url)
    .then(response => response.json())
    .then (respuesta => {

        var objJson = respuesta.data.length;
        var hiDatosJson =  document.getElementById('valDatos');
        hiDatosJson.value = respuesta;

        PintarTablaConFiltro(respuesta, valorFiltro);
    })
    .catch(err=>console.log(err))  

}

function Limpiar()
{
    document.getElementById("txtDatos").value = "";
    LoadJsonPlayers();
}

function PintarTabla(respuesta)
{
    var col = [];
    for (var i = 0; i < respuesta.data.length; i++) {
        for (var key in respuesta.data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < respuesta.data.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {

            var tabCell = tr.insertCell(-1);
            if(j == 6)
            {
                var team = respuesta.data[i][col[j]];
                tabCell.innerHTML = team["name"];
            }
            else
            {
            tabCell.innerHTML = respuesta.data[i][col[j]];
            }
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);   
}

function PintarTablaConFiltro(respuesta, valorFiltro)
{
    var col = [];
    for (var i = 0; i < respuesta.data.length; i++) {
        for (var key in respuesta.data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < respuesta.data.length; i++) {

        
        var filtroValidacion = true;

        let filtroArray = [
            respuesta.data[i][col[1]] != valorFiltro,
            respuesta.data[i][col[4]] != valorFiltro,
            respuesta.data[i][col[5]] != valorFiltro,
        ]

        if(filtroArray.indexOf(false) === -1)
        {
            filtroValidacion = false;
        }

        if(filtroValidacion)
        {
            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {

                if(filtroValidacion)
                {
                    var tabCell = tr.insertCell(-1);
    
                    if(j == 6)
                    {
                        var team = respuesta.data[i][col[j]];
                        tabCell.innerHTML = team["name"];
                    }
                    else
                    {
                    tabCell.innerHTML = respuesta.data[i][col[j]];
                    }
                }
            }
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);   
}
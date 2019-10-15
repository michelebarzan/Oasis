    function resetStyle(button)
    {
        var all = document.getElementsByClassName("functionListButton");
        for (var i = 0; i < all.length; i++) 
        {
            all[i].classList.remove("functionListButtonActive");
        }
        button.classList.add("functionListButtonActive");
    }
    function editableTableLoad()
    {
        
    }
    function getTable(table,orderBy,orderType)
    {
        if(table=="report_ufficio_commerciale_user_view")
        {
            getEditableTable
            ({
                table:'report_ufficio_commerciale_user_view',
                primaryKey: "id_report_ufficio_vendite",
                editable: false,
                container:'containerSommarioArchivi',
                noFilterColumns:['data_scadenza','data_creazione','note','data_salvataggio'],
                orderBy:orderBy,
                orderType:orderType
            });
        }
        if(table=="report_ufficio_commerciale_manager_view")
        {
            getEditableTable
            ({
                table:'report_ufficio_commerciale_manager_view',
                primaryKey: "id_report_ufficio_vendite",
                editable: false,
                container:'containerSommarioArchivi',
                noFilterColumns:['data_scadenza','data_creazione','note','data_salvataggio'],
                orderBy:orderBy,
                orderType:orderType
            });
        }
    }
    function getSommariUtenti()
    {
        $.get("getSommariUtenti.php",
        function(response, status)
        {
            if(status=="success")
            {
                if(response.indexOf("error")>-1 || response.indexOf("notice")>-1 || response.indexOf("warning")>-1)
                {
                    Swal.fire
                    ({
                        type: 'error',
                        title: 'Errore',
                        text: "Se il problema persiste contatta l' amministratore"
                    });
                    console.log(response);
                }
                else
                {
                    var sommari_archivi_utenti = JSON.parse(response);
                    sommari_archivi_utenti.forEach(function(sommario)
                    {
                        var button=document.createElement("button");
                        button.setAttribute("class","functionListButton");
                        button.setAttribute("onclick","resetStyle(this);getTable('"+sommario.sommario+"')");
                        button.innerHTML=sommario.nomeSommario;

                        $('.functionList').append(button);
                    });
                }
            }
            else
                console.log(status);
        });
    }
    function scaricaExcel(container)
    {
        table=selectetTable;
        var oldTable=document.getElementById(container).innerHTML;
        document.getElementById("myTable"+table).deleteRow(0);
        var row = document.getElementById("myTable"+table).insertRow(0);
        var j=0;
        columns.forEach(function(colonna)
        {
            var cell = row.insertCell(j);
            cell.innerHTML = colonna;
            j++;
        });
        
        var tbl = document.getElementById("myTable"+table);
        for (var i = 0, row; row = tbl.rows[i]; i++)
        {
            for (var j = 0, col; col = row.cells[j]; j++)
            {
                col.setAttribute("colspan","1");
            }  
        }

        var rowsToDelete=[];
        for (var i = 0, row; row = document.getElementById("myTable"+table).rows[i]; i++)
        {
            if(row.style.display=="none")
                rowsToDelete.push(row);
        }
        rowsToDelete.forEach(function(row) 
        {
            row.parentNode.removeChild(row);
        });
        
        exportTableToExcel("myTable"+table, table);
        document.getElementById(container).innerHTML=oldTable;
    }
    function exportTableToExcel(tableID, filename = '')
    {
        var downloadLink;
        var dataType = 'application/vnd.ms-excel';
        var tableSelect = document.getElementById(tableID);
        var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
        
        // Specify file name
        filename = filename?filename+'.xls':'excel_data.xls';
        
        // Create download link element
        downloadLink = document.createElement("a");
        
        document.body.appendChild(downloadLink);
        
        if(navigator.msSaveOrOpenBlob){
            var blob = new Blob(['\ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob( blob, filename);
        }else{
            // Create a link to the file
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
        
            // Setting the file name
            downloadLink.download = filename;
            
            //triggering the function
            downloadLink.click();
        }
    }
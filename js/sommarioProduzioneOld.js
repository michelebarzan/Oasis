    var chart;
    var viewName;
    var settimana;
    var stazione;

    async function getTable(vuoto,orderBy,orderType)
    {
        document.getElementById("totaliContainer").innerHTML="";
        document.getElementById("containerSommarioProduzione").style.display="block";
        newCircleSpinner("Caricamento in corso...");
        settimana=document.getElementById('selectSalvataggioSommarioProduzione').value;
        stazione=document.getElementById('selectStazioneSommarioProduzione').value;
        document.getElementById('containerSommarioProduzione').innerHTML="";
        document.getElementById('chartContainer').innerHTML="";
        var errore=false;
        if(stazione=='' || stazione==null)
        {
            errore=true;
            Swal.fire
            ({
                type: 'error',
                title: 'Errore',
                text: "Seleziona una stazione"
            });
            removeCircleSpinner();
        }
        if(!errore)
        {
            var response=await getTmpViewSommarioProduzione();
            removeCircleSpinner();
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
                viewName=response;
                getEditableTable
                ({
                    table:viewName,
                    primaryKey: "docnum",
                    editable: false,
                    container:'containerSommarioProduzione',
                    noFilterColumns:['dataConsegna','mq'],
                    orderBy:orderBy,
                    orderType:orderType
                });
            };
        }
    }
    function editableTableLoad()
    {
        if(getTableRows(selectetTable)==0)
        {
            Swal.fire
            ({
                type: 'warning',
                text: "Nessun salvataggio trovato per la stazione "+stazione+" nella settimana "+settimana
            });
            document.getElementById("containerSommarioProduzione").style.display="none";
        }
        else
        {
			var totali=
			{
				1:0,
				2:0,
				3:0,
				4:0,
				5:0,
				6:0,
				8:0
			};
			
            getChart();
            var table=document.getElementById("myTable"+viewName);
            var row = table.rows[0];
            var th=document.createElement("th");
            th.innerHTML="PDF";
            row.appendChild(th);
            for (var i = 1, row; row = table.rows[i]; i++)
            {
                var docnum=row.cells[0].innerText;
                var td=document.createElement("td");
                td.setAttribute("style","text-align:center");
                var linkPdf=document.createElement("a");
                linkPdf.setAttribute("href","http://remote.oasisgroup.it/OasisPdfOrdini/pdf_ordini/H"+docnum+".pdf");
                linkPdf.setAttribute("target","blank");
                linkPdf.setAttribute("class","linkPdfEditableTable");
                linkPdf.setAttribute("title","Link al PDF");
                var pdfIcon=document.createElement("i");
                pdfIcon.setAttribute("class","fad fa-file-pdf iconPdfEditableTable");
                linkPdf.appendChild(pdfIcon);
                td.appendChild(linkPdf);
                row.appendChild(td);
            }
            for (var j = 1, row; row = table.rows[j]; j++)
            {
                if(row.cells[11].innerText=='Prodotto')
                    var color="rgb(0, 153, 0)";
                if(row.cells[11].innerText=='Non prodotto')
                    var color="red";
                if(row.cells[11].innerText=='Aggiunto')
                    var color="#4C91CB";

                for (var k = 0, col; col = row.cells[k]; k++)
                {
                    col.style.color=color;

                    if(!isNaN(totali[k]) && totali[k]!==undefined)
					{
                        totali[k]+=parseFloat(table.rows[j].cells[k].innerHTML);
                    }
                }
            }
            /*var row = table.insertRow(1);
            for (var k = 0; k<table.rows[1].cells.length; k++)
            {
                console.log(k);
                var cell = row.insertCell(k);
                cell.innerHTML = totali[k];
            }*/
			//console.log(totali);
            //aggiungi totali
            getTotali();
        }
        $.post("dropTmpViewSommarioProduzione.php",{viewName});
    }
    function getTmpViewSommarioProduzione()
    {
        return new Promise(function (resolve, reject) 
        {
            $.get("getTmpViewSommarioProduzione.php",
            {
                settimana,
                stazione
            },
            function(response, status)
            {
                if(status=="success")
                {
                    resolve(response);
                }
                else
                    reject({status});
            });
        });
    }
    function getChart()
    {
        var ordiniProdotti=[];
        var ordiniNonProdotti=[];
        var ordiniAggiunti=[];
        
        var table = document.getElementById("myTable"+viewName);
        for (var i = 1, row; row = table.rows[i]; i++)
        {
            if(row.cells[11].innerText=='Prodotto')
                ordiniProdotti.push(row.cells[0].innerText);
            if(row.cells[11].innerText=='Non prodotto')
                ordiniNonProdotti.push(row.cells[0].innerText);
            if(row.cells[11].innerText=='Aggiunto')
                ordiniAggiunti.push(row.cells[0].innerText);
        }
        if(ordiniAggiunti>0 && ordiniProdotti==0 && ordiniNonProdotti==0)
        {
            Swal.fire
            ({
                type: 'warning',
                text: "Nessun salvataggio trovato per la stazione "+stazione+" nella settimana "+settimana
            });
            document.getElementById("containerSommarioProduzione").style.display="none";
        }
        else
        {
            chart = new CanvasJS.Chart("chartContainer",
            {
                theme: "light2",
                animationEnabled: true,
                data: 
                [{
                    type: "doughnut",
                    indexLabel: "{label} : {y}",
                    showInLegend: true,
                    legendText: "{label} : {y}",
                    dataPoints : 
                    [ 
                        { y: ordiniProdotti.length, label: "Prodotti",color: "rgb(0, 153, 0)",  },
                        { y: ordiniNonProdotti.length,  label: "Non prodotti",color: "red",  }, 
                        { y: ordiniAggiunti.length, label: "Aggiunti",color: "#4C91CB", }
                    ]
                }]
            });
            chart.render();
        }
    }
    function scaricaExcel(container)
    {
        var settimana=document.getElementById('selectSalvataggioSommarioProduzione').value;
        var stazione=document.getElementById('selectStazioneSommarioProduzione').value;

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
                if(j==13)
                {
                    col.childNodes[0].innerHTML="Link PDF";
                }
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
        
        exportTableToExcel("myTable"+table, "Sommario produzione_"+settimana+"_"+stazione);
        document.getElementById(container).innerHTML=oldTable;
        
        /*$("#"+table).table2excel({
        // exclude CSS class
        exclude: ".noExl",
        name: "Sommario produzione_"+settimana+"_"+stazione,
        filename: "Sommario produzione_"+settimana+"_"+stazione //do not include extension
        });*/
        
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
    function getTotali()
    {
        var settimana=document.getElementById('selectSalvataggioSommarioProduzione').value;
        var stazione=document.getElementById('selectStazioneSommarioProduzione').value;

        $.get("getTotaliSommarioProduzione.php",
        {
            settimana,
            stazione
        },
        function(response, status)
        {
            if(status=="success")
            {
                console.log(response);
                if(stazione=="CAB_LAC" || stazione=="CAB_ACR")
                {
                    var um="mq";
                }
                if(stazione=="PTO_PTO")
                {
                    var um="pezzi";
                }
                if(stazione=="MNT_MAST" || stazione=="MNT_ACA" || stazione=="MNT_HOME" || stazione=="MNT_LUT")
                {
                    var um="pezzi";
                }
                document.getElementById("totaliContainer").innerHTML="<b><u>Totale</u>: </b>"+response+" "+um;
            }
            else
                console.log(status);
        });
    }
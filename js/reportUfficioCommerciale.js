    var data1;
    var data2;
    var report;

    function apriPopupIntervalloDate()
    {
        if(data2==null)
        {
            var data2DefaultValue = new Date();

            var data2dd = String(data2DefaultValue.getDate()).padStart(2, '0');
            var data2mm = String(data2DefaultValue.getMonth() + 1).padStart(2, '0'); //January is 0!
            var data2yyyy = data2DefaultValue.getFullYear();

            var data2DefaultValueCorrectFormat = data2yyyy+"-"+data2mm+"-"+data2dd;
        }
        else
        {
            var data2DefaultValueCorrectFormat=data2;
        }
        if(data1==null)
        {
            var data1DefaultValue = new Date();

            var data1dd = String(data1DefaultValue.getDate()).padStart(2, '0');
            data1dd=data1dd-7;
            data1dd=data1dd.toString();
            if(data1dd.length==1)
                data1dd="0"+data1dd;
            var data1mm = String(data1DefaultValue.getMonth() + 1).padStart(2, '0'); //January is 0!
            var data1yyyy = data1DefaultValue.getFullYear();

            var data1DefaultValueCorrectFormat = data1yyyy+"-"+data1mm+"-"+data1dd;
        }
        else
        {
            var data1DefaultValueCorrectFormat=data1;
        }

        var input1Container=document.createElement("div");
        input1Container.setAttribute("class","cointainerDataReportUfficioCommerciale");
        input1Container.setAttribute("style","margin-top:15px;");
        
        var label1=document.createElement("div");
        label1.setAttribute("class","labelDateReportUfficioCommerciale");
        label1.innerHTML="Data inizio";
        
        var input1=document.createElement("input");
        input1.setAttribute("type","date");
        input1.setAttribute("class","inputDateReportUfficioCommerciale");
        input1.setAttribute("id","data1ReportUfficioCommerciale");
        input1.setAttribute("value",data1DefaultValueCorrectFormat);
        
        var input2Container=document.createElement("div");
        input2Container.setAttribute("class","cointainerDataReportUfficioCommerciale");
        input2Container.setAttribute("style","margin-bottom:15px;");
        
        var label2=document.createElement("div");
        label2.setAttribute("class","labelDateReportUfficioCommerciale");
        label2.innerHTML="Data fine";
        
        var input2=document.createElement("input");
        input2.setAttribute("type","date");
        input2.setAttribute("class","inputDateReportUfficioCommerciale");
        input2.setAttribute("id","data2ReportUfficioCommerciale");
        input2.setAttribute("value",data2DefaultValueCorrectFormat);
        
        input1Container.appendChild(label1);
        input1Container.appendChild(input1);
        
        input2Container.appendChild(label2);
        input2Container.appendChild(input2);
        
        Swal.fire
        ({
            type: 'question',
            title: "Seleziona intervallo date",
            html : input1Container.outerHTML+input2Container.outerHTML,
            showCancelButton:true,
            cancelButtonText: "Annulla",
            confirmButtonText : "Conferma"
        }).then((result) => 
        {
            if (result.value)
            {
                newCircleSpinner("Caricamento in corso...");
                swal.close();
                data1=document.getElementById("data1ReportUfficioCommerciale").value;
                data2=document.getElementById("data2ReportUfficioCommerciale").value;
                if(data1!=null && data1!='' && data2!=null && data2!='')
                {
                    if(data2<data1)
                    {
                        Swal.fire
                        ({
                            type: 'error',
                            title: 'Errore',
                            text: "Seleziona un intervallo date valido",
                            showCancelButton:true,
                            cancelButtonText: "Annulla"
                        }).then((result) => 
                        {
                            if (result.value)
                                apriPopupIntervalloDate();
                            else
                                swal.close();
                        });
                    }
                    else
                    {
                        $.post("getReportUfficioCommercialeView.php",
                        {
                            data1,
                            data2
                        },
                        function(response, status)
                        {
                            if(status=="success")
                            {
                                //console.log(response);
                                if(response.indexOf("error")>-1)
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
                                    var responseArray=[];
                                    var responseArrayObj = JSON.parse(response);
                                    for (var key in responseArrayObj)
                                    {
                                        responseArray.push(responseArrayObj[key]);							
                                    }
                                    var columns=[];
                                    var columnsObj = JSON.parse(responseArray[0]);
                                    for (var key in columnsObj)
                                    {
                                        columns.push(columnsObj[key]);							
                                    }
                                    var data=[];
                                    var rowsObj = JSON.parse(responseArray[1]);
                                    for (var key in rowsObj)
                                    {
                                        data.push(rowsObj[key]);							
                                    }
                                    //console.log(data);

                                    var container = document.getElementById('innerContainerReportUfficioCommerciale');
                                    report = new Handsontable(container, {
                                        data: data,
                                        rowHeaders: true,
                                        manualColumnResize: true,
                                        colHeaders: columns,
                                        className: "htMiddle",
                                        /*columns:
                                        [
                                            {
                                                type: 'date',
                                                dateFormat: 'MM/DD/YYYY',
                                                correctFormat: true
                                            },//data_creazione
                                            {},//numero_documento
                                            {
                                                type: 'date',
                                                dateFormat: 'MM/DD/YYYY',
                                                correctFormat: true
                                            },//data_scadenza
                                            {},//codice_cliente_fornitore
                                            {},//nome_cliente_fornitore
                                            {},//causale
                                            {},//linea_business
                                            {},//collezione
                                            {
                                                type: 'checkbox'
                                            },//standard_fuori_standard
                                            {},//note
                                            {},//area_manager
                                            {},//ragg_state
                                            {},//slp_name
                                            {},//finitura
                                            {}//doc_total
                                        ],*/
                                        filters: true,
                                        dropdownMenu: true,
                                        headerTooltips: true,
                                        language: 'it-IT',
                                        //maxCols: 13,
                                        contextMenu: true,
                                        //formulas:true,
                                        height:"100%"
                                    });
                                    console.clear();
                                    document.getElementById("hot-display-license-info").style.display="none";
                                    document.getElementsByClassName("ht_clone_left")[0].style.zIndex="97";
                                    document.getElementsByClassName("ht_clone_top_left_corner")[0].style.zIndex="97";
                                    document.getElementsByClassName("ht_clone_top")[0].style.zIndex="97";
                                    removeCircleSpinner();
                                }
                            }
                            else
                                console.log(status);
                        });
                    }
                }
                else
                {
                    Swal.fire
                    ({
                        type: 'error',
                        title: 'Errore',
                        text: "Seleziona un intervallo date valido",
                        showCancelButton:true,
                        cancelButtonText: "Annulla"
                    }).then((result) => 
                    {
                        if (result.value)
                            apriPopupIntervalloDate();
                        else
                            swal.close();
                    });
                }
            }
            else
                swal.close();
        })
    }
    function salvaModifiche()
    {
        $.post("getSqlSrvWeekToday.php",
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
                    //------------------------------------------------------
                    var inputSettimana=document.createElement("input");
                    inputSettimana.setAttribute("type","number");
                    inputSettimana.setAttribute("value",response);
                    inputSettimana.setAttribute("id","settimanaSalvataggioReportUfficioCommerciale");
                    
                    Swal.fire
                    ({
                        type: 'question',
                        title: 'Inserisci la settimana di cui stai salvando il report',
                        html : inputSettimana.outerHTML
                    }).then((result) => 
                    {
                        if (result.value)
                        {
                            swal.close();
                            var week=document.getElementById("settimanaSalvataggioReportUfficioCommerciale").value;
                            if(week.toString().length===6)
                            {
                                var nome_salvataggio="salvataggio_"+week;
                                var id_utente=document.getElementById("id_utente").value;
                                var errore_colonne_mancanti=false;
                                var colonne_mancanti=[];

                                var colHeader=report.getColHeader();
                                var data=report.getData();

                                var columns=['data_creazione','numero_documento','data_scadenza','codice_cliente_fornitore','nome_cliente_fornitore','causale','linea_business','collezione','standard_fuori_standard','note','area_manager','ragg_stat','slp_name','finitura','doc_total'];

                                var queries=[];

                                data.forEach(function(row)
                                {
                                    var query="INSERT INTO report_ufficio_commerciale (";
                                    columns.forEach(function(column)
                                    {
                                        query+="["+column+"],";
                                    });
                                    query+="nome_salvataggio,data_salvataggio,utente_salvataggio) VALUES (";

                                    for (var i = 0; i < columns.length; i++)
                                    { 
                                        var column=columns[i];
                                        var index=colHeader.indexOf(column);
                                        if(index>-1)
                                        {
                                            var cell=row[index];
                                            if(cell===null || cell===undefined || cell==="" || cell===" ")
                                                cell="";
                                            else
                                                cell = cell.toString().replace("'", "");
                                            query+="'"+cell+"',";
                                        }
                                        else
                                        {
                                            errore_colonne_mancanti=true;
                                            colonne_mancanti.push(column);
                                        }
                                    }
                                    query+="'"+nome_salvataggio+"',GETDATE(),"+id_utente+")";

                                    queries.push(query);
                                });

                                if(errore_colonne_mancanti)
                                {
                                    var colonne_mancanti_unique = [];
                                    $.each(colonne_mancanti, function(i, el){
                                        if($.inArray(el, colonne_mancanti_unique) === -1) colonne_mancanti_unique.push(el);
                                    });
                                    Swal.fire
                                    ({
                                        type: 'error',
                                        title: 'Errore',
                                        text: "Colonne mancanti ("+colonne_mancanti_unique.toString()+")"
                                    });
                                }
                                if(!errore_colonne_mancanti)
                                {
                                    newCircleSpinner("Salvataggio modifiche in corso...");
                                    var JSONqueries=JSON.stringify(queries);
                                    $.post("inserisciReportUfficioCommerciale.php",
                                    {
                                        JSONqueries,
                                        nome_salvataggio
                                    },
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
                                            if(response.indexOf("errrow")>-1)
                                            {
                                                var row=response.split("|")[1];
                                                Swal.fire
                                                ({
                                                    type: 'error',
                                                    title: 'Errore',
                                                    text: "Ricontrolla la riga numero "+row
                                                });
                                                console.log(response);
                                            }
                                            if(response.indexOf("ok")>-1)
                                            {
                                                removeCircleSpinner();
                                                Swal.fire
                                                ({
                                                    type: 'success',
                                                    title: 'Modifiche salvate',
                                                    html: '<div class="warning-message-container-swal"><i class="far fa-exclamation-triangle" style="margin-right:10px"></i>A parità di settimana i salvataggi verranno sovrascritti</div>'
                                                });
                                            }
                                        }
                                        else
                                            console.log(status);
                                    });
                                }
                            }
                            else
                            {
                                Swal.fire
                                ({
                                    type: 'error',
                                    title: 'Valore non valido',
                                    text : "La settimana deve essere composta da 6 numeri (Es: 201806)"
                                });
                            }
                        }
                        else
                            swal.close();
                    })
                    //------------------------------------------------------
                }
            }
            else
                console.log(status);
        });

        
    }
    function esportaExcel()
    {
        $.post("getSqlSrvWeekToday.php",
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

                    var inputNomeFile=document.createElement("input");
                    inputNomeFile.setAttribute("type","text");
                    inputNomeFile.setAttribute("value","report_ufficio_commerciale_"+response);
                    inputNomeFile.setAttribute("id","nomeFileReportUfficioCommerciale");
                    Swal.fire
                    ({
                        type: 'question',
                        title: 'Scegli il nome del file',
                        html : inputNomeFile.outerHTML
                    }).then((result) => 
                    {
                        if (result.value)
                        {
                            swal.close();
                            var filename=document.getElementById("nomeFileReportUfficioCommerciale").value;
                            if(filename==null || filename=='')
                            {
                                var filename="report_ufficio_commerciale_"+response;
                            }
                            xlsExport(report,filename);
                        }
                        else
                            swal.close();
                    })
                }
            }
            else
                console.log(status);
        });
    }
    function xlsExport(hot,filename)
    {
        var colHeader=hot.getColHeader();
        var data=hot.getData();

        var exportDiv=document.createElement("div");
        exportDiv.setAttribute("style","display:none");

        var exportTable=document.createElement("table");
        exportTable.setAttribute("id","hotExportTable");

        var tr=document.createElement("tr");
        colHeader.forEach(function(column)
        {
            var th=document.createElement("th");
            th.innerHTML=column;
            tr.appendChild(th);
        });
        exportTable.appendChild(tr);

        data.forEach(function(row)
        {
            var tr=document.createElement("tr");
            row.forEach(function(cell)
            {
                var td=document.createElement("td");
                td.innerHTML=cell;
                tr.appendChild(td);
            });
            exportTable.appendChild(tr);
        });

        exportDiv.appendChild(exportTable);
        document.body.appendChild(exportDiv);

        $("#hotExportTable").table2excel
        ({
            exclude: ".noExl",
            filename
        });

        document.getElementById("hotExportTable").remove();
    }
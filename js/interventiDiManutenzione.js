    async function apriPopupNuovoIntervento()
    {
        newMouseSpinner(event);

        var outerContainer=document.createElement("div");
        outerContainer.setAttribute("class","nuovoInterventoOuterContainer");
        outerContainer.setAttribute("id","nuovoInterventoOuterContainer");

        var form=document.createElement("form");
        form.setAttribute("id","formNuovoIntervento");
        form.setAttribute("onsubmit","inserisciNuovoIntervento(event)");

        fieldsContainer=document.createElement("div");

        //TITOLO-----------------------------------------------------------------------------------

        var inputContainer=document.createElement("div");
        inputContainer.setAttribute("class","formNuovoInterventoInputContainer");

        var formInputLabel=document.createElement("div");
        formInputLabel.setAttribute("class","formNuovoInterventoInputLabel");
        formInputLabel.innerHTML="Titolo";

        inputContainer.appendChild(formInputLabel);

        var formInput=document.createElement("textarea");
        formInput.setAttribute("class","formNuovoInterventoInput");
        formInput.setAttribute("required","required");
        formInput.setAttribute("id","formNuovoInterventotitolo");

        inputContainer.appendChild(formInput);

        fieldsContainer.appendChild(inputContainer);

        //---------------------------------------------------------------------------------------
        
        //TIPO INTERVENTO--------------------------------------------------------------------------------

        var inputContainer=document.createElement("div");
        inputContainer.setAttribute("class","formNuovoInterventoInputContainer");

        var formInputLabel=document.createElement("div");
        formInputLabel.setAttribute("class","formNuovoInterventoInputLabel");
        formInputLabel.innerHTML="Tipo intervento";

        inputContainer.appendChild(formInputLabel);

        var formInput=document.createElement("select");
        formInput.setAttribute("class","formNuovoInterventoInput");
        formInput.setAttribute("id","formNuovoInterventotipo");

        var tipologieInterventi=[
            {
                value:"manutenzione_automezzi",
                label:"Manutenzione automezzi"
            },
            {
                value:"manutenzione_caldaie",
                label:"Manutenzione caldaie"
            },
            {
                value:"manutenzione_macchinari",
                label:"Manutenzione macchinari"
            },
            {
                value:"idraulica",
                label:"Idraulica"
            },
            {
                value:"altro",
                label:"Altro"
            }
        ];

        tipologieInterventi.forEach(function(tipo)
        {
            var formInputOption=document.createElement("option");
            formInputOption.setAttribute("value",tipo["value"]);
            formInputOption.innerHTML=tipo["label"];

            formInput.appendChild(formInputOption);
        })

        inputContainer.appendChild(formInput);

        fieldsContainer.appendChild(inputContainer);

        //---------------------------------------------------------------------------------------

        //FORNITORE--------------------------------------------------------------------------------

        var inputContainer=document.createElement("div");
        inputContainer.setAttribute("class","formNuovoInterventoInputContainer");

        var formInputLabel=document.createElement("div");
        formInputLabel.setAttribute("class","formNuovoInterventoInputLabel");
        formInputLabel.innerHTML="Fornitore";

        inputContainer.appendChild(formInputLabel);

        var formInput=document.createElement("select");
        formInput.setAttribute("class","formNuovoInterventoInput");
        formInput.setAttribute("id","formNuovoInterventofornitore");

        var fornitori=await getFornitori();

        fornitori.forEach(function(fornitore)
        {
            var formInputOption=document.createElement("option");
            formInputOption.setAttribute("value",fornitore["codice_fornitore"]);
            formInputOption.innerHTML=fornitore["nome_fornitore"];

            formInput.appendChild(formInputOption);
        })

        inputContainer.appendChild(formInput);

        fieldsContainer.appendChild(inputContainer);

        //---------------------------------------------------------------------------------------

        //INVIO MAIL--------------------------------------------------------------------------------

        var inputContainer=document.createElement("div");
        inputContainer.setAttribute("class","formNuovoInterventoInputContainer");

        var formInputLabel=document.createElement("div");
        formInputLabel.setAttribute("class","formNuovoInterventoInputLabel");
        formInputLabel.innerHTML="Invio mail";

        inputContainer.appendChild(formInputLabel);

        var formInput=document.createElement("input");
        formInput.setAttribute("type","checkbox");
        formInput.setAttribute("onchange","$('.ms-parent').toggle('fast','swing')");
        formInput.setAttribute("id","formNuovoInterventocheckboxinviomail");

        inputContainer.appendChild(formInput);

        var formInput=document.createElement("select");
        formInput.setAttribute("id","formNuovoInterventoinviomail");

        var utenti=await getUtentiInvioMail();

        utenti.forEach(function(utente)
        {
            var formInputOption=document.createElement("option");
            formInputOption.setAttribute("value",utente["mail"]);
            formInputOption.innerHTML=utente["username"];

            formInput.appendChild(formInputOption);
        })

        inputContainer.appendChild(formInput);

        fieldsContainer.appendChild(inputContainer);

        //---------------------------------------------------------------------------------------

        //PREVENTIVO-----------------------------------------------------------------------------

        var inputContainer=document.createElement("div");
        inputContainer.setAttribute("class","formNuovoInterventoInputContainer");

        var formInputLabel=document.createElement("div");
        formInputLabel.setAttribute("class","formNuovoInterventoInputLabel");
        formInputLabel.innerHTML="Preventivo";

        inputContainer.appendChild(formInputLabel);

        var formInput=document.createElement("input");
        formInput.setAttribute("type","checkbox");
        formInput.setAttribute("onchange","$('#allegatoPreventivoContainer').toggle('fast','swing')");
        formInput.setAttribute("id","formNuovoInterventopreventivo");

        inputContainer.appendChild(formInput);

        var formInputContainer=document.createElement("div");
        formInputContainer.setAttribute("id","allegatoPreventivoContainer");

        var buttonAllegaPreventivo=document.createElement("button");
        buttonAllegaPreventivo.setAttribute("type","button");
        buttonAllegaPreventivo.setAttribute("class","buttonAllegaPreventivo");
        buttonAllegaPreventivo.innerHTML='Allega preventivo<i class="fal fa-file-pdf" style="margin-left:15px"></i>';
        buttonAllegaPreventivo.setAttribute("onclick","document.getElementById('inputAllegaPreventivo').click()");

        formInputContainer.appendChild(buttonAllegaPreventivo);

        var inputAllegaPreventivo=document.createElement("input");
        inputAllegaPreventivo.setAttribute("type","file");
        inputAllegaPreventivo.setAttribute("accept",".pdf");
        inputAllegaPreventivo.setAttribute("id","inputAllegaPreventivo");
        inputAllegaPreventivo.setAttribute("onchange","getAllegatoPreventivo(this)");

        formInputContainer.appendChild(inputAllegaPreventivo);

        var fileContainerAllegaPreventivo=document.createElement("div");
        fileContainerAllegaPreventivo.setAttribute("id","fileContainerAllegaPreventivo");

        formInputContainer.appendChild(fileContainerAllegaPreventivo);

        inputContainer.appendChild(formInputContainer);

        fieldsContainer.appendChild(inputContainer);

        //---------------------------------------------------------------------------------------

        //NOTE-----------------------------------------------------------------------------------

        var inputContainer=document.createElement("div");
        inputContainer.setAttribute("class","formNuovoInterventoInputContainer");

        var formInputLabel=document.createElement("div");
        formInputLabel.setAttribute("class","formNuovoInterventoInputLabel");
        formInputLabel.innerHTML="Note";

        inputContainer.appendChild(formInputLabel);

        var formInput=document.createElement("textarea");
        formInput.setAttribute("class","formNuovoInterventoInput");
        formInput.setAttribute("id","formNuovoInterventonote");

        inputContainer.appendChild(formInput);

        fieldsContainer.appendChild(inputContainer);

        //---------------------------------------------------------------------------------------
        
        var buttonContainer=document.createElement("div");
        buttonContainer.setAttribute("class","nuovoInterventoButtonContainer");

        var confirmButton=document.createElement("button");
        confirmButton.setAttribute("class","nuovoInterventoButton");
        confirmButton.setAttribute("id","nuovoInterventoConfirmButton");
        confirmButton.setAttribute("type","submit");
        confirmButton.setAttribute("style","margin-left:15%;float:left");
        confirmButton.innerHTML='Conferma <i class="fad fa-layer-plus" style="margin-left:10px"></i>';

        buttonContainer.appendChild(confirmButton);

        var cancelButton=document.createElement("button");
        cancelButton.setAttribute("class","nuovoInterventoButton");
        cancelButton.setAttribute("onclick","Swal.close()");
        cancelButton.setAttribute("id","nuovoInterventoCancelButton");
        cancelButton.setAttribute("style","color:red;margin-right:15%;float:right");
        cancelButton.setAttribute("type","button");
        cancelButton.innerHTML='Annulla <i class="fal fa-window-close" style="margin-left:10px"></i>';

        buttonContainer.appendChild(cancelButton);

        form.appendChild(fieldsContainer);
        form.appendChild(buttonContainer);

        outerContainer.appendChild(form);

        Swal.fire
        ({
            title: 'Nuovo intervento',
            width:"800px",
            background: "#e2e1e0",
            html: outerContainer.outerHTML,
            showConfirmButton: false,
            showCancelButton : false,
            showCloseButton: true,
            allowOutsideClick:false,
            onOpen : async function()
                    {
                        removeMouseSpinner();
                        $('#formNuovoInterventoinviomail').multipleSelect();
                        $('.ms-parent').css({"height":"30px"});
                        $('.ms-choice').css({"height":"30px","border-radius":"2px"});
                        $('.ms-choice').find("span").css({"height":"30px","line-height":"30px"});
                        $('.ms-drop').css({"text-align":"left"});
                        $('.ms-drop').find("label").css({"height":"25px"});
                        $('.ms-parent').hide();
                    }
        });
    }
    function getAllegatoPreventivo(input)
    {
        var file=input.files[0];
        var fileName=file.name;

        var fileNameContainer=document.createElement("div");
        fileNameContainer.innerHTML=fileName;

        var buttonRemoveFile=document.createElement("button");
        buttonRemoveFile.setAttribute("type","button");
        buttonRemoveFile.setAttribute("onclick","this.parentElement.remove();rimuoviAllegatoPreventivo()");
        buttonRemoveFile.setAttribute("title","Rimuovi");
        buttonRemoveFile.innerHTML='<i class="far fa-times"></i>';

        fileNameContainer.appendChild(buttonRemoveFile);

        document.getElementById("fileContainerAllegaPreventivo").appendChild(fileNameContainer);
    }
    function rimuoviAllegatoPreventivo()
    {
        document.getElementById("inputAllegaPreventivo").value='';
    }
    function getFornitori()
    {
        return new Promise(function (resolve, reject) 
        {
            $.get("getAnagraficaFornitori.php",
            function(response, status)
            {
                if(status=="success")
                {
                    resolve(JSON.parse(response));
                }
                else
                    reject({status});
            });
        });
    }
    function getUtentiInvioMail()
    {
        return new Promise(function (resolve, reject) 
        {
            $.get("getUtentiInvioMail.php",
            function(response, status)
            {
                if(status=="success")
                {
                    resolve(JSON.parse(response));
                }
                else
                    reject({status});
            });
        });
    }
    function inserisciNuovoIntervento(event)
    {
        event.preventDefault();

        var titolo=document.getElementById("formNuovoInterventotitolo").value;
        var tipo=document.getElementById("formNuovoInterventotipo").value;
        var fornitore=document.getElementById("formNuovoInterventofornitore").value;
        if(document.getElementById("formNuovoInterventocheckboxinviomail").checked)
        {
            var utentiInvioMail=$('#formNuovoInterventoinviomail').multipleSelect('getSelects');
        }
        if(document.getElementById("formNuovoInterventopreventivo").checked)
        {
            var allegato=document.getElementById("inputAllegaPreventivo").files[0];
        }
        var note=document.getElementById("formNuovoInterventonote").value;

        /*console.log(titolo);
        console.log(tipo);
        console.log(fornitore);
        console.log(utentiInvioMail);
        console.log(allegato);
        console.log(note);*/

        $.post("inserisciNuovoInterventoDiManutenzione.php",
        {
            titolo,
            tipo,
            fornitore,
            note
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
                else
                {
                    //console.log(response);
                    var id_intervento=response;
                    if(allegato!=null)
                    {
                        var data= new FormData();
                        data.append('file',allegato);
                        data.append("id_intervento",id_intervento);
                        $.ajax(
                        {
                            url:'uploadFileInterventoDiManutenzione.php',
                            data:data,
                            processData:false,
                            contentType:false,
                            type:'POST',
                            success:function(response)
                                {
                                    if(response.indexOf("error")>-1 || response.indexOf("notice")>-1 || response.indexOf("warning")>-1)
                                    {
                                        window.alert("Errore\n\nImpossibile caricare il file");
                                        console.log(response);
                                    }
                                }
                        });
                    }
                    if(document.getElementById("formNuovoInterventocheckboxinviomail").checked)
                    {
                        var JSONutentiInvioMail=JSON.stringify(utentiInvioMail);
                        $.post("sendMailInterventiDiManutenzione.php",
                        {
                            id_intervento,
                            JSONutentiInvioMail
                        },
                        function(response, status)
                        {
                            if(status=="success")
                            {
                                if(response!=="")
                                {
                                    window.alert("Errore\n\nImpossibile inviare la mail");
                                    console.log(response);
                                }
                            }
                            else
                                console.log(status)
                        });
                    }
                    Swal.fire
                    ({
                        type: 'success',
                        title: 'Intervento inserito'
                    });
                    getInterventiDiManutenzione();
                }
            }
            else
                reject({status});
        });
    }
    function getInterventiDiManutenzione()
    {
        getTable("interventi_di_manutenzione","data","DESC");
    }
    function getTable(table,orderBy,orderType)
    {
        getEditableTable
        ({
            table,
            editable: true,
            container:'interventiDiManutenzioneContainer',
            noFilterColumns:['note','data'],
            readOnlyColumns: ["id_intervento","data","utente","fornitore","tipo"],
            noInsertColumns: ["id_intervento","data","utente","fornitore","tipo"],
            foreignKeys:[['utente','utenti','id_utente','username'],['fornitore','anagrafica_fornitori','codice_fornitore','nome_fornitore']],
            orderBy:orderBy,
            orderType:orderType
        });
    }
    async function editableTableLoad()
    {
        $("#myTable"+selectetTable).hide();
        newCircleSpinner("Caricamento allegati in corso...");
        $('.btnAddRecordEditableTable').hide();
        var table=document.getElementById("myTable"+selectetTable);
        var row = table.rows[0];
        var th=document.createElement("th");

        var buttonCell=table.rows[0].cells[14];
        table.rows[0].cells[14].remove();

        th.innerHTML="Preventivo";
        row.appendChild(th);

        row.appendChild(buttonCell);

        for (var i = 1, row; row = table.rows[i]; i++)
        {
            var id_intervento=row.cells[0].innerText;

            var buttonCell=row.cells[7];
            row.cells[7].remove();

            var td=document.createElement("td");
            td.setAttribute("style","text-align:left");

            var fileName=await getFileNameIntervento(id_intervento);

            if(fileName!="nofile")
            {
                var linkPdf=document.createElement("a");
                linkPdf.setAttribute("href","http://remote.oasisgroup.it/OasisAllegatiInterventiDiManutenzione/"+fileName);
                linkPdf.setAttribute("target","blank");
                linkPdf.setAttribute("style","text-decoration:none");
                linkPdf.setAttribute("class","linkPdfEditableTable");
                linkPdf.setAttribute("title","Link al PDF");
                var pdfIcon=document.createElement("i");
                pdfIcon.setAttribute("class","fad fa-file-pdf iconPdfEditableTable");
                linkPdf.appendChild(pdfIcon);
                linkPdf.innerHTML+="<span style='margin-left:10px;color:gray;font-size:10px;'>"+fileName+"</span>";
                td.appendChild(linkPdf);
            }
            
            row.appendChild(td);

            row.appendChild(buttonCell);
        }

        var deleteButtons=document.getElementsByClassName("btnDeleteEditableTable");
        for (var i = 0; i < deleteButtons.length; i++) 
        {
            var button=deleteButtons[i];
            var buttonOnClick=button.getAttribute("onclick");
            var id_intervento=button.parentElement.parentElement.cells[0].innerText;
            button.setAttribute("onclick","rimuoviFileIntervento("+id_intervento+");setTimeout(function(){ "+buttonOnClick+" }, 500);");
        }

        $("#myTable"+selectetTable).show();
        removeCircleSpinner();
    }
    function rimuoviFileIntervento(id_intervento)
    {
        $.post("rimuoviFileInterventoDiManutenzione.php",
        {
            id_intervento
        },
        function(response, status)
        {
            if(status=="success")
            {
            }
            else
                console.log(status);
        });
    }
    function getFileNameIntervento(id_intervento)
    {
        return new Promise(function (resolve, reject) 
        {
            $.get("getFileNameInterventoDiManutenzione.php",
            {
                id_intervento
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
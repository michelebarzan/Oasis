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
        inputContainer.setAttribute("id","formNuovoInterventoInputContainerTipologia");

        var formInputLabel=document.createElement("div");
        formInputLabel.setAttribute("class","formNuovoInterventoInputLabel");
        formInputLabel.innerHTML="Tipo intervento";

        inputContainer.appendChild(formInputLabel);

        var formInput=document.createElement("select");
        formInput.setAttribute("class","formNuovoInterventoInput");
        formInput.setAttribute("id","formNuovoInterventotipologia");
        formInput.setAttribute("onchange","checkNuovaTipologiaIntervento(this)");

        var tipologieInterventi=await getTipologieInterventi();

        tipologieInterventi.forEach(function(tipo)
        {
            var formInputOption=document.createElement("option");
            formInputOption.setAttribute("value",tipo["id_tipologia"]);
            formInputOption.innerHTML=tipo["label"];

            formInput.appendChild(formInputOption);
        });

        var formInputOption=document.createElement("option");
        formInputOption.setAttribute("value","new");
        formInputOption.innerHTML="Aggiungi tipologia";

        formInput.appendChild(formInputOption);

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
        //formInput.setAttribute("class","formNuovoInterventoInput");
        formInput.setAttribute("id","formNuovoInterventofornitore");

        /*var formInputOption=document.createElement("option");
        formInputOption.setAttribute("value","NULL");
        formInputOption.innerHTML="Nessuno";

        formInput.appendChild(formInputOption);*/

        var fornitori=await getFornitori();

        fornitori.forEach(function(fornitore)
        {
            var formInputOption=document.createElement("option");
            formInputOption.setAttribute("value",fornitore["codice_fornitore"]);
            if(fornitore["codice_fornitore"]=="NESSUNO")
                formInputOption.setAttribute("selected","selected");
            formInputOption.innerHTML=fornitore["nome_fornitore"];

            formInput.appendChild(formInputOption);
        })

        inputContainer.appendChild(formInput);

        fieldsContainer.appendChild(inputContainer);

        //---------------------------------------------------------------------------------------

        //TARGA/N. DI SERIE----------------------------------------------------------------------

        var inputContainer=document.createElement("div");
        inputContainer.setAttribute("class","formNuovoInterventoInputContainer");

        var formInputLabel=document.createElement("div");
        formInputLabel.setAttribute("class","formNuovoInterventoInputLabel");
        formInputLabel.innerHTML="Targa/N. di serie";

        inputContainer.appendChild(formInputLabel);

        var formInput=document.createElement("textarea");
        formInput.setAttribute("class","formNuovoInterventoInput");
        formInput.setAttribute("id","formNuovoInterventotargandiserie");

        inputContainer.appendChild(formInput);

        fieldsContainer.appendChild(inputContainer);

        //---------------------------------------------------------------------------------------

        //UTENTE TRATTATIVA----------------------------------------------------------------------

        var inputContainer=document.createElement("div");
        inputContainer.setAttribute("class","formNuovoInterventoInputContainer");

        var formInputLabel=document.createElement("div");
        formInputLabel.setAttribute("class","formNuovoInterventoInputLabel");
        formInputLabel.innerHTML="Utente trattativa";

        inputContainer.appendChild(formInputLabel);

        var formInput=document.createElement("select");
        formInput.setAttribute("class","formNuovoInterventoInput");
        formInput.setAttribute("id","formNuovoInterventoutentetrattativa");

        var formInputOption=document.createElement("option");
        formInputOption.setAttribute("value","NULL");
        formInputOption.innerHTML="Nessuno";

        formInput.appendChild(formInputOption);

        var utenti=await getArrayUtenti();

        utenti.forEach(function(utente)
        {
            var formInputOption=document.createElement("option");
            formInputOption.setAttribute("value",utente["id_utente"]);
            formInputOption.innerHTML=utente["username"];

            formInput.appendChild(formInputOption);
        })

        inputContainer.appendChild(formInput);

        fieldsContainer.appendChild(inputContainer);

        //---------------------------------------------------------------------------------------

        //IMPORTO PREVISTO-----------------------------------------------------------------------

        var inputContainer=document.createElement("div");
        inputContainer.setAttribute("class","formNuovoInterventoInputContainer");

        var formInputLabel=document.createElement("div");
        formInputLabel.setAttribute("class","formNuovoInterventoInputLabel");
        formInputLabel.innerHTML="Importo previsto";

        inputContainer.appendChild(formInputLabel);

        var formInput=document.createElement("textarea");
        formInput.setAttribute("class","formNuovoInterventoInput");
        formInput.setAttribute("id","formNuovoInterventoimportoprevisto");

        inputContainer.appendChild(formInput);

        fieldsContainer.appendChild(inputContainer);

        //---------------------------------------------------------------------------------------

        //CHIUSO---------------------------------------------------------------------------------

        var inputContainer=document.createElement("div");
        inputContainer.setAttribute("class","formNuovoInterventoInputContainer");

        var formInputLabel=document.createElement("div");
        formInputLabel.setAttribute("class","formNuovoInterventoInputLabel");
        formInputLabel.innerHTML="Chiuso";

        inputContainer.appendChild(formInputLabel);

        var formInput=document.createElement("input");
        formInput.setAttribute("type","checkbox");
        formInput.setAttribute("id","formNuovoInterventochiuso");

        inputContainer.appendChild(formInput);

        fieldsContainer.appendChild(inputContainer);

        //---------------------------------------------------------------------------------------

        //FATTURATO------------------------------------------------------------------------------

        var inputContainer=document.createElement("div");
        inputContainer.setAttribute("class","formNuovoInterventoInputContainer");

        var formInputLabel=document.createElement("div");
        formInputLabel.setAttribute("class","formNuovoInterventoInputLabel");
        formInputLabel.innerHTML="Fatturato";

        inputContainer.appendChild(formInputLabel);

        var formInput=document.createElement("input");
        formInput.setAttribute("type","checkbox");
        formInput.setAttribute("id","formNuovoInterventofatturato");

        inputContainer.appendChild(formInput);

        fieldsContainer.appendChild(inputContainer);

        //---------------------------------------------------------------------------------------

        //ORDINARIO------------------------------------------------------------------------------

        var inputContainer=document.createElement("div");
        inputContainer.setAttribute("class","formNuovoInterventoInputContainer");

        var formInputLabel=document.createElement("div");
        formInputLabel.setAttribute("class","formNuovoInterventoInputLabel");
        formInputLabel.innerHTML="Ordinario";

        inputContainer.appendChild(formInputLabel);

        var formInput=document.createElement("input");
        formInput.setAttribute("type","radio");
        formInput.setAttribute("value","ordinario");
        formInput.setAttribute("checked","checked");
        formInput.setAttribute("name","straordinarioordinario");
        formInput.setAttribute("id","formNuovoInterventoordinario");
        formInput.setAttribute("class","formNuovoInterventostraordinarioordinario");

        inputContainer.appendChild(formInput);

        fieldsContainer.appendChild(inputContainer);

        //---------------------------------------------------------------------------------------

        //STRAORDINARIO--------------------------------------------------------------------------

        var inputContainer=document.createElement("div");
        inputContainer.setAttribute("class","formNuovoInterventoInputContainer");

        var formInputLabel=document.createElement("div");
        formInputLabel.setAttribute("class","formNuovoInterventoInputLabel");
        formInputLabel.innerHTML="Straordinario";

        inputContainer.appendChild(formInputLabel);

        var formInput=document.createElement("input");
        formInput.setAttribute("type","radio");
        formInput.setAttribute("value","straordinario");
        formInput.setAttribute("name","straordinarioordinario");
        formInput.setAttribute("id","formNuovoInterventostraordinario");
        formInput.setAttribute("class","formNuovoInterventostraordinarioordinario");

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

                        $('#formNuovoInterventofornitore').selectize({
                            create: false,
                            sortField: 'text'
                        });
                        $('.selectize-control').css
                        ({
                            "width": "calc(100% - 190px)",
                            "float": "left",
                            "display": "block",
                            "height": "30px",
                            "margin-left": "20px"
                        });
                        $('.selectize-input').css
                        ({
                            "padding": "0",
                            "height": "30px",
                            "line-height": "30px",
                            "border": "1px solid #aaa",
                            "border-radius": "2px",
                            "text-align": "left",
                            "padding-left": "8px"
                        });
                        $('.selectize-dropdown').css
                        ({
                            "text-align": "left"
                        });
                    }
        });
    }
    function checkNuovaTipologiaIntervento(select)
    {
        var value=select.value;
        if(value=="new")
        {
            select.style.display="none";
            document.getElementById("nuovoInterventoConfirmButton").disabled =true;

            var nuovaTipologiaContainer=document.createElement("div");
            nuovaTipologiaContainer.setAttribute("id","formNuovoInterventoNuovaTipologiaContainer");

            var inputNomeNuovaTipologia=document.createElement("textarea");
            inputNomeNuovaTipologia.setAttribute("class","formNuovoInterventoInput");
            inputNomeNuovaTipologia.setAttribute("style","width:calc(100% - 150px);margin-left:0px;resize:none");
            inputNomeNuovaTipologia.setAttribute("id","formNuovoInterventoInputNomeNuovaTipologia");
            inputNomeNuovaTipologia.setAttribute("placeholder","Nome nuova tipologia...");

            nuovaTipologiaContainer.appendChild(inputNomeNuovaTipologia);
            
            var buttonInserisciNuovaTipologia=document.createElement("button");
            buttonInserisciNuovaTipologia.setAttribute("onclick","inserisciNuovaTipologia()");
            buttonInserisciNuovaTipologia.setAttribute("class","formNuovoInterventoButtonNuovaTipologia");
            buttonInserisciNuovaTipologia.setAttribute("style","background-color:#2196F3");
            buttonInserisciNuovaTipologia.setAttribute("type","button");
            buttonInserisciNuovaTipologia.innerHTML='Inserisci <i style="margin-left:10px;" class="fad fa-plus"></i>';

            nuovaTipologiaContainer.appendChild(buttonInserisciNuovaTipologia);

            var inputDescrizioneNuovaTipologia=document.createElement("textarea");
            inputDescrizioneNuovaTipologia.setAttribute("class","formNuovoInterventoInput");
            inputDescrizioneNuovaTipologia.setAttribute("style","width:calc(100% - 150px);margin-left:0px;margin-top:10px;resize:none");
            inputDescrizioneNuovaTipologia.setAttribute("id","formNuovoInterventoInputDescrizioneNuovaTipologia");
            inputDescrizioneNuovaTipologia.setAttribute("placeholder","Descrizione nuova tipologia...");

            nuovaTipologiaContainer.appendChild(inputDescrizioneNuovaTipologia);

            var buttonAnnullaNuovaTipologia=document.createElement("button");
            buttonAnnullaNuovaTipologia.setAttribute("onclick","annullaNuovaTipologia()");
            buttonAnnullaNuovaTipologia.setAttribute("class","formNuovoInterventoButtonNuovaTipologia");
            buttonAnnullaNuovaTipologia.setAttribute("style","background-color:#d43f3a;margin-top:10px;");
            buttonAnnullaNuovaTipologia.setAttribute("type","button");
            buttonAnnullaNuovaTipologia.innerHTML='Annulla <i style="margin-left:10px;" class="fad fa-undo-alt"></i>';

            nuovaTipologiaContainer.appendChild(buttonAnnullaNuovaTipologia);

            document.getElementById("formNuovoInterventoInputContainerTipologia").appendChild(nuovaTipologiaContainer);
        }
    }
    function inserisciNuovaTipologia()
    {
        var tipologia=document.getElementById("formNuovoInterventoInputNomeNuovaTipologia").value;
        var descrizione=document.getElementById("formNuovoInterventoInputDescrizioneNuovaTipologia").value;
        if(tipologia!=null && tipologia!='')
        {
            $.post("inserisciNuovaTipologiaInterventoDiManutenzione.php",
            {
                tipologia,
                descrizione
            },
            function(response, status)
            {
                if(status=="success")
                {
                    if(response.indexOf("error")>-1 || response.indexOf("notice")>-1 || response.indexOf("warning")>-1)
                    {
                        window.alert("Errore\nSe il problema persiste contatta l' amministratore")
                        console.log(response);
                    }
                    else
                    {
                        var id_tipologia=response;

                        var formInputOption=document.createElement("option");
                        formInputOption.setAttribute("value",id_tipologia);
                        formInputOption.innerHTML=tipologia;

                        document.getElementById("formNuovoInterventotipologia").appendChild(formInputOption);

                        document.getElementById("formNuovoInterventotipologia").value=id_tipologia;

                        document.getElementById("formNuovoInterventoNuovaTipologiaContainer").remove();
                        document.getElementById("formNuovoInterventotipologia").style.display="block";
                        document.getElementById("nuovoInterventoConfirmButton").disabled =false;
                    }
                }
                else
                    console.log(status);
            });
        }
        else
        {
            window.alert("Inserisci un nome per la categoria valido");
        }
    }
    function annullaNuovaTipologia()
    {
        document.getElementById("formNuovoInterventoNuovaTipologiaContainer").remove();
        document.getElementById("formNuovoInterventotipologia").style.display="block";
        document.getElementById("nuovoInterventoConfirmButton").disabled =false;
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
    function getArrayUtenti()
    {
        return new Promise(function (resolve, reject) 
        {
            $.get("getArrayUtenti.php",
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
    function getTipologieInterventi()
    {
        return new Promise(function (resolve, reject) 
        {
            $.get("getTipologieInterventiDiManutenzione.php",
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
        var tipologia=document.getElementById("formNuovoInterventotipologia").value;
        var fornitore=document.getElementById("formNuovoInterventofornitore").value;
        var targa_n_di_serie=document.getElementById("formNuovoInterventotargandiserie").value;
        var utente_trattativa=document.getElementById("formNuovoInterventoutentetrattativa").value;
        var importo_previsto=document.getElementById("formNuovoInterventoimportoprevisto").value;
        var chiuso=document.getElementById("formNuovoInterventochiuso").checked.toString();
        var fatturato=document.getElementById("formNuovoInterventofatturato").checked.toString();
        var ordinario=document.getElementById("formNuovoInterventoordinario").checked.toString();
        var straordinario=document.getElementById("formNuovoInterventostraordinario").checked.toString();
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
        console.log(tipologia);
        console.log(fornitore);
        console.log(utentiInvioMail);
        console.log(allegato);
        console.log(note);
        console.log(targa_n_di_serie);
        console.log(utente_trattativa);
        console.log(importo_previsto);
        console.log(chiuso);
        console.log(fatturato);
        console.log(ordinario);
        console.log(straordinario);*/

        $.post("inserisciNuovoInterventoDiManutenzione.php",
        {
            titolo,
            tipologia,
            fornitore,
            note,
            targa_n_di_serie,
            utente_trattativa,
            importo_previsto,
            chiuso,
            fatturato,
            ordinario,
            straordinario
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
        getTable("interventi_di_manutenzione_view","data","DESC");
    }
    function getTable(table,orderBy,orderType)
    {
        getEditableTable
        ({
            table,
            primaryKey:"id_intervento",
            editable: true,
            container:'interventiDiManutenzioneContainer',
            noFilterColumns:['note','data','utente_trattativa'],
            readOnlyColumns: ["id_intervento","data","utente","fornitore","tipo","utente_trattativa","chiuso","fatturato","ordinario","straordinario","tipologia"],
            noInsertColumns: ["id_intervento","data","utente","fornitore","tipo","utente_trattativa","chiuso","fatturato","ordinario","straordinario","tipologia"],
            foreignKeys:[['tipologia','tipologie_interventi_di_manutenzione','id_tipologia','label'],['utente','utenti','id_utente','username'],['fornitore','anagrafica_fornitori','codice_fornitore','nome_fornitore'],['utente_trattativa','utenti','id_utente','username']],
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

        var headerColNum=row.cells.length-1;
        var buttonCell=table.rows[0].cells[headerColNum];
        table.rows[0].cells[headerColNum].remove();

        th.innerHTML="Preventivo";
        row.appendChild(th);

        row.appendChild(buttonCell);

        var bodyColNum=table.rows[1].cells.length-1;

        for (var i = 1, row; row = table.rows[i]; i++)
        {
            var id_intervento=row.cells[0].innerText;

            var buttonCell=row.cells[bodyColNum];
            row.cells[bodyColNum].remove();

            var td=document.createElement("td");
            td.setAttribute("style","text-align:left");
            td.setAttribute("added","true");

            var fileName=await getFileNameIntervento(id_intervento);

            if(fileName!="nofile")
            {
                var linkPdf=document.createElement("a");
                linkPdf.setAttribute("href","http://remote.oasisgroup.it/OasisAllegatiInterventiDiManutenzione/"+fileName);
                linkPdf.setAttribute("target","blank");
                linkPdf.setAttribute("style","text-decoration:none");
                linkPdf.setAttribute("class","linkPdfEditableTable");
                linkPdf.setAttribute("title","Link al PDF ("+fileName+")");
                var pdfIcon=document.createElement("i");
                pdfIcon.setAttribute("class","fad fa-file-pdf iconPdfEditableTable");
                linkPdf.appendChild(pdfIcon);
                //linkPdf.innerHTML+="<span style='margin-left:10px;color:gray;font-size:10px;'>"+fileName+"</span>";
                td.appendChild(linkPdf);
            }
            else
                td.innerHTML="NO";
            
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
    function scaricaExcel(container)
    {
        table=selectetTable;
        var oldTable=document.getElementById(container).innerHTML;
        document.getElementById("myTable"+table).deleteRow(0);
        var row = document.getElementById("myTable"+table).insertRow(0);
        var j=0;
        columns.forEach(function(colonna)
        {
            if(j==6)
            {
                var cell = row.insertCell(j);
                cell.innerHTML = "Preventivo";
            }
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
                if(j==7 && col.childNodes[0]!=undefined)
                {
                    col.childNodes[0].innerHTML="Link PDF";
                }
                if(j==8)
                {
                    col.innerHTML="";
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
        
        exportTableToExcel("myTable"+table, "Interventi_di_manutenzione");
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
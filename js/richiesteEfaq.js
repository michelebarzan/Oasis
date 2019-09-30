var colonneMacrocategoriaContainer;
var utentiMacrocategoriaContainer;
var colonneExtra=[];
var utentiExtra=[];
var view;
var tmpViewName;
var richieste=[];

async function apriPopupNuovaRichiesta()
{
    try{document.getElementById("colonneMacrocategoriaContainer").remove();}catch(error){}
    colonneMacrocategoriaContainer=document.createElement("div");
    colonneMacrocategoriaContainer.setAttribute("id","colonneMacrocategoriaContainer")

    try{document.getElementById("utentiMacrocategoriaContainer").remove();}catch(error){}
    utentiMacrocategoriaContainer=document.createElement("div");
    utentiMacrocategoriaContainer.setAttribute("id","utentiMacrocategoriaContainer")

    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","nuovaRichiestaOuterContainer");
    outerContainer.setAttribute("id","nuovaRichiestaOuterContainer");
    /*outerContainer.setAttribute("data-step","4");
    outerContainer.setAttribute("data-intro","Per inserire la richiesta compila i campi. L' elenco dei campi da compilare può variare in base alla macrocateogia selezionata.");*/

    var form=document.createElement("form");
    form.setAttribute("id","formNuovaRichiesta");
    form.setAttribute("onsubmit","inserisciNuovaRichiesta(event)");

    fieldsContainer=document.createElement("div");
    
    //OGGETTO--------------------------------------------------------------------------------

    var inputContainer=document.createElement("div");
    inputContainer.setAttribute("class","formNuovaRichiestaInputContainer");

    var formInputLabel=document.createElement("div");
    formInputLabel.setAttribute("class","formNuovaRichiestaInputLabel");
    formInputLabel.innerHTML="Oggetto";

    inputContainer.appendChild(formInputLabel);

    var formInput=document.createElement("textarea");
    formInput.setAttribute("required","required");
    formInput.setAttribute("class","formNuovaRichiestaInput");
    formInput.setAttribute("id","formNuovaRichiestaoggetto");

    inputContainer.appendChild(formInput);

    fieldsContainer.appendChild(inputContainer);

    //---------------------------------------------------------------------------------------

    //DESCRIZIONE----------------------------------------------------------------------------

    var inputContainer=document.createElement("div");
    inputContainer.setAttribute("class","formNuovaRichiestaInputContainer");

    var formInputLabel=document.createElement("div");
    formInputLabel.setAttribute("class","formNuovaRichiestaInputLabel");
    formInputLabel.innerHTML="Descrizione";

    inputContainer.appendChild(formInputLabel);

    var formInput=document.createElement("textarea");
    formInput.setAttribute("required","required");
    formInput.setAttribute("class","formNuovaRichiestaInput");
    formInput.setAttribute("id","formNuovaRichiestadescrizione");

    inputContainer.appendChild(formInput);

    fieldsContainer.appendChild(inputContainer);
    
    //---------------------------------------------------------------------------------------

    //NOTE-----------------------------------------------------------------------------------

    var inputContainer=document.createElement("div");
    inputContainer.setAttribute("class","formNuovaRichiestaInputContainer");

    var formInputLabel=document.createElement("div");
    formInputLabel.setAttribute("class","formNuovaRichiestaInputLabel");
    formInputLabel.innerHTML="Note";

    inputContainer.appendChild(formInputLabel);

    var formInput=document.createElement("textarea");
    formInput.setAttribute("class","formNuovaRichiestaInput");
    formInput.setAttribute("id","formNuovaRichiestanote");

    inputContainer.appendChild(formInput);

    fieldsContainer.appendChild(inputContainer);
    
    //---------------------------------------------------------------------------------------

    //ALLEGATI-------------------------------------------------------------------------------

    var inputContainer=document.createElement("div");
    inputContainer.setAttribute("class","formNuovaRichiestaInputContainer");

    var formInputLabel=document.createElement("div");
    formInputLabel.setAttribute("class","formNuovaRichiestaInputLabel");
    formInputLabel.innerHTML="Allegati";

    inputContainer.appendChild(formInputLabel);

    var containerScegliFile=document.createElement("div");
    containerScegliFile.setAttribute("class","formNuovaRichiestaContainerScegliFile");

    var buttonScegliFile=document.createElement("button");
    buttonScegliFile.setAttribute("id","formNuovaRichiestaButtonScegliFile");
    buttonScegliFile.innerHTML='Scegli file <i class="fad fa-file-search" style="margin-left:10px"></i>';
    buttonScegliFile.setAttribute("type","button");
    buttonScegliFile.setAttribute("onclick","document.getElementById('formNuovaRichiestaInputScegliFile').click()");

    containerScegliFile.appendChild(buttonScegliFile);

    var inputScegliFile=document.createElement("input");
    inputScegliFile.setAttribute("type","file");
    inputScegliFile.setAttribute("id","formNuovaRichiestaInputScegliFile");
    inputScegliFile.setAttribute("onchange","getChoosedFiles('Richiesta')");
    inputScegliFile.setAttribute("multiple","multiple");

    containerScegliFile.appendChild(inputScegliFile);

    var buttonRimuoviFile=document.createElement("button");
    buttonRimuoviFile.setAttribute("id","formNuovaRichiestaButtonRimuoviFile");
    buttonRimuoviFile.innerHTML='Rimuovi file <i class="fad fa-file-minus" style="margin-left:10px"></i>';
    buttonRimuoviFile.setAttribute("type","button");
    buttonRimuoviFile.setAttribute("onclick","rimuoviFileNuovaRichiesta()");

    containerScegliFile.appendChild(buttonRimuoviFile);

    var fileListTableContainer=document.createElement("div");
    fileListTableContainer.setAttribute("id","formNuovaRichiestaFileListTableContainer");

    var uploadFileTable=document.createElement("table");
    uploadFileTable.setAttribute("class","formNuovaRichiestaFileListTable");
    uploadFileTable.setAttribute("id","formNuovaRichiestaFileListTable");
    
    fileListTableContainer.appendChild(uploadFileTable);

    containerScegliFile.appendChild(fileListTableContainer);

    inputContainer.appendChild(containerScegliFile);

    fieldsContainer.appendChild(inputContainer);

    //---------------------------------------------------------------------------------------

    //MACROCATEGORIA-------------------------------------------------------------------------

    var inputContainer=document.createElement("div");
    inputContainer.setAttribute("class","formNuovaRichiestaInputContainer");

    var formInputLabel=document.createElement("div");
    formInputLabel.setAttribute("class","formNuovaRichiestaInputLabel");
    formInputLabel.innerHTML="Macrocategoria";

    inputContainer.appendChild(formInputLabel);

    var formInput=document.createElement("select");
    formInput.setAttribute("class","formNuovaRichiestaInput");
    formInput.setAttribute("id","formNuovaRichiestamacrocategoria");
    formInput.setAttribute("required","required");
    formInput.setAttribute("onchange","getColonneMacrocategoria(this.value);getUtentiMacrocategoria(this.value)");

    var response=await getMacrocategorie();
    var macrocategorie=response.macrocategorie;
    var macrocategoriaPredefinita=response.macrocategoriaPredefinita;

    if(macrocategoriaPredefinita!=null)
    {
        var formInputOption=document.createElement("option");
        formInputOption.setAttribute("value",macrocategoriaPredefinita.id_macrocategoria);
        formInputOption.innerHTML=macrocategoriaPredefinita.nome+" ("+macrocategoriaPredefinita.descrizione+")";

        formInput.appendChild(formInputOption);
    }
    macrocategorie.forEach(function(macrocategoria)
    {
        var formInputOption=document.createElement("option");
        formInputOption.setAttribute("value",macrocategoria.id_macrocategoria);
        formInputOption.innerHTML=macrocategoria.nome+" ("+macrocategoria.descrizione+")";

        formInput.appendChild(formInputOption);
    });

    inputContainer.appendChild(formInput);

    fieldsContainer.appendChild(inputContainer);
    
    //---------------------------------------------------------------------------------------

    //CATEGORIA------------------------------------------------------------------------------

    var inputContainer=document.createElement("div");
    inputContainer.setAttribute("class","formNuovaRichiestaInputContainer");
    inputContainer.setAttribute("id","formNuovaRichiestaInputContainerCategoria");

    var formInputLabel=document.createElement("div");
    formInputLabel.setAttribute("class","formNuovaRichiestaInputLabel");
    formInputLabel.innerHTML="Categoria";

    inputContainer.appendChild(formInputLabel);

    var formInput=document.createElement("select");
    formInput.setAttribute("class","formNuovaRichiestaInput");
    formInput.setAttribute("id","formNuovaRichiestacategoria");
    formInput.setAttribute("onchange","checkNuovaCategoria(this,this.value)");
    formInput.setAttribute("required","required");

    var categorie=await getCategorie();
    categorie.forEach(function(categoria)
    {
        var formInputOption=document.createElement("option");
        formInputOption.setAttribute("value",categoria.id_categoria);
        formInputOption.innerHTML=categoria.nome+" ("+categoria.descrizione+")";

        formInput.appendChild(formInputOption);
    });

    var formInputOption=document.createElement("option");
    formInputOption.setAttribute("value","new");
    formInputOption.innerHTML="Aggiungi categoria...";

    formInput.appendChild(formInputOption);

    inputContainer.appendChild(formInput);

    fieldsContainer.appendChild(inputContainer);
    
    //---------------------------------------------------------------------------------------

    //COLONNE MACROCATEGORIA-----------------------------------------------------------------

    fieldsContainer.appendChild(colonneMacrocategoriaContainer);

    if(macrocategoriaPredefinita!=null)
        await getColonneMacrocategoria(macrocategoriaPredefinita.id_macrocategoria);
    else
        await getColonneMacrocategoria(macrocategorie[0].id_macrocategoria);

    //---------------------------------------------------------------------------------------

    //UTENTI MACROCATEGORIA------------------------------------------------------------------

    fieldsContainer.appendChild(utentiMacrocategoriaContainer);

    if(macrocategoriaPredefinita!=null)
        await getUtentiMacrocategoria(macrocategoriaPredefinita.id_macrocategoria);
    else
        await getUtentiMacrocategoria(macrocategorie[0].id_macrocategoria);

    //---------------------------------------------------------------------------------------

    var buttonContainer=document.createElement("div");
    buttonContainer.setAttribute("class","nuovaRichiestaButtonContainer");

    var confirmButton=document.createElement("button");
    confirmButton.setAttribute("class","nuovaRichiestaButton");
    confirmButton.setAttribute("id","nuovaRichiestaConfirmButton");
    confirmButton.setAttribute("type","submit");
    confirmButton.setAttribute("style","margin-left:15%;float:left");
    confirmButton.innerHTML='Conferma <i class="fad fa-layer-plus" style="margin-left:10px"></i>';

    buttonContainer.appendChild(confirmButton);

    var cancelButton=document.createElement("button");
    cancelButton.setAttribute("class","nuovaRichiestaButton");
    cancelButton.setAttribute("onclick","Swal.close()");
    cancelButton.setAttribute("id","nuovaRichiestaCancelButton");
    cancelButton.setAttribute("style","color:red;margin-right:15%;float:right");
    cancelButton.setAttribute("type","button");
    cancelButton.innerHTML='Annulla <i class="fal fa-window-close" style="margin-left:10px"></i>';

    buttonContainer.appendChild(cancelButton);

    form.appendChild(fieldsContainer);
    form.appendChild(buttonContainer);

    outerContainer.appendChild(form);

    Swal.fire
    ({
        title: 'Nuova richiesta',
        width:"800px",
        background: "#e2e1e0",
        html: outerContainer.outerHTML,
        showConfirmButton: false,
        showCancelButton : false,
        showCloseButton: true,
        allowOutsideClick:false,
        onOpen : function()
                {
                    
                }
    });
}
function getChoosedFiles(tipo)
{
    document.getElementById("formNuova"+tipo+"FileListTable").innerHTML="";

    var files = document.getElementById("formNuova"+tipo+"InputScegliFile").files;
    for (var i = 0; i < files.length; i++)
    {
        var file=files[i];
        //console.log(file);
        var fileName= file.name;
        var fileSize_kb= file.size;
        var fileSize_mb=fileSize_kb/1000000;
        //console.log(fileName);
        var uploadFileTableRow=document.createElement("tr");

        var uploadFileTableColumn=document.createElement("td");
        uploadFileTableColumn.innerHTML=fileName;
        uploadFileTableRow.appendChild(uploadFileTableColumn);

        var uploadFileTableColumn=document.createElement("td");
        if(fileSize_mb<90)
        {
            uploadFileTableColumn.setAttribute("style","text-align:right;color:green");
            uploadFileTableRow.setAttribute("title","In attesa di essere caricato");
        }
        else
        {
            uploadFileTableColumn.setAttribute("style","text-align:right;color:#d43f3a");
            uploadFileTableRow.setAttribute("title","Dimensione massima 100 MB");
        }
        uploadFileTableColumn.innerHTML=fileSize_mb+" MB";
        uploadFileTableRow.appendChild(uploadFileTableColumn);

        var uploadFileTableColumn=document.createElement("td");
        uploadFileTableColumn.setAttribute("style","text-align:left;width:25px");
        uploadFileTableColumn.setAttribute("id","statusUpload"+fileName);
        if(fileSize_mb<90)
            uploadFileTableColumn.innerHTML='<i style="color:#2196F3" class="fad fa-stopwatch"></i>';
        else
            uploadFileTableColumn.innerHTML='<i style="color:#d43f3a" class="far fa-exclamation-circle"></i>';
        uploadFileTableRow.appendChild(uploadFileTableColumn);

        document.getElementById("formNuova"+tipo+"FileListTable").appendChild(uploadFileTableRow);
    }
}
function rimuoviFileNuovaRichiesta()
{
    var files = document.getElementById("formNuovaRichiestaInputScegliFile").files;
    if(files.length>0)
    {
        for (var i = 0; i < files.length; i++)
        {
            var fileName=files[i].name;
            var row=document.getElementById("statusUpload"+fileName).parentElement;
            row.remove();
        }
        document.getElementById('formNuovaRichiestaInputScegliFile').value = "";
    }
}
function rimuoviFileNuovaReplica()
{
    var files = document.getElementById("formNuovaReplicaInputScegliFile").files;
    if(files.length>0)
    {
        for (var i = 0; i < files.length; i++)
        {
            var fileName=files[i].name;
            var row=document.getElementById("statusUpload"+fileName).parentElement;
            row.remove();
        }
        document.getElementById('formNuovaReplicaInputScegliFile').value = "";
    }
}
function getMacrocategorie()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getMacrocategorie.php",
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
function getCategorie()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getCategorie.php",
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
function getColonneMacrocategoria(id_macrocategoria)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getColonneMacrocategoria.php",
        {
            id_macrocategoria
        },
        function(response, status)
        {
            if(status=="success")
            {
                try{document.getElementById("colonneMacrocategoriaContainer").innerHTML="";}catch(error){}
                colonneExtra=[];
                
                if(response.indexOf("error")>-1 || response.indexOf("notice")>-1 || response.indexOf("warning")>-1)
                {
                    Swal.fire
                    ({
                        type: 'error',
                        title: 'Errore',
                        text: "Se il problema persiste contatta l' amministratore"
                    });
                    resolve("error");
                    console.log(response);
                }
                else
                {
                    resolve("ok");

                    var colonneMacrocategoria= JSON.parse(response);

                    //console.log(colonneMacrocategoria);

                    colonneMacrocategoria.forEach(function(colonna)
                    {
                        colonneExtra.push(colonna["colonna"]);

                        //COLONNA--------------------------------------------------------------------------------

                        var inputContainer=document.createElement("div");
                        inputContainer.setAttribute("class","formNuovaRichiestaInputContainer");

                        var formInputLabel=document.createElement("div");
                        formInputLabel.setAttribute("class","formNuovaRichiestaInputLabel");
                        formInputLabel.innerHTML=colonna["label"];

                        inputContainer.appendChild(formInputLabel);

                        var formInput=document.createElement(colonna["tipo"]);
                        formInput.setAttribute("class","formNuovaRichiestaInput");
                        formInput.setAttribute("id","formNuovaRichiesta"+colonna["colonna"]);

                        /*if(colonna["required"]=="true")
                            formInput.setAttribute("required","required");*/

                        if(colonna["tipo"]=="select")
                        {
                            var options=colonna["valori"];
                            options.forEach(function(option)
                            {
                                var formInputOption=document.createElement("option");
                                formInputOption.setAttribute("value",option.value);
                                formInputOption.innerHTML=option.label;

                                formInput.appendChild(formInputOption);
                            });
                            //console.log(options);
                        }

                        inputContainer.appendChild(formInput);

                        try
                        {
                            document.getElementById("colonneMacrocategoriaContainer").appendChild(inputContainer);
                        }
                        catch(error)
                        {
                            colonneMacrocategoriaContainer.appendChild(inputContainer);
                        }
                        
                        //---------------------------------------------------------------------------------------
                    });
                }
            }
            else
                reject({status});
        });
    });
}
function getUtentiMacrocategoria(id_macrocategoria)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getUtentiMacrocategoria.php",
        {
            id_macrocategoria
        },
        function(response, status)
        {
            if(status=="success")
            {
                try{document.getElementById("utentiMacrocategoriaContainer").innerHTML="";}catch(error){}
                utentiExtra=[];
                
                if(response.indexOf("error")>-1 || response.indexOf("notice")>-1 || response.indexOf("warning")>-1)
                {
                    Swal.fire
                    ({
                        type: 'error',
                        title: 'Errore',
                        text: "Se il problema persiste contatta l' amministratore"
                    });
                    resolve("error");
                    console.log(response);
                }
                else
                {
                    resolve("ok");

                    var utentiMacrocategoria= JSON.parse(response);

                    var inputContainer=document.createElement("div");
                    inputContainer.setAttribute("class","formNuovaRichiestaInputContainer");

                    var formInputLabel=document.createElement("div");
                    formInputLabel.setAttribute("class","formNuovaRichiestaInputLabel");
                    formInputLabel.innerHTML="Utenti";

                    var buttonAggiungiUtente=document.createElement("i");
                    buttonAggiungiUtente.setAttribute("class","formNuovaRichiestaButtonAggiungiUtente");
                    buttonAggiungiUtente.setAttribute("title","Aggiungi utente");
                    //buttonAggiungiUtente.setAttribute("onclick","openSelectAggiungiUtente(event)");

                    var iconAggiungiUtente=document.createElement("i");
                    iconAggiungiUtente.setAttribute("class","fad fa-user");
                    iconAggiungiUtente.setAttribute("style","margin-left:5px");

                    buttonAggiungiUtente.appendChild(iconAggiungiUtente);

                    var selectAggiungiUtente=document.createElement("select");
                    selectAggiungiUtente.setAttribute("id","formNuovaRichiestaSelectAggiungiUtente");
                    selectAggiungiUtente.setAttribute("onchange","aggiungiUtenteRichiesta(this.value)");

                    var selectAggiungiUtenteOption=document.createElement("option");
                    selectAggiungiUtenteOption.setAttribute("value","");
                    selectAggiungiUtenteOption.setAttribute("selected","selected");
                    selectAggiungiUtenteOption.setAttribute("disabled","disabled");
                    selectAggiungiUtenteOption.innerHTML="";
                    selectAggiungiUtente.appendChild(selectAggiungiUtenteOption);

                    $.get("getElencoUtentiAggiungiUtente.php",
                    {
                        id_macrocategoria
                    },
                    function(response, status)
                    {
                        if(status=="success")
                        {
                            var elencoUtentiAggiungiUtente=JSON.parse(response);
                            elencoUtentiAggiungiUtente.forEach(function(utente)
                            {
                                var selectAggiungiUtenteOption=document.createElement("option");
                                selectAggiungiUtenteOption.setAttribute("value",utente["id_utente"]);
                                selectAggiungiUtenteOption.innerHTML=utente["username"];
                                selectAggiungiUtente.appendChild(selectAggiungiUtenteOption);
                            });
                            
                            buttonAggiungiUtente.appendChild(selectAggiungiUtente);
                            
                            formInputLabel.appendChild(buttonAggiungiUtente);

                            inputContainer.appendChild(formInputLabel);

                            var utentiCoinvoltiListContainer=document.createElement("div");
                            utentiCoinvoltiListContainer.setAttribute("class","formNuovaRichiestaUtentiCoinvoltiListContainer");

                            var utentiCoinvoltiList=document.createElement("ul");
                            utentiCoinvoltiList.setAttribute("id","formNuovaRichiestaUtentiCoinvoltiList");

                            utentiMacrocategoria.forEach(function(utente)
                            {
                                var utentiCoinvoltiListItem=document.createElement("li");

                                var utentiCoinvoltiListItemDiv=document.createElement("div");
                                utentiCoinvoltiListItemDiv.innerHTML=utente["username"];

                                utentiCoinvoltiListItem.appendChild(utentiCoinvoltiListItemDiv);

                                utentiCoinvoltiList.appendChild(utentiCoinvoltiListItem);

                                //utentiExtra.push(utente["id_utente"]);
                            });

                            utentiCoinvoltiListContainer.appendChild(utentiCoinvoltiList);
                            inputContainer.appendChild(utentiCoinvoltiListContainer);

                            try
                            {
                                document.getElementById("utentiMacrocategoriaContainer").appendChild(inputContainer);
                            }
                            catch(error)
                            {
                                utentiMacrocategoriaContainer.appendChild(inputContainer);
                            }
                        }
                        else
                            console.log(status);
                    });
                }
            }
            else
                reject({status});
        });
    });
}
async function aggiungiUtenteRichiesta(id_utente)
{
    document.getElementById("formNuovaRichiestaSelectAggiungiUtente").value="";
    if(!utentiExtra.includes(id_utente))
    {
        utentiExtra.push(id_utente);
        var username=await getUsernameById(id_utente);

        var utentiCoinvoltiListItem=document.createElement("li");

        var utentiCoinvoltiListItemDiv=document.createElement("div");
        utentiCoinvoltiListItemDiv.innerHTML=username;

        utentiCoinvoltiListItem.appendChild(utentiCoinvoltiListItemDiv);

        var utentiCoinvoltiListItemButton=document.createElement("button");
        utentiCoinvoltiListItemButton.setAttribute("title","Rimuovi utente");
        utentiCoinvoltiListItemButton.setAttribute("onclick","this.parentElement.remove();rimuoviUtenteRichiesta("+id_utente+")");

        var utentiCoinvoltiListItemButtonIcon=document.createElement("i");
        utentiCoinvoltiListItemButtonIcon.setAttribute("class","fad fa-user-minus");

        utentiCoinvoltiListItemButton.appendChild(utentiCoinvoltiListItemButtonIcon);

        utentiCoinvoltiListItem.appendChild(utentiCoinvoltiListItemButton);

        document.getElementById("formNuovaRichiestaUtentiCoinvoltiList").appendChild(utentiCoinvoltiListItem);
    }
}
function rimuoviUtenteRichiesta(id_utente)
{
    var index = utentiExtra.indexOf(id_utente.toString());
    if (index !== -1)
        utentiExtra.splice(index, 1);
}
function getUsernameById(id_utente)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getUsernameById.php",
        {
            id_utente
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
function checkNuovaCategoria(select,categoria)
{
    if(categoria=="new")
    {
        //select.remove();
        select.style.display="none";
        document.getElementById("nuovaRichiestaConfirmButton").disabled =true;

        var nuovaCategoriaContainer=document.createElement("div");
        nuovaCategoriaContainer.setAttribute("id","formNuovaRichiestaNuovaCategoriaContainer");

        var inputNomeNuovaCategoria=document.createElement("textarea");
        inputNomeNuovaCategoria.setAttribute("class","formNuovaRichiestaInput");
        inputNomeNuovaCategoria.setAttribute("style","width:calc(100% - 150px);margin-left:0px;resize:none");
        inputNomeNuovaCategoria.setAttribute("id","formNuovaRichiestaInputNomeNuovaCategoria");
        inputNomeNuovaCategoria.setAttribute("placeholder","Nome nuova categoria...");

        nuovaCategoriaContainer.appendChild(inputNomeNuovaCategoria);
        
        var buttonInserisciNuovaCategoria=document.createElement("button");
        buttonInserisciNuovaCategoria.setAttribute("onclick","inserisciNuovaCateogoria()");
        buttonInserisciNuovaCategoria.setAttribute("class","formNuovaRichiestaButtonNuovaCategoria");
        buttonInserisciNuovaCategoria.setAttribute("style","background-color:#2196F3");
        buttonInserisciNuovaCategoria.setAttribute("type","button");
        buttonInserisciNuovaCategoria.innerHTML='Inserisci <i style="margin-left:10px;" class="fad fa-plus"></i>';

        nuovaCategoriaContainer.appendChild(buttonInserisciNuovaCategoria);

        var inputDescrizioneNuovaCategoria=document.createElement("textarea");
        inputDescrizioneNuovaCategoria.setAttribute("class","formNuovaRichiestaInput");
        inputDescrizioneNuovaCategoria.setAttribute("style","width:calc(100% - 150px);margin-left:0px;margin-top:10px;resize:none");
        inputDescrizioneNuovaCategoria.setAttribute("id","formNuovaRichiestaInputDescrizioneNuovaCategoria");
        inputDescrizioneNuovaCategoria.setAttribute("placeholder","Descrizione nuova categoria...");

        nuovaCategoriaContainer.appendChild(inputDescrizioneNuovaCategoria);

        var buttonAnnullaNuovaCategoria=document.createElement("button");
        buttonAnnullaNuovaCategoria.setAttribute("onclick","annullaNuovaCateogoria()");
        buttonAnnullaNuovaCategoria.setAttribute("class","formNuovaRichiestaButtonNuovaCategoria");
        buttonAnnullaNuovaCategoria.setAttribute("style","background-color:#d43f3a;margin-top:10px;");
        buttonAnnullaNuovaCategoria.setAttribute("type","button");
        buttonAnnullaNuovaCategoria.innerHTML='Annulla <i style="margin-left:10px;" class="fad fa-undo-alt"></i>';

        nuovaCategoriaContainer.appendChild(buttonAnnullaNuovaCategoria);

        document.getElementById("formNuovaRichiestaInputContainerCategoria").appendChild(nuovaCategoriaContainer);
    }
}
function annullaNuovaCateogoria()
{
    document.getElementById("formNuovaRichiestaNuovaCategoriaContainer").remove();
    document.getElementById("formNuovaRichiestacategoria").style.display="block";
    document.getElementById("nuovaRichiestaConfirmButton").disabled =false;
}
function inserisciNuovaCateogoria()
{
    var categoria=document.getElementById("formNuovaRichiestaInputNomeNuovaCategoria").value;
    var descrizione=document.getElementById("formNuovaRichiestaInputDescrizioneNuovaCategoria").value;
    if(categoria!=null && categoria!='')
    {
        $.post("inserisciNuovaCateogoria.php",
        {
            categoria,
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
                    var id_categoria=response;

                    var formInputOption=document.createElement("option");
                    formInputOption.setAttribute("value",id_categoria);
                    formInputOption.innerHTML=categoria+" ("+descrizione+")";

                    document.getElementById("formNuovaRichiestacategoria").appendChild(formInputOption);

                    document.getElementById("formNuovaRichiestacategoria").value=id_categoria;

                    document.getElementById("formNuovaRichiestaNuovaCategoriaContainer").remove();
                    document.getElementById("formNuovaRichiestacategoria").style.display="block";
                    document.getElementById("nuovaRichiestaConfirmButton").disabled =false;
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
function inserisciNuovaRichiesta(event)
{
    event.preventDefault();

    if(document.getElementById("formNuovaRichiestacategoria").value=="new")
    {
        window.alert("Seleziona una categoria");
    }
    else
    {
        var data=[];

        var column={};
        column["name"]="oggetto";
        column["value"]=document.getElementById("formNuovaRichiestaoggetto").value;
        data.push(JSON.stringify(column));

        var column={};
        column["name"]="descrizione";
        column["value"]=document.getElementById("formNuovaRichiestadescrizione").value;
        data.push(JSON.stringify(column));

        var column={};
        column["name"]="note";
        column["value"]=document.getElementById("formNuovaRichiestanote").value;
        data.push(JSON.stringify(column));

        var column={};
        column["name"]="macrocategoria";
        column["value"]=document.getElementById("formNuovaRichiestamacrocategoria").value;
        data.push(JSON.stringify(column));

        var column={};
        column["name"]="categoria";
        column["value"]=document.getElementById("formNuovaRichiestacategoria").value;
        data.push(JSON.stringify(column));

        colonneExtra.forEach(function(colonna)
        {
            var column={};
            column["name"]=colonna;
            column["value"]=document.getElementById("formNuovaRichiesta"+colonna).value;
            data.push(JSON.stringify(column));
        });

        var JSONdata=JSON.stringify(data);
        var JSONutentiExtra=JSON.stringify(utentiExtra);

        $.post("inserisciNuovaRichiesta.php",
        {
            JSONdata,
            JSONutentiExtra
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
                    var files = document.getElementById("formNuovaRichiestaInputScegliFile").files;
                    if(files.length>0)
                    {
                        var uploadedFiles=0;
                        
                        var fileNum=0;
                        for (var i = 0; i < files.length; i++)
                        {
                            var file=files[i];
                            var fileName=file.name;
                            var fileSize_kb= file.size;
                            var fileSize_mb=fileSize_kb/1000000;
                            if(fileSize_mb<90)
                            {
                                fileNum++;
                            }
                        }
                        if(fileNum>0)
                        {
                            for (var i = 0; i < files.length; i++)
                            {
                                var file=files[i];
                                var fileName=file.name;
                                var fileSize_kb= file.size;
                                var fileSize_mb=fileSize_kb/1000000;
                                if(fileSize_mb<90)
                                {
                                    document.getElementById("statusUpload"+fileName).innerHTML='<i style="color:#2196F3" class="far fa-spinner-third fa-spin loadingIcon"></i>';
                                    
                                    var data= new FormData();
                                    data.append('file',file);
                                    data.append('fileNameResponse',fileName);
                                    $.ajax(
                                    {
                                        url:'uploadFileRichiesta.php',
                                        data:data,
                                        processData:false,
                                        contentType:false,
                                        type:'POST',
                                        success:function(response)
                                            {
                                                //console.log(response);
                                                if(response.indexOf("ok")>-1)
                                                {
                                                    var fileNameResponse=response.split("|")[0];
                                                    document.getElementById("statusUpload"+fileNameResponse).innerHTML='<i style="color:green" class="far fa-check-circle"></i>';
                                                    uploadedFiles++;
                                                    
                                                    if(uploadedFiles==fileNum)
                                                    {
                                                        Swal.fire
                                                        ({
                                                            type: 'success',
                                                            title: 'Richiesta inserita'
                                                        });
                                                        if(view=="richieste_utente")
                                                            getRichiesteUtente();
                                                        if(view=="tutte_le_richieste")
                                                            getRichiesteUtente();
                                                    }
                                                }
                                                else
                                                {
                                                    var fileNameResponse=response.split("|")[0];
                                                    document.getElementById("statusUpload"+fileNameResponse).innerHTML='<i style="color:#d43f3a" class="far fa-exclamation-circle"></i>';
                                                }
                                            }
                                    });
                                }
                            }
                        }
                        else
                        {
                            Swal.fire
                            ({
                                type: 'success',
                                title: 'Richiesta inserita'
                            });
                            if(view=="richieste_utente")
                                getRichiesteUtente();
                            if(view=="tutte_le_richieste")
                                getRichiesteUtente();
                        }
                    }
                    else
                    {
                        Swal.fire
                        ({
                            type: 'success',
                            title: 'Richiesta inserita'
                        });
                        if(view=="richieste_utente")
                            getRichiesteUtente();
                        if(view=="tutte_le_richieste")
                            getRichiesteUtente();
                    }
                }
            }
            else
                reject({status});
        });
    }
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function resetStyle(button)
{
    $(".absoluteActionBarButton").css("color","");
    button.style.color="#4C91CB";
    $('#viewFunctionBar').show("fast");
}
function getArrayColonneMacrocategoria(id_macrocategoria)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getColonneMacrocategoria.php",
        {
            id_macrocategoria
        },
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
function checkUtentiMacrocategorie(utente,id_macrocategoria,id_richiesta,richieste)
{
    var utente_macrocateogoria=false;
    richieste.forEach(function(richiesta)
    {
        if(richiesta.utente_macrocateogoria=='true' && richiesta.utente_incaricato==utente && richiesta.id_richiesta==id_richiesta && richiesta.id_macrocategoria==id_macrocategoria)
        {
            utente_macrocateogoria=true;
        }
    });
    return utente_macrocateogoria;
}
function searchLeTueRichieste()
{
    var searchValue1=document.getElementById("searchInputLeTueRichiesteListItem1").value.toLowerCase()
    var colonna1=document.getElementById("searchSelectLeTueRichiesteListItem1").value;
    var searchValue2=document.getElementById("searchInputLeTueRichiesteListItem2").value.toLowerCase()
    var colonna2=document.getElementById("searchSelectLeTueRichiesteListItem2").value;
    
    var elements=document.getElementsByClassName("richiesteListItem");
    for (var i = 0; i < elements.length; i++) 
    {
        var element=elements[i];
        var id_richiesta=element.getAttribute("id_richiesta");
        var valoreColonna1;
        switch(colonna1)
        {
            case "oggetto":valoreColonna1=document.getElementById("leTueRichiesteInput"+colonna1+id_richiesta).value.toLowerCase();break;
            case "id_richiesta":valoreColonna1=document.getElementById("leTueRichiesteValue"+colonna1+id_richiesta).innerHTML.toLowerCase();break;
            case "descrizione":valoreColonna1=document.getElementById("leTueRichiesteInput"+colonna1+id_richiesta).value.toLowerCase();break;
            case "data_creazione":valoreColonna1=document.getElementById("leTueRichiesteValue"+colonna1+id_richiesta).innerHTML.toLowerCase();break;
            case "utente_creazione":valoreColonna1=document.getElementById("leTueRichiesteValue"+colonna1+id_richiesta).innerHTML.toLowerCase();break;
        }
        try 
        {
            if(document.getElementById("leTueRichiesteInput"+colonna2+id_richiesta).tagName=="SELECT")
            {
                var valoreColonna2=document.getElementById("leTueRichiesteInput"+colonna2+id_richiesta).options[document.getElementById("leTueRichiesteInput"+colonna2+id_richiesta).selectedIndex].innerHTML.toLowerCase();
            }
            else
            {
                var valoreColonna2=document.getElementById("leTueRichiesteInput"+colonna2+id_richiesta).value.toLowerCase();
            }
        }
        catch (error)
        {
            var valoreColonna2="error";
        }

        //se tutti e due i valori sono vuoti mostra
        if(searchValue1=="" && searchValue2=="")
            element.style.display="block";

        //se solo il secondo valore è vuoto
        if(searchValue1!="" && searchValue2=="")
        {
            //filtra solo sul primo valore
            if(valoreColonna1.indexOf(searchValue1)>-1)
                element.style.display="block";
            else
                element.style.display="none";
        }

        //se solo il primo valore e vuoto
        if(searchValue1=="" && searchValue2!="")
        {
            //se la richiesta ha la seconda colonna
            if(valoreColonna2!="error")
            {
                //filtra solo sul secondo valore
                if(valoreColonna2.indexOf(searchValue2)>-1)
                    element.style.display="block";
                else
                    element.style.display="none";
            }
            else
            {
                //se la richiesta non ha la seconda colonna nascondila
                element.style.display="none";
            }
        }

        //se nessuno dei due valori è vuoto
        if(searchValue1!="" && searchValue2!="")
        {
            //se la richiesta ha la seconda colonna
            if(valoreColonna2!="error")
            {
                //filtra su tutti e due valori
                if(valoreColonna1.indexOf(searchValue1)>-1 && valoreColonna2.indexOf(searchValue2)>-1)
                    element.style.display="block";
                else
                    element.style.display="none";
            }
            else
            {
                //se la richiesta non ha la seconda colonna nascondila
                element.style.display="none";
            }
        }
    }
}
async function getRichiesteUtente()
{
    document.getElementById("viewTitle").innerHTML='Le tue richieste<i class="fad fa-user-edit" style="margin-left:10px;"></i>';
    document.getElementById("richiesteContainer").innerHTML="";
    view="richieste_utente";
    var visualizzazione=getVisualizzazione();
    if(visualizzazione=="tabella")
    {
        newCircleSpinner("Caricamento in corso...");

        document.getElementById("editableTableElementsRichiesteEfaq").style.display="block";
        document.getElementById("listViewElementsRichiesteEfaq").style.display="none";

        tmpViewName= await getTmpViewRichiesteEfaq();
        removeCircleSpinner();
        getTable(tmpViewName,"data_creazione","DESC");
    }
    if(visualizzazione=="lista")
    {
        newCircleSpinner("Caricamento in corso...")

        document.getElementById("editableTableElementsRichiesteEfaq").style.display="none";
        document.getElementById("listViewElementsRichiesteEfaq").style.display="block";

        document.getElementById("searchSelectLeTueRichiesteListItem1OptionUtente").style.display="none";

        var filtroMacrocategoria=document.getElementById("selectFiltraMacrocategoriaLeTueRichieste").value;
        var filtroCategoria=document.getElementById("selectFiltraCategoriaLeTueRichieste").value;

        $('#selectStatoLeTueRichieste').multipleSelect("destroy");
        $('#selectStatoLeTueRichieste').multipleSelect
        ({
            onClose: function ()
            {
                getRichiesteUtente();
            }
        });
        document.getElementsByClassName("ms-drop bottom")[0].childNodes[0].style.textAlign="left";
        var all=document.getElementsByClassName("ms-choice");
        for (var i = 0; i < all.length; i++) 
        {
            all[i].style.height="20px";
            all[i].style.lineHeight="18px";
            all[i].style.border="none";
            all[i].style.outline="none";
            all[i].style.fontFamily="'Montserrat',sans-serif";
            all[i].style.fontSize="12px";
            all[i].style.backgroundColor="transparent";
        }
        var multipleSelectUl=document.getElementsByClassName("ms-drop bottom")[0].childNodes[0];
        for (var j = 0; j < multipleSelectUl.childNodes.length; j++) 
        {
            var multipleSelectLi=multipleSelectUl.childNodes[j];
            var multipleSelectCheckbox=multipleSelectLi.childNodes[0].childNodes[0];
            if(multipleSelectCheckbox!=undefined)
                var multipleSelectValue=multipleSelectCheckbox.value;

            var multipleSelectColor="";
            switch(multipleSelectValue)
            {
                case "Aperta":multipleSelectColor="#DA6969";break;
                case "Presa in carico":multipleSelectColor="#4C91CB";break;
                case "In attesa di chiusura":multipleSelectColor="#E9A93A";break;
                case "Chiusa":multipleSelectColor="#70B085";break;
            }
            multipleSelectLi.style.color=multipleSelectColor;
        }
        var filtroStato=$('#selectStatoLeTueRichieste').multipleSelect('getSelects');

        if(filtroStato.length==0)
        {
            Swal.fire
            ({
                type: 'error',
                title: 'Errore',
                text: "Nessuno stato selezionato"
            });
            removeCircleSpinner();
        }
        else
        {
            document.getElementById("viewFunctionBar").style.borderBottom="1px solid #bbb";

            var macrocategorie=await getAllMacrocategorie();
            var categorie=await getAllCategorie();
            
            var colonneExtraMacrocategorie={};
            macrocategorie.forEach(async function(macrocategoria)
            {
                colonneExtraMacrocategorie[macrocategoria.id_macrocategoria]=await getArrayColonneMacrocategoria(macrocategoria.id_macrocategoria);
            });

            var risposte=await getRisposteUtente();

            $.get("getRichiesteUtente.php",
            {
                filtroStato,
                filtroMacrocategoria,
                filtroCategoria
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
                        richieste=JSON.parse(response);
                        var id_richieste=[];

                        //console.log(richieste);

                        var richiesteListContainer=document.createElement("div");
                        richiesteListContainer.setAttribute("id","richiesteListContainer");

                        richieste.forEach(function(richiesta)
                        {
                            if(!id_richieste.includes(richiesta.id_richiesta))
                            {
                                id_richieste.push(richiesta.id_richiesta);
                            }
                        });

                        id_richieste.reverse();

                        console.log(id_richieste);

                        var id_allegati=getIdAllegati(richieste);

                        var i=0;
                        id_richieste.forEach(function(id_richiesta)
                        {
                            var oggetto=getValoreColonnaRichiesteById(richieste,id_richiesta,"oggetto");
                            var descrizione=getValoreColonnaRichiesteById(richieste,id_richiesta,"descrizione");
                            var note=getValoreColonnaRichiesteById(richieste,id_richiesta,"note");
                            var id_macrocategoria=getValoreColonnaRichiesteById(richieste,id_richiesta,"id_macrocategoria");
                            var macrocategoria=getValoreColonnaRichiesteById(richieste,id_richiesta,"macrocategoria");
                            var descrizione_macrocategoria=getValoreColonnaRichiesteById(richieste,id_richiesta,"descrizione_macrocategoria");
                            var id_categoria=getValoreColonnaRichiesteById(richieste,id_richiesta,"id_categoria");
                            var categoria=getValoreColonnaRichiesteById(richieste,id_richiesta,"categoria");
                            var descrizione_categoria=getValoreColonnaRichiesteById(richieste,id_richiesta,"descrizione_categoria");
                            var stato=getValoreColonnaRichiesteById(richieste,id_richiesta,"stato");
                            var data_creazione=getValoreColonnaRichiesteById(richieste,id_richiesta,"data_creazione").date.split(" ")[0];

                            var utenti_coinvolti=getValoriColonnaRichiesteById(richieste,id_richiesta,"utente_incaricato");
                            var allegati=getValoriColonnaRichiesteById(richieste,id_richiesta,"percorso_allegato");
                            
                            var valoriColonneExtra={};
                            var listColonneExtra=colonneExtraMacrocategorie[id_macrocategoria];
                            listColonneExtra.forEach(function(colonna)
                            {
                                valoriColonneExtra[colonna["colonna"]]=getValoreColonnaRichiesteById(richieste,id_richiesta,colonna["colonna"]);
                            });

                            var richiesteListItem=document.createElement("div");
                            richiesteListItem.setAttribute("class","richiesteListItem");
                            richiesteListItem.setAttribute("id_richiesta",id_richiesta);

                            var richiesteListItemRow=document.createElement("div");
                            richiesteListItemRow.setAttribute("class","richiesteListItemRow");

                            switch(stato)
                            {
                                case "Aperta":richiesteListItemRowBackgroundColor="#DA6969";break;
                                case "Presa in carico":richiesteListItemRowBackgroundColor="#4C91CB";break;
                                case "In attesa di chiusura":richiesteListItemRowBackgroundColor="#E9A93A";break;
                                case "Chiusa":richiesteListItemRowBackgroundColor="#70B085";break;
                            }
                            richiesteListItemRow.setAttribute("style","min-height:50px;background-color:"+richiesteListItemRowBackgroundColor);

                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","width:auto;margin:10px");

                            var buttonGestioneRichiesta=document.createElement("button");
                            buttonGestioneRichiesta.setAttribute("class","buttonGestioneRichiesta");
                            buttonGestioneRichiesta.setAttribute("onclick","modificaRichiesta("+id_richiesta+")");
                            buttonGestioneRichiesta.innerHTML='Modifica <i class="fad fa-edit" style="margin-left:5px"></i>';
                            richiesteListItemElementContainer.appendChild(buttonGestioneRichiesta);

                            var buttonGestioneRichiesta=document.createElement("button");
                            buttonGestioneRichiesta.setAttribute("class","buttonGestioneRichiesta");
                            buttonGestioneRichiesta.setAttribute("id","buttonSalvaModificheRichiesta"+id_richiesta);
                            buttonGestioneRichiesta.setAttribute("style","margin-left:20px;display:none");
                            buttonGestioneRichiesta.setAttribute("onclick","salvaModificheRichiesta("+id_richiesta+")");
                            buttonGestioneRichiesta.innerHTML='Salva <i class="fad fa-save" style="margin-left:5px"></i>';
                            richiesteListItemElementContainer.appendChild(buttonGestioneRichiesta);

                            var buttonGestioneRichiesta=document.createElement("button");
                            buttonGestioneRichiesta.setAttribute("class","buttonGestioneRichiesta");
                            buttonGestioneRichiesta.setAttribute("id","buttonAnnullaModificheRichiesta"+id_richiesta);
                            buttonGestioneRichiesta.setAttribute("style","margin-left:20px;display:none");
                            buttonGestioneRichiesta.setAttribute("onclick","annullaModificheRichiesta("+id_richiesta+")");
                            buttonGestioneRichiesta.innerHTML='Indietro <i class="fad fa-undo-alt" style="margin-left:5px"></i>';
                            richiesteListItemElementContainer.appendChild(buttonGestioneRichiesta);

                            var buttonGestioneRichiesta=document.createElement("button");
                            buttonGestioneRichiesta.setAttribute("class","buttonGestioneRichiesta");
                            buttonGestioneRichiesta.setAttribute("onclick","eliminaRichiesta("+id_richiesta+")");
                            buttonGestioneRichiesta.setAttribute("style","margin-left:20px;");
                            buttonGestioneRichiesta.innerHTML='Elimina <i class="fad fa-trash" style="margin-left:5px"></i>';
                            richiesteListItemElementContainer.appendChild(buttonGestioneRichiesta);

                            richiesteListItemRow.appendChild(richiesteListItemElementContainer);

                            /*ID--------------------------------------------------------------------------*/
                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","width:auto;margin:10px");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:30px;line-height:30px;width:auto;margin-right: 10px;");
                            richiesteListItemElementLabel.innerHTML="Codice richiesta:";

                            var richiesteListItemElementValue=document.createElement("div");
                            richiesteListItemElementValue.setAttribute("class","richiesteListItemElementValue");
                            richiesteListItemElementValue.setAttribute("id","leTueRichiesteValueid_richiesta"+id_richiesta);
                            richiesteListItemElementValue.setAttribute("style","line-height:30px;height:30px;color:#EBEBEB;font-weight:bold;width:20px");
                            richiesteListItemElementValue.innerHTML=id_richiesta;

                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementValue);

                            richiesteListItemRow.appendChild(richiesteListItemElementContainer);
                            /*----------------------------------------------------------------------------*/
                            /*OGGETTO---------------------------------------------------------------------*/
                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","width:auto;margin:10px");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:30px;line-height:30px;width:auto;margin-right: 10px;");
                            richiesteListItemElementLabel.innerHTML="Oggetto";

                            var richiesteListItemElementInput=document.createElement("textarea");
                            richiesteListItemElementInput.setAttribute("class","richiesteListItemElementInput richiesteListItemElementInputEditable"+id_richiesta);
                            richiesteListItemElementInput.setAttribute("style","line-height:25px;height:30px;width:250px;resize:both");
                            richiesteListItemElementInput.setAttribute("disabled","disabled");
                            richiesteListItemElementInput.setAttribute("id","leTueRichiesteInputoggetto"+id_richiesta);
                            richiesteListItemElementInput.value=oggetto;


                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementInput);

                            richiesteListItemRow.appendChild(richiesteListItemElementContainer);
                            /*----------------------------------------------------------------------------*/
                            /*DATA CREAZIONE--------------------------------------------------------------*/
                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","width:180px;margin:10px");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:30px;line-height:30px;width:auto;margin-right: 10px;");
                            richiesteListItemElementLabel.innerHTML="Data creazione";

                            var richiesteListItemElementInput=document.createElement("div");
                            richiesteListItemElementInput.setAttribute("class","richiesteListItemElementValue");
                            richiesteListItemElementInput.setAttribute("id","leTueRichiesteValuedata_creazione"+id_richiesta);
                            richiesteListItemElementInput.setAttribute("style","width:80px;line-height:30px;height:30px;color:#EBEBEB;");
                            
                            var data_creazione_anno=data_creazione.split("-")[0];
                            var data_creazione_mese=data_creazione.split("-")[1];
                            var data_creazione_giorno=data_creazione.split("-")[2];
                            var data_ita=data_creazione_giorno+"/"+data_creazione_mese+"/"+data_creazione_anno;

                            richiesteListItemElementInput.innerHTML=data_ita;

                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementInput);

                            richiesteListItemRow.appendChild(richiesteListItemElementContainer);
                            /*----------------------------------------------------------------------------*/
                            /*STATO-----------------------------------------------------------------------*/
                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","width:auto;margin:10px");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:30px;line-height:30px;width:auto;margin-right: 10px;");
                            richiesteListItemElementLabel.innerHTML="Stato";

                            var richiesteListItemElementValue=document.createElement("div");
                            richiesteListItemElementValue.setAttribute("class","richiesteListItemElementValue");
                            var colorStato;
                            var iconStato;
                            switch(stato)
                            {
                                case "Aperta":colorStato="#EBEBEB";iconStato="far fa-exclamation-circle";break;
                                case "Presa in carico":colorStato="#EBEBEB";iconStato="far fa-cogs";break;
                                case "In attesa di chiusura":colorStato="#EBEBEB";iconStato="far fa-hourglass-half";break;
                                case "Chiusa":colorStato="#EBEBEB";iconStato="far fa-check-circle";break;
                            }
                            richiesteListItemElementValue.setAttribute("style","line-height:30px;height:30px;color:"+colorStato+";width:140px");
                            richiesteListItemElementValue.innerHTML=stato+'<i class="'+iconStato+'" style="margin-left:5px"></i>';

                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementValue);

                            richiesteListItemRow.appendChild(richiesteListItemElementContainer);

                            if(stato=="In attesa di chiusura")
                            {
                                var richiesteListItemElementContainer=document.createElement("div");
                                richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                                richiesteListItemElementContainer.setAttribute("style","width:auto;margin:10px");
                                
                                var buttonChiusuraRichiesta=document.createElement("button");
                                buttonChiusuraRichiesta.setAttribute("class","buttonChiusuraRichiesta");
                                buttonChiusuraRichiesta.setAttribute("id","buttonChiusuraRichiestaAccetta");
                                buttonChiusuraRichiesta.setAttribute("onclick","confermaChiusuraRichiesta("+id_richiesta+")");
                                buttonChiusuraRichiesta.innerHTML='Chiudi richiesta<i class="fad fa-comment-check" style="margin-left:10px"></i>';
                                richiesteListItemElementContainer.appendChild(buttonChiusuraRichiesta);

                                var buttonChiusuraRichiesta=document.createElement("button");
                                buttonChiusuraRichiesta.setAttribute("class","buttonChiusuraRichiesta");
                                buttonChiusuraRichiesta.setAttribute("id","buttonChiusuraRichiestaRifiuta");
                                buttonChiusuraRichiesta.setAttribute("onclick","rifiutaChiusuraRichiesta("+id_richiesta+")");
                                buttonChiusuraRichiesta.innerHTML='Riapri richiesta<i class="fad fa-comment-times" style="margin-left:10px"></i>';
                                richiesteListItemElementContainer.appendChild(buttonChiusuraRichiesta);

                                richiesteListItemRow.appendChild(richiesteListItemElementContainer);
                            }
                            /*----------------------------------------------------------------------------*/

                            var id_risposte=getValoriColonnaRisposteById(risposte,id_richiesta,"*","id_risposta");
                            if(id_risposte.length>0)
                            {
                                var richiesteListItemElementContainer=document.createElement("div");
                                richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                                richiesteListItemElementContainer.setAttribute("style","width:auto;margin:10px;float:right");

                                var buttonRispondiRichiesta=document.createElement("button");
                                buttonRispondiRichiesta.setAttribute("class","buttonGestioneRichiesta");
                                buttonRispondiRichiesta.setAttribute("style","float:right");
                                buttonRispondiRichiesta.setAttribute("onclick","apriPopupNuovaReplica("+id_richiesta+")");
                                buttonRispondiRichiesta.innerHTML='Replica<i class="fad fa-reply-all" style="margin-left:10px"></i>';
                                richiesteListItemElementContainer.appendChild(buttonRispondiRichiesta);

                                richiesteListItemRow.appendChild(richiesteListItemElementContainer);
                            }
                            
                            richiesteListItem.appendChild(richiesteListItemRow);

                            /*INIZIO RICHIESTE----------------------------------------------------------------------------------------------------------------------------------*/

                            var richiesteListItemBox=document.createElement("div");
                            richiesteListItemBox.setAttribute("class","richiesteListItemBox");
                            richiesteListItemBox.setAttribute("id","richiesteListItemBoxRichiestaContainer"+id_richiesta);
                            richiesteListItemBox.setAttribute("style","margin-bottom:10px;");

                            /*INIZIO COLONNE-------------------------------------------------------------------------------------------------------------------------------------------*/

                            var richiesteListItemInnerBox=document.createElement("div");
                            richiesteListItemInnerBox.setAttribute("class","richiesteListItemInnerBox");
                            /*DESCRIZIONE-----------------------------------------------------------------*/
                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
                            richiesteListItemElementLabel.innerHTML="Descrizione";

                            var richiesteListItemElementInput=document.createElement("textarea");
                            richiesteListItemElementInput.setAttribute("class","richiesteListItemElementInput richiesteListItemElementInputEditable"+id_richiesta);
                            richiesteListItemElementInput.setAttribute("style","line-height:25px;height:30px;resize:vertical");
                            richiesteListItemElementInput.setAttribute("disabled","disabled");
                            richiesteListItemElementInput.setAttribute("id","leTueRichiesteInputdescrizione"+id_richiesta);
                            richiesteListItemElementInput.value=descrizione;


                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementInput);

                            richiesteListItemInnerBox.appendChild(richiesteListItemElementContainer);
                            /*----------------------------------------------------------------------------*/
                            /*NOTE-----------------------------------------------------------------*/
                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
                            richiesteListItemElementLabel.innerHTML="Note";

                            var richiesteListItemElementInput=document.createElement("textarea");
                            richiesteListItemElementInput.setAttribute("class","richiesteListItemElementInput richiesteListItemElementInputEditable"+id_richiesta);
                            richiesteListItemElementInput.setAttribute("style","line-height:25px;height:30px;resize:vertical");
                            richiesteListItemElementInput.setAttribute("disabled","disabled");
                            richiesteListItemElementInput.setAttribute("id","leTueRichiesteInputnote"+id_richiesta);
                            richiesteListItemElementInput.value=note;


                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementInput);

                            richiesteListItemInnerBox.appendChild(richiesteListItemElementContainer);
                            /*----------------------------------------------------------------------------*/
                            /*MACROCATEGORIA--------------------------------------------------------------*/
                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
                            richiesteListItemElementLabel.innerHTML="Macrocateogoria";

                            var richiesteListItemElementInput=document.createElement("select");
                            richiesteListItemElementInput.setAttribute("class","richiesteListItemElementInput richiesteListItemElementInputEditable"+id_richiesta);
                            richiesteListItemElementInput.setAttribute("style","line-height:25px;height:30px;");
                            richiesteListItemElementInput.setAttribute("disabled","disabled");
                            richiesteListItemElementInput.setAttribute("onchange","getColonneMacrocategoriaLeTueRichieste(this.value,"+id_richiesta+")");
                            richiesteListItemElementInput.setAttribute("id","leTueRichiesteInputmacrocategoria"+id_richiesta);

                            var richiesteListItemElementInputOption=document.createElement("option");
                            richiesteListItemElementInputOption.setAttribute("value",id_macrocategoria);
                            richiesteListItemElementInputOption.innerHTML=macrocategoria+" ("+descrizione_macrocategoria+")";

                            richiesteListItemElementInput.appendChild(richiesteListItemElementInputOption);

                            macrocategorie.forEach(function(macrocategoria)
                            {
                                if(macrocategoria.id_macrocategoria!=id_macrocategoria)
                                {
                                    var richiesteListItemElementInputOption=document.createElement("option");
                                    richiesteListItemElementInputOption.setAttribute("value",macrocategoria.id_macrocategoria);
                                    richiesteListItemElementInputOption.innerHTML=macrocategoria.nome+" ("+macrocategoria.descrizione+")";

                                    richiesteListItemElementInput.appendChild(richiesteListItemElementInputOption);
                                }
                            });

                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementInput);

                            richiesteListItemInnerBox.appendChild(richiesteListItemElementContainer);
                            /*----------------------------------------------------------------------------*/
                            /*CATEGORIA-------------------------------------------------------------------*/
                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
                            richiesteListItemElementLabel.innerHTML="Cateogoria";

                            var richiesteListItemElementInput=document.createElement("select");
                            richiesteListItemElementInput.setAttribute("class","richiesteListItemElementInput richiesteListItemElementInputEditable"+id_richiesta);
                            richiesteListItemElementInput.setAttribute("style","line-height:25px;height:30px;");
                            richiesteListItemElementInput.setAttribute("disabled","disabled");
                            richiesteListItemElementInput.setAttribute("id","leTueRichiesteInputcategoria"+id_richiesta);

                            var richiesteListItemElementInputOption=document.createElement("option");
                            richiesteListItemElementInputOption.setAttribute("value",id_categoria);
                            richiesteListItemElementInputOption.innerHTML=categoria+" ("+descrizione_categoria+")";

                            richiesteListItemElementInput.appendChild(richiesteListItemElementInputOption);

                            categorie.forEach(function(categoria)
                            {
                                if(categoria.id_categoria!=id_categoria)
                                {
                                    var richiesteListItemElementInputOption=document.createElement("option");
                                    richiesteListItemElementInputOption.setAttribute("value",categoria.id_categoria);
                                    richiesteListItemElementInputOption.innerHTML=categoria.nome+" ("+categoria.descrizione+")";

                                    richiesteListItemElementInput.appendChild(richiesteListItemElementInputOption);
                                }
                            });

                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementInput);

                            richiesteListItemInnerBox.appendChild(richiesteListItemElementContainer);
                            /*----------------------------------------------------------------------------*/
                            /*COLONNE EXTRA---------------------------------------------------------------*/
                            var colonneExtraContainer=document.createElement("div");
                            colonneExtraContainer.setAttribute("id","leTueRichiesteColonneExtraContainer"+id_richiesta);
                            listColonneExtra.forEach(function (colonna)
                            {
                                var richiesteListItemElementContainer=document.createElement("div");
                                richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                                richiesteListItemElementContainer.setAttribute("style","");

                                var richiesteListItemElementLabel=document.createElement("div");
                                richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                                richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
                                richiesteListItemElementLabel.innerHTML=colonna["label"];

                                var richiesteListItemElementInput=document.createElement(colonna["tipo"]);
                                richiesteListItemElementInput.setAttribute("class","richiesteListItemElementInput richiesteListItemElementInputEditable"+id_richiesta);
                                richiesteListItemElementInput.setAttribute("style","line-height:25px;height:30px;");
                                richiesteListItemElementInput.setAttribute("disabled","disabled");
                                richiesteListItemElementInput.setAttribute("required",colonna["required"]);
                                richiesteListItemElementInput.setAttribute("id","leTueRichiesteInput"+colonna["colonna"]+id_richiesta);

                                if(colonna["tipo"]=="select")
                                {
                                    var options=colonna["valori"];
                                    options.forEach(function(option)
                                    {
                                        var richiesteListItemElementInputOption=document.createElement("option");
                                        richiesteListItemElementInputOption.setAttribute("value",option.value);
                                        if(option.value==valoriColonneExtra[colonna["colonna"]])
                                            richiesteListItemElementInputOption.setAttribute("selected","selected");
                                        richiesteListItemElementInputOption.innerHTML=option.label;

                                        richiesteListItemElementInput.appendChild(richiesteListItemElementInputOption);
                                    });
                                    //console.log(options);
                                }
                                else
                                {
                                    richiesteListItemElementInput.value=valoriColonneExtra[colonna["colonna"]];
                                }

                                richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                                richiesteListItemElementContainer.appendChild(richiesteListItemElementInput);

                                colonneExtraContainer.appendChild(richiesteListItemElementContainer);
                            });
                            richiesteListItemInnerBox.appendChild(colonneExtraContainer);
                            /*----------------------------------------------------------------------------*/

                            richiesteListItemBox.appendChild(richiesteListItemInnerBox);

                            /*FINE COLONNE-------------------------------------------------------------------------------------------------------------------------------------------*/
                            
                            /*INIZIO ALLEGATI E UTENTI-------------------------------------------------------------------------------------------------------------------------------*/

                            var richiesteListItemInnerBox=document.createElement("div");
                            richiesteListItemInnerBox.setAttribute("class","richiesteListItemInnerBox");

                            /*UTENTI-----------------------------------------------------------------------*/

                            var utentiMacrocategoriaContainerLeTueRichieste=document.createElement("div");
                            utentiMacrocategoriaContainerLeTueRichieste.setAttribute("id","utentiMacrocategoriaContainerLeTueRichieste"+id_richiesta);

                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
                            richiesteListItemElementLabel.innerHTML="Utenti coinvolti";

                            var aggiungiUtenteIcon=document.createElement("i");
                            aggiungiUtenteIcon.setAttribute("class","fad fa-user-plus");

                            var aggiungiUtenteButton=document.createElement("button");
                            aggiungiUtenteButton.setAttribute("class","btnIconRichiesteEfaq richiesteListItemElementInputEditable"+id_richiesta);
                            aggiungiUtenteButton.setAttribute("title","Aggiungi utente");
                            aggiungiUtenteButton.setAttribute("disabled","disabled");
                            aggiungiUtenteButton.setAttribute("style","margin-left:10px");
                            aggiungiUtenteButton.setAttribute("onclick","apriPopupAggiungiUtente('"+utenti_coinvolti.toString()+"',"+id_richiesta+")");
                            aggiungiUtenteButton.appendChild(aggiungiUtenteIcon);
                                                        
                            richiesteListItemElementLabel.appendChild(aggiungiUtenteButton);

                            var richiesteListItemElementValue=document.createElement("div");
                            richiesteListItemElementValue.setAttribute("class","richiesteListItemElementValue");
                            richiesteListItemElementValue.setAttribute("style","");

                            var richiesteListItemElementValueTable=document.createElement("table");
                            richiesteListItemElementValueTable.setAttribute("class","richiesteListItemElementValueTable");
                            richiesteListItemElementValueTable.setAttribute("id","richiesteListItemElementValueTable"+id_richiesta);

                            utenti_coinvolti.forEach(function(utente)
                            {
                                var richiesteListItemElementValueTableTr=document.createElement("tr");
                                richiesteListItemElementValueTableTr.setAttribute("style","height:25px");

                                var richiesteListItemElementValueTableTd=document.createElement("td");
                                richiesteListItemElementValueTableTd.innerHTML=utente;

                                richiesteListItemElementValueTableTr.appendChild(richiesteListItemElementValueTableTd);

                                if(!checkUtentiMacrocategorie(utente,id_macrocategoria,id_richiesta,richieste))
                                {
                                    var rimuoviUtenteIcon=document.createElement("i");
                                    rimuoviUtenteIcon.setAttribute("class","fad fa-user-minus");

                                    var rimuoviUtenteButton=document.createElement("button");
                                    rimuoviUtenteButton.setAttribute("class","btnIconRichiesteEfaq richiesteListItemElementInputEditable"+id_richiesta);
                                    rimuoviUtenteButton.setAttribute("title","Rimuovi utente");
                                    rimuoviUtenteButton.setAttribute("disabled","disabled");
                                    rimuoviUtenteButton.setAttribute("style","flot:left;display:block;margin-left:10px");
                                    rimuoviUtenteButton.setAttribute("onclick","rimuoviUtente(this.parentElement.parentElement,"+id_richiesta+",'"+utente+"')");
                                    rimuoviUtenteButton.appendChild(rimuoviUtenteIcon);

                                    var richiesteListItemElementValueTableTd=document.createElement("td");
                                    richiesteListItemElementValueTableTd.appendChild(rimuoviUtenteButton);

                                    richiesteListItemElementValueTableTr.appendChild(richiesteListItemElementValueTableTd);
                                }

                                richiesteListItemElementValueTable.appendChild(richiesteListItemElementValueTableTr);
                            })

                            richiesteListItemElementValue.appendChild(richiesteListItemElementValueTable);

                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementValue);

                            utentiMacrocategoriaContainerLeTueRichieste.appendChild(richiesteListItemElementContainer);
                            richiesteListItemInnerBox.appendChild(utentiMacrocategoriaContainerLeTueRichieste);

                            /*----------------------------------------------------------------------------*/

                            /*ALLEGATI---------------------------------------------------------------------*/

                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
                            richiesteListItemElementLabel.innerHTML="Allegati";

                            var aggiungiAllegatoIcon=document.createElement("i");
                            aggiungiAllegatoIcon.setAttribute("class","fad fa-file-plus");

                            var aggiungiAllegatoButton=document.createElement("button");
                            aggiungiAllegatoButton.setAttribute("class","btnIconRichiesteEfaq richiesteListItemElementInputEditable"+id_richiesta);
                            aggiungiAllegatoButton.setAttribute("title","Aggiungi allegati");
                            aggiungiAllegatoButton.setAttribute("disabled","disabled");
                            aggiungiAllegatoButton.setAttribute("style","margin-left:10px");
                            aggiungiAllegatoButton.setAttribute("onclick","document.getElementById('inputAggiungiAllegatiLeTueRichieste"+id_richiesta+"').click()");
                            aggiungiAllegatoButton.appendChild(aggiungiAllegatoIcon);
                                                        
                            richiesteListItemElementLabel.appendChild(aggiungiAllegatoButton);

                            var aggiungiAllegatoInput=document.createElement("input");
                            aggiungiAllegatoInput.setAttribute("type","file");
                            aggiungiAllegatoInput.setAttribute("id","inputAggiungiAllegatiLeTueRichieste"+id_richiesta);
                            aggiungiAllegatoInput.setAttribute("style","display:none");
                            aggiungiAllegatoInput.setAttribute("multiple","multiple");
                            aggiungiAllegatoInput.setAttribute("onchange","aggiungiAllegatiLeTueRichieste(this,"+id_richiesta+")");
                                                        
                            richiesteListItemElementLabel.appendChild(aggiungiAllegatoInput);

                            var richiesteListItemElementValue=document.createElement("div");
                            richiesteListItemElementValue.setAttribute("class","richiesteListItemElementValue");
                            richiesteListItemElementValue.setAttribute("id","richiesteListItemElementValueAllegatiRichiesteContainer"+id_richiesta);
                            richiesteListItemElementValue.setAttribute("style","");

                            allegati.forEach(function(allegato)
                            {
                                var percorso=allegato;
                                var nomeFile= percorso.split("\\");
                                var nomeFile = nomeFile[nomeFile.length - 1];
                                var formato= nomeFile.split(".")[1];
                                var id_allegato=id_allegati[percorso];

                                var richiesteListItemElementValueAllegato=document.createElement("div");
                                richiesteListItemElementValueAllegato.setAttribute("class","richiesteListItemElementValueAllegato");
                                //richiesteListItemElementValueAllegato.setAttribute("data-tooltip",nomeFile);

                                var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                richiesteListItemElementValueAllegatoRow.setAttribute("style","height:20px;background-color:rgba(0,0,0,0.3)");

                                var downloadButtonAllegato=document.createElement("button");
                                downloadButtonAllegato.innerHTML='<i class="fad fa-arrow-alt-to-bottom"></i>';
                                downloadButtonAllegato.setAttribute("class","richiesteListItemElementValueAllegatoButton");
                                downloadButtonAllegato.setAttribute("style","float:left");
                                downloadButtonAllegato.setAttribute('onclick',"downloadAllegato('"+nomeFile+"')");
                                downloadButtonAllegato.setAttribute("title",'Scarica allegato "'+nomeFile+'"');
                                richiesteListItemElementValueAllegatoRow.appendChild(downloadButtonAllegato);

                                var deleteButtonAllegato=document.createElement("button");
                                deleteButtonAllegato.innerHTML='<i class="far fa-times"></i>';
                                deleteButtonAllegato.setAttribute("class","richiesteListItemElementValueAllegatoButton richiesteListItemElementInputEditable"+id_richiesta);
                                deleteButtonAllegato.setAttribute("style","float:right;color:red");
                                deleteButtonAllegato.setAttribute("disabled","disabled");
                                deleteButtonAllegato.setAttribute("onclick","eliminaAllegato(this.parentElement.parentElement,"+id_allegato+")");
                                deleteButtonAllegato.setAttribute("title",'Elimina allegato "'+nomeFile+'"');
                                richiesteListItemElementValueAllegatoRow.appendChild(deleteButtonAllegato); 

                                richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);

                                var altroFormato=true;
                                if(formato=="png" || formato=="jpg" || formato=="tif")
                                {
                                    altroFormato=false;
                                    richiesteListItemElementValueAllegato.style.backgroundImage='url("http://remote.oasisgroup.it/OasisAllegatiRichieste/'+nomeFile+'")';
                                    richiesteListItemElementValueAllegato.style.backgroundSize='cover';
                                    richiesteListItemElementValueAllegato.style.backgroundPosition='center center';
                                    richiesteListItemElementValueAllegato.style.backgroundRepeat='no-repeat';
                                }
                                if(formato=="pdf")
                                {
                                    altroFormato=false;
                                    var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                    richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                    richiesteListItemElementValueAllegatoRow.setAttribute("style","text-align:center;height:25px;margin-top:12.5px;");

                                    var richiesteListItemElementValueAllegatoPdf=document.createElement("a");
                                    richiesteListItemElementValueAllegatoPdf.setAttribute("href","http://remote.oasisgroup.it/OasisAllegatiRichieste/"+nomeFile);
                                    richiesteListItemElementValueAllegatoPdf.setAttribute("target","blank");
                                    richiesteListItemElementValueAllegatoPdf.setAttribute("style","color:gray");
                                    richiesteListItemElementValueAllegatoPdf.setAttribute("title","Visualizza PDF");
                                    richiesteListItemElementValueAllegatoPdf.innerHTML='<i class="fal fa-file-pdf fa-2x"></i>';

                                    richiesteListItemElementValueAllegatoRow.appendChild(richiesteListItemElementValueAllegatoPdf);
                                    richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);
                                }
                                if(formato=="xls" || formato=="xlsx" || formato=="xlsm")
                                {
                                    altroFormato=false;
                                    var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                    richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                    richiesteListItemElementValueAllegatoRow.setAttribute("style","text-align:center;height:25px;margin-top:12.5px;color:gray");
                                    richiesteListItemElementValueAllegatoRow.innerHTML='<i class="fal fa-file-excel fa-2x"></i>';
                                    richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);
                                }
                                if(altroFormato)
                                {
                                    var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                    richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                    richiesteListItemElementValueAllegatoRow.setAttribute("style","text-align:center;height:25px;margin-top:12.5px;color:gray");
                                    richiesteListItemElementValueAllegatoRow.innerHTML='<i class="fal fa-file fa-2x"></i>';
                                    richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);
                                }

                                //richiesteListItemElementValueAllegato.innerHTML=allegato;
                                richiesteListItemElementValue.appendChild(richiesteListItemElementValueAllegato);
                            })

                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementValue);

                            richiesteListItemInnerBox.appendChild(richiesteListItemElementContainer);

                            /*----------------------------------------------------------------------------*/

                            richiesteListItemBox.appendChild(richiesteListItemInnerBox);

                            /*FINE ALLEGATI E UTENTI----------------------------------------------------------------------------------------------------------------------------------*/

                            richiesteListItem.appendChild(richiesteListItemBox);

                            /*FINE RICHIESTE----------------------------------------------------------------------------------------------------------------------------------*/

/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/
/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

                            /*INIZIO RISPOSTE---------------------------------------------------------------------------------------------------------------------------------*/

                            var richiesteListItemBox=document.createElement("div");
                            richiesteListItemBox.setAttribute("class","richiesteListItemBox");
                            richiesteListItemBox.setAttribute("id","richiesteListItemBoxRisposteContainer"+id_richiesta);
                            //richiesteListItemBox.setAttribute("style","overflow-y:auto;");

                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            
                            //var id_risposte=getValoriColonnaRisposteById(risposte,id_richiesta,"*","id_risposta");
                            if(id_risposte.length==0)
                            {
                                richiesteListItemElementContainer.setAttribute("style","font-family:'Montserrat',sans-serif;color:red;font-size:12px;font-weight:bold;text-decoration:underline");
                                richiesteListItemElementContainer.innerHTML="Ancora nessuna risposta";
                                richiesteListItemBox.appendChild(richiesteListItemElementContainer);
                            }
                            var risposte_count=0;
                            id_risposte.forEach(function(id_risposta)
                            {
                                var richiesteListItemBoxRow=document.createElement("div");
                                richiesteListItemBoxRow.setAttribute("class","richiesteListItemBoxRow");
                                var richiesteListItemBoxRowBackgroundColor
                                if(isOdd(risposte_count))
                                    richiesteListItemBoxRowBackgroundColor="#DBDBDB";
                                else
                                    richiesteListItemBoxRowBackgroundColor="#D5D5D5";
                                richiesteListItemBoxRow.setAttribute("style","background-color:"+richiesteListItemBoxRowBackgroundColor);

                                var descrizione=getValoreColonnaRisposteById(risposte,id_richiesta,id_risposta,"descrizione");
                                var username_risposta=getValoreColonnaRisposteById(risposte,id_richiesta,id_risposta,"username_risposta");
                                var data_risposta=getValoreColonnaRisposteById(risposte,id_richiesta,id_risposta,"data_risposta");

                                var allegati_risposte=getValoriColonnaRisposteById(risposte,id_richiesta,id_risposta,"percorso_allegato");

                                var richiesteListItemBoxRowTitle=document.createElement("div");
                                richiesteListItemBoxRowTitle.setAttribute("class","richiesteListItemBoxRowTitle");
                                var data_risposta_eng=data_risposta.date.split(" ")[0];
                                var data_risposta_anno=data_risposta_eng.split("-")[0];
                                var data_risposta_mese=data_risposta_eng.split("-")[1];
                                var data_risposta_giorno=data_risposta_eng.split("-")[2];
                                var data_risposta_ita=data_risposta_giorno+"/"+data_risposta_mese+"/"+data_risposta_anno;
                                richiesteListItemBoxRowTitle.innerHTML="Risposta di "+username_risposta+" del "+data_risposta_ita+" "+data_risposta.date.split(" ")[1].split(".")[0];
                                richiesteListItemBoxRow.appendChild(richiesteListItemBoxRowTitle);

                                /*INIZIO COLONNE----------------------------------------------------------------------------------------------------------------------------------*/
                                /*DESCRIZIONE--------------------------------------------------------------*/
                                var richiesteListItemElementContainer=document.createElement("div");
                                richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                                richiesteListItemElementContainer.setAttribute("style","");

                                var richiesteListItemElementLabel=document.createElement("div");
                                richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                                richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
                                richiesteListItemElementLabel.innerHTML="Testo";

                                var richiesteListItemElementvalue=document.createElement("div");
                                richiesteListItemElementvalue.setAttribute("class","richiesteListItemElementvalue");
                                richiesteListItemElementvalue.setAttribute("style","");
                                richiesteListItemElementvalue.innerHTML=descrizione;

                                richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                                richiesteListItemElementContainer.appendChild(richiesteListItemElementvalue);

                                richiesteListItemBoxRow.appendChild(richiesteListItemElementContainer);
                                /*----------------------------------------------------------------------------*/
                                /*FINE COLONNE------------------------------------------------------------------------------------------------------------------------------------*/
                                /*INIZIO ALLEGATI---------------------------------------------------------------------------------------------------------------------------------*/

                                var richiesteListItemElementContainer=document.createElement("div");
                                richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                                richiesteListItemElementContainer.setAttribute("style","");

                                var richiesteListItemElementLabel=document.createElement("div");
                                richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                                richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
                                richiesteListItemElementLabel.innerHTML="Allegati";

                                var richiesteListItemElementValue=document.createElement("div");
                                richiesteListItemElementValue.setAttribute("class","richiesteListItemElementValue");
                                richiesteListItemElementValue.setAttribute("style","");

                                allegati_risposte.forEach(function(allegato)
                                {
                                    //console.log(allegato);
                                    var percorso=allegato;
                                    var nomeFile= percorso.split("\\");
                                    var nomeFile = nomeFile[nomeFile.length - 1];
                                    var formato= nomeFile.split(".")[1];

                                    var richiesteListItemElementValueAllegato=document.createElement("div");
                                    richiesteListItemElementValueAllegato.setAttribute("class","richiesteListItemElementValueAllegato");

                                    var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                    richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                    richiesteListItemElementValueAllegatoRow.setAttribute("style","height:20px;background-color:rgba(0,0,0,0.3)");

                                    var downloadButtonAllegato=document.createElement("button");
                                    downloadButtonAllegato.innerHTML='<i class="fad fa-arrow-alt-to-bottom"></i>';
                                    downloadButtonAllegato.setAttribute("class","richiesteListItemElementValueAllegatoButton");
                                    downloadButtonAllegato.setAttribute("style","float:left");
                                    downloadButtonAllegato.setAttribute('onclick',"downloadAllegato('"+nomeFile+"')");
                                    downloadButtonAllegato.setAttribute("title",'Scarica allegato "'+nomeFile+'"');
                                    richiesteListItemElementValueAllegatoRow.appendChild(downloadButtonAllegato);

                                    richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);

                                    var altroFormato=true;
                                    if(formato=="png" || formato=="jpg" || formato=="tif")
                                    {
                                        altroFormato=false;
                                        richiesteListItemElementValueAllegato.style.backgroundImage='url("http://remote.oasisgroup.it/OasisAllegatiRichieste/'+nomeFile+'")';
                                        richiesteListItemElementValueAllegato.style.backgroundSize='cover';
                                        richiesteListItemElementValueAllegato.style.backgroundPosition='center center';
                                        richiesteListItemElementValueAllegato.style.backgroundRepeat='no-repeat';
                                    }
                                    if(formato=="pdf")
                                    {
                                        altroFormato=false;
                                        var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                        richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                        richiesteListItemElementValueAllegatoRow.setAttribute("style","text-align:center;height:25px;margin-top:12.5px;");

                                        var richiesteListItemElementValueAllegatoPdf=document.createElement("a");
                                        richiesteListItemElementValueAllegatoPdf.setAttribute("href","http://remote.oasisgroup.it/OasisAllegatiRichieste/"+nomeFile);
                                        richiesteListItemElementValueAllegatoPdf.setAttribute("target","blank");
                                        richiesteListItemElementValueAllegatoPdf.setAttribute("style","color:gray");
                                        richiesteListItemElementValueAllegatoPdf.setAttribute("title","Visualizza PDF");
                                        richiesteListItemElementValueAllegatoPdf.innerHTML='<i class="fal fa-file-pdf fa-2x"></i>';

                                        richiesteListItemElementValueAllegatoRow.appendChild(richiesteListItemElementValueAllegatoPdf);
                                        richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);
                                    }
                                    if(formato=="xls" || formato=="xlsx" || formato=="xlsm")
                                    {
                                        altroFormato=false;
                                        var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                        richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                        richiesteListItemElementValueAllegatoRow.setAttribute("style","text-align:center;height:25px;margin-top:12.5px;color:gray");
                                        richiesteListItemElementValueAllegatoRow.innerHTML='<i class="fal fa-file-excel fa-2x"></i>';
                                        richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);
                                    }
                                    if(altroFormato)
                                    {
                                        var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                        richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                        richiesteListItemElementValueAllegatoRow.setAttribute("style","text-align:center;height:25px;margin-top:12.5px;color:gray");
                                        richiesteListItemElementValueAllegatoRow.innerHTML='<i class="fal fa-file fa-2x"></i>';
                                        richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);
                                    }

                                    richiesteListItemElementValue.appendChild(richiesteListItemElementValueAllegato);
                                })

                                richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                                richiesteListItemElementContainer.appendChild(richiesteListItemElementValue);

                                richiesteListItemBoxRow.appendChild(richiesteListItemElementContainer);

                                /*FINE ALLEGATI-----------------------------------------------------------------------------------------------------------------------------------*/

                                richiesteListItemBox.appendChild(richiesteListItemBoxRow);
                                risposte_count++;
                            });

                            //var id_risposta=getValoreColonnaRisposteById(risposte,id_richiesta,"id_risposta");
                            
                            richiesteListItem.appendChild(richiesteListItemBox);

                            /*FINE RISPOSTE-----------------------------------------------------------------------------------------------------------------------------------*/

                            richiesteListContainer.appendChild(richiesteListItem);
                            
                            i++;
                        });
                        document.getElementById("richiesteContainer").appendChild(richiesteListContainer);

                        id_richieste.forEach(function(id_richiesta)
                        {
                            var height=document.getElementById("richiesteListItemBoxRichiestaContainer"+id_richiesta).offsetHeight+10;
                            document.getElementById("richiesteListItemBoxRisposteContainer"+id_richiesta).style.maxHeight=height+"px";
                            document.getElementById("richiesteListItemBoxRisposteContainer"+id_richiesta).style.overflowY="auto";
                        });

                        removeCircleSpinner();
                    }
                }
                else
                    console.log(status);
            });
        }
    }
    /*if(await getCookie("into1RichiesteEfaq")!="true")
        getLeTueRichiesteTutorial();*/
}
async function getColonneMacrocategoriaLeTueRichieste(id_macrocategoria,id_richiesta)
{
    var colonneMacrocategoria=await getArrayColonneMacrocategoria(id_macrocategoria);
    document.getElementById("leTueRichiesteColonneExtraContainer"+id_richiesta).innerHTML="";

    colonneMacrocategoria.forEach(function (colonna)
    {
        var richiesteListItemElementContainer=document.createElement("div");
        richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
        richiesteListItemElementContainer.setAttribute("style","");

        var richiesteListItemElementLabel=document.createElement("div");
        richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
        richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
        richiesteListItemElementLabel.innerHTML=colonna["label"];

        var richiesteListItemElementInput=document.createElement(colonna["tipo"]);
        richiesteListItemElementInput.setAttribute("class","richiesteListItemElementInput richiesteListItemElementInputEditable"+id_richiesta);
        richiesteListItemElementInput.setAttribute("style","line-height:25px;height:30px;");
        richiesteListItemElementInput.setAttribute("required",colonna["required"]);
        richiesteListItemElementInput.setAttribute("id","leTueRichiesteInput"+colonna["colonna"]+id_richiesta);

        if(colonna["tipo"]=="select")
        {
            var options=colonna["valori"];
            options.forEach(function(option)
            {
                var richiesteListItemElementInputOption=document.createElement("option");
                richiesteListItemElementInputOption.setAttribute("value",option.value);
                richiesteListItemElementInputOption.innerHTML=option.label;

                richiesteListItemElementInput.appendChild(richiesteListItemElementInputOption);
            });
        }

        richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
        richiesteListItemElementContainer.appendChild(richiesteListItemElementInput);

        document.getElementById("leTueRichiesteColonneExtraContainer"+id_richiesta).appendChild(richiesteListItemElementContainer);
    });

    var utenti_coinvolti=await getUtentiCoinvoltiEUtentiMacrocategoria(id_richiesta,id_macrocategoria);

    //console.log(utenti_coinvolti);

    document.getElementById("utentiMacrocategoriaContainerLeTueRichieste"+id_richiesta).innerHTML="";

    var richiesteListItemElementContainer=document.createElement("div");
    richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
    richiesteListItemElementContainer.setAttribute("style","");

    var richiesteListItemElementLabel=document.createElement("div");
    richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
    richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
    richiesteListItemElementLabel.innerHTML="Utenti coinvolti";

    var aggiungiUtenteIcon=document.createElement("i");
    aggiungiUtenteIcon.setAttribute("class","fad fa-user-plus");

    var aggiungiUtenteButton=document.createElement("button");
    aggiungiUtenteButton.setAttribute("class","btnIconRichiesteEfaq richiesteListItemElementInputEditable"+id_richiesta);
    aggiungiUtenteButton.setAttribute("title","Aggiungi utente");
    aggiungiUtenteButton.setAttribute("style","margin-left:10px");
    aggiungiUtenteButton.setAttribute("onclick","apriPopupAggiungiUtente('"+utenti_coinvolti.toString()+"',"+id_richiesta+")");
    aggiungiUtenteButton.appendChild(aggiungiUtenteIcon);
                                
    richiesteListItemElementLabel.appendChild(aggiungiUtenteButton);

    var richiesteListItemElementValue=document.createElement("div");
    richiesteListItemElementValue.setAttribute("class","richiesteListItemElementValue");
    richiesteListItemElementValue.setAttribute("style","");

    var richiesteListItemElementValueTable=document.createElement("table");
    richiesteListItemElementValueTable.setAttribute("class","richiesteListItemElementValueTable");
    richiesteListItemElementValueTable.setAttribute("id","richiesteListItemElementValueTable"+id_richiesta);

    utenti_coinvolti.forEach(function(utente)
    {
        var richiesteListItemElementValueTableTr=document.createElement("tr");
        richiesteListItemElementValueTableTr.setAttribute("style","height:25px");

        var richiesteListItemElementValueTableTd=document.createElement("td");
        richiesteListItemElementValueTableTd.innerHTML=utente.username;

        richiesteListItemElementValueTableTr.appendChild(richiesteListItemElementValueTableTd);

        if(utente.utente_macrocategoria=="false")
        {
            var rimuoviUtenteIcon=document.createElement("i");
            rimuoviUtenteIcon.setAttribute("class","fad fa-user-minus");

            var rimuoviUtenteButton=document.createElement("button");
            rimuoviUtenteButton.setAttribute("class","btnIconRichiesteEfaq richiesteListItemElementInputEditable"+id_richiesta);
            rimuoviUtenteButton.setAttribute("title","Rimuovi utente");
            rimuoviUtenteButton.setAttribute("style","flot:left;display:block;margin-left:10px");
            rimuoviUtenteButton.setAttribute("onclick","rimuoviUtente(this.parentElement.parentElement,"+id_richiesta+",'"+utente.username+"')");
            rimuoviUtenteButton.appendChild(rimuoviUtenteIcon);

            var richiesteListItemElementValueTableTd=document.createElement("td");
            richiesteListItemElementValueTableTd.appendChild(rimuoviUtenteButton);

            richiesteListItemElementValueTableTr.appendChild(richiesteListItemElementValueTableTd);
        }

        richiesteListItemElementValueTable.appendChild(richiesteListItemElementValueTableTr);
    })

    richiesteListItemElementValue.appendChild(richiesteListItemElementValueTable);

    richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
    richiesteListItemElementContainer.appendChild(richiesteListItemElementValue);

    document.getElementById("utentiMacrocategoriaContainerLeTueRichieste"+id_richiesta).appendChild(richiesteListItemElementContainer);
}
function apriPopupNuovaReplica(id_richiesta)
{
    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","nuovaRichiestaOuterContainer");
    outerContainer.setAttribute("id","nuovaReplicaOuterContainer");

    var form=document.createElement("form");
    form.setAttribute("id","formNuovaReplica");
    form.setAttribute("onsubmit","inserisciNuovaReplica(event,"+id_richiesta+")");

    fieldsContainer=document.createElement("div");

    //DESCRIZIONE----------------------------------------------------------------------------

    var inputContainer=document.createElement("div");
    inputContainer.setAttribute("class","formNuovaRichiestaInputContainer");

    var formInputLabel=document.createElement("div");
    formInputLabel.setAttribute("class","formNuovaRichiestaInputLabel");
    formInputLabel.innerHTML="Testo";

    inputContainer.appendChild(formInputLabel);

    var formInput=document.createElement("textarea");
    formInput.setAttribute("required","required");
    formInput.setAttribute("class","formNuovaRichiestaInput");
    formInput.setAttribute("id","formNuovaReplicadescrizione");

    inputContainer.appendChild(formInput);

    fieldsContainer.appendChild(inputContainer);
    
    //---------------------------------------------------------------------------------------

    //ALLEGATI-------------------------------------------------------------------------------

    var inputContainer=document.createElement("div");
    inputContainer.setAttribute("class","formNuovaRichiestaInputContainer");

    var formInputLabel=document.createElement("div");
    formInputLabel.setAttribute("class","formNuovaRichiestaInputLabel");
    formInputLabel.innerHTML="Allegati";

    inputContainer.appendChild(formInputLabel);

    var containerScegliFile=document.createElement("div");
    containerScegliFile.setAttribute("class","formNuovaRichiestaContainerScegliFile");

    var buttonScegliFile=document.createElement("button");
    buttonScegliFile.setAttribute("id","formNuovaReplicaButtonScegliFile");
    buttonScegliFile.innerHTML='Scegli file <i class="fad fa-file-search" style="margin-left:10px"></i>';
    buttonScegliFile.setAttribute("type","button");
    buttonScegliFile.setAttribute("onclick","document.getElementById('formNuovaReplicaInputScegliFile').click()");

    containerScegliFile.appendChild(buttonScegliFile);

    var inputScegliFile=document.createElement("input");
    inputScegliFile.setAttribute("type","file");
    inputScegliFile.setAttribute("id","formNuovaReplicaInputScegliFile");
    inputScegliFile.setAttribute("onchange","getChoosedFiles('Replica')");
    inputScegliFile.setAttribute("multiple","multiple");

    containerScegliFile.appendChild(inputScegliFile);

    var buttonRimuoviFile=document.createElement("button");
    buttonRimuoviFile.setAttribute("id","formNuovaReplicaButtonRimuoviFile");
    buttonRimuoviFile.innerHTML='Rimuovi file <i class="fad fa-file-minus" style="margin-left:10px"></i>';
    buttonRimuoviFile.setAttribute("type","button");
    buttonRimuoviFile.setAttribute("onclick","rimuoviFileNuovaReplica()");

    containerScegliFile.appendChild(buttonRimuoviFile);

    var fileListTableContainer=document.createElement("div");
    fileListTableContainer.setAttribute("id","formNuovaReplicaFileListTableContainer");

    var uploadFileTable=document.createElement("table");
    uploadFileTable.setAttribute("class","formNuovaRichiestaFileListTable");
    uploadFileTable.setAttribute("id","formNuovaReplicaFileListTable");
    
    fileListTableContainer.appendChild(uploadFileTable);

    containerScegliFile.appendChild(fileListTableContainer);

    inputContainer.appendChild(containerScegliFile);

    fieldsContainer.appendChild(inputContainer);

    //---------------------------------------------------------------------------------------

    var buttonContainer=document.createElement("div");
    buttonContainer.setAttribute("class","nuovaRichiestaButtonContainer");

    var confirmButton=document.createElement("button");
    confirmButton.setAttribute("class","nuovaRichiestaButton");
    confirmButton.setAttribute("id","nuovaRichiestaConfirmButton");
    confirmButton.setAttribute("type","submit");
    confirmButton.setAttribute("style","margin-left:15%;float:left");
    confirmButton.innerHTML='Conferma <i class="fad fa-layer-plus" style="margin-left:10px"></i>';

    buttonContainer.appendChild(confirmButton);

    var cancelButton=document.createElement("button");
    cancelButton.setAttribute("class","nuovaRichiestaButton");
    cancelButton.setAttribute("onclick","Swal.close()");
    cancelButton.setAttribute("id","nuovaRichiestaCancelButton");
    cancelButton.setAttribute("style","color:red;margin-right:15%;float:right");
    cancelButton.setAttribute("type","button");
    cancelButton.innerHTML='Annulla <i class="fal fa-window-close" style="margin-left:10px"></i>';

    buttonContainer.appendChild(cancelButton);

    form.appendChild(fieldsContainer);
    form.appendChild(buttonContainer);

    outerContainer.appendChild(form);

    Swal.fire
    ({
        title: 'Replica alle risposte della richiesta '+id_richiesta,
        width:"800px",
        background: "#e2e1e0",
        html: outerContainer.outerHTML,
        showConfirmButton: false,
        showCancelButton : false,
        showCloseButton: true,
        allowOutsideClick:false,
        onOpen : function()
                {
                    
                }
    });
}
function inserisciNuovaReplica(event,id_richiesta)
{
    event.preventDefault();
        
    var descrizione=document.getElementById("formNuovaReplicadescrizione").value;

    $.post("inserisciNuovaReplica.php",
    {
        id_richiesta,
        descrizione
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
                var id_risposta=response.split("|")[0];
                var data_risposta=response.split("|")[1];
                var username_risposta=response.split("|")[2];

                var allegati_risposte=[];

                var files = document.getElementById("formNuovaReplicaInputScegliFile").files;
                if(files.length>0)
                {
                    var uploadedFiles=0;
                    
                    var fileNum=0;
                    for (var i = 0; i < files.length; i++)
                    {
                        var file=files[i];
                        var fileName=file.name;
                        var fileSize_kb= file.size;
                        var fileSize_mb=fileSize_kb/1000000;
                        if(fileSize_mb<90)
                        {
                            fileNum++;
                        }
                    }
                    if(fileNum>0)
                    {
                        for (var i = 0; i < files.length; i++)
                        {
                            var file=files[i];
                            var fileName=file.name;
                            var fileSize_kb= file.size;
                            var fileSize_mb=fileSize_kb/1000000;
                            if(fileSize_mb<90)
                            {
                                document.getElementById("statusUpload"+fileName).innerHTML='<i style="color:#2196F3" class="far fa-spinner-third fa-spin loadingIcon"></i>';
                                
                                var data= new FormData();
                                data.append('file',file);
                                data.append('fileNameResponse',fileName);
                                $.ajax(
                                {
                                    url:'uploadFileReplica.php',
                                    data:data,
                                    processData:false,
                                    contentType:false,
                                    type:'POST',
                                    success:function(response)
                                        {
                                            //console.log(response);
                                            if(response.indexOf("ok")>-1)
                                            {
                                                var fileNameResponse=response.split("|")[0];
                                                document.getElementById("statusUpload"+fileNameResponse).innerHTML='<i style="color:green" class="far fa-check-circle"></i>';
                                                uploadedFiles++;

                                                allegati_risposte.push("C:\\xampp\\htdocs\\\\OasisAllegatiRichieste\\"+id_risposta+"_R"+id_richiesta+fileNameResponse);
                                                
                                                if(uploadedFiles==fileNum)
                                                {
                                                    appendNuovaReplica(username_risposta,data_risposta,id_richiesta,descrizione,allegati_risposte);
                                                }
                                            }
                                            else
                                            {
                                                var fileNameResponse=response.split("|")[0];
                                                document.getElementById("statusUpload"+fileNameResponse).innerHTML='<i style="color:#d43f3a" class="far fa-exclamation-circle"></i>';
                                            }
                                        }
                                });
                            }
                        }
                    }
                    else
                    {
                        appendNuovaReplica(username_risposta,data_risposta,id_richiesta,descrizione,allegati_risposte);
                    }
                }
                else
                {
                    appendNuovaReplica(username_risposta,data_risposta,id_richiesta,descrizione,allegati_risposte);
                }
            }
        }
        else
            reject({status});
    });
}
function appendNuovaReplica(username_risposta,data_risposta,id_richiesta,descrizione,allegati_risposte)
{
    Swal.fire
    ({
        type: 'success',
        title: 'Replica inserita'
    });
    var richiesteListItemBoxRow=document.createElement("div");
    richiesteListItemBoxRow.setAttribute("class","richiesteListItemBoxRow");

    var numRisposte=document.getElementById("richiesteListItemBoxRisposteContainer"+id_richiesta).childNodes.length;
    var richiesteListItemBoxRowBackgroundColor;
    if(isOdd(numRisposte))
        richiesteListItemBoxRowBackgroundColor="#DBDBDB";
    else
        richiesteListItemBoxRowBackgroundColor="#D5D5D5";
    richiesteListItemBoxRow.setAttribute("style","background-color:"+richiesteListItemBoxRowBackgroundColor);
    
    var richiesteListItemBoxRowTitle=document.createElement("div");
    richiesteListItemBoxRowTitle.setAttribute("class","richiesteListItemBoxRowTitle");
    richiesteListItemBoxRowTitle.innerHTML="Risposta di "+username_risposta+" del "+data_risposta;
    richiesteListItemBoxRow.appendChild(richiesteListItemBoxRowTitle);

    /*INIZIO COLONNE----------------------------------------------------------------------------------------------------------------------------------*/
    /*DESCRIZIONE--------------------------------------------------------------*/
    var richiesteListItemElementContainer=document.createElement("div");
    richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
    richiesteListItemElementContainer.setAttribute("style","");

    var richiesteListItemElementLabel=document.createElement("div");
    richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
    richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
    richiesteListItemElementLabel.innerHTML="Testo";

    var richiesteListItemElementvalue=document.createElement("div");
    richiesteListItemElementvalue.setAttribute("class","richiesteListItemElementvalue");
    richiesteListItemElementvalue.setAttribute("style","");
    richiesteListItemElementvalue.innerHTML=descrizione;

    richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
    richiesteListItemElementContainer.appendChild(richiesteListItemElementvalue);

    richiesteListItemBoxRow.appendChild(richiesteListItemElementContainer);
    /*----------------------------------------------------------------------------*/
    /*FINE COLONNE------------------------------------------------------------------------------------------------------------------------------------*/
    /*INIZIO ALLEGATI---------------------------------------------------------------------------------------------------------------------------------*/

    var richiesteListItemElementContainer=document.createElement("div");
    richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
    richiesteListItemElementContainer.setAttribute("style","");

    var richiesteListItemElementLabel=document.createElement("div");
    richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
    richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
    richiesteListItemElementLabel.innerHTML="Allegati";

    var richiesteListItemElementValue=document.createElement("div");
    richiesteListItemElementValue.setAttribute("class","richiesteListItemElementValue");
    richiesteListItemElementValue.setAttribute("style","");

    allegati_risposte.forEach(function(allegato)
    {
        //console.log(allegato);
        var percorso=allegato;
        var nomeFile= percorso.split("\\");
        var nomeFile = nomeFile[nomeFile.length - 1];
        var formato= nomeFile.split(".")[1];

        var richiesteListItemElementValueAllegato=document.createElement("div");
        richiesteListItemElementValueAllegato.setAttribute("class","richiesteListItemElementValueAllegato");

        var richiesteListItemElementValueAllegatoRow=document.createElement("div");
        richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
        richiesteListItemElementValueAllegatoRow.setAttribute("style","height:20px;background-color:rgba(0,0,0,0.3)");

        var downloadButtonAllegato=document.createElement("button");
        downloadButtonAllegato.innerHTML='<i class="fad fa-arrow-alt-to-bottom"></i>';
        downloadButtonAllegato.setAttribute("class","richiesteListItemElementValueAllegatoButton");
        downloadButtonAllegato.setAttribute("style","float:left");
        downloadButtonAllegato.setAttribute('onclick',"downloadAllegato('"+nomeFile+"')");
        downloadButtonAllegato.setAttribute("title",'Scarica allegato "'+nomeFile+'"');
        richiesteListItemElementValueAllegatoRow.appendChild(downloadButtonAllegato);

        richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);

        var altroFormato=true;
        if(formato=="png" || formato=="jpg" || formato=="tif")
        {
            altroFormato=false;
            richiesteListItemElementValueAllegato.style.backgroundImage='url("http://remote.oasisgroup.it/OasisAllegatiRichieste/'+nomeFile+'")';
            richiesteListItemElementValueAllegato.style.backgroundSize='cover';
            richiesteListItemElementValueAllegato.style.backgroundPosition='center center';
            richiesteListItemElementValueAllegato.style.backgroundRepeat='no-repeat';
        }
        if(formato=="pdf")
        {
            altroFormato=false;
            var richiesteListItemElementValueAllegatoRow=document.createElement("div");
            richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
            richiesteListItemElementValueAllegatoRow.setAttribute("style","text-align:center;height:25px;margin-top:12.5px;");

            var richiesteListItemElementValueAllegatoPdf=document.createElement("a");
            richiesteListItemElementValueAllegatoPdf.setAttribute("href","http://remote.oasisgroup.it/OasisAllegatiRichieste/"+nomeFile);
            richiesteListItemElementValueAllegatoPdf.setAttribute("target","blank");
            richiesteListItemElementValueAllegatoPdf.setAttribute("style","color:gray");
            richiesteListItemElementValueAllegatoPdf.setAttribute("title","Visualizza PDF");
            richiesteListItemElementValueAllegatoPdf.innerHTML='<i class="fal fa-file-pdf fa-2x"></i>';

            richiesteListItemElementValueAllegatoRow.appendChild(richiesteListItemElementValueAllegatoPdf);
            richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);
        }
        if(formato=="xls" || formato=="xlsx" || formato=="xlsm")
        {
            altroFormato=false;
            var richiesteListItemElementValueAllegatoRow=document.createElement("div");
            richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
            richiesteListItemElementValueAllegatoRow.setAttribute("style","text-align:center;height:25px;margin-top:12.5px;color:gray");
            richiesteListItemElementValueAllegatoRow.innerHTML='<i class="fal fa-file-excel fa-2x"></i>';
            richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);
        }
        if(altroFormato)
        {
            var richiesteListItemElementValueAllegatoRow=document.createElement("div");
            richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
            richiesteListItemElementValueAllegatoRow.setAttribute("style","text-align:center;height:25px;margin-top:12.5px;color:gray");
            richiesteListItemElementValueAllegatoRow.innerHTML='<i class="fal fa-file fa-2x"></i>';
            richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);
        }

        richiesteListItemElementValue.appendChild(richiesteListItemElementValueAllegato);
    })

    richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
    richiesteListItemElementContainer.appendChild(richiesteListItemElementValue);

    richiesteListItemBoxRow.appendChild(richiesteListItemElementContainer);

    /*FINE ALLEGATI-----------------------------------------------------------------------------------------------------------------------------------*/

    document.getElementById("richiesteListItemBoxRisposteContainer"+id_richiesta).appendChild(richiesteListItemBoxRow);

    document.getElementById("richiesteListItemBoxRisposteContainer"+id_richiesta).scrollTop = document.getElementById("richiesteListItemBoxRisposteContainer"+id_richiesta).scrollHeight;
}
function getUtentiCoinvoltiEUtentiMacrocategoria(id_richiesta,id_macrocategoria)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getUtentiCoinvoltiEUtentiMacrocategoria.php",
        {
            id_richiesta,
            id_macrocategoria
        },
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
function modificaRichiesta(id_richiesta)
{
    document.getElementById("buttonSalvaModificheRichiesta"+id_richiesta).style.display="block";
    document.getElementById("buttonAnnullaModificheRichiesta"+id_richiesta).style.display="block";

    var all=document.getElementsByClassName("richiesteListItemElementInputEditable"+id_richiesta);
    for (var i = 0; i < all.length; i++) 
    {
        all[i].disabled=false;
    }
}
function eliminaRichiesta(id_richiesta)
{
    var stato="Eliminata";
    Swal.fire
    ({
        type: 'question',
        title:'Eliminazione richiesta',
        text: "Confermi di voler eliminare la richiesta?",
        showCloseButton:true,
        confirmButtonColor:"#DA6969",
        confirmButtonText: "Elimina",
        showCancelButton:true,
        cancelButtonText:"Annulla"
    }).then((result) => 
    {
        if (result.value)
        {
            $.post("cambiaStatoRichiesta.php",
            {
                id_richiesta,
                stato
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
                        Swal.fire
                        ({
                            type: 'success',
                            title: 'Richiesta eliminata',
                        }).then(function(){getRichiesteUtente();});
                    }
                }
                else
                    console.log(status);
            });
        }
        else
            swal.close();
    });  
}
function isOdd(num) { return num % 2;}
async function salvaModificheRichiesta(id_richiesta)
{
    var colonneDaNonSvuotare=[];

    var error=false;
    var errorMessage="";

    var oggetto=document.getElementById("leTueRichiesteInputoggetto"+id_richiesta).value;
    var descrizione=document.getElementById("leTueRichiesteInputdescrizione"+id_richiesta).value;
    var macrocategoria=document.getElementById("leTueRichiesteInputmacrocategoria"+id_richiesta).value;
    var categoria=document.getElementById("leTueRichiesteInputcategoria"+id_richiesta).value;
    var note=document.getElementById("leTueRichiesteInputnote"+id_richiesta).value;

    var colonneMacrocategoria=await getArrayColonneMacrocategoria(macrocategoria);
    var valoriColonneMacrocategoria=[];

    colonneMacrocategoria.forEach(function(colonna)
    {
        colonneDaNonSvuotare.push(colonna["colonna"]);

        if(colonna["required"]=="true" && document.getElementById("leTueRichiesteInput"+colonna["colonna"]+id_richiesta).value=="")
        {
            error=true;
            errorMessage="Inserire un valore per la colonna "+colonna["label"];
        }
        else
        {
            valoriColonneMacrocategoria.push("["+colonna['colonna']+"]='"+document.getElementById("leTueRichiesteInput"+colonna["colonna"]+id_richiesta).value+"'");colonna['colonna']
        }
    });

    if(error)
    {
        Swal.fire
        ({
            type: 'error',
            title: 'Errore',
            text: errorMessage
        });
    }
    else
    {
        var JSONvaloriColonneMacrocategoria=JSON.stringify(valoriColonneMacrocategoria)
        $.post("salvaModificheLeTueRichieste.php",
        {
            id_richiesta,
            oggetto,
            descrizione,
            macrocategoria,
            categoria,
            note,
            JSONvaloriColonneMacrocategoria
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
                    Swal.fire
                    ({
                        type: 'success',
                        title: 'Modifiche salvate',
                    }).then(function()
                    {
                        document.getElementById("buttonSalvaModificheRichiesta"+id_richiesta).style.display="none";
                        document.getElementById("buttonAnnullaModificheRichiesta"+id_richiesta).style.display="none";

                        var all=document.getElementsByClassName("richiesteListItemElementInputEditable"+id_richiesta);
                        for (var i = 0; i < all.length; i++) 
                        {
                            all[i].disabled=true;
                        }
                    });
                }
            }
            else
                console.log(status);
        });
    }

    var JSONcolonneDaNonSvuotare=JSON.stringify(colonneDaNonSvuotare);
    $.post("svuotaColonneRichieste.php",
    {
        JSONcolonneDaNonSvuotare,
        id_richiesta
    },
    function(response, status)
    {
        if(status!=="success")
            console.log(status);
    });
}
function annullaModificheRichiesta(id_richiesta)
{
    document.getElementById("buttonSalvaModificheRichiesta"+id_richiesta).style.display="none";
    document.getElementById("buttonAnnullaModificheRichiesta"+id_richiesta).style.display="none";

    var all=document.getElementsByClassName("richiesteListItemElementInputEditable"+id_richiesta);
    for (var i = 0; i < all.length; i++) 
    {
        all[i].disabled=true;
    }
}
function confermaChiusuraRichiesta(id_richiesta)
{
    var stato="Chiusa";
    Swal.fire
    ({
        type: 'question',
        text: "Confermi di voler accettare le risposte e chiudere la richiesta?",
        showCloseButton:true,
        confirmButtonColor:"#70B085",
        confirmButtonText: "Chiudi richiesta"
    }).then((result) => 
    {
        if (result.value)
        {
            $.post("cambiaStatoRichiesta.php.php",
            {
                id_richiesta,
                stato
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
                        Swal.fire
                        ({
                            type: 'success',
                            title: 'Risposta accettata',
                        }).then(function(){getRichiesteUtente();});
                    }
                }
                else
                    console.log(status);
            });
        }
        else
            swal.close();
    });   
}
function rifiutaChiusuraRichiesta(id_richiesta)
{
    var stato="Aperta";
    Swal.fire
    ({
        type: 'question',
        text: "Confermi di voler rifiutare le risposte e riaprire la richiesta?",
        showCloseButton:true,
        confirmButtonColor:"#DA6969",
        confirmButtonText: "Riapri richiesta",
    }).then((result) => 
    {
        if (result.value)
        {
            $.post("cambiaStatoRichiesta.php.php",
            {
                id_richiesta,
                stato
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
                        Swal.fire
                        ({
                            type: 'success',
                            title: 'Risposta rifiutata',
                        }).then(function(){getRichiesteUtente();});
                    }
                }
                else
                    console.log(status);
            });
        }
        else
            swal.close();
    });   
}
function downloadAllegato(nomeFile)
{
    window.open("http://remote.oasisgroup.it/OasisAllegatiRichieste/download.php?nomeFile="+nomeFile , '_blank');
}
function eliminaAllegato(element,id_allegato)
{
    Swal.fire
    ({
        type: 'question',
        title: "Eliminare l' allegato?",
        showCancelButton:true
    }).then((result) => 
    {
        if (result.value)
        {
            $.post("eliminaAllegatoRichiesteEfaq.php",
            {
                id_allegato
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
                        element.remove();
                    }
                }
                else
                    console.log(status);
            });
        }
        else
            swal.close();
    });
}
async function apriPopupAggiungiUtente(utenti_coinvolti_string,id_richiesta)
{
    var utenti_coinvolti=utenti_coinvolti_string.split(",");
    var utenti_non_coinvolti=await getUtentiNonCoinvolti(utenti_coinvolti);
    var container=document.createElement("div");
    container.setAttribute("style","float:center;display:block;min-height:110px")
    var select=document.createElement("select");
    select.setAttribute("id","selectAggiungiUtenteLeTueRichieste");
    select.setAttribute("multiple","multiple");

    utenti_non_coinvolti.forEach(function(utente)
    {
        var option=document.createElement("option");
        option.setAttribute("value",utente.id_utente);
        option.innerHTML=utente.username;
        select.appendChild(option);
    });

    container.appendChild(select);

    Swal.fire
    ({
        title: "Seleziona uno o più utenti",
        html:container.outerHTML,
        showCancelButton:false,
        showCloseButton:true,
        confirmButtonText:"Conferma",
        onOpen:function()
        {
            $('#selectAggiungiUtenteLeTueRichieste').multipleSelect({maxHeight: 80,textAlign:"left"});
            document.getElementsByClassName("ms-drop bottom")[0].childNodes[0].style.textAlign="left";
        }
    }).then((result) => 
    {
        if (result.value)
        {
            var utenti=$('#selectAggiungiUtenteLeTueRichieste').multipleSelect('getSelects');
            if(utenti.length>0)
            {
                $.post("aggiungiUtentiCoinvoltiRichieste.php",
                {
                    utenti,
                    id_richiesta
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
                            var utenti_aggiunti=JSON.parse(response);
                            utenti_aggiunti.forEach(function(utente)
                            {
                                var richiesteListItemElementValueTableTr=document.createElement("tr");
                                var richiesteListItemElementValueTableTd=document.createElement("td");
                                richiesteListItemElementValueTableTd.innerHTML=utente.username;

                                richiesteListItemElementValueTableTr.appendChild(richiesteListItemElementValueTableTd);

                                var rimuoviUtenteIcon=document.createElement("i");
                                rimuoviUtenteIcon.setAttribute("class","fad fa-user-minus");

                                var rimuoviUtenteButton=document.createElement("button");
                                rimuoviUtenteButton.setAttribute("class","btnIconRichiesteEfaq richiesteListItemElementInputEditable"+id_richiesta);
                                rimuoviUtenteButton.setAttribute("title","Rimuovi utente");
                                rimuoviUtenteButton.setAttribute("disabled","disabled");
                                rimuoviUtenteButton.setAttribute("style","flot:left;display:block;margin-left:10px");
                                rimuoviUtenteButton.setAttribute("onclick","rimuoviUtente(this.parentElement.parentElement,"+id_richiesta+",'"+utente.username+"')");
                                rimuoviUtenteButton.appendChild(rimuoviUtenteIcon);

                                var richiesteListItemElementValueTableTd=document.createElement("td");
                                richiesteListItemElementValueTableTd.appendChild(rimuoviUtenteButton);

                                richiesteListItemElementValueTableTr.appendChild(richiesteListItemElementValueTableTd);

                                document.getElementById("richiesteListItemElementValueTable"+id_richiesta).appendChild(richiesteListItemElementValueTableTr);
                            });
                            modificaRichiesta(id_richiesta);
                        }
                    }
                    else
                        console.log(status);
                });
            }
        }
        else
            swal.close();
    });   
}
function rimuoviUtente(row,id_richiesta,username)
{
    $.post("rimuoviUtenteLeTueRichieste.php",
    {
        id_richiesta,
        username
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
                row.remove();
            }
        }
        else
            console.log(status);
    });
}
function getUtentiNonCoinvolti(utenti_coinvolti)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getUtentiNonCoinvoltiRichiesteEfaq.php",
        {
            utenti_coinvolti
        },
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
function getIdAllegati(richieste)
{
    id_allegati={};
    richieste.forEach(function(richiesta)
    {
        if(richiesta.id_allegato!=null)
        {
            id_allegati[richiesta.percorso_allegato]=richiesta.id_allegato;
        }
    });
    return id_allegati;
}
function getValoreColonnaRichiesteById(richieste,id_richiesta,colonna)
{
    var valore;
    richieste.forEach(function(richiesta)
    {
        if(richiesta.id_richiesta==id_richiesta)
        {
            valore= richiesta[colonna];
        }
    });
    return valore;
}
function getValoriColonnaRichiesteById(richieste,id_richiesta,colonna)
{
    var valori=[];
    richieste.forEach(function(richiesta)
    {
        if(richiesta.id_richiesta==id_richiesta)
        {
            if(richiesta[colonna]!=null && richiesta[colonna]!="" && !valori.includes(richiesta[colonna]))
                valori.push(richiesta[colonna]);
        }
    });
    return valori;
}
function getValoreColonnaRisposteById(risposte,id_richiesta,id_risposta,colonna)
{
    var valore;
    risposte.forEach(function(risposta)
    {
        if(risposta.richiesta==id_richiesta && risposta.id_risposta==id_risposta)
        {
            valore= risposta[colonna];
        }
    });
    return valore;
}
function getValoriColonnaRisposteById(risposte,id_richiesta,id_risposta,colonna)
{
    if(id_risposta=="*")
    {
        var valori=[];
        risposte.forEach(function(risposta)
        {
            if(risposta.richiesta==id_richiesta)
            {
                if(risposta[colonna]!=null && risposta[colonna]!="" && !valori.includes(risposta[colonna]))
                    valori.push(risposta[colonna]);
            }
        });
        return valori;
    }
    else
    {
        var valori=[];
        risposte.forEach(function(risposta)
        {
            if(risposta.richiesta==id_richiesta && risposta.id_risposta==id_risposta)
            {
                if(risposta[colonna]!=null && risposta[colonna]!="" && !valori.includes(risposta[colonna]))
                    valori.push(risposta[colonna]);
            }
        });
        return valori;
    }
}
function editableTableLoad()
{
    document.getElementById("viewFunctionBar").style.borderBottom="none";
    if(view=="richieste_utente")
    {
        $.post("dropTmpViewRichiesteEfaq.php",{tmpViewName});
        $('i.far.fa-plus.btnAddRecordEditableTable').hide();
    }
}
function getTmpViewRichiesteEfaq()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getTmpViewRichiesteEfaq.php",
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
function getTable(table,orderBy,orderType)
{
    if(view=="richieste_utente")
    {
        getEditableTable
        ({
            table,
            primaryKey: "id_richiesta",
            editable: true,
            container:'richiesteContainer',
            noFilterColumns:['note','data_creazione'],
            readOnlyColumns: ["id_richiesta","macrocategoria","categoria","stato","data_creazione"],
            foreignKeys:[['categoria','categorie_richieste','id_categoria','nome'],['macrocategoria','macrocategorie_richieste','id_macrocategoria','nome']],
            orderBy:orderBy,
            orderType:orderType
        });
    }
    if(view=="tutte_le_richieste")
    {
        getEditableTable
        ({
            table,
            primaryKey: "id_richiesta",
            editable: false,
            container:'richiesteContainer',
            noFilterColumns:['note','data_creazione'],
            readOnlyColumns: ["id_richiesta","macrocategoria","categoria","stato","data_creazione"],
            foreignKeys:[['categoria','categorie_richieste','id_categoria','nome'],['macrocategoria','macrocategorie_richieste','id_macrocategoria','nome']],
            orderBy:orderBy,
            orderType:orderType
        });
    }
}
function getVisualizzazione()
{
    if(document.getElementById("switchVisualizzazioneCheckbox").checked)
        return "tabella";
    return "lista";
}
function toggleVisualizzazione()
{
    switch(view)
    {
        case "richieste_utente":getRichiesteUtente();break;
        case "tutte_le_richieste":getTutteRichieste();break;
    }
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
            if(col.childNodes[0].className=="far fa-edit btnEditEditableTable")
                col.innerHTML="";
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
    
    exportTableToExcel("myTable"+table, "richieste_e_faq");
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
function getAllMacrocategorie()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getAllMacrocategorie.php",
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
function getAllCategorie()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getAllCategorie.php",
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
function getListColonneExtra(id_macrocategoria)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getListColonneExtraRichieste.php",
        {
            id_macrocategoria
        },
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
function getRisposteUtente()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getRisposteUtente.php",
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
function aggiungiAllegatiLeTueRichieste(input,id_richiesta)
{
    var files = input.files;
    if(files.length>0)
    {
        var uploadedFiles=0;
        
        var fileNum=0;
        for (var i = 0; i < files.length; i++)
        {
            var file=files[i];
            var fileName=file.name;
            var fileSize_kb= file.size;
            var fileSize_mb=fileSize_kb/1000000;
            if(fileSize_mb<90)
            {
                fileNum++;
            }
        }
        if(fileNum>0)
        {
            for (var i = 0; i < files.length; i++)
            {
                var file=files[i];
                var fileName=file.name;
                var fileSize_kb= file.size;
                var fileSize_mb=fileSize_kb/1000000;
                if(fileSize_mb<90)
                {
                    var data= new FormData();
                    data.append('file',file);
                    data.append('fileNameResponse',fileName);
                    data.append('id_richiesta',id_richiesta);
                    $.ajax(
                    {
                        url:'aggiungiFileRichiesta.php',
                        data:data,
                        processData:false,
                        contentType:false,
                        type:'POST',
                        success:function(response)
                            {
                                //console.log(response);
                                if(response.indexOf("error")>-1 || response.indexOf("notice")>-1 || response.indexOf("warning")>-1)
                                {
                                    Swal.fire
                                    ({
                                        type: 'error',
                                        title: 'Errore',
                                        text: "Impossibile importare il file "+fileName
                                    });
                                    console.log(response);
                                }
                                else
                                {
                                    uploadedFiles++;

                                    var nomeFile=response.split("|")[0];
                                    var id_allegato=response.split("|")[1];
                                    
                                    //var percorso="C:\\xampp\\htdocs\\\\OasisAllegatiRichieste\\"+nomeFile;
                                    var formato= nomeFile.split(".")[1];

                                    var richiesteListItemElementValueAllegato=document.createElement("div");
                                    richiesteListItemElementValueAllegato.setAttribute("class","richiesteListItemElementValueAllegato");
                                    //richiesteListItemElementValueAllegato.setAttribute("data-tooltip",nomeFile);

                                    var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                    richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                    richiesteListItemElementValueAllegatoRow.setAttribute("style","height:20px;background-color:rgba(0,0,0,0.3)");

                                    var downloadButtonAllegato=document.createElement("button");
                                    downloadButtonAllegato.innerHTML='<i class="fad fa-arrow-alt-to-bottom"></i>';
                                    downloadButtonAllegato.setAttribute("class","richiesteListItemElementValueAllegatoButton");
                                    downloadButtonAllegato.setAttribute("style","float:left");
                                    downloadButtonAllegato.setAttribute('onclick',"downloadAllegato('"+nomeFile+"')");
                                    downloadButtonAllegato.setAttribute("title",'Scarica allegato "'+nomeFile+'"');
                                    richiesteListItemElementValueAllegatoRow.appendChild(downloadButtonAllegato);

                                    var deleteButtonAllegato=document.createElement("button");
                                    deleteButtonAllegato.innerHTML='<i class="far fa-times"></i>';
                                    deleteButtonAllegato.setAttribute("class","richiesteListItemElementValueAllegatoButton richiesteListItemElementInputEditable"+id_richiesta);
                                    deleteButtonAllegato.setAttribute("style","float:right;color:red");
                                    deleteButtonAllegato.setAttribute("disabled","disabled");
                                    deleteButtonAllegato.setAttribute("onclick","eliminaAllegato(this.parentElement.parentElement,"+id_allegato+")");
                                    deleteButtonAllegato.setAttribute("title",'Elimina allegato "'+nomeFile+'"');
                                    richiesteListItemElementValueAllegatoRow.appendChild(deleteButtonAllegato); 

                                    richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);

                                    var altroFormato=true;
                                    if(formato=="png" || formato=="jpg" || formato=="tif")
                                    {
                                        altroFormato=false;
                                        richiesteListItemElementValueAllegato.style.backgroundImage='url("http://remote.oasisgroup.it/OasisAllegatiRichieste/'+nomeFile+'")';
                                        richiesteListItemElementValueAllegato.style.backgroundSize='cover';
                                        richiesteListItemElementValueAllegato.style.backgroundPosition='center center';
                                        richiesteListItemElementValueAllegato.style.backgroundRepeat='no-repeat';
                                    }
                                    if(formato=="pdf")
                                    {
                                        altroFormato=false;
                                        var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                        richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                        richiesteListItemElementValueAllegatoRow.setAttribute("style","text-align:center;height:25px;margin-top:12.5px;");

                                        var richiesteListItemElementValueAllegatoPdf=document.createElement("a");
                                        richiesteListItemElementValueAllegatoPdf.setAttribute("href","http://remote.oasisgroup.it/OasisAllegatiRichieste/"+nomeFile);
                                        richiesteListItemElementValueAllegatoPdf.setAttribute("target","blank");
                                        richiesteListItemElementValueAllegatoPdf.setAttribute("style","color:gray");
                                        richiesteListItemElementValueAllegatoPdf.setAttribute("title","Visualizza PDF");
                                        richiesteListItemElementValueAllegatoPdf.innerHTML='<i class="fal fa-file-pdf fa-2x"></i>';

                                        richiesteListItemElementValueAllegatoRow.appendChild(richiesteListItemElementValueAllegatoPdf);
                                        richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);
                                    }
                                    if(formato=="xls" || formato=="xlsx" || formato=="xlsm")
                                    {
                                        altroFormato=false;
                                        var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                        richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                        richiesteListItemElementValueAllegatoRow.setAttribute("style","text-align:center;height:25px;margin-top:12.5px;color:gray");
                                        richiesteListItemElementValueAllegatoRow.innerHTML='<i class="fal fa-file-excel fa-2x"></i>';
                                        richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);
                                    }
                                    if(altroFormato)
                                    {
                                        var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                        richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                        richiesteListItemElementValueAllegatoRow.setAttribute("style","text-align:center;height:25px;margin-top:12.5px;color:gray");
                                        richiesteListItemElementValueAllegatoRow.innerHTML='<i class="fal fa-file fa-2x"></i>';
                                        richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);
                                    }

                                    //richiesteListItemElementValueAllegato.innerHTML=allegato;
                                    document.getElementById("richiesteListItemElementValueAllegatiRichiesteContainer"+id_richiesta).appendChild(richiesteListItemElementValueAllegato);
                                }
                            }
                    });
                }
            }
        }
    }
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
async function getTutteRichieste()
{
    document.getElementById("viewTitle").innerHTML='Tutte le richieste<i class="fad fa-database" style="margin-left:10px;"></i>';
    document.getElementById("richiesteContainer").innerHTML="";
    view="tutte_le_richieste";
    var visualizzazione=getVisualizzazione();
    if(visualizzazione=="tabella")
    {
        newCircleSpinner("Caricamento in corso...");

        document.getElementById("editableTableElementsRichiesteEfaq").style.display="block";
        document.getElementById("listViewElementsRichiesteEfaq").style.display="none";

        tmpViewName= "tutte_le_richieste_view";
        removeCircleSpinner();
        getTable(tmpViewName,"data_creazione","DESC");
    }
    if(visualizzazione=="lista")
    {
        newCircleSpinner("Caricamento in corso...")

        document.getElementById("editableTableElementsRichiesteEfaq").style.display="none";
        document.getElementById("listViewElementsRichiesteEfaq").style.display="block";

        document.getElementById("searchSelectLeTueRichiesteListItem1OptionUtente").style.display="block";

        var filtroMacrocategoria=document.getElementById("selectFiltraMacrocategoriaLeTueRichieste").value;
        var filtroCategoria=document.getElementById("selectFiltraCategoriaLeTueRichieste").value;

        $('#selectStatoLeTueRichieste').multipleSelect("destroy");
        $('#selectStatoLeTueRichieste').multipleSelect
        ({
            onClose: function ()
            {
                getTutteRichieste();
            }
        });
        document.getElementsByClassName("ms-drop bottom")[0].childNodes[0].style.textAlign="left";
        var all=document.getElementsByClassName("ms-choice");
        for (var i = 0; i < all.length; i++) 
        {
            all[i].style.height="20px";
            all[i].style.lineHeight="18px";
            all[i].style.border="none";
            all[i].style.outline="none";
            all[i].style.fontFamily="'Montserrat',sans-serif";
            all[i].style.fontSize="12px";
            all[i].style.backgroundColor="transparent";
        }
        var multipleSelectUl=document.getElementsByClassName("ms-drop bottom")[0].childNodes[0];
        for (var j = 0; j < multipleSelectUl.childNodes.length; j++) 
        {
            var multipleSelectLi=multipleSelectUl.childNodes[j];
            var multipleSelectCheckbox=multipleSelectLi.childNodes[0].childNodes[0];
            if(multipleSelectCheckbox!=undefined)
                var multipleSelectValue=multipleSelectCheckbox.value;

            var multipleSelectColor="";
            switch(multipleSelectValue)
            {
                case "Aperta":multipleSelectColor="#DA6969";break;
                case "Presa in carico":multipleSelectColor="#4C91CB";break;
                case "In attesa di chiusura":multipleSelectColor="#E9A93A";break;
                case "Chiusa":multipleSelectColor="#70B085";break;
            }
            multipleSelectLi.style.color=multipleSelectColor;
        }
        var filtroStato=$('#selectStatoLeTueRichieste').multipleSelect('getSelects');

        if(filtroStato.length==0)
        {
            Swal.fire
            ({
                type: 'error',
                title: 'Errore',
                text: "Nessuno stato selezionato"
            });
            removeCircleSpinner();
        }
        else
        {
            document.getElementById("viewFunctionBar").style.borderBottom="1px solid #bbb";

            var macrocategorie=await getAllMacrocategorie();
            var categorie=await getAllCategorie();
            
            var colonneExtraMacrocategorie={};
            macrocategorie.forEach(async function(macrocategoria)
            {
                colonneExtraMacrocategorie[macrocategoria.id_macrocategoria]=await getArrayColonneMacrocategoria(macrocategoria.id_macrocategoria);
            });

            var risposte=await getRisposteUtente();

            $.get("getTutteLeRichieste.php",
            {
                filtroStato,
                filtroMacrocategoria,
                filtroCategoria
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
                        richieste=JSON.parse(response);
                        var id_richieste=[];

                        //console.log(richieste);

                        var richiesteListContainer=document.createElement("div");
                        richiesteListContainer.setAttribute("id","richiesteListContainer");

                        richieste.forEach(function(richiesta)
                        {
                            if(!id_richieste.includes(richiesta.id_richiesta))
                            {
                                id_richieste.push(richiesta.id_richiesta);
                            }
                        });

                        id_richieste.reverse();

                        console.log(id_richieste);

                        var id_allegati=getIdAllegati(richieste);

                        var i=0;
                        id_richieste.forEach(function(id_richiesta)
                        {
                            var utente_creazione=getValoreColonnaRichiesteById(richieste,id_richiesta,"utente_creazione");
                            var oggetto=getValoreColonnaRichiesteById(richieste,id_richiesta,"oggetto");
                            var descrizione=getValoreColonnaRichiesteById(richieste,id_richiesta,"descrizione");
                            var note=getValoreColonnaRichiesteById(richieste,id_richiesta,"note");
                            var id_macrocategoria=getValoreColonnaRichiesteById(richieste,id_richiesta,"id_macrocategoria");
                            var macrocategoria=getValoreColonnaRichiesteById(richieste,id_richiesta,"macrocategoria");
                            var descrizione_macrocategoria=getValoreColonnaRichiesteById(richieste,id_richiesta,"descrizione_macrocategoria");
                            var id_categoria=getValoreColonnaRichiesteById(richieste,id_richiesta,"id_categoria");
                            var categoria=getValoreColonnaRichiesteById(richieste,id_richiesta,"categoria");
                            var descrizione_categoria=getValoreColonnaRichiesteById(richieste,id_richiesta,"descrizione_categoria");
                            var stato=getValoreColonnaRichiesteById(richieste,id_richiesta,"stato");
                            var data_creazione=getValoreColonnaRichiesteById(richieste,id_richiesta,"data_creazione").date.split(" ")[0];

                            var utenti_coinvolti=getValoriColonnaRichiesteById(richieste,id_richiesta,"utente_incaricato");
                            var allegati=getValoriColonnaRichiesteById(richieste,id_richiesta,"percorso_allegato");
                            
                            var valoriColonneExtra={};
                            var listColonneExtra=colonneExtraMacrocategorie[id_macrocategoria];
                            listColonneExtra.forEach(function(colonna)
                            {
                                valoriColonneExtra[colonna["colonna"]]=getValoreColonnaRichiesteById(richieste,id_richiesta,colonna["colonna"]);
                            });

                            var richiesteListItem=document.createElement("div");
                            richiesteListItem.setAttribute("class","richiesteListItem");
                            richiesteListItem.setAttribute("id_richiesta",id_richiesta);

                            var richiesteListItemRow=document.createElement("div");
                            richiesteListItemRow.setAttribute("class","richiesteListItemRow");

                            switch(stato)
                            {
                                case "Aperta":richiesteListItemRowBackgroundColor="#DA6969";break;
                                case "Presa in carico":richiesteListItemRowBackgroundColor="#4C91CB";break;
                                case "In attesa di chiusura":richiesteListItemRowBackgroundColor="#E9A93A";break;
                                case "Chiusa":richiesteListItemRowBackgroundColor="#70B085";break;
                            }
                            richiesteListItemRow.setAttribute("style","min-height:50px;background-color:"+richiesteListItemRowBackgroundColor);

                            /*var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","width:auto;margin:10px");

                            var buttonGestioneRichiesta=document.createElement("button");
                            buttonGestioneRichiesta.setAttribute("class","buttonGestioneRichiesta");
                            buttonGestioneRichiesta.setAttribute("onclick","modificaRichiesta("+id_richiesta+")");
                            buttonGestioneRichiesta.innerHTML='Modifica <i class="fad fa-edit" style="margin-left:5px"></i>';
                            richiesteListItemElementContainer.appendChild(buttonGestioneRichiesta);

                            var buttonGestioneRichiesta=document.createElement("button");
                            buttonGestioneRichiesta.setAttribute("class","buttonGestioneRichiesta");
                            buttonGestioneRichiesta.setAttribute("id","buttonSalvaModificheRichiesta"+id_richiesta);
                            buttonGestioneRichiesta.setAttribute("style","margin-left:20px;display:none");
                            buttonGestioneRichiesta.setAttribute("onclick","salvaModificheRichiesta("+id_richiesta+")");
                            buttonGestioneRichiesta.innerHTML='Salva <i class="fad fa-save" style="margin-left:5px"></i>';
                            richiesteListItemElementContainer.appendChild(buttonGestioneRichiesta);

                            var buttonGestioneRichiesta=document.createElement("button");
                            buttonGestioneRichiesta.setAttribute("class","buttonGestioneRichiesta");
                            buttonGestioneRichiesta.setAttribute("id","buttonAnnullaModificheRichiesta"+id_richiesta);
                            buttonGestioneRichiesta.setAttribute("style","margin-left:20px;display:none");
                            buttonGestioneRichiesta.setAttribute("onclick","annullaModificheRichiesta("+id_richiesta+")");
                            buttonGestioneRichiesta.innerHTML='Indietro <i class="fad fa-undo-alt" style="margin-left:5px"></i>';
                            richiesteListItemElementContainer.appendChild(buttonGestioneRichiesta);

                            var buttonGestioneRichiesta=document.createElement("button");
                            buttonGestioneRichiesta.setAttribute("class","buttonGestioneRichiesta");
                            buttonGestioneRichiesta.setAttribute("onclick","eliminaRichiesta("+id_richiesta+")");
                            buttonGestioneRichiesta.setAttribute("style","margin-left:20px;");
                            buttonGestioneRichiesta.innerHTML='Elimina <i class="fad fa-trash" style="margin-left:5px"></i>';
                            richiesteListItemElementContainer.appendChild(buttonGestioneRichiesta);

                            richiesteListItemRow.appendChild(richiesteListItemElementContainer);*/

                            /*ID--------------------------------------------------------------------------*/
                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","width:auto;margin:10px");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:30px;line-height:30px;width:auto;margin-right: 10px;");
                            richiesteListItemElementLabel.innerHTML="Codice richiesta:";

                            var richiesteListItemElementValue=document.createElement("div");
                            richiesteListItemElementValue.setAttribute("class","richiesteListItemElementValue");
                            richiesteListItemElementValue.setAttribute("id","leTueRichiesteValueid_richiesta"+id_richiesta);
                            richiesteListItemElementValue.setAttribute("style","line-height:30px;height:30px;color:#EBEBEB;font-weight:bold;width:20px");
                            richiesteListItemElementValue.innerHTML=id_richiesta;

                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementValue);

                            richiesteListItemRow.appendChild(richiesteListItemElementContainer);
                            /*----------------------------------------------------------------------------*/
                            /*UTENTE CREAZIONE------------------------------------------------------------*/
                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","width:180px;margin:10px");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:30px;line-height:30px;width:auto;margin-right: 10px;");
                            richiesteListItemElementLabel.innerHTML="Utente";

                            var richiesteListItemElementValue=document.createElement("div");
                            richiesteListItemElementValue.setAttribute("class","richiesteListItemElementValue");
                            richiesteListItemElementValue.setAttribute("style","width:auto;line-height:30px;height:30px;color:#EBEBEB;");
                            richiesteListItemElementValue.setAttribute("id","leTueRichiesteValueutente_creazione"+id_richiesta);
                            richiesteListItemElementValue.innerHTML=utente_creazione;

                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementValue);

                            richiesteListItemRow.appendChild(richiesteListItemElementContainer);
                            /*----------------------------------------------------------------------------*/
                            /*OGGETTO---------------------------------------------------------------------*/
                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","width:auto;margin:10px");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:30px;line-height:30px;width:auto;margin-right: 10px;");
                            richiesteListItemElementLabel.innerHTML="Oggetto";

                            var richiesteListItemElementInput=document.createElement("textarea");
                            richiesteListItemElementInput.setAttribute("class","richiesteListItemElementInput richiesteListItemElementInputEditable"+id_richiesta);
                            richiesteListItemElementInput.setAttribute("style","line-height:25px;height:30px;width:250px;resize:both");
                            richiesteListItemElementInput.setAttribute("disabled","disabled");
                            richiesteListItemElementInput.setAttribute("id","leTueRichiesteInputoggetto"+id_richiesta);
                            richiesteListItemElementInput.value=oggetto;


                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementInput);

                            richiesteListItemRow.appendChild(richiesteListItemElementContainer);
                            /*----------------------------------------------------------------------------*/
                            /*DATA CREAZIONE--------------------------------------------------------------*/
                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","width:180px;margin:10px");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:30px;line-height:30px;width:auto;margin-right: 10px;");
                            richiesteListItemElementLabel.innerHTML="Data creazione";

                            var richiesteListItemElementInput=document.createElement("div");
                            richiesteListItemElementInput.setAttribute("class","richiesteListItemElementValue");
                            richiesteListItemElementInput.setAttribute("id","leTueRichiesteValuedata_creazione"+id_richiesta);
                            richiesteListItemElementInput.setAttribute("style","width:80px;line-height:30px;height:30px;color:#EBEBEB;");
                            
                            var data_creazione_anno=data_creazione.split("-")[0];
                            var data_creazione_mese=data_creazione.split("-")[1];
                            var data_creazione_giorno=data_creazione.split("-")[2];
                            var data_ita=data_creazione_giorno+"/"+data_creazione_mese+"/"+data_creazione_anno;

                            richiesteListItemElementInput.innerHTML=data_ita;

                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementInput);

                            richiesteListItemRow.appendChild(richiesteListItemElementContainer);
                            /*----------------------------------------------------------------------------*/
                            /*STATO-----------------------------------------------------------------------*/
                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","width:auto;margin:10px");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:30px;line-height:30px;width:auto;margin-right: 10px;");
                            richiesteListItemElementLabel.innerHTML="Stato";

                            var richiesteListItemElementValue=document.createElement("div");
                            richiesteListItemElementValue.setAttribute("class","richiesteListItemElementValue");
                            var colorStato;
                            var iconStato;
                            switch(stato)
                            {
                                case "Aperta":colorStato="#EBEBEB";iconStato="far fa-exclamation-circle";break;
                                case "Presa in carico":colorStato="#EBEBEB";iconStato="far fa-cogs";break;
                                case "In attesa di chiusura":colorStato="#EBEBEB";iconStato="far fa-hourglass-half";break;
                                case "Chiusa":colorStato="#EBEBEB";iconStato="far fa-check-circle";break;
                            }
                            richiesteListItemElementValue.setAttribute("style","line-height:30px;height:30px;color:"+colorStato+";width:140px");
                            richiesteListItemElementValue.innerHTML=stato+'<i class="'+iconStato+'" style="margin-left:5px"></i>';

                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementValue);

                            richiesteListItemRow.appendChild(richiesteListItemElementContainer);

                            /*if(stato=="In attesa di chiusura")
                            {
                                var richiesteListItemElementContainer=document.createElement("div");
                                richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                                richiesteListItemElementContainer.setAttribute("style","width:auto;margin:10px");
                                
                                var buttonChiusuraRichiesta=document.createElement("button");
                                buttonChiusuraRichiesta.setAttribute("class","buttonChiusuraRichiesta");
                                buttonChiusuraRichiesta.setAttribute("id","buttonChiusuraRichiestaAccetta");
                                buttonChiusuraRichiesta.setAttribute("onclick","confermaChiusuraRichiesta("+id_richiesta+")");
                                buttonChiusuraRichiesta.innerHTML='Chiudi richiesta<i class="fad fa-comment-check" style="margin-left:10px"></i>';
                                richiesteListItemElementContainer.appendChild(buttonChiusuraRichiesta);

                                var buttonChiusuraRichiesta=document.createElement("button");
                                buttonChiusuraRichiesta.setAttribute("class","buttonChiusuraRichiesta");
                                buttonChiusuraRichiesta.setAttribute("id","buttonChiusuraRichiestaRifiuta");
                                buttonChiusuraRichiesta.setAttribute("onclick","rifiutaChiusuraRichiesta("+id_richiesta+")");
                                buttonChiusuraRichiesta.innerHTML='Riapri richiesta<i class="fad fa-comment-times" style="margin-left:10px"></i>';
                                richiesteListItemElementContainer.appendChild(buttonChiusuraRichiesta);

                                richiesteListItemRow.appendChild(richiesteListItemElementContainer);
                            }*/
                            /*----------------------------------------------------------------------------*/

                            var id_risposte=getValoriColonnaRisposteById(risposte,id_richiesta,"*","id_risposta");
                            /*if(id_risposte.length>0)
                            {
                                var richiesteListItemElementContainer=document.createElement("div");
                                richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                                richiesteListItemElementContainer.setAttribute("style","width:auto;margin:10px;float:right");

                                var buttonRispondiRichiesta=document.createElement("button");
                                buttonRispondiRichiesta.setAttribute("class","buttonGestioneRichiesta");
                                buttonRispondiRichiesta.setAttribute("style","float:right");
                                buttonRispondiRichiesta.setAttribute("onclick","apriPopupNuovaReplica("+id_richiesta+")");
                                buttonRispondiRichiesta.innerHTML='Replica<i class="fad fa-reply-all" style="margin-left:10px"></i>';
                                richiesteListItemElementContainer.appendChild(buttonRispondiRichiesta);

                                richiesteListItemRow.appendChild(richiesteListItemElementContainer);
                            }*/
                            
                            richiesteListItem.appendChild(richiesteListItemRow);

                            /*INIZIO RICHIESTE----------------------------------------------------------------------------------------------------------------------------------*/

                            var richiesteListItemBox=document.createElement("div");
                            richiesteListItemBox.setAttribute("class","richiesteListItemBox");
                            richiesteListItemBox.setAttribute("id","richiesteListItemBoxRichiestaContainer"+id_richiesta);
                            richiesteListItemBox.setAttribute("style","margin-bottom:10px;");

                            /*INIZIO COLONNE-------------------------------------------------------------------------------------------------------------------------------------------*/

                            var richiesteListItemInnerBox=document.createElement("div");
                            richiesteListItemInnerBox.setAttribute("class","richiesteListItemInnerBox");
                            /*DESCRIZIONE-----------------------------------------------------------------*/
                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
                            richiesteListItemElementLabel.innerHTML="Descrizione";

                            var richiesteListItemElementInput=document.createElement("textarea");
                            richiesteListItemElementInput.setAttribute("class","richiesteListItemElementInput richiesteListItemElementInputEditable"+id_richiesta);
                            richiesteListItemElementInput.setAttribute("style","line-height:25px;height:30px;resize:vertical");
                            richiesteListItemElementInput.setAttribute("disabled","disabled");
                            richiesteListItemElementInput.setAttribute("id","leTueRichiesteInputdescrizione"+id_richiesta);
                            richiesteListItemElementInput.value=descrizione;


                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementInput);

                            richiesteListItemInnerBox.appendChild(richiesteListItemElementContainer);
                            /*----------------------------------------------------------------------------*/
                            /*NOTE-----------------------------------------------------------------*/
                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
                            richiesteListItemElementLabel.innerHTML="Note";

                            var richiesteListItemElementInput=document.createElement("textarea");
                            richiesteListItemElementInput.setAttribute("class","richiesteListItemElementInput richiesteListItemElementInputEditable"+id_richiesta);
                            richiesteListItemElementInput.setAttribute("style","line-height:25px;height:30px;resize:vertical");
                            richiesteListItemElementInput.setAttribute("disabled","disabled");
                            richiesteListItemElementInput.setAttribute("id","leTueRichiesteInputnote"+id_richiesta);
                            richiesteListItemElementInput.value=note;


                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementInput);

                            richiesteListItemInnerBox.appendChild(richiesteListItemElementContainer);
                            /*----------------------------------------------------------------------------*/
                            /*MACROCATEGORIA--------------------------------------------------------------*/
                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
                            richiesteListItemElementLabel.innerHTML="Macrocateogoria";

                            var richiesteListItemElementInput=document.createElement("select");
                            richiesteListItemElementInput.setAttribute("class","richiesteListItemElementInput richiesteListItemElementInputEditable"+id_richiesta);
                            richiesteListItemElementInput.setAttribute("style","line-height:25px;height:30px;");
                            richiesteListItemElementInput.setAttribute("disabled","disabled");
                            richiesteListItemElementInput.setAttribute("onchange","getColonneMacrocategoriaLeTueRichieste(this.value,"+id_richiesta+")");
                            richiesteListItemElementInput.setAttribute("id","leTueRichiesteInputmacrocategoria"+id_richiesta);

                            var richiesteListItemElementInputOption=document.createElement("option");
                            richiesteListItemElementInputOption.setAttribute("value",id_macrocategoria);
                            richiesteListItemElementInputOption.innerHTML=macrocategoria+" ("+descrizione_macrocategoria+")";

                            richiesteListItemElementInput.appendChild(richiesteListItemElementInputOption);

                            macrocategorie.forEach(function(macrocategoria)
                            {
                                if(macrocategoria.id_macrocategoria!=id_macrocategoria)
                                {
                                    var richiesteListItemElementInputOption=document.createElement("option");
                                    richiesteListItemElementInputOption.setAttribute("value",macrocategoria.id_macrocategoria);
                                    richiesteListItemElementInputOption.innerHTML=macrocategoria.nome+" ("+macrocategoria.descrizione+")";

                                    richiesteListItemElementInput.appendChild(richiesteListItemElementInputOption);
                                }
                            });

                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementInput);

                            richiesteListItemInnerBox.appendChild(richiesteListItemElementContainer);
                            /*----------------------------------------------------------------------------*/
                            /*CATEGORIA-------------------------------------------------------------------*/
                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
                            richiesteListItemElementLabel.innerHTML="Cateogoria";

                            var richiesteListItemElementInput=document.createElement("select");
                            richiesteListItemElementInput.setAttribute("class","richiesteListItemElementInput richiesteListItemElementInputEditable"+id_richiesta);
                            richiesteListItemElementInput.setAttribute("style","line-height:25px;height:30px;");
                            richiesteListItemElementInput.setAttribute("disabled","disabled");
                            richiesteListItemElementInput.setAttribute("id","leTueRichiesteInputcategoria"+id_richiesta);

                            var richiesteListItemElementInputOption=document.createElement("option");
                            richiesteListItemElementInputOption.setAttribute("value",id_categoria);
                            richiesteListItemElementInputOption.innerHTML=categoria+" ("+descrizione_categoria+")";

                            richiesteListItemElementInput.appendChild(richiesteListItemElementInputOption);

                            categorie.forEach(function(categoria)
                            {
                                if(categoria.id_categoria!=id_categoria)
                                {
                                    var richiesteListItemElementInputOption=document.createElement("option");
                                    richiesteListItemElementInputOption.setAttribute("value",categoria.id_categoria);
                                    richiesteListItemElementInputOption.innerHTML=categoria.nome+" ("+categoria.descrizione+")";

                                    richiesteListItemElementInput.appendChild(richiesteListItemElementInputOption);
                                }
                            });

                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementInput);

                            richiesteListItemInnerBox.appendChild(richiesteListItemElementContainer);
                            /*----------------------------------------------------------------------------*/
                            /*COLONNE EXTRA---------------------------------------------------------------*/
                            var colonneExtraContainer=document.createElement("div");
                            colonneExtraContainer.setAttribute("id","leTueRichiesteColonneExtraContainer"+id_richiesta);
                            listColonneExtra.forEach(function (colonna)
                            {
                                var richiesteListItemElementContainer=document.createElement("div");
                                richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                                richiesteListItemElementContainer.setAttribute("style","");

                                var richiesteListItemElementLabel=document.createElement("div");
                                richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                                richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
                                richiesteListItemElementLabel.innerHTML=colonna["label"];

                                var richiesteListItemElementInput=document.createElement(colonna["tipo"]);
                                richiesteListItemElementInput.setAttribute("class","richiesteListItemElementInput richiesteListItemElementInputEditable"+id_richiesta);
                                richiesteListItemElementInput.setAttribute("style","line-height:25px;height:30px;");
                                richiesteListItemElementInput.setAttribute("disabled","disabled");
                                richiesteListItemElementInput.setAttribute("required",colonna["required"]);
                                richiesteListItemElementInput.setAttribute("id","leTueRichiesteInput"+colonna["colonna"]+id_richiesta);

                                if(colonna["tipo"]=="select")
                                {
                                    var options=colonna["valori"];
                                    options.forEach(function(option)
                                    {
                                        var richiesteListItemElementInputOption=document.createElement("option");
                                        richiesteListItemElementInputOption.setAttribute("value",option.value);
                                        if(option.value==valoriColonneExtra[colonna["colonna"]])
                                            richiesteListItemElementInputOption.setAttribute("selected","selected");
                                        richiesteListItemElementInputOption.innerHTML=option.label;

                                        richiesteListItemElementInput.appendChild(richiesteListItemElementInputOption);
                                    });
                                    //console.log(options);
                                }
                                else
                                {
                                    richiesteListItemElementInput.value=valoriColonneExtra[colonna["colonna"]];
                                }

                                richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                                richiesteListItemElementContainer.appendChild(richiesteListItemElementInput);

                                colonneExtraContainer.appendChild(richiesteListItemElementContainer);
                            });
                            richiesteListItemInnerBox.appendChild(colonneExtraContainer);
                            /*----------------------------------------------------------------------------*/

                            richiesteListItemBox.appendChild(richiesteListItemInnerBox);

                            /*FINE COLONNE-------------------------------------------------------------------------------------------------------------------------------------------*/
                            
                            /*INIZIO ALLEGATI E UTENTI-------------------------------------------------------------------------------------------------------------------------------*/

                            var richiesteListItemInnerBox=document.createElement("div");
                            richiesteListItemInnerBox.setAttribute("class","richiesteListItemInnerBox");

                            /*UTENTI-----------------------------------------------------------------------*/

                            var utentiMacrocategoriaContainerLeTueRichieste=document.createElement("div");
                            utentiMacrocategoriaContainerLeTueRichieste.setAttribute("id","utentiMacrocategoriaContainerLeTueRichieste"+id_richiesta);

                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
                            richiesteListItemElementLabel.innerHTML="Utenti coinvolti";

                            /*var aggiungiUtenteIcon=document.createElement("i");
                            aggiungiUtenteIcon.setAttribute("class","fad fa-user-plus");

                            var aggiungiUtenteButton=document.createElement("button");
                            aggiungiUtenteButton.setAttribute("class","btnIconRichiesteEfaq richiesteListItemElementInputEditable"+id_richiesta);
                            aggiungiUtenteButton.setAttribute("title","Aggiungi utente");
                            aggiungiUtenteButton.setAttribute("disabled","disabled");
                            aggiungiUtenteButton.setAttribute("style","margin-left:10px");
                            aggiungiUtenteButton.setAttribute("onclick","apriPopupAggiungiUtente('"+utenti_coinvolti.toString()+"',"+id_richiesta+")");
                            aggiungiUtenteButton.appendChild(aggiungiUtenteIcon);
                                                        
                            richiesteListItemElementLabel.appendChild(aggiungiUtenteButton);*/

                            var richiesteListItemElementValue=document.createElement("div");
                            richiesteListItemElementValue.setAttribute("class","richiesteListItemElementValue");
                            richiesteListItemElementValue.setAttribute("style","");

                            var richiesteListItemElementValueTable=document.createElement("table");
                            richiesteListItemElementValueTable.setAttribute("class","richiesteListItemElementValueTable");
                            richiesteListItemElementValueTable.setAttribute("id","richiesteListItemElementValueTable"+id_richiesta);

                            utenti_coinvolti.forEach(function(utente)
                            {
                                var richiesteListItemElementValueTableTr=document.createElement("tr");
                                richiesteListItemElementValueTableTr.setAttribute("style","height:25px");

                                var richiesteListItemElementValueTableTd=document.createElement("td");
                                richiesteListItemElementValueTableTd.innerHTML=utente;

                                richiesteListItemElementValueTableTr.appendChild(richiesteListItemElementValueTableTd);

                                /*if(!checkUtentiMacrocategorie(utente,id_macrocategoria,id_richiesta,richieste))
                                {
                                    var rimuoviUtenteIcon=document.createElement("i");
                                    rimuoviUtenteIcon.setAttribute("class","fad fa-user-minus");

                                    var rimuoviUtenteButton=document.createElement("button");
                                    rimuoviUtenteButton.setAttribute("class","btnIconRichiesteEfaq richiesteListItemElementInputEditable"+id_richiesta);
                                    rimuoviUtenteButton.setAttribute("title","Rimuovi utente");
                                    rimuoviUtenteButton.setAttribute("disabled","disabled");
                                    rimuoviUtenteButton.setAttribute("style","flot:left;display:block;margin-left:10px");
                                    rimuoviUtenteButton.setAttribute("onclick","rimuoviUtente(this.parentElement.parentElement,"+id_richiesta+",'"+utente+"')");
                                    rimuoviUtenteButton.appendChild(rimuoviUtenteIcon);

                                    var richiesteListItemElementValueTableTd=document.createElement("td");
                                    richiesteListItemElementValueTableTd.appendChild(rimuoviUtenteButton);

                                    richiesteListItemElementValueTableTr.appendChild(richiesteListItemElementValueTableTd);
                                }*/

                                richiesteListItemElementValueTable.appendChild(richiesteListItemElementValueTableTr);
                            })

                            richiesteListItemElementValue.appendChild(richiesteListItemElementValueTable);

                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementValue);

                            utentiMacrocategoriaContainerLeTueRichieste.appendChild(richiesteListItemElementContainer);
                            richiesteListItemInnerBox.appendChild(utentiMacrocategoriaContainerLeTueRichieste);

                            /*----------------------------------------------------------------------------*/

                            /*ALLEGATI---------------------------------------------------------------------*/

                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            richiesteListItemElementContainer.setAttribute("style","");

                            var richiesteListItemElementLabel=document.createElement("div");
                            richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                            richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
                            richiesteListItemElementLabel.innerHTML="Allegati";

                            /*var aggiungiAllegatoIcon=document.createElement("i");
                            aggiungiAllegatoIcon.setAttribute("class","fad fa-file-plus");

                            var aggiungiAllegatoButton=document.createElement("button");
                            aggiungiAllegatoButton.setAttribute("class","btnIconRichiesteEfaq richiesteListItemElementInputEditable"+id_richiesta);
                            aggiungiAllegatoButton.setAttribute("title","Aggiungi allegati");
                            aggiungiAllegatoButton.setAttribute("disabled","disabled");
                            aggiungiAllegatoButton.setAttribute("style","margin-left:10px");
                            aggiungiAllegatoButton.setAttribute("onclick","document.getElementById('inputAggiungiAllegatiLeTueRichieste"+id_richiesta+"').click()");
                            aggiungiAllegatoButton.appendChild(aggiungiAllegatoIcon);
                                                        
                            richiesteListItemElementLabel.appendChild(aggiungiAllegatoButton);*/

                            var aggiungiAllegatoInput=document.createElement("input");
                            aggiungiAllegatoInput.setAttribute("type","file");
                            aggiungiAllegatoInput.setAttribute("id","inputAggiungiAllegatiLeTueRichieste"+id_richiesta);
                            aggiungiAllegatoInput.setAttribute("style","display:none");
                            aggiungiAllegatoInput.setAttribute("multiple","multiple");
                            aggiungiAllegatoInput.setAttribute("onchange","aggiungiAllegatiLeTueRichieste(this,"+id_richiesta+")");
                                                        
                            richiesteListItemElementLabel.appendChild(aggiungiAllegatoInput);

                            var richiesteListItemElementValue=document.createElement("div");
                            richiesteListItemElementValue.setAttribute("class","richiesteListItemElementValue");
                            richiesteListItemElementValue.setAttribute("id","richiesteListItemElementValueAllegatiRichiesteContainer"+id_richiesta);
                            richiesteListItemElementValue.setAttribute("style","");

                            allegati.forEach(function(allegato)
                            {
                                var percorso=allegato;
                                var nomeFile= percorso.split("\\");
                                var nomeFile = nomeFile[nomeFile.length - 1];
                                var formato= nomeFile.split(".")[1];
                                var id_allegato=id_allegati[percorso];

                                var richiesteListItemElementValueAllegato=document.createElement("div");
                                richiesteListItemElementValueAllegato.setAttribute("class","richiesteListItemElementValueAllegato");
                                //richiesteListItemElementValueAllegato.setAttribute("data-tooltip",nomeFile);

                                var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                richiesteListItemElementValueAllegatoRow.setAttribute("style","height:20px;background-color:rgba(0,0,0,0.3)");

                                var downloadButtonAllegato=document.createElement("button");
                                downloadButtonAllegato.innerHTML='<i class="fad fa-arrow-alt-to-bottom"></i>';
                                downloadButtonAllegato.setAttribute("class","richiesteListItemElementValueAllegatoButton");
                                downloadButtonAllegato.setAttribute("style","float:left");
                                downloadButtonAllegato.setAttribute('onclick',"downloadAllegato('"+nomeFile+"')");
                                downloadButtonAllegato.setAttribute("title",'Scarica allegato "'+nomeFile+'"');
                                richiesteListItemElementValueAllegatoRow.appendChild(downloadButtonAllegato);

                                /*var deleteButtonAllegato=document.createElement("button");
                                deleteButtonAllegato.innerHTML='<i class="far fa-times"></i>';
                                deleteButtonAllegato.setAttribute("class","richiesteListItemElementValueAllegatoButton richiesteListItemElementInputEditable"+id_richiesta);
                                deleteButtonAllegato.setAttribute("style","float:right;color:red");
                                deleteButtonAllegato.setAttribute("disabled","disabled");
                                deleteButtonAllegato.setAttribute("onclick","eliminaAllegato(this.parentElement.parentElement,"+id_allegato+")");
                                deleteButtonAllegato.setAttribute("title",'Elimina allegato "'+nomeFile+'"');
                                richiesteListItemElementValueAllegatoRow.appendChild(deleteButtonAllegato); */

                                richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);

                                var altroFormato=true;
                                if(formato=="png" || formato=="jpg" || formato=="tif")
                                {
                                    altroFormato=false;
                                    richiesteListItemElementValueAllegato.style.backgroundImage='url("http://remote.oasisgroup.it/OasisAllegatiRichieste/'+nomeFile+'")';
                                    richiesteListItemElementValueAllegato.style.backgroundSize='cover';
                                    richiesteListItemElementValueAllegato.style.backgroundPosition='center center';
                                    richiesteListItemElementValueAllegato.style.backgroundRepeat='no-repeat';
                                }
                                if(formato=="pdf")
                                {
                                    altroFormato=false;
                                    var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                    richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                    richiesteListItemElementValueAllegatoRow.setAttribute("style","text-align:center;height:25px;margin-top:12.5px;");

                                    var richiesteListItemElementValueAllegatoPdf=document.createElement("a");
                                    richiesteListItemElementValueAllegatoPdf.setAttribute("href","http://remote.oasisgroup.it/OasisAllegatiRichieste/"+nomeFile);
                                    richiesteListItemElementValueAllegatoPdf.setAttribute("target","blank");
                                    richiesteListItemElementValueAllegatoPdf.setAttribute("style","color:gray");
                                    richiesteListItemElementValueAllegatoPdf.setAttribute("title","Visualizza PDF");
                                    richiesteListItemElementValueAllegatoPdf.innerHTML='<i class="fal fa-file-pdf fa-2x"></i>';

                                    richiesteListItemElementValueAllegatoRow.appendChild(richiesteListItemElementValueAllegatoPdf);
                                    richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);
                                }
                                if(formato=="xls" || formato=="xlsx" || formato=="xlsm")
                                {
                                    altroFormato=false;
                                    var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                    richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                    richiesteListItemElementValueAllegatoRow.setAttribute("style","text-align:center;height:25px;margin-top:12.5px;color:gray");
                                    richiesteListItemElementValueAllegatoRow.innerHTML='<i class="fal fa-file-excel fa-2x"></i>';
                                    richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);
                                }
                                if(altroFormato)
                                {
                                    var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                    richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                    richiesteListItemElementValueAllegatoRow.setAttribute("style","text-align:center;height:25px;margin-top:12.5px;color:gray");
                                    richiesteListItemElementValueAllegatoRow.innerHTML='<i class="fal fa-file fa-2x"></i>';
                                    richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);
                                }

                                //richiesteListItemElementValueAllegato.innerHTML=allegato;
                                richiesteListItemElementValue.appendChild(richiesteListItemElementValueAllegato);
                            })

                            richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                            richiesteListItemElementContainer.appendChild(richiesteListItemElementValue);

                            richiesteListItemInnerBox.appendChild(richiesteListItemElementContainer);

                            /*----------------------------------------------------------------------------*/

                            richiesteListItemBox.appendChild(richiesteListItemInnerBox);

                            /*FINE ALLEGATI E UTENTI----------------------------------------------------------------------------------------------------------------------------------*/

                            richiesteListItem.appendChild(richiesteListItemBox);

                            /*FINE RICHIESTE----------------------------------------------------------------------------------------------------------------------------------*/

/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/
/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

                            /*INIZIO RISPOSTE---------------------------------------------------------------------------------------------------------------------------------*/

                            var richiesteListItemBox=document.createElement("div");
                            richiesteListItemBox.setAttribute("class","richiesteListItemBox");
                            richiesteListItemBox.setAttribute("id","richiesteListItemBoxRisposteContainer"+id_richiesta);
                            //richiesteListItemBox.setAttribute("style","overflow-y:auto;");

                            var richiesteListItemElementContainer=document.createElement("div");
                            richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                            
                            //var id_risposte=getValoriColonnaRisposteById(risposte,id_richiesta,"*","id_risposta");
                            if(id_risposte.length==0)
                            {
                                richiesteListItemElementContainer.setAttribute("style","font-family:'Montserrat',sans-serif;color:red;font-size:12px;font-weight:bold;text-decoration:underline");
                                richiesteListItemElementContainer.innerHTML="Ancora nessuna risposta";
                                richiesteListItemBox.appendChild(richiesteListItemElementContainer);
                            }
                            var risposte_count=0;
                            id_risposte.forEach(function(id_risposta)
                            {
                                var richiesteListItemBoxRow=document.createElement("div");
                                richiesteListItemBoxRow.setAttribute("class","richiesteListItemBoxRow");
                                var richiesteListItemBoxRowBackgroundColor
                                if(isOdd(risposte_count))
                                    richiesteListItemBoxRowBackgroundColor="#DBDBDB";
                                else
                                    richiesteListItemBoxRowBackgroundColor="#D5D5D5";
                                richiesteListItemBoxRow.setAttribute("style","background-color:"+richiesteListItemBoxRowBackgroundColor);

                                var descrizione=getValoreColonnaRisposteById(risposte,id_richiesta,id_risposta,"descrizione");
                                var username_risposta=getValoreColonnaRisposteById(risposte,id_richiesta,id_risposta,"username_risposta");
                                var data_risposta=getValoreColonnaRisposteById(risposte,id_richiesta,id_risposta,"data_risposta");

                                var allegati_risposte=getValoriColonnaRisposteById(risposte,id_richiesta,id_risposta,"percorso_allegato");

                                var richiesteListItemBoxRowTitle=document.createElement("div");
                                richiesteListItemBoxRowTitle.setAttribute("class","richiesteListItemBoxRowTitle");
                                var data_risposta_eng=data_risposta.date.split(" ")[0];
                                var data_risposta_anno=data_risposta_eng.split("-")[0];
                                var data_risposta_mese=data_risposta_eng.split("-")[1];
                                var data_risposta_giorno=data_risposta_eng.split("-")[2];
                                var data_risposta_ita=data_risposta_giorno+"/"+data_risposta_mese+"/"+data_risposta_anno;
                                richiesteListItemBoxRowTitle.innerHTML="Risposta di "+username_risposta+" del "+data_risposta_ita+" "+data_risposta.date.split(" ")[1].split(".")[0];
                                richiesteListItemBoxRow.appendChild(richiesteListItemBoxRowTitle);

                                /*INIZIO COLONNE----------------------------------------------------------------------------------------------------------------------------------*/
                                /*DESCRIZIONE--------------------------------------------------------------*/
                                var richiesteListItemElementContainer=document.createElement("div");
                                richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                                richiesteListItemElementContainer.setAttribute("style","");

                                var richiesteListItemElementLabel=document.createElement("div");
                                richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                                richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
                                richiesteListItemElementLabel.innerHTML="Testo";

                                var richiesteListItemElementvalue=document.createElement("div");
                                richiesteListItemElementvalue.setAttribute("class","richiesteListItemElementvalue");
                                richiesteListItemElementvalue.setAttribute("style","");
                                richiesteListItemElementvalue.innerHTML=descrizione;

                                richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                                richiesteListItemElementContainer.appendChild(richiesteListItemElementvalue);

                                richiesteListItemBoxRow.appendChild(richiesteListItemElementContainer);
                                /*----------------------------------------------------------------------------*/
                                /*FINE COLONNE------------------------------------------------------------------------------------------------------------------------------------*/
                                /*INIZIO ALLEGATI---------------------------------------------------------------------------------------------------------------------------------*/

                                var richiesteListItemElementContainer=document.createElement("div");
                                richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
                                richiesteListItemElementContainer.setAttribute("style","");

                                var richiesteListItemElementLabel=document.createElement("div");
                                richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
                                richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
                                richiesteListItemElementLabel.innerHTML="Allegati";

                                var richiesteListItemElementValue=document.createElement("div");
                                richiesteListItemElementValue.setAttribute("class","richiesteListItemElementValue");
                                richiesteListItemElementValue.setAttribute("style","");

                                allegati_risposte.forEach(function(allegato)
                                {
                                    //console.log(allegato);
                                    var percorso=allegato;
                                    var nomeFile= percorso.split("\\");
                                    var nomeFile = nomeFile[nomeFile.length - 1];
                                    var formato= nomeFile.split(".")[1];

                                    var richiesteListItemElementValueAllegato=document.createElement("div");
                                    richiesteListItemElementValueAllegato.setAttribute("class","richiesteListItemElementValueAllegato");

                                    var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                    richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                    richiesteListItemElementValueAllegatoRow.setAttribute("style","height:20px;background-color:rgba(0,0,0,0.3)");

                                    var downloadButtonAllegato=document.createElement("button");
                                    downloadButtonAllegato.innerHTML='<i class="fad fa-arrow-alt-to-bottom"></i>';
                                    downloadButtonAllegato.setAttribute("class","richiesteListItemElementValueAllegatoButton");
                                    downloadButtonAllegato.setAttribute("style","float:left");
                                    downloadButtonAllegato.setAttribute('onclick',"downloadAllegato('"+nomeFile+"')");
                                    downloadButtonAllegato.setAttribute("title",'Scarica allegato "'+nomeFile+'"');
                                    richiesteListItemElementValueAllegatoRow.appendChild(downloadButtonAllegato);

                                    richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);

                                    var altroFormato=true;
                                    if(formato=="png" || formato=="jpg" || formato=="tif")
                                    {
                                        altroFormato=false;
                                        richiesteListItemElementValueAllegato.style.backgroundImage='url("http://remote.oasisgroup.it/OasisAllegatiRichieste/'+nomeFile+'")';
                                        richiesteListItemElementValueAllegato.style.backgroundSize='cover';
                                        richiesteListItemElementValueAllegato.style.backgroundPosition='center center';
                                        richiesteListItemElementValueAllegato.style.backgroundRepeat='no-repeat';
                                    }
                                    if(formato=="pdf")
                                    {
                                        altroFormato=false;
                                        var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                        richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                        richiesteListItemElementValueAllegatoRow.setAttribute("style","text-align:center;height:25px;margin-top:12.5px;");

                                        var richiesteListItemElementValueAllegatoPdf=document.createElement("a");
                                        richiesteListItemElementValueAllegatoPdf.setAttribute("href","http://remote.oasisgroup.it/OasisAllegatiRichieste/"+nomeFile);
                                        richiesteListItemElementValueAllegatoPdf.setAttribute("target","blank");
                                        richiesteListItemElementValueAllegatoPdf.setAttribute("style","color:gray");
                                        richiesteListItemElementValueAllegatoPdf.setAttribute("title","Visualizza PDF");
                                        richiesteListItemElementValueAllegatoPdf.innerHTML='<i class="fal fa-file-pdf fa-2x"></i>';

                                        richiesteListItemElementValueAllegatoRow.appendChild(richiesteListItemElementValueAllegatoPdf);
                                        richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);
                                    }
                                    if(formato=="xls" || formato=="xlsx" || formato=="xlsm")
                                    {
                                        altroFormato=false;
                                        var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                        richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                        richiesteListItemElementValueAllegatoRow.setAttribute("style","text-align:center;height:25px;margin-top:12.5px;color:gray");
                                        richiesteListItemElementValueAllegatoRow.innerHTML='<i class="fal fa-file-excel fa-2x"></i>';
                                        richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);
                                    }
                                    if(altroFormato)
                                    {
                                        var richiesteListItemElementValueAllegatoRow=document.createElement("div");
                                        richiesteListItemElementValueAllegatoRow.setAttribute("class","richiesteListItemElementValueAllegatoRow");
                                        richiesteListItemElementValueAllegatoRow.setAttribute("style","text-align:center;height:25px;margin-top:12.5px;color:gray");
                                        richiesteListItemElementValueAllegatoRow.innerHTML='<i class="fal fa-file fa-2x"></i>';
                                        richiesteListItemElementValueAllegato.appendChild(richiesteListItemElementValueAllegatoRow);
                                    }

                                    richiesteListItemElementValue.appendChild(richiesteListItemElementValueAllegato);
                                })

                                richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
                                richiesteListItemElementContainer.appendChild(richiesteListItemElementValue);

                                richiesteListItemBoxRow.appendChild(richiesteListItemElementContainer);

                                /*FINE ALLEGATI-----------------------------------------------------------------------------------------------------------------------------------*/

                                richiesteListItemBox.appendChild(richiesteListItemBoxRow);
                                risposte_count++;
                            });

                            //var id_risposta=getValoreColonnaRisposteById(risposte,id_richiesta,"id_risposta");
                            
                            richiesteListItem.appendChild(richiesteListItemBox);

                            /*FINE RISPOSTE-----------------------------------------------------------------------------------------------------------------------------------*/

                            richiesteListContainer.appendChild(richiesteListItem);
                            
                            i++;
                        });
                        document.getElementById("richiesteContainer").appendChild(richiesteListContainer);

                        id_richieste.forEach(function(id_richiesta)
                        {
                            var height=document.getElementById("richiesteListItemBoxRichiestaContainer"+id_richiesta).offsetHeight+10;
                            document.getElementById("richiesteListItemBoxRisposteContainer"+id_richiesta).style.maxHeight=height+"px";
                            document.getElementById("richiesteListItemBoxRisposteContainer"+id_richiesta).style.overflowY="auto";
                        });

                        removeCircleSpinner();
                    }
                }
                else
                    console.log(status);
            });
        }
    }
}
async function getColonneMacrocategoriaLeTueRichieste(id_macrocategoria,id_richiesta)
{
    var colonneMacrocategoria=await getArrayColonneMacrocategoria(id_macrocategoria);
    document.getElementById("leTueRichiesteColonneExtraContainer"+id_richiesta).innerHTML="";

    colonneMacrocategoria.forEach(function (colonna)
    {
        var richiesteListItemElementContainer=document.createElement("div");
        richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
        richiesteListItemElementContainer.setAttribute("style","");

        var richiesteListItemElementLabel=document.createElement("div");
        richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
        richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
        richiesteListItemElementLabel.innerHTML=colonna["label"];

        var richiesteListItemElementInput=document.createElement(colonna["tipo"]);
        richiesteListItemElementInput.setAttribute("class","richiesteListItemElementInput richiesteListItemElementInputEditable"+id_richiesta);
        richiesteListItemElementInput.setAttribute("style","line-height:25px;height:30px;");
        richiesteListItemElementInput.setAttribute("required",colonna["required"]);
        richiesteListItemElementInput.setAttribute("id","leTueRichiesteInput"+colonna["colonna"]+id_richiesta);

        if(colonna["tipo"]=="select")
        {
            var options=colonna["valori"];
            options.forEach(function(option)
            {
                var richiesteListItemElementInputOption=document.createElement("option");
                richiesteListItemElementInputOption.setAttribute("value",option.value);
                richiesteListItemElementInputOption.innerHTML=option.label;

                richiesteListItemElementInput.appendChild(richiesteListItemElementInputOption);
            });
        }

        richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
        richiesteListItemElementContainer.appendChild(richiesteListItemElementInput);

        document.getElementById("leTueRichiesteColonneExtraContainer"+id_richiesta).appendChild(richiesteListItemElementContainer);
    });

    var utenti_coinvolti=await getUtentiCoinvoltiEUtentiMacrocategoria(id_richiesta,id_macrocategoria);

    //console.log(utenti_coinvolti);

    document.getElementById("utentiMacrocategoriaContainerLeTueRichieste"+id_richiesta).innerHTML="";

    var richiesteListItemElementContainer=document.createElement("div");
    richiesteListItemElementContainer.setAttribute("class","richiesteListItemElementContainer");
    richiesteListItemElementContainer.setAttribute("style","");

    var richiesteListItemElementLabel=document.createElement("div");
    richiesteListItemElementLabel.setAttribute("class","richiesteListItemElementLabel");
    richiesteListItemElementLabel.setAttribute("style","height:20px;line-height:20px;margin-bottom:5px");
    richiesteListItemElementLabel.innerHTML="Utenti coinvolti";

    var aggiungiUtenteIcon=document.createElement("i");
    aggiungiUtenteIcon.setAttribute("class","fad fa-user-plus");

    var aggiungiUtenteButton=document.createElement("button");
    aggiungiUtenteButton.setAttribute("class","btnIconRichiesteEfaq richiesteListItemElementInputEditable"+id_richiesta);
    aggiungiUtenteButton.setAttribute("title","Aggiungi utente");
    aggiungiUtenteButton.setAttribute("style","margin-left:10px");
    aggiungiUtenteButton.setAttribute("onclick","apriPopupAggiungiUtente('"+utenti_coinvolti.toString()+"',"+id_richiesta+")");
    aggiungiUtenteButton.appendChild(aggiungiUtenteIcon);
                                
    richiesteListItemElementLabel.appendChild(aggiungiUtenteButton);

    var richiesteListItemElementValue=document.createElement("div");
    richiesteListItemElementValue.setAttribute("class","richiesteListItemElementValue");
    richiesteListItemElementValue.setAttribute("style","");

    var richiesteListItemElementValueTable=document.createElement("table");
    richiesteListItemElementValueTable.setAttribute("class","richiesteListItemElementValueTable");
    richiesteListItemElementValueTable.setAttribute("id","richiesteListItemElementValueTable"+id_richiesta);

    utenti_coinvolti.forEach(function(utente)
    {
        var richiesteListItemElementValueTableTr=document.createElement("tr");
        richiesteListItemElementValueTableTr.setAttribute("style","height:25px");

        var richiesteListItemElementValueTableTd=document.createElement("td");
        richiesteListItemElementValueTableTd.innerHTML=utente.username;

        richiesteListItemElementValueTableTr.appendChild(richiesteListItemElementValueTableTd);

        if(utente.utente_macrocategoria=="false")
        {
            var rimuoviUtenteIcon=document.createElement("i");
            rimuoviUtenteIcon.setAttribute("class","fad fa-user-minus");

            var rimuoviUtenteButton=document.createElement("button");
            rimuoviUtenteButton.setAttribute("class","btnIconRichiesteEfaq richiesteListItemElementInputEditable"+id_richiesta);
            rimuoviUtenteButton.setAttribute("title","Rimuovi utente");
            rimuoviUtenteButton.setAttribute("style","flot:left;display:block;margin-left:10px");
            rimuoviUtenteButton.setAttribute("onclick","rimuoviUtente(this.parentElement.parentElement,"+id_richiesta+",'"+utente.username+"')");
            rimuoviUtenteButton.appendChild(rimuoviUtenteIcon);

            var richiesteListItemElementValueTableTd=document.createElement("td");
            richiesteListItemElementValueTableTd.appendChild(rimuoviUtenteButton);

            richiesteListItemElementValueTableTr.appendChild(richiesteListItemElementValueTableTd);
        }

        richiesteListItemElementValueTable.appendChild(richiesteListItemElementValueTableTr);
    })

    richiesteListItemElementValue.appendChild(richiesteListItemElementValueTable);

    richiesteListItemElementContainer.appendChild(richiesteListItemElementLabel);
    richiesteListItemElementContainer.appendChild(richiesteListItemElementValue);

    document.getElementById("utentiMacrocategoriaContainerLeTueRichieste"+id_richiesta).appendChild(richiesteListItemElementContainer);
}
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
async function startTutorial()
{
    await setCookie('into1RichiesteEfaq','false');getIntro();
    getIntro();
}
async function getIntro()
{
    /*if(await getCookie("into1RichiesteEfaq")!="true")
    {
        getActionBarTutorial();
        
        
        
        //$("[data-step=1]").click();

        //introJs().setOption('showProgress', true).oncomplete(function() {setCookie("into1RichiesteEfaq","true")}).onexit(function() {setCookie("into1RichiesteEfaq","true")}).start();
    }*/
}
function getActionBarTutorial()
{
    introJs().setOption({'showBullets': false}).goToStepNumber(1).oncomplete(function() {$("[data-step=2]").click();}).start();
}
function getLeTueRichiesteTutorial()
{
    introJs().setOption({'showBullets': false}).goToStepNumber(4).start();
}
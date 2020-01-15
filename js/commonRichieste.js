function printRichiesta(id_richiesta,button)
{
    clearInterval(searchAnswerInterval);
    clearInterval(checkStatoInterval);

    var oldButtonContent=button.innerHTML;
    var oldBodyContent=document.body.innerHTML;

    button.innerHTML='<i class="fad fa-spinner-third fa-spin"></i>';
    button.disabled=true;

    var all=document.getElementsByClassName("richiesteListItem");
    for (let index = 0; index < all.length; index++)
    {
        const element = all[index];
        if(element.getAttribute("id_richiesta")==id_richiesta)
        {
            var clnElement = element.cloneNode(true);

            document.body.innerHTML="";

            document.body.appendChild(clnElement);
            clnElement.style.animation="none";
            clnElement.style.border="none";
            

            showRichiesta(id_richiesta);

            clnElement.style.margin="20px";
            clnElement.style.width="calc(100% - 40px)";
            clnElement.style.width="calc(100% - 40px)";

            $(".buttonGestioneRichiesta").hide();

            var inputOggetto=document.getElementById("leTueRichiesteInputoggetto"+id_richiesta);
            var inputDescrizione=document.getElementById("leTueRichiesteInputdescrizione"+id_richiesta);
            var inputNote=document.getElementById("leTueRichiesteInputnote"+id_richiesta);

            var inputTextContainer=document.createElement("div");
            inputTextContainer.setAttribute("class","richiesteListItemElementValue");
            inputTextContainer.setAttribute("style","color:white");
            inputTextContainer.innerHTML=inputOggetto.value;
            var parent=inputOggetto.parentElement;
            inputOggetto.remove();
            parent.appendChild(inputTextContainer);
            parent.style.width="auto";
            parent.style.display="flex";
            parent.style.alignItems="center";

            var inputTextContainer=document.createElement("div");
            inputTextContainer.setAttribute("class","richiesteListItemElementValue");
            inputTextContainer.setAttribute("style","width:calc(100% - 20px)");
            inputTextContainer.innerHTML=inputDescrizione.value;
            var parent=inputDescrizione.parentElement;
            inputDescrizione.remove();
            parent.appendChild(inputTextContainer);
            parent.style.width="100%";
            parent.style.display="flex";
            parent.style.flexDirection="column";

            var inputTextContainer=document.createElement("div");
            inputTextContainer.setAttribute("class","richiesteListItemElementValue");
            inputTextContainer.setAttribute("style","width:calc(100% - 20px)");
            inputTextContainer.innerHTML=inputNote.value;
            var parent=inputNote.parentElement;
            inputNote.remove();
            parent.appendChild(inputTextContainer);
            parent.style.display="flex";
            parent.style.flexDirection="column";
            
            setTimeout(function(){
                try {
                    document.getElementsByClassName("alertUrgenteRow")[0].style.textAlign="left";
                } catch (error) {}
                
                clnElement.style.height="auto";
                document.getElementById("richiesteListItemBoxRisposteContainer"+id_richiesta).style.maxHeight="100%";
                var all2=document.getElementsByClassName("richiesteListItemElementvalue");
                for (let index2 = 0; index2 < all2.length; index2++)
                {
                    all2[index2].style.textAlign="left";
                }
            }, 700);
            
            setTimeout(function()
            {
                var mediaQueryList=window.matchMedia('print');
                mediaQueryList.addListener(function (mql) 
                {
                    if (mql.matches) 
                    {
                        beforePrint();
                    } 
                    else 
                    {
                        afterPrint();
                    }
                    //console.log('print event', mql);
                    //alert('print event');
                });
                
                
                var beforePrint = function() 
                {
                    //console.log("printing...");
                };
                var afterPrint = function() 
                {
                    location.reload();
                    //console.log("printed");
                };

                

                window.onbeforeprint = beforePrint;
                window.onafterprint = afterPrint;

                window.print();
            }, 800);
        }
    }
}
var checkboxRiceviMailPerOgniNuovaRichiesta;
var checkboxRiceviMailPerOgniRispostaRichiestaIncaricato;
var checkboxRiceviMailPerOgniRispostaTuaRichiesta;

async function setServerSideSetting(name,value,id_utente)
{
    if(id_utente==undefined)
        var id_utente=await getSessionValue("id_utente");
    $.post("setServerSideSetting.php",{name,value,id_utente},
    function(response, status)
    {
        if(status!="success")
            console.log(status);
    });
}
async function getServerSideSetting(name,id_utente)
{
    if(id_utente==undefined)
        var id_utente=await getSessionValue("id_utente");
    return new Promise(function (resolve, reject) 
    {
        $.get("getServerSideSetting.php",{name,id_utente},
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
async function checkServerSideSettings()
{
    return new Promise(async function (resolve) 
    {
        var serverSideSettingCheckboxRiceviMailPerOgniNuovaRichiesta=await getServerSideSetting("checkboxRiceviMailPerOgniNuovaRichiesta");
        if(serverSideSettingCheckboxRiceviMailPerOgniNuovaRichiesta=="")
        {
            var defaultServerSideSetting=await getDefaultServerSideSetting('checkboxRiceviMailPerOgniNuovaRichiesta');
            if(defaultServerSideSetting.indexOf("true")>-1)
                checkboxRiceviMailPerOgniNuovaRichiesta=true;
            if(defaultServerSideSetting.indexOf("false")>-1)
                checkboxRiceviMailPerOgniNuovaRichiesta=false;
        }
        if(serverSideSettingCheckboxRiceviMailPerOgniNuovaRichiesta.indexOf("true")>-1)
            checkboxRiceviMailPerOgniNuovaRichiesta=true;
        if(serverSideSettingCheckboxRiceviMailPerOgniNuovaRichiesta.indexOf("false")>-1)
            checkboxRiceviMailPerOgniNuovaRichiesta=false;

        var serverSideSettingCheckboxRiceviMailPerOgniRispostaRichiestaIncaricato=await getServerSideSetting("checkboxRiceviMailPerOgniRispostaRichiestaIncaricato");
        if(serverSideSettingCheckboxRiceviMailPerOgniRispostaRichiestaIncaricato=="")
        {
            var defaultServerSideSetting=await getDefaultServerSideSetting('checkboxRiceviMailPerOgniRispostaRichiestaIncaricato');
            if(defaultServerSideSetting.indexOf("true")>-1)
                checkboxRiceviMailPerOgniRispostaRichiestaIncaricato=true;
            if(defaultServerSideSetting.indexOf("false")>-1)
                checkboxRiceviMailPerOgniRispostaRichiestaIncaricato=false;
        }
        if(serverSideSettingCheckboxRiceviMailPerOgniRispostaRichiestaIncaricato.indexOf("true")>-1)
            checkboxRiceviMailPerOgniRispostaRichiestaIncaricato=true;
        if(serverSideSettingCheckboxRiceviMailPerOgniRispostaRichiestaIncaricato.indexOf("false")>-1)
            checkboxRiceviMailPerOgniRispostaRichiestaIncaricato=false;

        var serverSideSettingCheckboxRiceviMailPerOgniRispostaTuaRichiesta=await getServerSideSetting("checkboxRiceviMailPerOgniRispostaTuaRichiesta");
        if(serverSideSettingCheckboxRiceviMailPerOgniRispostaTuaRichiesta=="")
        {
            var defaultServerSideSetting=await getDefaultServerSideSetting('checkboxRiceviMailPerOgniRispostaTuaRichiesta');
            if(defaultServerSideSetting.indexOf("true")>-1)
                checkboxRiceviMailPerOgniRispostaTuaRichiesta=true;
            if(defaultServerSideSetting.indexOf("false")>-1)
                checkboxRiceviMailPerOgniRispostaTuaRichiesta=false;
        }
        if(serverSideSettingCheckboxRiceviMailPerOgniRispostaTuaRichiesta.indexOf("true")>-1)
            checkboxRiceviMailPerOgniRispostaTuaRichiesta=true;
        if(serverSideSettingCheckboxRiceviMailPerOgniRispostaTuaRichiesta.indexOf("false")>-1)
            checkboxRiceviMailPerOgniRispostaTuaRichiesta=false;

        resolve(true);
    });
}
function getPopupImpostazioni()
{
    var table=document.createElement("table");
    table.setAttribute("class","material-design-table-dark");

    //tbody
    var tbody = table.createTBody();

    //Ricevi una mail di notifica per ogni richiesta in cui sei coinvolto
    var row = tbody.insertRow(-1);

    var cell1 = row.insertCell(0);

    var labelRiceviMailPerOgniNuovaRichiesta=document.createElement("label");
    labelRiceviMailPerOgniNuovaRichiesta.setAttribute("class","pure-material-checkbox");

    var inputRiceviMailPerOgniNuovaRichiesta=document.createElement("input");
    inputRiceviMailPerOgniNuovaRichiesta.setAttribute("type","checkbox");
    if(checkboxRiceviMailPerOgniNuovaRichiesta)
        inputRiceviMailPerOgniNuovaRichiesta.setAttribute("checked","checked");
    inputRiceviMailPerOgniNuovaRichiesta.setAttribute("id","checkboxRiceviMailPerOgniNuovaRichiesta");
    inputRiceviMailPerOgniNuovaRichiesta.setAttribute("onchange","checkboxRiceviMailPerOgniNuovaRichiesta=this.checked;setServerSideSetting('checkboxRiceviMailPerOgniNuovaRichiesta',this.checked);");
    labelRiceviMailPerOgniNuovaRichiesta.appendChild(inputRiceviMailPerOgniNuovaRichiesta);

    var spanRiceviMailPerOgniNuovaRichiesta=document.createElement("span");
    spanRiceviMailPerOgniNuovaRichiesta.setAttribute("style","color:white");
    spanRiceviMailPerOgniNuovaRichiesta.innerHTML="Ricevi una mail di notifica per ogni richiesta in cui sei coinvolto";
    labelRiceviMailPerOgniNuovaRichiesta.appendChild(spanRiceviMailPerOgniNuovaRichiesta);

    cell1.appendChild(labelRiceviMailPerOgniNuovaRichiesta);

    //Ricevi una mail di notifica per ogni risposta data ad una richiesta in cui sei coinvolto
    var row = tbody.insertRow(-1);

    var cell1 = row.insertCell(0);

    var labelRiceviMailPerOgniRispostaRichiestaIncaricato=document.createElement("label");
    labelRiceviMailPerOgniRispostaRichiestaIncaricato.setAttribute("class","pure-material-checkbox");

    var inputRiceviMailPerOgniRispostaRichiestaIncaricato=document.createElement("input");
    inputRiceviMailPerOgniRispostaRichiestaIncaricato.setAttribute("type","checkbox");
    if(checkboxRiceviMailPerOgniRispostaRichiestaIncaricato)
        inputRiceviMailPerOgniRispostaRichiestaIncaricato.setAttribute("checked","checked");
    inputRiceviMailPerOgniRispostaRichiestaIncaricato.setAttribute("id","checkboxRiceviMailPerOgniRispostaRichiestaIncaricato");
    inputRiceviMailPerOgniRispostaRichiestaIncaricato.setAttribute("onchange","checkboxRiceviMailPerOgniRispostaRichiestaIncaricato=this.checked;setServerSideSetting('checkboxRiceviMailPerOgniRispostaRichiestaIncaricato',this.checked);");
    labelRiceviMailPerOgniRispostaRichiestaIncaricato.appendChild(inputRiceviMailPerOgniRispostaRichiestaIncaricato);

    var spanRiceviMailPerOgniRispostaRichiestaIncaricato=document.createElement("span");
    spanRiceviMailPerOgniRispostaRichiestaIncaricato.setAttribute("style","color:white");
    spanRiceviMailPerOgniRispostaRichiestaIncaricato.innerHTML="Ricevi una mail di notifica per ogni risposta data ad una richiesta in cui sei coinvolto";
    labelRiceviMailPerOgniRispostaRichiestaIncaricato.appendChild(spanRiceviMailPerOgniRispostaRichiestaIncaricato);

    cell1.appendChild(labelRiceviMailPerOgniRispostaRichiestaIncaricato);

    //Ricevi una mail di notifica per ogni risposta data ad una tua richiesta
    var row = tbody.insertRow(-1);

    var cell1 = row.insertCell(0);

    var labelRiceviMailPerOgniRispostaTuaRichiesta=document.createElement("label");
    labelRiceviMailPerOgniRispostaTuaRichiesta.setAttribute("class","pure-material-checkbox");

    var inputRiceviMailPerOgniRispostaTuaRichiesta=document.createElement("input");
    inputRiceviMailPerOgniRispostaTuaRichiesta.setAttribute("type","checkbox");
    if(checkboxRiceviMailPerOgniRispostaTuaRichiesta)
        inputRiceviMailPerOgniRispostaTuaRichiesta.setAttribute("checked","checked");
    inputRiceviMailPerOgniRispostaTuaRichiesta.setAttribute("id","checkboxRiceviMailPerOgniRispostaTuaRichiesta");
    inputRiceviMailPerOgniRispostaTuaRichiesta.setAttribute("onchange","checkboxRiceviMailPerOgniRispostaTuaRichiesta=this.checked;setServerSideSetting('checkboxRiceviMailPerOgniRispostaTuaRichiesta',this.checked);");
    labelRiceviMailPerOgniRispostaTuaRichiesta.appendChild(inputRiceviMailPerOgniRispostaTuaRichiesta);

    var spanRiceviMailPerOgniRispostaTuaRichiesta=document.createElement("span");
    spanRiceviMailPerOgniRispostaTuaRichiesta.setAttribute("style","color:white");
    spanRiceviMailPerOgniRispostaTuaRichiesta.innerHTML="Ricevi una mail di notifica per ogni risposta data ad una tua richiesta";
    labelRiceviMailPerOgniRispostaTuaRichiesta.appendChild(spanRiceviMailPerOgniRispostaTuaRichiesta);

    cell1.appendChild(labelRiceviMailPerOgniRispostaTuaRichiesta);

    //Ripristina impostazioni predefinite
    var row = tbody.insertRow(-1);

    var cell1 = row.insertCell(0);

    var buttonRipristinaImpostazioniPredefinite=document.createElement("button");
    buttonRipristinaImpostazioniPredefinite.setAttribute("class","material-design-table-dark-button-reset-settings");
    buttonRipristinaImpostazioniPredefinite.setAttribute("onclick","ripristinaImpostazioniPredefinite()");
    buttonRipristinaImpostazioniPredefinite.innerHTML="Ripristina impostazioni predefinite";

    cell1.appendChild(buttonRipristinaImpostazioniPredefinite);

    //------------------------------------------------------------------------------------
    Swal.fire
    ({
        title: 'Impostazioni richieste',
        background: '#363640',
        position:"top",
        width:"800px",
        html: table.outerHTML,
        showCloseButton: true,
        showConfirmButton:false,
        onOpen : function()
                {
                    document.getElementsByClassName("swal2-title")[0].style.color="#ddd";
                    document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";
                }
    }).then((result) => 
    {
        if (result.value)
        {
            
        }
    });
}
async function ripristinaImpostazioniPredefinite()
{
    var defaultServerSideSetting=await getDefaultServerSideSetting('checkboxRiceviMailPerOgniNuovaRichiesta');
    setServerSideSetting('checkboxRiceviMailPerOgniNuovaRichiesta',defaultServerSideSetting);
    var defaultServerSideSetting=await getDefaultServerSideSetting('checkboxRiceviMailPerOgniRispostaRichiestaIncaricato');
    setServerSideSetting('checkboxRiceviMailPerOgniRispostaRichiestaIncaricato',defaultServerSideSetting);
    var defaultServerSideSetting=await getDefaultServerSideSetting('checkboxRiceviMailPerOgniRispostaTuaRichiesta');
    setServerSideSetting('checkboxRiceviMailPerOgniRispostaTuaRichiesta',defaultServerSideSetting);

    location.reload();
}
function getDefaultServerSideSetting(name)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getDefaultServerSideSetting.php",{name},
        function(response, status)
        {
            if(status=="success")
            {console.log(response)
                resolve(response);
            }
            else
                reject({status});
        });
    });
}
function getMailsByServerSideSetting(utentiInvioMail,serverSideSetting,subject,body)
{
    var JSONutentiInvioMail=JSON.stringify(utentiInvioMail);
    $.get("getMailsByServerSideSetting.php",
    {
        JSONutentiInvioMail,
        serverSideSetting
    },
    function(response, status)
    {
        if(status=="success")
        {
            var mails=JSON.parse(response);
            sendMail(mails.join(";"),subject,body);
        }
        else
            console.log(status);
    });
}
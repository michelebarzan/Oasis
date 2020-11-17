const today = new Date();

window.addEventListener("load", async function(event)
{
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var month=(firstDay.getMonth()+1).toString();
    if(month.length==1)
        month="0"+month;
    var day=firstDay.getDate().toString();
    if(day.length==1)
        day="0"+day;

    document.getElementById("dataInizio").value=firstDay.getFullYear() + "-" + month +"-" + day;

    var month=(lastDay.getMonth()+1).toString();
    if(month.length==1)
        month="0"+month;
    var day=lastDay.getDate().toString();
    if(day.length==1)
        day="0"+day;

    document.getElementById("dataFine").value=lastDay.getFullYear() + "-" + month +"-" + day;

    getElencoCalendarioRegistrazioni();
    getTabellaRegistrazioni();
});
async function getTabellaRegistrazioni()
{
    var container=document.getElementById("tabellaOuterContainer");
    container.innerHTML="";
    
    var buttons=document.getElementsByClassName("btn-range");
    for (let index = 0; index < buttons.length; index++)
    {
        const button = buttons[index];
        button.style.backgroundColor="";
        button.getElementsByTagName("span")[0].style.color="";
        button.getElementsByTagName("i")[0].style.color="";        
    }
    var buttons=document.getElementsByClassName("presenze-giorno-container");
    for (let index = 0; index < buttons.length; index++)
    {
        const button = buttons[index];
        button.style.backgroundColor="";
        button.getElementsByTagName("span")[0].style.color="";
    }

    var dataInizio=document.getElementById("dataInizio").value;
    var dataFine=document.getElementById("dataFine").value;

    if(dataInizio!="" && dataFine!="")
    {
        var registrazioni=await getRegistrazioni(dataInizio,dataFine);
        //console.log(registrazioni);

        var tabellaRegistrazioni=document.createElement("table");
        tabellaRegistrazioni.setAttribute("id","tabellaRegistrazioni");

        var tr=document.createElement("tr");

        var th=document.createElement("th");th.setAttribute("style","border-top-left-radius:4px");th.innerHTML="#";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Data inizio";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Data fine";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Utente";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Durata";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Descrizione";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Note";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Smart working";tr.appendChild(th);
        var th=document.createElement("th");th.setAttribute("style","border-top-right-radius:4px");th.innerHTML="Chiusa";tr.appendChild(th);

        tabellaRegistrazioni.appendChild(tr);

        registrazioni.forEach(registrazione =>
        {
            var tr=document.createElement("tr");

            var td=document.createElement("td");td.innerHTML=registrazione.id_registrazione;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=registrazione.dataInizioString;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=registrazione.dataFineString;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=registrazione.username;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=registrazione.durata;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=registrazione.descrizione;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=registrazione.note;tr.appendChild(td);
            var td=document.createElement("td");var icon=document.createElement("i");if(registrazione.smartWorking){icon.setAttribute("class","fas fa-check-square");icon.setAttribute("style","color:rgb(48, 133, 214)");}else{icon.setAttribute("class","far fa-square");}td.appendChild(icon);tr.appendChild(td);
            var td=document.createElement("td");var icon=document.createElement("i");if(registrazione.chiusa){icon.setAttribute("class","fas fa-check-square");icon.setAttribute("style","color:rgb(48, 133, 214)");}else{icon.setAttribute("class","far fa-square");}td.appendChild(icon);tr.appendChild(td);

            tabellaRegistrazioni.appendChild(tr);
        });

        container.appendChild(tabellaRegistrazioni);
    }
    else
    {
        Swal.fire({icon:"error",title: "Compila entrambe le date",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
    }
}
function getRegistrazioni(dataInizio,dataFine)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getRegistrazioniRiepilogoPresenze.php",{dataInizio,dataFine},
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve([]);
                }
                else
                {
                    try {
                        resolve(JSON.parse(response));
                    } catch (error) {
                        Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                        console.log(response);
                        resolve([]);
                    }
                }
            }
            else
                resolve([]);
        });
    });
}
async function getElencoCalendarioRegistrazioni()
{
    var container=document.getElementById("calendarioOuterContainer");
    container.innerHTML="";

    var containerWidth=container.offsetWidth;

    Swal.fire
    ({
        width:"100%",
        background:"transparent",
        title:"Caricamento in corso...",
        html:'<i class="fad fa-spinner-third fa-spin fa-3x" style="color:white"></i>',
        allowOutsideClick:false,
        showCloseButton:false,
        showConfirmButton:false,
        showCancelButton:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
    });

    var calendarioRegistrazioni=await getCalendarioRegistrazioni();

    var giornoWidth=containerWidth/8;
    giornoWidth=giornoWidth-12;
    giornoWidth=giornoWidth+"px";
    
    calendarioRegistrazioni.forEach(giornata =>
    {
        var data=parseDate(giornata.data.date);
        if(document.getElementById("presenzeAnnoContainer"+data.getFullYear())==null)
        {
            var annoTitleContainer=document.createElement("div");
            annoTitleContainer.setAttribute("class","presenze-anno-title-container");
            if(document.getElementsByClassName("presenze-anno-title-container").length>0)
                annoTitleContainer.setAttribute("style","margin-top:20px");
            annoTitleContainer.setAttribute("id","presenzeAnnoContainer"+data.getFullYear());
            var span=document.createElement("span");
            span.innerHTML=data.getFullYear();
            annoTitleContainer.appendChild(span);
            container.appendChild(annoTitleContainer);
        }
        if(document.getElementById("presenzeMeseContainer"+data.getFullYear().toString()+(data.getMonth()+1).toString())==null)
        {
            var meseTitleContainer=document.createElement("div");
            meseTitleContainer.setAttribute("class","presenze-mese-title-container");
            var span=document.createElement("span");
            span.innerHTML=getNomeMese((data.getMonth()+1))+" "+data.getFullYear().toString();
            meseTitleContainer.appendChild(span);
            container.appendChild(meseTitleContainer);

            var meseContainer=document.createElement("div");
            meseContainer.setAttribute("class","presenze-mese-container");
            meseContainer.setAttribute("id","presenzeMeseContainer"+data.getFullYear().toString()+(data.getMonth()+1).toString());
            container.appendChild(meseContainer);
        }

        if(data.getDate()==1)
        {
            var giornoSettimana=data.getDay()-1;

            if(giornoSettimana==-1)
                giornoSettimana=6;
            
            for (let index = 0; index < giornoSettimana; index++)
            {
                var giornoSpace=document.createElement("div");
                giornoSpace.setAttribute("class","presenze-giorno-space");
                giornoSpace.setAttribute("style","width:"+giornoWidth+";min-width:"+giornoWidth+";max-width:"+giornoWidth+"height:"+giornoWidth+";min-height:"+giornoWidth+";max-height:"+giornoWidth);
                document.getElementById("presenzeMeseContainer"+data.getFullYear().toString()+(data.getMonth()+1).toString()).appendChild(giornoSpace);
            }
        }

        var giornoContainer=document.createElement("button");
        giornoContainer.setAttribute("class","presenze-giorno-container");
        giornoContainer.setAttribute("onclick","setData(this,'"+giornata.data.date+"')");

        if(data.getFullYear()==today.getFullYear() && (data.getMonth()+1)==(today.getMonth()+1) && data.getDate()==today.getDate())
            giornoContainer.setAttribute("style","box-shadow: 0 0 0 3px #4C91CB;width:"+giornoWidth+";min-width:"+giornoWidth+";max-width:"+giornoWidth+"height:"+giornoWidth+";min-height:"+giornoWidth+";max-height:"+giornoWidth);
        else
            giornoContainer.setAttribute("style","width:"+giornoWidth+";min-width:"+giornoWidth+";max-width:"+giornoWidth+"height:"+giornoWidth+";min-height:"+giornoWidth+";max-height:"+giornoWidth);

        giornoContainer.setAttribute("id","presenzeGiornoContainer"+data.getDate());
        var span=document.createElement("span");
        span.setAttribute("class","presenze-giorno-span");
        span.innerHTML=data.getDate();
        if(giornoSettimana==6 || giornoSettimana==7)
            span.setAttribute("style","color:gray");
        else
            span.setAttribute("style","color:black");
        giornoContainer.appendChild(span);

        if(giornata.registrazioni>0)
        {
            var nRegistrazioniContainer=document.createElement("div");
            if(giornata.chiuse=="true")
                nRegistrazioniContainer.setAttribute("style","background-color:#70B085");
            else
                nRegistrazioniContainer.setAttribute("style","background-color:#DA6969");
            var span=document.createElement("span");
            span.innerHTML=giornata.registrazioni;
            nRegistrazioniContainer.appendChild(span);
            giornoContainer.appendChild(nRegistrazioniContainer);
        }

        document.getElementById("presenzeMeseContainer"+data.getFullYear().toString()+(data.getMonth()+1).toString()).appendChild(giornoContainer);
    });

    var containerHeight=container.offsetHeight;
    var meseOggiHeight=document.getElementById('presenzeMeseContainer'+today.getFullYear().toString()+(today.getMonth()+1).toString()).offsetHeight;
    var toCenterHeight=(containerHeight-meseOggiHeight)/2;

    var meseOggi = document.getElementById('presenzeMeseContainer'+today.getFullYear().toString()+(today.getMonth()+1).toString());
    var topPos = meseOggi.offsetTop-toCenterHeight;
    container.scrollTop = topPos;

    Swal.close();
}
function getCalendarioRegistrazioni()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getCalendarioRegistrazioniRiepilogoPresenze.php",
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve([]);
                }
                else
                {
                    try {
                        resolve(JSON.parse(response));
                    } catch (error) {
                        Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                        console.log(response);
                        resolve([]);
                    }
                }
            }
            else
                resolve([]);
        });
    });
}
function parseDate(data)
{
    return new Date(data);
}
function getNomeMese(numeroMese)
{
    switch (numeroMese)
    {
        case 1:return "Gennaio";break;
        case 2:return "Febbraio";break;
        case 3:return "Marzo";break;
        case 4:return "Aprile";break;
        case 5:return "Maggio";break;
        case 6:return "Giugno";break;
        case 7:return "Luglio";break;
        case 8:return "Agosto";break;
        case 9:return "Settembre";break;
        case 10:return "Ottobre";break;
        case 11:return "Novembre";break;
        case 12:return "Dicembre";break;
    }
}
function setRangeDate(button,intervallo)
{
    switch (intervallo)
    {
        case "oggi":
            var month=(today.getMonth()+1).toString();
            if(month.length==1)
                month="0"+month;
            var day=today.getDate().toString();
            if(day.length==1)
                day="0"+day;

            document.getElementById("dataInizio").value=today.getFullYear() + "-" + month +"-" + day;
            document.getElementById("dataFine").value=today.getFullYear() + "-" + month +"-" + day;
        break;
        case "ieri":
            var date= new Date();
            var date=date.setDate(date.getDate() - 1);
            var date=new Date(date);

            var month=(date.getMonth()+1).toString();
            if(month.length==1)
                month="0"+month;
            var day=date.getDate().toString();
            if(day.length==1)
                day="0"+day;

            document.getElementById("dataInizio").value=date.getFullYear() + "-" + month +"-" + day;
            document.getElementById("dataFine").value=date.getFullYear() + "-" + month +"-" + day;
        break;
        case "questo_mese":
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            var month=(firstDay.getMonth()+1).toString();
            if(month.length==1)
                month="0"+month;
            var day=firstDay.getDate().toString();
            if(day.length==1)
                day="0"+day;

            document.getElementById("dataInizio").value=firstDay.getFullYear() + "-" + month +"-" + day;

            var month=(lastDay.getMonth()+1).toString();
            if(month.length==1)
                month="0"+month;
            var day=lastDay.getDate().toString();
            if(day.length==1)
                day="0"+day;

            document.getElementById("dataFine").value=lastDay.getFullYear() + "-" + month +"-" + day;
        break;
        case "mese_scorso":
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            var month=(firstDay.getMonth()).toString();
            if(month.length==1)
                month="0"+month;
            var day=firstDay.getDate().toString();
            if(day.length==1)
                day="0"+day;

            document.getElementById("dataInizio").value=firstDay.getFullYear() + "-" + month +"-" + day;

            var month=(lastDay.getMonth()).toString();
            if(month.length==1)
                month="0"+month;
            var day=lastDay.getDate().toString();
            if(day.length==1)
                day="0"+day;

            document.getElementById("dataFine").value=lastDay.getFullYear() + "-" + month +"-" + day;
        break;
        case "quest_anno":
            document.getElementById("dataInizio").value=today.getFullYear() + "-01-01";
            document.getElementById("dataFine").value=today.getFullYear() + "-12-31";
        break;
        case "anno_scorso":
            document.getElementById("dataInizio").value=today.getFullYear()-1 + "-01-01";
            document.getElementById("dataFine").value=today.getFullYear()-1 + "-12-31";
        break;
    }
    getTabellaRegistrazioni();
    button.style.backgroundColor="rgb(48, 133, 214)";
    button.getElementsByTagName("span")[0].style.color="white";
    button.getElementsByTagName("i")[0].style.color="white";
}
function setData(button,data)
{
    data=new Date(data);

    var month=(data.getMonth()+1).toString();
    if(month.length==1)
        month="0"+month;
    var day=data.getDate().toString();
    if(day.length==1)
        day="0"+day;

    document.getElementById("dataInizio").value=data.getFullYear() + "-" + month +"-" + day;
    document.getElementById("dataFine").value=data.getFullYear() + "-" + month +"-" + day;

    getTabellaRegistrazioni();    

    button.style.backgroundColor="rgb(48, 133, 214)";
    button.getElementsByTagName("span")[0].style.color="white";
}
function esportaExcel()
{
    var cloneTable=document.getElementById("tabellaRegistrazioni").cloneNode(true);
    for (var i = 0, row; row = cloneTable.rows[i]; i++)
    {
        for (var j = 0, col; col = row.cells[j]; j++)
        {
            if(col.getElementsByTagName("i")[0]!=null)
            {
                if(col.getElementsByTagName("i")[0].classList=="far fa-square")
                    col.innerHTML="No";
                else
                    col.innerHTML="Si";
            }
        }  
    }
    cloneTable.setAttribute("style","display:none");
    cloneTable.setAttribute("id","tabellaRegistrazioniClone");
    document.body.appendChild(cloneTable);

    var dataInizio=document.getElementById("dataInizio").value;
    var dataFine=document.getElementById("dataFine").value;

    if(dataInizio!="" && dataFine!="")
    {
        dataInizio=new Date(dataInizio);
        var dataInizioMonth=(dataInizio.getMonth()+1).toString();
        if(dataInizioMonth.length==1)
            dataInizioMonth="0"+dataInizioMonth;
        var dataInizioDay=dataInizio.getDate().toString();
        if(dataInizioDay.length==1)
            dataInizioDay="0"+dataInizioDay;

        dataFine=new Date(dataFine);
        var dataFineMonth=(dataFine.getMonth()+1).toString();
        if(dataFineMonth.length==1)
            dataFineMonth="0"+dataFineMonth;
        var dataFineDay=dataFine.getDate().toString();
        if(dataFineDay.length==1)
            dataFineDay="0"+dataFineDay;

        $("#tabellaRegistrazioniClone").table2excel({ 
            filename: "riepilogo_presenze_"+ dataInizioDay+ "-" + dataInizioMonth +"-" + dataInizio.getFullYear()+"_"+ dataFineDay+ "-" + dataFineMonth +"-" + dataFine.getFullYear()+".xls" 
        }); 
    }

    document.getElementById("tabellaRegistrazioniClone").remove();
}
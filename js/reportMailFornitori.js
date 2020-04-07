var selectedMailI;
var steps=0;
var mailsLenght=0;

function importaPdfreportAcquisti()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("importaPdfreportAcquisti.php",
        function(response, status)
        {
            if(status=="success")
            {
                //console.log(response);
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve("error");
                }
                else
                {
                    try {
                        resolve("ok");
                    } catch (error) {
                        Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                        console.log(response);
                        resolve("error");
                    }
                }
            }
            else
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
                resolve("error");
            }
        });
    });
}
async function onloadActions()
{
    getElencoMail();
    var reportAcquistiControlBar=document.getElementById("reportAcquistiControlBar");
    getFaSpinner(reportAcquistiControlBar,"reportAcquistiControlBar","Importazione pdf in corso...");

    var responseImportaPdfreportAcquisti= await importaPdfreportAcquisti();
    //console.log(responseImportaPdfreportAcquisti);

    removeFaSpinner("reportAcquistiControlBar");    
}
async function getImportaPdfreportAcquisti()
{
    var reportAcquistiControlBar=document.getElementById("reportAcquistiControlBar");
    getFaSpinner(reportAcquistiControlBar,"reportAcquistiControlBar","Importazione pdf in corso...");

    var responseImportaPdfreportAcquisti= await importaPdfreportAcquisti();
    //console.log(responseImportaPdfreportAcquisti);

    removeFaSpinner("reportAcquistiControlBar");

    Swal.fire({icon:"success",title: "Pdf importati",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
}
async function getElencoMail()
{
    var itemsContainer=document.getElementById("reportAcquistiItemsContainer");
    itemsContainer.innerHTML="";

    unselectMail();

    getFaSpinner(itemsContainer,"itemsContainer","Caricamento in corso...");

    var mails=await getMails();

    mailsLenght=0;
    mails.forEach(function (mail)
    {
        var item=document.createElement("div");
        item.setAttribute("class","report-acquisti-item");
        item.setAttribute("style","display:none");
        item.setAttribute("id","reportAcquistiItem"+mailsLenght);
        var JSONmail=JSON.stringify(mail);
        item.setAttribute("onclick","selectedMailI="+mailsLenght+";selectMail(this,'"+JSONmail+"')");

        var rowSectionContainer=document.createElement("div");
        rowSectionContainer.setAttribute("class","report-acquisti-item-section-container");
        //rowSectionContainer.setAttribute("style","flex-direction:row;width:100%;justify-content:start;margin-bottom:5px;background-color:rgba(76,145,203,0.25)");
        rowSectionContainer.setAttribute("style","flex-direction:row;width:100%;justify-content:start;margin-bottom:5px;background-color:rgba(233,169,58,0.25)");

        var section=document.createElement("div");
        section.setAttribute("class","report-acquisti-item-section");
        section.setAttribute("style","width:50%;");
        var icon=document.createElement("i");
        icon.setAttribute("class","fad fa-user-edit");
        section.appendChild(icon);
        var span=document.createElement("span");
        span.innerHTML=mail.mittente;
        section.appendChild(span);
        rowSectionContainer.appendChild(section);

        var section=document.createElement("div");
        section.setAttribute("class","report-acquisti-item-section");
        section.setAttribute("style","width:50%;margin-left:auto;justify-content: flex-end;");
        
        var span=document.createElement("span");
        span.setAttribute("style","width:auto");
        span.innerHTML=mail.data_mail;
        section.appendChild(span);
        var icon=document.createElement("i");
        icon.setAttribute("style","margin-right:0px;margin-left:5px");
        icon.setAttribute("class","fad fa-calendar-alt");
        section.appendChild(icon);
        rowSectionContainer.appendChild(section);

        item.appendChild(rowSectionContainer);

        var rowSectionContainer=document.createElement("div");
        rowSectionContainer.setAttribute("class","report-acquisti-item-section-container");
        rowSectionContainer.setAttribute("style","flex-direction:row;width:100%;");

        var sectionContainer=document.createElement("div");
        sectionContainer.setAttribute("class","report-acquisti-item-section-container");
        sectionContainer.setAttribute("style","flex-direction:column;width:calc(50% - 2.5px);margin-right:2.5px;height:100%;justify-content:start;background-color:rgba(112,176,133,0.32)");

        var section=document.createElement("div");
        section.setAttribute("class","report-acquisti-item-section");
        var icon=document.createElement("i");
        icon.setAttribute("class","fad fa-tags");
        section.appendChild(icon);
        var span=document.createElement("span");
        span.innerHTML=mail.ordine_fornitore;
        section.appendChild(span);
        sectionContainer.appendChild(section);

        var section=document.createElement("div");
        section.setAttribute("class","report-acquisti-item-section");
        var icon=document.createElement("i");
        icon.setAttribute("class","fad fa-address-book");
        section.appendChild(icon);
        var span=document.createElement("span");
        span.innerHTML=mail.nome_fornitore;
        section.appendChild(span);
        sectionContainer.appendChild(section);

        var section=document.createElement("div");
        section.setAttribute("class","report-acquisti-item-section");
        var icon=document.createElement("i");
        icon.setAttribute("class","fad fa-file-plus");
        section.appendChild(icon);
        var span=document.createElement("span");
        span.innerHTML=mail.doc_due_date;
        section.appendChild(span);
        sectionContainer.appendChild(section);

        var section=document.createElement("div");
        section.setAttribute("class","report-acquisti-item-section");
        var icon=document.createElement("i");
        icon.setAttribute("class","fad fa-receipt");
        section.appendChild(icon);
        var span=document.createElement("span");
        span.innerHTML=mail.doc_total+"€";
        section.appendChild(span);
        sectionContainer.appendChild(section);

        rowSectionContainer.appendChild(sectionContainer);

        var sectionContainer=document.createElement("div");
        sectionContainer.setAttribute("class","report-acquisti-item-section-container");
        sectionContainer.setAttribute("style","flex-direction:column;width:calc(50% - 2.5px);margin-left:2.5px;height:100%;justify-content:start;background-color:rgba(218,105,105,0.32);");

        var section=document.createElement("div");
        section.setAttribute("class","report-acquisti-item-section");
        var icon=document.createElement("i");
        icon.setAttribute("class","fad fa-tags");
        section.appendChild(icon);
        var span=document.createElement("span");
        span.innerHTML=mail.ordine_cliente;
        section.appendChild(span);
        sectionContainer.appendChild(section);

        var section=document.createElement("div");
        section.setAttribute("class","report-acquisti-item-section");
        var icon=document.createElement("i");
        icon.setAttribute("class","fad fa-address-book");
        section.appendChild(icon);
        var span=document.createElement("span");
        span.innerHTML=mail.nome_cliente;
        section.appendChild(span);
        sectionContainer.appendChild(section);

        var section=document.createElement("div");
        section.setAttribute("class","report-acquisti-item-section");
        var icon=document.createElement("i");
        icon.setAttribute("class","fad fa-shipping-fast");
        section.appendChild(icon);
        var span=document.createElement("span");
        span.innerHTML=mail.data_spedizione;
        section.appendChild(span);
        sectionContainer.appendChild(section);

        var section=document.createElement("div");
        section.setAttribute("class","report-acquisti-item-section");
        var icon=document.createElement("i");
        icon.setAttribute("class","fad fa-receipt");
        section.appendChild(icon);
        var span=document.createElement("span");
        span.innerHTML=mail.importo_ordine_cliente+"€";
        section.appendChild(span);
        sectionContainer.appendChild(section);

        rowSectionContainer.appendChild(sectionContainer);

        item.appendChild(rowSectionContainer);

        itemsContainer.appendChild(item);

        mailsLenght++;
    });

    removeFaSpinner("itemsContainer");

    caricaAltreMail();

    var btnSteps=document.createElement("button");
    btnSteps.setAttribute("onclick","caricaAltreMail()");
    btnSteps.setAttribute("id","btnCaricaAltreMail");
    btnSteps.innerHTML="<i class='fal fa-plus-circle'></i><span>Carica altri...</span>";
    itemsContainer.appendChild(btnSteps);

    var value=document.getElementById("inputSearchreportAcquisti").value.toLowerCase();
    if(value!="")
    {
        $(".report-acquisti-item-section").css({"color":"black"});
        $(".report-acquisti-item-section").filter(function() {
            if($(this).text().toLowerCase().indexOf(value) > -1)
            {
                $(this).css({"color":"#4C91CB"});
            }
            else
                $(this).css({"color":"black"});
        });
    }
}
function caricaAltreMail()
{
    for (let index = steps; index < steps+50; index++)
    {
        $("#reportAcquistiItem"+index).show();
    }
    steps+=50;
    
    if(steps>mailsLenght && document.getElementById("btnCaricaAltreMail")!=undefined)
        document.getElementById("btnCaricaAltreMail").style.display="none";
}
function checkInputSearchreportAcquisti(input,event)
{
    if(input.value=="")
        getElencoMail();
    else
    {
        var keyCode = event.keyCode;
        switch(keyCode) 
        {
            case 13://freccia giu
                event.preventDefault();
                getElencoMail();
            break;
        }
    }
}
async function selectMail(selectedItem,JSONmail)
{
    var mail=JSON.parse(JSONmail);
    unselectMail();
    selectedItem.style.border="2px solid #4C91CB";
    selectedItem.style.backgroundColor="rgba(76,145,203,0.12)";

    var infoContainer=document.getElementById("reportAcquistiInfoOrdineContainer");

    var rowSectionContainer=document.createElement("div");
    rowSectionContainer.setAttribute("class","report-acquisti-item-section-container");
    rowSectionContainer.setAttribute("style","flex-direction:row;width:100%;justify-content:start;margin-bottom:5px;background-color:rgba(233,169,58,0.25)");

    var section=document.createElement("div");
    section.setAttribute("class","report-acquisti-item-section");
    section.setAttribute("style","width:50%;");
    var icon=document.createElement("i");
    icon.setAttribute("class","fad fa-user-edit");
    section.appendChild(icon);
    var span=document.createElement("span");
    span.innerHTML=mail.mittente;
    section.appendChild(span);
    rowSectionContainer.appendChild(section);

    var section=document.createElement("div");
    section.setAttribute("class","report-acquisti-item-section");
    section.setAttribute("style","width:50%;margin-left:auto;justify-content: flex-end;");
    
    var span=document.createElement("span");
    span.setAttribute("style","width:auto");
    span.innerHTML=mail.data_mail;
    section.appendChild(span);
    var icon=document.createElement("i");
    icon.setAttribute("style","margin-right:0px;margin-left:5px");
    icon.setAttribute("class","fad fa-calendar-alt");
    section.appendChild(icon);
    rowSectionContainer.appendChild(section);

    infoContainer.appendChild(rowSectionContainer);

    var rowSectionContainer=document.createElement("div");
    rowSectionContainer.setAttribute("class","report-acquisti-item-section-container");
    rowSectionContainer.setAttribute("style","flex-direction:row;width:100%;");

    var sectionContainer=document.createElement("div");
    sectionContainer.setAttribute("class","report-acquisti-item-section-container");
    sectionContainer.setAttribute("style","flex-direction:column;width:calc(50% - 2.5px);margin-right:2.5px;height:100%;justify-content:start;background-color:rgba(112,176,133,0.32)");

    var sectionRowContainer=document.createElement("div");
    sectionRowContainer.setAttribute("class","report-acquisti-item-section-container");
    sectionRowContainer.setAttribute("style","flex-direction:row;width:100%");

    var section=document.createElement("div");
    section.setAttribute("class","report-acquisti-item-section");
    section.setAttribute("style","width:50%;");
    var icon=document.createElement("i");
    icon.setAttribute("class","fad fa-tags");
    section.appendChild(icon);
    var span=document.createElement("span");
    span.innerHTML=mail.ordine_fornitore;
    section.appendChild(span);
    sectionRowContainer.appendChild(section);

    var section=document.createElement("div");
    section.setAttribute("class","report-acquisti-item-section");
    section.setAttribute("style","width:50%;margin-left:auto;justify-content: flex-end;");
    
    var span=document.createElement("span");
    span.setAttribute("style","width:auto");
    span.innerHTML=mail.nome_fornitore;
    section.appendChild(span);
    var icon=document.createElement("i");
    icon.setAttribute("style","margin-right:0px;margin-left:5px");
    icon.setAttribute("class","fad fa-address-book");
    section.appendChild(icon);
    sectionRowContainer.appendChild(section);

    sectionContainer.appendChild(sectionRowContainer);

    var sectionRowContainer=document.createElement("div");
    sectionRowContainer.setAttribute("class","report-acquisti-item-section-container");
    sectionRowContainer.setAttribute("style","flex-direction:row;width:100%");

    var section=document.createElement("div");
    section.setAttribute("class","report-acquisti-item-section");
    section.setAttribute("style","width:50%;");
    var icon=document.createElement("i");
    icon.setAttribute("class","fad fa-file-plus");
    section.appendChild(icon);
    var span=document.createElement("span");
    span.innerHTML=mail.doc_due_date;
    section.appendChild(span);
    sectionRowContainer.appendChild(section);

    var section=document.createElement("div");
    section.setAttribute("class","report-acquisti-item-section");
    section.setAttribute("style","width:50%;margin-left:auto;justify-content: flex-end;");
    
    var span=document.createElement("span");
    span.setAttribute("style","width:auto");
    span.innerHTML=mail.doc_total+"€";
    section.appendChild(span);
    var icon=document.createElement("i");
    icon.setAttribute("style","margin-right:0px;margin-left:5px");
    icon.setAttribute("class","fad fa-receipt");
    section.appendChild(icon);
    sectionRowContainer.appendChild(section);

    sectionContainer.appendChild(sectionRowContainer);

    rowSectionContainer.appendChild(sectionContainer);

    var sectionContainer=document.createElement("div");
    sectionContainer.setAttribute("class","report-acquisti-item-section-container");
    sectionContainer.setAttribute("style","flex-direction:column;width:calc(50% - 2.5px);margin-left:2.5px;height:100%;justify-content:start;background-color:rgba(218,105,105,0.32);");

    var sectionRowContainer=document.createElement("div");
    sectionRowContainer.setAttribute("class","report-acquisti-item-section-container");
    sectionRowContainer.setAttribute("style","flex-direction:row;width:100%");

    var section=document.createElement("div");
    section.setAttribute("class","report-acquisti-item-section");
    section.setAttribute("style","width:50%;");
    var icon=document.createElement("i");
    icon.setAttribute("class","fad fa-tags");
    section.appendChild(icon);
    var span=document.createElement("span");
    span.innerHTML=mail.ordine_cliente;
    section.appendChild(span);
    sectionRowContainer.appendChild(section);

    var section=document.createElement("div");
    section.setAttribute("class","report-acquisti-item-section");
    section.setAttribute("style","width:50%;margin-left:auto;justify-content: flex-end;");
    
    var span=document.createElement("span");
    span.setAttribute("style","width:auto");
    span.innerHTML=mail.nome_cliente;
    section.appendChild(span);
    var icon=document.createElement("i");
    icon.setAttribute("style","margin-right:0px;margin-left:5px");
    icon.setAttribute("class","fad fa-address-book");
    section.appendChild(icon);
    sectionRowContainer.appendChild(section);

    sectionContainer.appendChild(sectionRowContainer);

    var sectionRowContainer=document.createElement("div");
    sectionRowContainer.setAttribute("class","report-acquisti-item-section-container");
    sectionRowContainer.setAttribute("style","flex-direction:row;width:100%");

    var section=document.createElement("div");
    section.setAttribute("class","report-acquisti-item-section");
    section.setAttribute("style","width:50%;");
    var icon=document.createElement("i");
    icon.setAttribute("class","fad fa-file-plus");
    section.appendChild(icon);
    var span=document.createElement("span");
    span.innerHTML=mail.data_spedizione;
    section.appendChild(span);
    sectionRowContainer.appendChild(section);

    var section=document.createElement("div");
    section.setAttribute("class","report-acquisti-item-section");
    section.setAttribute("style","width:50%;margin-left:auto;justify-content: flex-end;");
    
    var span=document.createElement("span");
    span.setAttribute("style","width:auto");
    span.innerHTML=mail.importo_ordine_cliente+"€";
    section.appendChild(span);
    var icon=document.createElement("i");
    icon.setAttribute("style","margin-right:0px;margin-left:5px");
    icon.setAttribute("class","fad fa-receipt");
    section.appendChild(icon);
    sectionRowContainer.appendChild(section);

    sectionContainer.appendChild(sectionRowContainer);

    rowSectionContainer.appendChild(sectionContainer);
    infoContainer.appendChild(rowSectionContainer);

    var dettagliOrdine=await getDettagliOrdine(mail.ordine_fornitore);

    var headers=
    [
        {
            value:"ItemCode",
            label:"Codice articolo"
        },
        {
            value:"descrizione",
            label:"Descrizione"
        },
        {
            value:"Price",
            label:"Prezzo unitario"
        },
        {
            value:"Quantity",
            label:"Quantità"
        },
        {
            value:"line_total",
            label:"Prezzo totale"
        },
    ];
    
    var table=document.createElement("table");
    table.setAttribute("id","reportAcquistiInfoOrdineTable");

    var thead=document.createElement("thead");
    var tr=document.createElement("tr");
    headers.forEach(function (header)
    {
        var th=document.createElement("th");
        th.setAttribute("class","reportAcquistiInfoOrdineTableCell"+header.value);
        th.innerHTML=header.label;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);

    var tbody=document.createElement("tbody");
    dettagliOrdine.forEach(function (rigaOrdine)
    {
        var tr=document.createElement("tr");
        headers.forEach(function (header)
        {
            var td=document.createElement("td");
            td.setAttribute("class","reportAcquistiInfoOrdineTableCell"+header.value);
            td.innerHTML=rigaOrdine[header.value];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    var rowSectionContainer=document.createElement("div");
    rowSectionContainer.setAttribute("class","report-acquisti-item-section-container");
    rowSectionContainer.setAttribute("style","flex-direction:row;width:100%;justify-content:start;margin-top:5px;overflow:hidden;height:152px");
    
    rowSectionContainer.appendChild(table);

    infoContainer.appendChild(rowSectionContainer);

    var tableWidth=document.getElementById("reportAcquistiInfoOrdineTable").offsetWidth;
    var tableColWidth1=(15*tableWidth)/100;
    var tableColWidth2=(40*tableWidth)/100;
    
    $("#reportAcquistiInfoOrdineTable td").css({"width":tableColWidth1+"px"});
    $("#reportAcquistiInfoOrdineTable th").css({"width":tableColWidth1+"px"});
    $(".reportAcquistiInfoOrdineTableCelldescrizione").css({"width":tableColWidth2+"px"});

    var pdfContainer=document.getElementById("reportAcquistiPdfContainer");
    pdfContainer.style.backgroundColor="rgb(82, 86, 89)";

    var pdfOrdine=await getPdfOrdine(mail.ordine_fornitore);

    var j=0;
    pdfOrdine.forEach(function(percorso) 
    {
        var iframe=document.createElement("iframe");
        iframe.setAttribute("id","reportAcquistiPdfOrdineIframe"+j);
        iframe.setAttribute("class","report-acquisti-pdf-ordine-iframe");
        //iframe.setAttribute("onload","fixPdfOrdine(this)");
        iframe.setAttribute("src",percorso);
        pdfContainer.appendChild(iframe);
        j++;
    });
}
function getDettagliOrdine(ordine_fornitore)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getDettagliOrdinereportAcquisti.php",
        {
            ordine_fornitore
        },
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
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
                resolve([]);
            }
        });
    });
}
function getPdfOrdine(ordine_fornitore)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getPdfOrdinereportAcquisti.php",
        {
            ordine_fornitore
        },
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
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
                resolve([]);
            }
        });
    });
}
function unselectMail()
{
    var items=document.getElementsByClassName("report-acquisti-item");
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        item.style.border="2px solid transparent";
        item.style.backgroundColor="#f0f0f041";
    }
    document.getElementById("reportAcquistiInfoOrdineContainer").innerHTML="";
    document.getElementById("reportAcquistiPdfContainer").innerHTML="";
    document.getElementById("reportAcquistiPdfContainer").style.backgroundColor="";
}
function capitalizeString(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function getMails()
{
    return new Promise(function (resolve, reject) 
    {
        var orderBy=document.getElementById("selectOrderByreportAcquisti").value;
        //var top=document.getElementById("inputTopreportAcquisti").value;
        var filter=document.getElementById("inputSearchreportAcquisti").value.toLowerCase();

        $.get("getMailsreportAcquisti.php",
        {
            orderBy,
            //top,
            filter
        },
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
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
                resolve([]);
            }
        });
    });
}
window.addEventListener("keydown", windowKeydown, false);
function windowKeydown(e)
{
    if(e.target.id!=="inputSearchreportAcquisti")
    {
        var keyCode = e.keyCode;
        switch(keyCode) 
        {
            case 40://freccia giu
                e.preventDefault();
                if(selectedMailI!==null)
                {
                    try {
                        selectedMailI++;
                        document.getElementById("reportAcquistiItem"+selectedMailI).click();
                    } catch (error) {
                        selectedMailI=0;
                        document.getElementById("reportAcquistiItem"+selectedMailI).click();
                    }
                    
                }
            break;
            case 38://freccia su
                e.preventDefault();
                if(selectedMailI!==null)
                {
                    try {
                        selectedMailI--;
                        document.getElementById("reportAcquistiItem"+selectedMailI).click();
                    } catch (error) {
                        selectedMailI=0;
                        document.getElementById("reportAcquistiItem"+selectedMailI).click();
                    }
                    
                }
            break;
        }
    }
}
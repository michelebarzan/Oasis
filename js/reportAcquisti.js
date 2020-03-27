var selectedMailI;

function importaPdfReportAcquisti()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("importaPdfReportAcquisti.php",
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

    var responseImportaPdfReportAcquisti= await importaPdfReportAcquisti();
    //console.log(responseImportaPdfReportAcquisti);

    removeFaSpinner("reportAcquistiControlBar");    
}
async function getImportaPdfReportAcquisti()
{
    var reportAcquistiControlBar=document.getElementById("reportAcquistiControlBar");
    getFaSpinner(reportAcquistiControlBar,"reportAcquistiControlBar","Importazione pdf in corso...");

    var responseImportaPdfReportAcquisti= await importaPdfReportAcquisti();
    //console.log(responseImportaPdfReportAcquisti);

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

    var i=0;
    mails.forEach(function (mail)
    {
        var item=document.createElement("div");
        item.setAttribute("class","report-acquisti-item");
        item.setAttribute("id","reportAcquistiItem"+i);
        var JSONmail=JSON.stringify(mail);
        item.setAttribute("onclick","selectedMailI="+i+";selectMail(this,'"+JSONmail+"')");

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

        /*var sectionContainer=document.createElement("div");
        sectionContainer.setAttribute("class","report-acquisti-item-section-container");
        sectionContainer.setAttribute("style","flex-direction:column;width:calc(50% - 0px);margin-right:0px;height:100%;justify-content:start;");

        var sectionInnerContainer=document.createElement("div");
        sectionInnerContainer.setAttribute("class","report-acquisti-item-section-container");
        sectionInnerContainer.setAttribute("style","flex-direction:column;width:100%;height:100%;background-color:rgba(76,145,203,0.12)");

        var section=document.createElement("div");
        section.setAttribute("class","report-acquisti-item-section");
        var span=document.createElement("span");
        span.setAttribute("style","width:calc(100% - 25px);margin-right:5px;text-decoration:underline");
        span.setAttribute("id","searchResult1ColumnContainer"+mail.ordine_fornitore);
        //span.innerHTML="Colonna";
        section.appendChild(span);
        var icon=document.createElement("i");
        icon.setAttribute("class","fad fa-search");
        icon.setAttribute("style","margin-left:auto;margin-right:0px");
        section.appendChild(icon);
        sectionInnerContainer.appendChild(section);

        var section=document.createElement("div");
        section.setAttribute("class","report-acquisti-item-section");
        section.setAttribute("style","margin-top:0px");
        var span=document.createElement("span");
        span.setAttribute("id","searchResult1ValueContainer"+mail.ordine_fornitore);
        span.setAttribute("style","width:100%");
        //span.innerHTML=mail.nome_fornitore;
        section.appendChild(span);
        sectionInnerContainer.appendChild(section);

        var section=document.createElement("div");
        section.setAttribute("class","report-acquisti-item-section");
        section.setAttribute("style","margin-top:0px");
        var span=document.createElement("span");
        span.setAttribute("id","searchResult2ColumnContainer"+mail.ordine_fornitore);
        span.setAttribute("style","width:100%;text-decoration:underline");
        //span.innerHTML="Colonna 2";
        section.appendChild(span);
        sectionInnerContainer.appendChild(section);

        var section=document.createElement("div");
        section.setAttribute("class","report-acquisti-item-section");
        section.setAttribute("style","margin-top:0px");
        var span=document.createElement("span");
        span.setAttribute("id","searchResult2ValueContainer"+mail.ordine_fornitore);
        span.setAttribute("style","width:100%");
        //span.innerHTML=mail.doc_total;
        section.appendChild(span);
        sectionInnerContainer.appendChild(section);

        var section=document.createElement("div");
        section.setAttribute("class","report-acquisti-item-section");
        section.setAttribute("style","margin-top:0px");
        var span=document.createElement("span");
        span.setAttribute("id","searchResult3ColumnContainer"+mail.ordine_fornitore);
        span.setAttribute("style","width:100%;text-decoration:underline");
        //span.innerHTML="Colonna 3";
        section.appendChild(span);
        sectionInnerContainer.appendChild(section);

        var section=document.createElement("div");
        section.setAttribute("class","report-acquisti-item-section");
        section.setAttribute("style","margin-top:0px");
        var span=document.createElement("span");
        span.setAttribute("id","searchResult3ValueContainer"+mail.ordine_fornitore);
        span.setAttribute("style","width:100%");
        //span.innerHTML=mail.oggetto;
        section.appendChild(span);
        sectionInnerContainer.appendChild(section);

        sectionContainer.appendChild(sectionInnerContainer);

        item.appendChild(sectionContainer);*/

        itemsContainer.appendChild(item);

        i++;
    });

    removeFaSpinner("itemsContainer");

    /*var headers=[];
    for (var prop in mails[0]) {
        if (Object.prototype.hasOwnProperty.call(mails[0], prop))
        {
            headers.push(prop);
        }
    }
    var table=document.createElement("table");
    table.setAttribute("id","");

    var tr=document.createElement("tr");
    headers.forEach(function (header)
    {
        var th=document.createElement("th");
        th.innerHTML=header;
        tr.appendChild(th);
    });
    table.appendChild(tr);

    mails.forEach(function (mail)
    {
        var tr=document.createElement("tr");
        headers.forEach(function (header)
        {
            var td=document.createElement("td");
            td.innerHTML=mail[header];
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    tableContainer.appendChild(table);*/
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
        $.get("getDettagliOrdineReportAcquisti.php",
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
        $.get("getPdfOrdineReportAcquisti.php",
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
        var orderBy=document.getElementById("selectOrderByReportAcquisti").value;
        var top=document.getElementById("inputTopReportAcquisti").value;
        $.get("getMailsReportAcquisti.php",
        {
            orderBy,
            top
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
function searchReportAcquisti(event,input)
{
    unselectMail();
    $(".report-acquisti-item-section").css({"color":"black"});
    var value=input.value.toLowerCase();
    if(value!="")
    {
        $(".report-acquisti-item").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            if($(this).is(":visible"))
            {
                $(".report-acquisti-item-section").filter(function() {
                    if($(this).text().toLowerCase().indexOf(value) > -1)
                    {
                        $(this).css({"color":"#4C91CB"});
                    }
                    else
                        $(this).css({"color":"black"});
                });
            }
        });
    }
    else
        $(".report-acquisti-item").show();
    
    var keyCode = event.keyCode;
    switch(keyCode) 
    {
        case 13:document.getElementById("reportAcquistiItem"+0).click();document.body.focus();break;
        case 40://freccia giu
                event.preventDefault();
                if(selectedMailI==null)
                    document.getElementById("reportAcquistiItem"+0).click();
                else
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
                event.preventDefault();
                if(selectedMailI==null)
                    document.getElementById("reportAcquistiItem"+0).click();
                else
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
window.addEventListener("keydown", windowKeydown, false);
function windowKeydown(e)
{
    if(e.target.id!=="inputSearchReportAcquisti")
    {
        var keyCode = e.keyCode;
        switch(keyCode) 
        {
            case 40://freccia giu
                e.preventDefault();
                if(selectedMailI==null)
                    document.getElementById("reportAcquistiItem"+0).click();
                else
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
                if(selectedMailI==null)
                    document.getElementById("reportAcquistiItem"+0).click();
                else
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
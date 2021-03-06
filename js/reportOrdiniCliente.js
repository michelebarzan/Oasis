var flexDirection="row";
var ordini;
var headers;
var filterArrays={};
//var steps=0;
var ordiniLenght=0;
var tbody;
var oggi = new Date();
var annoOggi=oggi.getFullYear();
var defaultFilterConditions=
[{
    colonna: "data_spedizione",
    nome: "anno",
    /*operatore: "IN",
    valore: "(SELECT [data_spedizione] FROM report_ordini_clienti_view WHERE DATEPART(yy,[data_spedizione]) = "+annoOggi+")",*/
    operatore:"BETWEEN",
    valore:"'01-01-"+annoOggi+"' AND '12-31-"+annoOggi+"'",
    input: annoOggi,
    label: "anno di data_spedizione = "+annoOggi,
    default:true
}];
var filterConditions=defaultFilterConditions;
var defaultOrderBy=
{
    colonna: "data_spedizione",
    tipo: "DESC"
}
var orderBy=defaultOrderBy;
var id_utente;
var stepsSize=500;
var steps2Size=100;
var filterMenuAperto;
//var filtroAnni="2019,2020";
var filtroAnni="";
var raggruppati=false;
var resizeStep;
var tableWidth;
var defaultHeaders;
var steps2=100;
var oldSteps2;

function setHeaderTabella(headerTabella)
{
    if(headerTabella=="sl")
    {
        $("#reportOrdiniClientiTable thead").css({"height":"35px","line-height":"35px"});
        $("#reportOrdiniClientiTable th").css({"height":"35px"});
        $("#reportOrdiniClientiTable th span").css(
        {
            "white-space":"nowrap",
            "overflow":"hidden",
            "text-overflow":"ellipsis"
        });
        $("#reportOrdiniClientiTable tbody").css({"height":"calc(100% - 36px)"});
        $("#btnHeaderTabellaML").css({"color":""});
        $("#btnHeaderTabellaML").css({"border":""});
        $("#btnHeaderTabellaSL").css({"color":"#4C91CB"});
        $("#btnHeaderTabellaSL").css({"border":"0.5px solid #4C91CB"});
    }
    if(headerTabella=="ml")
    {
        $("#reportOrdiniClientiTable thead").css({"height":"60px","line-height":"normal"});
        $("#reportOrdiniClientiTable th").css({"height":"60px"});
        $("#reportOrdiniClientiTable th span").css(
        {
            "white-space":"normal",
            "overflow":"hidden",
            "text-overflow":"clip"
        });
        $("#reportOrdiniClientiTable tbody").css({"height":"calc(100% - 61px)"});
        $("#btnHeaderTabellaSL").css({"border":""});
        $("#btnHeaderTabellaSL").css({"color":""});
        $("#btnHeaderTabellaML").css({"color":"#4C91CB"});
        $("#btnHeaderTabellaML").css({"border":"0.5px solid #4C91CB"});
    }
}
async function setRangeDati(range)
{
    filtroAnni="";
    
    if(range!=='*')
    {
        $("#btnRangeDatiTutti").css({"color":""});
        $("#btnRangeDatiTutti").css({"border":""});
        $("#btnRangeDati").css({"color":"#4C91CB"});
        $("#btnRangeDati").css({"border":"0.5px solid #4C91CB"});
        for (let anno = annoOggi; anno != annoOggi-range; anno--) 
        {
            filtroAnni+=anno+",";
        }
        filtroAnni = filtroAnni.substring(0, filtroAnni.length - 1);
    }
    else
    {
        $("#btnRangeDati").css({"color":""});
        $("#btnRangeDati").css({"border":""});
        $("#btnRangeDatiTutti").css({"color":"#4C91CB"});
        $("#btnRangeDatiTutti").css({"border":"0.5px solid #4C91CB"});
    }

    getElencoOrdiniClienteView();
}
function getAnni()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getAnniOrdiniClientiView.php",
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
function checkFlexDirection()
{
    document.getElementById("btnFlexDirectionRow").style.color="black";
    document.getElementById("btnFlexDirectionColumn").style.color="black";
    if(flexDirection=="row")
    {
        document.getElementById("btnFlexDirectionRow").style.color="#4C91CB";
    }
    else
    {
        document.getElementById("btnFlexDirectionColumn").style.color="#4C91CB";
    }
}
function cancellaFiltri()
{
    orderBy=undefined;
    filterConditions=[];
    $('.filter-menu-report-ordini-cliente-input-filtro').val('');
    //steps=0;
    getElencoOrdiniClienteView();
}
async function onloadActions()
{
    id_utente=await getSessionValue("id_utente");
    getElencoOrdiniClienteView();
    getUltimoAggiornamento();
    //importaPdf();
}
function importaPdf()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("importaPdf.php",
        function(response, status)
        {
            if(status=="success")
            {
                console.log(response);
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
async function getPopupFiltrISalvati()
{
    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","popup-report-ordini-cliente-outer-container");

    var row=document.createElement("div");
    row.setAttribute("style","width:100%;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;");

    var span=document.createElement("span");
    span.setAttribute("style","color:white;font-family: 'Quicksand',sans-serif;font-size:12px;");
    span.innerHTML="Creati da";
    row.appendChild(span);

    var select=document.createElement("select");
    select.setAttribute("id","selectUtentePopupFiltriSalvati");
    select.setAttribute("onchange","getElencoFiltri(this.value)");
    var utenti=await getUtentiFiltriSalvati();
    var username=await getSessionValue("Username");

    var option=document.createElement("option");
    option.setAttribute("value",id_utente);
    option.setAttribute("style","color:black;font-weight:bold");
    option.innerHTML=username;
    select.appendChild(option);

    var option=document.createElement("option");
    option.setAttribute("value","*");
    option.setAttribute("style","color:black;font-weight:bold");
    option.innerHTML="Tutti";
    select.appendChild(option);

    utenti.forEach(function(utente)
    {
        var option=document.createElement("option");
        option.setAttribute("value",utente.id_utente);
        option.setAttribute("style","color:black;font-weight:bold");
        option.innerHTML=utente.username;
        select.appendChild(option);
    });
    row.appendChild(select);

    outerContainer.appendChild(row);

    var row=document.createElement("div");
    row.setAttribute("id","containerFiltriPopupFiltriSalvati");
    outerContainer.appendChild(row);

    Swal.fire
    ({
        background:"#404040",
        title:"Filtri salvati",
        onOpen : function()
                {
                    document.getElementsByClassName("swal2-title")[0].style.fontWeight="normal";
                    document.getElementsByClassName("swal2-title")[0].style.maxWidth="70%";
                    document.getElementsByClassName("swal2-title")[0].style.boxSizing="border-box";
                    document.getElementsByClassName("swal2-title")[0].style.marginLeft="10px";
                    document.getElementsByClassName("swal2-title")[0].style.marginTop="15px";
                    document.getElementsByClassName("swal2-title")[0].style.marginRight="10px";
                    document.getElementsByClassName("swal2-title")[0].style.whiteSpace="nowrap";
                    document.getElementsByClassName("swal2-title")[0].style.overflow="hidden";
                    document.getElementsByClassName("swal2-title")[0].style.textOverflow="ellipsis";
                    document.getElementsByClassName("swal2-popup")[0].style.padding="0px";
                    document.getElementsByClassName("swal2-close")[0].style.outline="none";

                    var utente=document.getElementById("selectUtentePopupFiltriSalvati").value;
                    getElencoFiltri(utente);
                },
        showCloseButton:true,
        showConfirmButton:false,
        showCancelButton:false,
        html:outerContainer.outerHTML
    }).then((result) => 
    {
        
    });
}
async function getElencoFiltri(utente)
{
    var filtri=await getFiltri(utente);
    //console.log(filtri);

    var container=document.getElementById("containerFiltriPopupFiltriSalvati");
    container.innerHTML="";

    getFaSpinner(container,"container","Caricamento in corso...")

    if(filtri.length==0)
    {
        var span=document.createElement("span");
        span.setAttribute("style","color:white;font-size:12px;text-align:left;margin-top:10px;text-decoration:underline");
        span.innerHTML="Questo utente non ha ancora salvato nessun filtro";
        container.appendChild(span);
    }
    else
    {
        filtri.forEach(function(filtro)
        {
            var outerContainer=document.createElement("div");
            outerContainer.setAttribute("class","popup-filtri-salvati-outer-container");

            var button=document.createElement("button");
            button.setAttribute("class","popup-filtri-salvati-select-button");
            button.addEventListener("click", function()
            {
                selectFiltro(filtro.filterConditions,filtro.orderBy);
            });
            
            var span=document.createElement("span");
            span.innerHTML="<b>"+filtro.nome+"</b>";
            button.appendChild(span);

            if(filtro.descrizione!=null)
            {
                var span=document.createElement("span");
                span.setAttribute("style","margin-top:3px");
                span.innerHTML=filtro.descrizione;
                button.appendChild(span);
            }

            outerContainer.appendChild(button);

            if(filtro.id_utente==id_utente)
            {
                var deleteButton=document.createElement("button");
                deleteButton.setAttribute("class","popup-filtri-salvati-delete-button");
                deleteButton.setAttribute("title","Elimina salvataggio filtro");
                deleteButton.setAttribute("onclick","eliminaSalvataggioFiltro("+filtro.id_salvataggio+")");
                var i=document.createElement("i");
                i.setAttribute("class","fal fa-times");
                deleteButton.appendChild(i);
                outerContainer.appendChild(deleteButton);
            }

            container.appendChild(outerContainer);
        });
    }

    removeFaSpinner("container");
}
function eliminaSalvataggioFiltro(id_salvataggio)
{
    Swal.fire
    ({
        background:"#404040",
        title: 'Eliminare il filtro salvato?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DA6969',
        cancelButtonColor: '#4C91CB',
        confirmButtonText: 'Elimina',
        cancelButtonText:"Annulla",
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}
    }).then((result) => {
        if (result.value) 
        {
            $.post("eliminaSalvataggioFiltroReportOrdiniCliente.php",
            {
                id_salvataggio
            },
            function(response, status)
            {
                if(status=="success")
                {
                    if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                    {
                        Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                        console.log(response);
                    }
                    else
                    {
                        getPopupFiltrISalvati();
                    }
                }
                else
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(status);
                }
            });
        }
        else
            getPopupFiltrISalvati();
      })
}
function capitalize(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function selectFiltro(filterConditionsString,orderByString)
{
    Swal.close();

    $('.filter-menu-report-ordini-cliente-input-filtro').val('');

    try {
        filterConditions=JSON.parse(filterConditionsString);
        filterConditions.forEach(function(filterCondition)
        {
            if(filterCondition.nome=="intervallo")
            {
                document.getElementById("filterIntervalloDa"+filterCondition.colonna).value=filterCondition.input;
                document.getElementById("filterIntervalloA"+filterCondition.colonna).value=filterCondition.input1;
            }
            else
            {
                document.getElementById("filter"+capitalize(filterCondition.nome)+filterCondition.colonna).value=filterCondition.input;
            }
        });
    } catch (error) {
        filterConditions=[];
    }
    try {
        orderBy=JSON.parse(orderByString);
        $(".filter-menu-order-button-report-ordini-cliente").css("color","white");
        document.getElementById("orderButton"+orderBy.colonna+orderBy.tipo).style.color='#E9A93A';
    } catch (error) {
        orderBy=undefined;
    }    

    //steps=0;
    getElencoOrdiniClienteView();
}
function getUtentiFiltriSalvati()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getUtentiFiltriSalvati.php",
        {
            id_utente
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
function getFiltri(utente)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getFiltriOrdiniClienteView.php",
        {
            utente
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
function rimuoviFiltro(icon,index)
{
    icon.parentElement.remove();
    if (index > -1)
        filterConditions.splice(index, 1);

    //steps=0;
    getElencoOrdiniClienteView();
}
function getActiveFilterBar()
{
    var filtriAttiviReportOrdiniCliente=document.getElementById("filtriAttiviReportOrdiniCliente");
    filtriAttiviReportOrdiniCliente.innerHTML="";
    var j=0;
    filterConditions.forEach(function(filterCondition)
    {
        var div=document.createElement("div");
        var span=document.createElement("span");
        span.innerHTML=filterCondition.label;
        div.appendChild(span);
        var i=document.createElement("i");
        i.setAttribute("class","fal fa-times");
        i.setAttribute("onclick","rimuoviFiltro(this,"+j+")");
        div.appendChild(i);

        filtriAttiviReportOrdiniCliente.appendChild(div);
        j++;
    });
}
function closeContextMenuOrdineCliente()
{
    $(".ordine-cliente-context-menu-outer-container").remove();
    $(".link-cerca-pdf-report-ordini-cliente").css
    ({
        "text-decoration":"",
        "color":""
    });
}
async function getContextMenuOrdineCliente(button,event,ordine)
{
    closeContextMenuOrdineCliente();

    var rect = button.getBoundingClientRect();

    button.style.textDecoration="underline";
    button.style.color="#4C91CB";

    var ordineLink=ordine.replace("/","[slash]");
    ordineLink=ordineLink.replace("=","[uguale]");
    ordineLink=ordineLink.replace("&","[ecommerciale]");
    ordineLink=ordineLink.replace("?","[puntodomanda]");
    ordineLink=ordineLink.replace("\\","[backslash]");

    var contextMenuOuterContainer=document.createElement("div");
    contextMenuOuterContainer.setAttribute("class","ordine-cliente-context-menu-outer-container");
    contextMenuOuterContainer.setAttribute("id","ordineClienteContentMenuOuterContainer"+ordine);
    //contextMenuOuterContainer.setAttribute("","");
    
    var link=document.createElement("a");
    link.setAttribute("href","");
    link.setAttribute("target","_blank");
    link.setAttribute("href","http://remote.oasisgroup.it/Oasis/registrazioniProduzione.php?colonnaFiltro=ordine_cliente&valoreFiltro="+ordine);
    //link.setAttribute("href","http://127.0.0.1:5500/registrazioniProduzione.php?colonnaFiltro=ordine_cliente&valoreFiltro="+ordine);
    link.setAttribute("class","ordine-cliente-context-menu-item");
    link.setAttribute("onclick","closeContextMenuOrdineCliente()");
    var span=document.createElement("span");
    span.setAttribute("class","ordine-cliente-context-menu-item");
    span.innerHTML="Stato produzione";
    link.appendChild(span);
    var i=document.createElement("i");
    i.setAttribute("class","fal fa-external-link ordine-cliente-context-menu-item");
    link.appendChild(i);
    contextMenuOuterContainer.appendChild(link);

    var link=document.createElement("a");
    link.setAttribute("target","_blank");
    link.setAttribute("href","http://remote.oasisgroup.it/Oasis/reportMailFornitori.php?colonnaFiltro=ordine_cliente&valoreFiltro="+ordine);
    link.setAttribute("class","ordine-cliente-context-menu-item");
    link.setAttribute("onclick","closeContextMenuOrdineCliente()");
    var span=document.createElement("span");
    span.setAttribute("class","ordine-cliente-context-menu-item");
    span.innerHTML="Mail fornitore";
    link.appendChild(span);
    var i=document.createElement("i");
    i.setAttribute("class","fal fa-external-link ordine-cliente-context-menu-item");
    link.appendChild(i);
    contextMenuOuterContainer.appendChild(link);

    var link=document.createElement("a");
    link.setAttribute("target","_blank");
    link.setAttribute("href","http://remote.oasisgroup.it/OasisPdfOrdini/pdf_ordini/H"+ordine+".pdf");
    link.setAttribute("class","ordine-cliente-context-menu-item");
    link.setAttribute("onclick","closeContextMenuOrdineCliente()");
    var span=document.createElement("span");
    span.setAttribute("class","ordine-cliente-context-menu-item");
    span.innerHTML="Pdf ordine produzione";
    link.appendChild(span);
    var i=document.createElement("i");
    i.setAttribute("class","fal fa-external-link ordine-cliente-context-menu-item");
    link.appendChild(i);
    contextMenuOuterContainer.appendChild(link);

    var permessiColonne=await checkPermessiColonne();
    if(permessiColonne)
    {
        var link=document.createElement("a");
        link.setAttribute("target","_blank");
        link.setAttribute("href","http://remote.oasisgroup.it/OasisPdfOrdini/ordini_acquisto/H"+ordine+".pdf");
        link.setAttribute("class","ordine-cliente-context-menu-item");
        link.setAttribute("onclick","closeContextMenuOrdineCliente()");
        var span=document.createElement("span");
        span.setAttribute("class","ordine-cliente-context-menu-item");
        span.innerHTML="Pdf ordine vendita";
        link.appendChild(span);
        var i=document.createElement("i");
        i.setAttribute("class","fal fa-external-link ordine-cliente-context-menu-item");
        link.appendChild(i);
        contextMenuOuterContainer.appendChild(link);

        var left=rect.left+60;
        var top=rect.top-64;
    }
    else
    {
        var left=rect.left+60;
        var top=rect.top-50;
    }

    document.body.appendChild(contextMenuOuterContainer);    

    $("#ordineClienteContentMenuOuterContainer"+ordine).show("fast","swing");
    $("#ordineClienteContentMenuOuterContainer"+ordine).css
    ({
        "display":"flex",
        "left":left+"px",
        "top":top+"px"
    });
}
function checkPermessiColonne()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("checkPermessiColonneReportOrdiniCliente.php",
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve(false);
                }
                else
                {
                    resolve(response=="true");
                }
            }
            else
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
                resolve(false);
            }
        });
    });
}
async function getElencoOrdiniClienteView()
{
    var container=document.getElementById("reportOrdiniClienteContainer");
    container.innerHTML="";
    getFaSpinner(container,"container","Caricamento in corso...");

    objOrdini=await getOrdiniClienteView();
    headers=objOrdini.headers;
    ordini=objOrdini.ordini;

    defaultHeaders=headers;

    if(raggruppati)
        raggruppaOrdini();

    removeFaSpinner("container");

    getReportOrdiniClientiTable();
}
function checkCaricaAltriOrdini(tbody)
{
    var scrollTop=tbody.scrollTop;
    var scrollHeight=tbody.scrollHeight;

    if((scrollHeight-scrollTop)==tbody.offsetHeight)
        caricaAltriOrdini();
}
function getReportOrdiniClientiTable()
{
    var oldScrollTop=0;
    if(document.getElementById("reportOrdiniClientiTable")!=null)
    {
        var tableBody = document.getElementById("reportOrdiniClientiTable").getElementsByTagName("tbody")[0];
        oldScrollTop=tableBody.scrollTop;
    }
    
    var container=document.getElementById("reportOrdiniClienteContainer");
    container.innerHTML="";

    document.getElementById("numeroRecordReportOrdiniCliente").innerHTML="0";

    getActiveFilterBar();

    var table=document.createElement("table");
    table.setAttribute("id","reportOrdiniClientiTable");

    var colNum=0;
    var thead=document.createElement("thead");
    var tr=document.createElement("tr");
    headers.forEach(function (header)
    {
        header.colNum=colNum;
        filterArrays[header.value]=[];

        var th=document.createElement("th");
        //th.setAttribute("onresize","resizeColumnPerc(this)");
        th.setAttribute("colonna",header.value);
        th.setAttribute("class","reportOrdiniClientiTableCell"+header.value);
        th.setAttribute("id","reportOrdiniClientiTableHeader"+header.value);
        th.setAttribute("onclick","openFilterMenu(event,'"+header.value+"',"+colNum+",this)");

        var span=document.createElement("span");
        span.innerHTML=header.label;
        span.setAttribute("title",header.value);
        span.setAttribute("class","reportOrdiniClientiTableHeaderSpan");
        th.appendChild(span);

        var i=document.createElement("i");
        i.setAttribute("class","far fa-filter");
        th.appendChild(i);

        var resizeDiv=document.createElement("div");
        resizeDiv.setAttribute("class","resize-div-th");
        resizeDiv.setAttribute("title","Ridimensiona colonna");
        resizeDiv.setAttribute("colonna",header.value);
        th.appendChild(resizeDiv);

        tr.appendChild(th);

        createFilterMenu(header.value,header.data_type);
        colNum++;
    });
    thead.appendChild(tr);
    table.appendChild(thead);

    ordiniLenght=0;
    tbody=document.createElement("tbody");
    tbody.setAttribute("onscroll","closeContextMenuOrdineCliente();checkCaricaAltriOrdini(this)")
    ordini.forEach(function (ordine)
    {
        if(ordiniLenght<steps2)
        {
            var tr=document.createElement("tr");
            tr.setAttribute("id","reportOrdiniClientiTableRow"+ordiniLenght);
            //tr.setAttribute("style","display:none");
            tr.setAttribute("rowNum",ordiniLenght);
            tr.setAttribute("onclick","selectTableRow(this)");

            headers.forEach(function (header)
            {
                filterArrays[header.value].push(ordine[header.value]);

                var td=document.createElement("td");
                td.setAttribute("class","reportOrdiniClientiTableCell"+header.value);
                if(isEven(ordiniLenght))
                    td.setAttribute("style","background-color:rgba(255, 255, 255, 0.199)");
                else
                    td.setAttribute("style","background-color:rgba(76, 146, 203, 0.199)");
                
                if(Array.isArray(ordine[header.value]) && ordine[header.value].length>1)
                {
                    if(header.value=="ordine_fornitore")
                    {
                        td.innerHTML="<span class='n-ordini-raggruppati nOrdiniRaggruppati"+ordiniLenght+"'>("+ordine[header.value].length+") </span>";
                        ordine[header.value].forEach(function(ordine_fornitore)
                        {
                            var linkOrdine=document.createElement("a");
                            linkOrdine.setAttribute("class","link-cerca-pdf-report-ordini-cliente");
                            linkOrdine.setAttribute("target","_blank");
                            linkOrdine.setAttribute("href","http://remote.oasisgroup.it/Oasis/reportMailFornitori.php?colonnaFiltro="+header.value+"&valoreFiltro="+ordine[header.value]);
                            linkOrdine.setAttribute("title","Cerca pdf...");
                            linkOrdine.innerHTML=ordine_fornitore;
                            td.appendChild(linkOrdine);
                            var br=document.createElement("br");
                            td.appendChild(br);
                        });
                        td.removeChild(td.lastChild);
                    }
                    else
                    {
                        var nOrdiniRaggruppatiSpan=document.createElement("span");
                        nOrdiniRaggruppatiSpan.setAttribute("class","n-ordini-raggruppati nOrdiniRaggruppati"+ordiniLenght);
                        nOrdiniRaggruppatiSpan.innerHTML="("+ordine[header.value].length+") ";
                        td.appendChild(nOrdiniRaggruppatiSpan);

                        ordine[header.value].forEach(function(cell)
                        {
                            var span=document.createElement("span");
                            span.setAttribute("style","white-space: nowrap;");
                            span.setAttribute("title",cell);
                            span.innerHTML=cell;
                            td.appendChild(span);
                            var br=document.createElement("br");
                            td.appendChild(br);
                        });
                        td.removeChild(td.lastChild);
                    }
                }
                else
                {
                    if(header.value!=="ordine_cliente" && header.value!=="ordine_fornitore")
                    {
                        td.innerHTML=ordine[header.value];
                        td.setAttribute("title",ordine[header.value]);
                    }
                    else
                    {
                        if(header.value=="ordine_fornitore")
                        {
                            var linkOrdine=document.createElement("a");
                            linkOrdine.setAttribute("class","link-cerca-pdf-report-ordini-cliente");
                            linkOrdine.setAttribute("target","_blank");
                            linkOrdine.setAttribute("href","http://remote.oasisgroup.it/Oasis/reportMailFornitori.php?colonnaFiltro="+header.value+"&valoreFiltro="+ordine[header.value]);
                            linkOrdine.setAttribute("title","Cerca pdf...");
                            linkOrdine.innerHTML=ordine[header.value];
                            td.appendChild(linkOrdine);
                        }
                        else
                        {
                            var linkOrdine=document.createElement("a");
                            linkOrdine.setAttribute("class","link-cerca-pdf-report-ordini-cliente");
                            linkOrdine.setAttribute("onclick","getContextMenuOrdineCliente(this,event,'"+ordine.ordine_cliente+"')");
                            linkOrdine.innerHTML=ordine[header.value];
                            td.appendChild(linkOrdine);
                        }
                    }
                }
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        }
        ordiniLenght++;
    });
    table.appendChild(tbody);
    
    container.appendChild(table);

    fixTable();

    for (var colonna in filterArrays) {
        if (Object.prototype.hasOwnProperty.call(filterArrays, colonna)) {
            var filterArrayDuplicates=filterArrays[colonna];
            var filterArray = [];
            $.each(filterArrayDuplicates, function(i, el){
                if($.inArray(el, filterArray) === -1) filterArray.push(el);
            });
            filterArray.sort();
            filterArrays[colonna]=filterArray;
        }
    }
    
    checkFilters();

    //caricaAltriOrdini();

    document.getElementById("numeroRecordReportOrdiniCliente").innerHTML=ordiniLenght;

    var btnSteps=document.createElement("button");
    btnSteps.setAttribute("onclick","caricaAltriOrdini()");
    btnSteps.setAttribute("id","btncaricaAltriOrdini");
    btnSteps.innerHTML="<i class='fal fa-plus-circle'></i><span>Carica altri...</span>";
    container.appendChild(btnSteps);

    $( ".resize-div-th" ).draggable
    ({
        axis: "x",
        start: function( event, ui )
        {
            var verticalLine=document.createElement("div");
            verticalLine.setAttribute("id","resizeDivVerticalLine");
            document.body.appendChild(verticalLine);

            this.style.backgroundColor="#DA6969";
        },
        drag: function( event, ui )
        {
            var left=event.clientX;
            $("#resizeDivVerticalLine").css("left",left+"px");
        },
        stop: function( event, ui ) 
            {
                $("#resizeDivVerticalLine").remove();
                this.style.backgroundColor="";

                $("#btnRipristinaDimensioneColonna").show("fast","swing");
                var element=this;
                var colonna=element.getAttribute("colonna");
                var resizeAmount=ui.position.left;
                resizeColumn(colonna,resizeAmount);
            }
    });

    var tableBody = document.getElementById("reportOrdiniClientiTable").getElementsByTagName("tbody")[0];
    tableBody.scrollTop = oldScrollTop;
}
function resizeColumn(colonna,resizeAmount)
{
    tableWidth=document.getElementById("reportOrdiniClientiTable").offsetWidth-8;
    if(resizeAmount>0)
    {
        resizeStep=(100*resizeAmount)/tableWidth;
        resizeColumnPerc("plus",colonna);
    }
    if(resizeAmount<0)
    {
        resizeAmount=resizeAmount*-1;
        resizeStep=(100*resizeAmount)/tableWidth;
        resizeColumnPerc("minus",colonna);
    }
}
function resizeColumnPerc(type,colonna)
{
    var headerObj=getFirstObjByPropValue(headers,"value",colonna);
    var nColumnsLeft=headers.length-headerObj.colNum;
    var resizeCompensate=resizeStep/(nColumnsLeft-1);
    var i=0;
    headers.forEach(function(header)
    {
        if(type=="plus")
        {
            if(header.value==colonna)
                header.width=header.width+resizeStep;
            else
            {
                if(header.colNum>headerObj.colNum)
                    header.width=header.width-resizeCompensate;
            }
        }
        else
        {
            if(header.value==colonna)
                header.width=header.width-resizeStep;
            else
            {
                if(header.colNum>headerObj.colNum)
                    header.width=header.width+resizeCompensate;
            }
        }
        i++;
    });
    //steps=0;
    getReportOrdiniClientiTable();
}
function fixTable()
{
    try {
        tableWidth=document.getElementById("reportOrdiniClientiTable").offsetWidth-8;

        var widths=0;
        headers.forEach(function(header)
        {
            var width=(header.width*tableWidth)/100;
            $(".reportOrdiniClientiTableCell"+header.value).css({"width":width+"px"});
            widths+=header.width;
        });
    } catch (error) {}
}
function ripristinaDimensioneColonne()
{
    $("#btnRipristinaDimensioneColonna").hide("fast","swing");
    getElencoOrdiniClienteView();
}
window.addEventListener("keydown", windowKeydown, false);
function windowKeydown(e)
{
    if(filterMenuAperto!==null)
    {
        var keyCode = e.keyCode;
        switch(keyCode) 
        {
            case 13:
                e.preventDefault();
                applyFilter(filterMenuAperto);
            break;
            case 27:
                e.preventDefault();
                hideFilterMenu();
            break;
        }
    }
}
function checkFilters()
{
    filterConditionsColumnsDuplicates=[];
    filterConditions.forEach(function(filterCondition)
    {
        filterConditionsColumnsDuplicates.push(filterCondition.colonna);
    });
    var filterConditionsColumns = [];
    $.each(filterConditionsColumnsDuplicates, function(i, el){
        if($.inArray(el, filterConditionsColumns) === -1) filterConditionsColumns.push(el);
    });
    headers.forEach(function(header)
    {
        $("#reportOrdiniClientiTableHeader"+header.value+" span").css({"color":""});
        $("#reportOrdiniClientiTableHeader"+header.value+" i").css({"color":""});
    });
    headers.forEach(function(header)
    {
        if(filterConditionsColumns.includes(header.value))
        {
            $("#reportOrdiniClientiTableHeader"+header.value+" span").css({"color":"#E9A93A"});
            $("#reportOrdiniClientiTableHeader"+header.value+" i").css({"color":"#E9A93A"});
        }
        if(orderBy!=undefined)
        {
            if(orderBy.colonna==header.value)
            {
                $("#reportOrdiniClientiTableHeader"+header.value+" span").css({"color":"#E9A93A"});
                $("#reportOrdiniClientiTableHeader"+header.value+" i").css({"color":"#E9A93A"});
            }
        }
    });
}
function hideFilterMenu()
{
    filterMenuAperto=null;
    $(".filter-menu-report-ordini-cliente").hide("fast","swing");
    $("#reportOrdiniClientiTable th").css("color","");
}
function openFilterMenu(event,colonna,colNum,th)
{
    hideFilterMenu();

    if(event.target.className=="resize-div-th" || event.target.className=="resize-div-th-item")
        return;
        
    filterMenuAperto=colonna;

    th.style.color="#4C91CB";

    $("#filterMenuReportOrdiniCliente"+colonna).show("fast","swing");
    if(colNum<headers.length/2)
    {
        $("#filterMenuReportOrdiniCliente"+colonna).css(
        {
            "display":"flex",
            "left":(event.clientX - 7),
            "top":(event.clientY+12)
        });
    }
    else
    {
        $("#filterMenuReportOrdiniCliente"+colonna).css(
        {
            "display":"flex",
            "left":(event.clientX - 240),
            "top":(event.clientY+12)
        });
    }    
}
function createFilterMenu(colonna,data_type)
{
    var menu=document.createElement("div");
    menu.setAttribute("class","filter-menu-report-ordini-cliente");
    menu.setAttribute("id","filterMenuReportOrdiniCliente"+colonna);

    var menuRow=document.createElement("div");
    menuRow.setAttribute("class","filter-menu-row-report-ordini-cliente filter-menu-title-container-report-ordini-cliente filter-menu-item-report-ordini-cliente");

    var span=document.createElement("span");
    span.setAttribute("class","filter-menu-item-report-ordini-cliente");
    span.innerHTML=colonna;
    menuRow.appendChild(span);

    var i=document.createElement("i");
    i.setAttribute("class","fal fa-times filter-menu-item-report-ordini-cliente");
    i.setAttribute("onclick","hideFilterMenu()");
    menuRow.appendChild(i);

    menu.appendChild(menuRow);

    var menuRow=document.createElement("div");
    menuRow.setAttribute("class","filter-menu-row-report-ordini-cliente filter-menu-order-container-report-ordini-cliente filter-menu-item-report-ordini-cliente");

    var orderButton=document.createElement("button");
    orderButton.setAttribute("onclick","setOrderBy('"+colonna+"','DESC',this)");
    orderButton.setAttribute("class","filter-menu-item-report-ordini-cliente filter-menu-order-button-report-ordini-cliente");
    orderButton.setAttribute("id","orderButton"+colonna+"DESC");
    try {
        if(colonna==orderBy.colonna && orderBy.tipo=="DESC")
        {
            orderButton.setAttribute("style","color:#E9A93A");
        }
    } catch (error) {}
    
    var i=document.createElement("i");
    i.setAttribute("class","fal fa-sort-amount-down filter-menu-item-report-ordini-cliente");
    orderButton.appendChild(i);

    var span=document.createElement("span");
    span.setAttribute("class","filter-menu-item-report-ordini-cliente");
    span.innerHTML="Ordinamento decrescente";
    orderButton.appendChild(span);

    menuRow.appendChild(orderButton);

    var orderButton=document.createElement("button");
    orderButton.setAttribute("onclick","setOrderBy('"+colonna+"','ASC',this)");
    orderButton.setAttribute("class","filter-menu-item-report-ordini-cliente filter-menu-order-button-report-ordini-cliente");
    orderButton.setAttribute("id","orderButton"+colonna+"ASC");
    try {
        if(colonna==orderBy.colonna && orderBy.tipo=="ASC")
        {
            orderButton.setAttribute("style","color:#E9A93A");
        }
    } catch (error) {}

    var i=document.createElement("i");
    i.setAttribute("class","fal fa-sort-amount-down-alt filter-menu-item-report-ordini-cliente");
    orderButton.appendChild(i);

    var span=document.createElement("span");
    span.setAttribute("class","filter-menu-item-report-ordini-cliente");
    span.innerHTML="Ordinamento crescente";
    orderButton.appendChild(span);

    menuRow.appendChild(orderButton);

    menu.appendChild(menuRow);

    //var header=getFirstObjByPropValue(headers,"value",colonna);

    var menuRow=document.createElement("div");
    menuRow.setAttribute("class","filter-menu-row-report-ordini-cliente filter-menu-conditions-container-report-ordini-cliente filter-menu-item-report-ordini-cliente");

    var buttonCancella=document.createElement("button");
    buttonCancella.setAttribute("onclick","cleanInputFiltri('"+colonna+"','"+data_type+"')");
    buttonCancella.setAttribute("class","filter-menu-conditions-button-cancella-report-ordini-cliente filter-menu-item-report-ordini-cliente");
    buttonCancella.innerHTML="Cancella filtri";
    menuRow.appendChild(buttonCancella);

    if(data_type=="date")
    {
        var conditionContainer=document.createElement("div");
        conditionContainer.setAttribute("class","filter-menu-item-report-ordini-cliente");

        var span=document.createElement("span");
        span.setAttribute("class","filter-menu-item-report-ordini-cliente");
        span.innerHTML="Uguale a";
        conditionContainer.appendChild(span);

        var input=document.createElement("input");
        input.setAttribute("class","filter-menu-item-report-ordini-cliente filter-menu-report-ordini-cliente-input-filtro");
        input.setAttribute("id","filterUguale"+colonna);
        input.setAttribute("type","date");
        conditionContainer.appendChild(input);

        menuRow.appendChild(conditionContainer);

        var conditionContainer=document.createElement("div");
        conditionContainer.setAttribute("class","filter-menu-item-report-ordini-cliente");

        var span=document.createElement("span");
        span.setAttribute("class","filter-menu-item-report-ordini-cliente");
        span.innerHTML="Anno";
        conditionContainer.appendChild(span);

        var input=document.createElement("input");
        input.setAttribute("class","filter-menu-item-report-ordini-cliente filter-menu-report-ordini-cliente-input-filtro");
        input.setAttribute("id","filterAnno"+colonna);
        input.setAttribute("type","search");
        //accrocchio
        try {
            if(filterConditions[0].default && colonna=="data_spedizione")
            {
                var oggi = new Date();
                input.value=oggi.getFullYear();
            }
        } catch (error) {}
        
        conditionContainer.appendChild(input);

        menuRow.appendChild(conditionContainer);

        var conditionContainer=document.createElement("div");
        conditionContainer.setAttribute("class","filter-menu-item-report-ordini-cliente");
        conditionContainer.setAttribute("style","flex-direction:column");

        var conditionContainerRow=document.createElement("div");
        conditionContainerRow.setAttribute("class","filter-menu-item-report-ordini-cliente");
        conditionContainerRow.setAttribute("style","padding:0px");

        var span=document.createElement("span");
        span.setAttribute("class","filter-menu-item-report-ordini-cliente");
        span.innerHTML="Da";
        conditionContainerRow.appendChild(span);

        var input=document.createElement("input");
        input.setAttribute("class","filter-menu-item-report-ordini-cliente filter-menu-report-ordini-cliente-input-filtro");
        input.setAttribute("id","filterIntervalloDa"+colonna);
        input.setAttribute("type","date");
        conditionContainerRow.appendChild(input);

        conditionContainer.appendChild(conditionContainerRow);

        var conditionContainerRow=document.createElement("div");
        conditionContainerRow.setAttribute("class","filter-menu-item-report-ordini-cliente");
        conditionContainerRow.setAttribute("style","padding:0px;padding-top:2px");

        var span=document.createElement("span");
        span.setAttribute("class","filter-menu-item-report-ordini-cliente");
        span.innerHTML="A";
        conditionContainerRow.appendChild(span);

        var input=document.createElement("input");
        input.setAttribute("class","filter-menu-item-report-ordini-cliente filter-menu-report-ordini-cliente-input-filtro");
        input.setAttribute("id","filterIntervalloA"+colonna);
        input.setAttribute("type","date");
        conditionContainerRow.appendChild(input);

        conditionContainer.appendChild(conditionContainerRow);

        menuRow.appendChild(conditionContainer);

        menu.appendChild(menuRow);
    }
    else
    {
        var conditionContainer=document.createElement("div");
        conditionContainer.setAttribute("class","filter-menu-item-report-ordini-cliente");

        var span=document.createElement("span");
        span.setAttribute("class","filter-menu-item-report-ordini-cliente");
        span.innerHTML="Uguale a";
        conditionContainer.appendChild(span);

        var input=document.createElement("input");
        input.setAttribute("class","filter-menu-item-report-ordini-cliente filter-menu-report-ordini-cliente-input-filtro");
        input.setAttribute("placeholder","NULL per vuoto");
        input.setAttribute("id","filterUguale"+colonna);
        input.setAttribute("type","search");
        conditionContainer.appendChild(input);

        menuRow.appendChild(conditionContainer);

        var conditionContainer=document.createElement("div");
        conditionContainer.setAttribute("class","filter-menu-item-report-ordini-cliente");

        var span=document.createElement("span");
        span.setAttribute("class","filter-menu-item-report-ordini-cliente");
        span.innerHTML="Diverso da";
        conditionContainer.appendChild(span);

        var input=document.createElement("input");
        input.setAttribute("class","filter-menu-item-report-ordini-cliente filter-menu-report-ordini-cliente-input-filtro");
        input.setAttribute("placeholder","NULL per vuoto");
        input.setAttribute("id","filterDiverso"+colonna);
        input.setAttribute("type","search");
        conditionContainer.appendChild(input);

        menuRow.appendChild(conditionContainer);

        var conditionContainer=document.createElement("div");
        conditionContainer.setAttribute("class","filter-menu-item-report-ordini-cliente");

        var span=document.createElement("span");
        span.setAttribute("class","filter-menu-item-report-ordini-cliente");
        span.innerHTML="Contiene";
        conditionContainer.appendChild(span);

        var input=document.createElement("input");
        input.setAttribute("class","filter-menu-item-report-ordini-cliente filter-menu-report-ordini-cliente-input-filtro");
        input.setAttribute("id","filterContiene"+colonna);
        input.setAttribute("type","search");
        conditionContainer.appendChild(input);

        menuRow.appendChild(conditionContainer);

        var conditionContainer=document.createElement("div");
        conditionContainer.setAttribute("class","filter-menu-item-report-ordini-cliente");

        var span=document.createElement("span");
        span.setAttribute("class","filter-menu-item-report-ordini-cliente");
        span.innerHTML="Inizia con";
        conditionContainer.appendChild(span);

        var input=document.createElement("input");
        input.setAttribute("class","filter-menu-item-report-ordini-cliente filter-menu-report-ordini-cliente-input-filtro");
        input.setAttribute("id","filterInizia"+colonna);
        input.setAttribute("type","search");
        conditionContainer.appendChild(input);

        menuRow.appendChild(conditionContainer);

        var conditionContainer=document.createElement("div");
        conditionContainer.setAttribute("class","filter-menu-item-report-ordini-cliente");

        var span=document.createElement("span");
        span.setAttribute("class","filter-menu-item-report-ordini-cliente");
        span.innerHTML="Finisce con";
        conditionContainer.appendChild(span);

        var input=document.createElement("input");
        input.setAttribute("class","filter-menu-item-report-ordini-cliente filter-menu-report-ordini-cliente-input-filtro");
        input.setAttribute("id","filterFinisce"+colonna);
        input.setAttribute("type","search");
        conditionContainer.appendChild(input);

        menuRow.appendChild(conditionContainer);

        if(data_type=="number")
        {
            var conditionContainer=document.createElement("div");
            conditionContainer.setAttribute("class","filter-menu-item-report-ordini-cliente");
            conditionContainer.setAttribute("style","flex-direction:column");
    
            var conditionContainerRow=document.createElement("div");
            conditionContainerRow.setAttribute("class","filter-menu-item-report-ordini-cliente");
            conditionContainerRow.setAttribute("style","padding:0px");
    
            var span=document.createElement("span");
            span.setAttribute("class","filter-menu-item-report-ordini-cliente");
            span.innerHTML="Da";
            conditionContainerRow.appendChild(span);
    
            var input=document.createElement("input");
            input.setAttribute("class","filter-menu-item-report-ordini-cliente filter-menu-report-ordini-cliente-input-filtro");
            input.setAttribute("id","filterIntervalloDa"+colonna);
            input.setAttribute("type","search");
            conditionContainerRow.appendChild(input);
    
            conditionContainer.appendChild(conditionContainerRow);
    
            var conditionContainerRow=document.createElement("div");
            conditionContainerRow.setAttribute("class","filter-menu-item-report-ordini-cliente");
            conditionContainerRow.setAttribute("style","padding:0px;padding-top:2px");
    
            var span=document.createElement("span");
            span.setAttribute("class","filter-menu-item-report-ordini-cliente");
            span.innerHTML="A";
            conditionContainerRow.appendChild(span);
    
            var input=document.createElement("input");
            input.setAttribute("class","filter-menu-item-report-ordini-cliente filter-menu-report-ordini-cliente-input-filtro");
            input.setAttribute("id","filterIntervalloA"+colonna);
            input.setAttribute("type","search");
            conditionContainerRow.appendChild(input);
    
            conditionContainer.appendChild(conditionContainerRow);
    
            menuRow.appendChild(conditionContainer);
        }

        menu.appendChild(menuRow);
    }

    var filterConfirmButton=document.createElement("button");
    filterConfirmButton.setAttribute("class","filter-menu-report-ordini-cliente-confirm-button filter-menu-item-report-ordini-cliente");
    filterConfirmButton.setAttribute("id","filterMenuReportOrdiniClienteConfirmButton"+colonna);
    filterConfirmButton.setAttribute("onclick","applyFilter('"+colonna+"')");
    var span=document.createElement("span");
    span.setAttribute("class","filter-menu-item-report-ordini-cliente");
    span.innerHTML="Applica filtro";
    filterConfirmButton.appendChild(span);
    menu.appendChild(filterConfirmButton);

    document.body.appendChild(menu);
}
function setOrderBy(colonna,tipo,button)
{
    orderBy=
    {
        colonna,
        tipo
    };
    //orderBy='ORDER BY ['+colonna+'] '+tipo;
    $(".filter-menu-order-button-report-ordini-cliente").css("color","white");
    button.style.color='#E9A93A';
}
function cleanInputFiltri(colonna,data_type)
{
    var header=getFirstObjByPropValue(headers,"value",colonna);

    if(data_type=="date")
    {
        document.getElementById("filterUguale"+colonna).value="";
        document.getElementById("filterAnno"+colonna).value="";
        document.getElementById("filterIntervalloDa"+colonna).value="";
        document.getElementById("filterIntervalloA"+colonna).value="";
    }
    else
    {
        document.getElementById("filterUguale"+colonna).value="";
        document.getElementById("filterDiverso"+colonna).value="";
        document.getElementById("filterContiene"+colonna).value="";
        document.getElementById("filterInizia"+colonna).value="";
        document.getElementById("filterFinisce"+colonna).value="";
        if(header.data_type=="number")
        {
            document.getElementById("filterIntervalloDa"+colonna).value="";
            document.getElementById("filterIntervalloA"+colonna).value="";
        }
    }
}
function applyFilter(colonna)
{
    var header=getFirstObjByPropValue(headers,"value",colonna);

    if(header.data_type=="date")
    {
        var uguale=document.getElementById("filterUguale"+colonna).value;
        var anno=parseInt(document.getElementById("filterAnno"+colonna).value).toString();
        if(anno.indexOf("NaN")>-1)
        {
            document.getElementById("filterAnno"+colonna).value="";
            anno="";
        }
        var da=document.getElementById("filterIntervalloDa"+colonna).value;
        var a=document.getElementById("filterIntervalloA"+colonna).value;
        
        filterConditions.forEach(function(filterCondition)
        {
            if(filterCondition.colonna==colonna && filterCondition.nome=="uguale")
            {
                var index=filterConditions.indexOf(filterCondition);
                filterConditions.splice(index,1);
            }
        });
        if(uguale!="")
        {
            filterCondition=
            {
                colonna,
                nome:"uguale",
                operatore:"=",
                valore:"'"+uguale+"'",
                input:uguale,
                label:colonna+" = "+uguale
            }
            filterConditions.push(filterCondition);
        }

        filterConditions.forEach(function(filterCondition)
        {
            if(filterCondition.colonna==colonna && filterCondition.nome=="anno")
            {
                var index=filterConditions.indexOf(filterCondition);7
                filterConditions.splice(index,1);
            }
        });
        if(anno!="")
        {
            filterCondition=
            {
                colonna,
                nome:"anno",
                /*operatore:"IN",
                valore:"(SELECT ["+colonna+"] FROM report_ordini_clienti_view WHERE DATEPART(yy,["+colonna+"]) = "+anno+")",*/
                operatore:"BETWEEN",
                valore:"'01-01-"+anno+"' AND '12-31-"+anno+"'",
                input:anno,
                label:"anno di "+colonna+" = "+anno
            }
            filterConditions.push(filterCondition);
        }

        filterConditions.forEach(function(filterCondition)
        {
            if(filterCondition.colonna==colonna && filterCondition.nome=="intervallo")
            {
                var index=filterConditions.indexOf(filterCondition);
                filterConditions.splice(index,1);
            }
        });
        if(da!="" && a!="")
        {
            filterCondition=
            {
                colonna,
                nome:"intervallo",
                operatore:"BETWEEN",
                valore:"'"+da+"' AND '"+a+"'",
                input:da,
                input1:a,
                label:colonna+" da "+da+" a "+a
            }
            filterConditions.push(filterCondition);
        }
    }
    else
    {
        var uguale=document.getElementById("filterUguale"+colonna).value.replace("'", "''");
        var diverso=document.getElementById("filterDiverso"+colonna).value.replace("'", "''");
        var contiene=document.getElementById("filterContiene"+colonna).value.replace("'", "''");
        var inizia=document.getElementById("filterInizia"+colonna).value.replace("'", "''");
        var finisce=document.getElementById("filterFinisce"+colonna).value.replace("'", "''");

        filterConditions.forEach(function(filterCondition)
        {
            if(filterCondition.colonna==colonna && filterCondition.nome=="uguale")
            {
                var index=filterConditions.indexOf(filterCondition);
                filterConditions.splice(index,1);
            }
        });
        if(uguale!="")
        {
            if(uguale.toLowerCase()==="null")
            {
                filterCondition=
                {
                    colonna,
                    nome:"uguale",
                    operatore:"IS",
                    valore:"NULL",
                    input:uguale,
                    label:colonna+" = "+uguale
                }
            }
            else
            {
                filterCondition=
                {
                    colonna,
                    nome:"uguale",
                    operatore:"=",
                    valore:"'"+uguale+"'",
                    input:uguale,
                    label:colonna+" = "+uguale
                }
            }
            filterConditions.push(filterCondition);
        }

        filterConditions.forEach(function(filterCondition)
        {
            if(filterCondition.colonna==colonna && filterCondition.nome=="diverso")
            {
                var index=filterConditions.indexOf(filterCondition);
                filterConditions.splice(index,1);
            }
        });
        if(diverso!="")
        {
            if(diverso.toLowerCase()==="null")
            {
                filterCondition=
                {
                    colonna,
                    nome:"diverso",
                    operatore:"IS",
                    valore:"NOT NULL",
                    input:diverso,
                    label:colonna+" <> "+diverso
                }
            }
            else
            {
                filterCondition=
                {
                    colonna,
                    nome:"diverso",
                    operatore:"<>",
                    valore:"'"+diverso+"'",
                    input:diverso,
                    label:colonna+" <> "+diverso
                }
            }
            filterConditions.push(filterCondition);
        }

        filterConditions.forEach(function(filterCondition)
        {
            if(filterCondition.colonna==colonna && filterCondition.nome=="contiene")
            {
                var index=filterConditions.indexOf(filterCondition);
                filterConditions.splice(index,1);
            }
        });
        if(contiene!="")
        {
            filterCondition=
            {
                colonna,
                nome:"contiene",
                operatore:"LIKE",
                valore:"'%"+contiene+"%'",
                input:contiene,
                label:colonna+" contiene "+contiene
            }
            filterConditions.push(filterCondition);
        }
        filterConditions.forEach(function(filterCondition)
        {
            if(filterCondition.colonna==colonna && filterCondition.nome=="inizia")
            {
                var index=filterConditions.indexOf(filterCondition);
                filterConditions.splice(index,1);
            }
        });
        if(inizia!="")
        {
            filterCondition=
            {
                colonna,
                nome:"inizia",
                operatore:"LIKE",
                valore:"'"+inizia+"%'",
                input:inizia,
                label:colonna+" inizia con "+inizia
            }
            filterConditions.push(filterCondition);
        }
        filterConditions.forEach(function(filterCondition)
        {
            if(filterCondition.colonna==colonna && filterCondition.nome=="finisce")
            {
                var index=filterConditions.indexOf(filterCondition);
                filterConditions.splice(index,1);
            }
        });
        if(finisce!="")
        {
            filterCondition=
            {
                colonna,
                nome:"finisce",
                operatore:"LIKE",
                valore:"'%"+finisce+"'",
                input:finisce,
                label:colonna+" finisce con "+finisce
            }
            filterConditions.push(filterCondition);
        }

        if(header.data_type=="number")
        {
            var da=parseInt(document.getElementById("filterIntervalloDa"+colonna).value).toString();
            if(da.indexOf("NaN")>-1)
            {
                document.getElementById("filterIntervalloDa"+colonna).value="";
                document.getElementById("filterIntervalloA"+colonna).value="";
                da="";
            }
            var a=parseInt(document.getElementById("filterIntervalloA"+colonna).value).toString();
            if(a.indexOf("NaN")>-1)
            {
                document.getElementById("filterIntervalloDa"+colonna).value="";
                document.getElementById("filterIntervalloA"+colonna).value="";
                a="";
            }
            
            filterConditions.forEach(function(filterCondition)
            {
                if(filterCondition.colonna==colonna && filterCondition.nome=="intervallo")
                {
                    var index=filterConditions.indexOf(filterCondition);
                    filterConditions.splice(index,1);
                }
            });
            if(da!="" && a!="")
            {
                filterCondition=
                {
                    colonna,
                    nome:"intervallo",
                    operatore:"BETWEEN",
                    valore:""+da+" AND "+a+"",
                    input:da,
                    input1:a,
                    label:colonna+" da "+da+" a "+a
                }
                filterConditions.push(filterCondition);
            }
        }
    }

    hideFilterMenu();
    //steps=0;
    getElencoOrdiniClienteView();
}
function caricaAltriOrdini()
{
    steps2+=steps2Size;
    /*var tableBody = document.getElementById("reportOrdiniClientiTable").getElementsByTagName("tbody")[0];
    var oldScrollTop=tableBody.scrollTop;*/

    getReportOrdiniClientiTable();

    /*var tableBody = document.getElementById("reportOrdiniClientiTable").getElementsByTagName("tbody")[0];
    tableBody.scrollTop = oldScrollTop;*/
    
    /*for (let index = steps; index < steps+stepsSize; index++)
    {
        $("#reportOrdiniClientiTableRow"+index).show();
    }
    steps+=stepsSize;

    if(steps>=ordiniLenght)
    {
        setTimeout(function()
        {
            try {
                document.getElementById("btncaricaAltriOrdini").style.display="none";
            } catch (error) {console.log("errsteps")}
        }, 500);
    }*/
}
function unselectTableRow()
{
    $("#reportOrdiniClientiTable tr").attr("onclick","selectTableRow(this)");
    
    $(".n-ordini-raggruppati").show()
    $("#reportOrdiniClientiTable tr").css({"background-color":""});
    $("#reportOrdiniClientiTable td").css(
    {
        "white-space":"",
        "overflow-y":"",
        "height":"",
        "line-height":"",
        "padding-top":"",
        "padding-bottom":"",
        "word-break":""
    });
}
function selectTableRow(row)
{
    var i=row.getAttribute("rowNum");
    
    unselectTableRow();

    row.setAttribute("onclick","unselectTableRow()");

    try {
        $(".nOrdiniRaggruppati"+i).hide();
    } catch (error) {}

    $("#reportOrdiniClientiTableRow"+i).css({"background-color":"#557486b7",});
    $("#reportOrdiniClientiTableRow"+i+" td").css(
    {
        "white-space":"normal",
        "overflow-y":"visible",
        "height":"auto",
        "line-height":"normal",
        "padding-top":"5.5px",
        "padding-bottom":"5.5px"/*,
        "word-break":"break-all"*/
    });
    
    var maxHeight = Math.max.apply(null, $("#reportOrdiniClientiTableRow"+i+" td").map(function ()
    {
        return $(this).height();
    }).get());
    maxHeight+=11;

    $("#reportOrdiniClientiTableRow"+i+" td").css(
    {
        "height":maxHeight+"px"
    });
}
function isEven(value) {
	if (value%2 == 0)
		return true;
	else
		return false;
}
function getOrdiniClienteView()
{
    return new Promise(function (resolve, reject) 
    {
        var JSONfilterConditions=JSON.stringify(filterConditions);
        $.get("getOrdiniClienteView.php",
        {
            JSONfilterConditions,
            orderBy,
            filtroAnni
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
function getSalvaFiltroPopup()
{
    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","popup-report-ordini-cliente-outer-container");

    var row=document.createElement("div");
    row.setAttribute("style","width:100%;color:#ddd;font-size: 12px;text-align:left;font-weight: normal;font-family: 'Quicksand',sans-serif;margin-bottom:5px;text-decoration:underline");
    row.innerHTML="Nome";
    outerContainer.appendChild(row);

    var row=document.createElement("div");
    row.setAttribute("style","width:100%;margin-bottom:5px;justify-content:flex-start");

    var input=document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("class","popup-report-ordini-cliente-input");
    input.setAttribute("id","popupSalvaFiltroNome");
    
    row.appendChild(input);

    outerContainer.appendChild(row);

    var row=document.createElement("div");
    row.setAttribute("style","width:100%;color:#ddd;font-size: 12px;text-align:left;font-weight: normal;font-family: 'Quicksand',sans-serif;margin-bottom:5px;text-decoration:underline");
    row.innerHTML="Descrizione";
    outerContainer.appendChild(row);

    var row=document.createElement("div");
    row.setAttribute("style","width:100%;margin-bottom:5px;justify-content:flex-start");

    var input=document.createElement("textarea");
    input.setAttribute("class","popup-report-ordini-cliente-input");
    input.setAttribute("id","popupSalvaFiltroDescrizione");
    
    row.appendChild(input);

    outerContainer.appendChild(row);

    var row=document.createElement("div");
    row.setAttribute("style","width:100%;color:#ddd;font-size: 12px;text-align:left;font-weight: normal;font-family: 'Quicksand',sans-serif;margin-bottom:5px;text-decoration:underline");
    row.innerHTML="Filtro";
    outerContainer.appendChild(row);

    var row=document.createElement("div");
    row.setAttribute("style","width:100%;margin-bottom:5px;justify-content:flex-start");

    var input=document.createElement("textarea");
    input.setAttribute("class","popup-report-ordini-cliente-input");
    input.setAttribute("disabled","disabled");
    input.setAttribute("style","overflow:auto");
    if(filterConditions.length==0)
        var filterConditionsString="Nessuno";
    else
    {
        var filterConditionsString="";
        filterConditions.forEach(function(filterCondition)
        {
            //filterConditionsString+=filterCondition.colonna+" "+filterCondition.operatore+" "+filterCondition.valore+"\n";
            filterConditionsString+=filterCondition.label+"\n";
        });
        filterConditionsString = filterConditionsString.substring(0, filterConditionsString.length - 1);
    }
    input.innerHTML=filterConditionsString;
    
    row.appendChild(input);
    outerContainer.appendChild(row);

    var row=document.createElement("div");
    row.setAttribute("style","width:100%;color:#ddd;font-size: 12px;text-align:left;font-weight: normal;font-family: 'Quicksand',sans-serif;margin-bottom:5px;text-decoration:underline");
    row.innerHTML="Ordinamento";
    outerContainer.appendChild(row);

    var row=document.createElement("div");
    row.setAttribute("style","width:100%;margin-bottom:5px;justify-content:flex-start");

    var input=document.createElement("textarea");
    input.setAttribute("class","popup-report-ordini-cliente-input");
    input.setAttribute("disabled","disabled");
    if(orderBy==undefined)
        var orderByString="Nessuno";
    else
    {
        var orderByString=orderBy.colonna;
        if(orderBy.tipo=="DESC")
            orderByString+=" decrescente";
        else
            orderByString+=" crescente";
    }
    input.innerHTML=orderByString;
    
    row.appendChild(input);

    outerContainer.appendChild(row);

    var row=document.createElement("div");
    row.setAttribute("class","popup-report-ordini-cliente-row");
    row.setAttribute("style","width:100%;flex-direction:row;align-items:center;justify-content:space-between;flex-direction:row;margin-top:10px");

    var rinominaButton=document.createElement("button");
    rinominaButton.setAttribute("class","popup-report-ordini-cliente-button");
    rinominaButton.setAttribute("style","width:100%;");
    rinominaButton.setAttribute("onclick","salvaFiltro()");
    rinominaButton.innerHTML='<span>Salva filtro</span><i class="fal fa-save"></i>';
    row.appendChild(rinominaButton);    

    outerContainer.appendChild(row);

    Swal.fire
    ({
        background:"#404040",
        title:"Salvataggio filtro corrente",
        onOpen : function()
                {
                    document.getElementsByClassName("swal2-title")[0].style.fontWeight="normal";
                    document.getElementsByClassName("swal2-title")[0].style.maxWidth="70%";
                    document.getElementsByClassName("swal2-title")[0].style.boxSizing="border-box";
                    document.getElementsByClassName("swal2-title")[0].style.marginLeft="10px";
                    document.getElementsByClassName("swal2-title")[0].style.marginTop="15px";
                    document.getElementsByClassName("swal2-title")[0].style.marginRight="10px";
                    document.getElementsByClassName("swal2-title")[0].style.whiteSpace="nowrap";
                    document.getElementsByClassName("swal2-title")[0].style.overflow="hidden";
                    document.getElementsByClassName("swal2-title")[0].style.textOverflow="ellipsis";
                    document.getElementsByClassName("swal2-popup")[0].style.padding="0px";
                    document.getElementsByClassName("swal2-close")[0].style.outline="none";
                },
        showCloseButton:true,
        showConfirmButton:false,
        showCancelButton:false,
        html:outerContainer.outerHTML
    }).then((result) => 
    {
        
    });
}
function salvaFiltro()
{
    var nome=document.getElementById("popupSalvaFiltroNome").value;
    var descrizione=document.getElementById("popupSalvaFiltroDescrizione").value;
    
    if(nome=="")
    {
        Swal.fire(
        {
            background:"#404040",
            icon:"error",
            title: "Compila il nome",
            onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}
        }).then((result) => 
        {
            getSalvaFiltroPopup();
        });
    }
    else
    {
        var filterConditionsString=JSON.stringify(filterConditions);
        var orderByString=JSON.stringify(orderBy);
        $.post("salvaFiltroReportOrdiniCliente.php",
        {
            nome,
            descrizione,
            filterConditionsString,
            orderByString
        },
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                }
                else
                {
                    Swal.fire(
                    {
                        background:"#404040",
                        icon:"success",
                        title: "Filtro salvato",
                        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}
                    });
                }
            }
            else
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(status);
            }
        });
    }
}
function getFirstObjByPropValue(array,prop,propValue)
{
    var return_item;
    array.forEach(function(item)
    {
        if(item[prop]==propValue)
        {
            return_item= item;
        }
    });
    return return_item;
}
async function esportaExcel(tipo)
{
    var tableID=await preparaTabellaEsportazione(tipo);

    exportTableToExcel(tableID, "reportOrdiniClienti");

    document.getElementById("exportTableContainer").remove();

    steps2=oldSteps2;
    getReportOrdiniClientiTable();
}
function preparaTabellaEsportazione(tipo)
{
    return new Promise(function (resolve, reject) 
    {
        oldSteps2=steps2;
        steps2=ordiniLenght;
        getReportOrdiniClientiTable();
        var tabella=document.getElementById("reportOrdiniClientiTable");
        var exportTable = tabella.cloneNode(true);
        exportTable.id="reportOrdiniClientiExportTable";

        var container=document.createElement("div");
        container.setAttribute("id","exportTableContainer");
        container.setAttribute("style","display:none");

        $("#reportOrdiniClientiExportTable i").remove();
        for (var i = 0, row; row = exportTable.rows[i]; i++) 
        {
            row.style.display="block";
            for (var j = 0, col; col = row.cells[j]; j++) 
            {
                col.innerHTML=col.innerHTML.replace("<br>","-");
                var text=col.innerText;
                text=text.replace("€","");
                col.innerHTML=text;
            }  
        }
        if(tipo!="*")
        {
            for (var i = 0, row; row = exportTable.rows[i]; i++) 
            {
                for (var j = 0, col; col = row.cells[j]; j++) 
                {
                    if(j>13)
                        col.setAttribute("class","toberemoved");
                }  
            }
        }

        container.appendChild(exportTable);

        document.body.appendChild(container);

        $(".toberemoved").remove();

        resolve("reportOrdiniClientiExportTable");
    });
    
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
window.addEventListener("click", windowClick, false);
function windowClick(e)
{
    if(e.target.tagName!=="TD" && e.target.tagName!=="TR" && e.target.tagName!=="TBODY")
    {
        unselectTableRow();
    }
    //console.log(e.target.className.indexOf("filter-menu-item-report-ordini-cliente"));
    if(e.target.className==="far fa-filter" || e.target.className==="reportOrdiniClientiTableHeaderSpan" || e.target.id.indexOf("reportOrdiniClientiTableHeader")>-1 || e.target.className==="filter-menu-report-ordini-cliente" || e.target.className.indexOf("filter-menu-item-report-ordini-cliente")!==-1)
    {
        //console.log("non chiudere popup filtro")
    }
    else
    {
        hideFilterMenu();
    }
    try {
        if(e.target.className!="link-cerca-pdf-report-ordini-cliente" && e.target.className!="ordine-cliente-context-menu-outer-container" && e.target.parentElement.className!="ordine-cliente-context-menu-item")
        {
            closeContextMenuOrdineCliente();
        }
    } catch (error) {
        closeContextMenuOrdineCliente();
    }
}
function raggruppaOrdini()
{
    var ordiniCliente=[];
    ordini.forEach(function(ordine)
    {
        ordiniCliente.push(ordine.ordine_cliente);
    });
    var ordiniClienteDistinct = [];
    $.each(ordiniCliente, function(i, el){
        if($.inArray(el, ordiniClienteDistinct) === -1) ordiniClienteDistinct.push(el);
    });
    //console.log(ordiniCliente);
    var objOrdiniCliente=[];
    ordiniClienteDistinct.forEach(function(ordine_cliente)
    {
        var ordine=getFirstObjByPropValue(ordini,"ordine_cliente",ordine_cliente);
        var ordineCliente=
        {
            Statistical_group_code:ordine.Statistical_group_code,
            Statistical_group_name:ordine.Statistical_group_name,
            data_spedizione:ordine.data_spedizione,
            fatturato_da_spedire:ordine.fatturato_da_spedire,
            fatturato_spedito:ordine.fatturato_spedito,
            importo_da_pagare:ordine.importo_da_pagare,
            importo_incassato:ordine.importo_incassato,
            importo_totale:ordine.importo_totale,
            linea_business:ordine.linea_business,
            nome_cliente:ordine.nome_cliente,
            note:ordine.note,
            ordine_cliente:ordine.ordine_cliente,
            tipo:ordine.tipo,
            tipo_pagamento:ordine.tipo_pagamento
        };
        objOrdiniCliente.push(ordineCliente);
    });
    var ordiniRaggruppati=[];
    objOrdiniCliente.forEach(function(ordineCliente)
    {
        var ordineRaggruppato=ordineCliente;
        ordineRaggruppato.ordine_fornitore=getInfoOrdineFornitoreString("ordine_fornitore",ordineCliente.ordine_cliente);
        ordineRaggruppato.nome_fornitore=getInfoOrdineFornitoreString("nome_fornitore",ordineCliente.ordine_cliente);
        ordineRaggruppato.data_creazione_ordine=getInfoOrdineFornitoreString("data_creazione_ordine",ordineCliente.ordine_cliente);
        ordineRaggruppato.data_arrivo_merce=getInfoOrdineFornitoreString("data_arrivo_merce",ordineCliente.ordine_cliente);
        ordineRaggruppato.stato=getInfoOrdineFornitoreString("stato",ordineCliente.ordine_cliente);
        ordineRaggruppato.importo_ordine_fornitore=getInfoOrdineFornitoreString("importo_ordine_fornitore",ordineCliente.ordine_cliente);
        ordiniRaggruppati.push(ordineRaggruppato);
    });
    ordini=ordiniRaggruppati;
}
function toggleRaggruppaOrdini(button)
{
    var icon=button.getElementsByTagName("i")[0];
    var span=button.getElementsByTagName("span")[0];

    if(raggruppati)
    {
        span.innerHTML="Raggruppa ordini";
        icon.className="fal fa-object-group"; 
        //steps=0;
        getElencoOrdiniClienteView();       
        raggruppati=false;
    }
    else
    {
        span.innerHTML="Rimuovi raggruppamento";
        icon.className="fal fa-object-ungroup";      
        
        raggruppaOrdini();

        //steps=0;
        getReportOrdiniClientiTable();
        raggruppati=true;
    }
}
function getInfoOrdineFornitoreString(colonna,ordine_cliente)
{
    var info=[];
    ordini.forEach(ordine => {
        if(ordine.ordine_cliente==ordine_cliente)
            info.push(ordine[colonna]);
    });
    return info;
}
function aggiornaOrdiniClienteView()
{
    Swal.fire
    ({
        title: "Aggiornamento in corso...",
        html: '<i style="color:white" class="fad fa-spinner-third fa-spin fa-4x"></i>',
        showConfirmButton:false,
        showCloseButton:false,
        allowEscapeKey:false,
        allowOutsideClick:false,
        background:"transparent",
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
    });

    $.post("aggiornaOrdiniClienteView.php",
    {
        id_utente
    },
    function(response, status)
    {
        if(status=="success")
        {
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
            }
            else
            {
                Swal.fire
                ({
                    background:"#404040",
                    icon:"success",
                    title: "Dati aggiornati",
                    showConfirmButton:false,
                    showCloseButton:true,
                    onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
                }).then((result) => 
                {
                    getUltimoAggiornamento();
                    getElencoOrdiniClienteView();
                });
            }
        }
        else
        {
            Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
            console.log(status);
        }
    });
}
function getUltimoAggiornamento()
{
    $.get("getUltimoAggiornamentoOrdiniClienteTable.php",
    function(response, status)
    {
        if(status=="success")
        {
            document.getElementById("ultimoAggiornamentoLabel").innerHTML=response;
        }
    });
}
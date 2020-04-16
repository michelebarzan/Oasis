var flexDirection="row";
var ordini;
var ordiniOriginal;
var headers;
var filterArrays={};
var steps=0;
var ordiniLenght=0;
var tbody;
var oggi = new Date();
var annoOggi=oggi.getFullYear();
var defaultFilterConditions=
[{
    colonna: "data_spedizione",
    nome: "anno",
    operatore: "IN",
    valore: "(SELECT [data_spedizione] FROM report_ordini_clienti_view WHERE DATEPART(yy,[data_spedizione]) = "+annoOggi+")",
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
var filterMenuAperto;

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
    steps=0;
    getElencoOrdiniClienteView();
}
async function onloadActions()
{
    id_utente=await getSessionValue("id_utente");
    getElencoOrdiniClienteView();
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

    steps=0;
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
async function getElencoOrdiniClienteView()
{
    var container=document.getElementById("reportOrdiniClienteContainer");
    container.innerHTML="";

    getFaSpinner(container,"container","Caricamento in corso...");

    objOrdini=await getOrdiniClienteView();
    headers=objOrdini.headers;
    ordini=objOrdini.ordini;
    ordiniOriginal=objOrdini.ordini;
    
    var table=document.createElement("table");
    table.setAttribute("id","reportOrdiniClientiTable");

    var thead=document.createElement("thead");
    var tr=document.createElement("tr");
    headers.forEach(function (header)
    {
        filterArrays[header.value]=[];

        var th=document.createElement("th");
        th.setAttribute("class","reportOrdiniClientiTableCell"+header.value);
        th.setAttribute("id","reportOrdiniClientiTableHeader"+header.value);
        th.setAttribute("onclick","openFilterMenu(event,'"+header.value+"',this)");

        var span=document.createElement("span");
        span.innerHTML=header.label;
        span.setAttribute("title",header.value);
        span.setAttribute("class","reportOrdiniClientiTableHeaderSpan");
        th.appendChild(span);

        var i=document.createElement("i");
        i.setAttribute("class","far fa-filter");
        th.appendChild(i);

        tr.appendChild(th);

        createFilterMenu(header.value,header.data_type);
    });
    thead.appendChild(tr);
    table.appendChild(thead);

    ordiniLenght=0;
    tbody=document.createElement("tbody");
    ordini.forEach(function (ordine)
    {
        var tr=document.createElement("tr");
        tr.setAttribute("id","reportOrdiniClientiTableRow"+ordiniLenght);
        tr.setAttribute("style","display:none");
        tr.setAttribute("onclick","selectTableRow("+ordiniLenght+")");

        headers.forEach(function (header)
        {
            filterArrays[header.value].push(ordine[header.value]);

            var td=document.createElement("td");
            td.setAttribute("class","reportOrdiniClientiTableCell"+header.value);
            td.setAttribute("title",ordine[header.value]);
            if(isEven(ordiniLenght))
                td.setAttribute("style","background-color:rgba(255, 255, 255, 0.199)");
            else
                td.setAttribute("style","background-color:rgba(76, 146, 203, 0.199)");
            
            if(header.value=="ordine_cliente" || header.value=="ordine_fornitore")
            {
                var linkOrdine=document.createElement("a");
                linkOrdine.setAttribute("class","link-cerca-pdf-report-ordini-cliente");
                linkOrdine.setAttribute("href","http://remote.oasisgroup.it/Oasis/reportMailFornitori.php?colonnaFiltro="+header.value+"&valoreFiltro="+ordine[header.value]);
                linkOrdine.setAttribute("title","Cerca pdf...");
                linkOrdine.innerHTML=ordine[header.value];
                td.appendChild(linkOrdine);
            }
            else
                td.innerHTML=ordine[header.value];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
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
    
    removeFaSpinner("container");

    checkFilters();

    caricaAltriOrdini();

    var btnSteps=document.createElement("button");
    btnSteps.setAttribute("onclick","caricaAltriOrdini()");
    btnSteps.setAttribute("id","btncaricaAltriOrdini");
    btnSteps.innerHTML="<i class='fal fa-plus-circle'></i><span>Carica altri...</span>";
    container.appendChild(btnSteps);
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
function openFilterMenu(event,colonna,th)
{
    hideFilterMenu();

    filterMenuAperto=colonna;

    th.style.color="#4C91CB";

    $("#filterMenuReportOrdiniCliente"+colonna).show("fast","swing");
    $("#filterMenuReportOrdiniCliente"+colonna).css(
    {
        "display":"flex",
        "left":(event.clientX - 7),
        "top":(event.clientY+12)
    });
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
        try {
            if(filterConditions[0].default)
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
                operatore:"IN",
                valore:"(SELECT ["+colonna+"] FROM report_ordini_clienti_view WHERE DATEPART(yy,["+colonna+"]) = "+anno+")",
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
    steps=0;
    getElencoOrdiniClienteView();
}
function caricaAltriOrdini()
{
    for (let index = steps; index < steps+stepsSize; index++)
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
    }
}
function unselectTableRow()
{
    $("#reportOrdiniClientiTable tr").css({"background-color":""});
    $("#reportOrdiniClientiTable td").css(
    {
        "white-space":"",
        "overflow":"",
        "height":"",
        "line-height":"",
        "padding-top":"",
        "padding-bottom":"",
        "word-break":""
    });
}
function selectTableRow(i)
{
    unselectTableRow();

    $("#reportOrdiniClientiTableRow"+i).css({"background-color":"#557486b7",});
    $("#reportOrdiniClientiTableRow"+i+" td").css(
    {
        "white-space":"normal",
        "overflow":"visible",
        "height":"auto",
        "line-height":"normal",
        "padding-top":"5.5px",
        "padding-bottom":"5.5px",
        "word-break":"break-all"
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
function fixTable()
{
    var tableWidth=document.getElementById("reportOrdiniClientiTable").offsetWidth-8;

    headers.forEach(function(header)
    {
        var width=(header.width*tableWidth)/100;
        $(".reportOrdiniClientiTableCell"+header.value).css({"width":width+"px"});
    });
    
    /*var tableColWidth1=tableWidth/headers.length;
    $("#reportOrdiniClientiTable td").css({"width":tableColWidth1+"px"});
    $("#reportOrdiniClientiTable th").css({"width":tableColWidth1+"px"});*/
}
function getOrdiniClienteView()
{
    return new Promise(function (resolve, reject) 
    {
        var JSONfilterConditions=JSON.stringify(filterConditions);
        $.get("getOrdiniClienteView.php",
        {
            JSONfilterConditions,
            orderBy
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
async function esportaExcel()
{
    var tableID=await preparaTabellaEsportazione();

    console.log(tableID);

    exportTableToExcel(tableID, "reportOrdiniClienti");

    document.getElementById("exportTableContainer").remove();
}
function preparaTabellaEsportazione()
{
    return new Promise(function (resolve, reject) 
    {
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
                col.innerHTML=col.innerHTML.replace("€","");
            }  
        }

        container.appendChild(exportTable);

        document.body.appendChild(container);

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
}
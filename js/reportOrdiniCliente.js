var flexDirection="row";
var ordini;
var ordiniOriginal;
var headers;
var filterArrays={};
var steps=0;
var ordiniLenght=0;
var tbody;
var filterConditions=[];

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
function onloadActions()
{
    getElencoOrdiniClienteView();
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
        th.setAttribute("onclick","getFilterMenu(event,'"+header.value+"',this)");

        var span=document.createElement("span");
        span.innerHTML=header.label;
        span.setAttribute("title",header.value);
        span.setAttribute("class","reportOrdiniClientiTableHeaderSpan");
        th.appendChild(span);

        var i=document.createElement("i");
        i.setAttribute("class","far fa-filter");
        th.appendChild(i);

        tr.appendChild(th);
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
        if(filterConditionsColumns.includes(header.value))
        {
            $("#reportOrdiniClientiTableHeader"+header.value+" span").css({"color":"#E9A93A"});
            $("#reportOrdiniClientiTableHeader"+header.value+" i").css({"color":"#E9A93A"});
        }
        else
        {
            $("#reportOrdiniClientiTableHeader"+header.value+" span").css({"color":""});
            $("#reportOrdiniClientiTableHeader"+header.value+" i").css({"color":""});
        }
    });
}
function hideFilterMenu()
{
    $(".filter-menu-report-ordini-cliente").hide("fast","swing");
    $("#reportOrdiniClientiTable th").css("color","");
}
function getFilterMenu(event,colonna,th)
{
    hideFilterMenu();

    th.style.color="#4C91CB";

    var menu=document.createElement("div");
    menu.setAttribute("class","filter-menu-report-ordini-cliente");
    menu.setAttribute("id","filterMenuReportOrdiniCliente"+colonna);
    menu.setAttribute("style","left:"+(event.clientX - 7)+"px;top:"+(event.clientY+12));

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
    orderButton.setAttribute("onclick","");
    orderButton.setAttribute("class","filter-menu-item-report-ordini-cliente");

    var i=document.createElement("i");
    i.setAttribute("class","fal fa-sort-amount-down filter-menu-item-report-ordini-cliente");
    orderButton.appendChild(i);

    var span=document.createElement("span");
    span.setAttribute("class","filter-menu-item-report-ordini-cliente");
    span.innerHTML="Ordinamento decrescente";
    orderButton.appendChild(span);

    menuRow.appendChild(orderButton);

    var orderButton=document.createElement("button");
    orderButton.setAttribute("onclick","");
    orderButton.setAttribute("class","filter-menu-item-report-ordini-cliente");

    var i=document.createElement("i");
    i.setAttribute("class","fal fa-sort-amount-down-alt filter-menu-item-report-ordini-cliente");
    orderButton.appendChild(i);

    var span=document.createElement("span");
    span.setAttribute("class","filter-menu-item-report-ordini-cliente");
    span.innerHTML="Ordinamento crescente";
    orderButton.appendChild(span);

    menuRow.appendChild(orderButton);

    menu.appendChild(menuRow);

    var header=getFirstObjByPropValue(headers,"value",colonna);

    if(header.data_type=="date")
    {
        var menuRow=document.createElement("div");
        menuRow.setAttribute("class","filter-menu-row-report-ordini-cliente filter-menu-conditions-container-report-ordini-cliente filter-menu-item-report-ordini-cliente");

        var conditionContainer=document.createElement("div");
        conditionContainer.setAttribute("class","filter-menu-item-report-ordini-cliente");

        var span=document.createElement("span");
        span.setAttribute("class","filter-menu-item-report-ordini-cliente");
        span.innerHTML="Uguale a";
        conditionContainer.appendChild(span);

        var input=document.createElement("input");
        input.setAttribute("class","filter-menu-item-report-ordini-cliente");
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
        input.setAttribute("class","filter-menu-item-report-ordini-cliente");
        input.setAttribute("id","filterAnno"+colonna);
        input.setAttribute("type","search");
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
        input.setAttribute("class","filter-menu-item-report-ordini-cliente");
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
        input.setAttribute("class","filter-menu-item-report-ordini-cliente");
        input.setAttribute("id","filterIntervalloA"+colonna);
        input.setAttribute("type","date");
        conditionContainerRow.appendChild(input);

        conditionContainer.appendChild(conditionContainerRow);

        menuRow.appendChild(conditionContainer);

        menu.appendChild(menuRow);
    }
    else
    {
        var menuRow=document.createElement("div");
        menuRow.setAttribute("class","filter-menu-row-report-ordini-cliente filter-menu-conditions-container-report-ordini-cliente filter-menu-item-report-ordini-cliente");

        var conditionContainer=document.createElement("div");
        conditionContainer.setAttribute("class","filter-menu-item-report-ordini-cliente");

        var span=document.createElement("span");
        span.setAttribute("class","filter-menu-item-report-ordini-cliente");
        span.innerHTML="Uguale a";
        conditionContainer.appendChild(span);

        var input=document.createElement("input");
        input.setAttribute("class","filter-menu-item-report-ordini-cliente");
        input.setAttribute("id","filterUguale"+colonna);
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
        input.setAttribute("class","filter-menu-item-report-ordini-cliente");
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
        input.setAttribute("class","filter-menu-item-report-ordini-cliente");
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
        input.setAttribute("class","filter-menu-item-report-ordini-cliente");
        input.setAttribute("id","filterFinisce"+colonna);
        input.setAttribute("type","search");
        conditionContainer.appendChild(input);

        menuRow.appendChild(conditionContainer);

        if(header.data_type=="number")
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
            input.setAttribute("class","filter-menu-item-report-ordini-cliente");
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
            input.setAttribute("class","filter-menu-item-report-ordini-cliente");
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
    filterConfirmButton.setAttribute("onclick","applyFilter('"+colonna+"')");
    var span=document.createElement("span");
    span.setAttribute("class","filter-menu-item-report-ordini-cliente");
    span.innerHTML="Applica filtro";
    filterConfirmButton.appendChild(span);
    menu.appendChild(filterConfirmButton);


    document.body.appendChild(menu);
    $("#filterMenuReportOrdiniCliente"+colonna).show("fast","swing");
    $("#filterMenuReportOrdiniCliente"+colonna).css("display","flex");
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
                valore:"'"+uguale+"'"
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
                valore:"(SELECT ["+colonna+"] FROM report_ordini_clienti_view WHERE DATEPART(yy,["+colonna+"]) = "+anno+")"
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
                valore:"'"+da+"' AND '"+a+"'"
            }
            filterConditions.push(filterCondition);
        }
    }
    else
    {
        var uguale=document.getElementById("filterUguale"+colonna).value;
        var contiene=document.getElementById("filterContiene"+colonna).value;
        var inizia=document.getElementById("filterInizia"+colonna).value;
        var finisce=document.getElementById("filterFinisce"+colonna).value;

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
                    valore:"NULL"
                }
            }
            else
            {
                filterCondition=
                {
                    colonna,
                    nome:"uguale",
                    operatore:"=",
                    valore:"'"+uguale+"'"
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
                valore:"'%"+contiene+"%'"
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
                valore:"'"+inizia+"%'"
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
                valore:"'%"+finisce+"'"
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
                    valore:""+da+" AND "+a+""
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
    for (let index = steps; index < steps+100; index++)
    {
        $("#reportOrdiniClientiTableRow"+index).show();
    }
    steps+=100;

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
            JSONfilterConditions
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
function esportaExcel()
{
    exportTableToExcel("reportOrdiniClientiTable", "reportOrdiniClienti");
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
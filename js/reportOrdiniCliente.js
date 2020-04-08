var flexDirection="row";
var ordini;
var headers;
var steps=0;
var ordiniLenght=0;

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

    ordini=await getOrdiniClienteView();
    //console.log(ordini);

    var obj=ordini[0];
    headers=[];
    for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) 
        {
            var label="";
            var labelArray=prop.split("_");
            labelArray.forEach(labelArrayItem => {
                label+=labelArrayItem[0].toUpperCase() + labelArrayItem.slice(1) + " "; 
            });
            label.slice(1);
            var header=
            {
                value:prop,
                label:label
            }
            headers.push(header);
        }
    }
    
    var table=document.createElement("table");
    table.setAttribute("id","reportOrdiniClientiTable");

    var thead=document.createElement("thead");
    var tr=document.createElement("tr");
    headers.forEach(function (header)
    {
        var th=document.createElement("th");
        th.setAttribute("class","reportOrdiniClientiTableCell"+header.value);

        var span=document.createElement("span");
        span.innerHTML=header.label;
        span.setAttribute("title",header.value);
        th.appendChild(span);

        var i=document.createElement("i");
        i.setAttribute("class","far fa-filter");
        i.setAttribute("onclick","getFilterMenu(event,'"+header.value+"')");
        th.appendChild(i);

        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);

    ordiniLenght=0;
    var tbody=document.createElement("tbody");
    ordini.forEach(function (ordine)
    {
        var tr=document.createElement("tr");
        tr.setAttribute("id","reportOrdiniClientiTableRow"+ordiniLenght);
        tr.setAttribute("style","display:none");
        tr.setAttribute("onclick","selectTableRow("+ordiniLenght+")");

        headers.forEach(function (header)
        {
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

    removeFaSpinner("container");

    caricaAltriOrdini();

    var btnSteps=document.createElement("button");
    btnSteps.setAttribute("onclick","caricaAltriOrdini()");
    btnSteps.setAttribute("id","btncaricaAltriOrdini");
    btnSteps.innerHTML="<i class='fal fa-plus-circle'></i><span>Carica altri...</span>";
    container.appendChild(btnSteps);

}
function hideFilterMenu()
{
    $(".filter-menu-report-ordini-cliente").hide("fast","swing");
}
function getFilterMenu(event,colonna)
{
    hideFilterMenu();

    var menu=document.createElement("div");
    menu.setAttribute("class","filter-menu-report-ordini-cliente");
    menu.setAttribute("id","filterMenuReportOrdiniCliente"+colonna);
    menu.setAttribute("style","left:"+(event.clientX - 7)+"px;top:"+(event.clientY+12));

    var menuRow=document.createElement("div");
    menuRow.setAttribute("class","filter-menu-row-report-ordini-cliente filter-menu-title-container-report-ordini-cliente filter-menu-item-report-ordini-cliente");

    var span=document.createElement("span");
    span.innerHTML=colonna;
    menuRow.appendChild(span);

    var i=document.createElement("i");
    i.setAttribute("class","fal fa-times");
    i.setAttribute("onclick","hideFilterMenu()");
    menuRow.appendChild(i);

    menu.appendChild(menuRow);

    var menuRow=document.createElement("div");
    menuRow.setAttribute("class","filter-menu-row-report-ordini-cliente filter-menu-order-container-report-ordini-cliente filter-menu-item-report-ordini-cliente");

    var orderButton=document.createElement("button");
    orderButton.setAttribute("onclick","");

    var i=document.createElement("i");
    i.setAttribute("class","fal fa-sort");
    orderButton.appendChild(i);

    var span=document.createElement("span");
    span.innerHTML="Ordinamento decrescente";
    orderButton.appendChild(span);

    menuRow.appendChild(orderButton);

    var orderButton=document.createElement("button");
    orderButton.setAttribute("onclick","");

    var i=document.createElement("i");
    i.setAttribute("class","fal fa-sort");
    orderButton.appendChild(i);

    var span=document.createElement("span");
    span.innerHTML="Ordinamento crescente";
    orderButton.appendChild(span);

    

    menuRow.appendChild(orderButton);

    menu.appendChild(menuRow);

    document.body.appendChild(menu);
    $("#filterMenuReportOrdiniCliente"+colonna).show("fast","swing");
    $("#filterMenuReportOrdiniCliente"+colonna).css("display","flex");
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
        try {
            document.getElementById("btncaricaAltriOrdini").style.display="none";
        } catch (error) {}
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
    var tableColWidth1=tableWidth/headers.length;
    
    $("#reportOrdiniClientiTable td").css({"width":tableColWidth1+"px"});
    $("#reportOrdiniClientiTable th").css({"width":tableColWidth1+"px"});
}
function getOrdiniClienteView()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getOrdiniClienteView.php",
        {
            
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
window.addEventListener("click", windowClick, false);
function windowClick(e)
{
    if(e.target.tagName!=="TD" && e.target.tagName!=="TR" && e.target.tagName!=="TBODY")
    {
        unselectTableRow();
    }
    //console.log(e.target.className)
    if(e.target.className!=="far fa-filter" && e.target.className!=="filter-menu-report-ordini-cliente"/* && e.target.className.indexOf("filter-menu-item-report-ordini-cliente")==-1*/)
    {
        hideFilterMenu();
    }
}
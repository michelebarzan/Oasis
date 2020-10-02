var nomePagina="Sommario Produzione";
var pageInfo=
{
    pagina:"sommarioProduzione.html",
    nomePagina:"Sommario Produzione",
    id_pagina:"1047",
    fileName:"sommarioProduzione"
};
var produzioneNegliAnniChart;
var produzioneNegliAnniFilter;
var produzioneSettimanaGChart;
var produzioneSettimanaGFilter;
var totaliPerCollezioneChart;
var totaliPerCollezioneFilter;

async function onloadsommarioProduzione()
{
    document.getElementById("containerSommarioProduzione").innerHTML="";
    produzioneNegliAnniChart=null;
    produzioneNegliAnniFilter=null;
    produzioneSettimanaGChart=null;
    produzioneSettimanaGFilter=null;
    totaliPerCollezioneChart=null;
    totaliPerCollezioneFilter=null;

    var settimane=await getSettimane();
    var select=document.getElementById("rcbselectSettimanaSommarioProduzione");
    settimane.forEach(settimana => 
    {
        var option=document.createElement("option");
        option.setAttribute("value",settimana);
        option.innerHTML="Settimana: "+settimana;
        select.appendChild(option);
    });

    getSommarioProduzione();
}
function getSommarioProduzioneCharts()
{
    getChartProduzioneSettimana();
    getTableProduzioneSettimana();
    getChartTotaliPerCollezione();
    getChartProduzioneNegliAnni();
}
function getSommarioProduzione()
{
    getGraficoProduzioneSettimana();
    getTabellaProduzioneSettimana();
    getTotaliPerCollezione();
    getProduzioneNegliAnni();
}
function getTotaliPerCollezione()
{
    var container=document.getElementById("containerSommarioProduzione");

    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","sommario-produzione-outer-container");
    outerContainer.setAttribute("id","totaliPerCollezioneOuterContainer");

    var titleContainer=document.createElement("div");
    titleContainer.setAttribute("class","sommario-produzione-title-container");

    var span=document.createElement("span");
    span.innerHTML="Totali per collezione";
    titleContainer.appendChild(span);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-title-button");
    button.setAttribute("onclick","totaliPerCollezioneChart.exportChart({format: 'jpg'});");
    button.setAttribute("style","margin-left:auto");
    button.innerHTML='<span>Esporta</span><i class="far fa-image"></i>';
    titleContainer.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-title-button");
    button.setAttribute("onclick","esportaExcelGrafico('totaliPerCollezione')");
    button.setAttribute("style","margin-left:15px");
    button.innerHTML='<span>Esporta</span><i class="far fa-file-excel"></i>';
    titleContainer.appendChild(button);

    outerContainer.appendChild(titleContainer);

    var actionBar=document.createElement("div");
    actionBar.setAttribute("class","sommario-produzione-action-bar");
    actionBar.setAttribute("style","margin-bottom:-2px;margin-top:-2px");

    var inputDate=document.createElement("input");
    inputDate.setAttribute("type","date");
    inputDate.setAttribute("id","dataInizioTotaliPerCollezione");
    inputDate.setAttribute("class","sommario-produzione-action-bar-button totali-per-collezione-action-bar-button");
    inputDate.setAttribute("onchange","getChartTotaliPerCollezione()");
    inputDate.setAttribute("style","margin-bottom:0px");
    inputDate.value="2016-01-01";
    actionBar.appendChild(inputDate);

    var inputDate=document.createElement("input");
    inputDate.setAttribute("type","date");
    inputDate.setAttribute("id","dataFineTotaliPerCollezione");
    inputDate.setAttribute("class","sommario-produzione-action-bar-button totali-per-collezione-action-bar-button");
    inputDate.setAttribute("onchange","getChartTotaliPerCollezione()");
    inputDate.setAttribute("style","margin-bottom:0px");
    inputDate.value=new Date().getFullYear()+"-12-31";
    actionBar.appendChild(inputDate);

    outerContainer.appendChild(actionBar);

    var actionBar=document.createElement("div");
    actionBar.setAttribute("class","sommario-produzione-action-bar");

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button totali-per-collezione-action-bar-button");
    button.setAttribute("onclick","setTotaliPerCollezioneFilter(this,'Ordini','','ordini')");
    if(totaliPerCollezioneFilter==null)
    {
        totaliPerCollezioneFilter=
        {
            "label":"Ordini",
            "um":"",
            "colonna":"ordini"
        };
        button.setAttribute("style","background-color:rgb(48, 133, 214);color:white;border:1px solid rgb(48, 133, 214)");
    }
    
    button.innerHTML='<span>Ordini</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button totali-per-collezione-action-bar-button");
    button.setAttribute("onclick","setTotaliPerCollezioneFilter(this,'M.Q.','mq','mq')");
    button.innerHTML='<span>M.Q.</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button totali-per-collezione-action-bar-button");
    button.setAttribute("onclick","setTotaliPerCollezioneFilter(this,'Pezzi','','totale_pezzi')");
    button.innerHTML='<span>Pezzi</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button totali-per-collezione-action-bar-button");
    button.setAttribute("onclick","setTotaliPerCollezioneFilter(this,'Basi portalavabo','','basi_portalavabo')");
    button.innerHTML='<span>Basi portalavabo</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button totali-per-collezione-action-bar-button");
    button.setAttribute("onclick","setTotaliPerCollezioneFilter(this,'Basi accostabili','','basi_accostabili')");
    button.innerHTML='<span>Basi accostabili</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button totali-per-collezione-action-bar-button");
    button.setAttribute("onclick","setTotaliPerCollezioneFilter(this,'Pensili','','pensili')");
    button.innerHTML='<span>Pensili</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button totali-per-collezione-action-bar-button");
    button.setAttribute("onclick","setTotaliPerCollezioneFilter(this,'Colonne','','colonne')");
    button.innerHTML='<span>Colonne</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button totali-per-collezione-action-bar-button");
    button.setAttribute("onclick","setTotaliPerCollezioneFilter(this,'Altro','','Altro')");
    button.innerHTML='<span>Altro</span>';
    actionBar.appendChild(button);

    outerContainer.appendChild(actionBar);

    var innerContainer=document.createElement("div");
    innerContainer.setAttribute("class","sommario-produzione-inner-container");
    innerContainer.setAttribute("id","totaliPerCollezioneChartContainer");

    outerContainer.appendChild(innerContainer);

    container.appendChild(outerContainer);

    getChartTotaliPerCollezione();
}
function setTotaliPerCollezioneFilter(button,label,um,colonna)
{
    var all=document.getElementsByClassName("totali-per-collezione-action-bar-button");
    for (let index = 0; index < all.length; index++)
    {
        const element = all[index];
        element.style.backgroundColor="";
        element.style.color="";
        element.style.border="";
    }
    button.style.backgroundColor="rgb(48, 133, 214)";
    button.style.color="white";
    button.style.border="1px solid rgb(48, 133, 214)";
    totaliPerCollezioneFilter=
    {
        label,
        um,
        colonna
    };
    getChartTotaliPerCollezione();
}
async function getChartTotaliPerCollezione()
{
    document.getElementById("totaliPerCollezioneChartContainer").innerHTML="<div style='width:100%;height:100%;display:flex;align-items:center;justify-content:center'><i class='fad fa-spinner-third fa-spin fa-2x'></i></div>";

    var dataPoints=await getDataTotaliPerCollezione();
    var max=
    {
        label:"",
        y:0
    };
    dataPoints.forEach(dot =>
    {
        if(dot.y>max.y)
        {
            max.y=dot.y,
            max.label=dot.label
        }
    });
    dataPoints.forEach(dot =>
    {
        if(max.label==dot.label)
        {
            dot.indexLabel = "Più prodotta";
            dot.indexLabelFontSize= 10;
            dot.indexLabelFontColor= "black";
            dot.indexLabelFontWeight= "bold";
            dot.indexLabelFontFamily="'Montserrat',sans-serif";
        }
    });
    dataPoints.forEach(dot =>
    {
        if(max.label==dot.label)
        {
            dot.indexLabel = "Più prodotta";
            dot.indexLabelFontSize= 10;
            dot.indexLabelFontColor= "black";
            dot.indexLabelFontWeight= "bold";
            dot.indexLabelFontFamily="'Montserrat',sans-serif";
        }
    });
    
    if(dataPoints.length==0)
    {
        document.getElementById("totaliPerCollezioneChartContainer").innerHTML="";

        var div=document.createElement("div");
        div.setAttribute("style","width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:orange");
        
        var i=document.createElement("i");
        i.setAttribute("class","far fa-exclamation-circle");
        div.appendChild(i);

        var span=document.createElement("span");
        span.setAttribute("style","font-family:'Montserrat',sans-serif;font-size:12px;margin-left:5px");
        span.innerHTML="Nessun dato";
        div.appendChild(span);

        document.getElementById("totaliPerCollezioneChartContainer").appendChild(div);
    }
    else
    {
        setTimeout(function()
        {
            totaliPerCollezioneChart = new CanvasJS.Chart("totaliPerCollezioneChartContainer",
            {
                animationEnabled: true,
                backgroundColor:"white",
                theme: "light2",
                axisX:
                {
                    labelFontSize: 10,
                    labelFontColor: "black",
                    labelFontWeight: "bold",
                    labelFontFamily: "'Montserrat',sans-serif",
                    lineThickness: 1,
                    lineColor: "black"
                },
                axisY:
                {
                    labelAngle: -45,
                    labelFontSize: 10,
                    labelFontColor: "black",
                    labelFontWeight: "bold",
                    labelFontFamily: "'Montserrat',sans-serif",
                    gridThickness: 1,
                    gridColor: "#ddd",
                    lineThickness: 1,
                    lineColor: "black"
                },
                toolTip: {
                    shared: true
                },
                data: [
                {
                    type: "column",
                    name: "Collezioni",
                    dataPoints
                }]
            });
            totaliPerCollezioneChart.render();
            var all = document.getElementsByClassName("canvasjs-chart-canvas");
            for (var i = 0; i < all.length; i++) 
            {
                all[i].style.zIndex = '1';
            }
        }, 1000);
    }
}
function getDataTotaliPerCollezione()
{
    return new Promise(function (resolve, reject) 
    {
        var stazione=document.getElementById("rcbselectStazioneSommarioProduzione").value;
        var JSONtotaliPerCollezioneFilter=JSON.stringify(totaliPerCollezioneFilter);
        var dataInizio=document.getElementById("dataInizioTotaliPerCollezione").value;
        var dataFine=document.getElementById("dataFineTotaliPerCollezione").value;

        $.get("getDataTotaliPerCollezioneSommarioProduzione.php",
        {
            stazione,
            JSONtotaliPerCollezioneFilter,
            dataInizio,
            dataFine
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
                resolve([]);
        });
    });
}
function getGraficoProduzioneSettimana()
{
    var container=document.getElementById("containerSommarioProduzione");

    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","sommario-produzione-outer-container");
    outerContainer.setAttribute("id","produzioneSettimanaGOuterContainer");

    var titleContainer=document.createElement("div");
    titleContainer.setAttribute("class","sommario-produzione-title-container");

    var span=document.createElement("span");
    span.innerHTML="Report settimana";
    titleContainer.appendChild(span);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-title-button");
    button.setAttribute("onclick","produzioneSettimanaGChart.exportChart({format: 'jpg'});");
    button.setAttribute("style","margin-left:auto");
    button.innerHTML='<span>Esporta</span><i class="far fa-image"></i>';
    titleContainer.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-title-button");
    button.setAttribute("onclick","esportaExcelGrafico('produzioneSettimanaG')");
    button.setAttribute("style","margin-left:15px");
    button.innerHTML='<span>Esporta</span><i class="far fa-file-excel"></i>';
    titleContainer.appendChild(button);

    outerContainer.appendChild(titleContainer);

    var actionBar=document.createElement("div");
    actionBar.setAttribute("class","sommario-produzione-action-bar");

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button produzione-settimana-action-bar-button");
    button.setAttribute("onclick","setProduzioneSettimanaGFilter(this,'Ordini','','ordini')");
    if(produzioneSettimanaGFilter==null)
    {
        produzioneSettimanaGFilter=
        {
            "label":"Ordini",
            "um":"",
            "colonna":"ordini"
        };
        button.setAttribute("style","background-color:rgb(48, 133, 214);color:white;border:1px solid rgb(48, 133, 214)");
    }
    
    button.innerHTML='<span>Ordini</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button produzione-settimana-action-bar-button");
    button.setAttribute("onclick","setProduzioneSettimanaGFilter(this,'M.Q.','mq','mq')");
    button.innerHTML='<span>M.Q.</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button produzione-settimana-action-bar-button");
    button.setAttribute("onclick","setProduzioneSettimanaGFilter(this,'Pezzi','','totale_pezzi')");
    button.innerHTML='<span>Pezzi</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button produzione-settimana-action-bar-button");
    button.setAttribute("onclick","setProduzioneSettimanaGFilter(this,'Basi portalavabo','','basi_portalavabo')");
    button.innerHTML='<span>Basi portalavabo</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button produzione-settimana-action-bar-button");
    button.setAttribute("onclick","setProduzioneSettimanaGFilter(this,'Basi accostabili','','basi_accostabili')");
    button.innerHTML='<span>Basi accostabili</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button produzione-settimana-action-bar-button");
    button.setAttribute("onclick","setProduzioneSettimanaGFilter(this,'Pensili','','pensili')");
    button.innerHTML='<span>Pensili</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button produzione-settimana-action-bar-button");
    button.setAttribute("onclick","setProduzioneSettimanaGFilter(this,'Colonne','','colonne')");
    button.innerHTML='<span>Colonne</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button produzione-settimana-action-bar-button");
    button.setAttribute("onclick","setProduzioneSettimanaGFilter(this,'Altro','','Altro')");
    button.innerHTML='<span>Altro</span>';
    actionBar.appendChild(button);

    outerContainer.appendChild(actionBar);

    var innerContainer=document.createElement("div");
    innerContainer.setAttribute("class","sommario-produzione-inner-container");
    innerContainer.setAttribute("id","produzioneSettimanaGChartContainer");

    outerContainer.appendChild(innerContainer);

    container.appendChild(outerContainer);

    getChartProduzioneSettimana();
}
function setProduzioneSettimanaGFilter(button,label,um,colonna)
{
    var all=document.getElementsByClassName("produzione-settimana-action-bar-button");
    for (let index = 0; index < all.length; index++)
    {
        const element = all[index];
        element.style.backgroundColor="";
        element.style.color="";
        element.style.border="";
    }
    button.style.backgroundColor="rgb(48, 133, 214)";
    button.style.color="white";
    button.style.border="1px solid rgb(48, 133, 214)";
    produzioneSettimanaGFilter=
    {
        label,
        um,
        colonna
    };
    getChartProduzioneSettimana();
}
async function getChartProduzioneSettimana()
{
    document.getElementById("produzioneSettimanaGChartContainer").innerHTML="<div style='width:100%;height:100%;display:flex;align-items:center;justify-content:center'><i class='fad fa-spinner-third fa-spin fa-2x'></i></div>";

    var dataPoints=await getDataProduzioneSettimana();
    if(dataPoints.length==0)
    {
        document.getElementById("produzioneSettimanaGChartContainer").innerHTML="";

        var div=document.createElement("div");
        div.setAttribute("style","width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:orange");
        
        var i=document.createElement("i");
        i.setAttribute("class","far fa-exclamation-circle");
        i.setAttribute("style","font-size:18px");
        div.appendChild(i);

        var span=document.createElement("span");
        span.setAttribute("style","font-family:'Montserrat',sans-serif;font-size:14px;margin-left:5px");
        span.innerHTML="Nessun salvataggio";
        div.appendChild(span);

        document.getElementById("produzioneSettimanaGChartContainer").appendChild(div);
    }
    else
    {
        setTimeout(function()
        {
            document.getElementById("produzioneSettimanaGChartContainer").innerHTML="";
            produzioneSettimanaGChart = new CanvasJS.Chart("produzioneSettimanaGChartContainer",
            {
                theme: "light2",
                backgroundColor:"white",
                animationEnabled: true,
                data: 
                [{
                    type: "doughnut",
                    innerRadius: 80,
                    indexLabel: "{label} : {y}",
                    showInLegend: true,
                    legendText: "{label} : {y}",
                    dataPoints,
                    indexLabelFontSize: 12,
                    indexLabelFontFamily: "'Montserrat',sans-serif",
                    indexLabelFontWeight: "bold",
                    indexLabelFontColor: "black",
                    indexLabelPlacement: "outside"
                }],
                legend:
                {
                    horizontalAlign: "center", // "center" , "right"
                    verticalAlign: "bottom",  // "top" , "bottom"
                    fontSize: 12,
                    fontColor: "black",
                    fontWeight: "bold",
                    fontFamily: "'Montserrat',sans-serif"
                }
            });
    
            produzioneSettimanaGChart.render();
            var all = document.getElementsByClassName("canvasjs-chart-canvas");
            for (var i = 0; i < all.length; i++) 
            {
                all[i].style.zIndex = '1';
            }
        }, 1000);
    }
}
function getDataProduzioneSettimana()
{
    return new Promise(function (resolve, reject) 
    {
        var stazione=document.getElementById("rcbselectStazioneSommarioProduzione").value;
        var settimana=document.getElementById("rcbselectSettimanaSommarioProduzione").value;
        var JSONproduzioneSettimanaFilter=JSON.stringify(produzioneSettimanaGFilter);
        $.get("getDataProduzioneSettimanaSommarioProduzione.php",
        {
            stazione,
            settimana,
            JSONproduzioneSettimanaFilter
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
                resolve([]);
        });
    });
}
function getTabellaProduzioneSettimana()
{
    var container=document.getElementById("containerSommarioProduzione");

    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","sommario-produzione-outer-container");
    outerContainer.setAttribute("id","produzioneSettimanaTOuterContainer");

    var titleContainer=document.createElement("div");
    titleContainer.setAttribute("class","sommario-produzione-title-container");

    var span=document.createElement("span");
    span.innerHTML="Report settimana";
    titleContainer.appendChild(span);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-title-button");
    button.setAttribute("onclick","esportaExcelGrafico('produzioneSettimanaT')");
    button.setAttribute("style","margin-left:auto");
    button.innerHTML='<span>Esporta</span><i class="far fa-file-excel"></i>';
    titleContainer.appendChild(button);

    outerContainer.appendChild(titleContainer);

    var innerContainer=document.createElement("div");
    innerContainer.setAttribute("class","sommario-produzione-inner-container");
    innerContainer.setAttribute("id","produzioneSettimanaTChartContainer");

    outerContainer.appendChild(innerContainer);

    container.appendChild(outerContainer);

    getTableProduzioneSettimana();
}
async function getTableProduzioneSettimana()
{
    document.getElementById("produzioneSettimanaTChartContainer").innerHTML="<div style='width:100%;height:100%;display:flex;align-items:center;justify-content:center'><i class='fad fa-spinner-third fa-spin fa-2x'></i></div>";

    var rows=await getDataTProduzioneSettimana();

    if(rows.length==0)
    {
        document.getElementById("produzioneSettimanaTChartContainer").innerHTML="";

        var div=document.createElement("div");
        div.setAttribute("style","width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:orange");
        
        var i=document.createElement("i");
        i.setAttribute("class","far fa-exclamation-circle");
        i.setAttribute("style","font-size:18px");
        div.appendChild(i);

        var span=document.createElement("span");
        span.setAttribute("style","font-family:'Montserrat',sans-serif;font-size:14px;margin-left:5px");
        span.innerHTML="Nessun salvataggio";
        div.appendChild(span);

        document.getElementById("produzioneSettimanaTChartContainer").appendChild(div);
    }
    else
    {
        document.getElementById("produzioneSettimanaTChartContainer").innerHTML="";

        var headers=[];
        var totali={};

        for (var prop in rows[0])
        {
            if (Object.prototype.hasOwnProperty.call(rows[0], prop))
            {
                if(isNaN(prop))
                {
                    var header=
                    {
                        value:prop,
                        label:prop
                    }
                    headers.push(header);

                    totali[prop]=0;
                }
            }
        }

        rows.forEach(row =>
        {
            headers.forEach(function (header)
            {
                var col=row[header.value];
                if(header.value=="docnum")
                {
                    totali[header.value]++;
                }
                else
                {
                    if(isNaN(col) || header.value=="settimana" || header.value=="PDF")
                        totali[header.value]="";
                    else
                        totali[header.value]+=parseFloat(col);
                }
            });
        });
        
        for (var prop in totali)
        {
            if (Object.prototype.hasOwnProperty.call(totali, prop))
            {
                var valore=totali[prop];
                try {
                    totali[prop]=parseFloat(valore.toString().split(".")[0]+"."+valore.toString().split(".")[1].substring(0, 2));
                } catch (error) {}
            }
        }
        
        var table=document.createElement("table");
        table.setAttribute("id","tableProduzioneSettimana");

        var thead=document.createElement("thead");
        var tr=document.createElement("tr");
        headers.forEach(function (header)
        {
            var th=document.createElement("th");
            th.setAttribute("class","table-produzione-settimana-cell"+header.value);
            th.innerHTML=header.label;
            tr.appendChild(th);
        });
        thead.appendChild(tr);
        table.appendChild(thead);

        var tbody=document.createElement("tbody");

        var tr=document.createElement("tr");
        tr.setAttribute("style","box-sizing:border-box;border-top:1px solid red;border-bottom:1px solid red");
        headers.forEach(function (header)
        {
            var td=document.createElement("td");
            td.setAttribute("class","table-produzione-settimana-cell"+header.value);
            td.setAttribute("style","color:red");
            if(header.value=="docnum")
                td.innerHTML="Ordini: "+totali[header.value];
            else
                td.innerHTML=totali[header.value];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);

        rows.forEach(function (row)
        {
            var tr=document.createElement("tr");
            headers.forEach(function (header)
            {
                if(header.value=="PDF")
                {
                    var td=document.createElement("td");
                    td.setAttribute("class","table-produzione-settimana-cell"+header.value);
                    td.setAttribute("style","text-align:center");
                    var linkPdf=document.createElement("a");
                    linkPdf.setAttribute("href","http://remote.oasisgroup.it/OasisPdfOrdini/pdf_ordini/H"+row[0]+".pdf");
                    linkPdf.setAttribute("target","blank");
                    linkPdf.setAttribute("class","linkPdfEditableTable");
                    linkPdf.setAttribute("title","Link al PDF");
                    var pdfIcon=document.createElement("i");
                    pdfIcon.setAttribute("class","fad fa-file-pdf iconPdfEditableTable");
                    linkPdf.appendChild(pdfIcon);
                    td.appendChild(linkPdf);
                    tr.appendChild(td);
                }
                else
                {
                    var td=document.createElement("td");
                    td.setAttribute("class","table-produzione-settimana-cell"+header.value);
                    td.innerHTML=row[header.value];
                    tr.appendChild(td);
                }
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        
        document.getElementById("produzioneSettimanaTChartContainer").appendChild(table);
    }
}
function getDataTProduzioneSettimana()
{
    return new Promise(function (resolve, reject) 
    {
        var stazione=document.getElementById("rcbselectStazioneSommarioProduzione").value;
        var settimana=document.getElementById("rcbselectSettimanaSommarioProduzione").value;
        $.get("getDataTProduzioneSettimana.php",
        {
            stazione,
            settimana
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
                resolve([]);
        });
    });
}
function getProduzioneNegliAnni()
{
    var container=document.getElementById("containerSommarioProduzione");

    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","sommario-produzione-outer-container");
    outerContainer.setAttribute("id","produzioneNegliAnniOuterContainer");

    var titleContainer=document.createElement("div");
    titleContainer.setAttribute("class","sommario-produzione-title-container");

    var span=document.createElement("span");
    span.innerHTML="Andamento produzione negli anni";
    titleContainer.appendChild(span);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-title-button");
    button.setAttribute("onclick","produzioneNegliAnniChart.exportChart({format: 'jpg'});");
    button.setAttribute("style","margin-left:auto");
    button.innerHTML='<span>Esporta</span><i class="far fa-image"></i>';
    titleContainer.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-title-button");
    button.setAttribute("onclick","esportaExcelGrafico('produzioneNegliAnni')");
    button.setAttribute("style","margin-left:15px");
    button.innerHTML='<span>Esporta</span><i class="far fa-file-excel"></i>';
    titleContainer.appendChild(button);

    outerContainer.appendChild(titleContainer);

    var actionBar=document.createElement("div");
    actionBar.setAttribute("class","sommario-produzione-action-bar");

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button produzione-negli-anni-action-bar-button");
    button.setAttribute("onclick","setProduzioneNegliAnniFilter(this,'Ordini','','ordini')");
    if(produzioneNegliAnniFilter==null)
    {
        produzioneNegliAnniFilter=
        {
            "label":"Ordini",
            "um":"",
            "colonna":"ordini"
        };
        button.setAttribute("style","background-color:rgb(48, 133, 214);color:white;border:1px solid rgb(48, 133, 214)");
    }
    
    button.innerHTML='<span>Ordini</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button produzione-negli-anni-action-bar-button");
    button.setAttribute("onclick","setProduzioneNegliAnniFilter(this,'M.Q.','mq','mq')");
    button.innerHTML='<span>M.Q.</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button produzione-negli-anni-action-bar-button");
    button.setAttribute("onclick","setProduzioneNegliAnniFilter(this,'Pezzi','','totale_pezzi')");
    button.innerHTML='<span>Pezzi</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button produzione-negli-anni-action-bar-button");
    button.setAttribute("onclick","setProduzioneNegliAnniFilter(this,'Basi portalavabo','','basi_portalavabo')");
    button.innerHTML='<span>Basi portalavabo</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button produzione-negli-anni-action-bar-button");
    button.setAttribute("onclick","setProduzioneNegliAnniFilter(this,'Basi accostabili','','basi_accostabili')");
    button.innerHTML='<span>Basi accostabili</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button produzione-negli-anni-action-bar-button");
    button.setAttribute("onclick","setProduzioneNegliAnniFilter(this,'Pensili','','pensili')");
    button.innerHTML='<span>Pensili</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button produzione-negli-anni-action-bar-button");
    button.setAttribute("onclick","setProduzioneNegliAnniFilter(this,'Colonne','','colonne')");
    button.innerHTML='<span>Colonne</span>';
    actionBar.appendChild(button);

    var button=document.createElement("button");
    button.setAttribute("class","sommario-produzione-action-bar-button produzione-negli-anni-action-bar-button");
    button.setAttribute("onclick","setProduzioneNegliAnniFilter(this,'Altro','','Altro')");
    button.innerHTML='<span>Altro</span>';
    actionBar.appendChild(button);

    outerContainer.appendChild(actionBar);

    var innerContainer=document.createElement("div");
    innerContainer.setAttribute("class","sommario-produzione-inner-container");
    innerContainer.setAttribute("id","produzioneNegliAnniChartContainer");

    outerContainer.appendChild(innerContainer);

    container.appendChild(outerContainer);

    getChartProduzioneNegliAnni();
}
async function getChartProduzioneNegliAnni()
{
    document.getElementById("produzioneNegliAnniChartContainer").innerHTML="<div style='width:100%;height:100%;display:flex;align-items:center;justify-content:center'><i class='fad fa-spinner-third fa-spin fa-2x'></i></div>";

    var anni=[];
    var dataPointsArray=await getDataProduzioneNegliAnni();

    if(dataPointsArray.length==0)
    {
        document.getElementById("produzioneSettimanaGChartContainer").innerHTML="";

        var div=document.createElement("div");
        div.setAttribute("style","width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:orange");
        
        var i=document.createElement("i");
        i.setAttribute("class","far fa-exclamation-circle");
        div.appendChild(i);

        var span=document.createElement("span");
        span.setAttribute("style","font-family:'Montserrat',sans-serif;font-size:12px;margin-left:5px");
        span.innerHTML="Nessun dato";
        div.appendChild(span);

        document.getElementById("produzioneSettimanaGChartContainer").appendChild(div);
    }
    else
    {
        var avg=
        {
            1:0,
            2:0,
            3:0,
            4:0,
            5:0,
            6:0,
            7:0,
            8:0,
            9:0,
            10:0,
            11:0,
            12:0
        };
        dataPointsArray.forEach(dot =>
        {
            //console.log(dot);
            avg[dot.x]+=dot.y;
        });
        for (let index = 1; index < 13; index++)
        {
            avg[index]=avg[index]/5;
        }
        for (let index = 1; index < 13; index++)
        {
            var newDot=
            {
                x:index,
                y:avg[index],
                anno:"media"
            }
            dataPointsArray.push(newDot);
        }

        dataPointsArray.forEach(dataPoints => 
        {
            anni.push(dataPoints.anno);
        });
        var uniqueAnni = [];
        $.each(anni, function(i, el){
            if($.inArray(el, uniqueAnni) === -1) uniqueAnni.push(el);
        });
        var data=[];
        uniqueAnni.forEach(anno => 
        {
            var dots=[];
            dataPointsArray.forEach(dataPoints => 
            {
                if(dataPoints.anno==anno)
                {
                    var dot={x:dataPoints.x,y:dataPoints.y}
                    dots.push(dot);
                }
            });
            if(anno=="media")
            {
                var set=
                {
                    name:anno.toString(),
                    type:"spline",
                    lineThickness: 4,
                    lineDashType: "dash",
                    color:"red",
                    markerSize: 8,
                    showInLegend: true,
                    dataPoints: dots
                }
            }
            else
            {
                var set=
                {
                    name:anno.toString(),
                    type:"spline",
                    markerSize: 8,
                    showInLegend: true,
                    dataPoints: dots
                }
            }
            data.push(set);
        });
        data.forEach(set =>
        {
            if(set.dataPoints.length<12)
            {
                var mese=1;
                for (let index = 0; index < 12; index++)
                {
                    var checkDot=getFirstObjByPropValue(set.dataPoints,"x",mese);
                    //console.log(checkDot);
                    if(checkDot==undefined)
                    {
                        var newDot=
                        {
                            x:mese,y:0
                        }
                        set.dataPoints.push(newDot);
                    }
                    mese++;
                }
            }
            function compare( a, b )
            {
                if ( a.x < b.x )
                    return -1;
                if ( a.x > b.x )
                    return 1;
                return 0;
            }
        
            set.dataPoints.sort( compare );
        });
        
        //console.log(data);
        setTimeout(function()
        {
            produzioneNegliAnniChart = new CanvasJS.Chart("produzioneNegliAnniChartContainer",
            {
                animationEnabled: true,
                backgroundColor:"white",
                title:
                {

                },
                axisX:
                {
                    interval: 1,
                    labelFontSize: 10,
                    labelFontColor: "black",
                    labelFontWeight: "bold",
                    labelFontFamily: "'Montserrat',sans-serif",
                    lineThickness: 1,
                    lineColor: "black"
                },
                axisY:
                {
                    labelAngle: -45,
                    labelFontSize: 10,
                    labelFontColor: "black",
                    labelFontWeight: "bold",
                    labelFontFamily: "'Montserrat',sans-serif",
                    gridThickness: 1,
                    gridColor: "#ddd",
                    lineThickness: 1,
                    lineColor: "black"
                },
                legend:{
                    cursor: "pointer",
                    fontSize: 12,
                    itemclick: toggleDataSeries,
                    fontFamily: "'Montserrat',sans-serif",
                    horizontalAlign: "left", // "center" , "right"
                    verticalAlign: "bottom",  // "top" , "bottom"
                },
                toolTip:{
                    shared: true
                },
                data
            });
            function toggleDataSeries(e)
            {
                if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                }
                else{
                    e.dataSeries.visible = true;
                }
                produzioneNegliAnniChart.render();
                var all = document.getElementsByClassName("canvasjs-chart-canvas");
                for (var i = 0; i < all.length; i++) 
                {
                    all[i].style.zIndex = '1';
                }
            }

            produzioneNegliAnniChart.render();
            var all = document.getElementsByClassName("canvasjs-chart-canvas");
            for (var i = 0; i < all.length; i++) 
            {
                all[i].style.zIndex = '1';
            }
        }, 1000);
    }
}
function setProduzioneNegliAnniFilter(button,label,um,colonna)
{
    var all=document.getElementsByClassName("produzione-negli-anni-action-bar-button");
    for (let index = 0; index < all.length; index++)
    {
        const element = all[index];
        element.style.backgroundColor="";
        element.style.color="";
        element.style.border="";
    }
    button.style.backgroundColor="rgb(48, 133, 214)";
    button.style.color="white";
    button.style.border="1px solid rgb(48, 133, 214)";
    produzioneNegliAnniFilter=
    {
        label,
        um,
        colonna
    };
    getChartProduzioneNegliAnni();
}
function getDataProduzioneNegliAnni()
{
    return new Promise(function (resolve, reject) 
    {
        var stazione=document.getElementById("rcbselectStazioneSommarioProduzione").value;
        var JSONproduzioneNegliAnniFilter=JSON.stringify(produzioneNegliAnniFilter);
        $.get("getDataProduzioneNegliAnniSommarioProduzione.php",
        {
            stazione,
            JSONproduzioneNegliAnniFilter
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
                resolve([]);
        });
    });
}
function getSettimane()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getSettimaneSommarioProduzione.php",
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
function sommarioProduzioneFullscreen(button,outerContainerId)
{
    /*button.getElementsByTagName("i")[0].className="fal fa-times";
    button.style.fontSize="16px";
    button.setAttribute("onclick","onloadsommarioProduzione()");

    var outerContainer=document.getElementById(outerContainerId);

    outerContainer.style.position="absolute";
    outerContainer.style.left="0px";
    outerContainer.style.right="0px";
    outerContainer.style.top="0px";
    outerContainer.style.bottom="0px";
    outerContainer.style.margin="0px";
    outerContainer.style.width="100%";
    outerContainer.style.height="100%";
    outerContainer.style.overflow="auto";

    outerContainer.style.zIndex="2";

    if(getOrientation()=="Landscape")
    {
        outerContainer.getElementsByClassName("sommario-produzione-inner-container")[0].style.height="calc(100% - 75px)";
        try {
            produzioneNegliAnniChart.render();
            var all = document.getElementsByClassName("canvasjs-chart-canvas");
            for (var i = 0; i < all.length; i++) 
            {
                all[i].style.zIndex = '1';
            }
        } catch (error) {
            //console.log("produzioneNegliAnniChart");
        }
        try {
            totaliPerCollezioneFilter.render();
            var all = document.getElementsByClassName("canvasjs-chart-canvas");
            for (var i = 0; i < all.length; i++) 
            {
                all[i].style.zIndex = '1';
            }
        } catch (error) {
            //console.log("totaliPerCollezioneFilter");
        }
        try {
            produzioneSettimanaGChart.render();
            var all = document.getElementsByClassName("canvasjs-chart-canvas");
            for (var i = 0; i < all.length; i++) 
            {
                all[i].style.zIndex = '1';
            }
        } catch (error) {
            //console.log("produzioneSettimanaGChart");
        }
    }    */
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
function esportaExcelGrafico(grafico)
{
    var headers=[];
    var data=[];

    if(grafico=="produzioneSettimanaG")
    {
        headers=["Stato",produzioneSettimanaGFilter.colonna];
        produzioneSettimanaGChart.data[0].dataPoints.forEach(dot =>
        {
            var row={};

            row["Stato"]=dot.label;
            row[produzioneSettimanaGFilter.colonna]=dot.y;

            data.push(row);
        });
    }
    if(grafico=="produzioneSettimanaT")
    {
        var tableProduzioneSettimana=document.getElementById("tableProduzioneSettimana");
        var ths=tableProduzioneSettimana.getElementsByTagName("th");
        for (let index = 0; index < ths.length; index++)
        {
            const th = ths[index];
            headers.push(th.innerHTML);
        }
        for (var i = 1, row; tableRow = tableProduzioneSettimana.rows[i]; i++)
        {
            var j=0;
            var row={};
            headers.forEach(header =>
            {
                if(header=="PDF")
                {
                    try {
                        row[header]=tableRow.cells[j].childNodes[0].getAttribute("href");
                    } catch (error) {
                        row[header]=tableRow.cells[j].innerHTML;
                    }
                }
                else
                    row[header]=tableRow.cells[j].innerHTML;
                j++;
            });
            data.push(row);
        }
    }
    if(grafico=="totaliPerCollezione")
    {
        var dataInizio=document.getElementById("dataInizioTotaliPerCollezione").value;
        var dataFine=document.getElementById("dataFineTotaliPerCollezione").value;

        headers=["Collezione",totaliPerCollezioneFilter.colonna+" ("+dataInizio+" - "+dataFine+")"];
        totaliPerCollezioneChart.data[0].dataPoints.forEach(dot =>
        {
            var row={};

            var collezione=dot.label;
            collezione=collezione.replace("à","e");
            collezione=collezione.replace("è","e");
            collezione=collezione.replace("ì","e");
            collezione=collezione.replace("ò","e");
            collezione=collezione.replace("ù","e");

            row["Collezione"]=collezione;
            row[totaliPerCollezioneFilter.colonna+" ("+dataInizio+" - "+dataFine+")"]=dot.y;

            data.push(row);
        });
    }
    if(grafico=="produzioneNegliAnni")
    {
        console.log(produzioneNegliAnniChart.data[0]);
        
        headers.push("Mese");
        produzioneNegliAnniChart.data.forEach(data =>
        {
            headers.push(produzioneNegliAnniFilter.colonna+" "+data.name);
        });
        for (let index = 1; index < 13; index++)
        {
            var row={};
            row["Mese"]=index;
            produzioneNegliAnniChart.data.forEach(data =>
            {
                row[produzioneNegliAnniFilter.colonna+" "+data.name]=data.dataPoints[index-1].y;
            });
            data.push(row);
        }
    }

    var exportTable=document.createElement("table");
    exportTable.setAttribute("id","exportTableSommarioProduzione");
    var tr=document.createElement("tr");
    headers.forEach(header =>
    {
        var td=document.createElement("td");
        td.innerHTML=header;
        tr.appendChild(td);
    });
    exportTable.appendChild(tr);
    data.forEach(row =>
    {
        var tr=document.createElement("tr");
        headers.forEach(header =>
        {
            var td=document.createElement("td");
            td.setAttribute("style","font-weight:bold");
            td.innerHTML=row[header];
            tr.appendChild(td);
        });
        exportTable.appendChild(tr);
    });
    document.body.appendChild(exportTable);

    Swal.fire
    ({
        title: "Scegli il nome del file Excel",
        html: '<input tyle="text" id="inputNomeFileEsportaExcel" value="sommario_produzione">',
        confirmButtonText:"Conferma",
        showCloseButton:true,
        allowEscapeKey:false,
        allowOutsideClick:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="black";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
    }).then((result) => 
    {
        if (result.value)
        {
            var fileName=document.getElementById("inputNomeFileEsportaExcel").value;

            Swal.fire
            ({
                title: "Caricamento in corso... ",
                background:"transparent",
                html: '<i style="color:white" class="fad fa-spinner-third fa-spin fa-4x"></i>',
                showConfirmButton:false,
                showCloseButton:false,
                allowEscapeKey:false,
                allowOutsideClick:false,
                onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
            });

            setTimeout(function()
            {
                var exportTableString="<html>"+document.getElementById("exportTableSommarioProduzione").outerHTML+"</html>";

                var blob;
                var wb = {SheetNames:[], Sheets:{}};

                var ws1 = XLSX.read(exportTableString, {type:"binary"}).Sheets.Sheet1;
                wb.SheetNames.push("sommario_produzione"); 
                wb.Sheets["sommario_produzione"] = ws1;

                blob = new Blob([s2ab(XLSX.write(wb, {bookType:'xlsx', type:'binary'}))],
                {
                    type: "application/octet-stream"
                });

                saveAs(blob, fileName+".xlsx");

                swal.close();

                document.getElementById("exportTableSommarioProduzione").remove();
            }, 1500);
        }
        else
            swal.close();
    });
}
function s2ab(s)
{
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
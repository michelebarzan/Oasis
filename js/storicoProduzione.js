var stazioneG;
var weekG;
var tipoG;
var nSettimane;
var dettaglio;
var updateSettimane=[];
var stazioneSelezionata;

function resetStyle()
{
    document.getElementById('comandiTabelle').style.height="0px";
    document.getElementById('containerStoricoProduzione').innerHTML="";
    var all = document.getElementsByClassName("btnIntestazioneCarichiDiLavoro");
    for (var i = 0; i < all.length; i++) 
    {
        all[i].style.color = 'black';
        all[i].style.boxShadow="";
    }
}
function puntoPunto()
{
    stazioneSelezionata="punto_punto";
    newCircleSpinner("Caricamento in corso...");
    document.getElementById('containerStoricoProduzione').style.width="";
    document.getElementById('btnPuntoPunto').style.color="#3367d6";
    document.getElementById('btnPuntoPunto').style.boxShadow=" 5px 5px 10px #9c9e9f";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById('containerStoricoProduzione').innerHTML= this.responseText;
            document.getElementById('comandiTabelle').style.height="50px";
            removeCircleSpinner();
        }
    };
    xmlhttp.open("POST", "storicoPuntoPunto.php?nSettimane="+nSettimane, true);
    xmlhttp.send();
}
function verniciatura()
{
    stazioneSelezionata="verniciatura";
    newCircleSpinner("Caricamento in corso...");
    document.getElementById('containerStoricoProduzione').style.width="";
    document.getElementById('btnVerniciatura').style.color="#3367d6";
    document.getElementById('btnVerniciatura').style.boxShadow=" 5px 5px 10px #9c9e9f";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById('containerStoricoProduzione').innerHTML= this.responseText;
            document.getElementById('comandiTabelle').style.height="50px";
            removeCircleSpinner();
        }
    };
    xmlhttp.open("POST", "storicoVerniciatura.php?nSettimane="+nSettimane, true);
    xmlhttp.send();
}
function montaggio()
{
    stazioneSelezionata="montaggio";
    newCircleSpinner("Caricamento in corso...");
    document.getElementById('containerStoricoProduzione').style.width="";
    document.getElementById('btnMontaggio').style.color="#3367d6";
    document.getElementById('btnMontaggio').style.boxShadow=" 5px 5px 10px #9c9e9f";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById('containerStoricoProduzione').innerHTML= this.responseText;
            document.getElementById('comandiTabelle').style.height="50px";
            removeCircleSpinner();
        }
    };
    xmlhttp.open("POST", "storicoMontaggio.php?nSettimane="+nSettimane, true);
    xmlhttp.send();
}
function stampa()
{
    document.getElementById('header').style.display="none";
    document.getElementById('intestazioneCarichiDiLavoro').style.display="none";
    document.getElementById('navBar').style.display="none";
    document.getElementById('comandiTabelle').style.display="none";
    document.getElementById('immagineLogo').style.display="none";
    document.getElementById('footer').style.display="none";
    document.body.style.backgroundColor = "white";
    window.print();
    document.body.style.backgroundColor = "#EBEBEB";
    document.getElementById('header').style.display="";
    document.getElementById('intestazioneCarichiDiLavoro').style.display="";
    document.getElementById('navBar').style.display="";
    document.getElementById('comandiTabelle').style.display="";
    document.getElementById('immagineLogo').style.display="";
    document.getElementById('footer').style.display="";
}
function apriPopupModificaSettimane()
{
    document.getElementById('popupModificaSettimane').style.height="330px";
    document.getElementById('popupModificaSettimane').style.width="500px";
    setTimeout(function()
    { 
        document.getElementById('header').style.opacity="0.2";
        document.getElementById('container').style.opacity="0.2";
        document.getElementById('footer').style.opacity="0.2";	
    }, 100);
    setTimeout(function()
    { 
        document.getElementById('popupModificaSettimane').style.opacity="1";	
    }, 200);
    dragElement(document.getElementById("popupModificaSettimane"));
    getTableModificaSettimane();
}
function chiudiPopupModificaSettimane()
{
    document.getElementById('popupModificaSettimane').style.height='0px';
    document.getElementById('popupModificaSettimane').style.width='0px';
    document.getElementById('header').style.opacity="";
    document.getElementById('container').style.opacity="";
    document.getElementById('footer').style.opacity="";
    setTimeout(function()
    { 
        document.getElementById('header').style.opacity='1';
        document.getElementById('container').style.opacity='1';
        document.getElementById('footer').style.opacity='1';
    }, 100);
}
function getTableModificaSettimane()
{
    document.getElementById('statoModificaSettimane').innerHTML='';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            if(this.responseText.indexOf("Error")!=-1 || this.responseText.indexOf("Notice")!=-1)
            {
                document.getElementById('statoModificaSettimane').innerHTML='<div id="warning" style="margin-top:3px;" title="'+this.responseText+'"></div>';
            }
            else
            {
                document.getElementById('tabellaPopupModificaSettimane').innerHTML=this.responseText;
            }
        }
    };
    xmlhttp.open("POST", "getTableModificaSettimane.php?", true);
    xmlhttp.timeout = 25000; // Set timeout to 25 seconds (25000 milliseconds)
    xmlhttp.ontimeout = function () 
    { 
        document.getElementById('statoModificaSettimane').innerHTML='<div id="warning" style="margin-top:3px;" title="Timeout"></div>';
    }
    xmlhttp.send();
}
function dragElement(elmnt) 
{
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    function dragMouseDown(e) 
    {
        //document.getElementById('popupUpdateSapheader').style.cursor='-webkit-grabbing';
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) 
    {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() 
    {
        //document.getElementById('popupUpdateSapheader').style.cursor='-webkit-grab';
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
function changeOpacity()
{
    document.getElementById('header').style.opacity='1';
    document.getElementById('container').style.opacity='1';
    document.getElementById('footer').style.opacity='1';
    document.getElementById('popupModificaSettimane').style.opacity='0.7';
}
function modificaSettimana(valore,Tipo_mont,colonna)
{
    if(valore=='' || valore==null  || valore>9 || isNaN(valore))
    {
        document.getElementById('statoModificaSettimane').innerHTML='<div id="warning" style="margin-top:3px;" title="Valore non valido"></div>';
    }
    else
    {
        document.getElementById('statoModificaSettimane').innerHTML='';
        updateSettimane.push("UPDATE Settimane SET ["+colonna+"]="+valore+" WHERE Tipo_mont='"+Tipo_mont+"'");
    }
}
function confermaModificaSettimane()
{
    if(updateSettimane.length>0)
    {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                if(this.responseText!="ok")
                {
                    document.getElementById('statoModificaSettimane').innerHTML='<div id="warning" style="margin-top:3px;" title="'+this.responseText+'"></div>';
                }
                else
                {
                    document.getElementById('statoModificaSettimane').innerHTML='<div id="success" style="margin-top:3px;" title="Settimane modificate"></div>';
                }
            }
        };
        xmlhttp.open("POST", "modificaSettimana.php?query="+updateSettimane.toString(), true);
        xmlhttp.timeout = 25000; // Set timeout to 25 seconds (25000 milliseconds)
        xmlhttp.ontimeout = function () 
        { 
            document.getElementById('statoModificaSettimane').innerHTML='<div id="warning" style="margin-top:3px;" title="Timeout"></div>';
        }
        xmlhttp.send();
    }
}
function riempiTabelle()
{
    nSettimane=document.getElementById("nSettimane").value;
    document.getElementById('inner').innerHTML='<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
    //document.getElementById('containerProgressBar').style.display="table";
    document.getElementById('messaggi').innerHTML="Importo storico montaggio...";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            if(this.responseText!="ok")
                window.alert(this.responseText);
            else
            {
                document.getElementById('messaggi').innerHTML="Importo storico punto punto...";
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() 
                {
                    if (this.readyState == 4 && this.status == 200) 
                    {
                        if(this.responseText!="ok")
                            window.alert(this.responseText);
                        else
                        {
                            document.getElementById('messaggi').innerHTML="Importo storico verniciatura...";
                            var xmlhttp = new XMLHttpRequest();
                            xmlhttp.onreadystatechange = function() 
                            {
                                if (this.readyState == 4 && this.status == 200) 
                                {
                                    if(this.responseText!="ok")
                                        window.alert(this.responseText);
                                    else
                                    {
                                        document.getElementById('messaggi').innerHTML="Tabelle importate";
                                        setTimeout(function(){ document.getElementById('containerProgressBar').style.display="none"; document.getElementById('push2').style.height="70px";}, 1500);
                                    }
                                }
                            };
                            xmlhttp.open("POST", "riempiTabelleStorico3.php?", true);
                            xmlhttp.send();
                        }
                    }
                };
                xmlhttp.open("POST", "riempiTabelleStorico2.php?", true);
                xmlhttp.send();
            }
        }
    };
    xmlhttp.open("POST", "riempiTabelleStorico1.php?", true);
    xmlhttp.send();
}
function nonAggiornare()
{
    nSettimane=document.getElementById("nSettimane").value;
    document.getElementById('containerProgressBar').style.display="none";
    document.getElementById('push2').style.height="70px";
}
function getDettaglioPtoPto(stazione,week) 
{ 
    topFunction();
    document.getElementById('titoloDettaglio').innerHTML="";
    document.getElementById('contenutoDettaglio').innerHTML="";
    var week2=week.split("_");
    week=week2[0]+week2[1];
    stazioneG=stazione;
    weekG=week;
    document.getElementById('popupDettaglio').style.display="inline-block";
    document.getElementById('titoloDettaglio').innerHTML="Dettaglio stazione "+stazione+" settimana "+week2[1]+" del "+week2[0];
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById('hiddenContenutoDettaglio').innerHTML= this.responseText;
            console.log(this.responseText);
            document.getElementById('contenutoDettaglio').innerHTML=document.getElementById('myTableDettaglio').outerHTML;
            dettaglio=0;
        }
    };
    xmlhttp.open("POST", "getDettaglioPtoPtoStorico.php?stazione="+stazione+"&week="+week, true);
    xmlhttp.send();
}
function getDettaglioVer(stazione,week) 
{
    topFunction();
    document.getElementById('titoloDettaglio').innerHTML="";
    document.getElementById('contenutoDettaglio').innerHTML="";
    var week2=week.split("_");
    week=week2[0]+week2[1];
    stazioneG=stazione;
    weekG=week;
    document.getElementById('popupDettaglio').style.display="inline-block";
    document.getElementById('titoloDettaglio').innerHTML="Dettaglio stazione "+stazione+" settimana "+week2[1]+" del "+week2[0];
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById('hiddenContenutoDettaglio').innerHTML= this.responseText;
            document.getElementById('contenutoDettaglio').innerHTML=document.getElementById('myTableDettaglio').outerHTML;
            dettaglio=0;
        }
    };
    xmlhttp.open("POST", "getDettaglioVerStorico.php?stazione="+stazione+"&week="+week, true);
    xmlhttp.send();
}
function getDettaglioMon(stazione,week) 
{
    topFunction();
    document.getElementById('titoloDettaglio').innerHTML="";
    document.getElementById('contenutoDettaglio').innerHTML="";
    var week2=week.split("_");
    week=week2[0]+week2[1];
    stazioneG=stazione;
    weekG=week;
    document.getElementById('popupDettaglio').style.display="inline-block";
    document.getElementById('titoloDettaglio').innerHTML="Dettaglio stazione "+stazione+" settimana "+week2[1]+" del "+week2[0];
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById('hiddenContenutoDettaglio').innerHTML= this.responseText;
            document.getElementById('contenutoDettaglio').innerHTML=document.getElementById('myTableDettaglio').outerHTML;
            dettaglio=0;
        }
    };
    xmlhttp.open("POST", "getDettaglioMonStorico.php?stazione="+stazione+"&week="+week, true);
    xmlhttp.send();
}
function getDettaglioPtoPtoResiduo(stazione,week) 
{ 
    topFunction();
    document.getElementById('titoloDettaglio').innerHTML="";
    document.getElementById('contenutoDettaglio').innerHTML="";
    var week2=week.split("_");
    week=week2[0]+week2[1];
    stazioneG=stazione;
    weekG=week;
    tipoG="residuo";
    document.getElementById('popupDettaglio').style.display="inline-block";
    document.getElementById('titoloDettaglio').innerHTML="Dettaglio residuo stazione "+stazione+" precedente alla settimana "+week2[1]+" del "+week2[0];
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById('hiddenContenutoDettaglio').innerHTML= this.responseText;
            console.log(this.responseText);
            document.getElementById('contenutoDettaglio').innerHTML=document.getElementById('myTableDettaglio').outerHTML;
            dettaglio=0;
        }
    };
    xmlhttp.open("POST", "getDettaglioPtoPtoResiduoStorico.php?stazione="+stazione+"&week="+week, true);
    xmlhttp.send();
}
function getDettaglioVerResiduo(stazione,week) 
{
    topFunction();
    document.getElementById('titoloDettaglio').innerHTML="";
    document.getElementById('contenutoDettaglio').innerHTML="";
    var week2=week.split("_");
    week=week2[0]+week2[1];
    stazioneG=stazione;
    weekG=week;
    tipoG="residuo";
    document.getElementById('popupDettaglio').style.display="inline-block";
    document.getElementById('titoloDettaglio').innerHTML="Dettaglio residuo stazione "+stazione+" precedente alla settimana "+week2[1]+" del "+week2[0];
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById('hiddenContenutoDettaglio').innerHTML= this.responseText;
            document.getElementById('contenutoDettaglio').innerHTML=document.getElementById('myTableDettaglio').outerHTML;
            dettaglio=0;
        }
    };
    xmlhttp.open("POST", "getDettaglioVerResiduoStorico.php?stazione="+stazione+"&week="+week, true);
    xmlhttp.send();
}
function getDettaglioMonResiduo(stazione,week) 
{
    topFunction();
    document.getElementById('titoloDettaglio').innerHTML="";
    document.getElementById('contenutoDettaglio').innerHTML="";
    var week2=week.split("_");
    week=week2[0]+week2[1];
    stazioneG=stazione;
    weekG=week;
    tipoG="residuo";
    document.getElementById('popupDettaglio').style.display="inline-block";
    document.getElementById('titoloDettaglio').innerHTML="Dettaglio residuo stazione "+stazione+" precedente alla settimana "+week2[1]+" del "+week2[0];
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById('hiddenContenutoDettaglio').innerHTML= this.responseText;
            document.getElementById('contenutoDettaglio').innerHTML=document.getElementById('myTableDettaglio').outerHTML;
            dettaglio=0;
        }
    };
    xmlhttp.open("POST", "getDettaglioMonResiduoStorico.php?stazione="+stazione+"&week="+week, true);
    xmlhttp.send();
}
function fullscreenDettaglio()
{
    document.getElementById('tipoH').value=tipoG;
    document.getElementById('stazioneH').value=stazioneG;
    document.getElementById('weekH').value=weekG;
    document.getElementById('TheForm').submit();
}
function downloadExcel()
{
    if(dettaglio==0)
    {
        tableToExcel('myTableDettaglio');
        return 0;
    }
    if(dettaglio==2)
    {
        tableToExcel('myTableDettaglio2');
        return 0;
    }
}
function fixNSettimane()
{
    if(document.getElementById("nSettimane").value<4)
        document.getElementById("nSettimane").value=4;
    if(document.getElementById("nSettimane").value>52)
        document.getElementById("nSettimane").value=52;
}
function topFunction() 
{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
function nextDettaglio()
{
    if(dettaglio==0)
    {
        document.getElementById('contenutoDettaglio').innerHTML=document.getElementById('myTableDettaglio2').outerHTML;
        dettaglio=2;
        return 0;
    }
    if(dettaglio==2)
    {
        document.getElementById('contenutoDettaglio').innerHTML=document.getElementById('myTableDettaglio').outerHTML;
        dettaglio=0;
        return 0;
    }
}
function esportaExcelTabella(select)
{
    if(select.value==1)
    {
        tableToExcel('myTableTabelleCarichiDiLavoro');
    }
    if(select.value==2)
    {
        var oldTable=document.getElementById("myTableTabelleCarichiDiLavoro").outerHTML;

        var table=document.getElementById("myTableTabelleCarichiDiLavoro");

        var th=document.createElement("th");
        th.innerHTML="Valore";
        table.rows[0].insertBefore(th, table.rows[0].children[1]);

        for (var i = 1, row; row = table.rows[i]; i++)
        {
            var td=document.createElement("td");
            if(stazioneSelezionata=="punto_punto")
            {
                td.innerHTML="Ordini<br>Pezzi";
            }
            if(stazioneSelezionata=="verniciatura")
            {
                td.innerHTML="Ordini<br>Pezzi<br>Mq";
            }
            if(stazioneSelezionata=="montaggio")
            {
                td.innerHTML="Ordini<br>Basi portalavabo<br>Basi accostabili<br>Colonne<br>Pensili<br>Altro<br>Totale pezzi";
            }            
            row.insertBefore(td, row.children[1]);
        }
        for (var i = 1, row; row = table.rows[i]; i++)
        {
            var col=row.cells[0];
            if(stazioneSelezionata=="punto_punto")
            {
                col.innerHTML="PTO_PTO<br>PTO_PTO";
            }
            if(stazioneSelezionata=="verniciatura")
            {
                var stazioneHelp=col.innerHTML;
                col.innerHTML=stazioneHelp+"<br>"+stazioneHelp+"<br>"+stazioneHelp;
            }
            if(stazioneSelezionata=="montaggio")
            {
                var stazioneHelp=col.innerHTML;
                col.innerHTML=stazioneHelp+"<br>"+stazioneHelp+"<br>"+stazioneHelp+"<br>"+stazioneHelp+"<br>"+stazioneHelp+"<br>"+stazioneHelp+"<br>"+stazioneHelp;
            } 

            for (var j = 2, col; col = row.cells[j]; j++)
            {
                var arrayValori=[];
                var arrayChildNodes=col.childNodes;
                for (var k = 0; k < arrayChildNodes.length; k++)
                {
                    var node = arrayChildNodes[k];
                    if(node.tagName=="B")
                        arrayValori.push(node.innerHTML);
                }
                col.innerHTML=arrayValori.join("<br>");
            }  
         }
         tableToExcel('myTableTabelleCarichiDiLavoro');
         document.getElementById("containerStoricoProduzione").innerHTML=oldTable;
    }
    select.value="";
}
var sincronizzati=false;
function checkSincronizzazioneImmaginiAndroid()
{
    newGridSpinner("Controllo sincronizzazione...","topRightCornerToast","","","font-size:100%;color:white");
    document.getElementsByClassName("topRightCornerToast")[0].style.width="250px";	
    document.getElementsByClassName("topRightCornerToast")[0].style.borderLeft="5px solid #4C91CB";	
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            if(this.responseText=="ok")
            {
                sincronizzati=true;
                document.getElementById("topRightCornerToast").innerHTML ='<i class="fal fa-check" style="font-size:140%;margin-right:20px;"></i>Allegati sincronizzati';
                setTimeout(function()
                {
                    document.getElementsByClassName("topRightCornerToast")[0].style.width="0px";
                    document.getElementsByClassName("topRightCornerToast")[0].style.borderLeft="none";										
                    document.getElementById("topRightCornerToast").innerHTML ="";
                }, 3000);
            }
            else
            {
                sincronizzati=false;
                document.getElementById("topRightCornerToast").innerHTML ="<i class='fal fa-exclamation-circle' style='color:red;font-size:140%;margin-left:30px;float:left;display:inline-block;margin-top:23px;'></i><button class='btnSincronizza' onclick='importaImmaginiAndroid()'>Sincronizza allegati</button>";
            }
        }
    };
    xmlhttp.open("POST", "checkSincronizzazioneImmaginiAndroid.php?", true);
    xmlhttp.send();
}
function importaImmaginiAndroid()
{
    document.getElementById("btnElencoRegistrazioni").disabled = true;
    document.getElementById("btnFotoOrdini").disabled = true;
    newGridSpinner("Sincronizzazione allegati...","topRightCornerToast","","","font-size:100%;color:white");
    document.getElementsByClassName("topRightCornerToast")[0].style.width="250px";	
    document.getElementsByClassName("topRightCornerToast")[0].style.borderLeft="5px solid #4C91CB";	
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById("btnElencoRegistrazioni").disabled = false;
            document.getElementById("btnFotoOrdini").disabled = false;
            if(this.responseText=="ERRORE")
            {
                sincronizzati=false;
                console.log(this.responseText);
                document.getElementById("topRightCornerToast").innerHTML ="<i class='fal fa-exclamation-circle' style='color:red;font-size:140%;margin-right:20px;'></i><b style='color:red'>Errore. Sincronizzazione fallita</b>";
            }
            else
            {
                sincronizzati=true;
                document.getElementById("topRightCornerToast").innerHTML =this.responseText;
                setTimeout(function()
                {
                    document.getElementsByClassName("topRightCornerToast")[0].style.width="0px";
                    document.getElementsByClassName("topRightCornerToast")[0].style.borderLeft="none";										
                    document.getElementById("topRightCornerToast").innerHTML ="";
                }, 3000);
            }
        }
    };
    xmlhttp.open("POST", "importaImmaginiAndroid.php?", true);
    xmlhttp.send();
}
function newGridSpinner(message,container,spinnerContainerStyle,spinnerStyle,messageStyle)
{
    document.getElementById(container).innerHTML='<div id="gridSpinnerContainer"  style="'+spinnerContainerStyle+'"><div  style="'+spinnerStyle+'" class="sk-cube-grid"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div> <div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div><div id="messaggiSpinner" style="'+messageStyle+'">'+message+'</div></div>';
}
function resetStyle()
{
    var all=document.getElementsByClassName("menuListButtonActive");
    for (var i = 0; i < all.length; i++) 
    {
        all[i].className="menuListButton";
    }
}
var getParamsColonnaFiltro=null;
var getParamsValoreFiltro=null;
if(document.getElementById("getParamsColonnaFiltro")!=undefined)
    getParamsColonnaFiltro=document.getElementById("getParamsColonnaFiltro").value;
if(document.getElementById("getParamsValoreFiltro")!=undefined)
    getParamsValoreFiltro=document.getElementById("getParamsValoreFiltro").value;
function getElencoRegistrazioniProduzione()
{
    newCircleSpinner("Caricamento in corso...");
    
    document.getElementById("btnElencoRegistrazioni").classList.remove("menuListButton");
    document.getElementById("btnElencoRegistrazioni").className="menuListButtonActive";
    document.getElementById("registrazioniProduzioneContainer").innerHTML ="";
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            removeCircleSpinner();
            document.getElementById("registrazioniProduzioneContainer").innerHTML =this.responseText;
            if(getParamsColonnaFiltro!=null && getParamsValoreFiltro!=null)
            {
                document.getElementById("searchInputRegistrazioniProduzione").value=getParamsValoreFiltro;
                seacrhTable();
                getParamsColonnaFiltro=null;
                getParamsValoreFiltro=null;
            }
        }
    };
    xmlhttp.open("POST", "getElencoRegistrazioniProduzione.php?", true);
    xmlhttp.send();
}
function getFotoOrdini()
{
    newCircleSpinner("Caricamento in corso...");
    
    document.getElementById("btnFotoOrdini").classList.remove("menuListButton");
    document.getElementById("btnFotoOrdini").className="menuListButtonActive";
    document.getElementById("registrazioniProduzioneContainer").innerHTML ="";
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            removeCircleSpinner();
            document.getElementById("registrazioniProduzioneContainer").innerHTML =this.responseText;
        }
    };
    xmlhttp.open("POST", "getFotoOrdini.php?", true);
    xmlhttp.send();
}
function getFotoStazioni(ordine)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById("registrazioniProduzioneContainer").innerHTML =this.responseText;
        }
    };
    xmlhttp.open("POST", "getFotoStazioni.php?ordine="+ordine, true);
    xmlhttp.send();
}
function getFotoImmagini(ordine,stazione)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById("registrazioniProduzioneContainer").innerHTML =this.responseText;
        }
    };
    xmlhttp.open("POST", "getFotoImmagini.php?ordine="+ordine+"&stazione="+stazione, true);
    xmlhttp.send();
}
function sortTable(index) 
{
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTableElencoRegistrazioni");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) 
    {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) 
        {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[index];
            y = rows[i + 1].getElementsByTagName("TD")[index];
            // Check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) 
            {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) 
        {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
function seacrhTable() 
{
    var value = $('#searchInputRegistrazioniProduzione').val().toLowerCase();
    $(".myTableElencoRegistrazioniRowNormal").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}
function seacrhOrdine()
{
    var value = $('#searchInputRegistrazioniProduzione').val().toLowerCase();
    $(".folderOrdine").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}
function seacrhImmagine()
{
    var value = $('#searchInputRegistrazioniProduzione').val().toLowerCase();
    $(".imgOrdiniContainer").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}
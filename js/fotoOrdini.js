    var sincronizzati=false;
    function checkSincronizzazioneImmaginiAndroid()
    {
        newGridSpinner("Controllo sincronizzazione...","topRightCornerToast","","","font-size:100%;color:white");
        document.getElementsByClassName("topRightCornerToast")[0].style.width="250px";	
        document.getElementsByClassName("topRightCornerToast")[0].style.borderLeft="5px solid #4C91CB";	
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = async function() 
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
                    var ultimaSincronizzazione=await getUltimaSincronizzazione();
                    document.getElementById("topRightCornerToast").innerHTML ="<i class='fal fa-exclamation-circle' style='color:red;font-size:140%;margin-left:30px;float:left;display:inline-block;margin-top:23px;'></i><button data-tooltip='"+ultimaSincronizzazione+"' class='btnSincronizza' onclick='importaImmaginiAndroid()'>Sincronizza foto</button>";
                }
            }
        };
        xmlhttp.open("POST", "checkSincronizzazioneImmaginiAndroid.php?", true);
        xmlhttp.send();
    }
    function getUltimaSincronizzazione()
    {
        return new Promise(function (resolve, reject) 
        {
            $.get("getUltimaSincronizzazioneFotoOrdini.php",
            function(response, status)
            {
                if(status=="success")
                {
                    if(response.indexOf("error")>-1 || response.indexOf("notice")>-1 || response.indexOf("warning")>-1)
                    {
                        console.log(response);
                        reject({response});
                    }
                    else
                    {
                        resolve(response);
                    }
                }
                else
                    reject({status});
            });
        });
    }
    function importaImmaginiAndroid()
    {
        newGridSpinner("Sincronizzazione allegati...","topRightCornerToast","","","font-size:100%;color:white");
        document.getElementsByClassName("topRightCornerToast")[0].style.width="250px";	
        document.getElementsByClassName("topRightCornerToast")[0].style.borderLeft="5px solid #4C91CB";	
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
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
    function getFotoOrdini()
    {
        newCircleSpinner("Caricamento in corso...");
        
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
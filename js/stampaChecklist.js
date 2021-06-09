var flexDirection="row";
var orderBy="n_Pick";
var orderType="DESC";
var filterTop;
var filterChiuso="both";
var filterControllato="both";
var filterStampato="both";
var hotCompilaChecklist;

window.addEventListener("load", async function(event)
{
    checkFlexDirection();

    getElencoPick();

    var selectCompilaChecklist=document.getElementById("selectCompilaChecklist");
    var option=document.createElement("option");
    option.setAttribute("value","");
    option.setAttribute("selected","selected");
    option.setAttribute("disabled","disabled");
    option.innerHTML="Compila checklist";
    selectCompilaChecklist.appendChild(option);
    var picks=await getPicksPopupCompilaChecklist();
    selectCompilaChecklist.disabled=false;
    picks.forEach(pick =>
    {
        var option=document.createElement("option");
        option.setAttribute("value",pick.n_pick);
        option.innerHTML="<b>"+pick.n_pick+"</b> ("+pick.descrizione_pick+")";
        selectCompilaChecklist.appendChild(option);
    });
    
    $("#selectCompilaChecklist").multipleSelect(
    {
        single:true,
        onAfterCreate: function () 
                {
                    $(".ms-choice").css({"height":"30px","line-height":"30px","background-color":"transparent","border":"none"});
                    $(".ms-choice span").css({"font-family":"'Montserrat',sans-serif","font-size":"12px","text-align":"left","color":"black"});
                    $(".ms-parent").css({"width":"145px"});
                    $(".ms-drop").css({"width":"350px"});
                },
        onOpen:function()
        {
            $(".ms-search input").css({"font-family":"'Montserrat',sans-serif","font-size":"12px","text-align":"left"});
            $(".optgroup").css({"font-family":"'Montserrat',sans-serif","font-size":"12px","text-align":"left"});
            $(".ms-drop ul").css({"font-family":"'Montserrat',sans-serif","font-size":"12px","text-align":"left"});
        },
        onClose:function()
        {
            $(".ms-choice span").innerHTML="Compila checklist";
            getPopupCompilaChecklist();
        },
        filter:true,
        filterPlaceholder:"Cerca pick...",
        locale:"it-IT"
    });
});
function checkFlexDirection()
{
    document.getElementById("btnFlexDirectionRow").style.color="black";
    document.getElementById("btnFlexDirectionColumn").style.color="black";
    if(flexDirection=="row")
        document.getElementById("btnFlexDirectionRow").style.color="#4C91CB";
    else
        document.getElementById("btnFlexDirectionColumn").style.color="#4C91CB";
}
function changeFlexDirection()
{
    if(flexDirection=="row")
        flexDirection="column"
    else
        flexDirection="row";

    checkFlexDirection();
    getElencoPick();
}
function stampaImmediata(n_Pick)
{
    window.open('anteprimaDiStampaChecklist.php?N_Pick='+n_Pick+'&stampaImmediata=true', '_blank','location=yes,height=800,width=1300,scrollbars=yes,status=yes');
    $.get("cheskStampatoChecklist.php",
    {
        n_Pick
    },
    function(response, status)
    {
        if(status=="success")
        {
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                console.log(response);
            }
            else
            {
                if(response.indexOf("true")>-1)
                {
                    //console.log("e gia stato stampato, non serve far partire l interval");
                }
                else
                {
                    setIntervalStampato(n_Pick);
                }
            }
        }
        else
            reject({status});
    });
}
function anteprimaDiStampa(n_Pick)
{
    window.open('anteprimaDiStampaChecklist.php?N_Pick='+n_Pick, '_blank','location=yes,height=800,width=1300,scrollbars=yes,status=yes');
    $.get("cheskStampatoChecklist.php",
    {
        n_Pick
    },
    function(response, status)
    {
        if(status=="success")
        {
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                console.log(response);
            }
            else
            {
                if(response.indexOf("true")>-1)
                {
                    //console.log("e gia stato stampato, non serve far partire l interval");
                }
                else
                {
                    setIntervalStampato(n_Pick);
                }
            }
        }
        else
            reject({status});
    });
}
function setIntervalStampato(n_Pick)
{
    var intervalStampato = setInterval(cheskStampato, 1000);

    function cheskStampato() 
    {
        $.get("cheskStampatoChecklist.php",
        {
            n_Pick
        },
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    console.log(response);
                }
                else
                {
                    console.log(response);
                    if(response.indexOf("true")>-1)
                    {
                        clearIntervalStampato();
                        getElencoPick();
                        console.log("stampato");
                    }
                    else
                        console.log("non stampato");
                }
            }
            else
                reject({status});
        });
    }

    function clearIntervalStampato()
    {
        clearInterval(intervalStampato);
    }
}
function searchPicks(input)
{
    var filter, ul, li, a, i, txtValue;
    filter = input.value.toUpperCase();
    ul = document.getElementById("stampaChecklistContainer");
    li = ul.getElementsByClassName("pick-item-outer-container");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("pick-item-n_Pick-container")[0];
        b = li[i].getElementsByClassName("pick-item-descrPick-container")[0];
        txtValue = a.textContent || a.innerText;
        txtValue2 = b.textContent || b.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
function toggleFilterButtons(button,filter)
{
    if(filter=='chiuso')
    {
        if(button=='bntFilterChiusi')
        {
            if(filterChiuso=="both")
            {
                filterChiuso='true';
            }
            else
            {
                filterChiuso='both';
            }
        }
        if(button=='bntFilterAperti')
        {
            if(filterChiuso=='true')
            {
                filterChiuso='both'
            }
            else
            {
                filterChiuso='false'
            }
        }
    }
    if(filter=='controllato')
    {
        if(button=='bntFilterControllati')
        {
            if(filterControllato=="both")
            {
                filterControllato='true';
            }
            else
            {
                filterControllato='both';
            }
        }
        if(button=='bntFilterNonControllati')
        {
            if(filterControllato=='true')
            {
                filterControllato='both'
            }
            else
            {
                filterControllato='false'
            }
        }
    }
    if(filter=='stampato')
    {
        if(button=='bntFilterStampati')
        {
            if(filterStampato=="both")
            {
                filterStampato='true';
            }
            else
            {
                filterStampato='both';
            }
        }
        if(button=='bntFilterNonStampati')
        {
            if(filterStampato=='true')
            {
                filterStampato='both'
            }
            else
            {
                filterStampato='false'
            }
        }
    }
}
function checkFilters()
{
    filterTop=document.getElementById("inputFilterTop").value;
    document.getElementById("bntFilterChiusi").style.color="black";document.getElementById("bntFilterChiusi").style.border="0.5px solid rgba(0,0,0,0.20)";
    document.getElementById("bntFilterAperti").style.color="black";document.getElementById("bntFilterAperti").style.border="0.5px solid rgba(0,0,0,0.20)";
    if(filterChiuso=="true")
        {document.getElementById("bntFilterChiusi").style.color="#4C91CB";document.getElementById("bntFilterChiusi").style.border="0.5px solid #4C91CB";}
    if(filterChiuso=="false")
        {document.getElementById("bntFilterAperti").style.color="#4C91CB";document.getElementById("bntFilterAperti").style.border="0.5px solid #4C91CB";}
    if(filterChiuso=="both")
    {
        document.getElementById("bntFilterChiusi").style.color="#4C91CB";document.getElementById("bntFilterChiusi").style.border="0.5px solid #4C91CB";
        document.getElementById("bntFilterAperti").style.color="#4C91CB";document.getElementById("bntFilterAperti").style.border="0.5px solid #4C91CB";
    }
    
    document.getElementById("bntFilterControllati").style.color="black";document.getElementById("bntFilterControllati").style.border="0.5px solid rgba(0,0,0,0.20)";
    document.getElementById("bntFilterNonControllati").style.color="black";document.getElementById("bntFilterNonControllati").style.border="0.5px solid rgba(0,0,0,0.20)";
    if(filterControllato=="true")
        {document.getElementById("bntFilterControllati").style.color="#4C91CB";document.getElementById("bntFilterControllati").style.border="0.5px solid #4C91CB";}
    if(filterControllato=="false")
        {document.getElementById("bntFilterNonControllati").style.color="#4C91CB";document.getElementById("bntFilterNonControllati").style.border="0.5px solid #4C91CB";}
    if(filterControllato=="both")
    {
        document.getElementById("bntFilterControllati").style.color="#4C91CB";document.getElementById("bntFilterControllati").style.border="0.5px solid #4C91CB";
        document.getElementById("bntFilterNonControllati").style.color="#4C91CB";document.getElementById("bntFilterNonControllati").style.border="0.5px solid #4C91CB";
    }

    document.getElementById("bntFilterStampati").style.color="black";document.getElementById("bntFilterStampati").style.border="0.5px solid rgba(0,0,0,0.20)";
    document.getElementById("bntFilterNonStampati").style.color="black";document.getElementById("bntFilterNonStampati").style.border="0.5px solid rgba(0,0,0,0.20)";
    if(filterStampato=="true")
        {document.getElementById("bntFilterStampati").style.color="#4C91CB";document.getElementById("bntFilterStampati").style.border="0.5px solid #4C91CB";}
    if(filterStampato=="false")
        {document.getElementById("bntFilterNonStampati").style.color="#4C91CB";document.getElementById("bntFilterNonStampati").style.border="0.5px solid #4C91CB";}
    if(filterStampato=="both")
    {
        document.getElementById("bntFilterStampati").style.color="#4C91CB";document.getElementById("bntFilterStampati").style.border="0.5px solid #4C91CB";
        document.getElementById("bntFilterNonStampati").style.color="#4C91CB";document.getElementById("bntFilterNonStampati").style.border="0.5px solid #4C91CB";
    }

    document.getElementById("bntOrderNPick").style.color="black";document.getElementById("bntOrderNPick").style.border="0.5px solid rgba(0,0,0,0.20)";
    document.getElementById("bntOrderData").style.color="black";document.getElementById("bntOrderData").style.border="0.5px solid rgba(0,0,0,0.20)";
    if(orderBy=="n_Pick")
        {document.getElementById("bntOrderNPick").style.color="#4C91CB";document.getElementById("bntOrderNPick").style.border="0.5px solid #4C91CB";}
    else
        {document.getElementById("bntOrderData").style.color="#4C91CB";document.getElementById("bntOrderData").style.border="0.5px solid #4C91CB";}
}
async function getElencoPick()
{
    document.getElementById("stampaChecklistSearchBar").value="";
    var actionBar=document.getElementById("stampaChecklistActionBar");
    var container=document.getElementById("stampaChecklistContainer");
    container.innerHTML="";
    if(flexDirection=="row")
        container.setAttribute("class","stampa-checklist-container-row");
    else
        container.setAttribute("class","stampa-checklist-container-column");

    //getFaSpinner(actionBar,"actionBar","Caricamento in corso...");
    Swal.fire
    ({
        title: "Caricamento in corso...",
        background: "transparent",
        html: '<i style="color:white" class="fad fa-spinner-third fa-spin fa-4x"></i>',
        showConfirmButton:false,
        showCloseButton:false,
        allowEscapeKey:false,
        allowOutsideClick:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
    });

    checkFilters();
    var picks=await getPicks();
    //console.log(picks);
    picks.forEach(pick => 
    {
        //console.log(pick);

        var outerContainer=document.createElement("div");
        if(flexDirection=="row")
            outerContainer.setAttribute("class","pick-item-outer-container pick-item-outer-container-row");
        else
            outerContainer.setAttribute("class","pick-item-outer-container pick-item-outer-container-column");
        outerContainer.setAttribute("id","pickItemOuterContainer"+pick.n_Pick);

        var row=document.createElement("div");
        row.setAttribute("class","pick-item-row");
        row.setAttribute("style","flex-direction:row");

        var rowItem=document.createElement("div");
        rowItem.setAttribute("class","pick-item-row-item");
        rowItem.setAttribute("style","flex-direction:row");

        var info=document.createElement("div");
        info.setAttribute("class","pick-item-n_Pick-container");
        info.innerHTML="<span>"+pick.n_Pick+"</span>";
        rowItem.appendChild(info);
        row.appendChild(rowItem);

        var rowItem=document.createElement("div");
        rowItem.setAttribute("class","pick-item-row-item");
        rowItem.setAttribute("style","flex-direction:row;width:100%");
        var rowItem2=document.createElement("div");
        rowItem2.setAttribute("class","pick-item-row-item");
        rowItem2.setAttribute("style","flex-direction:column;height:45px;justify-content:space-evenly;padding-left:10px;box-sizing:border-box;width:calc(100% - 450px);overflow:hidden");
        var info=document.createElement("div");
        info.setAttribute("class","pick-item-info-container");
        info.setAttribute("style","color:gray");
        info.innerHTML=pick.DataPick;
        rowItem2.appendChild(info);
        var info=document.createElement("div");
        info.setAttribute("class","pick-item-descrPick-container");
        info.setAttribute("style","font-weight:bold");
        info.innerHTML=pick.descrPick;
        rowItem2.appendChild(info);
        rowItem.appendChild(rowItem2);
        var rowItem3=document.createElement("div");
        rowItem3.setAttribute("class","pick-item-row-item");
        rowItem3.setAttribute("style","height:45px;width:430px;margin-left:20px;flex-direction:row;align-items:center;justify-content:space-evenly;box-sizing:border-box;background-color:#f0f0f0;border-radius:7px");
        
        var info=document.createElement("div");
        info.setAttribute("class","pick-item-stato-container");
        if(pick.chiuso=="true")
        {
            var stato="Chiuso";
            var icon=document.createElement("i");
            icon.setAttribute("class","fad fa-check-circle");
            var backgroundColor="#70B085";
            var message=null;
            if(pick.dataChiusura!=null && pick.utenteChiusura!=null)
                message="Chiuso da "+pick.utenteChiusura+" il "+pick.dataChiusura;
        }
        else
        {
            var message=null;
            var stato="Aperto";
            var icon=document.createElement("i");
            icon.setAttribute("class","fad fa-exclamation-circle");
            var backgroundColor="#DA6969";
        }
        var span=document.createElement("span");
        span.innerHTML=stato;
        info.appendChild(span);
        info.appendChild(icon);
        if(message!=null)
            info.setAttribute("title",message);
        info.setAttribute("style","color:"+backgroundColor);
        rowItem3.appendChild(info);

        var info=document.createElement("div");
        info.setAttribute("class","pick-item-stato-container");
        if(pick.controllato=="true")
        {
            var stato="Controllato";
            var icon=document.createElement("i");
            icon.setAttribute("class","fad fa-check-circle");
            var backgroundColor="#70B085";
            var message=null;
            if(pick.dataControllato!=null && pick.utenteControllato!=null)
                message="Controllato da "+pick.utenteControllato+" il "+pick.dataControllato;
        }
        else
        {
            var message=null;
            var stato="Non controllato";
            var icon=document.createElement("i");
            icon.setAttribute("class","fad fa-exclamation-circle");
            var backgroundColor="#DA6969";
        }
        var span=document.createElement("span");
        span.innerHTML=stato;
        info.appendChild(span);
        info.appendChild(icon);
        info.setAttribute("style","color:"+backgroundColor);
        if(message!=null)
            info.setAttribute("title",message);
        rowItem3.appendChild(info);

        var info=document.createElement("div");
        info.setAttribute("class","pick-item-stato-container");
        if(pick.stampato=="true")
        {
            var stato="Stampato";
            var icon=document.createElement("i");
            icon.setAttribute("class","fad fa-check-circle");
            var backgroundColor="#70B085";
            var message=null;
            if(pick.data_stampa_cecklist!=null && pick.utente_stampa_checklist!=null)
                message="Stampato da "+pick.utente_stampa_checklist+" il "+pick.data_stampa_cecklist;
        }
        else
        {
            var message=null;
            var stato="Non stampato";
            var icon=document.createElement("i");
            icon.setAttribute("class","fad fa-exclamation-circle");
            var backgroundColor="#DA6969";
        }
        var span=document.createElement("span");
        span.innerHTML=stato;
        info.appendChild(span);
        info.appendChild(icon);
        if(message!=null)
            info.setAttribute("title",message);
        info.setAttribute("style","color:"+backgroundColor);
        rowItem3.appendChild(info);

        rowItem.appendChild(rowItem3);
        row.appendChild(rowItem);

        outerContainer.appendChild(row);

        var row=document.createElement("div");
        row.setAttribute("class","pick-item-row");
        row.setAttribute("style","flex-direction:row;width:100%;");

        var rowItem=document.createElement("div");
        rowItem.setAttribute("class","pick-item-row-item");
        rowItem.setAttribute("style","flex-direction:row;align-items:center;height:45px;box-sizing:border-box;background-color:#f0f0f0;border-radius:7px;margin-top:10px;");
        var info=document.createElement("div");
        info.setAttribute("class","pick-item-info-container");
        info.setAttribute("style","display:flex;flex-direction:column;justify-content:center;align-items:center;margin-right:10px;margin-left:10px");
        info.innerHTML="<b style='color:#4C91CB'>"+pick.nOrdini+"</b><b>Ordini</b>";
        rowItem.appendChild(info);
        var info=document.createElement("div");
        info.setAttribute("class","pick-item-info-container");
        info.setAttribute("style","display:flex;flex-direction:column;justify-content:center;align-items:center;margin-right:10px;margin-left:10px");
        info.innerHTML="<b style='color:#4C91CB'>"+pick.nBancali+"</b><b>Bancali</b>";
        rowItem.appendChild(info);
        var info=document.createElement("div");
        info.setAttribute("class","pick-item-info-container");
        info.setAttribute("style","display:flex;flex-direction:column;justify-content:center;align-items:center;margin-right:10px;margin-left:10px");
        info.innerHTML="<b style='color:#4C91CB'>"+pick.nGruppi+"</b><b>Scatole</b>";
        rowItem.appendChild(info);
        var info=document.createElement("div");
        info.setAttribute("class","pick-item-info-container");
        info.setAttribute("style","display:flex;flex-direction:column;justify-content:center;align-items:center;margin-right:10px;margin-left:10px");
        info.innerHTML="<b style='color:#4C91CB'>"+pick.righe+"</b><b>Righe</b>";
        rowItem.appendChild(info);
        var info=document.createElement("div");
        info.setAttribute("class","pick-item-info-container");
        info.setAttribute("style","display:flex;flex-direction:column;justify-content:center;align-items:center;margin-right:10px;margin-left:10px");
        info.innerHTML="<b style='color:#4C91CB'>"+pick.righeChiuse+"/"+pick.righe+"</b><b>Chiuse</b>";
        rowItem.appendChild(info);
        /*var info=document.createElement("div");
        info.setAttribute("class","pick-item-info-container");
        info.setAttribute("style","display:flex;flex-direction:column;justify-content:center;align-items:center;margin-right:10px;margin-left:10px");
        info.innerHTML="<i class='fad fa-file-search fa-2x' style=''></i>";
        rowItem.appendChild(info);*/
        var button=document.createElement("button");
        button.setAttribute("class","pick-item-btn-dettaglio");
        button.setAttribute("onclick","getPopupDettaglioRighePick("+pick.n_Pick+")");
        button.setAttribute("title","Dettaglio righe");
        button.innerHTML="<i class='fad fa-file-search'></i>";
        rowItem.appendChild(button);
        row.appendChild(rowItem);

        var rowItem2=document.createElement("div");
        rowItem2.setAttribute("class","pick-item-row-item");
        rowItem2.setAttribute("style","flex-direction:row;width:450px;height:45px;align-items:center;margin-left:auto;margin-top:10px;");

        /*var buttonAnteprimaDiStampa=document.createElement("button");
        buttonAnteprimaDiStampa.setAttribute("class","pick-item-print-button");
        buttonAnteprimaDiStampa.setAttribute("onclick","anteprimaDiStampa("+pick.n_Pick+")");
        buttonAnteprimaDiStampa.innerHTML='<span>Anteprima di stampa</span><i class="fad fa-print"></i>';
        rowItem2.appendChild(buttonAnteprimaDiStampa);*/

        var buttonStampaExcel=document.createElement("button");
        buttonStampaExcel.setAttribute("class","pick-item-print-button");
        buttonStampaExcel.setAttribute("style","background-color:#217346");
        buttonStampaExcel.setAttribute("onclick","stampaPickConExcel("+pick.n_Pick+")");
        buttonStampaExcel.innerHTML='<span>Stampa Excel</span><i class="fad fa-file-excel"></i>';
        rowItem2.appendChild(buttonStampaExcel);

        var buttonStampaImmediata=document.createElement("button");
        buttonStampaImmediata.setAttribute("class","pick-item-print-button");
        buttonStampaImmediata.setAttribute("onclick","stampaImmediata("+pick.n_Pick+")");
        buttonStampaImmediata.innerHTML='<span>Stampa immediata</span><i class="fad fa-print"></i>';
        rowItem2.appendChild(buttonStampaImmediata);

        row.appendChild(rowItem2);

        outerContainer.appendChild(row);

        container.appendChild(outerContainer);
    });

    if(flexDirection=="row")
    {
        var containerHasVerticalScrollbar = container.scrollHeight > container.clientHeight;
        if(containerHasVerticalScrollbar)
        {
            $("#stampaChecklistContainer").css({"padding-right":"0px"});
        }
        else
        {
            $("#stampaChecklistContainer").css({"padding-right":"5px"});
        }
    }
    else
    {
        var containerHasVerticalScrollbar = container.scrollHeight > container.clientHeight;
        if(containerHasVerticalScrollbar)
            $(".pick-item-outer-container").css({"width":"calc(100% - 15px)"});
        else
            $(".pick-item-outer-container").css({"width":"calc(100% - 20px)"});
    }
    //removeFaSpinner("actionBar");
    Swal.close();
}
function getPicks()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getPicks.php",
        {
            filterTop,
            filterChiuso,
            filterControllato,
            filterStampato,
            orderBy,
            orderType
        },
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire
                    ({
                        icon: 'error',
                        title: "Errore. Se il problema persiste contatta l' amministratore"
                    });
                    console.log(response);
                    resolve([]);
                }
                else
                    resolve(JSON.parse(response));
            }
            else
                reject({status});
        });
    });
}
function aggiornaCarichi()
{
    Swal.fire
    ({
        title: "Caricamento in corso...",
        background: "transparent",
        html: '<i style="color:white" class="fad fa-spinner-third fa-spin fa-4x"></i>',
        showConfirmButton:false,
        showCloseButton:false,
        allowEscapeKey:false,
        allowOutsideClick:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
    });
    $.post("aggiornaCarichi.php",
    function(response, status)
    {
        if(status=="success")
        {
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                Swal.fire
                ({
                    icon: 'error',
                    title: "Errore. Se il problema persiste contatta l' amministratore"
                });
                console.log(response);
            }
            else
            {
                Swal.fire
                ({
                    icon:"success",
                    title: "Aggiornamento completato",
                    onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
                }).then((result) =>
                {
                    getElencoPick();
                });
            }
        }
        else
            reject({status});
    });
}
async function getPopupDettaglioRighePick(n_Pick)
{
    Swal.fire
    ({
        width:"100%",
        background:"transparent",
        title:"Caricamento in corso...",
        html:'<i class="fad fa-spinner-third fa-spin fa-3x" style="color:white"></i>',
        allowOutsideClick:false,
        showCloseButton:false,
        showConfirmButton:false,
        showCancelButton:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
    });

    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","popup-dettaglio-righe-pick-outer-container");
    outerContainer.setAttribute("id","tabellaDettaglioRighePickContainer");
    //outerContainer.setAttribute("style","overflow:auto");

    var arrayResponse=await getDettaglioRighePick(n_Pick,"docnum");
    var righe_pick=arrayResponse.righe_pick;
    var totali=arrayResponse.totali;

    var tabellaDettaglioRighePick=document.createElement("table");
    tabellaDettaglioRighePick.setAttribute("id","tabellaDettaglioRighePick");

    var tr=document.createElement("tr");

    var th=document.createElement("th");th.innerHTML="#";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Ordine";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Riga";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Item code";tr.appendChild(th);
    var th=document.createElement("th");th.setAttribute("style","color:white");th.innerHTML="Descrizione";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Qnt";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Volume";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Peso netto";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Peso lordo";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Misure";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Chiuso";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Data chiusura";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Codice doganale";tr.appendChild(th);
    var th=document.createElement("th");th.innerHTML="Descrizione in lingua";tr.appendChild(th);

    tabellaDettaglioRighePick.appendChild(tr);

    var tr=document.createElement("tr");
    tr.setAttribute("style","background-color:#DA6969");

    var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML="TOTALI";tr.appendChild(td);
    var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML=totali.ordini+" ordini";tr.appendChild(td);
    var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
    var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
    var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
    var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
    var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML=totali.volume.toFixed(2);tr.appendChild(td);
    var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML=totali.pesoNetto.toFixed(2);tr.appendChild(td);
    var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML=totali.pesoLordo.toFixed(2);tr.appendChild(td);
    var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
    var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML=totali.chiusi+"/"+totali.ordini;tr.appendChild(td);
    var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
    var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
    var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);

    tabellaDettaglioRighePick.appendChild(tr);

    righe_pick.forEach(riga =>
    {
        var tr=document.createElement("tr");

        var td=document.createElement("td");td.innerHTML=riga.id_picking;tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga.docNum;tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga.lineNum;tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga.itemCode;tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga.dscription;tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga.quantity;tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga.volume;tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga.pesoNetto;tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga.pesoLordo;tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga.Misure;tr.appendChild(td);
        var td=document.createElement("td");var icon=document.createElement("i");if(riga.chiuso){icon.setAttribute("class","fas fa-check-square");icon.setAttribute("style","color:rgb(48, 133, 214)");}else{icon.setAttribute("class","far fa-square");}td.appendChild(icon);tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga.dataChiusuraString;tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga.codiceDoganale;tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga.descriptionLang;tr.appendChild(td);

        tabellaDettaglioRighePick.appendChild(tr);
    });

    outerContainer.appendChild(tabellaDettaglioRighePick);

    Swal.fire
    ({
        title: "Dettaglio righe pick "+n_Pick,
        html:outerContainer.outerHTML,
        showConfirmButton:false,
        showCloseButton:true,
        //position:"top",
        width:"98%",
        onOpen : function()
        {
            document.getElementsByClassName("swal2-title")[0].style.fontWeight="normal";
            document.getElementsByClassName("swal2-title")[0].style.fontSize="12px";
            document.getElementsByClassName("swal2-title")[0].style.color="white";
            document.getElementsByClassName("swal2-title")[0].style.textAlign="left";
            document.getElementsByClassName("swal2-header")[0].style.backgroundColor="#404040";
            document.getElementsByClassName("swal2-header")[0].style.padding="0px";
            document.getElementsByClassName("swal2-header")[0].style.borderTopLeftRadius="4px";
            document.getElementsByClassName("swal2-header")[0].style.borderTopRightRadius="4px";
            document.getElementsByClassName("swal2-title")[0].style.boxSizing="border-box";
            document.getElementsByClassName("swal2-title")[0].style.marginTop="15px";
            document.getElementsByClassName("swal2-title")[0].style.paddingLeft="10px";
            document.getElementsByClassName("swal2-title")[0].style.alignItems="center";
            document.getElementsByClassName("swal2-title")[0].style.margin="10px";
            document.getElementsByClassName("swal2-title")[0].style.width="100%";
            document.getElementsByClassName("swal2-popup")[0].style.padding="0px";
            document.getElementsByClassName("swal2-popup")[0].style.backgroundColor="transparent";
            document.getElementsByClassName("swal2-close")[0].style.outline="none";
            document.getElementsByClassName("swal2-content")[0].style.padding="0px";

            var button=document.createElement("button");
            button.setAttribute("style","background-color:#217346;margin-left:auto;margin-right: 50px;");
            button.setAttribute("onclick","esportaDettaglioRighePick()");
            button.setAttribute("class","button-dettaglio-righe-pick");
            var span=document.createElement("span");
            span.innerHTML="Esporta";
            button.appendChild(span);
            var i=document.createElement("i");
            i.setAttribute("class","fad fa-file-excel");
            button.appendChild(i);
            document.getElementsByClassName("swal2-title")[0].insertBefore(button, document.getElementsByClassName("swal2-title")[0].childNodes[1]); 

            var button=document.createElement("button");
            button.setAttribute("style","margin-left:10px;border:1px solid #4C91CB;color:#4C91CB");
            button.setAttribute("onclick","getTabellaDettaglioRighePick('raggruppato',this,"+n_Pick+")");
            button.setAttribute("class","button-dettaglio-righe-pick button-tabella-dettaglio-righe-pick");
            var span=document.createElement("span");
            span.innerHTML="Raggruppato";
            button.appendChild(span);
            document.getElementsByClassName("swal2-title")[0].insertBefore(button, document.getElementsByClassName("swal2-title")[0].childNodes[1]); 
            
            var button=document.createElement("button");
            button.setAttribute("style","margin-left:10px;border:1px solid #4C91CB;color:white;background-color:#4C91CB");
            button.setAttribute("onclick","getTabellaDettaglioRighePick('esploso',this,"+n_Pick+")");
            button.setAttribute("class","button-dettaglio-righe-pick button-tabella-dettaglio-righe-pick");
            var span=document.createElement("span");
            span.innerHTML="Esploso";
            button.appendChild(span);
            document.getElementsByClassName("swal2-title")[0].insertBefore(button, document.getElementsByClassName("swal2-title")[0].childNodes[1]); 
        }
    });
}
async function getTabellaDettaglioRighePick(tipo,btn,n_Pick)
{
    var container=document.getElementById("tabellaDettaglioRighePickContainer");
    container.innerHTML="";

    var buttons=document.getElementsByClassName("button-tabella-dettaglio-righe-pick");
    for (let index = 0; index < buttons.length; index++)
    {
        const button = buttons[index];
        button.style.backgroundColor="transparent";
        button.style.color="#4C91CB";
    }
    btn.style.backgroundColor="#4C91CB";
    btn.style.color="white";

    if(tipo=="esploso")
    {
        var arrayResponse=await getDettaglioRighePick(n_Pick,"docnum");
        var righe_pick=arrayResponse.righe_pick;
        var totali=arrayResponse.totali;
    
        var tabellaDettaglioRighePick=document.createElement("table");
        tabellaDettaglioRighePick.setAttribute("id","tabellaDettaglioRighePick");
    
        var tr=document.createElement("tr");
    
        var th=document.createElement("th");th.innerHTML="#";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Ordine";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Riga";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Item code";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Descrizione";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Qnt";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Volume";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Peso netto";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Peso lordo";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Misure";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Chiuso";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Data chiusura";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Codice doganale";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Descrizione in lingua";tr.appendChild(th);
    
        tabellaDettaglioRighePick.appendChild(tr);
    
        var tr=document.createElement("tr");
        tr.setAttribute("style","background-color:#DA6969");
    
        var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML="TOTALI";tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML=totali.ordini+" ordini";tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML=totali.volume.toFixed(2);tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML=totali.pesoNetto.toFixed(2);tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML=totali.pesoLordo.toFixed(2);tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML=totali.chiusi+"/"+totali.ordini;tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
    
        tabellaDettaglioRighePick.appendChild(tr);
    
        righe_pick.forEach(riga =>
        {
            var tr=document.createElement("tr");
    
            var td=document.createElement("td");td.innerHTML=riga.id_picking;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.docNum;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.lineNum;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.itemCode;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.dscription;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.quantity;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.volume;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.pesoNetto;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.pesoLordo;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.Misure;tr.appendChild(td);
            var td=document.createElement("td");var icon=document.createElement("i");if(riga.chiuso){icon.setAttribute("class","fas fa-check-square");icon.setAttribute("style","color:rgb(48, 133, 214)");}else{icon.setAttribute("class","far fa-square");}td.appendChild(icon);tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.dataChiusuraString;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.codiceDoganale;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.descriptionLang;tr.appendChild(td);
    
            tabellaDettaglioRighePick.appendChild(tr);
        });
    
        container.appendChild(tabellaDettaglioRighePick);
    }
    else
    {
        var arrayResponse=await getDettaglioRighePick(n_Pick,"bancale");
        var righe_pick=arrayResponse.righe_pick;
        var totali=arrayResponse.totali;
    
        var tabellaDettaglioRighePick=document.createElement("table");
        tabellaDettaglioRighePick.setAttribute("id","tabellaDettaglioRighePick");
    
        var tr=document.createElement("tr");
    
        var th=document.createElement("th");th.innerHTML="#";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Ordine";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Riga";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Item code";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Descrizione";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Qnt";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Volume";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Peso netto";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Peso lordo";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Misure";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Chiuso";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Data chiusura";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Codice doganale";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Descrizione in lingua";tr.appendChild(th);
        var th=document.createElement("th");th.innerHTML="Bancale";tr.appendChild(th);
    
        tabellaDettaglioRighePick.appendChild(tr);
    
        var tr=document.createElement("tr");
        tr.setAttribute("style","background-color:#DA6969");
    
        var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML="TOTALI";tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML=totali.ordini+" ordini";tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML=totali.volume.toFixed(2);tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML=totali.pesoNetto.toFixed(2);tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML=totali.pesoLordo.toFixed(2);tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML=totali.chiusi+"/"+totali.ordini;tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","color:white");td.innerHTML=totali.bancali+" bancali";tr.appendChild(td);
    
        tabellaDettaglioRighePick.appendChild(tr);
    
        var bancaleBefore;
        var bancaleBeforeObj;
        var pesoNetto=0;
        var pesoLordo=0;
        righe_pick.forEach(riga =>
        {
            var tr=document.createElement("tr");
    
            var td=document.createElement("td");td.innerHTML=riga.id_picking;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.docNum;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.lineNum;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.itemCode;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.dscription;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.quantity;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.volume;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.pesoNetto;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.pesoLordo;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.Misure;tr.appendChild(td);
            var td=document.createElement("td");var icon=document.createElement("i");if(riga.chiuso){icon.setAttribute("class","fas fa-check-square");icon.setAttribute("style","color:rgb(48, 133, 214)");}else{icon.setAttribute("class","far fa-square");}td.appendChild(icon);tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.dataChiusuraString;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.codiceDoganale;tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML=riga.descriptionLang;tr.appendChild(td);
            var td=document.createElement("td");td.setAttribute("style","background-color:#F9EF62");td.innerHTML=riga.nomeBancale;tr.appendChild(td);

            tabellaDettaglioRighePick.appendChild(tr);

            if(riga.bancale!=bancaleBefore && bancaleBefore!=null)
            {
                var tr=document.createElement("tr");
                tr.setAttribute("style","background-color:#F9EF62;border-bottom:2px solid gray");
    
                var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
                var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
                var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
                var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
                var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
                var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
                var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
                var td=document.createElement("td");td.setAttribute("style","font-weight:bold");td.innerHTML=pesoNetto.toFixed(2);tr.appendChild(td);
                //var td=document.createElement("td");td.setAttribute("style","font-weight:bold");td.innerHTML="<b>"+bancaleBeforeObj.pesoBancale+" (pesato)</b><b style='float:right'>"+pesoLordo.toFixed(2)+"</b>";tr.appendChild(td);
                var td=document.createElement("td");td.setAttribute("style","font-weight:bold");td.innerHTML=pesoLordo.toFixed(2)+" - "+bancaleBeforeObj.pesoBancale+" (pesato)";tr.appendChild(td);
                var td=document.createElement("td");td.setAttribute("style","font-weight:bold");td.innerHTML="L."+bancaleBeforeObj.lunghezzaBancale+" H."+bancaleBeforeObj.altezzaBancale+" P."+bancaleBeforeObj.larghezzaBancale;tr.appendChild(td);
                var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
                var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
                var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
                var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
                var td=document.createElement("td");td.setAttribute("style","font-weight:bold");td.innerHTML=bancaleBeforeObj.nomeBancale;tr.appendChild(td);
    
                tabellaDettaglioRighePick.insertBefore(tr, tabellaDettaglioRighePick.lastChild); 

                pesoNetto=riga.pesoNetto;
                pesoLordo=riga.pesoLordo;
            }
            else
            {
                pesoNetto+=riga.pesoNetto;
                pesoLordo+=riga.pesoLordo;
            }

            bancaleBefore=riga.bancale;
            bancaleBeforeObj=riga;    
        });

        var tr=document.createElement("tr");
        tr.setAttribute("style","background-color:#F9EF62;border-bottom:2px solid gray");

        var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","font-weight:bold");td.innerHTML=pesoNetto.toFixed(2);tr.appendChild(td);
        //var td=document.createElement("td");td.setAttribute("style","font-weight:bold");td.innerHTML="<b>"+bancaleBeforeObj.pesoBancale+" (pesato)</b><b style='float:right'>"+pesoLordo.toFixed(2)+"</b>";tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","font-weight:bold");td.innerHTML=pesoLordo.toFixed(2)+" - "+bancaleBeforeObj.pesoBancale+" (pesato)";tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","font-weight:bold");td.innerHTML="L."+bancaleBeforeObj.lunghezzaBancale+" H."+bancaleBeforeObj.altezzaBancale+" P."+bancaleBeforeObj.larghezzaBancale;tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","font-weight:bold");tr.appendChild(td);
        var td=document.createElement("td");td.setAttribute("style","font-weight:bold");td.innerHTML=bancaleBeforeObj.nomeBancale;tr.appendChild(td);

        tabellaDettaglioRighePick.appendChild(tr);
    
        container.appendChild(tabellaDettaglioRighePick);
    }
}
function esportaDettaglioRighePick()
{
    var table=document.getElementById("tabellaDettaglioRighePick");
    var newRow=document.createElement("tr");
    var oldRow=table.getElementsByTagName("tr")[0];
    for (let index = 0; index < oldRow.childNodes.length; index++)
    {
        const th = oldRow.getElementsByTagName("th")[index];
        var td=document.createElement("td");
        td.innerHTML=th.innerHTML;
        newRow.appendChild(td);
    }
    table.insertBefore(newRow, table.childNodes[0]);
    oldRow.remove();

    var tableOuterHTML=document.getElementById("tabellaDettaglioRighePick").outerHTML;

    Swal.fire
    ({
        title: "Scegli il nome del file Excel",
        html: '<input tyle="text" id="inputNomeFileEsportaExcel" value="esportazione_picking">',
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
                var exportTableString="<html>"+tableOuterHTML+"</html>";

                var blob;
                var wb = {SheetNames:[], Sheets:{}};

                var ws1 = XLSX.read(exportTableString, {type:"binary"}).Sheets.Sheet1;
                wb.SheetNames.push(fileName); 
                wb.Sheets[fileName] = ws1;

                blob = new Blob([s2ab(XLSX.write(wb, {bookType:'xlsx', type:'binary'}))],
                {
                    type: "application/octet-stream"
                });

                saveAs(blob, fileName+".xlsx");

                swal.close();

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
function getDettaglioRighePick(n_Pick,orderBy)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getDettaglioRighePick.php",
        {
            n_Pick,orderBy
        },
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire
                    ({
                        icon: 'error',
                        title: "Errore. Se il problema persiste contatta l' amministratore"
                    });
                    console.log(response);
                    resolve([]);
                }
                else
                    resolve(JSON.parse(response));
            }
            else
                reject({status});
        });
    });
}
async function getPopupCompilaChecklist()
{
    var n_pick=$("#selectCompilaChecklist").multipleSelect('getSelects')[1];
    if(n_pick!="" && n_pick!=null && n_pick!=undefined)
    {
        Swal.fire
        ({
            title: "Caricamento in corso...",
            background: "transparent",
            html: '<i style="color:white" class="fad fa-spinner-third fa-spin fa-4x"></i>',
            showConfirmButton:false,
            showCloseButton:false,
            allowEscapeKey:false,
            allowOutsideClick:false,
            onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
        });

        var outerContainer=document.createElement("div");
        outerContainer.setAttribute("id","popupCompilaChecklistOuterContainer");
        outerContainer.setAttribute("class","popup-compila-checklist-outer-container");

        var actionBar=document.createElement("div");
        actionBar.setAttribute("class","popup-compila-checklist-action-bar");

        var span=document.createElement("span");
        span.setAttribute("style","font-family:'Montserrat',sans-serif;font-size:12px;margin-left:10px;margin-right:5px;color:#ddd");
        span.innerHTML="Pick "+n_pick;
        actionBar.appendChild(span);

        var aggiungiBancaleButton=document.createElement("button");
        aggiungiBancaleButton.setAttribute("class","popup-compila-checklist-button");
        aggiungiBancaleButton.setAttribute("id","popupCompilaChecklistButtonNuovoBancale");
        aggiungiBancaleButton.setAttribute("onclick","creaNuovoBancaleCompilaChecklist()");
        aggiungiBancaleButton.innerHTML='<span>Nuovo bancale</span><i class="fad fa-pallet-alt"></i>';
        actionBar.appendChild(aggiungiBancaleButton);

        var indietroButton=document.createElement("button");
        indietroButton.setAttribute("class","popup-compila-checklist-button");
        indietroButton.setAttribute("id","popupCompilaChecklistButtonIndietro");
        indietroButton.setAttribute("style","display:none");
        indietroButton.setAttribute("onclick","getPopupCompilaChecklist()");
        indietroButton.innerHTML='<span>Indietro</span><i class="fad fa-arrow-alt-to-left"></i>';
        actionBar.appendChild(indietroButton);

        var ripristinaFiltriButton=document.createElement("button");
        ripristinaFiltriButton.setAttribute("class","popup-compila-checklist-button");
        ripristinaFiltriButton.setAttribute("id","popupCompilaChecklistButtonRipristinaFiltri");
        ripristinaFiltriButton.setAttribute("onclick","getHotCompilaChecklist()");
        ripristinaFiltriButton.innerHTML='<span>Ripristina</span><i class="fas fa-filter"></i>';
        actionBar.appendChild(ripristinaFiltriButton);

        var chiudiPickButton=document.createElement("button");
        chiudiPickButton.setAttribute("class","popup-compila-checklist-button");
        chiudiPickButton.setAttribute("id","popupCompilaChecklistButtonChiudiPick");
        chiudiPickButton.setAttribute("onclick","chiudiPickCompilaChecklist()");
        chiudiPickButton.innerHTML='<span>Chiudi pick</span><i class="fas fa-save"></i>';
        actionBar.appendChild(chiudiPickButton);

        var closeButton=document.createElement("button");
        closeButton.setAttribute("class","popup-compila-checklist-close-button");
        closeButton.setAttribute("onclick","getElencoPick()");
        closeButton.innerHTML='<i class="fal fa-times"></i>';
        actionBar.appendChild(closeButton);

        outerContainer.appendChild(actionBar);

        var innerContainer=document.createElement("div");
        innerContainer.setAttribute("class","popup-compila-checklist-inner-container");
        innerContainer.setAttribute("id","popupCompilaChecklistInnerContainer");
        outerContainer.appendChild(innerContainer);

        Swal.fire
        ({
            background:"#363636",
            width:"90%",
            html:outerContainer.outerHTML,
            allowOutsideClick:false,
            showCloseButton:false,
            showConfirmButton:false,
            allowEscapeKey:false,
            showCancelButton:false,
            animation:false,
            onOpen : function()
                    {
                        document.getElementsByClassName("swal2-popup")[0].style.padding="0px";
                        document.getElementsByClassName("swal2-popup")[0].style.height="90%";
                        document.getElementsByClassName("swal2-content")[0].style.padding="0px";
                        document.getElementsByClassName("swal2-content")[0].style.height="100%";
                        document.getElementsByClassName("swal2-content")[0].style.width="100%";

                        getHotCompilaChecklist();
                    }
        });
    }
}
function chiudiPickCompilaChecklist()
{
    var n_pick=$("#selectCompilaChecklist").multipleSelect('getSelects')[1];

    document.getElementById("popupCompilaChecklistButtonChiudiPick").remove();
    document.getElementById("popupCompilaChecklistButtonNuovoBancale").remove();
    document.getElementById("popupCompilaChecklistButtonRipristinaFiltri").setAttribute("onclick","getHotchiudiPick()");
    document.getElementById("popupCompilaChecklistButtonIndietro").style.display="flex";

    getHotchiudiPick();

    $.get("chiudiPickCompilaChecklist.php",{n_pick},
    function(response, status)
    {
        if(status=="success")
        {
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
            }
        }
    });
}
async function getHotchiudiPick()
{
    var containerId="popupCompilaChecklistInnerContainer";

    var container = document.getElementById(containerId);
    container.innerHTML="";

    var div=document.createElement("div");
    div.setAttribute("style","display:flex;flex-direction:row;align-items:center;color:#ddd;margin:10px");
    var i=document.createElement("i");
    i.setAttribute("class","fad fa-spinner-third fa-spin");
    i.setAttribute("style","font-size:22px");
    div.appendChild(i);
    var span=document.createElement("span");
    span.setAttribute("style","font-family:'Montserrat',sans-serif;font-size:12px;margin-left:10px");
    span.innerHTML="Caricamento in corso...";
    div.appendChild(span);
    container.appendChild(div);

    var n_pick=$("#selectCompilaChecklist").multipleSelect('getSelects')[1];

    var response=await getHotDataChiudiPick(n_pick);
    console.log(response);
    container.innerHTML="";

    var height=container.offsetHeight;

    if(response.data.length>0)
    {
		try {
            hotCompilaChecklist.destroy();
        } catch (error) {}
        
        hotCompilaChecklist = new Handsontable
        (
            container,
            {
                data: response.data,
                rowHeaders: true,
                manualColumnResize: true,
                colHeaders: response.colHeaders,
                filters: true,
                dropdownMenu: true,
                headerTooltips: true,
                language: 'it-IT',
                contextMenu: false,
                width:"100%",
                //colWidths:[100,100,100,200,600,200,100],
                columnSorting: true,
                height,
                columns:response.columns,
                afterChange: (changes) =>
                {
                    if(changes!=null)
                    {
                        changes.forEach(([row, prop, oldValue, newValue]) =>
                        {
                            if(prop!="bancale" && prop!="id_bancale")
                            {
                                var id_bancale=hotCompilaChecklist.getDataAtCell(row, 0);
                                aggiornaRigaHotChiudiPick(id_bancale,prop,newValue);
                            }
                        });
                    }
                },
                beforeCreateRow: (index,amount,source) =>
                {
                    return false;
                },
                beforeRemoveRow: (index,amount,physicalRows,source)  =>
                {
                    return false;
                },
                afterDropdownMenuShow: (dropdownMenu) =>
                {
                    document.getElementsByClassName("htDropdownMenu")[0].style.zIndex="9999";
                    document.getElementsByClassName("htFiltersMenuCondition")[0].parentElement.style.display="none";
                }
            }
        );
        document.getElementById("hot-display-license-info").remove();
        $(".handsontable .changeType").css
        ({
            "background": "#eee",
            "border-radius": "0",
            "border": "none",
            "color": "#404040",
            "font-size": "14px",
            "line-height": "normal",
            "padding": "0px",
            "margin": "0px",
            "float": "right"
        });
    }
}
function getHotDataChiudiPick(n_pick)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getHotDataChiudiPick.php",{n_pick},
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
        });
    });
}
function creaNuovoBancaleCompilaChecklist()
{
    try {
        hotCompilaChecklist.destroy();

        var containerId="popupCompilaChecklistInnerContainer";

        var container = document.getElementById(containerId);
        container.innerHTML="";

        var div=document.createElement("div");
        div.setAttribute("style","display:flex;flex-direction:row;align-items:center;color:#ddd;margin:10px");
        var i=document.createElement("i");
        i.setAttribute("class","fad fa-spinner-third fa-spin");
        i.setAttribute("style","font-size:22px");
        div.appendChild(i);
        var span=document.createElement("span");
        span.setAttribute("style","font-family:'Montserrat',sans-serif;font-size:12px;margin-left:10px");
        span.innerHTML="Caricamento in corso...";
        div.appendChild(span);
        container.appendChild(div);
    } catch (error) {}
    
    var n_pick=$("#selectCompilaChecklist").multipleSelect('getSelects')[1];
    $.post("creaNuovoBancaleCompilaChecklist.php",{n_pick},
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
                getHotCompilaChecklist();
            }
        }
    });
}
async function getHotCompilaChecklist()
{
    var containerId="popupCompilaChecklistInnerContainer";

    var container = document.getElementById(containerId);
    container.innerHTML="";

    var div=document.createElement("div");
    div.setAttribute("style","display:flex;flex-direction:row;align-items:center;color:#ddd;margin:10px");
    var i=document.createElement("i");
    i.setAttribute("class","fad fa-spinner-third fa-spin");
    i.setAttribute("style","font-size:22px");
    div.appendChild(i);
    var span=document.createElement("span");
    span.setAttribute("style","font-family:'Montserrat',sans-serif;font-size:12px;margin-left:10px");
    span.innerHTML="Caricamento in corso...";
    div.appendChild(span);
    container.appendChild(div);

    var n_pick=$("#selectCompilaChecklist").multipleSelect('getSelects')[1];

    var response=await getHotDataCompilaChecklist(n_pick);
    container.innerHTML="";

    var height=container.offsetHeight;

    if(response.data.length>0)
    {
		try {
            hotCompilaChecklist.destroy();
        } catch (error) {}
        
        hotCompilaChecklist = new Handsontable
        (
            container,
            {
                data: response.data,
                rowHeaders: true,
                manualColumnResize: true,
                colHeaders: response.colHeaders,
                filters: true,
                dropdownMenu: true,
                headerTooltips: true,
                language: 'it-IT',
                contextMenu: false,
                width:"100%",
                colWidths:[100,100,100,200,600,200,100],
                columnSorting: true,
                height,
                columns:response.columns,
                afterChange: (changes) =>
                {
                    if(changes!=null)
                    {
                        changes.forEach(([row, prop, oldValue, newValue]) =>
                        {
                            if(prop=="bancale" || prop=="gruppo")
                            {
                                var id_picking=hotCompilaChecklist.getDataAtCell(row, 0);
                                aggiornaRigaHotCompilaChecklist(id_picking,prop,newValue);
                            }
                        });
                    }
                },
                beforeCreateRow: (index,amount,source) =>
                {
                    return false;
                },
                beforeRemoveRow: (index,amount,physicalRows,source)  =>
                {
                    return false;
                },
                afterDropdownMenuShow: (dropdownMenu) =>
                {
                    document.getElementsByClassName("htDropdownMenu")[0].style.zIndex="9999";
                    document.getElementsByClassName("htFiltersMenuCondition")[0].parentElement.style.display="none";
                }
            }
        );
        document.getElementById("hot-display-license-info").remove();
        $(".handsontable .changeType").css
        ({
            "background": "#eee",
            "border-radius": "0",
            "border": "none",
            "color": "#404040",
            "font-size": "14px",
            "line-height": "normal",
            "padding": "0px",
            "margin": "0px",
            "float": "right"
        });
    }
}
function aggiornaRigaHotChiudiPick(id_bancale,colonna,valore)
{
    var n_pick=$("#selectCompilaChecklist").multipleSelect('getSelects')[1];
    if(colonna=="peso" || colonna=="lunghezza" || colonna=="larghezza" || colonna=="altezza")
    {
        if(isNaN(valore) || valore=="" || valore==null)
        {
            valore="NULL";
        }
    }
    $.post("aggiornaRigaHotChiudiPick.php",{id_bancale,colonna,valore,n_pick},
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
                if(colonna=="tipo")
                {
                    getHotchiudiPick();
                }
            }
        }
    });
}
function aggiornaRigaHotCompilaChecklist(id_picking,colonna,valore)
{
    var n_pick=$("#selectCompilaChecklist").multipleSelect('getSelects')[1];
    if(colonna=="gruppo")
    {
        if(isNaN(valore) || valore=="" || valore==null)
        {
            valore="NULL";
        }
    }
    $.post("aggiornaRigaHotCompilaChecklist.php",{id_picking,colonna,valore,n_pick},
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
                if(valore=="Nuovo bancale")
                {
                    getHotCompilaChecklist();
                }
            }
        }
    });
}
function getHotDataCompilaChecklist(n_pick)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getHotDataCompilaChecklist.php",{n_pick},
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
        });
    });
}
function getPicksPopupCompilaChecklist()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getPicksPopupCompilaChecklist.php",
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
        });
    });
}
async function stampaPickConExcel(n_Pick)
{
    Swal.fire
    ({
        width:"100%",
        background:"transparent",
        title:"Caricamento in corso...",
        html:'<i class="fad fa-spinner-third fa-spin fa-3x" style="color:white"></i>',
        allowOutsideClick:false,
        showCloseButton:false,
        showConfirmButton:false,
        showCancelButton:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
    });

    try {
        document.getElementById("tabellaStampaExcel").remove();
    } catch (error) {}

    var righe_pick=await getDataStampaPickConExcel(n_Pick);

    var tabellaDettaglioRighePick=document.createElement("table");
    tabellaDettaglioRighePick.setAttribute("id","tabellaStampaExcel");

    var tr=document.createElement("tr");

    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="PACKING LIST";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);

    tabellaDettaglioRighePick.appendChild(tr);

    var tr=document.createElement("tr");

    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="CUSTOMER";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);

    tabellaDettaglioRighePick.appendChild(tr);

    var tr=document.createElement("tr");

    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="ORDER N.";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);

    tabellaDettaglioRighePick.appendChild(tr);

    var tr=document.createElement("tr");

    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="INVOICE N.";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);

    tabellaDettaglioRighePick.appendChild(tr);

    var tr=document.createElement("tr");

    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);

    tabellaDettaglioRighePick.appendChild(tr);

    var tr=document.createElement("tr");

    var td=document.createElement("td");td.innerHTML="Order";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="Item code";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="Description";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="Qnt";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="Net Weight";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="Gross Weight";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="Measures";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="Boxes";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="INTRA Code";tr.appendChild(td);

    tabellaDettaglioRighePick.appendChild(tr);

    var bancaleBefore;
    var bancaleBeforeObj;
    var pesoNetto=0;
    var pesoLordo=0;
    righe_pick.forEach(riga =>
    {
        var tr=document.createElement("tr");

        var td=document.createElement("td");td.innerHTML=riga["Order"];tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga["Item code"];tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga["Description"];tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga["Qnt"];tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga["Net Weight"];tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga["Gross Weight"];tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga["Measures"];tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga["Boxes"];tr.appendChild(td);
        var td=document.createElement("td");td.innerHTML=riga["INTRA Code"];tr.appendChild(td);

        tabellaDettaglioRighePick.appendChild(tr);

        if(riga.bancale!=bancaleBefore && bancaleBefore!=null)
        {
            var tr=document.createElement("tr");
            tr.setAttribute("style","background-color:#F9EF62;border-bottom:2px solid gray");

            var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
            var td=document.createElement("td");
            try {
                td.innerHTML='1 '+getTipoBancale(bancaleBeforeObj.nomeBancale)+': L.'+bancaleBeforeObj.lunghezzaBancale+' X '+bancaleBeforeObj.larghezzaBancale+' X H.'+bancaleBeforeObj.altezzaBancale+' | NET WEIGHT: '+bancaleBeforeObj.pesoBancale+' | GROSS WEIGHT: '+pesoLordo.toFixed(2);
            } catch (error) {}
            tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
            var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);

            tabellaDettaglioRighePick.insertBefore(tr, tabellaDettaglioRighePick.lastChild); 

            pesoNetto=riga["Net Weight"];
            pesoLordo=riga["Gross Weight"];
        }
        else
        {
            pesoNetto+=riga["Net Weight"];
            pesoLordo+=riga["Gross Weight"];
        }

        bancaleBefore=riga.bancale;
        bancaleBeforeObj=riga;    
    });

    var tr=document.createElement("tr");
    tr.setAttribute("style","background-color:#F9EF62;border-bottom:2px solid gray");

    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");
    try {
        td.innerHTML='1 '+getTipoBancale(bancaleBeforeObj.nomeBancale)+': L.'+bancaleBeforeObj.lunghezzaBancale+' X '+bancaleBeforeObj.larghezzaBancale+' X H.'+bancaleBeforeObj.altezzaBancale+' | NET WEIGHT: '+pesoNetto.toFixed(2)+' | GROSS WEIGHT: '+pesoLordo.toFixed(2);
    } catch (error) {}
    tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);
    var td=document.createElement("td");td.innerHTML="";tr.appendChild(td);

    tabellaDettaglioRighePick.appendChild(tr);

    document.body.appendChild(tabellaDettaglioRighePick);

    var tableOuterHTML=document.getElementById("tabellaStampaExcel").outerHTML;

    Swal.fire
    ({
        title: "Scegli il nome del file Excel",
        html: '<input tyle="text" id="inputNomeFileEsportaExcel" value="checklist_excel_'+n_Pick+'">',
        confirmButtonText:"Conferma",
        showCloseButton:true,
        allowEscapeKey:false,
        allowOutsideClick:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="black";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
    }).then((result) => 
    {
        if (result.value)
        {
            stampato(n_Pick);

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
                var exportTableString="<html>"+tableOuterHTML+"</html>";

                var blob;
                var wb = {SheetNames:[], Sheets:{}};

                var ws1 = XLSX.read(exportTableString, {type:"binary"}).Sheets.Sheet1;
                wb.SheetNames.push(fileName); 
                wb.Sheets[fileName] = ws1;

                blob = new Blob([s2ab(XLSX.write(wb, {bookType:'xlsx', type:'binary'}))],
                {
                    type: "application/octet-stream"
                });

                saveAs(blob, fileName+".xlsx");

                swal.close();

                try {
                    document.getElementById("tabellaStampaExcel").remove();
                } catch (error) {}            

                getElencoPick();
            }, 1500);
        }
        else
            swal.close();
    });
}
function stampato(N_Pick)
{
    var stampato = true ;
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            console.log(this.responseText);
            //location.reload();
            //document.getElementById("controllato"+N_Pick).style.backgroundColor ="green" ;
        }
    };
    xmlhttp.open("POST", "setStampato.php?N_Pick=" + N_Pick + "&stampato=" + stampato, true);
    xmlhttp.send();
    //if(controllato==false)
        //location.reload();
}
function getDataStampaPickConExcel(n_Pick)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getDataStampaPickConExcel.php",{n_Pick},
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
        });
    });
}
function getTipoBancale(nomeBancale)
{
	var nome = nomeBancale.substr(0, 7);
	if(nome=="BANCALE")
        var tipo="PALLET";
	else
	{
		if(nome=="SCATOLA")
            var tipo="C. BOX";
		else
            var tipo="W. CRATE";
	}
	return tipo;
}
var flexDirection="row";
var orderBy="n_Pick";
var orderType="DESC";
var filterTop;
var filterChiuso="both";
var filterControllato="both";
var filterStampato="both";

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

    getFaSpinner(actionBar,"actionBar","Caricamento in corso...");

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
        row.appendChild(rowItem);

        var rowItem2=document.createElement("div");
        rowItem2.setAttribute("class","pick-item-row-item");
        rowItem2.setAttribute("style","flex-direction:row;width:450px;height:45px;align-items:center;margin-left:auto;margin-top:10px;");

        var buttonAnteprimaDiStampa=document.createElement("button");
        buttonAnteprimaDiStampa.setAttribute("class","pick-item-print-button");
        buttonAnteprimaDiStampa.setAttribute("onclick","anteprimaDiStampa("+pick.n_Pick+")");
        buttonAnteprimaDiStampa.innerHTML='<span>Anteprima di stampa</span><i class="fad fa-print"></i>';
        rowItem2.appendChild(buttonAnteprimaDiStampa);

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
    removeFaSpinner("actionBar");
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
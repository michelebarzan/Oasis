var picks = [];

function controllato(N_Pick)
{
    var controllato = document.getElementById("controllato"+N_Pick).checked ;
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            //location.reload();
            //document.getElementById("controllato"+N_Pick).style.backgroundColor ="green" ;
        }
    };
    xmlhttp.open("POST", "setControllato.php?N_Pick=" + N_Pick + "&controllato=" + controllato, true);
    xmlhttp.send();
}
function apriDettaglio(N_Pick)
{
    var stato=document.getElementById("dettaglio"+N_Pick).style.display;
    if(stato=="inline-block")
        document.getElementById("dettaglio"+N_Pick).style.display="none" ;
    else
        document.getElementById("dettaglio"+N_Pick).style.display="inline-block" ;
}
function setOffsetHeight()
{
    var offsetHeight = document.getElementById('content').offsetHeight;
    document.getElementById('navBar').style.height = offsetHeight+"px";
}
function controllatoS(N_Pick,docNum)
{
    var controllato = document.getElementById("controllatoS"+N_Pick+docNum).checked ;
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            //location.reload();
            //document.getElementById("res").innerHTML ="green" ;
        }
    };
    xmlhttp.open("POST", "setControllatoS.php?N_Pick=" + N_Pick + "&controllato=" + controllato + "&docNum=" + docNum, true);
    xmlhttp.send();
}
function verifica(N_Pick,docNumList,n)
{
    var res = docNumList.split("|");
    var i=0;
    
    var trovato=true;
    while(i<n)
    {
        if(document.getElementById("controllatoS"+N_Pick+res[i]).checked==false)
        {	
            trovato=false;
        }
        i++;
    }
    document.getElementById("controllato"+N_Pick).checked=trovato;
}
function verifica2(N_Pick,docNumList,n)
{
    var res = docNumList.split("|");
    var i=0;
    
    var trovato=document.getElementById("controllato"+N_Pick).checked;
    while(i<n)
    {
        document.getElementById("controllatoS"+N_Pick+res[i]).checked=trovato;
        i++;
    }
}
function getElencoPick()
{
    var stato=document.getElementById('selectStatoControlloPick').value;
    var stato_righe=document.getElementById('selectStatoRigheControlloPick').value;
    var settimana=document.getElementById('selectSettimanaControlloPick').value;
    
    Swal.fire
    ({
        title: "Caricamento in corso... ",
        background:"transparent",
        html: '<i style="color:white" class="fad fa-spinner-third fa-spin fa-2x"></i>',
        showConfirmButton:false,
        showCloseButton:false,
        allowEscapeKey:false,
        allowOutsideClick:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
    });

    /*var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById("controllaPickContainer").innerHTML =this.responseText ;
            Swal.close();
        }
    };
    xmlhttp.open("POST", "getElencoPick.php?stato=" + stato+"&settimana="+settimana+"&stato_righe="+stato_righe, true);
    xmlhttp.send();*/

    var container=document.getElementById("controllaPickContainer");
    container.innerHTML="";

    $.get("getPickControlloPick.php",{stato,settimana,stato_righe},
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
                Swal.close();

                picks=[];
                var picks_lines=[];
                try
                {
                    picks_lines=JSON.parse(response);
                }
                catch (error)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                }
                var d_picks=[];
                picks_lines.forEach(pick_line =>
                {
                    d_picks.push(pick_line.N_Pick);
                });
                $.each(d_picks, function(i, el)
                {
                    if($.inArray(el, picks) === -1) picks.push(el);
                });
                picks.forEach(pick =>
                {
                    var d_docnumArray=[];
                    picks_lines.forEach(pick_line =>
                    {
                        if(pick_line.N_Pick==pick)
                            d_docnumArray.push(pick_line.docNum);
                    });
                    var docnumArray = [];
                    $.each(d_docnumArray, function(i, el)
                    {
                        if($.inArray(el, docnumArray) === -1) docnumArray.push(el);
                    });

                    var pickObj={};
                    picks_lines.forEach(pick_line =>
                    {
                        if(pick_line.N_Pick==pick)
                            pickObj=pick_line;
                    });

                    var b=document.createElement("b");
                    b.setAttribute("class","pickChiusi pick-"+pick+"-item");
                    b.setAttribute("title","Dettaglio "+pick);
                    b.setAttribute("onclick","apriDettaglio('"+pick+"')");
                    b.innerHTML=pick;
                    container.appendChild(b);

                    var span=document.createElement("span");
                    span.setAttribute("class","pick-"+pick+"-item");
                    span.innerHTML="&nbsp;&nbsp;-&nbsp;&nbsp;";
                    container.appendChild(span);

                    var b=document.createElement("b");
                    b.setAttribute("class","pick-"+pick+"-item");
                    b.setAttribute("style","display: inline-block; font-family: arial; font-size: 100%; color: gray; font-weight: normal;");
                    b.innerHTML=pickObj.DescrPick;
                    container.appendChild(b);

                    var b=document.createElement("b");
                    b.setAttribute("class","pick-"+pick+"-item");
                    b.setAttribute("style","float: right; display: block; width: 5%; height: 15px; overflow: hidden;");
                    var input=document.createElement("input");
                    input.setAttribute("type","checkbox");
                    input.setAttribute("name","controllato");
                    input.setAttribute("id","controllato"+pick);
                    var controllatoLcl=true;
                    picks_lines.forEach(pick_line =>
                    {
                        if(pick_line.N_Pick==pick)
                        {
                            if(pick_line.controllato=="false")
                                controllatoLcl=false;
                        }
                    });
                    if(controllatoLcl)
                        input.setAttribute("checked","checked");
                    input.setAttribute("onchange","controllato('"+pick+"');verifica2('"+pick+"','"+docnumArray.join('|')+"','"+docnumArray.length+"')");
                    b.appendChild(input);
                    container.appendChild(b);

                    var span=document.createElement("span");
                    span.setAttribute("class","pick-"+pick+"-item");
                    span.innerHTML="<br />";
                    container.appendChild(span);

                    var div=document.createElement("div");
                    div.setAttribute("class","dettaglio pick-"+pick+"-item");
                    div.setAttribute("id","dettaglio"+pick);
                    div.setAttribute("style","text-align: center;");
                    
                    docnumArray.forEach(docNum =>
                    {
                        var span=document.createElement("span");
                        span.innerHTML=docNum+"&nbsp;&nbsp;";
                        div.appendChild(span);

                        var input=document.createElement("input");
                        input.setAttribute("type","checkbox");
                        input.setAttribute("name","controllatoS");
                        input.setAttribute("id","controllatoS"+pick+docNum);
                        var controllatoLcl=false;
                        picks_lines.forEach(pick_line =>
                        {
                            if(pick_line.N_Pick==pick && pick_line.docNum==docNum)
                            {
                                if(pick_line.controllato=="true")
                                    controllatoLcl=true;
                            }
                        });
                        if(controllatoLcl)
                            input.setAttribute("checked","checked");
                        input.setAttribute("onchange","controllatoS('"+pick+"','"+docNum+"');verifica('"+pick+"','"+docnumArray.join('|')+"','"+docnumArray.length+"')");
                        div.appendChild(input);

                        var span=document.createElement("span");
                        span.innerHTML="<br />";
                        div.appendChild(span);
                    });

                    container.appendChild(div);

                    var hr=document.createElement("hr");
                    hr.setAttribute("class","pick-"+pick+"-item");
                    hr.setAttribute("size","1");
                    hr.setAttribute("style","border-color: #80b3e6;");

                    container.appendChild(hr);

                });
            }
        }
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
function cerca(input)
{
    Swal.fire
    ({
        title: "Ricerca in corso... ",
        background:"transparent",
        html: '<i style="color:white" class="fad fa-spinner-third fa-spin fa-2x"></i>',
        showConfirmButton:false,
        showCloseButton:false,
        allowEscapeKey:false,
        allowOutsideClick:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
    });

    setTimeout(() =>
    {
        var value=input.value;
        
        if(value=="" || value==" " || value==null)
        {
            picks.forEach(pick =>
            {
                $(".pick-"+pick+"-item").show();
                document.getElementById("dettaglio"+pick).style.display="none";
            });
        }
        else
        {
            picks.forEach(pick =>
            {
                if(pick.toString().indexOf(value)==-1)
                    $(".pick-"+pick+"-item").hide();
                else
                {
                    $(".pick-"+pick+"-item").show();
                    document.getElementById("dettaglio"+pick).style.display="none";
                }
            });
        }

        Swal.close();
    }, 100);
}
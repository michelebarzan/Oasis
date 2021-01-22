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
    //var stato="stato='"+document.getElementById('selectStatoControlloPick').value+"' "+document.getElementById('selectOperatoreControlloPick').value+" stato_righe='"+document.getElementById('selectStatoRigheControlloPick').value+"'";
    var stato=document.getElementById('selectStatoControlloPick').value;
    var stato_righe=document.getElementById('selectStatoRigheControlloPick').value;
    var settimana=document.getElementById('selectSettimanaControlloPick').value;


    
    //document.getElementById('controllaPickContainer').innerHTML='<div class="sk-cube-grid" style="width:24px;height:24px;margin-left:514px;margin-top:200px;text-align:center;background-color: #12365A;" ><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div> <div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>';
    
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

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById("controllaPickContainer").innerHTML =this.responseText ;
            Swal.close();
        }
    };
    xmlhttp.open("POST", "getElencoPick.php?stato=" + stato+"&settimana="+settimana+"&stato_righe="+stato_righe, true);
    xmlhttp.send();
}
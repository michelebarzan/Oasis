var lotti=[];
var view;
//--------------------------------------------
var creazioneLottiVariables=
{
    id_lotto:null,
    hasDragStarted:false,
    articoloItemBeingDragged:null,
    articoloItemMousex:null,
    articoloItemMousey:null,
    articoloItemCoordinates:[]
}

async function getMascheraCreazioneLotto(button)
{
    view="creazione_lotto";

    $(".in-page-nav-bar-button").css({"border-bottom-color":"","font-weight":""});
    button.style.borderBottomColor="#4C91CB";
    button.style.fontWeight="bold";

    document.getElementById("actionBarGestioneLottiProduzione").style.display="";
    document.getElementById("actionBarGestioneLottiProduzione").innerHTML="";

    document.getElementById("gestioneLottiProduzioneContainer").style.display="";
    document.getElementById("gestioneLottiProduzioneContainer").innerHTML="";

    var actionBar=document.getElementById("actionBarGestioneLottiProduzione");

    var button=document.createElement("button");
    button.setAttribute("class","rcb-button-text-icon");
    button.setAttribute("onclick","getPopupCreaNuovoLotto()");
    var span=document.createElement("span");
    span.innerHTML="Crea nuovo lotto";
    button.appendChild(span);
    var i=document.createElement("i");
    i.setAttribute("class","fad fa-plus-circle");
    i.setAttribute("style","margin-left:5px");
    button.appendChild(i);
    actionBar.appendChild(button);

    var containerCreazioneLotto = document.createElement("div");
    containerCreazioneLotto.setAttribute("class","container-creazione-lotto");
    containerCreazioneLotto.setAttribute("id","containerCreazioneLotto");
    document.getElementById("gestioneLottiProduzioneContainer").appendChild(containerCreazioneLotto);

    getContainerLotti();
    getContainerArticoli();
}
async function getContainerLotti()
{
    var container = document.getElementById('containerCreazioneLotto');

    var outerContainer = document.createElement('div');
    outerContainer.setAttribute('class', 'lotti-outer-container');

    var titleContainer = document.createElement('div');
    titleContainer.setAttribute('class', 'lotti-title-container');

    var i = document.createElement('i');
    i.setAttribute('class', 'fa-solid fa-grid');
    i.setAttribute('style', 'margin-right:10px');
    titleContainer.appendChild(i);

    var span = document.createElement('span');
    span.setAttribute('style','margin-rigth:10px;  white-space: nowrap;overflow: hidden;text-overflow: ellipsis;');
    span.innerHTML = 'Lotti';
    titleContainer.appendChild(span);

    var i = document.createElement('i');
    i.setAttribute('class', 'fa-duotone fa-filter');
    i.setAttribute('style', 'margin-left:auto;');
    titleContainer.appendChild(i);
    var select = document.createElement('select');
    select.setAttribute('onchange', 'sortFilterLottiCreazioneLotti()');
    select.setAttribute('style', 'width:65px');
    select.setAttribute('id', 'lottiTitleContainerSelectStato');
    var option = document.createElement('option');
    option.setAttribute('value', 'aperti');
    option.innerHTML = 'Aperti';
    select.appendChild(option);
    var option = document.createElement('option');
    option.setAttribute('value', 'chiusi');
    option.innerHTML = 'Chiusi';
    select.appendChild(option);
    var option = document.createElement('option');
    option.setAttribute('value', 'tutti');
    option.innerHTML = 'Tutti';
    select.appendChild(option);
    titleContainer.appendChild(select);

    var i = document.createElement('i');
    i.setAttribute('class', 'fa-duotone fa-sort');
    i.setAttribute('style', 'margin-left:10px;');
    titleContainer.appendChild(i);
    var select = document.createElement('select');
    select.setAttribute('onchange', 'sortFilterLottiCreazioneLotti()');
    select.setAttribute('style', 'width:60px');
    select.setAttribute('id', 'lottiTitleContainerSelectOrdine');
    var option = document.createElement('option');
    option.setAttribute('value', 'dataOra');
    option.innerHTML = 'Data';
    select.appendChild(option);
    var option = document.createElement('option');
    option.setAttribute('value', 'nome');
    option.innerHTML = 'Nome';
    select.appendChild(option);
    titleContainer.appendChild(select);

    outerContainer.appendChild(titleContainer);

    var innerContainer = document.createElement('div');
    innerContainer.setAttribute('class', 'lotti-inner-container');
    innerContainer.setAttribute('id', 'lottiInnerContainer');

    outerContainer.appendChild(innerContainer);

    container.appendChild(outerContainer);

    Swal.fire
    ({
        width:"100%",
        background:"transparent",
        title:"Caricamento in corso...",
        html:'<i class="fad fa-spinner-third fa-spin fa-3x" style="color:white"></i>',
        allowOutsideClick:false,
        showCloseButton:false,
        showConfirmButton:false,
        allowEscapeKey:false,
        showCancelButton:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
    });

    lotti = await getLotti();

    Swal.close();

    getElencoLotti(lotti);
    sortFilterLottiCreazioneLotti()
}
function sortFilterLottiCreazioneLotti()
{
    var filter=document.getElementById("lottiTitleContainerSelectStato").value;
    var sort=document.getElementById("lottiTitleContainerSelectOrdine").value;

    resetElencoArticoli();

    var filteredLotti=[];
    lotti.forEach(lotto =>
    {
        switch (filter)
        {
            case "aperti":
                if(!lotto.chiuso)
                    filteredLotti.push(lotto);
            break;
            case "chiusi":
                if(lotto.chiuso)
                    filteredLotti.push(lotto);
            break;
            case "tutti":
                filteredLotti.push(lotto);
            break;
        }
    });
    function compare( a, b )
    {
        if ( a[sort] < b[sort] )
            return -1;
        if ( a[sort] > b[sort] )
            return 1;
        return 0;
    }
    filteredLotti.sort( compare );

    getElencoLotti(filteredLotti);
}
function getElencoLotti(lotti,toSelect)
{
    creazioneLottiVariables.id_lotto = null;

    document.getElementById('lottiInnerContainer').innerHTML="";

    var c = 0;
    lotti.forEach((lotto) =>
    {
        var lottoItem = document.createElement('div');
        lottoItem.setAttribute('class', 'lotto-item');
        lottoItem.setAttribute('id_lotto', lotto.id_lotto);
        lottoItem.setAttribute('onclick','getElencoArticoli(' + lotto.id_lotto + ')');
        if (c == 0)
            lottoItem.setAttribute('style','border-top:1px solid #ccc;border-bottom:1px solid #ccc');
        else
            lottoItem.setAttribute('style', 'border-bottom:1px solid #ccc');

        var span = document.createElement('span');
        span.setAttribute('style','color:gray;  white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-right:5px;letter-spacing:1px');
        span.innerHTML = '#' + lotto.id_lotto;
        lottoItem.appendChild(span);

        var span = document.createElement('span');
        span.setAttribute('style','color:#4C91CB;  white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-right:5px;font-weight:bold');
        span.innerHTML = lotto.lotto;
        lottoItem.appendChild(span);

        var i = document.createElement('i');
        i.setAttribute('class', 'fa-duotone fa-calendar-plus');
        i.setAttribute('style', 'margin-left:auto;margin-right:5px;color:#404040');
        lottoItem.appendChild(i);

        var span = document.createElement('span');
        span.setAttribute('style', 'color:gray');
        var date = new Date(lotto.dataOra.date);
        var day = date.getDay().toString();
        if (day.length == 1) day = '0' + day;
            var month = date.getMonth().toString();
        if (month.length == 1) month = '0' + month;
            span.innerHTML = day + '/' + month + '/' + date.getFullYear();
        lottoItem.appendChild(span);

        document.getElementById('lottiInnerContainer').appendChild(lottoItem);

        c++;
    });

    if(toSelect != "" && toSelect != null && toSelect != undefined)
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
            allowEscapeKey:false,
            showCancelButton:false,
            onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
        });
    
        setTimeout(() =>
        {
            getElencoArticoli(parseInt(toSelect));
            Swal.close();
        }, 500);
    }
}
function getPopupCreaNuovoLotto()
{        
    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","input-popup-outer-container");

    var innerContainer=document.createElement("div");
    innerContainer.setAttribute("class","input-popup-inner-container");
    
    var row=document.createElement("div");
    row.setAttribute("class","input-popup-row");

    var spanNome=document.createElement("span");
    spanNome.setAttribute("class","input-popup-span");
    spanNome.setAttribute("style","border:none;padding:0px;margin:0px;margin-top:10px;margin-bottom:5px");
    spanNome.innerHTML="Nome lotto";
    row.appendChild(spanNome);

    var inputTesto=document.createElement("input");
    inputTesto.setAttribute("type","text");
    inputTesto.setAttribute("class","input-popup-input");
    inputTesto.setAttribute("onkeydown","validateInput(this,event)");
    inputTesto.setAttribute("id", "lotto");
    row.appendChild(inputTesto);

    var spanNome=document.createElement("span");
    spanNome.setAttribute("class","input-popup-span");
    spanNome.setAttribute("style","border:none;padding:0px;margin:0px;margin-top:10px;margin-bottom:5px");
    spanNome.innerHTML="Note";
    row.appendChild(spanNome);

    var textarea=document.createElement("textarea");
    textarea.setAttribute("class","input-popup-input");
    textarea.setAttribute("onkeydown","validateInput(this,event)");
    textarea.setAttribute("id", "note");
    row.appendChild(textarea);
    
    innerContainer.appendChild(row);

    outerContainer.appendChild(innerContainer);

    var row=document.createElement("div");
    row.setAttribute("class","input-popup-row");
    row.setAttribute("style","padding:0px;min-height:30px");

    var button=document.createElement("button");
    button.setAttribute("class","input-popup-button");
    button.setAttribute("onclick","creaNuovoLotto()");
    button.innerHTML='<span>Crea nuovo lotto</span><i class="fad fa-plus-circle"></i>';
    row.appendChild(button);

    outerContainer.appendChild(row);

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    Swal.fire
    ({
        title: "Crea nuovo lotto",
        background:"#f1f1f1",
        html: outerContainer.outerHTML,
        showConfirmButton:true,
        showCloseButton:true,
        onOpen : function()
        {
            document.getElementsByClassName("swal2-title")[0].style.textAlign="left";
            document.getElementsByClassName("swal2-title")[0].style.width="100%";
            document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";
            document.getElementsByClassName("swal2-close")[0].style.outline="none";

            document.getElementsByClassName("swal2-popup")[0].style.paddingLeft="0px";
            document.getElementsByClassName("swal2-popup")[0].style.paddingRight="0px";
            document.getElementsByClassName("swal2-content")[0].style.paddingRight="20px";
            document.getElementsByClassName("swal2-content")[0].style.paddingLeft="20px";

            document.getElementsByClassName("swal2-header")[0].style.paddingRight="20px";
            document.getElementsByClassName("swal2-header")[0].style.paddingLeft="20px";

            document.getElementsByClassName("swal2-title")[0].style.color="black";

            document.getElementsByClassName("swal2-actions")[0].style.display="none";
        }
    });
}
function creaNuovoLotto()
{
    var lotto = document.getElementById("lotto").value;
    var note = document.getElementById("note").value;

    Swal.fire
    ({
        width:"100%",
        background:"transparent",
        title:"Caricamento in corso...",
        html:'<i class="fad fa-spinner-third fa-spin fa-3x" style="color:white"></i>',
        allowOutsideClick:false,
        showCloseButton:false,
        showConfirmButton:false,
        allowEscapeKey:false,
        showCancelButton:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
    });

    if(lotto == "" || lotto == null)
    {
        Swal.fire
        ({
            icon: "warning",
            title: "Inserisci un nome lotto valido",
            onOpen: function ()
            {
                document.getElementsByClassName("swal2-title")[0].style.color = "gray";
                document.getElementsByClassName("swal2-title")[0].style.fontSize = "14px";
            }
        }).then((result) => {
            getPopupCreaNuovoLotto();
        });
    }
    else
    {
        $.get("creaNuovoLottoGestioneLottiProduzione.php",{lotto,note},
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
                    Swal.fire
                    ({
                        icon: "success",
                        title: "Lotto "+lotto+" creato",
                        onOpen: function ()
                        {
                            document.getElementsByClassName("swal2-title")[0].style.color = "gray";
                            document.getElementsByClassName("swal2-title")[0].style.fontSize = "14px";
                        }
                    }).then((result) => {
                        getNuovoLotto(response);
                    });
                }
            }
        });
    }
}
async function getNuovoLotto(id_lotto)
{
    if(document.getElementById("lottiTitleContainerSelectStato").value == "chiusi")
        document.getElementById("lottiTitleContainerSelectStato").value = "aperti";

    Swal.fire
    ({
        width:"100%",
        background:"transparent",
        title:"Caricamento in corso...",
        html:'<i class="fad fa-spinner-third fa-spin fa-3x" style="color:white"></i>',
        allowOutsideClick:false,
        showCloseButton:false,
        showConfirmButton:false,
        allowEscapeKey:false,
        showCancelButton:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
    });

    lotti = await getLotti();

    Swal.close();

    getElencoLotti(lotti,id_lotto);
    sortFilterLottiCreazioneLotti();
}
function getContainerArticoli()
{    
    var container = document.getElementById('containerCreazioneLotto');

    var outerContainerArticoliLotto = document.createElement('div');
    outerContainerArticoliLotto.setAttribute('class','articoli-outer-container');

    var titleContainerArticoliLotto = document.createElement('div');
    titleContainerArticoliLotto.setAttribute('class','articoli-title-container');

    var i = document.createElement('i');
    i.setAttribute('class', 'fa-solid fa-grid');
    i.setAttribute('style', 'margin-right:10px');
    titleContainerArticoliLotto.appendChild(i);

    var span = document.createElement('span');
    span.setAttribute('style','margin-rigth:10px;  white-space: nowrap;overflow: hidden;text-overflow: ellipsis;');
    span.innerHTML = 'Articoli lotto';
    titleContainerArticoliLotto.appendChild(span);

    outerContainerArticoliLotto.appendChild(titleContainerArticoliLotto);

    var innerContainerArticoliLotto = document.createElement('div');
    innerContainerArticoliLotto.setAttribute('class','articoli-inner-container connectedSortable');
    innerContainerArticoliLotto.setAttribute('id','innerContainerArticoliLotto');

    outerContainerArticoliLotto.appendChild(innerContainerArticoliLotto);

    container.appendChild(outerContainerArticoliLotto);

    //-----------------------------------------------------------------------------------------------

    var outerContainerArticoli = document.createElement('div');
    outerContainerArticoli.setAttribute('class','articoli-outer-container');

    var titleContainerArticoli = document.createElement('div');
    titleContainerArticoli.setAttribute('class','articoli-title-container');

    var i = document.createElement('i');
    i.setAttribute('class', 'fa-solid fa-grid');
    i.setAttribute('style', 'margin-right:10px');
    titleContainerArticoli.appendChild(i);

    var span = document.createElement('span');
    span.setAttribute('style','margin-rigth:10px;  white-space: nowrap;overflow: hidden;text-overflow: ellipsis;');
    span.innerHTML = 'Tutti gli articoli';
    titleContainerArticoli.appendChild(span);

    outerContainerArticoli.appendChild(titleContainerArticoli);

    var innerContainerArticoli = document.createElement('div');
    innerContainerArticoli.setAttribute('class','articoli-inner-container connectedSortable');
    innerContainerArticoli.setAttribute('id', 'innerContainerArticoli');

    outerContainerArticoli.appendChild(innerContainerArticoli);

    container.appendChild(outerContainerArticoli);
}
function resetElencoArticoli()
{
    document.getElementById('innerContainerArticoliLotto').innerHTML = '';
    document.getElementById('innerContainerArticoli').innerHTML = '';

    var buttons=document.getElementsByClassName("lotto-item");
    for (let index = 0; index < buttons.length; index++)
    {
        const buttonElement = buttons[index];
         
        buttonElement.style.backgroundColor="";
        buttonElement.getElementsByTagName("span")[0].style.color="gray";
        buttonElement.getElementsByTagName("span")[1].style.color="#4C91CB";
        buttonElement.getElementsByTagName("i")[0].style.color="#404040";
        buttonElement.getElementsByTagName("span")[2].style.color="gray";
    }
}
async function getElencoArticoli(id_lotto)
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
        allowEscapeKey:false,
        showCancelButton:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
    });

    resetElencoArticoli();
    
    creazioneLottiVariables.id_lotto = id_lotto;

    //colora bottone lotto
    var buttons=document.getElementsByClassName("lotto-item");
    for (let index = 0; index < buttons.length; index++)
    {
        const buttonElement = buttons[index];

        if(buttonElement.getAttribute("id_lotto")==id_lotto)
        {
            buttonElement.style.backgroundColor="#4C91CB";
            buttonElement.getElementsByTagName("span")[0].style.color="#EBEBEB";
            buttonElement.getElementsByTagName("span")[1].style.color="#EBEBEB";
            buttonElement.getElementsByTagName("i")[0].style.color="#EBEBEB";
            buttonElement.getElementsByTagName("span")[2].style.color="#EBEBEB";
        }
    }

    var articoliLottoResponse = await getArticoliLotto(id_lotto);
    console.log(articoliLottoResponse);

    var articoliLotto = articoliLottoResponse.articoliLotto;
    var articoli = articoliLottoResponse.articoli;

    var innerContainerArticoliLotto = document.getElementById('innerContainerArticoliLotto');
    var c = 0;
    articoliLotto.forEach((articolo) =>
    {
        getArticoloItem(innerContainerArticoliLotto,articolo.id_articolo,articolo.codice_articolo,articolo.qnt);

        c++;
    });

    var innerContainerArticoli = document.getElementById('innerContainerArticoli');
    var c = 0;
    articoli.forEach((articolo) =>
    {
        getArticoloItem(innerContainerArticoli,articolo.id_articolo,articolo.codice_articolo,articolo.qnt);

        c++;
    });

    Swal.close();
}
function getArticoloItem(container,id_articolo,codice_articolo,qnt)
{
    var articoloItem = document.createElement('div');
    articoloItem.setAttribute('class', 'articolo-item');
    articoloItem.setAttribute('id_articolo', id_articolo);
    articoloItem.setAttribute('codice_articolo', codice_articolo);
    articoloItem.setAttribute("onpointerdown","pointerDownArticoloItem(this,event)");
    articoloItem.setAttribute("onpointermove","pointerMoveArticoloItem(event)");
    articoloItem.setAttribute("onpointerup","pointerUpArticoloItem(event)");
    articoloItem.setAttribute("oncontextmenu","event.preventDefault()");

    var span = document.createElement('span');
    span.setAttribute('style','color:gray;  white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-right:5px;letter-spacing:1px');
    span.innerHTML = '#' + id_articolo;
    articoloItem.appendChild(span);

    var span = document.createElement('span');
    span.setAttribute('style','color:#4C91CB;  white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-right:5px;font-weight:bold');
    span.innerHTML = codice_articolo;
    articoloItem.appendChild(span);

    /*var i = document.createElement('i');
    i.setAttribute('class', '');
    i.setAttribute('style', 'margin-left:auto;margin-right:5px;color:#404040');
    articoloItem.appendChild(i);

    var span = document.createElement('span');
    span.setAttribute('style','color:black;  white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-right:10px');
    span.innerHTML = "";
    articoloItem.appendChild(span);*/

    if(container.id == "innerContainerArticoliLotto")
    {
        var buttonContainer = document.createElement("div");
        buttonContainer.setAttribute(`class`,`articolo-item-button-container articolo-item-button`);

        var button = document.createElement(`button`);
        button.setAttribute(`onclick`,`decrementaArticoloLotto(${creazioneLottiVariables.id_lotto},${id_articolo})`);
        button.setAttribute(`class`,`articolo-item-button`);
        button.innerHTML = `<i class="fa-solid fa-minus articolo-item-button"></i>`;
        buttonContainer.appendChild(button);
        articoloItem.appendChild(buttonContainer);

        var input = document.createElement("input");
        input.setAttribute("type","number");
        input.setAttribute("class","articolo-item-button");
        input.setAttribute("value",qnt);
        buttonContainer.appendChild(input);

        var button = document.createElement(`button`);
        button.setAttribute(`onclick`,`incrementaArticoloLotto(this,${creazioneLottiVariables.id_lotto},${id_articolo})`);
        button.setAttribute(`class`,`articolo-item-button`);
        button.innerHTML = `<i class="fa-solid fa-plus articolo-item-button"></i>`;
        buttonContainer.appendChild(button);
    }

    container.appendChild(articoloItem);
}
function incrementaArticoloLotto(input,id_lotto,id_articolo)
{
    console.log(id_lotto,id_articolo)
    $.post('incrementaArticoloLottoGestioneLottiProduzione.php',{ id_lotto,id_articolo },
    function (response, status)
    {
        if (status == 'success')
        {
            if (response.toLowerCase().indexOf('error') > -1 ||response.toLowerCase().indexOf('notice') > -1 ||response.toLowerCase().indexOf('warning') > -1)
            {
                Swal.fire
                ({
                    icon: 'error',
                    title:"Errore. Se il problema persiste contatta l' amministratore",
                    onOpen: function ()
                    {
                        document.getElementsByClassName('swal2-title')[0].style.color ='gray';
                        document.getElementsByClassName('swal2-title')[0].style.fontSize = '14px';
                    },
                });
                console.log(response);
            }
            else
                input.value++;
        }
    });
}
//--------------------------------------------------------------------------------------------
function pointerDownArticoloItem(articoloItem,event)
{
    if ("which" in event)
    {
        if(event.which === 1)
        {
            if(!event.target.classList.contains("articolo-item-button"))
                startDragArticoloItem(articoloItem,event);
        }
    }
}
function pointerMoveArticoloItem(event)
{
    if(creazioneLottiVariables.articoloItemBeingDragged != null)
        dragArticoloItem(event);
}
function pointerUpArticoloItem(event)
{
    if(creazioneLottiVariables.articoloItemBeingDragged != null)
        stopDragArticoloItem(event);
}
function startDragArticoloItem(articoloItem,event)
{
    creazioneLottiVariables.hasDragStarted = false;

    if(creazioneLottiVariables.articoloItemBeingDragged != null)
        stopDragArticoloItem(event);
    
    creazioneLottiVariables.articoloItemBeingDragged=articoloItem;
    creazioneLottiVariables.articoloItemBeingDragged.setPointerCapture(event.pointerId);

    var dropContainers=document.getElementsByClassName("articoli-inner-container");
    for (let index = 0; index < dropContainers.length; index++)
    {
        const dropContainerLcl = dropContainers[index];

        var lefttop = $(dropContainerLcl).offset();
        creazioneLottiVariables.articoloItemCoordinates.push
        ({
            dom: $(dropContainerLcl),
            left: lefttop.left,
            top: lefttop.top,
            right: lefttop.left + $(dropContainerLcl).width(),
            bottom: lefttop.top + $(dropContainerLcl).height()
        });
    }
}
function dragArticoloItem(event)
{
    creazioneLottiVariables.hasDragStarted = true;

    var articoloItem = creazioneLottiVariables.articoloItemBeingDragged;
    articoloItem.style.position = "absolute";

    var left = event.clientX - document.body.getBoundingClientRect().left - (articoloItem.offsetWidth/2);
    var top = event.clientY - document.body.getBoundingClientRect().top - (articoloItem.offsetHeight/2);
    
    articoloItem.style.left = left;
    articoloItem.style.top = top;

    //scorri tutti i drop container per a quale sei sopra (piuttosto lento)
    for (var i in creazioneLottiVariables.articoloItemCoordinates)
    {
        if (creazioneLottiVariables.articoloItemMousex >= creazioneLottiVariables.articoloItemCoordinates[i].left && creazioneLottiVariables.articoloItemMousex <= creazioneLottiVariables.articoloItemCoordinates[i].right && creazioneLottiVariables.articoloItemMousey >= creazioneLottiVariables.articoloItemCoordinates[i].top && creazioneLottiVariables.articoloItemMousey <= creazioneLottiVariables.articoloItemCoordinates[i].bottom)
        {
            creazioneLottiVariables.articoloItemCoordinates[i].dom[0].style.padding = "2px";
            creazioneLottiVariables.articoloItemCoordinates[i].dom[0].style.border = "3px dashed rgb(76, 145, 203)";
            creazioneLottiVariables.articoloItemCoordinates[i].dom[0].style.backgroundColor = "rgb(76, 145, 203,0.15)";
        }
        else
        {
            creazioneLottiVariables.articoloItemCoordinates[i].dom[0].style.padding = "";
            creazioneLottiVariables.articoloItemCoordinates[i].dom[0].style.border = "";
            creazioneLottiVariables.articoloItemCoordinates[i].dom[0].style.backgroundColor = "";
        }
    }

    creazioneLottiVariables.articoloItemMousex = event.pageX;
    creazioneLottiVariables.articoloItemMousey = event.pageY;
}
function stopDragArticoloItem(event)
{
    if(creazioneLottiVariables.hasDragStarted)
    {
        var item=creazioneLottiVariables.articoloItemBeingDragged;
        item.style.display="none";
    
        var origin = item.parentElement;
    
        var id_articolo = item.getAttribute("id_articolo");
        var codice_articolo =  item.getAttribute("codice_articolo");
    
        var dropContainerCheck=document.elementFromPoint(event.clientX - document.body.getBoundingClientRect().left, event.clientY - document.body.getBoundingClientRect().top);
        var dropContainer;
    
        var correct_target=false;
        if(dropContainerCheck.classList.contains("articoli-inner-container"))
        {
            correct_target = true;
            dropContainer = dropContainerCheck;
        }
        else
        {
            var parentElement = dropContainerCheck.parentElement;
            while(parentElement != null)
            {
                if(parentElement.classList.contains("articoli-inner-container"))
                {
                    correct_target = true;
                    dropContainer = parentElement;
                }
                parentElement = parentElement.parentElement;
            }
        }
    
        creazioneLottiVariables.articoloItemBeingDragged.remove();
    
        if(correct_target)
        {
            dropContainer.style.padding="";
            dropContainer.style.border="";
            dropContainer.style.backgroundColor="";
    
            if(dropContainer.id != origin.id)
            {
                if(origin.id == "innerContainerArticoli")
                {
                    aggiungiArticoloLotto(getArticoloItem,dropContainer,id_articolo,codice_articolo);
                }
                else
                {
                    rimuoviArticoloLotto(getArticoloItem,dropContainer,id_articolo,codice_articolo);
                }
            }
            else
                getArticoloItem(origin,id_articolo,codice_articolo,1);
        }
        else
            getArticoloItem(origin,id_articolo,codice_articolo,1)
    }

    creazioneLottiVariables.articoloItemBeingDragged.releasePointerCapture(event.pointerId);
    creazioneLottiVariables.articoloItemBeingDragged=null;
}
function aggiungiArticoloLotto(callback,container,id_articolo,codice_articolo)
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
        allowEscapeKey:false,
        showCancelButton:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
    });

    var id_lotto = creazioneLottiVariables.id_lotto;

    $.post('aggiungiArticoloLottoGestioneLottiProduzione.php',{ id_lotto,id_articolo },
    function (response, status)
    {
        if (status == 'success')
        {
            if (response.toLowerCase().indexOf('error') > -1 ||response.toLowerCase().indexOf('notice') > -1 ||response.toLowerCase().indexOf('warning') > -1)
            {
                Swal.fire
                ({
                    icon: 'error',
                    title:"Errore. Se il problema persiste contatta l' amministratore",
                    onOpen: function ()
                    {
                        document.getElementsByClassName('swal2-title')[0].style.color ='gray';
                        document.getElementsByClassName('swal2-title')[0].style.fontSize = '14px';
                    },
                });
                console.log(response);
            }
            else
            {
                Swal.close();

                if(callback != null && callback != undefined && callback != "")
                    callback(container,id_articolo,codice_articolo,1);
            }
        }
    });
}
function rimuoviArticoloLotto(callback,container,id_articolo,codice_articolo)
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
        allowEscapeKey:false,
        showCancelButton:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
    });

    var id_lotto = creazioneLottiVariables.id_lotto;

    $.post('rimuoviArticoloLottoGestioneLottiProduzione.php',{ id_lotto,id_articolo },
    function (response, status)
    {
        if (status == 'success')
        {
            if (response.toLowerCase().indexOf('error') > -1 ||response.toLowerCase().indexOf('notice') > -1 ||response.toLowerCase().indexOf('warning') > -1)
            {
                Swal.fire
                ({
                    icon: 'error',
                    title:"Errore. Se il problema persiste contatta l' amministratore",
                    onOpen: function ()
                    {
                        document.getElementsByClassName('swal2-title')[0].style.color ='gray';
                        document.getElementsByClassName('swal2-title')[0].style.fontSize = '14px';
                    },
                });
                console.log(response);
            }
            else
            {
                Swal.close();

                if(callback != null && callback != undefined && callback != "")
                    callback(container,id_articolo,codice_articolo);
            }
        }
    });
}
//-------------------------------------------------------------------------------------------
function getArticoliLotto(id_lotto)
{
    return new Promise(function (resolve, reject)
    {
        $.get('getArticoliLottoGestioneLottiProduzione.php',{ id_lotto },
        function (response, status)
        {
            if (status == 'success')
            {
                if (response.toLowerCase().indexOf('error') > -1 ||response.toLowerCase().indexOf('notice') > -1 ||response.toLowerCase().indexOf('warning') > -1)
                {
                    Swal.fire
                    ({
                        icon: 'error',
                        title:"Errore. Se il problema persiste contatta l' amministratore",
                        onOpen: function ()
                        {
                            document.getElementsByClassName('swal2-title')[0].style.color ='gray';
                            document.getElementsByClassName('swal2-title')[0].style.fontSize = '14px';
                        },
                    });
                    console.log(response);
                    resolve({});
                }
                else
                {
                    try
                    {
                        resolve(JSON.parse(response));
                    }
                    catch (error)
                    {
                        Swal.fire
                        ({
                            icon: 'error',
                            title:"Errore. Se il problema persiste contatta l' amministratore",
                            onOpen: function ()
                            {
                                document.getElementsByClassName('swal2-title')[0].style.color = 'gray';
                                document.getElementsByClassName('swal2-title')[0].style.fontSize = '14px';
                            },
                        });
                        console.log(response);
                        resolve({});
                    }
                }
            }
        });
    });
}
function getLotti()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getLottiGestioneLottiProduzione.php",
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
function validateInput(input,event)
{
    var allowed=["1","2","3","4","5","6","7","8","9","0","Control","CapsLock",";","Shift","Enter","Backspace","Delete","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"," ","A","a","B","b","C","c","D","d","E","e","F","f","G","g","H","h","I","i","J","j","K","k","L","l","M","m","N","n","O","o","P","p","Q","q","R","r","S","s","T","t","U","u","V","v","W","w","X","x","Y","y","Z","z","/",",",".",":","-","_","(",")"];
    if(!allowed.includes(event.key))
    {
        event.preventDefault();
        return;
    }
}
//---------------------------------------------------------------------------------------------------------------------------------------------
async function getMascheraProduzioneLotto(button)
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
        allowEscapeKey:false,
        showCancelButton:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
    });

    view="produzione_lotto";

    $(".in-page-nav-bar-button").css({"border-bottom-color":"","font-weight":""});
    button.style.borderBottomColor="#4C91CB";
    button.style.fontWeight="bold";

    document.getElementById("actionBarGestioneLottiProduzione").style.display="";
    document.getElementById("actionBarGestioneLottiProduzione").innerHTML="";

    document.getElementById("gestioneLottiProduzioneContainer").style.display="";
    document.getElementById("gestioneLottiProduzioneContainer").innerHTML="";

    var actionBar=document.getElementById("actionBarGestioneLottiProduzione");

    var div=document.createElement("div");
    div.setAttribute("class","rcb-select-container");
    var span=document.createElement("span");
    span.innerHTML="Lotto";
    div.appendChild(span);
    var select=document.createElement("select");
    select.setAttribute("style","text-decoration:none");
    select.setAttribute("onchange","");

    lotti=await getLotti();
    console.log(lotti);

    Swal.close();

    var option=document.createElement("option");
    option.setAttribute("value","");
    option.innerHTML="seleziona...";
    select.appendChild(option);

    lotti.forEach(lotto =>
    {
        var option=document.createElement("option");
        option.setAttribute("value",lotto.id_lotto);
        option.innerHTML=lotto.lotto;
        select.appendChild(option);
    });

    div.appendChild(select);
    actionBar.appendChild(div);

    var button=document.createElement("button");
    button.setAttribute("class","rcb-button-text-icon");
    button.setAttribute("onclick","");
    var span=document.createElement("span");
    span.innerHTML="Esporta";
    button.appendChild(span);
    var i=document.createElement("i");
    i.setAttribute("class","fad fa-file-excel");
    i.setAttribute("style","margin-left:5px");
    button.appendChild(i);
    actionBar.appendChild(button);
}

    /*var div=document.createElement("div");
    div.setAttribute("class","rcb-select-container");
    var span=document.createElement("span");
    span.innerHTML="Lotto";
    div.appendChild(span);
    var select=document.createElement("select");
    select.setAttribute("style","text-decoration:none");
    select.setAttribute("id","selectLottoCreazioneLotto");
    select.setAttribute("onchange","getComposizioneLotto()");
    div.appendChild(select);
    actionBar.appendChild(div);*/

    //getOptionsSelectLotto("selectLottoCreazioneLotto");
/*async function getOptionsSelectLotto(id,toSelect,callback)
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
        allowEscapeKey:false,
        showCancelButton:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
    });

    var select = document.getElementById(id);
    select.innerHTML="";

    lotti=await getLotti();

    Swal.close();

    var option=document.createElement("option");
    option.setAttribute("value","");
    option.innerHTML="seleziona...";
    select.appendChild(option);

    lotti.forEach(lotto =>
    {
        var option=document.createElement("option");
        option.setAttribute("value",lotto.id_lotto);
        if(lotto.id_lotto==toSelect)
            option.setAttribute("selected","selected");
        option.innerHTML=lotto.lotto;
        select.appendChild(option);
    });

    if(callback != null && callback != undefined && callback != "")
        callback();
}*/
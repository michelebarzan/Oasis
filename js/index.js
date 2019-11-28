function getPagineHomepage()
{
    $(".homepageLinkContainer").empty();
    $.get("getPageList.php",
    function(response, status)
    {
        if(status=="success")
        {
            var responseArray=[];
            var responseArrayObj = JSON.parse(response);
            for (var key in responseArrayObj)
            {
                responseArray.push(responseArrayObj[key]);							
            }
            
            var pagine_preferite=JSON.parse(responseArray[0]);
            var sezioni=JSON.parse(responseArray[1]);
            var homepageSectionContainerHeights=[];

            var container=document.getElementsByClassName("homepageLinkContainer")[0];

            var homepageSectionContainer=document.createElement("div");
            homepageSectionContainer.setAttribute("class","homepageSectionContainer");

            var homepageSectionTitle=document.createElement("div");
            homepageSectionTitle.setAttribute("class","homepageSectionTitle");
            var buttonAggiungiPreferiti=document.createElement("button");
            var iconAggiungiPreferiti=document.createElement("i");
            buttonAggiungiPreferiti.setAttribute("class","homepageButtonAggiungiPreferiti");
            buttonAggiungiPreferiti.setAttribute("title","Gestisci pagine preferite");
            iconAggiungiPreferiti.setAttribute("class","fal fa-star");
            buttonAggiungiPreferiti.setAttribute("onclick","apriPopupAggiungiPreferiti()");
            homepageSectionTitle.innerHTML="Preferiti";
            buttonAggiungiPreferiti.appendChild(iconAggiungiPreferiti);
            homepageSectionTitle.appendChild(buttonAggiungiPreferiti);

            homepageSectionContainer.appendChild(homepageSectionTitle);

            for(var i=0;i<pagine_preferite.length;i++)
            {
                var pagina=pagine_preferite[i];
                
                var homepageLink=document.createElement("div");
                homepageLink.setAttribute("class","homepageLink");
                homepageLink.setAttribute("data-tooltip",pagina["descrizionePagina"]);
                homepageLink.setAttribute("onclick","gotopath('"+pagina['pagina']+"')");

                var homepageLinkIcon=document.createElement("i");
                homepageLinkIcon.setAttribute("class",pagina['icona']);

                var homepageLinkName=document.createElement("div");
                homepageLinkName.innerHTML=pagina["nomePagina"];

                homepageLink.appendChild(homepageLinkIcon);
                homepageLink.appendChild(homepageLinkName);

                homepageSectionContainer.appendChild(homepageLink);
            }

            container.appendChild(homepageSectionContainer);

            homepageSectionContainerHeights.push(homepageSectionContainer.offsetHeight);

            for(var i=0;i<sezioni.length;i++)
            {
                var sezione=sezioni[i];

                var homepageSectionContainer=document.createElement("div");
                homepageSectionContainer.setAttribute("class","homepageSectionContainer");

                var homepageSectionTitle=document.createElement("div");
                homepageSectionTitle.setAttribute("class","homepageSectionTitle");
                homepageSectionTitle.innerHTML=sezione["sezione"];

                homepageSectionContainer.appendChild(homepageSectionTitle);

                var pagine_sezioni=sezione['pagine'];
                for(var k=0;k<pagine_sezioni.length;k++)
                {
                    var pagina=pagine_sezioni[k];

                    var homepageLink=document.createElement("div");
                    homepageLink.setAttribute("class","homepageLink");
                    homepageLink.setAttribute("data-tooltip",pagina["descrizionePagina"]);
                    homepageLink.setAttribute("onclick","gotopath('"+pagina['pagina']+"')");

                    var homepageLinkIcon=document.createElement("i");
                    homepageLinkIcon.setAttribute("class",pagina['icona']);

                    var homepageLinkName=document.createElement("div");
                    homepageLinkName.innerHTML=pagina["nomePagina"];

                    homepageLink.appendChild(homepageLinkIcon);
                    homepageLink.appendChild(homepageLinkName);

                    homepageSectionContainer.appendChild(homepageLink);
                }

                container.appendChild(homepageSectionContainer);

                homepageSectionContainerHeights.push(homepageSectionContainer.offsetHeight);
            }

            var maxHeight = Math.max.apply(null, homepageSectionContainerHeights)-10;

            $(".homepageSectionContainer").height(maxHeight);
        }
        else
            console.log(status);
    });
}
async function apriPopupAggiungiPreferiti()
{
    var listaPagine=await getListaPagineAggiungiPreferiti();
    var listaPagineContainer=document.createElement("div");
    listaPagineContainer.setAttribute("id","listaPagineContainerAggiungiPreferitiContainer");
    listaPagineContainer.appendChild(listaPagine);
    
    Swal.fire
    ({
        title: 'Gestisci pagine preferite',
        html:listaPagineContainer.outerHTML,
        showCloseButton:true,
        confirmButtonText:"Chiudi"
    }).then(function(){getPagineHomepage()});
}
async function appendListaPagineAggiungiPreferiti()
{
    newMouseSpinner(event);
    var listaPagine=await getListaPagineAggiungiPreferiti();
    document.getElementById('listaPagineContainerAggiungiPreferitiContainer').innerHTML="";
    document.getElementById('listaPagineContainerAggiungiPreferitiContainer').appendChild(listaPagine);
    removeMouseSpinner();
}
function getListaPagineAggiungiPreferiti()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getPageList.php",
        function(response, status)
        {
            if(status=="success")
            {
                //console.log(response);
                var responseArray=[];
                var responseArrayObj = JSON.parse(response);
                for (var key in responseArrayObj)
                {
                    responseArray.push(responseArrayObj[key]);							
                }
                
                var pagine_preferite=JSON.parse(responseArray[0]);
                var sezioni=JSON.parse(responseArray[1]);

                var listaPagine=document.createElement("ul");
                listaPagine.setAttribute("class","listaPagineAggiungiPreferitiHomepage");

                for(var i=0;i<pagine_preferite.length;i++)
                {
                    var pagina=pagine_preferite[i];
                    
                    var itemListaPagine=document.createElement("li");

                    var itemListaPagineIcon=document.createElement("i");
                    itemListaPagineIcon.setAttribute("class",pagina["icona"]);
                    itemListaPagine.appendChild(itemListaPagineIcon);

                    var itemListaPagineSpan=document.createElement("span");
                    itemListaPagineSpan.innerHTML=pagina["nomePagina"];
                    itemListaPagine.appendChild(itemListaPagineSpan);

                    var itemListaPagineButton=document.createElement("button");
                    itemListaPagineButton.setAttribute("title","Rimuovi dai preferiti");
                    itemListaPagineButton.setAttribute("onclick","rimuoviPaginaPreferiti(event,"+pagina['id_pagina_preferita_utente']+");appendListaPagineAggiungiPreferiti()");

                    var itemListaPagineButtonIcon=document.createElement("i");
                    itemListaPagineButtonIcon.setAttribute("class","fas fa-star");
                    itemListaPagineButton.appendChild(itemListaPagineButtonIcon);

                    itemListaPagine.appendChild(itemListaPagineButton);

                    listaPagine.appendChild(itemListaPagine);
                }

                for(var i=0;i<sezioni.length;i++)
                {
                    var sezione=sezioni[i];
                    var pagine_sezioni=sezione['pagine'];
                    for(var k=0;k<pagine_sezioni.length;k++)
                    {
                        var pagina=pagine_sezioni[k];

                        var itemListaPagine=document.createElement("li");

                        var itemListaPagineIcon=document.createElement("i");
                        itemListaPagineIcon.setAttribute("class",pagina["icona"]);
                        itemListaPagine.appendChild(itemListaPagineIcon);

                        var itemListaPagineSpan=document.createElement("span");
                        itemListaPagineSpan.innerHTML=pagina["nomePagina"];
                        itemListaPagine.appendChild(itemListaPagineSpan);

                        var itemListaPagineButton=document.createElement("button");
                        itemListaPagineButton.setAttribute("title","Aggiungi ai preferiti");
                        itemListaPagineButton.setAttribute("onclick","aggiungiPaginaPreferiti(event,"+pagina['id_pagina']+");appendListaPagineAggiungiPreferiti()");

                        var itemListaPagineButtonIcon=document.createElement("i");
                        itemListaPagineButtonIcon.setAttribute("class","fal fa-star");
                        itemListaPagineButton.appendChild(itemListaPagineButtonIcon);

                        itemListaPagine.appendChild(itemListaPagineButton);

                        listaPagine.appendChild(itemListaPagine);
                    }
                }
                resolve(listaPagine);
            }
            else
                reject({status});
        });
    });
}
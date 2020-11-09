var permessiColonne;

window.addEventListener("load", async function(event)
{
    permessiColonne=await checkPermessiColonne();
    //getTrackingOrdine()
});
async function getTrackingOrdine()
{
    var container=document.getElementById("containerTrackingOrdini");
    container.innerHTML="";
    
    var ordine=document.getElementById("inputSearchTrackingOrdine").value;
    if(ordine!=="" && ordine!==null && ordine.length!==0)
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
        if(ordine.length!==8 || /^\d+$/.test(ordine)==false)
        {
            Swal.fire
            ({
                icon:"error",
                background:"#404040",
                title:"Valore inserito non valido",
                allowOutsideClick:true,
                onOpen : function()
                        {
                            document.getElementsByClassName("swal2-title")[0].style.fontWeight="normal";
                            document.getElementsByClassName("swal2-title")[0].style.color="white";
                            document.getElementsByClassName("swal2-close")[0].style.outline="none";
                            document.getElementsByClassName("swal2-content")[0].style.padding="0px";
                        },
                showCloseButton:true,
                showConfirmButton:false,
                showCancelButton:false
            });
        }
        else
        {
            var infoOrdine=await getInfoOrdine(ordine);
            if(!infoOrdine.trovato)
            {
                Swal.fire
                ({
                    icon:"error",
                    background:"#404040",
                    title:"Ordine non trovato",
                    allowOutsideClick:true,
                    onOpen : function()
                            {
                                document.getElementsByClassName("swal2-title")[0].style.fontWeight="normal";
                                document.getElementsByClassName("swal2-title")[0].style.color="white";
                                document.getElementsByClassName("swal2-close")[0].style.outline="none";
                                document.getElementsByClassName("swal2-content")[0].style.padding="0px";
                            },
                    showCloseButton:true,
                    showConfirmButton:false,
                    showCancelButton:false
                });
            }
            else
            {
                //ANAGRFICA ORDINE---------------------------------------------------------------------------------------------

                var labelContainer=document.createElement("div");
                labelContainer.setAttribute("class","info-ordine-label-container");

                var i=document.createElement("i");
                i.setAttribute("class","fas fa-circle");
                labelContainer.appendChild(i);

                var span=document.createElement("span");
                span.innerHTML="Anagrafica dell' ordine";
                labelContainer.appendChild(span);

                container.appendChild(labelContainer);

                var infoOrdineOuterContainer=document.createElement("div");
                infoOrdineOuterContainer.setAttribute("class","info-ordine-outer-container");

                //RIGA 1
                var infoOrdineRow=document.createElement("div");
                infoOrdineRow.setAttribute("class","info-ordine-row"); 
                //infoOrdineRow.setAttribute("style","justify-content: space-evenly;"); 

                //COLONNA ANAGRAFICA ORDINE
                var infoOrdineColumn=document.createElement("div");
                infoOrdineColumn.setAttribute("class","info-ordine-column"); 
                infoOrdineColumn.setAttribute("style","width:50%"); 

                var infoOrdineColumnRow=document.createElement("div");
                infoOrdineColumnRow.setAttribute("class","info-ordine-column-row"); 
                infoOrdineColumnRow.setAttribute("style","margin-bottom:10px");

                var infoOrdineContainer=document.createElement("div");
                infoOrdineContainer.setAttribute("class","info-ordine-icon-container");
                infoOrdineContainer.setAttribute("style","background-color: #4C91CB;box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);color: white;padding: 10px;");

                var i=document.createElement("i");
                i.setAttribute("class","fad fa-tags");
                infoOrdineContainer.appendChild(i);

                var span=document.createElement("span");
                span.innerHTML=infoOrdine.ordine;
                infoOrdineContainer.appendChild(span);

                infoOrdineColumnRow.appendChild(infoOrdineContainer);

                var infoOrdineContainer=document.createElement("div");
                infoOrdineContainer.setAttribute("class","info-ordine-icon-container");
                infoOrdineContainer.setAttribute("style","margin-left:20px;");

                var i=document.createElement("i");
                i.setAttribute("class","fad fa-shipping-timed");
                infoOrdineContainer.appendChild(i);

                var span=document.createElement("span");
                span.innerHTML=infoOrdine.dataConsegnaString;
                infoOrdineContainer.appendChild(span);

                infoOrdineColumnRow.appendChild(infoOrdineContainer);

                infoOrdineColumn.appendChild(infoOrdineColumnRow);

                var infoOrdineColumnRow=document.createElement("div");
                infoOrdineColumnRow.setAttribute("class","info-ordine-column-row"); 
                infoOrdineColumnRow.setAttribute("style","margin-top:10px;margin-bottom:10px");

                var infoOrdineContainer=document.createElement("div");
                infoOrdineContainer.setAttribute("class","info-ordine-icon-container");
                infoOrdineContainer.setAttribute("style","");

                var i=document.createElement("i");
                i.setAttribute("class","fad fa-address-book");
                infoOrdineContainer.appendChild(i);

                var span=document.createElement("span");
                span.innerHTML=infoOrdine.nome_cliente;
                infoOrdineContainer.appendChild(span);

                infoOrdineColumnRow.appendChild(infoOrdineContainer);

                infoOrdineColumn.appendChild(infoOrdineColumnRow);

                infoOrdineRow.appendChild(infoOrdineColumn);

                //COLONNA INFO GENERALI ORDINE

                var infoOrdineColumn=document.createElement("div");
                infoOrdineColumn.setAttribute("class","info-ordine-column"); 
                infoOrdineColumn.setAttribute("style","width:50%;height:100%"); 

                var infoOrdineTable=document.createElement("table");
                infoOrdineTable.setAttribute("class","info-ordine-table"); 
                infoOrdineTable.setAttribute("style","height:100%"); 

                var tr=document.createElement("tr");

                var th=document.createElement("th");
                th.innerHTML="Collezione";
                tr.appendChild(th);

                var th=document.createElement("th");
                th.innerHTML="Linea business";
                tr.appendChild(th);

                var th=document.createElement("th");
                th.innerHTML="Statistical group name";
                tr.appendChild(th);

                var th=document.createElement("th");
                th.innerHTML="Tipo";
                tr.appendChild(th);

                var th=document.createElement("th");
                th.innerHTML="Note";
                tr.appendChild(th);

                infoOrdineTable.appendChild(tr);

                var tr=document.createElement("tr");

                var td=document.createElement("td");
                td.innerHTML=infoOrdine.collezione;
                tr.appendChild(td);

                var td=document.createElement("td");
                td.innerHTML=infoOrdine.linea_business;
                tr.appendChild(td);

                var td=document.createElement("td");
                td.innerHTML=infoOrdine.Statistical_group_name;
                tr.appendChild(td);

                var td=document.createElement("td");
                td.innerHTML=infoOrdine.tipo;
                tr.appendChild(td);

                var td=document.createElement("td");
                td.innerHTML=infoOrdine.note;
                tr.appendChild(td);

                infoOrdineTable.appendChild(tr);

                infoOrdineColumn.appendChild(infoOrdineTable);

                infoOrdineRow.appendChild(infoOrdineColumn);

                infoOrdineOuterContainer.appendChild(infoOrdineRow);

                //RIGA 2
                var infoOrdineRow=document.createElement("div");
                infoOrdineRow.setAttribute("class","info-ordine-row"); 
                infoOrdineRow.setAttribute("style","width:100%;margin-top:20px"); 

                //COLONNA COMPOSIZIONE ORDINE

                var infoOrdineColumn=document.createElement("div");
                infoOrdineColumn.setAttribute("class","info-ordine-column"); 
                infoOrdineColumn.setAttribute("style","width:50%;height:100%"); 

                var rowItem=document.createElement("div");
                rowItem.setAttribute("class","pick-item-row-item");
                rowItem.setAttribute("style","flex-direction:row;align-items:center;box-sizing:border-box;padding:20px;background-color:rgb(236, 236, 236);border-radius:4px;box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);height:100%");
                
                var info=document.createElement("div");
                info.setAttribute("class","pick-item-info-container");
                info.setAttribute("style","display:flex;flex-direction:column;justify-content:center;align-items:center;margin-right:10px;margin-left:10px");
                info.innerHTML="<b style='color:#4C91CB'>"+parseFloat(infoOrdine.mq).toFixed(2)+"</b><b>MQ</b>";
                rowItem.appendChild(info);
                
                var info=document.createElement("div");
                info.setAttribute("class","pick-item-info-container");
                info.setAttribute("style","display:flex;flex-direction:column;justify-content:center;align-items:center;margin-right:10px;margin-left:10px");
                info.innerHTML="<b style='color:#4C91CB'>"+infoOrdine.basi_portalavabo+"</b><b>Basi portalavabo</b>";
                rowItem.appendChild(info);
                
                var info=document.createElement("div");
                info.setAttribute("class","pick-item-info-container");
                info.setAttribute("style","display:flex;flex-direction:column;justify-content:center;align-items:center;margin-right:10px;margin-left:10px");
                info.innerHTML="<b style='color:#4C91CB'>"+infoOrdine.basi_accostabili+"</b><b>Basi accostabili</b>";
                rowItem.appendChild(info);
                
                var info=document.createElement("div");
                info.setAttribute("class","pick-item-info-container");
                info.setAttribute("style","display:flex;flex-direction:column;justify-content:center;align-items:center;margin-right:10px;margin-left:10px");
                info.innerHTML="<b style='color:#4C91CB'>"+infoOrdine.pensili+"</b><b>Pensili</b>";
                rowItem.appendChild(info);
                
                var info=document.createElement("div");
                info.setAttribute("class","pick-item-info-container");
                info.setAttribute("style","display:flex;flex-direction:column;justify-content:center;align-items:center;margin-right:10px;margin-left:10px");
                info.innerHTML="<b style='color:#4C91CB'>"+infoOrdine.colonne+"</b><b>Colonne</b>";
                rowItem.appendChild(info);

                var info=document.createElement("div");
                info.setAttribute("class","pick-item-info-container");
                info.setAttribute("style","display:flex;flex-direction:column;justify-content:center;align-items:center;margin-right:10px;margin-left:10px");
                info.innerHTML="<b style='color:#4C91CB'>"+infoOrdine.Altro+"</b><b>Altro</b>";
                rowItem.appendChild(info);

                var info=document.createElement("div");
                info.setAttribute("class","pick-item-info-container");
                info.setAttribute("style","display:flex;flex-direction:column;justify-content:center;align-items:center;margin-right:10px;margin-left:10px");
                info.innerHTML="<b style='color:#4C91CB'>"+infoOrdine.totale_pezzi+"</b><b>Pezzi in totale</b>";
                rowItem.appendChild(info);

                infoOrdineColumn.appendChild(rowItem);

                infoOrdineRow.appendChild(infoOrdineColumn);

                if(permessiColonne)
                {
                    //COLONNA INFO IMPORTO ORDINE
                    var infoOrdineColumn=document.createElement("div");
                    infoOrdineColumn.setAttribute("class","info-ordine-column"); 
                    infoOrdineColumn.setAttribute("style","width:50%"); 

                    var infoOrdineColumnRow=document.createElement("div");
                    infoOrdineColumnRow.setAttribute("class","info-ordine-column-row"); 
                    infoOrdineColumnRow.setAttribute("style","margin-bottom:10px");

                    var infoOrdineContainer=document.createElement("div");
                    infoOrdineContainer.setAttribute("class","info-ordine-icon-container");
                    infoOrdineContainer.setAttribute("style","background-color: #70B085;box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);color: white;padding: 10px;margin-left:auto");

                    var i=document.createElement("i");
                    i.setAttribute("class","fad fa-receipt");
                    infoOrdineContainer.appendChild(i);

                    var span=document.createElement("span");
                    span.innerHTML=parseFloat(infoOrdine.importo_totale).toFixed(2)+"€";
                    infoOrdineContainer.appendChild(span);

                    infoOrdineColumnRow.appendChild(infoOrdineContainer);

                    infoOrdineColumn.appendChild(infoOrdineColumnRow);

                    var infoOrdineColumnRow=document.createElement("div");
                    infoOrdineColumnRow.setAttribute("class","info-ordine-column-row"); 
                    infoOrdineColumnRow.setAttribute("style",";width:auto;margin-top:10px;margin-left:auto");

                    var infoOrdineContainer=document.createElement("div");
                    infoOrdineContainer.setAttribute("class","info-ordine-icon-container");
                    infoOrdineContainer.setAttribute("style","margin-bottom:10px");

                    var i=document.createElement("i");
                    i.setAttribute("class","fad fa-money-check-edit");
                    infoOrdineContainer.appendChild(i);

                    var span=document.createElement("span");
                    span.innerHTML=infoOrdine.tipo_pagamento;
                    infoOrdineContainer.appendChild(span);

                    infoOrdineColumnRow.appendChild(infoOrdineContainer);

                    infoOrdineColumn.appendChild(infoOrdineColumnRow);

                    infoOrdineRow.appendChild(infoOrdineColumn);
                }

                infoOrdineOuterContainer.appendChild(infoOrdineRow);

                container.appendChild(infoOrdineOuterContainer);

                //FILE ORDINE------------------------------------------------------------------------------

                var labelContainer=document.createElement("div");
                labelContainer.setAttribute("class","info-ordine-label-container");

                var i=document.createElement("i");
                i.setAttribute("class","fas fa-circle");
                labelContainer.appendChild(i);

                var span=document.createElement("span");
                span.innerHTML="File relativi all' ordine";
                labelContainer.appendChild(span);

                container.appendChild(labelContainer);

                var fotoOrdineOuterContainer=document.createElement("div");
                fotoOrdineOuterContainer.setAttribute("class","info-ordine-outer-container");

                //RIGA 1
                var fotoOrdineRow=document.createElement("div");
                fotoOrdineRow.setAttribute("class","info-ordine-row"); 
                fotoOrdineRow.setAttribute("style","width:100%;");

                var fotoOrdineColumn=document.createElement("div");
                fotoOrdineColumn.setAttribute("class","info-ordine-column"); 

                var infoOrdineContainer=document.createElement("div");
                infoOrdineContainer.setAttribute("class","info-ordine-icon-container");
                infoOrdineContainer.setAttribute("style","cursor:pointer;background-color: #DA6969;box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);color: white;padding: 10px;");

                var i=document.createElement("i");
                i.setAttribute("class","fad fa-file-pdf");
                infoOrdineContainer.appendChild(i);

                var a=document.createElement("a");
                a.setAttribute("class","foto-ordine-link-pdf");
                a.setAttribute("href","http:\\\\remote.oasisgroup.it\\OasisPdfOrdini\\pdf_ordini\\H"+infoOrdine.ordine+".pdf");
                a.setAttribute("target","_blank");
                a.innerHTML=infoOrdine.ordine+".pdf";
                infoOrdineContainer.appendChild(a);

                fotoOrdineRow.appendChild(infoOrdineContainer);

                fotoOrdineRow.appendChild(fotoOrdineColumn);

                fotoOrdineOuterContainer.appendChild(fotoOrdineRow);

                //RIGA 2
                var fotoOrdineRow=document.createElement("div");
                fotoOrdineRow.setAttribute("class","info-ordine-row"); 
                fotoOrdineRow.setAttribute("style","width:100%;"); 

                var fotoOrdineColumn=document.createElement("div");
                fotoOrdineColumn.setAttribute("class","info-ordine-column"); 
                fotoOrdineColumn.setAttribute("style","width:100%;"); 

                var fotoOrdine=await getfotoOrdine(ordine);
                
                if(fotoOrdine.length==0)
                {
                    var infoOrdineContainer=document.createElement("div");
                    infoOrdineContainer.setAttribute("class","info-ordine-icon-container");
                    infoOrdineContainer.setAttribute("style","color:#DA6969");
    
                    var i=document.createElement("i");
                    i.setAttribute("class","fad fa-exclamation-circle");
                    infoOrdineContainer.appendChild(i);
    
                    var span=document.createElement("span");
                    span.innerHTML="Nessuna foto associata all' ordine";
                    infoOrdineContainer.appendChild(span);
    
                    fotoOrdineColumn.appendChild(infoOrdineContainer);
                }
                else
                {
                    var stazioniDuplicates=[];
                    fotoOrdine.forEach(foto =>
                    {
                        stazioniDuplicates.push(foto.stazione);
                    });
                    var stazioni = [];
                    $.each(stazioniDuplicates, function(i, el){
                        if($.inArray(el, stazioni) === -1) stazioni.push(el);
                    });

                    stazioni.forEach(stazione =>
                    {
                        var fotoOrdineColumnRow=document.createElement("div");
                        fotoOrdineColumnRow.setAttribute("class","info-ordine-column-row"); 
                        fotoOrdineColumnRow.setAttribute("style","flex-direction: column;align-items: flex-start;justify-content: flex-start;");

                        var infoOrdineContainer=document.createElement("div");
                        infoOrdineContainer.setAttribute("class","info-ordine-icon-container");
                        infoOrdineContainer.setAttribute("style","margin-top:20px;");
        
                        var i=document.createElement("i");
                        i.setAttribute("class","fad fa-network-wired");
                        infoOrdineContainer.appendChild(i);
        
                        var span=document.createElement("span");
                        span.innerHTML=stazione;
                        infoOrdineContainer.appendChild(span);
        
                        fotoOrdineColumnRow.appendChild(infoOrdineContainer);

                        var imagesSlider=document.createElement("div");
                        imagesSlider.setAttribute("class","info-ordine-images-slider");

                        fotoOrdine.forEach(foto =>
                        {
                            if(foto.stazione==stazione)
                            {
                                var img=document.createElement("img");
                                img.setAttribute("src",foto.percorso);
                                imagesSlider.appendChild(img);
                            }
                        });

                        fotoOrdineColumnRow.appendChild(imagesSlider);

                        fotoOrdineColumn.appendChild(fotoOrdineColumnRow);
                    });
                }

                fotoOrdineRow.appendChild(fotoOrdineColumn);

                fotoOrdineOuterContainer.appendChild(fotoOrdineRow);

                container.appendChild(fotoOrdineOuterContainer);

                //ORDINI FORNITORI------------------------------------------------------------------------------

                var ordiniFornitori=await getOrdiniFornitori(ordine);

                var labelContainer=document.createElement("div");
                labelContainer.setAttribute("class","info-ordine-label-container");

                var i=document.createElement("i");
                i.setAttribute("class","fas fa-circle");
                labelContainer.appendChild(i);

                var span=document.createElement("span");
                span.innerHTML="Merce ordinata per l' ordine";
                labelContainer.appendChild(span);

                container.appendChild(labelContainer);

                var ordiniFornitoriOuterContainer=document.createElement("div");
                ordiniFornitoriOuterContainer.setAttribute("class","info-ordine-outer-container");

                if(ordiniFornitori.length==0)
                {
                    var infoOrdineContainer=document.createElement("div");
                    infoOrdineContainer.setAttribute("class","info-ordine-icon-container");
                    infoOrdineContainer.setAttribute("style","color:#DA6969");
    
                    var i=document.createElement("i");
                    i.setAttribute("class","fad fa-exclamation-circle");
                    infoOrdineContainer.appendChild(i);
    
                    var span=document.createElement("span");
                    span.innerHTML="Nessun ordine fornitore associato";
                    infoOrdineContainer.appendChild(span);
    
                    ordiniFornitoriOuterContainer.appendChild(infoOrdineContainer);
                }
                else
                {
                    //RIGA 1
                    var ordiniFornitoriRow=document.createElement("div");
                    ordiniFornitoriRow.setAttribute("class","info-ordine-row"); 
                    ordiniFornitoriRow.setAttribute("style","width:100%;"); 

                    var ordiniFornitoriColumn=document.createElement("div");
                    ordiniFornitoriColumn.setAttribute("class","info-ordine-column"); 

                    var ordiniFornitoriTable=document.createElement("table");
                    ordiniFornitoriTable.setAttribute("class","info-ordine-table"); 

                    var tr=document.createElement("tr");

                    var th=document.createElement("th");
                    th.innerHTML="Ordine fornitore";
                    tr.appendChild(th);

                    var th=document.createElement("th");
                    th.innerHTML="Nome fornitore";
                    tr.appendChild(th);

                    var th=document.createElement("th");
                    th.innerHTML="Data creazione ordine";
                    tr.appendChild(th);

                    if(permessiColonne)
                    {
                        var th=document.createElement("th");
                        th.innerHTML="Importo ordine fornitore";
                        tr.appendChild(th);
                    }
                    
                    var th=document.createElement("th");
                    th.innerHTML="Data arrivo merce prevista";
                    tr.appendChild(th);

                    var th=document.createElement("th");
                    th.setAttribute("style","text-align:center");
                    th.innerHTML="Ricevuto";
                    tr.appendChild(th);

                    var th=document.createElement("th");
                    th.setAttribute("style","text-align:center");
                    th.innerHTML="Chiuso";
                    tr.appendChild(th);

                    var th=document.createElement("th");
                    th.innerHTML="Data arrivo merce";
                    tr.appendChild(th);

                    ordiniFornitoriTable.appendChild(tr);

                    ordiniFornitori.forEach(ordineFornitore =>
                    {
                        var tr=document.createElement("tr");

                        var td=document.createElement("td");
                        td.innerHTML=ordineFornitore.ordine_fornitore;
                        tr.appendChild(td);

                        var td=document.createElement("td");
                        td.innerHTML=ordineFornitore.nome_fornitore;
                        tr.appendChild(td);

                        var td=document.createElement("td");
                        td.innerHTML=ordineFornitore.data_creazione_ordineString;
                        tr.appendChild(td);

                        if(permessiColonne)
                        {
                            var td=document.createElement("td");
                            td.innerHTML=parseFloat(ordineFornitore.importo_ordine_fornitore).toFixed(2)+"€";
                            tr.appendChild(td);
                        }

                        var td=document.createElement("td");
                        td.innerHTML=ordineFornitore.data_arrivo_merce_previstaString;
                        tr.appendChild(td);

                        var td=document.createElement("td");
                        td.setAttribute("style","text-align:center");
                        if(ordineFornitore.ricevuto=="true")
                            td.innerHTML='<i class="fad fa-check-circle" style="color:#70B085;font-size:14px"></i>';
                        else
                            td.innerHTML='<i class="fad fa-times-circle" style="color:#DA6969;font-size:14px"></i>';
                        tr.appendChild(td);

                        var td=document.createElement("td");
                        td.setAttribute("style","text-align:center");
                        if(ordineFornitore.chiuso=="true")
                            td.innerHTML='<i class="fad fa-check-circle" style="color:#70B085;font-size:14px"></i>';
                        else
                            td.innerHTML='<i class="fad fa-times-circle" style="color:#DA6969;font-size:14px"></i>';
                        tr.appendChild(td);

                        var td=document.createElement("td");
                        td.innerHTML=ordineFornitore.data_arrivo_merceString;
                        tr.appendChild(td);

                        ordiniFornitoriTable.appendChild(tr);
                    });

                    ordiniFornitoriColumn.appendChild(ordiniFornitoriTable);

                    ordiniFornitoriRow.appendChild(ordiniFornitoriColumn);

                    ordiniFornitoriOuterContainer.appendChild(ordiniFornitoriRow);
                }
                
                container.appendChild(ordiniFornitoriOuterContainer);

                //REGISTRAZIONI PRODUZIONE------------------------------------------------------------------------------

                var infoProduzione=await getInfoProduzione(ordine);

                var labelContainer=document.createElement("div");
                labelContainer.setAttribute("class","info-ordine-label-container");

                var i=document.createElement("i");
                i.setAttribute("class","fas fa-circle");
                labelContainer.appendChild(i);

                var span=document.createElement("span");
                span.innerHTML="Stato produzione dell' ordine";
                labelContainer.appendChild(span);

                container.appendChild(labelContainer);

                var produzioneOrdineOuterContainer=document.createElement("div");
                produzioneOrdineOuterContainer.setAttribute("class","info-ordine-outer-container");

                if(infoProduzione.length==0)
                {
                    var infoOrdineContainer=document.createElement("div");
                    infoOrdineContainer.setAttribute("class","info-ordine-icon-container");
                    infoOrdineContainer.setAttribute("style","color:#DA6969");
    
                    var i=document.createElement("i");
                    i.setAttribute("class","fad fa-exclamation-circle");
                    infoOrdineContainer.appendChild(i);
    
                    var span=document.createElement("span");
                    span.innerHTML="Produzione non iniziata";
                    infoOrdineContainer.appendChild(span);
    
                    produzioneOrdineOuterContainer.appendChild(infoOrdineContainer);
                }
                else
                {
                    //RIGA 1
                    var produzioneOrdineRow=document.createElement("div");
                    produzioneOrdineRow.setAttribute("class","info-ordine-row"); 
                    produzioneOrdineRow.setAttribute("style","width:100%;"); 

                    var produzioneOrdineColumn=document.createElement("div");
                    produzioneOrdineColumn.setAttribute("class","info-ordine-column"); 

                    var lavorazioni=
                    [
                        {
                            nome:"Foratura",
                            stazioni:["PTO_PTO"]
                        },
                        {
                            nome:"Verniciatura",
                            stazioni:["CAB_LAC","CAB_ACR"]
                        },
                        {
                            nome:"Montaggio",
                            stazioni:["MNT_ACA","MNT_COL","MNT_HOME","MNT_LUT","MNT_MAST"]
                        },
                        {
                            nome:"Imballaggio",
                            stazioni:["IMB_CONF"]
                        }
                    ];

                    var c=0;
                    lavorazioni.forEach(lavorazione =>
                    {
                        var produzioneOrdineColumnRow=document.createElement("div");
                        produzioneOrdineColumnRow.setAttribute("class","info-ordine-column-row"); 
                        produzioneOrdineColumnRow.setAttribute("style","");

                        var produzioneOrdineContainer=document.createElement("div");
                        produzioneOrdineContainer.setAttribute("class","info-ordine-icon-container");
                        produzioneOrdineContainer.setAttribute("style","");

                        var chiuso=false;
                        infoProduzione.forEach(rigaProduzione =>
                        {
                            if(lavorazione.nome=="Foratura")
                            {
                                if(rigaProduzione.stazione=="PTO_PTO")
                                {
                                    if(rigaProduzione.chiuso=="true")
                                        chiuso=true;
                                }
                            }
                            if(lavorazione.nome=="Verniciatura")
                            {
                                if(rigaProduzione.stazione=="CAB_LAC" || rigaProduzione.stazione=="CAB_ACR")
                                {
                                    if(rigaProduzione.chiuso=="true")
                                        chiuso=true;
                                }
                            }
                            if(lavorazione.nome=="Montaggio")
                            {
                                if(rigaProduzione.stazione=="MNT_ACA" || rigaProduzione.stazione=="MNT_COL" || rigaProduzione.stazione=="MNT_HOME" || rigaProduzione.stazione=="MNT_LUT" || rigaProduzione.stazione=="MNT_MAST")
                                {
                                    if(rigaProduzione.chiuso=="true")
                                        chiuso=true;
                                }
                            }
                            if(lavorazione.nome=="Imballaggio")
                            {
                                if(rigaProduzione.stazione=="IMB_CONF")
                                {
                                    if(rigaProduzione.chiuso=="true")
                                        chiuso=true;
                                }
                            }
                        });

                        var i=document.createElement("i");
                        if(chiuso)
                        {
                            i.setAttribute("class","fad fa-check-square");
                            i.setAttribute("style","font-size:17px;color:rgb(48, 133, 214)");
                        }
                        else
                        {
                            i.setAttribute("class","far fa-square");
                            i.setAttribute("style","font-size:17px;color:black");
                        }
                        produzioneOrdineContainer.appendChild(i);

                        var span=document.createElement("span");
                        span.setAttribute("class","dettagli-stazione-container-span");
                        if(chiuso)
                        {
                            span.setAttribute("style","font-weight:bold");
                        }
                        else
                        {
                            span.setAttribute("style","font-weight:normal");
                        }
                        span.innerHTML=lavorazione.nome;
                        produzioneOrdineContainer.appendChild(span);

                        produzioneOrdineColumnRow.appendChild(produzioneOrdineContainer);

                        produzioneOrdineColumn.appendChild(produzioneOrdineColumnRow);

                        var dettagliStazioneContainer=document.createElement("div");
                        dettagliStazioneContainer.setAttribute("class","dettagli-stazione-container"); 
                        if(c!==lavorazioni.length-1)
                            dettagliStazioneContainer.setAttribute("style","margin-bottom:10px");

                        infoProduzione.forEach(rigaProduzione =>
                        {
                            lavorazione.stazioni.forEach(stazione =>
                            {
                                if(rigaProduzione.stazione==stazione)
                                {
                                    if(rigaProduzione.chiuso=="false")
                                    {
                                        var dettagliStazioneRow=document.createElement("div");
                                        dettagliStazioneRow.setAttribute("class","dettagli-stazione-row"); 
                                        dettagliStazioneRow.setAttribute("style","");

                                        var span=document.createElement("span");
                                        span.setAttribute("class","dettagli-stazione-row-span");
                                        span.innerHTML="Aperto da "+rigaProduzione.username+" il "+rigaProduzione.dataOraString + " ("+stazione+")";
                                        dettagliStazioneRow.appendChild(span);

                                        dettagliStazioneContainer.appendChild(dettagliStazioneRow);
                                    }
                                    else
                                    {
                                        var dettagliStazioneRow=document.createElement("div");
                                        dettagliStazioneRow.setAttribute("class","dettagli-stazione-row"); 
                                        dettagliStazioneRow.setAttribute("style","");

                                        var span=document.createElement("span");
                                        span.setAttribute("class","dettagli-stazione-row-span");
                                        span.innerHTML="Chiuso da "+rigaProduzione.username+" il "+rigaProduzione.dataOraString + " ("+stazione+")";
                                        dettagliStazioneRow.appendChild(span);

                                        dettagliStazioneContainer.appendChild(dettagliStazioneRow);
                                    }
                                }
                            });
                        });

                        produzioneOrdineColumn.appendChild(dettagliStazioneContainer);

                        c++;
                    });

                    produzioneOrdineRow.appendChild(produzioneOrdineColumn);

                    produzioneOrdineOuterContainer.appendChild(produzioneOrdineRow);
                }
                
                container.appendChild(produzioneOrdineOuterContainer);

                //PICKING

                var infoPicking=await getInfoPicking(ordine);

                var labelContainer=document.createElement("div");
                labelContainer.setAttribute("class","info-ordine-label-container");

                var i=document.createElement("i");
                i.setAttribute("class","fas fa-circle");
                labelContainer.appendChild(i);

                var span=document.createElement("span");
                span.innerHTML="Stato picking dell' ordine";
                labelContainer.appendChild(span);

                container.appendChild(labelContainer);

                var pickingOrdineOuterContainer=document.createElement("div");

                if(infoPicking.length==0)
                {
                    pickingOrdineOuterContainer.setAttribute("class","info-ordine-outer-container");

                    var infoPickingContainer=document.createElement("div");
                    infoPickingContainer.setAttribute("class","info-ordine-icon-container");
                    infoPickingContainer.setAttribute("style","color:#DA6969");
    
                    var i=document.createElement("i");
                    i.setAttribute("class","fad fa-exclamation-circle");
                    infoPickingContainer.appendChild(i);
    
                    var span=document.createElement("span");
                    span.innerHTML="L' ordine non è in nessun carico";
                    infoPickingContainer.appendChild(span);
    
                    pickingOrdineOuterContainer.appendChild(infoPickingContainer);
                }
                else
                {
                    pickingOrdineOuterContainer.setAttribute("class","pick-item-outer-container");

                    var pick=infoPicking;

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
                    rowItem3.setAttribute("style","height:45px;width:430px;margin-left:20px;flex-direction:row;align-items:center;justify-content:space-evenly;box-sizing:border-box;background-color:rgb(236, 236, 236);border-radius:4px;box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);");
                    
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

                    pickingOrdineOuterContainer.appendChild(row);

                    var row=document.createElement("div");
                    row.setAttribute("class","pick-item-row");
                    row.setAttribute("style","flex-direction:row;width:100%;");

                    var rowItem=document.createElement("div");
                    rowItem.setAttribute("class","pick-item-row-item");
                    rowItem.setAttribute("style","flex-direction:row;align-items:center;height:45px;box-sizing:border-box;background-color:rgb(236, 236, 236);border-radius:4px;margin-top:20px;box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);");
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
                    row.appendChild(rowItem);

                    pickingOrdineOuterContainer.appendChild(row);
                }
                
                container.appendChild(pickingOrdineOuterContainer);

                Swal.close();
            }
        }
    }
}
function getfotoOrdine(ordine)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getfotoOrdineTrackingOrdini.php",
        {
            ordine
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
        });
    });
}
function getInfoPicking(ordine)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getInfoPickingTrackingOrdini.php",
        {
            ordine
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
        });
    });
}
function getInfoProduzione(ordine)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getInfoProduzioneTrackingOrdini.php",
        {
            ordine
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
        });
    });
}
function getOrdiniFornitori(ordine)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getOrdiniFornitoriTrackingOrdini.php",
        {
            ordine
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
        });
    });
}
function getInfoOrdine(ordine)
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getInfoOrdineTrackingOrdini.php",
        {
            ordine
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
        });
    });
}
function checkPermessiColonne()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("checkPermessiColonneReportOrdiniCliente.php",
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve(false);
                }
                else
                {
                    resolve(response=="true");
                }
            }
            else
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
                resolve(false);
            }
        });
    });
}
    var isFullscreen=false;
    var ganttProperties=
    {
        "scala":"week",
        "tema":"dhtmlxgantt.css",
        "collapsed":false
    };
    
    $(document).ready(async function()
    {
        newCircleSpinner("Caricamento in corso...");
        let promiseResponse = await getDataStatoOrdini();
        let data=promiseResponse[0];
        let links=promiseResponse[1];
        /*console.log(data);
        console.log(links);*/
        getGanttStatoOrdini(data,links);
        removeCircleSpinner();
    });
    function getGanttStatoOrdini(data,links)
    {
        gantt.config.date_format = "%Y-%m-%d";
        gantt.config.scales = [{unit: "week", step: 1, format: "%Y_%W"}];

        var filterValue = "";
        gantt.$doFilter = function(value){
            filterValue = value;
            gantt.refreshData();
        }

        gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
            if(!filterValue) return true;

            var normalizedText = task.text.toLowerCase();
            var normalizedValue = filterValue.toLowerCase();
            return normalizedText.indexOf(normalizedValue) > -1;
        });

        gantt.attachEvent("onGanttRender", function(){
            gantt.$root.querySelector("[data-text-filter]").value = filterValue;
        })

        var textFilter = "<div class='ganttStatoOrdiniSearchContainer'>Ordine/attività<i style='border-bottom:2px solid #cecece;margin-left:10px;height:15px' class='fal fa-search'></i><input placeholder='Cerca...' data-text-filter class='ganttStatoOrdiniSearchInput' type='text' oninput='gantt.$doFilter(this.value)'></div>";
        gantt.config.columns=
        [
            {name:"text",       label:textFilter,  tree:true, width:250 },
            {name:"start_date", label:"Data creazione", align: "center", width:100 },
            {name:"end_date", label:"Data consegna", align: "center", width:100 }
        ];
        
        gantt.config.readonly = true;
        gantt.init("containerGanttStatoOrdini");
        gantt.parse
        ({
            data,
            links
        });
        
    }
    function getDataStatoOrdini()
    {
        return new Promise(function (resolve, reject) 
        {
            $.get("getDataStatoOrdini.php",
            function(response, status)
            {
                if(status=="success")
                {
                    console.log(response);
                    var responseArray = JSON.parse(response);
                    var data=JSON.parse(responseArray[0]);
                    var links=JSON.parse(responseArray[1]);
                    var promiseResponse=[data,links];
                    resolve(promiseResponse);
                }
                else
                    reject({status});
            });
        });
    }
    function toggleGanttFullScreen()
    {
        if (!gantt.getState().fullscreen)
        {
            // expanding the gantt to full screen
            gantt.expand();
        }
        else
        {
            // collapsing the gantt to the normal mode
            gantt.collapse();
        }
    }
    function changeGanttTheme(percorsoTema)
    {
        ganttProperties["tema"]=percorsoTema;
        document.getElementById("ganntThemeLink").setAttribute("href","js_libraries/dhtmlxgantt/codebase/"+percorsoTema);
    }
    function changeGanttScale(scala)
    {
        //var scroll=gantt.getScrollState();
        ganttProperties["scala"]=scala;
        if(scala=="week")
        {
            gantt.config.scales = 
            [
                {unit: "week", step: 1, format: "%Y_%W"}
            ];
        }
        if(scala=="day")
        {
            gantt.config.scales = 
            [
                {unit: "day", step:1, format: "%j/%m" }
            ];
        }
        if(scala=="weekday")
        {
            gantt.config.scales = 
            [
                {unit: "week", step: 1, format: "%Y_%W"},
                {unit: "day", step:1, format: "%j/%m" }
            ];
        }
        gantt.render();
        //gantt.scrollTo(scroll.x,scroll.y);
    }
    function apriPopupDati()
    {
        var table=document.createElement("table");
        table.setAttribute("class","material-design-table-dark");
        
        //tbody
        var tbody = table.createTBody();

        /*//Ricerca ordine
        //<input type="search" class="absoluteActionBarGanttStatoOrdiniInput" id="ganttStatoOrdiniinputSearchOrdine" placeholder="Ordine..." onkeyup="checkInputSearchOrdine(this)">
        var row = tbody.insertRow(-1);

        var cell = row.insertCell(0);
        
        tbody.appendChild(row);*/

        /*//Ricerca avanzata ordine
        //<button class="absoluteActionBarGanttStatoOrdiniButton" onclick="">Ricerca avanzata ordine <i style="margin-left:5px;" class="far fa-search"></i></button>
        var row = tbody.insertRow(-1);

        var cell = row.insertCell(0);
        
        tbody.appendChild(row);*/
        
        //------------------------------------------------------------------------------------
        Swal.fire
        ({
            title: 'Dati',
            background: '#363640',
            width:"800px",
            html: table.outerHTML,
            showCloseButton: true,
            showCancelButton : true,
            cancelButtonText : "Chiudi",
            confirmButtonText: "Conferma",
            onOpen : function()
                    {
                        document.getElementsByClassName("swal2-title")[0].style.color="#ddd";
                        document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";

                        $('.swal2-confirm').first().css({
                                                            'border': 'none',
                                                            'background-color': '#3D3D47',
                                                            'box-shadow': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                                                            'color': '#ddd',
                                                            'font-size': '13px',
                                                            'margin-left': '10px',
                                                            'margin-right': '10px',
                                                            'border-radius': '3px'
                                                        });

                        $('.swal2-cancel').first().css({
                                                            'border': 'none',
                                                            'background-color': '#ddd',
                                                            'box-shadow': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                                                            'color': '#3D3D47',
                                                            'font-size': '13px',
                                                            'margin-left': '10px',
                                                            'margin-right': '10px',
                                                            'border-radius': '3px'
                                                        });
                    }
        }).then((result) => 
        {
            if (result.value)
            {
                
            }
        });
    }
    function apriPopupImpostazioni()
    {
        var table=document.createElement("table");
        table.setAttribute("class","material-design-table-dark");

        //thead
        var thead = table.createTHead();

        var row = thead.insertRow(0); 

        var cell1= document.createElement("th");
        var cell2 = document.createElement("th");

        cell1.innerHTML = "Proprietà";
        cell1.setAttribute("class","proprieta-grafico-table-border-right");
        cell2.innerHTML = "Valore";

        row.appendChild(cell1);
        row.appendChild(cell2);

        //tbody
        var tbody = table.createTBody();

        //Scala tempo
        var row = tbody.insertRow(-1);

        var cell1 = row.insertCell(0);
        cell1.setAttribute("class","proprieta-grafico-table-border-right");
        var cell2 = row.insertCell(1);
        cell2.setAttribute("style","padding-top:0px;padding-bottom:0px");

        cell1.innerHTML = "Scala tempo";

        var selectScalaTempo=document.createElement("select");
        selectScalaTempo.setAttribute("onchange","changeGanttScale(this.value)");
        selectScalaTempo.setAttribute("style","width:150px;");

        var option=document.createElement("option");
        option.setAttribute("value","week");
        option.innerHTML="Settimane";
        option.setAttribute("style","background-color: #3D3D47;");
        if(ganttProperties["scala"]=="week")
            option.setAttribute("selected","selected");
        selectScalaTempo.appendChild(option);
        

        var option=document.createElement("option");
        option.setAttribute("value","day");
        option.innerHTML="Giorni";
        option.setAttribute("style","background-color: #3D3D47;");
        if(ganttProperties["scala"]=="day")
            option.setAttribute("selected","selected");
        selectScalaTempo.appendChild(option);

        var option=document.createElement("option");
        option.setAttribute("value","weekday");
        option.innerHTML="Giorni e settimane";
        option.setAttribute("style","background-color: #3D3D47;");
        if(ganttProperties["scala"]=="weekday")
            option.setAttribute("selected","selected");
        selectScalaTempo.appendChild(option);

        cell2.appendChild(selectScalaTempo);
        
        //------------------------------------------------------------------------------------
        Swal.fire
        ({
            title: 'Impostazioni',
            background: '#363640',
            width:"800px",
            html: table.outerHTML,
            showCloseButton: true,
            showCancelButton : true,
            cancelButtonText : "Chiudi",
            confirmButtonText: "Conferma",
            onOpen : function()
                    {
                        document.getElementsByClassName("swal2-title")[0].style.color="#ddd";
                        document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";

                        $('.swal2-confirm').first().css({
                                                            'border': 'none',
                                                            'background-color': '#3D3D47',
                                                            'box-shadow': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                                                            'color': '#ddd',
                                                            'font-size': '13px',
                                                            'margin-left': '10px',
                                                            'margin-right': '10px',
                                                            'border-radius': '3px'
                                                        });

                        $('.swal2-cancel').first().css({
                                                            'border': 'none',
                                                            'background-color': '#ddd',
                                                            'box-shadow': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                                                            'color': '#3D3D47',
                                                            'font-size': '13px',
                                                            'margin-left': '10px',
                                                            'margin-right': '10px',
                                                            'border-radius': '3px'
                                                        });
                    }
        }).then((result) => 
        {
            if (result.value)
            {
                
            }
        });
    }
    function apriPopupVisualizzazione()
    {
        var table=document.createElement("table");
        table.setAttribute("class","material-design-table-dark");

        //thead
        var thead = table.createTHead();

        var row = thead.insertRow(0); 

        var cell1= document.createElement("th");
        var cell2 = document.createElement("th");

        cell1.innerHTML = "Proprietà";
        cell1.setAttribute("class","proprieta-grafico-table-border-right");
        cell2.innerHTML = "Valore";

        row.appendChild(cell1);
        row.appendChild(cell2);

        //tbody
        var tbody = table.createTBody();

        //Tema
        var row = tbody.insertRow(-1);

        var cell1 = row.insertCell(0);
        cell1.setAttribute("class","proprieta-grafico-table-border-right");
        var cell2 = row.insertCell(1);
        cell2.setAttribute("style","padding-top:0px;padding-bottom:0px");

        cell1.innerHTML = "Tema";

        var selectScalaTempo=document.createElement("select");
        selectScalaTempo.setAttribute("onchange","changeGanttTheme(this.value)");
        selectScalaTempo.setAttribute("style","width:150px;");

        var option=document.createElement("option");
        option.setAttribute("value","dhtmlxgantt.css");
        option.innerHTML="Default";
        option.setAttribute("style","background-color: #3D3D47;");
        if(ganttProperties["tema"]=="dhtmlxgantt.css")
            option.setAttribute("selected","selected");
        selectScalaTempo.appendChild(option);

        var option=document.createElement("option");
        option.setAttribute("value","skins/dhtmlxgantt_material.css");
        option.innerHTML="Material";
        option.setAttribute("style","background-color: #3D3D47;");
        if(ganttProperties["tema"]=="skins/dhtmlxgantt_material.css")
            option.setAttribute("selected","selected");
        selectScalaTempo.appendChild(option);

        var option=document.createElement("option");
        option.setAttribute("value","skins/dhtmlxgantt_skyblue.css");
        option.innerHTML="Skyblue";
        option.setAttribute("style","background-color: #3D3D47;");
        if(ganttProperties["tema"]=="skins/dhtmlxgantt_skyblue.css")
            option.setAttribute("selected","selected");
        selectScalaTempo.appendChild(option);

        var option=document.createElement("option");
        option.setAttribute("value","skins/dhtmlxgantt_meadow.css");
        option.innerHTML="Meadow";
        option.setAttribute("style","background-color: #3D3D47;");
        if(ganttProperties["tema"]=="skins/dhtmlxgantt_meadow.css")
            option.setAttribute("selected","selected");
        selectScalaTempo.appendChild(option);

        var option=document.createElement("option");
        option.setAttribute("value","skins/dhtmlxgantt_broadway.css");
        option.innerHTML="Broadway";
        option.setAttribute("style","background-color: #3D3D47;");
        if(ganttProperties["tema"]=="skins/dhtmlxgantt_broadway.css")
            option.setAttribute("selected","selected");
        selectScalaTempo.appendChild(option);

        var option=document.createElement("option");
        option.setAttribute("value","skins/dhtmlxgantt_contrast_black.css");
        option.innerHTML="Contrast Black";
        option.setAttribute("style","background-color: #3D3D47;");
        if(ganttProperties["tema"]=="skins/dhtmlxgantt_contrast_black.css")
            option.setAttribute("selected","selected");
        selectScalaTempo.appendChild(option);

        var option=document.createElement("option");
        option.setAttribute("value","skins/dhtmlxgantt_contrast_white.css");
        if(ganttProperties["tema"]=="skins/dhtmlxgantt_contrast_white.css")
            option.setAttribute("selected","selected");
        option.innerHTML="Contrast White";
        option.setAttribute("style","background-color: #3D3D47;");
        selectScalaTempo.appendChild(option);

        cell2.appendChild(selectScalaTempo);

        //Bottone scermo intero
        
        //------------------------------------------------------------------------------------
        Swal.fire
        ({
            title: 'Visualizzazione',
            background: '#363640',
            width:"800px",
            html: table.outerHTML,
            showCloseButton: true,
            showCancelButton : true,
            cancelButtonText : "Chiudi",
            confirmButtonText: "Conferma",
            onOpen : function()
                    {
                        document.getElementsByClassName("swal2-title")[0].style.color="#ddd";
                        document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";

                        $('.swal2-confirm').first().css({
                                                            'border': 'none',
                                                            'background-color': '#3D3D47',
                                                            'box-shadow': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                                                            'color': '#ddd',
                                                            'font-size': '13px',
                                                            'margin-left': '10px',
                                                            'margin-right': '10px',
                                                            'border-radius': '3px'
                                                        });

                        $('.swal2-cancel').first().css({
                                                            'border': 'none',
                                                            'background-color': '#ddd',
                                                            'box-shadow': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                                                            'color': '#3D3D47',
                                                            'font-size': '13px',
                                                            'margin-left': '10px',
                                                            'margin-right': '10px',
                                                            'border-radius': '3px'
                                                        });
                    }
        }).then((result) => 
        {
            if (result.value)
            {
                
            }
        });
    }
    window.addEventListener("keydown", windowKeydown, false);
    function windowKeydown(e)
    {
        var keyCode = e.keyCode;
        switch(keyCode) 
        {
            
        }
    }
    document.addEventListener("fullscreenchange", function()
    {
        isFullscreen=!isFullscreen;
        var icon=document.getElementById("ganttStatoOrdiniFullscreenIcon");
        if(isFullscreen)
        {
            $(icon).removeClass();
            $(icon).addClass("fal fa-window-restore");
            $(icon).parent().attr("title","Riduci");

            $("#shadowContainerGanttStatoOrdini").css({"left": "0", "right": "0","top": "0","bottom": "0","z-index":"998"});
            /*$("#absoluteActionBarGanttStatoOrdini").css({"left": "0", "right": "0","top": "0","z-index":"999"});
            $("#containerGanttStatoOrdini").css({"left": "0", "right": "0","top": "30", "bottom": "0","z-index":"999"});*/
        }
        else
        {
            $(icon).removeClass();
            $(icon).addClass("fal fa-window-maximize");
            $(icon).parent().attr("title","Schermo intero");

            $("#shadowContainerGanttStatoOrdini").css({"left": "", "right": "","top": "","bottom": "","z-index":"998"});
            /*$("#absoluteActionBarGanttStatoOrdini").css({"left": "", "right": "","top": "","z-index":""});
            $("#containerGanttStatoOrdini").css({"left": "", "right": "","top": "", "bottom": "","z-index":""});*/
        }
    });
    function toggleGanttCollapse(icon)
    {
        if(!ganttProperties["collapsed"])
        {
            gantt.eachTask(function(task){
                task.$open = false;
            });
            gantt.render();
            $(icon).removeClass();
            $(icon).addClass("fal fa-object-ungroup");
            $(icon).parent().attr("title","Esplodi tutti");
            ganttProperties["collapsed"]=true;
        }
        else
        {
            gantt.eachTask(function(task){
                task.$open = true;
            });
            gantt.render();
            $(icon).removeClass();
            $(icon).addClass("fal fa-object-group");
            $(icon).parent().attr("title","Collassa tutti");
            ganttProperties["collapsed"]=false;
        }
    }
    async function getIntro()
    {
        if(await getCookie("into1GanttStatoOrdini")!="true")
            introJs().setOption('showProgress', true).oncomplete(function() {setCookie("into1GanttStatoOrdini","true")}).onexit(function() {setCookie("into1GanttStatoOrdini","true")}).start();
    }
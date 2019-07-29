    function resetStyle(button)
    {
        var all = document.getElementsByClassName("functionListButton");
        for (var i = 0; i < all.length; i++) 
        {
            all[i].classList.remove("functionListButtonActive");
        }
        button.classList.add("functionListButtonActive");
    }
    function editableTableLoad()
    {
        
    }
    function getTable(table,orderBy,orderType)
    {
        if(table=="report_ufficio_commerciale_user_view")
        {
            getEditableTable
            ({
                table:'report_ufficio_commerciale_user_view',
                primaryKey: "id_report_ufficio_vendite",
                editable: false,
                container:'containerSommarioArchivi',
                noFilterColumns:['data_scadenza','data_creazione','note','data_salvataggio'],
                orderBy:orderBy,
                orderType:orderType
            });
        }
        if(table=="report_ufficio_commerciale_manager_view")
        {
            getEditableTable
            ({
                table:'report_ufficio_commerciale_manager_view',
                primaryKey: "id_report_ufficio_vendite",
                editable: false,
                container:'containerSommarioArchivi',
                noFilterColumns:['data_scadenza','data_creazione','note','data_salvataggio'],
                orderBy:orderBy,
                orderType:orderType
            });
        }
    }
    function getSommariUtenti()
    {
        $.get("getSommariUtenti.php",
        function(response, status)
        {
            if(status=="success")
            {
                if(response.indexOf("error")>-1 || response.indexOf("notice")>-1 || response.indexOf("warning")>-1)
                {
                    Swal.fire
                    ({
                        type: 'error',
                        title: 'Errore',
                        text: "Se il problema persiste contatta l' amministratore"
                    });
                    console.log(response);
                }
                else
                {
                    var sommari_archivi_utenti = JSON.parse(response);
                    sommari_archivi_utenti.forEach(function(sommario)
                    {
                        var button=document.createElement("button");
                        button.setAttribute("class","functionListButton");
                        button.setAttribute("onclick","resetStyle(this);getTable('"+sommario.sommario+"')");
                        button.innerHTML=sommario.nomeSommario;

                        $('.functionList').append(button);
                    });
                }
            }
            else
                console.log(status);
        });
    }
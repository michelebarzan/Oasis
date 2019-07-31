$(document).ready(async function()
{
    let data = await getDataStatoOrdini();
    getGanttStatoOrdini(data);
});
function getGanttStatoOrdini(data)
{
    console.log(data);
    gantt.config.date_format = "%Y-%m-%d";
    /*gantt.config.scales = [
        {unit: "week", step: 1, format: "%Y_%W"},
        {unit: "day", step:1, format: "%j/%m" }
    ];*/
    gantt.config.scales = [
        {unit: "week", step: 1, format: "%Y_%W"}
    ];
    gantt.init("containerGanttStatoOrdini");
    gantt.parse({
        data,
    });
    
}
function checkInputSearchOrdine(input)
{
    if(input.value.lenght==8)
        var ordine=input.value;
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
                //console.log(response);
                var data = JSON.parse(response);
                resolve(data);
            }
            else
                reject({status});
        });
    });1
}
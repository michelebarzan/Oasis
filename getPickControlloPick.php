<?php
	include "session.php";
	include "connessione.php";
		
	set_time_limit(240);
	
	$stato=$_REQUEST['stato'];
	$settimana=$_REQUEST['settimana'];
	$stato_righe=$_REQUEST['stato_righe'];

    $picks=[];
	
	$queryPickChiusi="SELECT dbo.statoPick.N_Pick, dbo.statoPick.DescrPick, dbo.statoPick.settimana, dbo.statoPick.stato, dbo.statoPick.stato_righe, dbo.T_Picking_01.docNum, dbo.T_Picking_01.controllato
                    FROM dbo.statoPick INNER JOIN dbo.T_Picking_01 ON dbo.statoPick.N_Pick = dbo.T_Picking_01.n_Pick
                    WHERE stato='$stato' AND stato_righe='$stato_righe' AND settimana LIKE '%$settimana%'
                    ORDER BY dbo.statoPick.N_Pick DESC";
	$resultPickChiusi=sqlsrv_query($conn,$queryPickChiusi);
	if($resultPickChiusi==FALSE)
	{
		die("error");
	}
	else
	{
		while($rowPickChiusi=sqlsrv_fetch_array($resultPickChiusi))
		{
			$pick_line['N_Pick']=$rowPickChiusi['N_Pick'];
            $pick_line['DescrPick']=$rowPickChiusi['DescrPick'];
            $pick_line['settimana']=$rowPickChiusi['settimana'];
            $pick_line['stato']=$rowPickChiusi['stato'];
            $pick_line['stato_righe']=$rowPickChiusi['stato_righe'];
            $pick_line['docNum']=$rowPickChiusi['docNum'];
            $pick_line['controllato']=$rowPickChiusi['controllato'];

            array_push($picks,$pick_line);
		}

        echo json_encode($picks);
	}
?>
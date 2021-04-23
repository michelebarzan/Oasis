<?php

    include "Session.php";
    include "connessione.php";

    $n_pick=$_REQUEST["n_pick"];

    //----------------------------------------------------------------------------------------------------------------------------
    $q="SELECT * FROM T_Picking_01 WHERE n_Pick='$n_pick'";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		die("error1");
	}
	else
	{
		$rows = sqlsrv_has_rows( $r );
		if ($rows === FALSE)
		{
			$qInsert="INSERT INTO T_Picking_01 (descrPick,n_Pick,docNum,lineNum,itemCode,dscription,quantity,onHand,prcrmntMtd,volume,pesoLordo,pesoNetto,descriptionLang,codiceDoganale,DocEntry,DataConsegna,DataPick,Misure,descrizione_codice_doganale,cliente,controllato,barcode,k1Parcel,k1ParcelProgr,stampato,dataImportazionePick,[PicklistNum],[PicklistLine],[OrderEntry],[K1OrderType],[OrderNum],[U_SIGEA_K1BaseLine]) SELECT DescrPick,N_Pick,DocNum,N_Riga,ItemCode,Dscription,'1',ISNULL (QtaMagazzino,0),ISNULL ([Acq/Prod],' '),ISNULL (Volume,0),ISNULL([PESO-LORDO],0),ISNULL([PESO-NETTO],0),ISNULL(U_SIGEA_CustLangDesc,Dscription),codiceDoganale,DocEntry,DataConsegna,DataPick,Misure,descrizione_codice_doganale,CardName,'false',barcode,k1Parcel,k1ParcelProgr,'false','".date('m/d/Y h:i:s', time())."',[PicklistNum],[PicklistLine],[OrderEntry],[K1OrderType],[OrderNum],[U_SIGEA_K1BaseLine] FROM Q_Picking_04 WHERE N_Pick='$n_pick'";
			$rInsert=sqlsrv_query($conn,$qInsert);
			if($rInsert==FALSE)
			{
				die("error2");
			}
		}
		else
		{
			$qRigheT="SELECT COUNT (*) AS righeT FROM T_Picking_01 WHERE N_Pick='$n_pick'";
			$rRigheT=sqlsrv_query($conn,$qRigheT);
			if($rRigheT==FALSE)
			{
				die("error3");
			}
			else
			{
				while($rowRigheT=sqlsrv_fetch_array($rRigheT))
				{
					$righeT=$rowRigheT['righeT'];
				}
			}
			$qRigheQ="SELECT COUNT (*) AS righeQ FROM Q_Picking_04 WHERE N_Pick='$n_pick'";
			$rRigheQ=sqlsrv_query($conn,$qRigheQ);
			if($rRigheQ==FALSE)
			{
				die("error4");
			}
			else
			{
				while($rowRigheQ=sqlsrv_fetch_array($rRigheQ))
				{
					$righeQ=$rowRigheQ['righeQ'];
				}
			}
			if($righeQ!=$righeT)
			{
				$qInsert2="INSERT INTO T_Picking_01 (descrPick,n_Pick,docNum,lineNum,itemCode,dscription,quantity,onHand,prcrmntMtd,volume,pesoLordo,pesoNetto,descriptionLang,codiceDoganale,DocEntry,DataConsegna,DataPick,Misure,descrizione_codice_doganale,cliente,controllato,barcode,k1Parcel,k1ParcelProgr,stampato) SELECT        dbo.Q_Picking_04.DescrPick, dbo.Q_Picking_04.N_Pick, dbo.Q_Picking_04.DocNum, dbo.Q_Picking_04.N_Riga, dbo.Q_Picking_04.ItemCode, 
                         dbo.Q_Picking_04.Dscription, '1' AS Expr1, ISNULL(dbo.Q_Picking_04.QtaMagazzino, 0) AS Expr2, ISNULL(dbo.Q_Picking_04.[Acq/Prod], ' ') AS Expr3, 
                         ISNULL(dbo.Q_Picking_04.VOLUME, 0) AS Expr4, ISNULL(dbo.Q_Picking_04.[PESO-LORDO], 0) AS Expr5, ISNULL(dbo.Q_Picking_04.[PESO-NETTO], 0) 
                         AS Expr6, ISNULL(dbo.Q_Picking_04.U_SIGEA_CustLangDesc, dbo.Q_Picking_04.Dscription) AS Expr7, dbo.Q_Picking_04.codiceDoganale, 
                         dbo.Q_Picking_04.DocEntry, dbo.Q_Picking_04.DataConsegna, dbo.Q_Picking_04.DataPick, dbo.Q_Picking_04.Misure, 
                         dbo.Q_Picking_04.descrizione_codice_doganale, dbo.Q_Picking_04.CardName, 'false' AS Expr8 ,dbo.Q_Picking_04.barcode,dbo.Q_Picking_04.k1Parcel,dbo.Q_Picking_04.k1ParcelProgr,'false' AS stampato
							FROM            dbo.Q_Picking_04 LEFT OUTER JOIN
													 dbo.colli_eliminati ON dbo.Q_Picking_04.DocNum = dbo.colli_eliminati.docNum AND dbo.Q_Picking_04.N_Riga = dbo.colli_eliminati.lineNum AND 
													 dbo.Q_Picking_04.N_Pick = dbo.colli_eliminati.n_Pick LEFT OUTER JOIN
													 dbo.T_Picking_01 ON dbo.Q_Picking_04.N_Pick = dbo.T_Picking_01.n_Pick AND dbo.Q_Picking_04.DocNum = dbo.T_Picking_01.docNum AND 
													 dbo.Q_Picking_04.N_Riga = dbo.T_Picking_01.lineNum
							WHERE        (dbo.Q_Picking_04.N_Pick = '$n_pick') AND (dbo.T_Picking_01.id_picking IS NULL) AND (dbo.colli_eliminati.id_colli_eliminati IS NULL)";
				$rInsert2=sqlsrv_query($conn,$qInsert2);
				if($rInsert2==FALSE)
				{
					die("error5");
				}
			}
		}
	}	
    //----------------------------------------------------------------------------------------------------------------------------

    $columns=[];
    $colHeaders=[];

    $bancali=[];
    $q4="SELECT * FROM bancali WHERE n_Pick='$n_pick'";
    $r4=sqlsrv_query($conn,$q4);
    if($r4==FALSE)
    {
        die("error".$q4);
    }
    else
    {
        while($row4=sqlsrv_fetch_array($r4))
        {
            array_push($bancali,$row4["nome"]);
        }
        array_push($bancali,"Nessuno");
        array_push($bancali,"Nuovo bancale");
    }

    $q2="SELECT COLUMN_NAME, CASE WHEN DATA_TYPE = 'varchar' THEN 'text' ELSE 'numeric' END AS type
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE (TABLE_NAME = N'view_compila_checklist') AND COLUMN_NAME<>'n_Pick'";
    $r2=sqlsrv_query($conn,$q2);
    if($r2==FALSE)
    {
        die("error".$q2);
    }
    else
    {
        while($row2=sqlsrv_fetch_array($r2))
        {
            array_push($colHeaders,$row2["COLUMN_NAME"]);

            $column["data"]=$row2["COLUMN_NAME"];
            switch ($row2["COLUMN_NAME"])
            {
                case 'gruppo':
                    $column["readOnly"]=false;
                    $column["type"]=$row2["type"];
                break;
                case "bancale":
                    $column["type"]="dropdown";
                    $column["source"]=$bancali;
                    $column["readOnly"]=false;
                break;
                default:
                    $column["readOnly"]=true;
                    $column["type"]=$row2["type"];
                break;
            }
            array_push($columns,$column);
        }
    }

    $data=[];

    $q3="SELECT * FROM [view_compila_checklist] WHERE n_Pick='$n_pick'";
    $r3=sqlsrv_query($conn,$q3);
    if($r3==FALSE)
    {
        die("error".$q3);
    }
    else
    {
        while($row3=sqlsrv_fetch_array($r3))
        {
            $rowObj=[];
            foreach ($colHeaders as $column)
            {
                if($column=="itemCode" || $column=="descrizione")
                    $rowObj[$column]=utf8_encode($row3[$column]);
                else
                    $rowObj[$column]=$row3[$column];
            }
            array_push($data,$rowObj);
        }
    }

    $arrayResponse["q3"]=$q3;
    $arrayResponse["columns"]=$columns;
    $arrayResponse["colHeaders"]=$colHeaders;
    $arrayResponse["data"]=$data;
    $arrayResponse["primaryKey"]="id_picking";

    echo json_encode($arrayResponse);

?>
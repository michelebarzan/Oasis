<?php
	include "connessione.php";
	include "Session.php";

	if(set_time_limit(240))
	{
		svuotaMontaggioTemp($conn);
		svuotaMontaggio($conn);
		riempiMontaggioTemp($conn);
		riempiMontaggio($conn);
		echo "ok";
	}
	else
		echo "<b style='color:red'>Errore di sistema: </b>Contattare l' amministratore";
	
	
	
	function svuotaMontaggio($conn)
	{
		$query="DELETE storico_montaggi FROM storico_montaggi";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
	function riempiMontaggioTemp($conn)
	{
		$query="INSERT INTO storico_montaggi_temp([settimana],[stazione],[totale_pezzi],[basi_portalavabo],[altro],[colonne],[pensili],[basi_accostabili]) SELECT * FROM Q_st_carico_montaggi";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
	function svuotaMontaggioTemp($conn)
	{
		$query="DELETE storico_montaggi_temp FROM storico_montaggi_temp";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
	function riempiMontaggio($conn)
	{
		$query="INSERT INTO storico_montaggi([settimana],[stazione],[totale_pezzi],[basi_portalavabo],[basi_accostabili],[colonne],[pensili],[altro],[nOrdini]) SELECT [settimana],[stazione],[totale_pezzi],[basi_portalavabo],[basi_accostabili],[colonne],[pensili],[altro],dbo.Q_st_carico_montaggio_n_ordini.nOrdini FROM dbo.storico_montaggi_temp INNER JOIN dbo.Q_st_carico_montaggio_n_ordini ON dbo.storico_montaggi_temp.stazione = dbo.Q_st_carico_montaggio_n_ordini.APLATZ_ID AND  dbo.storico_montaggi_temp.settimana = dbo.Q_st_carico_montaggio_n_ordini.Di_mon";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
?>
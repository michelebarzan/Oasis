<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Ticket Assistenza";
?>
<html>
	<head>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<link rel="stylesheet" href="fontawesomepro/css/fontawesomepro.css" />
		<title><?php echo $pageName; ?></title>
			<link rel="stylesheet" href="css/styleV28.css" />
			<script src="struttura.js"></script>
			<style>
				@import url(http://fonts.googleapis.com/css?family=Exo:100,200,400);
				@import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:700,400,300);
				
				/* width */
				::-webkit-scrollbar {
					width: 10px;
				}

				/* Track */
				::-webkit-scrollbar-track {
					background: #f1f1f1; 
				}
				 
				/* Handle */
				::-webkit-scrollbar-thumb {
					background: #888; 
				}

				/* Handle on hover */
				::-webkit-scrollbar-thumb:hover {
					background: #555; 
				}
			</style>
			<script>
				function getPopup(titolo,descrizione)
				{
					document.getElementById("popup").style.display="inline-block";
					document.getElementById("titoloPopupTutorialTicket").innerHTML=titolo;
					document.getElementById("descrizionePopupTutorialTicket").innerHTML=descrizione;
				}
				function chiudiPopup()
				{
					document.getElementById("popup").style.display="none";
				}
				function resetStyle()
				{
					var all=document.getElementsByClassName("menuListButtonActive");
					for (var i = 0; i < all.length; i++) 
					{
						all[i].className="menuListButton";
					}
				}
				function ticketAperti()
				{
					getPopup('Ticket aperti<i class="fal fa-window-close" style="float:right;font-size:150%;cursor:pointer" onclick="chiudiPopup()"></i>','Dalla schermata "Ticket aperti" puoi:<ul style="margin:0px 0px;padding:0px 20px"><li>Consultare i ticket aperti da te o da altri utenti</li><li>Partecipare ad un ticket cliccando il bottone [Partecipa]</li><li>Leggere eventuali soluzioni al problema dal campo [Note assistenza]</li></ul><br>Un ticket può avere 4 stati: <ul style="margin:0px 0px;padding:0px 20px"><li>Aperto</li><li>Visualizzato</li><li>Preso in carico</li><li>Chiuso</li>');
					
					document.getElementById("btnTicketAperti").classList.remove("menuListButton");
					document.getElementById("btnTicketAperti").className="menuListButtonActive";
					document.getElementById("ticketAssistenzaContainer").innerHTML ="";
					
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							document.getElementById("ticketAssistenzaContainer").innerHTML =this.responseText;
						}
					};
					xmlhttp.open("POST", "ticketAperti.php?", true);
					xmlhttp.send();
				}
				function ticketChiusi()
				{
					getPopup('Ticket chiusi<i class="fal fa-window-close" style="float:right;font-size:150%;cursor:pointer" onclick="chiudiPopup()"></i>','Dalla schermata "Ticket chiusi" puoi:<ul style="margin:0px 0px;padding:0px 20px"><li>Consultare i ticket chiusi</li><li>Consultare la data e l ora della chiusura ed eventualmente la descrizione della soluzione al problema</li></ul>');
					
					document.getElementById("btnTicketChiusi").classList.remove("menuListButton");
					document.getElementById("btnTicketChiusi").className="menuListButtonActive";
					document.getElementById("ticketAssistenzaContainer").innerHTML ="";
					
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							document.getElementById("ticketAssistenzaContainer").innerHTML =this.responseText;
						}
					};
					xmlhttp.open("POST", "ticketChiusi.php?", true);
					xmlhttp.send();
				}
				function ticketUtente()
				{
					getPopup('I tuoi ticket<i class="fal fa-window-close" style="float:right;font-size:150%;cursor:pointer" onclick="chiudiPopup()"></i>','Dalla schermata "I tuoi ticket" puoi:<ul style="margin:0px 0px;padding:0px 20px"><li>Consultare i ticket che hai aperto</li><li>Modificare titolo, descrizione e note</li><li>Eliminare un ticket</li></ul>');
					
					document.getElementById("btnTicketUtente").classList.remove("menuListButton");
					document.getElementById("btnTicketUtente").className="menuListButtonActive";
					document.getElementById("ticketAssistenzaContainer").innerHTML ="";
					
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							document.getElementById("ticketAssistenzaContainer").innerHTML =this.responseText;
						}
					};
					xmlhttp.open("POST", "ticketUtente.php?", true);
					xmlhttp.send();
				}
				function nuovoTicket()
				{
					getPopup('Nuovo ticket<i class="fal fa-window-close" style="float:right;font-size:150%;cursor:pointer" onclick="chiudiPopup()"></i>','Dalla schermata "Nuovo ticket" puoi creare un nuovo ticket indicando almeno titolo e descrizione.<br><b>Nota:</b> prima di creare un nuovo ticket accertati che non ci siano altri ticket aperti riguardanti il tuo stesso problema. La duplicazione di un ticket rallenta la procedura di assistenza e genera confusione. Se hai bisogno di assistenza per un problema gia citato in un ticket aperto, puoi cliccare il pulsante [Partecipa] nella schermata "Ticket aperti", per comunicare che anche tu riscontri lo stesso problema.<br>Ticket duplicati saranno chiusi forzatamente o ignorati.');
					
					document.getElementById("btnNuovoTicket").classList.remove("menuListButton");
					document.getElementById("btnNuovoTicket").className="menuListButtonActive";
					document.getElementById("ticketAssistenzaContainer").innerHTML ="";
					
					var titolo = document.createElement("input");
					titolo.setAttribute("type", "text");
					titolo.setAttribute("id", "titoloTicket");
					titolo.setAttribute("class", "inputNuovoTicket");
					titolo.setAttribute("maxlength", "50");
					
					var titoloLabel=document.createElement("div");
					titoloLabel.setAttribute("class", "inputLabelTicket");
					titoloLabel.innerHTML="Titolo";
					
					var titoloContainer=document.createElement("div");
					titoloContainer.setAttribute("class", "inputContainerTicket");
					titoloContainer.appendChild(titoloLabel);
					titoloContainer.appendChild(titolo);
					
					var descrizione = document.createElement("textarea");
					descrizione.setAttribute("id", "descrizioneTicket");
					descrizione.setAttribute("class", "textareaNuovoTicket");
					descrizione.setAttribute("maxlength", "200");
					
					var descrizioneLabel=document.createElement("div");
					descrizioneLabel.setAttribute("class", "inputLabelTicket");
					descrizioneLabel.innerHTML="Descrizione";
					
					var descrizioneContainer=document.createElement("div");
					descrizioneContainer.setAttribute("class", "inputContainerTicket");
					descrizioneContainer.appendChild(descrizioneLabel);
					descrizioneContainer.appendChild(descrizione);
					
					var note = document.createElement("textarea");
					note.setAttribute("id", "noteTicket");
					note.setAttribute("class", "textareaNuovoTicket");
					note.setAttribute("maxlength", "200");
					
					var noteLabel=document.createElement("div");
					noteLabel.setAttribute("class", "inputLabelTicket");
					noteLabel.innerHTML="Note";
					
					var noteContainer=document.createElement("div");
					noteContainer.setAttribute("class", "inputContainerTicket");
					noteContainer.appendChild(noteLabel);
					noteContainer.appendChild(note);
					
					var bottoneInserisci=document.createElement("button");
					bottoneInserisci.setAttribute("class", "bottoneInserisciTicket");
					bottoneInserisci.setAttribute("onclick", "inserisciTicket()");
					bottoneInserisci.innerHTML='Inserisci ticket<i class="far fa-plus" style="font-size:100%;margin-left:15px"></i>';
					
					var bottoneContainer=document.createElement("div");
					noteContainer.setAttribute("class", "inputContainerTicket");
					noteContainer.appendChild(bottoneInserisci);
					
					document.getElementById("ticketAssistenzaContainer").appendChild(titoloContainer);
					document.getElementById("ticketAssistenzaContainer").appendChild(descrizioneContainer);
					document.getElementById("ticketAssistenzaContainer").appendChild(noteContainer);
					document.getElementById("ticketAssistenzaContainer").appendChild(bottoneContainer);
					
					/*var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							document.getElementById("ticketAssistenzaContainer").innerHTML =this.responseText;
						}
					};
					xmlhttp.open("POST", "nuovoTicket.php?", true);
					xmlhttp.send();*/
				}
				function inserisciTicket()
				{
					if(confirm('Confermi di aver controllato che non sia stato aperto un ticket uguale al tuo?\nPuoi partacipare ad un ticket aperto cliccando il pulsante [Partecipa] nella sezione "Ticket aperti"\n[Ok] Inserisci il ticket\n[Annulla] Ricontrolla'))
					{
						var titolo=document.getElementById("titoloTicket").value;
						var descrizione=document.getElementById("descrizioneTicket").value;
						var note=document.getElementById("noteTicket").value;
						if(titolo=='' || descrizione=='')
						{
							window.alert("I campi titolo e descrizione sono obbligatori");
						}
						else
						{
							var xmlhttp = new XMLHttpRequest();
							xmlhttp.onreadystatechange = function() 
							{
								if (this.readyState == 4 && this.status == 200) 
								{
									if(this.responseText=="ok")
									{
										resetStyle();ticketAperti();
									}
									else
									{
										window.alert("Errore. Se il problema persiste contattare l' amministratore");
										console.log(this.responseText);
									}
								}
							};
							xmlhttp.open("POST", "inserisciTicket.php?titolo="+titolo+"&descrizione="+descrizione+"&note="+note, true);
							xmlhttp.send();
						}
					}
				}
				function updateTicket(colonna,valore,id_ticket)
				{
					document.getElementById("risultato"+id_ticket).innerHTML='';
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							if(this.responseText=="ok")
								document.getElementById("risultato"+id_ticket).innerHTML='<i class="far fa-check" style="color:green"></i>';
							else
								document.getElementById("risultato"+id_ticket).innerHTML='<i class="far fa-exclamation" style="color:red" title="'+this.responseText+'"></i>';
						}
					};
					xmlhttp.open("POST", "updateTicket.php?colonna="+colonna+"&valore="+valore+"&id_ticket="+id_ticket, true);
					xmlhttp.send();
				}
				function sortTable(index) 
				{
					var table, rows, switching, i, x, y, shouldSwitch;
					table = document.getElementById("myTableElencoTicket");
					switching = true;
					/* Make a loop that will continue until
					no switching has been done: */
					while (switching) 
					{
						// Start by saying: no switching is done:
						switching = false;
						rows = table.rows;
						/* Loop through all table rows (except the
						first, which contains table headers): */
						for (i = 1; i < (rows.length - 1); i++) 
						{
							// Start by saying there should be no switching:
							shouldSwitch = false;
							/* Get the two elements you want to compare,
							one from current row and one from the next: */
							x = rows[i].getElementsByTagName("TD")[index];
							y = rows[i + 1].getElementsByTagName("TD")[index];
							// Check if the two rows should switch place:
							if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) 
							{
								// If so, mark as a switch and break the loop:
								shouldSwitch = true;
								break;
							}
						}
						if (shouldSwitch) 
						{
							/* If a switch has been marked, make the switch
							and mark that a switch has been done: */
							rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
							switching = true;
						}
					}
				}
				function aggiungiPartecipante(id_ticket,username)
				{
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							if(this.responseText=="ok")
								ticketAperti();
							else
								window.alert(this.responseText);
						}
					};
					xmlhttp.open("POST", "aggiungiPartecipante.php?id_ticket="+id_ticket+"&username="+username, true);
					xmlhttp.send();
				}
				function eliminaTicket(id_ticket)
				{
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							if(this.responseText=="ok")
								ticketUtente();
							else
								window.alert(this.responseText);
						}
					};
					xmlhttp.open("POST", "eliminaTicket.php?id_ticket="+id_ticket, true);
					xmlhttp.send();
				}
			</script>
	</head>
	<body onload="ticketAperti()">
		<?php include('struttura.php'); ?>
		<div id="popup" style="display:none">
			<b><u id="titoloPopupTutorialTicket"></u></b><br><br>
			<span id="descrizionePopupTutorialTicket"></span>
		</div>
		<div id="container">
			<div id="content">
				<div id="immagineLogo" class="immagineLogo" ></div>
				<div class="menuListContainer">
					<div class="menuListInputContainer">
						<button class="menuListButton" id="btnTicketAperti" onclick="resetStyle();ticketAperti()">Ticket aperti<i class="fas fa-exclamation" style="font-size:100%;margin-left:15px"></i></button>
						<button class="menuListButton" id="btnTicketChiusi" onclick="resetStyle();ticketChiusi()">Ticket chiusi<i class="far fa-check" style="font-size:100%;margin-left:15px"></i></button>
						<button class="menuListButton" id="btnTicketUtente" onclick="resetStyle();ticketUtente()">I tuoi ticket<i class="fal fa-list-ol" style="font-size:100%;margin-left:15px"></i></button>
						<button class="menuListButton" id="btnNuovoTicket" onclick="resetStyle();nuovoTicket()">Nuovo ticket<i class="far fa-plus" style="font-size:100%;margin-left:15px"></i></button>
					</div>
				</div>
				<div id="ticketAssistenzaContainer"></div>
			</div>
		</div>
		<div id="push"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>


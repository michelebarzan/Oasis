<!DOCTYPE HTML>
<html>
	<head>
		<title>Autenticazione</title>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<link rel="shortcut icon" type="image/x-icon" href="images/logo3.png" />
		<link rel="stylesheet" href="css/styleAV2.css" />
		<script>
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) 
			{
				console.log("dark mode");
			}
			if(checkMobile())
			{
				window.location.href="http://remote.oasisgroup.it/OasisMobile/login.html";
				//window.alert("Mobile");
			}
			//console.log(window.location.href);
			//console.log(location.protocol);
			//console.log(checkMobile());
			function checkMobile() {
				var check = false;
				(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
				return check;
			};
			function login() 
			{
				var username=document.getElementById("username").value;
				var password=document.getElementById("password").value;
				var ricordaPassword=document.getElementById("ricorda").checked;
				//window.alert(username+password+ricordaPassword);
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() 
				{
					if (this.readyState == 4 && this.status == 200) 
					{
						if(this.responseText=="ok")
							window.location = 'index.php';
						else
						{
							document.getElementById("result").innerHTML = this.responseText;
							document.getElementById("password").style.border="1px solid red";
							document.getElementById("username").style.border="1px solid red";
							document.getElementById("password").value="";
						}
					}
				};
				xmlhttp.open("POST", "autenticazione.php?username=" + username + "&password=" + password + "&ricordaPassword=" + ricordaPassword, true);
				xmlhttp.send();
			}
		</script>
		</head>
	<body>
		<!--<div id="popup">
			La grafica del sito e' stata aggiornata.<br>Se hai problemi nel visualizzare i contenuti o non vedi alcun cambiamento dalla versione precedente <a href="https://support.google.com/accounts/answer/32050?co=GENIE.Platform%3DDesktop&hl=it" id="linkHistory" target="_blank" >cancella la cronologia dell' ultimo anno</a>, poi chiudi e riapri la pagina.
		</div>-->
		<div id="container" class="container">
			<div id="immagine" class="immagine"></div>
			<div id="accedi" class="accedi">
				<div id="text" class="text">Accedi</div>
				<div  id="input" class="input">
					<form id="autenticazioneF">
						<?php
						if(isset($_COOKIE['username']) && $_COOKIE['username']!="no")
						{
							?>
							<input type="text" value="<?php echo $_COOKIE['username']; ?>" placeholder="Username" name="username" id="username" required><br>
							<?php
						}
						else
						{
							?>
							<input type="text" placeholder="Username" name="username" id="username" required><br>
							<?php
						}
						?>
						<?php
						if(isset($_COOKIE['password']) && $_COOKIE['password']!="no")
						{
							?>
							<input type="password" value="<?php echo $_COOKIE['password']; ?>" placeholder="Password" name="password"  id="password" required><br>
							<?php
						}
						else
						{
							?>
							<input type="password" placeholder="Password" name="password" id="password" required><br>
							<?php
						}
						?>
						<input type="button" value="Login" onclick="login()"><br>
						<div id="result" class="result">&nbsp</div>
						<div id="ricordaPassword" class="ricordaPassword"><input type="checkbox" name="ricordaPassword" id="ricorda" checked>Ricorda password</div>
					</form>
				</div>
				<div id="nuovaPassword" class="nuovaPassword"><a href="cambiaPassword.html" style="color:#666f77; font-weight:bold">Cambia password</a></div><br>
			</div>
		</div>
	</body>
</html>
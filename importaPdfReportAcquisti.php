<?php

        set_time_limit(120);

		$output3 = shell_exec("robocopy C:\\xampp\\htdocs\\OasisRicevimentoMerci\\js_libraries\\pdf.js\\web\\attachment\\ C:\\xampp\\htdocs\\OasisPdfReportAcquisti\\js_libraries\\pdf.js\\web\\attachment\\ *.* /z /e 2>&1");
		
		echo $output3;
			
?>
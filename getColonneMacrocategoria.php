<?php

    include "Session.php";
    include "connessione.php";

    $id_macrocategoria=$_REQUEST['id_macrocategoria'];

    $colonne=[];

    $query2="SELECT * FROM colonne_richieste_macrocategorie  WHERE macrocategoria=$id_macrocategoria";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $colonna["label"]=$row2['label'];
            $colonna["colonna"]=$row2['colonna'];
            $colonna["tipo"]=$row2['tipo'];
            $colonna["required"]=$row2['required'];

            /*$colonna["query_valori"]=$row2['query_valori'];
            $colonna["valori_label_column"]=$row2['valori_label_column'];
            $colonna["valori_value_column"]=$row2['valori_value_column'];*/

            if($row2['tipo']=="select")
            {
                $options=[];
                $query3=$row2['query_valori'];
                $result3=sqlsrv_query($conn,$query3);
                if($result3==TRUE)
                {
                    while($row3=sqlsrv_fetch_array($result3))
                    {
                        $option["value"]=utf8_encode($row3[$row2['valori_value_column']]);
                        $option["label"]=utf8_encode($row3[$row2['valori_label_column']]);

                        array_push($options,$option);
                    }
                }
                else
                    die("error");
                $colonna["valori"]=$options;
            }
            else
            {
                $colonna["valori"]=$row2['valori'];
            }

            array_push($colonne,$colonna);
        }
    }
    else
        die("error");

    //var_dump($colonne);

    echo json_encode($colonne);
?>
start=$(date +%s%N)
echo $start

for f in /home/lfryett/src/RPT21/rpt-21-SDC-Abee/deliver-pickup/items100

do
  finalFile=$f.json
  echo { \"docs\": [ > $finalFile
  cat $f >> $finalFile
  echo ] } >> $finalFile
  sleep 2
  curl -X POST -H "Content-Type: application/json" --data-binary @$finalFile  http://admin:Jezebel2@localhost:5984/items/_bulk_docs/
done

end=$(date +%s%N)
expired="$(($end-$start))"
echo $expired ns
 
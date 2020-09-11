start=$(date +%s%N)
echo $start

curl -X GET http://127.0.0.1:5984/stores/1501

end=$(date +%s%N)
expired="$(($end-$start))"
echo $expired ns
start=$(date +%s%N)
echo $start

curl -X GET http://127.0.0.1:5984/items/00050c6501cf1ad865bd725c61000ed8

end=$(date +%s%N)
expired="$(($end-$start))"
echo $expired ns
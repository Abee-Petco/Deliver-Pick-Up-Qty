start=$(date +%s%N)
echo $start

curl -X DELETE http://127.0.0.1:5984/stores/1501?4-36a61149848c1963d78e025258dfcc03

end=$(date +%s%N)
expired="$(($end-$start))"
echo $expired ns
start=$(date +%s%N)
echo $start

curl -X PUT http://127.0.0.1:5984/stores/7089e10b73f693e208845972e42fae7c -d '{ "store_Name":"Burgs Boehm", "_rev":"2-1649139415bfb140305823aad67a4d9a"}'

end=$(date +%s%N)
expired="$(($end-$start))"
echo $expired ns
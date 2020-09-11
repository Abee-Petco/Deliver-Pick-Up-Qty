start=$(date +%s%N)
echo $start

curl -X PUT http://127.0.0.1:5984/stores/"1501" -d '{"store_Address": " 444 Couch Drive, Sofa, IN, 44444 ", "store_Id": "1501 ", "store_Name": " CouchBum ", "store_PhoneNumber": " 777-555-7777" }'

end=$(date +%s%N)
expired="$(($end-$start))"
echo $expired ns